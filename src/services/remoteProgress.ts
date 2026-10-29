type RemoteSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
};

// Publishable keys are designed for browser use; RLS protects each learner's row.
const DEFAULT_SUPABASE_URL = "https://ewjhbfggfjlvseozixtv.supabase.co";
const DEFAULT_SUPABASE_ANON_KEY = "sb_publishable_GL6ijpDCW4wgjJXe__oEZw_jWFNi2BN";
const SESSION_KEY = "lumora_supabase_session_v1";

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL).replace(/\/$/, "");
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

export const isRemoteProgressConfigured = Boolean(supabaseUrl && supabaseAnonKey);

function readSession(): RemoteSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as RemoteSession) : null;
  } catch {
    return null;
  }
}

function saveSession(session: Record<string, unknown>): RemoteSession | null {
  const accessToken = session.access_token;
  const refreshToken = session.refresh_token;
  if (typeof accessToken !== "string" || typeof refreshToken !== "string") return null;

  const expiresIn = typeof session.expires_in === "number" ? session.expires_in : 3600;
  const normalized: RemoteSession = {
    access_token: accessToken,
    refresh_token: refreshToken,
    expires_at: Date.now() / 1000 + expiresIn,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(normalized));
  return normalized;
}

async function authRequest(path: string, body: Record<string, string>) {
  const response = await fetch(`${supabaseUrl}/auth/v1/${path}`, {
    method: "POST",
    headers: {
      apikey: supabaseAnonKey as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase authentication failed (${response.status}): ${detail}`);
  }
  return (await response.json()) as Record<string, unknown>;
}

async function getSession(): Promise<RemoteSession> {
  if (!isRemoteProgressConfigured) {
    throw new Error("Remote progress is not configured.");
  }

  const current = readSession();
  if (current && current.expires_at > Date.now() / 1000 + 60) return current;

  if (current?.refresh_token) {
    try {
      const refreshed = await authRequest("token?grant_type=refresh_token", {
        refresh_token: current.refresh_token,
      });
      const session = saveSession(refreshed);
      if (session) return session;
    } catch {
      localStorage.removeItem(SESSION_KEY);
    }
  }

  // Supabase must have anonymous sign-ins enabled in Authentication settings.
  const created = await authRequest("signup", {});
  const session = saveSession(created);
  if (!session) {
    throw new Error("Supabase did not return an anonymous session. Enable anonymous sign-ins in Supabase Auth.");
  }
  return session;
}

async function progressRequest(method: "GET" | "PUT", state?: unknown) {
  const session = await getSession();
  const response = await fetch("/api/progress", {
    method,
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      ...(method === "PUT" ? { "Content-Type": "application/json" } : {}),
    },
    ...(method === "PUT" ? { body: JSON.stringify({ state }) } : {}),
  });

  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(payload.error || `Progress sync failed (${response.status}).`);
  }
  return response.json() as Promise<{ state?: unknown; saved?: boolean }>;
}

export async function loadRemoteProgress(): Promise<Record<string, unknown> | null> {
  if (!isRemoteProgressConfigured) return null;
  const response = await progressRequest("GET");
  return response.state && typeof response.state === "object" && !Array.isArray(response.state)
    ? (response.state as Record<string, unknown>)
    : null;
}

export async function saveRemoteProgress(state: Record<string, unknown>): Promise<void> {
  if (!isRemoteProgressConfigured) return;
  await progressRequest("PUT", state);
}
