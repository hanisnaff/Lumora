# Lumora — Adaptive Learning, Built Around You

Lumora is an adaptive-learning platform that helps learners identify concept-level knowledge gaps, study focused lessons, practice weak areas, and track mastery over time. Cloud progress is tied to an anonymous browser session; sign-in/account linking is needed for cross-device recovery.

## Current learning flow

- **Home** — product introduction and learning overview.
- **Learning setup** — select the implemented C++ Pointers demo and difficulty.
- **Diagnostic assessment** — answer baseline questions to estimate mastery.
- **Knowledge gap results** — review score breakdowns and the weakest concepts.
- **Personalized lesson** — study explanations, analogies, worked examples, and memory diagrams.
- **Targeted practice** — practice concept-specific questions with immediate feedback.
- **Progress dashboard** — review practice history, completed lessons, and concept mastery.

The current curriculum is a focused C++ pointers demonstration. Other subjects/topics should not be presented as fully implemented until their corresponding content is added.

## Tech stack

- React, TypeScript, Vite, Tailwind CSS
- Vercel serverless functions for the progress API
- Supabase Auth for anonymous learner sessions
- Supabase Postgres for cloud-saved learning progress

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by Vite. To check the production bundle:

```bash
npm run build
npm run preview
```

## Configure Supabase

1. Create a project in [Supabase](https://supabase.com/).
2. In **Authentication → Providers / Sign In**, enable **Anonymous Sign-Ins**. The exact UI wording may vary.
3. Open **SQL Editor** and run the contents of `supabase/schema.sql`.
4. In **Project Settings → API** (or API Keys), copy the project URL and the publishable/anon key. Copy the service-role/secret key for server-side use only.

Set these variables in Vercel → Project → Settings → Environment Variables:

| Variable | Used by | Value |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Browser | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Browser | Supabase publishable/anon key |
| `SUPABASE_URL` | Server only | Same Supabase project URL |
| `SUPABASE_ANON_KEY` | Server only | Supabase publishable/anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only | Supabase service-role/secret key |

Add variables to **Production, Preview, and Development** as appropriate, then redeploy. Never prefix the service-role key with `VITE_`, commit it to Git, or expose it to the browser. The `.env.example` file is a template only; it does not contain credentials.

## Deploy to Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com/), choose **Add New → Project** and import `hanisnaff/Lumora`.
3. Use the Vite defaults; this repository includes `vercel.json` for the build output and client-side route fallback.
4. Configure the environment variables listed above.
5. Deploy and test the learning flow from assessment through progress.
6. Confirm a row appears in Supabase `public.learning_progress` after completing an assessment or practice session.

Vercel hosts the frontend and API functions. Supabase hosts authentication and the database; Vercel does not provide a persistent SQL database by itself.

## API

- `GET /api/progress` — returns the authenticated learner's saved state.
- `PUT /api/progress` — saves the authenticated learner's state.

The API validates the Supabase access token, limits the JSON payload size, and accesses the database with a server-only key. The SQL table has row-level security enabled and no direct client policies. Local browser storage remains a fallback if remote progress is not configured or temporarily unavailable.

## Environment template

See `.env.example`. For local Vite development, the `VITE_*` variables enable Supabase auth in the browser. The `api/` functions run on Vercel; to exercise them locally, use the Vercel CLI with the project environment variables configured.

## Important scope notes

- The adaptive assessment and scoring engine currently run in the application; this is not a generative-AI tutor API.
- Anonymous sessions provide a simple way to test cross-session storage, but they are not a full email/social sign-in experience. Adding account linking and account recovery would be a separate step.
- The API and database require your own Supabase project and environment variables before cloud persistence can work. Do not describe cloud storage as live until this setup is complete and verified.
