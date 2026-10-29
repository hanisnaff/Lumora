import { getSupabaseConfig, sendJson } from "../lib/supabaseServer.js";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return sendJson(res, 405, { ok: false, error: "Method not allowed." });
  }

  let config;
  try {
    config = getSupabaseConfig();
  } catch {
    return sendJson(res, 503, {
      ok: false,
      databaseConfigured: false,
      message: "Set the Supabase environment variables in Vercel.",
    });
  }

  try {
    const response = await fetch(
      `${config.url}/rest/v1/learning_progress?select=user_id&limit=1`,
      { headers: { apikey: config.anonKey } },
    );

    if (!response.ok) {
      console.error("Lumora health check: database table check failed with status", response.status);
      return sendJson(res, 503, {
        ok: false,
        databaseConfigured: true,
        databaseReachable: false,
        message: "Supabase is configured, but the learning_progress table could not be queried. Check the table grants and run supabase/schema.sql.",
      });
    }

    return sendJson(res, 200, {
      ok: true,
      databaseConfigured: true,
      databaseReachable: true,
      message: "Lumora API and database are ready.",
    });
  } catch (error) {
    console.error("Lumora health check failed:", error);
    return sendJson(res, 503, {
      ok: false,
      databaseConfigured: true,
      databaseReachable: false,
      message: "Could not reach Supabase from the server.",
    });
  }
}
