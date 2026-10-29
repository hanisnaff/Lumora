-- Lumora learning progress storage.
-- Safe to re-run in Supabase Dashboard -> SQL Editor.
-- Publishable keys are public; row-level security protects learner records.

create table if not exists public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create index if not exists learning_progress_updated_at_idx
  on public.learning_progress (updated_at desc);

alter table public.learning_progress enable row level security;

-- The anonymous role may query the table for a deployment health check, but RLS
-- intentionally returns no rows to unauthenticated requests.
grant select on table public.learning_progress to anon;
grant select, insert, update, delete on table public.learning_progress to authenticated;

drop policy if exists "Learners can read their own progress" on public.learning_progress;
create policy "Learners can read their own progress"
  on public.learning_progress for select to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Learners can create their own progress" on public.learning_progress;
create policy "Learners can create their own progress"
  on public.learning_progress for insert to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Learners can update their own progress" on public.learning_progress;
create policy "Learners can update their own progress"
  on public.learning_progress for update to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "Learners can delete their own progress" on public.learning_progress;
create policy "Learners can delete their own progress"
  on public.learning_progress for delete to authenticated
  using (auth.uid() = user_id);

grant all on table public.learning_progress to service_role;
