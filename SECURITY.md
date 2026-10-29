# Security Policy

## Supported scope

Security reports are welcome for the current Lumora codebase, including the Vercel API routes, Supabase access controls, and client-side progress handling.

## Reporting a vulnerability

Please do not publish exploit details in a public issue. Contact the repository owner privately through GitHub's profile/contact options and include:

- A concise description and impact.
- Reproduction steps or a minimal proof of concept.
- Any affected route, file, or configuration.
- Suggested mitigation, if known.

Do not include real learner data, access tokens, service-role keys, database passwords, or other secrets in the report.

## Security design notes

- Supabase publishable keys are public by design; row-level security must remain enabled.
- Learner progress rows are scoped by the authenticated Supabase user ID.
- Server secrets must never be prefixed with `VITE_` or committed to the repository.
- Report suspected cross-user data access immediately.
