-- Lumora learning progress storage.
-- Run this in Supabase Dashboard -> SQL Editor.
-- API routes authenticate the user first and use the server-only service role key.
-- Do not expose SUPABASE_SERVICE_ROLE_KEY to the browser.

create table if not exists public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists learning_progress_updated_at_idx
  on public.learning_progress (updated_at desc);

alter table public.learning_progress enable row level security;

-- No client-facing policies are intentionally added. Browser clients cannot read or
-- write this table directly; access is mediated by the authenticated Vercel API.
revoke all on table public.learning_progress from anon, authenticated;
grant all on table public.learning_progress to service_role;
