# AGENT.md - Qwik Project Guidelines

## Commands
- **Build**: `pnpm run build` (also `pnpm run build.types` for type checking)
- **Dev**: `pnpm run dev` (development server)
- **Lint**: `pnpm run lint` (ESLint on src/**/*.ts*)
- **Format**: `pnpm run fmt` (Prettier)
- **Format Check**: `pnpm run fmt.check`
- **Deploy**: `pnpm run deploy` (build + Cloudflare Pages deploy)

## Package Manager
- **MUST** use `pnpm` for all dependency management (never npm/yarn)
- See .cursor/rules/package-manager.md for details

## Code Style
- **Imports**: Use `type` imports for types (`import type { DocumentHead }`)
- **Components**: Use `component$()` function with destructured props
- **Props**: Define interfaces for component props (e.g., `SectionProps`)
- **Classes**: Use `class` prop (not `className`) for Tailwind classes
- **Formatting**: 2-space indentation, single quotes, 100 char line width
- **Exports**: Default export for components, named exports for utilities

## TypeScript
- Strict type checking enabled
- Use `NoSerialize<T>` for client-side objects like Lenis
- Import types separately with `import type`