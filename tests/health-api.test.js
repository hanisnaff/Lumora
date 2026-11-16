import test from "node:test";
import assert from "node:assert/strict";
import handler from "../api/health.js";

async function invoke({ method = "GET", databaseStatus = 200 } = {}) {
  const originalFetch = globalThis.fetch;
  const calls = [];
  globalThis.fetch = async (url, options = {}) => {
    calls.push({ url: String(url), options });
    return new Response(databaseStatus === 204 ? null : "[]", { status: databaseStatus });
  };

  const headers = {};
  const response = {
    statusCode: 200,
    payload: null,
    status(code) { this.statusCode = code; return this; },
    setHeader(name, value) { headers[name] = value; },
    json(payload) { this.payload = payload; return payload; },
  };

  try {
    await handler({ method }, response);
  } finally {
    globalThis.fetch = originalFetch;
  }
  return { response, headers, calls };
}

test("health endpoint reports readiness without returning credentials", async () => {
  const { response, headers, calls } = await invoke();
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.payload, {
    ok: true,
    databaseConfigured: true,
    databaseReachable: true,
    message: "Lumora API and database are ready.",
  });
  assert.equal(headers["Cache-Control"], "no-store");
  assert.equal(calls.length, 1);
  assert.match(calls[0].url, /learning_progress\?select=user_id&limit=1/);
  assert.ok(calls[0].options.headers.apikey);
  assert.equal(JSON.stringify(response.payload).includes("sb_publishable"), false);
});

test("health endpoint reports database errors without exposing backend details", async () => {
  const { response } = await invoke({ databaseStatus: 503 });
  assert.equal(response.statusCode, 503);
  assert.deepEqual(response.payload, {
    ok: false,
    databaseConfigured: true,
    databaseReachable: false,
    message: "Supabase is configured, but the learning_progress table could not be queried. Check the table grants and run supabase/schema.sql.",
  });
});

test("health endpoint rejects non-GET requests", async () => {
  const { response, headers, calls } = await invoke({ method: "POST" });
  assert.equal(response.statusCode, 405);
  assert.equal(headers.Allow, "GET");
  assert.equal(headers["Cache-Control"], "no-store");
  assert.equal(calls.length, 0);
});
