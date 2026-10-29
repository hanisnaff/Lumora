const jsonHeaders = { "Content-Type": "application/json" };

export function getSupabaseConfig() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !anonKey || !serviceRoleKey) {
    throw new Error("Supabase server environment variables are not configured.");
  }

  return { url: url.replace(/\/$/, ""), anonKey, serviceRoleKey };
}

export async function authenticateRequest(req, config) {
  const authorization = req.headers.authorization || "";
  const token = authorization.startsWith("Bearer ") ? authorization.slice(7) : "";

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
