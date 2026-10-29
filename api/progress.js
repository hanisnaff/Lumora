import { authenticateRequest, getSupabaseConfig, sendJson } from "./_supabase.js";

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "PUT") {
    res.setHeader("Allow", "GET, PUT");
    return sendJson(res, 405, { error: "Method not allowed." });
  }

  let config;
  try {
    config = getSupabaseConfig();
  } catch {
    return sendJson(res, 503, { error: "The database is not configured yet. Add the Supabase environment variables in Vercel." });
  }

  try {
    const user = await authenticateRequest(req, config);
    if (!user) return sendJson(res, 401, { error: "Session expired or invalid. Please reload the app." });

    const tableUrl = `${config.url}/rest/v1/learning_progress`;

    if (req.method === "GET") {
      const response = await fetch(`${tableUrl}?select=state&user_id=eq.${encodeURIComponent(user.id)}&limit=1`, {
        headers: {
          apikey: config.serviceRoleKey,
          Authorization: `Bearer ${config.serviceRoleKey}`,
        },
      });

      if (!response.ok) {
        const detail = await response.text();
        console.error("Supabase read failed:", detail);
        return sendJson(res, 502, { error: "Could not load saved progress." });
      }

      const rows = await response.json();
      return sendJson(res, 200, { state: rows[0]?.state ?? null });
    }

    const state = req.body?.state;
    if (!state || typeof state !== "object" || Array.isArray(state)) {
      return sendJson(res, 400, { error: "A valid progress state is required." });
    }

    const serialized = JSON.stringify(state);
    if (serialized.length > 200_000) {
      return sendJson(res, 413, { error: "Progress payload is too large." });
    }

    const response = await fetch(`${tableUrl}?on_conflict=user_id`, {
      method: "POST",
      headers: {
        apikey: config.serviceRoleKey,
        Authorization: `Bearer ${config.serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=merge-duplicates,return=minimal",
      },
      body: JSON.stringify({
        user_id: user.id,
        state,
        updated_at: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Supabase write failed:", detail);
      return sendJson(res, 502, { error: "Could not save progress to the database." });
    }

    return sendJson(res, 200, { saved: true });
  } catch (error) {
    console.error("Progress API error:", error);
    return sendJson(res, 500, { error: "Unexpected server error while syncing progress." });
  }
}
