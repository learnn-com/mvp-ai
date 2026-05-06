# mvp-ai

Monorepo Learnn (MVP): webapp React in `apps/web`.

## Requisiti

- Node.js 20+
- [pnpm](https://pnpm.io) 9 (`packageManager` in root `package.json`)

## Comandi

```bash
pnpm install
pnpm dev:web
pnpm build:web
pnpm quality-gate
```

La webapp è il package `web` (cartella `apps/web`). Esempi con filter:

```bash
pnpm --filter web dev
pnpm --filter web build
pnpm --filter web lint
pnpm --filter web ts:check
pnpm --filter web test
```

## Deploy cloud

Pubblicazione su **S3 / CloudFront** non fa parte dell’incremento corrente della webapp: vedi backlog prodotto e `infrastructure.md` in `.pair/adoption/tech/`.
