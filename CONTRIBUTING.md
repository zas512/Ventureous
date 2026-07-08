# Contributing to Ventureous

Thanks for your interest in contributing! Here's how to get started.

## Setup

1. Fork and clone the repo
2. Install dependencies: `npm install`
3. Copy env files: `cp apps/web/.env.example apps/web/.env.local` (same for `apps/studio` and `packages/sanity`)
4. Start dev servers: `npm run dev`

## Development

- **Web app**: `npm run dev:web` (localhost:3000)
- **Sanity Studio**: `npm run dev:studio` (localhost:3333)
- **Lint**: `npm run lint`
- **Format**: `npm run format`
- **Type check**: `npm run check-types`

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Ensure `npm run lint` and `npm run check-types` pass
4. Commit with a clear message
5. Open a PR against `main`

## Guidelines

- Follow existing code patterns and conventions
- Use Biome for formatting (not Prettier/ESLint)
- Keep PRs focused on a single change
- Update types after schema changes: `cd apps/studio && npm run type`

## Questions?

Open an issue or reach out to the maintainer.
