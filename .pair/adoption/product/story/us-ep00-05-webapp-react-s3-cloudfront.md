# US-EP00-05 — Webapp React su S3 e CloudFront

## Incremento corrente: **solo setup progetto React** (senza deploy S3/CloudFront)

In questa tornata si crea il **package webapp** nel monorepo: toolchain (es. **Vite + React + TypeScript**), **Tailwind CSS** e baseline **shadcn/ui** come da [tech-stack.md](../../tech/tech-stack.md), **router** minimale, pagina **placeholder** per demo locale. **Fuori scope:** bucket S3, distribuzione CloudFront, DNS, HTTPS pubblico, pipeline di deploy cloud — incremento dedicato quando l’infrastruttura sarà pronta (titolo US resta per tracciabilità verso epic).

## Story Statement

**Come** sviluppatore **voglio** un progetto React avviabile nel monorepo con build e quality gate allineati **affinché** le epiche UI (EP-01, EP-02, …) possano essere implementate su una base coerente **senza** dipendere dal deploy cloud in questa fase.

**Where:** package webapp nel repository (workspace `pnpm` / `turbo` come da [US-EP00-01](./us-ep00-01-monorepo-convenzioni-e-quality-gate.md)), ambiente **locale** (`dev` + `build`).

## Epic Context

**Parent Epic**: [EP-00 — Piattaforma e fondamenta](../epic/ep-00-foundation-platform.md)  
**Status**: Refined  
**Priority**: P0 (Must-Have)

### Status Workflow

- **Refined**: Story dettagliata, pronta allo sviluppo
- **In Progress**: Sviluppo attivo
- **Done**: Consegnata e accettata

## User Value

**User Benefit**: Base UI eseguibile in locale; prerequisito per tutte le story web.  
**Business Impact**: Sblocca implementazione UI senza attendere AWS; obiettivo epic “pubblico su CloudFront” resta ma **non** in questo incremento.  
**Visible UI Value**: Home o placeholder con layout minimo navigabile.

## Acceptance Criteria

### Functional / Engineering

1. **Given** il repository con monorepo/config da US-EP00-01  
   **When** si esegue il comando documentato per il dev server della webapp  
   **Then** l’app React si avvia e mostra almeno una **route** placeholder (Home o equivalente) senza errori runtime bloccanti.

2. **Given** il package webapp  
   **When** si esegue la **build di produzione** (`pnpm --filter <webapp> build` o comando documentato in README)  
   **Then** la build completa con successo (output statico in `dist/` o cartella prevista dal bundler).

3. **Given** la webapp in esecuzione locale  
   **When** si naviga tra le route minime definite  
   **Then** il **router** client-side risponde (deep link coerente con config SPA/Vite documentata).

4. **Given** il package webapp  
   **When** si consultano config e dipendenze  
   **Then** **Tailwind CSS** e setup **shadcn/ui** (init + almeno un componente di prova) sono presenti coerenti con [tech-stack.md](../../tech/tech-stack.md) e [ux-ui.md](../../tech/ux-ui.md).

5. **Given** modifiche nel codice webapp  
   **When** si esegue il **quality gate** adottato ([way-of-working.md](../../tech/way-of-working.md)) includendo il package webapp (direttamente o via `--filter`)  
   **Then** lint, typecheck e test come definiti dal gate progetto passano.

6. **Given** un nuovo sviluppatore  
   **When** segue il **README** (root e/o package webapp)  
   **Then** avvia `dev` e `build` della sola webapp **senza** credenziali AWS o deploy.

### Fuori scope (incremento corrente)

- Deploy su S3, CloudFront, DNS, certificati, invalidazione cache, CI che pubblica artifact su cloud.

## Definition of Done Checklist

### Development Completion

- [ ] Tutti gli acceptance criteria verificati in locale.
- [ ] Package webapp registrato nel workspace monorepo e in `turbo`/pipeline se usati.
- [ ] `pnpm quality-gate` (o variante documentata con filter webapp) verde sulla parte toccata.
- [ ] Build prod locale genera artefatti statici **pronti** per futuro deploy (deploy non eseguito in questa US).

### Quality Assurance

- [ ] Smoke: avvio dev, navigazione placeholder, build una tantum, `pnpm preview` opzionale.
- [ ] Nessuna dipendenza runtime da Strapi obbligatoria per avviare la webapp.

### Deployment (questo incremento)

- [ ] Nessun deploy cloud richiesto; README indica che S3/CloudFront è story/incremento separato.

## Story Sizing and Sprint Readiness

**Final Story Points**: M (3)  
**Confidence**: High  
**Development Time Estimate**: ~1–2 giorni (solo scaffold + wiring)

## Dependencies

**Prerequisite**: [US-EP00-01](./us-ep00-01-monorepo-convenzioni-e-quality-gate.md) — monorepo, `pnpm`, turbo, quality gate base.  
**Follow-up (non questa US)**: pubblicazione su S3 + CloudFront; vedi [infrastructure.md](../../tech/infrastructure.md) e obiettivo epic EP-00.

## Notes

- Allineamento UI a [ux-ui.md](../../tech/ux-ui.md) quando si evolve oltre il placeholder.
- Il nome file story resta legato all’epic; il contenuto “incremento corrente” è source of truth per lo scope implementativo.

## Technical Analysis

### Implementation Approach

**Technical Strategy:** aggiungere package (es. `apps/web`) con **Vite + React + TypeScript** salvo diversa ADR; integrare **Tailwind**; **`shadcn/ui`** init nel package; **React Router** per SPA. Root: `StrictMode`, una pagina placeholder.  
**Data Flow:** nessun backend; asset statici.  
**Integration Points:** `pnpm-workspace.yaml`, `turbo.json` task `dev`/`build`/`lint`/`test`; estensione `pnpm quality-gate` root per includere il package webapp.

### Technical Risks and Mitigation

| Risk | Mitigation |
| ---- | ---------- |
| Versioni React duplicate nel monorepo | Policy single version / `pnpm.overrides` se necessario |
| Path alias `@/` vs Vite | Allineare `tsconfig` + `vite.config` come da doc shadcn |

### Spike Requirements

Nessuno se lo stack Vite+React+Tailwind+shadcn è confermato; altrimenti micro-spike ≤0,5g su versione Tailwind vs generator shadcn.

## Task Breakdown

- [ ] **T-1**: Scaffold package webapp (Vite React TS) e registrazione workspace / turbo
- [ ] **T-2**: Tailwind + PostCSS + `content` paths + CSS globale
- [ ] **T-3**: shadcn/ui init e componente UI minimo di verifica sulla Home
- [ ] **T-4**: React Router, layout root, route Home placeholder (e opzionale `*`)
- [ ] **T-5**: Script `lint` / typecheck / test nel package; wiring `pnpm quality-gate`; README dev
- [ ] **T-6**: Verifica build prod, smoke, nota esplicita “deploy cloud fuori scope”

### Dependency Graph

```
T-1 ── T-2 ── T-3 ── T-4 ── T-5 ── T-6
```

### AC Coverage

| AC | Tasks |
| -- | ----- |
| AC-1 (dev + placeholder) | T-1, T-4, T-5, T-6 |
| AC-2 (build prod) | T-1, T-6 |
| AC-3 (router / navigazione) | T-4, T-6 |
| AC-4 (Tailwind + shadcn) | T-2, T-3, T-6 |
| AC-5 (quality gate) | T-1, T-5, T-6 |
| AC-6 (README senza AWS) | T-5, T-6 |

---

### T-1: Scaffold package webapp (Vite React TS) e registrazione workspace / turbo

**Priority:** P0 | **Estimated Hours:** 2h | **Bounded Context:** Piattaforma (EP-00)

**Summary:** Creare il package applicativo (path tipo `apps/web`): template Vite `react-ts`, dipendenze nel workspace, voce in `pnpm-workspace.yaml`, task `dev`/`build` in `turbo.json` se adottato.

**Type:** Configuration + Feature Implementation

**Description:** Nessun deploy; output `dist/` Vite. Nome package e filter `pnpm` documentati in README (T-5).

**Acceptance Criteria:**

- Primary deliverable: tree committabile, `pnpm install` dalla root ok.
- Quality standard: TypeScript coerente con policy monorepo (strict se richiesto).
- Integration requirement: comando documentato `pnpm --filter <pkg> dev` avvia Vite.
- Verification method: dev server risponde su porta attesa.

**Implementation Approach:**

- Files: `apps/web/package.json`, `vite.config.ts`, `tsconfig.json`, `src/main.tsx`, `index.html`.
- Standards: [tech-stack.md](../../tech/tech-stack.md).

**Dependencies:**

- Technical: [US-EP00-01](./us-ep00-01-monorepo-convenzioni-e-quality-gate.md) completata o branch con workspace funzionante.
- Tasks: nessuna.

**Implementation Steps:**

1. Generare o copiare scaffold Vite React TS nel path scelto.
2. Registrare il package nel workspace e nelle pipeline turbo.
3. Smoke `dev` e commit atomico opzionale.

**Testing Strategy:** Smoke manuale; test formali in T-5/T-6.

**Notes:** Se il repo usa altro bundler per ADR, aggiornare questa task e AC in PR (decisione da registrare se significativa).

---

### T-2: Tailwind + PostCSS + `content` paths + CSS globale

**Priority:** P0 | **Estimated Hours:** 1.5h | **Bounded Context:** Piattaforma

**Summary:** Installare Tailwind per Vite, `tailwind.config`, `postcss.config`, direttive `@tailwind` in entry CSS, glob `content` su `./index.html` e `./src/**/*` (inclusi futuri file `components/ui`).

**Type:** Configuration

**Description:** Verificare che classi utility sulla placeholder non vengano purgate in build.

**Acceptance Criteria:**

- Primary deliverable: stile utility visibile su componente root.
- Quality standard: build prod mantiene classi usate.
- Verification method: modifica classe in App e verifica in `pnpm build` + preview.

**Dependencies:** Tasks: T-1.

**Implementation Steps:** install deps; config; import CSS in `main.tsx`.

**Testing Strategy:** Controllo visivo + build.

**Notes:** Allineare major Tailwind a compatibilità shadcn scelta in T-3.

---

### T-3: shadcn/ui init e componente UI minimo di verifica sulla Home

**Priority:** P0 | **Estimated Hours:** 1.5h | **Bounded Context:** Piattaforma

**Summary:** Eseguire init shadcn nel package (`components.json`, alias `@/`), aggiungere un componente base (es. `Button`) renderizzato sulla Home per validare import e tema.

**Type:** Configuration + Feature Implementation

**Description:** Se init completo slitta, documentare in PR stato minimo (cartella `components/ui` + una primitive) e task follow-up — senza bloccare router T-4.

**Acceptance Criteria:**

- Primary deliverable: almeno un componente shadcn usabile e visibile.
- Quality standard: `cn()` / variabili CSS funzionanti; nessun errore di risoluzione path.
- Verification method: build dopo aggiunta componente.

**Dependencies:** Tasks: T-2.

**Implementation Steps:** `shadcn init`; `shadcn add button` (o equivalente); verificare `vite.config` alias.

**Testing Strategy:** Build; eventuale test RTL su Button in T-6.

**Technical Standards:** [ux-ui.md](../../tech/ux-ui.md).

**Notes:** Radix/Versions pin come da output generator.

---

### T-4: React Router, layout root, route Home placeholder (e opzionale `*`)

**Priority:** P0 | **Estimated Hours:** 2h | **Bounded Context:** Piattaforma

**Summary:** Installare `react-router-dom`, definire router (es. `createBrowserRouter`), layout root, route `/` con placeholder; opzionale route catch-all per messaggio 404 coerente con SPA.

**Type:** Feature Implementation

**Description:** Configurare Vite per SPA fallback in dev se necessario; documentare limitazione preview vs server statico reale.

**Acceptance Criteria:**

- Primary deliverable: navigazione tra almeno due route (es. `/` e `/about` stub) se utile al test AC-3.
- Quality standard: nessun warning router critico in console.
- Verification method: navigazione manuale e/o RTL.

**Dependencies:** Tasks: T-1; T-3 preferibile per UI coerente.

**Implementation Steps:** dipendenze router; `RouterProvider`; estrarre `routes.tsx` se utile.

**Testing Strategy:** RTL smoke `MemoryRouter` in T-5 o T-6.

**Notes:** Allineamento path base con futuro CloudFront (subfolder) fuori scope salvo nota README.

---

### T-5: Script `lint` / typecheck / test nel package; wiring `pnpm quality-gate`; README dev

**Priority:** P0 | **Estimated Hours:** 1.5h | **Bounded Context:** Piattaforma

**Summary:** Aggiungere script nel `package.json` webapp allineati al monorepo (`lint`, `ts:check` o `typecheck`, `test` con Vitest + smoke render App se il gate richiede test). Aggiornare root `package.json` / turbo / script `quality-gate` per **includere** il package webapp. README: Node/pnpm, comandi `dev`/`build`/`lint`/`test`, **nessun** deploy AWS in questa US.

**Type:** Configuration + Documentation

**Description:** Se il gate root non supporta ancora filter, documentare comando alternativo fino a estensione.

**Acceptance Criteria:**

- Primary deliverable: `pnpm quality-gate` (o comando adottato) verde con webapp nel perimetro.
- Quality standard: nessuno script che presuppone AWS.
- Verification method: esecuzione gate in CI locale.

**Dependencies:** Tasks: T-1; ideale post T-4 per test che importano router.

**Implementation Steps:** script; collegare turbo `dependsOn`; README sezione webapp.

**Testing Strategy:** Minimo un test Vitest che monta App/router mock.

**Technical Standards:** [way-of-working.md](../../tech/way-of-working.md), [testing/README.md](../../../knowledge/guidelines/testing/README.md).

**Notes:** Allineare nomi script a US-EP00-01.

---

### T-6: Verifica build prod, smoke, nota esplicita “deploy cloud fuori scope”

**Priority:** P0 | **Estimated Hours:** 1h | **Bounded Context:** Piattaforma

**Summary:** Eseguire `pnpm --filter <webapp> build`, opzionale `preview`; checklist AC1–AC6; confermare README che S3/CloudFront è fuori da questa merge.

**Type:** Testing + Documentation

**Description:** Artefatti `dist/` pronti per futura sync S3 senza eseguirla.

**Acceptance Criteria:**

- Primary deliverable: evidenza build ok (log) e smoke firmabile.
- Quality standard: ripetizione `pnpm quality-gate` finale senza regressioni.
- Verification method: checklist DoD story.

**Dependencies:** Tasks: T-1–T-5.

**Implementation Steps:** build; preview; aggiornare checklist PR; nessun secret in repo.

**Testing Strategy:** Manuale + gate; screenshot opzionale per review.

**Notes:** Story successiva o sotto-task infrastruttura: upload S3 + CF + URL pubblico.

---

**Refinement Completed By**: Pair (agent)  
**Refinement Date**: 2026-04-12  
**Review and Approval**: Product owner / team (da confermare)
