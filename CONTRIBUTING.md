# Contributing to Lumora

Thanks for helping improve Lumora. Keep changes focused, preserve the current visual system, and describe what was tested.

## Development setup

- Use Node.js 20 or later and npm.
- Install dependencies with `npm ci`.
- Start the local app with `npm run dev`.
- Run `npm run build` before opening a pull request. This runs TypeScript checks and creates the production Vite bundle.

## Workflow

1. Create a branch from `main`.
2. Make a focused change and keep unrelated formatting out of the diff.
3. Update the README or setup docs if behavior, environment variables, or project scope changes.
4. Check that no secrets, local environment files, build output, or personal data are included.
5. Open a pull request with a clear summary, testing notes, and screenshots for visible UI changes.

## Pull request checklist

- [ ] The change has a clear purpose and scope.
- [ ] The production build passes locally.
- [ ] Learning flows still work from setup through progress.
- [ ] Responsive layouts and keyboard-accessible controls are preserved.
- [ ] Documentation reflects the actual implemented behavior.
- [ ] No credentials or generated artifacts are committed.
