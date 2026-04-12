# US-EP01-01 — Login email/password e sessione (JWT/Strapi)

## Incremento corrente: **auth mock** (nessun server)

In questa tornata **non** è richiesto Strapi né API login reali: implementare un **layer di autenticazione mock** (es. adapter) che simula successo/errore, emette un **token fittizio** con **shape** allineato al futuro JWT Strapi, e consente di sostituire il mock con una sola integrazione quando il backend sarà disponibile. Il **rate limiting** lato server resta fuori scope; eventuale limite tentativi solo come opzione client-side documentata.

## Story Statement

**Come** abbonato **voglio** accedere alla webapp con email e password e mantenere una sessione sicura **affinché** solo utenti autenticati raggiungano le aree protette.

**Where:** webapp **React** (mobile-first): schermata login, persistenza sessione sul device, navigazione verso area autenticata dopo successo.

## Epic Context

**Parent Epic**: [EP-01 — Autenticazione, profilo e abbonamento](../epic/ep-01-membership-subscription.md)  
**Status**: Refined  
**Priority**: P0 (Must-Have)

### Status Workflow

- **Refined**: Story dettagliata, stimata, pronta allo sviluppo
- **In Progress**: Sviluppo attivo
- **Done**: Consegnata e accettata

## Riferimento visivo

Mock schermata login (titolo “Benvenuto”, campi pill Email/Password, CTA “Accedi” ghost outline, link “Password dimenticata?”): [`design-references/login-screen.png`](../design-references/login-screen.png).

## User Value

**User Benefit**: Ingresso standard e coerente con il futuro flusso Strapi Users & Permissions.  
**Business Impact**: Prerequisito per catalogo e learning protetti (PRD US 1.1 — parte login).  
**Visible UI Value**: Schermata login, feedback errori, redirect post-login; flusso **mock** indistinguibile in UX dal futuro flusso reale (stessa persistenza token sul device).

## Acceptance Criteria

### Functional Requirements (Given–When–Then)

1. **Given** l’utente non autenticato sulla schermata login  
   **When** inserisce **email e password** conformi alle **credenziali di test documentate** per il mock e tocca “Accedi”  
   **Then** il sistema considera l’accesso riuscito, persiste un **token mock** (forma compatibile con JWT futuro), e naviga alla **route Home** concordata con il router dell’app.

2. **Given** l’utente sulla schermata login  
   **When** inserisce credenziali **non** valide per il mock (o campi vuoti dove la validazione li rifiuta)  
   **Then** il sistema **non** autentica, **non** naviga all’area protetta, e mostra un **messaggio di errore** chiaro e accessibile (allineato al comportamento atteso con Strapi: messaggio generico sicuro, senza leak di dettagli interni).

3. **Given** un utente già autenticato (token mock ancora **valido** secondo le regole mock, es. non scaduto)  
   **When** riapre l’app o ricarica la pagina  
   **Then** resta autenticato e **non** deve reinserire email/password fino a scadenza o logout.

4. **Given** l’utente autenticato  
   **When** esegue **logout** (azione esposta dall’app, anche minima)  
   **Then** il token mock è **rimosso** dallo storage e le route protette richiedono di nuovo il login.

5. **Given** il pulsante “Accedi”  
   **When** l’utente mantiene la pressione (stato **:active** / press prolungato come da mock)  
   **Then** lo sfondo del pulsante è **bianco**, il testo **nero**, e l’etichetta resta **“Accedi”** (coerente con [login-screen.png](../design-references/login-screen.png)).

### Business Rules

- Solo **email + password** in questa story (niente OAuth, magic link, SSO).
- Le **credenziali accettate/rifiutate** dal mock devono essere **documentate** per QA e sviluppo (es. sezione in README dev o file dedicato sotto `.pair/` — **mai** segreti reali in repo).
- Il **payload minimo** associato al token mock deve consentire alla **Home protetta** di mostrare almeno identità di test (es. email o `username` mock) senza chiamare Strapi.
- **Nessuna** chiamata HTTP reale a Strapi `/auth/local` (o equivalente) in questa tornata; l’adapter mock è l’unico fornitore di auth per l’UI.
- Allineamento al bounded context **Membership** ([membership.md](../../tech/boundedcontext/membership.md)): interfaccia/strato pronta allo **swap** con API Strapi senza riscrivere la UI.

### Edge Cases and Error Handling

- **Input non valido**: email malformata o password vuota → validazione client con messaggio chiaro; nessuna navigazione.
- **Token scaduto o corrotto** (se simulato): trattare come non autenticato, pulire storage, mostrare login.
- **Storage indisponibile** (es. private mode restrittivo): comportamento definito in implementazione (messaggio o sessione solo in-memory) e nota in Technical Analysis.
- **Rate limiting**: nessun rate limit server; opzionale **throttle/debounce** lato client su submit ripetuti — se assente, documentare come limite noto fino al backend.

## Definition of Done Checklist

### Development Completion

- [ ] Tutti gli acceptance criteria verificati in locale.
- [ ] Adapter **auth mock** + punto di swap documentato (interfaccia verso futuro client Strapi).
- [ ] Token mock con **shape** documentata (header/payload minimi attesi dal frontend).
- [ ] Persistenza sessione implementata e coerente con la strategia in Technical Analysis.
- [ ] `pnpm quality-gate` (o gate adottato in [way-of-working.md](../../tech/way-of-working.md)) eseguito con successo sulla parte di codice toccata.

### Quality Assurance

- [ ] Test automatici su logica mock (unit/integration) senza Strapi in CI.
- [ ] Smoke manuale o E2E leggero: login ok, credenziali errate, persistenza al reload, logout.
- [ ] Accessibilità base su form e messaggi errore (label, `aria-*` dove applicabile).

### Deployment and Release

- [ ] Nessun requisito di deploy cloud per questa story in modalità mock; documentare eventuali variabili solo se introdotte.

## Story Sizing and Sprint Readiness

### Refined Story Points

**Final Story Points**: M (3)  
**Confidence Level**: Medium  
**Sizing Justification**: UI login + adapter mock + persistenza + test; integrazione Strapi **rimandata**; incertezza contenuta su storage cross-browser/PWA.

### Sprint Capacity Validation

**Sprint Fit Assessment**: Entra in uno sprint da **1 settimana** con focus unico su auth mock.  
**Development Time Estimate**: ~2–3 giorni netti (team singolo).  
**Testing Time Estimate**: ~0,5–1 giorno.  
**Total Effort Assessment**: **Sì**, entra in capacità sprint tipica.

### Story Splitting Recommendations

**Split non necessario** se si mantiene il vincolo “solo mock, niente Strapi”. Se il team constata slittamento, splittare in (A) form + navigazione + storage, (B) polish UX/a11y e test E2E.

## Dependencies and Coordination

### Story Dependencies

**Prerequisite Stories**: Shell/router avviabile (da [EP-00](../epic/ep-00-foundation-platform.md)) — **nice-to-have** se il login mock può vivere su route isolate in dev.  
**Dependent Stories**: catalogo e learning protetti (EP-02, EP-03) dipendono concettualmente da sessione; reset password ([US-EP01-02](./us-ep01-02-reset-password.md)) resta separato.  
**Shared Components**: componenti UI condivisi (design system / shadcn) se già presenti.

### Team Coordination

**Development Roles Involved**: Frontend (primario); Backend nessuno per questa tornata.

### External Dependencies

**Third-party Integrations**: Nessuna fino a incremento Strapi.  
**Infrastructure Requirements**: Nessuna.  
**Compliance Requirements**: Non loggare password in chiaro; messaggi errore sicuri.

## Validation and Testing Strategy

### Acceptance Testing Approach

**Testing Methods**: test unitari sull’adapter mock (successo, fallimento, scadenza se implementata); test di integrazione leggeri sul router/guard; opzionale Playwright/Cypress smoke se già adottato nel repo.  
**Test Data Requirements**: coppie email/password di test documentate nel repo (valide / invalide).  
**Environment Requirements**: build webapp locale; nessun ambiente Strapi.

### User Validation

**User Feedback Collection**: demo interna in sprint review (flusso login → Home).  
**Success Metrics**: 100% AC coperti da test o checklist manuale firmata.  
**Rollback Plan**: feature dietro flag o branch isolato se si introduce flag; altrimenti revert commit.

## Notes and Additional Context

Riferimento PRD §7 Epic 1 — US 1.1 (AC1). Allineato a EP-02 (catalogo mock): stesso approccio “UI prima, API dopo”.  
Titolo storico “rate limit”: in questo incremento solo menzione in edge case/opzionale client; rate limit **server** quando Strapi sarà integrato.

## Technical Analysis

### Implementation Approach

**Technical Strategy**: introdurre un’**interfaccia AuthProvider** (o equivalente) consumata da hook/context React; implementazione **MockAuthProvider** che risolve login in modo sincrono o con `Promise` minima, emette oggetto sessione + stringa token con struttura **JWT-like** (tre segmenti base64 separati da `.` oppure stringa opaca con metadati in session store — **documentare** la scelta).  
**Key Components**: pagina/route Login; form controllato; servizio mock; storage astratto (`getSession` / `setSession` / `clearSession`); guard su route protette; eventuale `AuthContext`.  
**Data Flow**: submit form → validazione client → mock adapter → persistenza token + profilo minimo → redirect Home; reload → lettura storage → ripristino sessione o logout implicito se invalida.  
**Integration Points**: futuro client HTTP verso Strapi `/auth/local` dietro la stessa interfaccia ([architecture.md](../../tech/architecture.md), [tech-stack.md](../../tech/tech-stack.md)).

### Technical Requirements

- **Persistenza (decisione MVP mock):** uso di **`localStorage` o `sessionStorage`** per il token mock, con nota sui limiti XSS rispetto a cookie **httpOnly** (quando Strapi sarà in uso, rivalutare con ADR dedicata). Preferenza team: **localStorage** per simulare “resta loggato” al reload, salvo vincoli PWA documentati.
- **Route Home:** allineare alla convenzione del router esistente o placeholder `/` — registrare la path effettiva nella PR.
- **Sicurezza MVP mock:** nessun dato reale; token non deve essere loggato in console in produzione.

### Technical Risks and Mitigation

| Risk | Impact | Probability | Mitigation Strategy |
| ---- | ------ | ----------- | ------------------- |
| Accoppiamento UI al mock difficile da sostituire | Alto | Media | Interfaccia stabile + un solo modulo “infra auth” da swap |
| Differenze PWA vs browser su storage | Medio | Media | Test su target principale; fallback documentato |
| Scope creep verso integrazione Strapi | Alto | Bassa | code review su assenza di fetch Strapi; CI senza backend |

### Spike Requirements

**Required Spikes**: Nessuno se la forma JWT attesa è già nota dal team; altrimenti micro-spike ≤0,5g su campi JWT Strapi reali da allineare al mock.

## Task Breakdown

- [ ] **T-1**: Contratti auth, documentazione token mock e credenziali di test
- [ ] **T-2**: Adapter `MockAuthProvider`, storage sessione e gestione token (incl. scadenza/corruzione)
- [ ] **T-3**: Schermata Login (form, validazione, errori, stato `:active` CTA)
- [ ] **T-4**: Bootstrap sessione al reload, route protette e redirect post-login
- [ ] **T-5**: Logout, pulizia storage e riallineamento guard
- [ ] **T-6**: Test automatici, smoke manuale/E2E leggero e note limite client/throttle

### Dependency Graph

```
        T-1
         │
        T-2
       ╱   ╲
     T-3   T-4
       ╲   ╱
        T-5
         │
        T-6
```

### AC Coverage

| AC | Tasks |
| -- | ----- |
| AC-1 (login ok, token, Home) | T-1, T-2, T-3, T-4 |
| AC-2 (credenziali errate / validazione) | T-1, T-2, T-3 |
| AC-3 (persistenza reload) | T-2, T-4 |
| AC-4 (logout) | T-2, T-5, T-4 |
| AC-5 (CTA `:active` mock) | T-3 |

---

### T-1: Contratti auth, documentazione token mock e credenziali di test

**Priority:** P0 | **Estimated Hours:** 2h | **Bounded Context:** Membership

**Summary:** Definire l’interfaccia stabile consumata dalla UI (es. `AuthProvider` / servizio login) e documentare forma token mock + credenziali di test accettate/rifiutate senza segreti reali.

**Type:** Documentation + Feature Implementation (scaffolding types)

**Description:** Allineare tipi e contratti al futuro swap Strapi: metodi login/logout, shape sessione utente minima per la Home, stringa token **JWT-like** o opaca con metadati (decisione esplicita). Aggiungere in README dev o `.pair/` la tabella credenziali mock e riferimento a [architecture.md](../../tech/architecture.md) / [tech-stack.md](../../tech/tech-stack.md).

**Acceptance Criteria:**

- Primary deliverable: moduli/types (o file contract) con interfaccia auth documentata; documento credenziali + forma token.
- Quality standard: nessuna password reale in repo; naming coerente con bounded context Membership.
- Integration requirement: consumabile da T-2/T-3 senza accoppiamento a Strapi.
- Verification method: review checklist + link da story DoD.

**Technical Requirements:**

- Functionality: contratto login (email/password) → risultato successo/errore tipizzato.
- Security: messaggi errore generici in specifica; vietato logging token/password.
- Compatibility: TypeScript strict se adottato nel package webapp.

**Implementation Approach:**

- Technical Design: file `auth.contract.ts` (o path package reale) + markdown credenziali es. `.pair/adoption/product/story/us-ep01-01-mock-credentials.md` o sezione README — una sola fonte verità.
- Bounded Context & Modules: Membership — layer anti-corruption verso futuro client HTTP.
- Files to Modify/Create: da adattare al monorepo (es. `apps/web/src/features/auth/contracts/*`, `docs/` o `.pair/`).
- Technical Standards: [code-design/README.md](../../../knowledge/guidelines/code-design/README.md), [security-guidelines.md](../../../knowledge/guidelines/quality-assurance/security/security-guidelines.md).

**Dependencies:**

- Technical: router/shell EP-00 se si importano tipi path condivisi (nice-to-have).
- Tasks: nessuna.

**Implementation Steps:**

1. Definire tipi `AuthSession`, `LoginResult`, errori dominio mock.
2. Documentare segmenti token / payload minimo atteso dalla Home.
3. Elencare coppie email/password di test (valide/invalide/vuote).
4. Cross-link dalla story/README dev.

**Testing Strategy:**

- Unit Tests: n/d (tipi); opzionale test contract export.
- Integration Tests: n/d.
- Manual Testing: verifica che QA trovi credenziali in un solo posto.

**Notes:** Se manca allineamento JWT Strapi, micro-spike prima di fissare la shape nel doc.

---

### T-2: Adapter `MockAuthProvider`, storage sessione e gestione token (incl. scadenza/corruzione)

**Priority:** P0 | **Estimated Hours:** 4h | **Bounded Context:** Membership

**Summary:** Implementare provider mock + storage astratto (`getSession` / `setSession` / `clearSession`) con preferenza `localStorage`, simulazione scadenza/corruzione e fallback se storage indisponibile (comportamento + nota in Technical Analysis).

**Type:** Feature Implementation

**Description:** Nessuna fetch Strapi. Login risolve contro credenziali documentate in T-1; persistenza token + profilo minimo; trattamento token scaduto/corrotto con clear e stato non autenticato.

**Acceptance Criteria:**

- Primary deliverable: `MockAuthProvider` (o equivalente) + modulo storage testabile.
- Quality standard: logica priva di I/O nascosto non mockabile; nessun `fetch` verso `/auth/local`.
- Integration requirement: esposto via React Context/hook usati da T-3/T-4/T-5.
- Verification method: test unitari su successo/fallimento/scadenza (se implementata).

**Technical Requirements:**

- Functionality: allineamento AC edge case token; opzionale debounce submit (se assente, nota limite in T-6).
- Security: no password in log; token non loggato in build prod.
- Compatibility: gestione `localStorage` try/catch o feature detect.

**Implementation Approach:**

- Technical Design: adapter unico sostituibile; session restore idempotente al mount root.
- Bounded Context & Modules: Membership — infrastruttura auth frontend.
- Files to Modify/Create: `features/auth/mock/*`, `features/auth/storage/*`, provider in layout app.
- Technical Standards: [testing/README.md](../../../knowledge/guidelines/testing/README.md).

**Dependencies:**

- Tasks: T-1.

**Implementation Steps:**

1. Implementare storage adapter con API minima.
2. Implementare mock login contro documentazione T-1.
3. Opzionale: scadenza simulata (claim `exp` o timer documentato).
4. Collegare provider al tree React (preparazione T-3/T-4).

**Testing Strategy:**

- Unit Tests: successo login, credenziali errate, corruzione/clear, storage failure path.
- Integration Tests: provider + consumer fittizio.
- Manual Testing: reload dopo login con token valido.

**Notes:** Documentare in Technical Analysis (sezione story) il fallback scelto per storage bloccato.

---

### T-3: Schermata Login (form, validazione, errori, stato `:active` CTA)

**Priority:** P0 | **Estimated Hours:** 4h | **Bounded Context:** Membership

**Summary:** Route/pagina Login mobile-first conforme a [login-screen.png](../design-references/login-screen.png): form controllato, validazione client (email/password vuota), messaggi errore accessibili, CTA “Accedi” con stato pressione (sfondo bianco, testo nero, label invariata).

**Type:** Feature Implementation

**Description:** Integrare submit con adapter T-2; su successo delegare redirect a T-4; su errore mostrare messaggio generico sicuro. Link “Password dimenticata?” può essere stub non funzionale (fuori scope US-EP01-02).

**Acceptance Criteria:**

- Primary deliverable: UI login utilizzabile in dev e coerente col mock visivo.
- Quality standard: label associate, `aria-invalid` / `aria-describedby` dove utile.
- Integration requirement: usa solo contratto T-1/T-2 (nessuna chiamata Strapi).
- Verification method: test component/integration su validazione e messaggi; controllo visivo stato `:active`.

**Technical Requirements:**

- Functionality: copre AC1 credenziali valide, AC2 invalidi/vuoti, AC5 stato pulsante.
- Performance: opzionale debounce/throttle documentato se implementato.
- Security: messaggi errore senza leak interni.

**Implementation Approach:**

- Technical Design: componenti riutilizzabili design system se presenti (shadcn ecc.).
- Bounded Context & Modules: Membership — UI ingresso.
- Files to Modify/Create: `features/auth/pages/Login*`, stili CSS/Tailwind.
- Technical Standards: linee guida UI/a11y progetto.

**Dependencies:**

- Tasks: T-2 (o parallelizzabile dopo stub hook se si mocka temporaneamente — preferenza: sequenza T-2 → T-3).

**Implementation Steps:**

1. Creare route login e layout.
2. Collegare form a `login` mock.
3. Implementare validazione e messaggi.
4. Stili stato `:active` / press per CTA.

**Testing Strategy:**

- Unit Tests: validazione email/password.
- Integration Tests: submit ok/ko con provider mock.
- Manual Testing: confronto screenshot mock.

**Notes:** Path route Home effettiva registrata in PR (allineamento T-4).

---

### T-4: Bootstrap sessione al reload, route protette e redirect post-login

**Priority:** P0 | **Estimated Hours:** 3h | **Bounded Context:** Membership

**Summary:** All’avvio app, leggere storage e ripristinare sessione valida; definire guard su route protette e redirect verso login se anonimo; dopo login riuscito navigare alla Home concordata con il router.

**Type:** Feature Implementation

**Description:** Garantire che utente autenticato non veda login fino a logout/scadenza; deep link su route protette reindirizza a login con return URL se previsto dal router.

**Acceptance Criteria:**

- Primary deliverable: HOC/layout `ProtectedRoute` (o pattern router adottato) + wiring bootstrap.
- Quality standard: nessun flash contenuti sensibili pre-check (loader/skeleton minimo se necessario).
- Integration requirement: coerente con convenzione path EP-00.
- Verification method: test integrazione router + manuale reload.

**Technical Requirements:**

- Functionality: copre AC1 redirect Home, AC2 non accesso area protetta, AC3 persistenza.
- Compatibility: SSR disabilitato o no-op se stack lo richiede (documentare).

**Implementation Approach:**

- Technical Design: single place per “auth ready” flag per evitare race su prima navigazione.
- Bounded Context & Modules: Membership + shell routing.
- Files to Modify/Create: router config, `ProtectedLayout`, `App` bootstrap.

**Dependencies:**

- Tasks: T-2.

**Implementation Steps:**

1. Hook di idratazione sessione al mount.
2. Implementare guard e redirect.
3. Collegare redirect post-login dalla pagina Login.
4. Documentare path Home in PR.

**Testing Strategy:**

- Unit Tests: helper guard (se puri).
- Integration Tests: scenario anonimo vs autenticato.
- Manual Testing: reload su `/` e su route protetta.

**Notes:** Allineamento esplicito con EP-00 router.

---

### T-5: Logout, pulizia storage e riallineamento guard

**Priority:** P0 | **Estimated Hours:** 2h | **Bounded Context:** Membership

**Summary:** Esporre azione logout minima (es. header/profile placeholder) che invoca `clearSession`, aggiorna stato auth e riporta al login; verificare che le guard richiedano di nuovo credenziali.

**Type:** Feature Implementation

**Description:** Logout deve essere raggiungibile in dev (anche entry temporanea in UI); nessuna chiamata server.

**Acceptance Criteria:**

- Primary deliverable: comando logout user-visible + stato coerente.
- Quality standard: storage vuoto dopo logout; nessun token residuo in memoria applicativa.
- Integration requirement: coerente con T-2/T-4.
- Verification method: test unit su clear + manuale navigazione.

**Technical Requirements:**

- Functionality: soddisfa AC4.
- Security: dopo logout, fetch successivi non devono presumere sessione (se presenti).

**Implementation Approach:**

- Technical Design: `logout()` su context condiviso.
- Bounded Context & Modules: Membership.
- Files to Modify/Create: componente header/settings stub o pagina dev-only documentata.

**Dependencies:**

- Tasks: T-2, T-4 (per verifica guard).

**Implementation Steps:**

1. Implementare `logout` nel provider.
2. UI trigger + navigazione a login.
3. Verifica route protette post-logout.

**Testing Strategy:**

- Unit Tests: clear session idempotente.
- Integration Tests: logout → accesso protetto negato.
- Manual Testing: smoke checklist story.

**Notes:** Se US header (EP-02) non pronta, usare toggle dev documentato.

---

### T-6: Test automatici, smoke manuale/E2E leggero e note limite client/throttle

**Priority:** P0 | **Estimated Hours:** 3h | **Bounded Context:** Membership

**Summary:** Consolidare suite: unit su mock, integrazione leggera router/guard, smoke manuale o E2E se tool già adottato; documentare assenza rate limit server e opzione throttle client.

**Type:** Testing + Documentation

**Description:** Eseguire `pnpm quality-gate` sul package toccato; aggiornare checklist DoD story; segnare limiti noti fino a backend.

**Acceptance Criteria:**

- Primary deliverable: test verdi in CI senza Strapi; doc limite rate limit / throttle.
- Quality standard: copertura scenari AC principali (happy, errore, reload, logout).
- Integration requirement: gate adottato in [way-of-working.md](../../tech/way-of-working.md).
- Verification method: `pnpm quality-gate` + eventuale comando package.

**Technical Requirements:**

- Functionality: mappa a tutti gli AC per verifica finale.
- Compatibility: test stabili headless.

**Implementation Approach:**

- Technical Design: preferire RTL/Vitest; Playwright/Cypress solo se già nel repo.
- Bounded Context & Modules: Membership — QA.
- Files to Modify/Create: `*.test.ts(x)`, `e2e/*` se esiste tooling.

**Dependencies:**

- Tasks: T-1–T-5.

**Implementation Steps:**

1. Aggiungere/rafforzare test mancanti per percorsi critici.
2. Scrivere istruzioni smoke manuale (login, errato, reload, logout).
3. Annotare throttle client opzionale o limite noto.
4. Lanciare quality gate e fissare regressioni.

**Testing Strategy:**

- Unit Tests: mock adapter completo.
- Integration Tests: flusso navigazione.
- Manual Testing: checklist firmabile per PO.

**Notes:** Se E2E non adottato, esplicitare in DoD e usare smoke manuale.

---

**Refinement Completed By**: Pair (agent)  
**Refinement Date**: 2026-04-12  
**Review and Approval**: Product owner / team (da confermare)
