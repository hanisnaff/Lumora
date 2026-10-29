# Lumora — Adaptive Learning, Built Around You

Lumora helps learners identify concept-level knowledge gaps, study focused lessons, practice weak areas, and track mastery over time. Cloud progress is tied to an anonymous browser session; account linking is needed for cross-device recovery.

## Current learning flow

- **Home** — product introduction and learning overview.
- **Learning setup** — select the implemented C++ Pointers demo and difficulty.
- **Diagnostic assessment** — answer baseline questions to estimate mastery.
- **Knowledge gap results** — review score breakdowns and weakest concepts.
- **Personalized lesson** — study explanations, analogies, worked examples, and memory diagrams.
- **Targeted practice** — practice concept-specific questions with immediate feedback.
- **Progress dashboard** — review practice history, completed lessons, and concept mastery.

The current curriculum is a focused C++ pointers demonstration. Other subjects should not be presented as fully implemented until their content is added.

## Tech stack

- React, TypeScript, Vite, Tailwind CSS
- Vercel serverless functions for progress API
- Supabase Auth for anonymous learner sessions
- Supabase Postgres with row-level security for learner-owned progress

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm ci
npm run dev
```

To check the production bundle:

```bash
npm run build
npm run preview
```

## Supabase setup

Lumora is preconfigured with the public URL and publishable key for its connected Supabase project. These values are safe to expose; row-level security protects progress records. You do not need to add a service-role key.

1. In Supabase **Authentication settings**, enable **Anonymous Sign-Ins**.
2. Ensure the `public.learning_progress` table exists by running `supabase/schema.sql` in SQL Editor. The schema is safe to re-run.
3. The table has RLS policies restricting each authenticated learner to their own `user_id`.

If deploying to a different Supabase project, override `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `SUPABASE_URL`, and `SUPABASE_ANON_KEY` in Vercel. The publishable key is public; never use a secret/service-role key in a browser variable.

## Deploy to Vercel

1. Import `hanisnaff/Lumora` from GitHub in [Vercel](https://vercel.com/).
2. Use the Vite defaults; `vercel.json` configures the build and client-side route fallback.
3. Deploy the latest `main` branch.
4. Open `/api/health` on the deployment. A healthy response reports `ok: true`, `databaseConfigured: true`, and `databaseReachable: true`.
5. Complete an assessment or practice session, then verify a row appears in Supabase `public.learning_progress`.

Vercel hosts the frontend and API functions. Supabase hosts authentication and the database.

## API

- `GET /api/progress` — returns the authenticated learner's saved state.
- `PUT /api/progress` — saves the authenticated learner's state.
- `GET /api/health` — checks API configuration and database reachability without exposing credentials.

The API validates Supabase access tokens and sends the user's token to Postgres REST so RLS policies enforce ownership. Local browser storage remains a fallback if cloud sync is temporarily unavailable.

## Important scope notes

- The assessment and scoring engine currently run in the application; this is not a generative-AI tutor API.
- Anonymous sessions support the current demo but are not a full sign-in, account recovery, or cross-device account-linking experience.
- The public Supabase URL and publishable key are included as defaults. If anonymous sign-ins are disabled, enable them in Supabase Auth settings.
