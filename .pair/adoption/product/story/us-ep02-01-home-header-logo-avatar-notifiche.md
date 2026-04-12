# US-EP02-01 — Header Home: logo, avatar notifiche e badge

## Story Statement

**Come** utente sulla Home **voglio** un header con logo e avatar che apre le notifiche, con badge se ci sono notifiche non lette **affinché** capisca subito se c’è qualcosa da leggere senza navigazioni extra in questa release.

**Where:** schermata **Home** della webapp **React** (layout mobile-first), in cima al contenuto principale.

## Epic Context

**Parent Epic**: [EP-02 — Discovery, ricerca e catalogo](../epic/ep-02-catalog-discovery.md)  
**Status**: Refined  
**Priority**: P0 (Must-Have)

### Status Workflow

- **Refined**: Story dettagliata, stimata, pronta allo sviluppo
- **In Progress**: Sviluppo attivo
- **Done**: Consegnata e accettata

## Riferimento visivo

Header su fondo scuro: wordmark **Learnn** a sinistra; a destra avatar circolare (iniziali) con **badge rosso** in alto a destra se ci sono notifiche: [`design-references/header.png`](../design-references/header.png).

Il mockup include **“Home”** e **“My Learnn”** al centro: restano **fuori scope** in questa release (solo logo + avatar come da [piano epic](../epic/ep-02-catalog-discovery.md)).

## User Value

**User Benefit**: Accesso rapido al centro notifiche dalla Home.  
**Business Impact**: Allinea a incremento notifiche (maschera completa in PBI successivo).  
**Visible UI Value**: Header con logo; avatar cliccabile; badge rosso su avatar se `count > 0`; al tap overlay/modale con **solo elenco titoli** notifiche (contenuto maschera completato in release futura).

## Acceptance Criteria

### Functional Requirements (Given–When–Then)

1. **Given** l’utente sulla route **Home** (area autenticata come da [US-EP01-01](./us-ep01-01-login-sessione-e-rate-limit.md) / guard applicativo)  
   **When** la pagina è renderizzata  
   **Then** vede un **header** su fondo scuro con **wordmark/logo Learnn** allineato a sinistra e **avatar circolare** a destra (iniziali derivate dai dati utente mock o da sessione, coerente con design).

2. **Given** il mock notifiche con **zero** notifiche non lette  
   **When** l’header è visibile  
   **Then** **nessun** badge rosso sull’avatar (o badge nascosto / `count` non esposto visivamente).

3. **Given** il mock notifiche con **count > 0** di notifiche non lette  
   **When** l’header è visibile  
   **Then** sull’avatar compare un **badge rosso** in posizione **alto-destra** (come [header.png](../design-references/header.png)), indicatore visivo di presenza messaggi da leggere.

4. **Given** l’header con avatar  
   **When** l’utente tocca/attiva l’avatar (area notifiche)  
   **Then** si apre un **overlay o modale** che elenca **solo i titoli** delle notifiche mock (ordine stabile documentato o per data mock); **nessun** dettaglio corpo, **nessuna** azione “segna come letto” persistita in questa story.

5. **Given** la modale/overlay notifiche aperta  
   **When** l’utente chiude con **tap fuori area**, pulsante chiudi, o **Esc** (desktop)  
   **Then** la maschera si chiude e l’utente resta sulla Home con header invariato.

6. **Given** l’header  
   **When** si ispeziona il markup  
   **Then** link testuali **“Home”** e **“My Learnn”** nel centro header **non** sono presenti (fuori scope esplicito epic).

### Business Rules

- Dati notifiche **solo mock** lato client (lista titoli + flag letto/non letto per calcolo badge), struttura compatibile con futura API Strapi senza accoppiare la UI al trasporto HTTP in questa release.
- Il **count** del badge riflette **solo** notifiche **non lette** secondo il modello mock (es. campo `read: false`); se in mock tutte lette, `count === 0`.
- **Nessun** fetch HTTP reale a Strapi per notifiche in questa tornata.
- Allineamento contesto **Catalog & Publishing** per merchandising Home ([catalog-and-publishing.md](../../tech/boundedcontext/catalog-and-publishing.md)): questo PBI copre **solo** chrome header/notifiche parziale, non le sezioni catalogo sottostanti.

### Edge Cases and Error Handling

- **Lista titoli vuota** ma stato incoerente (es. count > 0 senza titoli): trattare come **bug di fixture** — in QA i mock devono essere coerenti; in UI mostrare lista vuota e preferibilmente **nascondere** badge (definizione implementativa: badge solo se `titles.length > 0` e unread > 0).
- **Utente non autenticato** che raggiunge la Home: la route Home è **protetta** dalla sessione introdotta in EP-01; se la guard non è ancora mergeata, comportamento interino: **non** mostrare flusso notifiche reale — placeholder o redirect documentato in Technical Analysis (da rimuovere quando la guard è attiva).
- **Viewport molto stretto**: logo e avatar restano usabili senza sovrapposizione (overflow gestito, tap target minimo ~44px dove possibile).
- **Accessibilità**: avatar/notifiche devono essere attivabili da **tastiera** e annunciare stato badge (es. `aria-label` con conteggio o “hai notifiche non lette”).

## Definition of Done Checklist

### Development Completion

- [ ] Tutti gli acceptance criteria verificati in locale.
- [ ] Fixture/mock notifiche isolato in modulo dedicato (facile da sostituire con API).
- [ ] `pnpm quality-gate` (o comando adottato in [way-of-working.md](../../tech/way-of-working.md)) verde sulla parte toccata.

### Quality Assurance

- [ ] Test UI (component/integration) per: badge assente con count 0; badge presente con count > 0; apertura/chiusura modale; assenza link “Home” / “My Learnn” nell’header.
- [ ] Smoke manuale su mobile vs desktop per overlay e chiusura.
- [ ] Card ratio **4:5** sulle **card catalogo** resta nelle story slider dedicate — **non** requisito di questa story sull’avatar (solo coerenza visiva generale).

### Deployment and Release

- [ ] Nessun deploy backend richiesto; solo build webapp.

## Story Sizing and Sprint Readiness

### Refined Story Points

**Final Story Points**: M (3)  
**Confidence Level**: High  
**Sizing Justification**: UI header + stato mock + modale titoli + test; nessuna integrazione server; rischio principale = scope creep su maschera notifiche (mitigato da fuori-scope esplicito).

### Sprint Capacity Validation

**Sprint Fit Assessment**: Adatto a sprint **1 settimana** con altri item paralleli leggeri.  
**Development Time Estimate**: ~2 giorni.  
**Testing Time Estimate**: ~0,5 giorni.  
**Total Effort Assessment**: **Sì**, entra in capacità.

### Story Splitting Recommendations

Split non necessario. Se slitta, (A) solo header+badge, (B) modale titoli in follow-up minore — preferibile evitare per non perdere valore demo.

## Dependencies and Coordination

### Story Dependencies

**Prerequisite Stories**: [US-EP01-01](./us-ep01-01-login-sessione-e-rate-limit.md) per **sessione** e accesso area autenticata (guard route Home); [EP-00](../epic/ep-00-foundation-platform.md) per shell/router/layout base se già definito.  
**Dependent Stories**: slider e altre sezioni Home possono riusare lo stesso shell/header.  
**Shared Components**: componenti layout/design system (Tailwind + shadcn/ui per [tech-stack.md](../../tech/tech-stack.md)).

### Team Coordination

**Development Roles Involved**: Frontend. **UX**: conferma pixel badge e modale vs [header.png](../design-references/header.png).

### External Dependencies

**Third-party Integrations**: Nessuna.  
**Infrastructure Requirements**: Nessuna.

## Validation and Testing Strategy

### Acceptance Testing Approach

**Testing Methods**: React Testing Library su `Header` / `NotificationBell` (o equivalenti): assert presenza logo, badge condizionato, lista titoli in modale, chiusura; eventuale snapshot controllato se già pratica nel repo.  
**Test Data Requirements**: almeno due fixture: `notificationsUnreadZero`, `notificationsUnreadPositive` con titoli noti.  
**Environment Requirements**: webapp locale, nessun Strapi.

### User Validation

**User Feedback Collection**: demo sprint review (badge on/off, tap modale).  
**Success Metrics**: AC coperti da test automatizzati + checklist manuale design.  
**Rollback Plan**: revert commit o feature branch isolato.

## Notes and Additional Context

Incremento prodotto concordato: **mock** lato client; maschera notifiche **parziale** fino a PBI dedicato (azioni, dettaglio, mark-as-read server-side). Coerente con tabella story in [EP-02](../epic/ep-02-catalog-discovery.md).

## Technical Analysis

### Implementation Approach

**Technical Strategy**: implementare un **layout region** “HomeHeader” composito: logo (asset SVG/PNG o testo stilizzato da design system), trigger notifiche (avatar + badge come overlay CSS), stato modale controllato in React. Mock notifiche: array in memoria o modulo `fixtures/notifications.mock.ts` con shape `{ id, title, read }` estendibile verso DTO Strapi.  
**Key Components**: `AppHeader` / `HomeHeader`; `NotificationTray` (modale); hook `useNotificationSummary` che legge mock.  
**Data Flow**: mount Home → hook legge mock → deriva `unreadCount` e `titles` → badge e lista; tap avatar → `open`; chiusura → `close`.  
**Integration Points**: nessuna API in questa release; barriera anti-corruption: interfaccia `NotificationPort` con implementazione `MockNotificationAdapter`.

### Technical Requirements

- Styling allineato a **fondo scuro** e contrasto WCAG su testo/badge dove applicabile.
- Focus trap opzionale nella modale; almeno gestione focus semplice (primo elemento focusabile o `role="dialog"` + `aria-modal` se si usa pattern dialog).

### Technical Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
| ---- | ------ | ----------- | ---------- |
| Scope creep su maschera notifiche completa | Alto | Media | AC e fuori-scope in review; niente nuove azioni senza nuovo PBI |
| Duplicazione header tra route | Medio | Bassa | Estrarre layout condiviso o slot documentato |
| Incertezza su guard auth vs placeholder | Medio | Bassa | Allineamento esplicito con US-EP01-01; TODO rimovibile post-merge guard |

### Spike Requirements

**Required Spikes**: Nessuno.

## Task Breakdown

- [ ] **T-1**: `NotificationPort`, adapter mock e fixture notifiche (shape + ordine)
- [ ] **T-2**: Hook `useNotificationSummary` (count non letti, titoli, edge case lista vuota)
- [ ] **T-3**: `HomeHeader`: fondo scuro, wordmark, avatar con iniziali, assenza link centrali
- [ ] **T-4**: `NotificationTray`: overlay/modale solo titoli, apertura da avatar, chiusura e a11y
- [ ] **T-5**: Integrazione su route Home (layout autenticato) e nota guard EP-01
- [ ] **T-6**: Test RTL/integration, smoke manuale, `pnpm quality-gate`

### Dependency Graph

```
T-1 ── T-2 ── T-3 ── T-4 ── T-5 ── T-6
```

### AC Coverage

| AC | Tasks |
| -- | ----- |
| AC-1 (header Home: logo + avatar) | T-3, T-5 |
| AC-2 (count 0 → nessun badge) | T-2, T-3, T-6 |
| AC-3 (count > 0 → badge rosso) | T-2, T-3, T-6 |
| AC-4 (tap avatar → lista solo titoli) | T-2, T-3, T-4, T-6 |
| AC-5 (chiusura overlay/modale) | T-4, T-6 |
| AC-6 (assenza “Home” / “My Learnn”) | T-3, T-5, T-6 |

---

### T-1: `NotificationPort`, adapter mock e fixture notifiche (shape + ordine)

**Priority:** P0 | **Estimated Hours:** 2h | **Bounded Context:** Catalog & Publishing (chrome Home; dati notifiche mock)

**Summary:** Introdurre interfaccia `NotificationPort` (o equivalente) con implementazione `MockNotificationAdapter`, dati in memoria/modulo dedicato, shape `{ id, title, read }` estendibile verso DTO Strapi; due fixture come da story (`notificationsUnreadZero`, `notificationsUnreadPositive`); documentare ordine stabile titoli in mock.

**Type:** Feature Implementation + Documentation

**Description:** Nessun `fetch` HTTP. Modulo isolato sostituibile (anti-corruption). Allineamento a [catalog-and-publishing.md](../../tech/boundedcontext/catalog-and-publishing.md) per scope chrome Home.

**Acceptance Criteria:**

- Primary deliverable: file contract + mock adapter + fixture esportate e coerenti (count ↔ titoli non letti).
- Quality standard: nessun accoppiamento UI al trasporto; tipi TypeScript chiari.
- Integration requirement: consumabile da T-2 senza import circolari verso componenti React se possibile.
- Verification method: review + test unitari su adapter in T-6 (o mini-test in T-1 se preferito).

**Technical Requirements:**

- Functionality: coerenza fixture per QA; regola edge “lista vuota ma unread” risolta a livello dati (preferire fixture coerenti) e documentata per T-2/T-3.
- Security: titoli mock non sensibili; nessun endpoint reale.

**Implementation Approach:**

- Technical Design: `fixtures/notifications.mock.ts` + `notifications.port.ts` + `mockNotifications.adapter.ts` (nomi adattati al repo).
- Bounded Context & Modules: Catalog & Publishing — chrome; preparazione verso futura API.
- Files to Modify/Create: sotto feature home/header o `features/notifications/` condiviso.
- Technical Standards: [code-design/README.md](../../../knowledge/guidelines/code-design/README.md).

**Dependencies:**

- Technical: sessione utente per iniziali opzionale da [US-EP01-01](./us-ep01-01-login-sessione-e-rate-limit.md) (solo shape dati, non bloccante per fixture titoli).
- Tasks: nessuna.

**Implementation Steps:**

1. Definire tipo notifica e interfaccia port (es. `listNotifications(): NotificationItem[]` o lettura sincrona da store mock).
2. Implementare adapter mock e fixture zero / positive.
3. Documentare ordine titoli (es. per `createdAt` mock o ordine array fisso).

**Testing Strategy:**

- Unit Tests: derivazione `read` / conteggio su fixture (se logica non banale).
- Manual Testing: n/d.

**Notes:** Se esiste già cartella design system, non duplicare tipi globali.

---

### T-2: Hook `useNotificationSummary` (count non letti, titoli, edge case lista vuota)

**Priority:** P0 | **Estimated Hours:** 2h | **Bounded Context:** Catalog & Publishing

**Summary:** Hook che espone `unreadCount`, elenco titoli per modale (solo non lette o tutte con flag — da fissare in implementazione ma coerente con AC), e regola **badge visibile solo se** `unreadCount > 0` **e** `titoliDaMostrare.length > 0` (allineamento edge case story).

**Type:** Feature Implementation

**Description:** Legge da T-1; nessuno stato server; memoizzazione se necessario.

**Acceptance Criteria:**

- Primary deliverable: hook testabile con RTL.
- Quality standard: regola badge vs lista vuota centralizzata qui (single source of truth).
- Integration requirement: API stabile per T-3/T-4.
- Verification method: unit/integration hook.

**Technical Requirements:**

- Functionality: count = solo `read: false` come da business rules.
- Performance: evitare ricalcoli inutili su ogni render se lista grande (MVP: lista piccola).

**Implementation Approach:**

- Technical Design: `useNotificationSummary()` → `{ unreadCount, titles, ... }`.
- Bounded Context & Modules: stesso package feature Home.
- Files to Modify/Create: `useNotificationSummary.ts`.

**Dependencies:**

- Tasks: T-1.

**Implementation Steps:**

1. Collegare hook all’adapter mock (injection o import modulo fixture per MVP).
2. Implementare filtro titoli non letti per lista modale se richiesto dagli AC (“titoli delle notifiche mock” — allineare a lista non lette o tutte con etichetta; default: mostrare titoli con `read: false` per coerenza badge).
3. Esportare helper puro per badge `showBadge` se utile ai test.

**Testing Strategy:**

- Unit Tests: count 0, count > 0, lista vuota con unread>0 (badge false).
- Integration Tests: con provider React se necessario.

**Notes:** Allineare con PO se la modale deve mostrare solo unread o tutte le notifiche: gli AC dicono “titoli delle notifiche mock” e badge su non lette — interpretazione consigliata: **lista titoli = notifiche non lette** per demo coerente.

---

### T-3: `HomeHeader`: fondo scuro, wordmark, avatar con iniziali, assenza link centrali

**Priority:** P0 | **Estimated Hours:** 3h | **Bounded Context:** Catalog & Publishing

**Summary:** Componente header mobile-first su fondo scuro: wordmark/logo Learnn a sinistra, avatar circolare a destra con iniziali da sessione mock / profilo minimo EP-01; **nessun** link testuale “Home” / “My Learnn” al centro (AC6); tap target ~44px dove possibile; niente sovrapposizione logo/avatar su viewport stretti.

**Type:** Feature Implementation

**Description:** Badge visivo delegato a stili overlay in questo task o composizione con T-4: header espone slot/trigger per modale. Integrare `showBadge` da T-2.

**Acceptance Criteria:**

- Primary deliverable: `HomeHeader` (o `AppHeader` home-only) conforme a [header.png](../design-references/header.png) per logo+avatar.
- Quality standard: contrasto e colori coerenti con dark header; responsive.
- Integration requirement: props/hook da T-2; dati utente da sessione se disponibile.
- Verification method: RTL snapshot selettivo + controllo assenza nodi “Home”/“My Learnn” centrali.

**Technical Requirements:**

- Functionality: AC1, AC2/AC3 tramite dati da hook (badge render condizionato).
- Compatibility: touch e mouse.

**Implementation Approach:**

- Technical Design: layout flex; avatar `button` con `aria-haspopup`, `aria-expanded` collegato a T-4.
- Bounded Context & Modules: layout Home.
- Files to Modify/Create: `HomeHeader.tsx`, asset logo se previsti da [tech-stack.md](../../tech/tech-stack.md).
- Technical Standards: [code-design/README.md](../../../knowledge/guidelines/code-design/README.md), linee guida a11y progetto.

**Dependencies:**

- Tasks: T-2.

**Implementation Steps:**

1. Strutturare markup region landmark se utile (`header`, `banner`).
2. Legare iniziali a email/`username` sessione o fallback mock documentato.
3. Applicare stili dark + wordmark.
4. Verificare assenza link centrali (queryByRole/queryByText nei test).

**Testing Strategy:**

- Unit Tests: rendering iniziali, presenza logo, assenza stringhe fuori scope.
- Manual Testing: confronto screenshot.

**Notes:** Se guard EP-01 non mergeata, header su Home può restare dietro flag dev — documentare in T-5.

---

### T-4: `NotificationTray`: overlay/modale solo titoli, apertura da avatar, chiusura e a11y

**Priority:** P0 | **Estimated Hours:** 3h | **Bounded Context:** Catalog & Publishing

**Summary:** Overlay o dialog: elenco **solo titoli** (nessun corpo, nessuna azione mark-as-read persistita); apertura al tap/Enter sul trigger avatar; chiusura: click backdrop, pulsante chiudi, **Esc** su desktop; focus gestito (`role="dialog"`, `aria-modal` dove appropriato, label collegata).

**Type:** Feature Implementation

**Description:** Comporre con lista titoli da T-2; stato `open` controllato dal parent (header) o context locale stretto.

**Acceptance Criteria:**

- Primary deliverable: modale accessibile da tastiera e screen reader per stato badge + apertura.
- Quality standard: niente scroll infinito su MVP; lista titoli semplice.
- Integration requirement: chiusura non altera header (AC5).
- Verification method: RTL (open/close, Esc), test a11y base.

**Technical Requirements:**

- Functionality: AC4, AC5; nessuna persistenza “letto”.
- Security: n/d.

**Implementation Approach:**

- Technical Design: shadcn `Dialog` se già in stack; altrimenti implementazione leggera con lock scroll opzionale.
- Bounded Context & Modules: UI condivisibile con future notifiche complete.
- Files to Modify/Create: `NotificationTray.tsx`, collegamento in `HomeHeader`.

**Dependencies:**

- Tasks: T-3 (trigger); T-2 (dati).

**Implementation Steps:**

1. Stato aperto/chiuso e passaggio titoli.
2. Implementare chiusura backdrop / bottone / `keydown` Esc.
3. Aggiungere `aria-label` su trigger con conteggio o messaggio “hai notifiche non lette”.
4. Verificare tap target e non focus trap eccessivo (MVP: focus semplice accettabile se documentato).

**Testing Strategy:**

- Unit/Integration Tests: apertura, chiusura tre vie, lista titoli corretta.
- Manual Testing: mobile overlay vs desktop.

**Notes:** Focus trap opzionale per MVP — se omesso, nota in PR.

---

### T-5: Integrazione su route Home (layout autenticato) e nota guard EP-01

**Priority:** P0 | **Estimated Hours:** 2h | **Bounded Context:** Catalog & Publishing + shell (EP-00)

**Summary:** Montare `HomeHeader` sulla route Home autenticata; se guard assente, comportamento interino (placeholder/redirect) come da edge case story — TODO rimovibile post-merge [US-EP01-01](./us-ep01-01-login-sessione-e-rate-limit.md).

**Type:** Feature Implementation + Documentation

**Description:** Evitare duplicazione header su altre route: un solo entry point layout Home documentato.

**Acceptance Criteria:**

- Primary deliverable: Home renderizza header completo (logo, avatar, flusso modale).
- Quality standard: nessuna regressione route; coerenza con router EP-00.
- Integration requirement: dipendenza esplicita da sessione quando disponibile.
- Verification method: navigazione manuale verso `/` (o path Home adottato).

**Technical Requirements:**

- Functionality: AC1 in contesto reale route.
- Compatibility: coesistenza con future sezioni slider sotto header.

**Implementation Approach:**

- Technical Design: layout wrapper `HomeLayout` con header sticky/top se da PRD.
- Bounded Context & Modules: pagina Home.
- Files to Modify/Create: route Home, layout exports.

**Dependencies:**

- Tasks: T-4.

**Implementation Steps:**

1. Inserire header nel layout Home.
2. Verificare che utente non autenticato non veda flusso notifiche reale (redirect o placeholder).
3. Annotare in codice/README breve nota guard.

**Testing Strategy:**

- Integration Tests: smoke route Home con mock auth se presente nel repo.
- Manual Testing: flusso login mock → Home → header.

**Notes:** Path Home effettivo allineato a US-EP01-01 / EP-00.

---

### T-6: Test RTL/integration, smoke manuale, `pnpm quality-gate`

**Priority:** P0 | **Estimated Hours:** 3h | **Bounded Context:** Catalog & Publishing (QA)

**Summary:** Coprire: badge assente/presente; apertura/chiusura modale; assenza link centrali; eventuale keyboard; eseguire `pnpm quality-gate` sul package toccato.

**Type:** Testing + Documentation

**Description:** Allineare DoD story; due fixture usate nei test.

**Acceptance Criteria:**

- Primary deliverable: suite verde senza Strapi.
- Quality standard: copertura scenari elencati in story Validation.
- Integration requirement: [way-of-working.md](../../tech/way-of-working.md) quality gate.
- Verification method: CI locale `pnpm quality-gate`.

**Technical Requirements:**

- Functionality: mappa verifica su tutti gli AC.
- Compatibility: test stabili (timers mock se animazioni).

**Implementation Approach:**

- Technical Design: RTL + Vitest come da [testing/README.md](../../../knowledge/guidelines/testing/README.md).
- Files to Modify/Create: `*.test.tsx` accanto ai componenti o `__tests__/`.

**Dependencies:**

- Tasks: T-1–T-5.

**Implementation Steps:**

1. Scrivere test badge 0 / >0.
2. Test modale titoli e chiusura.
3. Assert assenza “Home” / “My Learnn” nell’header.
4. Lanciare quality gate e sistemare lint/tipi.

**Testing Strategy:**

- Unit Tests: hook + adapter se non già coperti.
- Integration Tests: header + tray.
- Manual Testing: checklist smoke mobile/desktop.

**Notes:** Card catalogo 4:5 esplicitamente fuori scope — non testare qui.

---

**Refinement Completed By**: Pair (agent)  
**Refinement Date**: 2026-04-12  
**Review and Approval**: Product owner / team (da confermare)
