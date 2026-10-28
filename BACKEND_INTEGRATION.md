# MindPath AI — frontend + AI Tutor backend integration

The original React/Vite MindPath landing page and learning demo are preserved. The **Start learning** actions now open `/workspace`, the API-backed workspace.

## Connected features

- Account registration and HTTP Basic sign-in
- Private learning spaces/projects
- PDF upload and material processing
- Topic extraction from the uploaded material
- AI tutor Q&A grounded in material, with source references
- AI-generated practice questions
- Diagnostic assessment creation and submission
- Personalized learning plan generation
- Lesson explanations and worked examples
- Generated exercises with feedback and mastery updates
- Progress, topic mastery, recommendations, and recent activity reports

## Run locally

1. Start the Spring Boot backend and its PostgreSQL/pgvector database. Follow the backend README; it requires Java 25 and Docker. The default AI provider is deterministic mock mode, so the core flow can be tested without an OpenAI key.
2. Copy `.env.example` to `.env.local` and set `VITE_API_BASE_URL=http://localhost:8080`.
3. Install and run the frontend:

   ```bash
   npm install
   npm run dev
   ```

4. Open the Vite URL, choose **Start learning**, and register a new account. Upload a PDF, then use the Materials & AI, Assessment, Learning plan, and Progress tabs.

## Deploy separately

The frontend is a Vite/React application and can be deployed to Vercel. Configure the Vercel project environment variable `VITE_API_BASE_URL` to the public HTTPS URL of the deployed Spring Boot backend, then redeploy. The backend must allow CORS for the exact frontend origin and must have a reachable PostgreSQL database. Do not use an empty API URL in production when frontend and backend are hosted on different origins.

The frontend keeps the Basic-auth credentials in `sessionStorage` for the active browser tab and clears them on sign out. Use HTTPS for both services. Do not deploy the backend's local-development bootstrap password to a public service.

## Important

This is an API integration commit; it does not deploy the Java backend or create a production database for you. Configure the backend host, PostgreSQL credentials, AI provider, and CORS before expecting cross-origin requests to work.
