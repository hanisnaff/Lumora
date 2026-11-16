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

test("writes progress with the authenticated user ID", async () => {
  const state = { completedLessons: ["pointers"] };
  const { response, calls } = await invoke({ method: "PUT", body: { state }, databaseStatus: 204 });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.payload, { saved: true });
  assert.match(calls[1].url, /on_conflict=user_id/);
  assert.deepEqual(JSON.parse(calls[1].options.body), {
    user_id: "user-123",
    state,
    updated_at: JSON.parse(calls[1].options.body).updated_at,
  });
  assert.equal(calls[1].options.headers.Authorization, "Bearer test-access-token");
});

test("deletes only the authenticated user's progress", async () => {
  const { response, calls } = await invoke({ method: "DELETE", databaseStatus: 204 });
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.payload, { deleted: true });
  assert.match(calls[1].url, /user_id=eq\.user-123/);
  assert.equal(calls[1].options.method, "DELETE");
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
