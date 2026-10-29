const DEFAULT_SUPABASE_URL = "https://ewjhbfggfjlvseozixtv.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_GL6ijpDCW4wgjJXe__oEZw_jWFNi2BN";
const jsonHeaders = { "Content-Type": "application/json" };

export function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase server environment variables are not configured.");
  }

  return { url: url.replace(/\/$/, ""), anonKey };
}

export function getAccessToken(req) {
  const authorization = req.headers.authorization || "";
  return authorization.startsWith("Bearer ") ? authorization.slice(7) : "";
}

export async function authenticateRequest(req, config) {
  const token = getAccessToken(req);
  if (!token) return null;

  const response = await fetch(`${config.url}/auth/v1/user`, {
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) return null;
  const user = await response.json();
  return user && typeof user.id === "string" ? user : null;
}

export function sendJson(res, status, payload) {
  res.status(status);
  res.setHeader("Content-Type", jsonHeaders["Content-Type"]);
  return res.json(payload);
}
