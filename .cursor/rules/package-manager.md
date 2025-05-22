# Package Manager Rule

## Rule

All package dependencies must be managed using pnpm.

## Description

This project uses pnpm as its package manager. When adding, removing, or updating dependencies, always use pnpm commands instead of npm or yarn.

## Examples

✅ Correct:

```bash
pnpm add @builder.io/qwik-react
pnpm remove @builder.io/qwik-react
pnpm update
```

❌ Incorrect:

```bash
npm install @builder.io/qwik-react
yarn add @builder.io/qwik-react
```

## Rationale

- pnpm provides better disk space efficiency through hard linking
- Ensures consistent dependency management across the team
- Maintains compatibility with the project's lockfile (pnpm-lock.yaml)
