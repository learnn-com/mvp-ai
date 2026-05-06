# web (`apps/web`)

Webapp React (Vite + TypeScript + Tailwind + shadcn/ui + React Router).

## Comandi

```bash
pnpm dev
pnpm build
pnpm preview
pnpm lint
pnpm ts:check
pnpm test
```

Nessuna credenziale AWS richiesta per `dev` / `build` locali. Il deploy su S3/CloudFront è fuori scope per US-EP00-05; vedi README root.

## Auth mock (US-EP01-01)

Login su `/login` senza backend Strapi. Credenziali di test: codice in
`src/features/auth/mock/mock-credentials.ts` e riepilogo in
`.pair/adoption/product/story/us-ep01-01-mock-credentials.md`.

**Smoke manuale:** anonimo su `/` → redirect a `/login`; login ok → Home; reload
resta autenticato; **Esci** → `/login` e area protetta non accessibile. Rate
limit server assente; eventuale throttle submit non implementato (limite noto
fino a integrazione API).
