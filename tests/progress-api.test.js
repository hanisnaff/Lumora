import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import handler from "../api/progress.js";

async function invoke({
  method = "GET",
  authorization = "Bearer test-access-token",
  authUser = { id: "user-123", is_anonymous: false },
  databaseStatus = 200,
  databaseBody = [{ state: { completedLessons: ["pointers"] } }],
  body,
} = {}) {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), options });
    if (String(url).includes("/auth/v1/user")) {
      return new Response(JSON.stringify(authUser), {
        status: authUser ? 200 : 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    return new Response(databaseStatus === 204 ? null : JSON.stringify(databaseBody), {
      status: databaseStatus,
      headers: { "Content-Type": "application/json" },
    });
  };

  const responseHeaders = {};
  const response = {
    statusCode: 200,
    payload: null,
    status(code) { this.statusCode = code; return this; },
    setHeader(name, value) { responseHeaders[name] = value; },
    json(payload) { this.payload = payload; return payload; },
  };

  try {
    await handler({ method, headers: authorization ? { authorization } : {}, body }, response);
  } finally {
    globalThis.fetch = originalFetch;
  }

  return { response, responseHeaders, calls };
}

test("GET returns only the authenticated learner's progress and disables caching", async () => {
  const { response, responseHeaders, calls } = await invoke();
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.payload, {
    state: { completedLessons: ["pointers"] },
    userId: "user-123",
    isAnonymous: false,
  });
  assert.equal(responseHeaders["Cache-Control"], "private, no-store, max-age=0");
  assert.equal(responseHeaders.Vary, "Authorization");
  assert.match(calls[1].url, /user_id=eq\.user-123/);
  assert.equal(calls[1].options.headers.Authorization, "Bearer test-access-token");
});

test("identifies anonymous learner sessions without changing progress ownership", async () => {
  const { response, calls } = await invoke({
    authUser: { id: "anonymous-user-456", is_anonymous: true },
    databaseBody: [],
  });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.payload, {
    state: null,
    userId: "anonymous-user-456",
    isAnonymous: true,
  });
  assert.equal(calls.length, 2);
  assert.match(calls[1].url, /user_id=eq\.anonymous-user-456/);
});

test("does not label an authenticated account as anonymous when the flag is absent", async () => {
  const { response } = await invoke({
    authUser: { id: "user-without-flag" },
    databaseBody: [],
  });
  assert.equal(response.statusCode, 200);
  assert.equal(response.payload.isAnonymous, false);
});

test("accepts the bearer authentication scheme case-insensitively", async () => {
  const { response, calls } = await invoke({ authorization: "bEaReR test-access-token" });
  assert.equal(response.statusCode, 200);
  assert.equal(calls[1].options.headers.Authorization, "Bearer test-access-token");
});

test("rejects requests without an access token", async () => {
  const { response, calls } = await invoke({ authorization: "" });
  assert.equal(response.statusCode, 401);
  assert.equal(calls.length, 0);
});

test("rejects an invalid Supabase access token", async () => {
  const { response, calls } = await invoke({ authUser: null });
  assert.equal(response.statusCode, 401);
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /auth\/v1\/user/);
});

test("rejects unsupported HTTP methods", async () => {
  const { response, responseHeaders, calls } = await invoke({ method: "PATCH" });
  assert.equal(response.statusCode, 405);
  assert.equal(responseHeaders.Allow, "GET, PUT, DELETE");
  assert.equal(calls.length, 0);
});

test("rejects invalid progress payloads", async () => {
  const { response, calls } = await invoke({ method: "PUT", body: { state: [] } });
  assert.equal(response.statusCode, 400);
  assert.equal(calls.length, 1);
});

test("rejects progress payloads above the size limit", async () => {
  const { response, calls } = await invoke({
    method: "PUT",
    body: { state: { note: "x".repeat(200_001) } },
  });
  assert.equal(response.statusCode, 413);
  assert.equal(calls.length, 1);
});

test("measures the progress payload limit in UTF-8 bytes", async () => {
  const { response, calls } = await invoke({
    method: "PUT",
    body: { state: { note: "é".repeat(100_001) } },
  });
  assert.equal(response.statusCode, 413);
  assert.equal(calls.length, 1);
});

test("measures progress payload limits in UTF-8 bytes", async () => {
  const { response, calls } = await invoke({
    method: "PUT",
    body: { state: { note: "界".repeat(67_000) } },
  });
  assert.equal(response.statusCode, 413);
  assert.equal(calls.length, 1);
});

test("writes progress with the authenticated user ID", async () => {
  const state = { completedLessons: ["pointers"] };
  const { response, calls } = await invoke({ method: "PUT", body: { state }, databaseStatus: 204 });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.payload, { saved: true });
  assert.match(calls[1].url, /on_conflict=user_id/);
  const savedPayload = JSON.parse(calls[1].options.body);
  assert.equal(savedPayload.user_id, "user-123");
  assert.deepEqual(savedPayload.state, state);
  assert.ok(Number.isFinite(Date.parse(savedPayload.updated_at)));
  assert.equal(calls[1].options.headers.Authorization, "Bearer test-access-token");
});

test("deletes only the authenticated user's progress", async () => {
  const { response, calls } = await invoke({ method: "DELETE", databaseStatus: 204 });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.payload, { deleted: true });
  assert.match(calls[1].url, /user_id=eq\.user-123/);
  assert.equal(calls[1].options.method, "DELETE");
});

test("returns a safe gateway error when Supabase cannot load progress", async () => {
  const { response } = await invoke({ databaseStatus: 503 });
  assert.equal(response.statusCode, 502);
  assert.deepEqual(response.payload, { error: "Could not load saved progress." });
});

test("does not report a successful save when Supabase rejects the write", async () => {
  const { response } = await invoke({
    method: "PUT",
    body: { state: { completedLessons: ["pointers"] } },
    databaseStatus: 500,
  });
  assert.equal(response.statusCode, 502);
  assert.deepEqual(response.payload, { error: "Could not save progress to the database." });
});

test("does not report a successful reset when Supabase rejects the delete", async () => {
  const { response } = await invoke({ method: "DELETE", databaseStatus: 500 });
  assert.equal(response.statusCode, 502);
  assert.deepEqual(response.payload, { error: "Could not reset saved progress." });
});

test("Vercel config includes baseline browser security headers", () => {
  const config = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
  const headers = config.headers?.find((rule) => rule.source === "/(.*)")?.headers ?? [];
  const values = Object.fromEntries(headers.map((header) => [header.key, header.value]));
  assert.equal(values["X-Content-Type-Options"], "nosniff");
  assert.equal(values["Referrer-Policy"], "strict-origin-when-cross-origin");
  assert.equal(values["X-Frame-Options"], "DENY");
  assert.equal(values["Permissions-Policy"], "camera=(), microphone=(), geolocation=()");
});

test("Supabase progress table keeps every row-level policy user-scoped", () => {
  const schema = readFileSync(new URL("../supabase/schema.sql", import.meta.url), "utf8");
  assert.match(schema, /enable row level security/i);
  assert.match(schema, /grant select on table public\.learning_progress to anon/i);
  const policies = [...schema.matchAll(/create policy[\s\S]*?;/gi)].map((match) => match[0]);
  assert.equal(policies.length, 4);
  for (const policy of policies) {
    assert.match(policy, /to authenticated/i);
    assert.match(policy, /\(select auth\.uid\(\)\) = user_id/i);
  }
});
