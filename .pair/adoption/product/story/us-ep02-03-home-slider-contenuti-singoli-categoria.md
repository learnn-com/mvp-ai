# US-EP02-03 — Home: slider contenuti singoli per categoria (mock)

## Story Statement

**Come** utente **voglio** uno slider orizzontale di contenuti singoli della stessa categoria, con “Vedi tutti” **affinché** scopra lezioni o pezzi isolati senza integrazione server in questa release.

**Where:** pagina **Home** della webapp **React**, sotto header e affiancabile agli slider serie ([US-EP02-02](./us-ep02-02-home-slider-corsi-webinar-serie-categoria.md)); sezioni guidate da mock.

## Epic Context

**Parent Epic**: [EP-02 — Discovery, ricerca e catalogo](../epic/ep-02-catalog-discovery.md)  
**Status**: Refined  
**Priority**: P0 (Must-Have)

### Status Workflow

- **Refined**: Story dettagliata, stimata, pronta allo sviluppo
- **In Progress**: Sviluppo attivo
- **Done**: Consegnata e accettata

## Riferimento visivo

Allineamento a **card catalogo mobile 4:5** e pattern slider orizzontale come da [EP-02 incremento](../epic/ep-02-catalog-discovery.md) e asset in [design-references/](../design-references/README.md) (stesso linguaggio visivo delle card Home; asset dedicato “singolo” opzionale — se assente, riusare thumb + caption coerenti con [card-catalogo-serie-slider.png](../design-references/card-catalogo-serie-slider.png) senza badge webinar né tab conteggio episodi).

## User Value

**User Benefit**: Discovery per contenuti non serializzati come unico corso.  
**Business Impact**: Complemento a [US-EP02-02](./us-ep02-02-home-slider-corsi-webinar-serie-categoria.md) per mix Home tipo streaming.  
**Visible UI Value**: Slider orizzontale; **max 10** elementi per categoria; “Vedi tutti” → **stessa convenzione di routing** della pagina categoria **WIP** usata in US-EP02-02 (stessa rotta con `slug`/parametro diverso **oppure** query `?tab=singles` — **un solo** approccio scelto in implementazione e documentato in PR); card **4:5**; **caption**: titolo + descrizione breve, **massimo due righe** (clamp/ellipsis).

## Acceptance Criteria

### Functional Requirements (Given–When–Then)

1. **Given** la Home con mock **sezioni slider contenuti singoli** (almeno **due** sezioni con titolo categoria diverso)  
   **When** la pagina è renderizzata  
   **Then** ogni sezione mostra titolo categoria, CTA **“Vedi tutti”** (stesso pattern visivo di US-EP02-02) e riga **scroll orizzontale** di card.

2. **Given** una sezione con **N > 10** item nel mock  
   **When** l’utente usa lo slider  
   **Then** sono mostrati al massimo **10** item (slice o mock pre-tagliato — una sola fonte di verità).

3. **Given** una sezione con **N ≤ 10** item  
   **When** la sezione è renderizzata  
   **Then** compaiono esattamente **N** card, con scroll orizzontale se il contenuto eccede la viewport.

4. **Given** una card contenuto singolo  
   **When** è renderizzata su **viewport mobile** (breakpoint progetto, es. `<768px`)  
   **Then** l’area thumb/card rispetta **aspect ratio 4:5** (PRD US 2.1 AC2).

5. **Given** una card  
   **When** si legge la caption sotto la thumb  
   **Then** sono visibili **titolo** e **descrizione breve** (`subtitle` / `excerpt`), entrambi limitati a **max 2 righe** cumulative o 2 righe ciascuno con clamp esplicito — **scegliere e documentare** una convenzione (es. titolo max 1 riga + descrizione 1 riga **oppure** titolo 2 righe senza descrizione separata) e applicarla a tutte le card mock.

6. **Given** una card contenuto singolo  
   **When** si ispeziona la UI  
   **Then** **non** compaiono badge **“WEBINAR”**, **tab conteggio episodi**, né pill **HD / CC / AU / TX** (fuori scope; contenuto singolo non usa il pattern serie).

7. **Given** CTA “Vedi tutti” di una sezione contenuti singoli  
   **When** l’utente la attiva  
   **Then** la navigazione porta alla **pagina categoria WIP** con la **stessa strategia** adottata in US-EP02-02 (stesso path con discriminante categoria **o** query tab — vincolo: **unificare** con EP02-02 in codice).

8. **Given** una card  
   **When** l’utente la attiva  
   **Then** si naviga verso route **dettaglio contenuto** placeholder (allineata a [EP-03](../epic/ep-03-playback-learning.md) quando disponibile; altrimenti WIP con `id` in URL — coerente con decisione già presa per tap card in US-EP02-02).

### Business Rules

- Dati **solo mock**; shape TypeScript minima documentata, es.: `id`, `title`, `shortDescription`, `thumbnailUrl`, `categorySlug`, `categoryTitle` (nomi adattabili ma campo “testo breve” obbligatorio per caption).
- **Nessun** fetch Strapi.
- Riutilizzo **logico** con US-EP02-02: stessa **pagina WIP categoria** e stessi token layout dove possibile; diverso solo **tipo card** e **limite 10** vs 5.
- Allineamento contesto [Catalog & Publishing](../../tech/boundedcontext/catalog-and-publishing.md) per futuro swap API.

### Edge Cases and Error Handling

- **Sezione con 0 item**: stessa strategia scelta in US-EP02-02 (nascondi sezione **vs** empty state) — **allineare** tra le due story per UX coerente.
- **Thumb rotta / assente**: placeholder senza rompere 4:5.
- **Titolo o descrizione lunghi**: ellipsis + `line-clamp` rispettando il vincolo 2 righe totale o per campo (come da AC5).
- **Accessibilità**: heading sezione; card e CTA focalizzabili da tastiera; testo clamp non nasconde informazione critica oltre quanto accettato per teaser.

## Definition of Done Checklist

### Development Completion

- [x] Tutti gli acceptance criteria verificati in locale.
- [x] Fixture mock dedicata contenuti singoli (≥2 sezioni; caso >10 item).
- [x] Convenzione routing “Vedi tutti” **unificata** con US-EP02-02 (documentata in codice o README dev breve).
- [x] `pnpm quality-gate` (o gate in [way-of-working.md](../../tech/way-of-working.md)) verde sulla parte toccata.

### Quality Assurance

- [x] Test: limite 10, clamp 2 righe, assenza badge/tab serie, navigazione WIP, scroll orizzontale.
- [ ] Smoke manuale: confronto affiancato slider serie vs singoli (nessuna regressione visiva grave).

### Deployment and Release

- [ ] Nessun deploy backend.

## Story Sizing and Sprint Readiness

### Refined Story Points

**Final Story Points**: M (3)  
**Confidence Level**: High  
**Sizing Justification**: parallelo a US-EP02-02 con card più semplice (niente badge webinar/conteggio); sforzo principale = condivisione pattern + fixture + test.

### Sprint Capacity Validation

**Sprint Fit Assessment**: Comodo in sprint **1 settimana** accanto a US-EP02-02.  
**Development Time Estimate**: ~2 giorni.  
**Testing Time Estimate**: ~0,5 giorni.  
**Total Effort Assessment**: **Sì**.

### Story Splitting Recommendations

Split non necessario. Se slitta per conflitto merge con EP02-02, completare prima primitive condivise (vedi Technical Analysis).

## Dependencies and Coordination

### Story Dependencies

**Prerequisite Stories**: [US-EP02-02](./us-ep02-02-home-slider-corsi-webinar-serie-categoria.md) per **pagina categoria WIP** e convenzione route (implementare o rifinire lì prima o in stesso sprint); [US-EP02-01](./us-ep02-01-home-header-logo-avatar-notifiche.md) opzionale; [EP-00](../epic/ep-00-foundation-platform.md); sessione [US-EP01-01](./us-ep01-01-login-sessione-e-rate-limit.md) se Home autenticata.  
**Dependent Stories**: ricerca ([US-EP02-04](./us-ep02-04-ricerca-parola-tema-mock.md)) indipendente ma stesso contesto discovery.

### Team Coordination

**Development Roles Involved**: Frontend; allineamento breve con chi tocca US-EP02-02 su **componente slider** condiviso.

### External Dependencies

Nessuna.

## Validation and Testing Strategy

### Acceptance Testing Approach

**Testing Methods**: RTL su `SingleContentSlider` / card: props fixture con >10 elementi, assert slice, `line-clamp`/`class` attesi o snapshot testo troncato; navigazione `MemoryRouter` verso WIP e verso dettaglio stub.  
**Test Data Requirements**: fixture con mix lunghezze titolo/descrizione.  
**Environment Requirements**: webapp locale.

### User Validation

Demo interna: confronto caption 2 righe vs design.  
**Rollback Plan**: revert commit.

## Notes and Additional Context

Dati mock con shape pensato per futuro swap Strapi. **Open question** condivisione componente: risolta in Technical Analysis (preferenza **composizione** su slider orizzontale generico).

## Technical Analysis

### Implementation Approach

**Technical Strategy**: estrarre (o introdurre se assente) un **layout comune** `CategorySliderSection` con props: `title`, `seeAllHref`, `children` / `renderItem` / `items`, `maxItems`, `orientation="horizontal"`. US-EP02-03 fornisce `SingleContentCard` e fixture `home-single-sections.mock.ts`. Riutilizzare **stesso componente pagina** `CategoryWipPage` di US-EP02-02 aggiungendo parametro opzionale (`view=singles`) solo se necessario al product; altrimenti stesso URL per categoria con lista WIP unica.  
**Key Components**: `SingleCategorySlider`, `SingleContentCard`, riuso `HorizontalScroller` se creato in EP02-02.  
**Data Flow**: fixture sezioni → slice(0,10) → render card → navigazione.  
**Integration Points**: futuro `useCatalogSingles(categoryId)` sostituisce mock.

### Technical Requirements

- Implementare clamp CSS (`line-clamp-2` Tailwind o equivalente) con fallback accessibile (`title` attribute su elemento interattivo se truncamento aggressivo).
- Coerenza breakpoint mobile per ratio 4:5 con US-EP02-02.

### Technical Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
| ---- | ------ | ----------- | ---------- |
| Duplicazione markup slider vs US-EP02-02 | Medio | Media | Estrarre `CategorySliderSection` + test condivisi |
| Divergenza route “Vedi tutti” tra serie e singoli | Alto | Media | Accordo in sprint + un solo helper `buildCategoryHref(slug, kind)` |
| Clamp testo fragile cross-browser | Basso | Bassa | Test RTL su classi / stili attesi |

### Spike Requirements

Nessuno.

## Task Breakdown

- [x] **T-1**: Tipi `CatalogSingleItem` / `CatalogSingleSection` e fixture `home-single-sections.mock.ts`
- [x] **T-2**: `SingleContentCard`: thumb 4:5, caption titolo + breve (clamp 2 righe), niente chrome serie
- [x] **T-3**: `SingleCategorySlider` (o composizione su shell condivisa): max 10, scroll, header “Vedi tutti”
- [x] **T-4**: Helper routing `buildCategoryHref` / convenzione unificata con [US-EP02-02](./us-ep02-02-home-slider-corsi-webinar-serie-categoria.md) + tap verso stub dettaglio
- [x] **T-5**: Integrazione Home (sotto slider serie / ordine documentato)
- [x] **T-6**: Test RTL, smoke affiancato EP02-02, `pnpm quality-gate`

### Dependency Graph

```
   T-1
  /  \
T-2   T-4
 |     |
 T-3 --+
  |
 T-5
  |
 T-6
```

### AC Coverage

| AC | Tasks |
| -- | ----- |
| AC-1 (≥2 sezioni: titolo, Vedi tutti, scroll) | T-1, T-3, T-5, T-6 |
| AC-2 (N > 10 → max 10) | T-1, T-3, T-6 |
| AC-3 (N ≤ 10, scroll viewport) | T-1, T-3, T-6 |
| AC-4 (4:5 mobile su card) | T-2, T-6 |
| AC-5 (titolo + descrizione breve, max 2 righe documentate) | T-1, T-2, T-6 |
| AC-6 (assenza badge WEBINAR / tab episodi / HD…) | T-2, T-6 |
| AC-7 (“Vedi tutti” → stessa strategia WIP categoria EP02-02) | T-3, T-4, T-5, T-6 |
| AC-8 (tap card → route dettaglio coerente con EP02-02) | T-2, T-4, T-5, T-6 |

---

### T-1: Tipi `CatalogSingleItem` / `CatalogSingleSection` e fixture `home-single-sections.mock.ts`

**Priority:** P0 | **Estimated Hours:** 2h | **Bounded Context:** Catalog & Publishing

**Summary:** Shape TypeScript documentata (`id`, `title`, `shortDescription`, `thumbnailUrl`, `categorySlug`, `categoryTitle`, …) e fixture con **≥2** sezioni (titoli diversi), almeno una con **N > 10** elementi; **una sola** policy per limite 10 (slice nel container **oppure** mock pre-tagliato — documentare). Convenzione **AC5** (due righe totali vs per campo) scritta in commento README o export fixture.

**Type:** Feature Implementation + Documentation

**Description:** Nessun fetch Strapi. Strategia **sezione 0 item**: **allineata** a [US-EP02-02](./us-ep02-02-home-slider-corsi-webinar-serie-categoria.md) (stesso comportamento nascondi vs empty state).

**Acceptance Criteria:**

- Primary deliverable: tipi + modulo mock dedicato contenuti singoli.
- Quality standard: dati riusabili da test senza rete; slug coerenti con helper T-4.
- Integration requirement: pronto per futuro `useCatalogSingles`.
- Verification method: review + test fixture (T-6).

**Technical Requirements:**

- Functionality: mix lunghezze titolo/descrizione per test clamp.
- Compatibility: thumb URL placeholder come in EP02-02.

**Implementation Approach:**

- Technical Design: `fixtures/home-single-sections.mock.ts` + tipi in `types/` o feature folder.
- Technical Standards: [code-design/README.md](../../../knowledge/guidelines/code-design/README.md).

**Dependencies:**

- Technical: decisione EP02-02 su empty section e su `CategoryWipPage` già mergeata o in branch condiviso.
- Tasks: nessuna.

**Implementation Steps:**

1. Definire interfacce sezione + item singolo.
2. Creare fixture ≥2 sezioni, una con >10 item.
3. Documentare policy `maxItems=10` e convenzione caption 2 righe.
4. Allineare empty-state con EP02-02.

**Testing Strategy:**

- Unit Tests: helper `takeVisibleSingles` se estratto.
- Manual Testing: n/d.

**Notes:** Se EP02-02 non ancora mergeato, coordinare slug/path con branch attivo.

---

### T-2: `SingleContentCard`: thumb 4:5, caption titolo + breve (clamp 2 righe), niente chrome serie

**Priority:** P0 | **Estimated Hours:** 3h | **Bounded Context:** Catalog & Publishing

**Summary:** Card mobile-first: thumb `aspect-[4/5]` sotto breakpoint progetto (stesso criterio EP02-02); caption con **titolo** + **descrizione breve** secondo convenzione T-1 (`line-clamp` Tailwind o equivalente); `title` attribute su wrapper interattivo se truncamento; **nessun** badge WEBINAR, tab episodi, pill HD/CC/AU/TX; fallback immagine.

**Type:** Feature Implementation

**Description:** Navigazione tap/keyboard via callback o `Link` coerente con route stub definita in T-4 (stesso pattern tap card serie).

**Acceptance Criteria:**

- Primary deliverable: `SingleContentCard` testabile in isolamento.
- Quality standard: coerenza visiva con linguaggio card Home / [card-catalogo-serie-slider.png](../design-references/card-catalogo-serie-slider.png) senza elementi serie.
- Integration requirement: props da T-1.
- Verification method: RTL su classi clamp e assenza elementi vietati.

**Technical Requirements:**

- Functionality: AC4, AC5, AC6, parte AC8.
- Accessibility: focus visibile; nome accessibile da titolo.

**Implementation Approach:**

- Technical Design: riuso primitive thumb/layout da EP02-02 se già estratte (`SeriesThumb` → generico `CatalogThumb` opzionale).
- Files to Modify/Create: `SingleContentCard.tsx`.

**Dependencies:**

- Tasks: T-1.

**Implementation Steps:**

1. Layout thumb + caption secondo convenzione documentata.
2. Implementare `onError` thumb e ellipsis.
3. Escludere esplicitamente markup badge/tab serie.
4. Collegare navigazione a path stub condiviso con EP02-02.

**Testing Strategy:**

- Unit Tests: props con testi lunghi / corti.
- Manual Testing: viewport mobile 4:5.

**Notes:** Non introdurre dipendenze nuove per scroll — resta sullo slider parent.

---

### T-3: `SingleCategorySlider` (o composizione su shell condivisa): max 10, scroll, header “Vedi tutti”

**Priority:** P0 | **Estimated Hours:** 4h | **Bounded Context:** Catalog & Publishing

**Summary:** Sezione con stesso pattern visivo EP02-02: heading categoria, CTA allineata a destra, `overflow-x-auto` / riuso `HorizontalScroller` o **`CategorySliderSection`** (estrazione da EP02-02 se prevista in Technical Analysis — implementare o completare refactor minimo senza rompere serie). Render `SingleContentCard` per item dopo `slice(0, 10)`.

**Type:** Feature Implementation

**Description:** `seeAllHref` da **T-4** (`buildCategoryHref`); nessuna duplicazione logica limite oltre T-1/T-3 boundary chiaro.

**Acceptance Criteria:**

- Primary deliverable: componente sezione singoli riusabile per ogni entry fixture.
- Quality standard: max 10 nodi DOM; scroll touch/mouse; `role="region"` + label sezione.
- Integration requirement: dipendenza soddisfatta da [US-EP02-02](./us-ep02-02-home-slider-corsi-webinar-serie-categoria.md) per shell/router WIP (prerequisito story).
- Verification method: RTL su due sezioni e limite 10.

**Technical Requirements:**

- Functionality: AC1, AC2, AC3, AC7 (href corretto).
- Performance: lista breve, nessuna virtualizzazione richiesta MVP.

**Implementation Approach:**

- Technical Design: preferenza **composizione** su layout generico; evitare copia-incolla completo di `SeriesCategorySlider`.
- Files to Modify/Create: `SingleCategorySlider.tsx`, eventuale `CategorySliderSection.tsx` condiviso (spostamento da EP02-02 se necessario).

**Dependencies:**

- Tasks: T-2, T-4.
- Technical: merge o cherry-pick pattern EP02-02.

**Implementation Steps:**

1. Introdurre o riusare shell slider generica con prop `maxItems`.
2. Mappare item in `SingleContentCard` con chiavi stabili.
3. Passare `seeAllHref` da helper T-4.
4. Verificare accessibilità CTA (nome include categoria).

**Testing Strategy:**

- Integration Tests: >10 e ≤10 item.
- Manual Testing: scroll orizzontale affiancato a slider serie.

**Notes:** Se refactor condiviso allarga troppo lo scope, documentare debito tecnico minimo in PR con follow-up.

---

### T-4: Helper routing `buildCategoryHref` / convenzione unificata con US-EP02-02 + tap verso stub dettaglio

**Priority:** P0 | **Estimated Hours:** 2h | **Bounded Context:** Catalog & Publishing + router

**Summary:** Un solo punto per costruire URL “Vedi tutti” categoria (stesso path EP02-02 **oppure** query `?tab=singles` / `view=singles` — **una** strategia condivisa tra serie e singoli); stessa route **dettaglio contenuto** placeholder usata per tap card in EP02-02 (`navigate`/`Link` con `id`). Aggiornare `CategoryWipPage` solo se serve discriminante lista — altrimenti riuso senza modifiche.

**Type:** Feature Implementation + Documentation

**Description:** Evitare stringhe href duplicate nei componenti; esportare helper testabile.

**Acceptance Criteria:**

- Primary deliverable: modulo `catalogRoutes.ts` (nome adattabile) con `buildCategoryHref`, `buildSingleContentDetailHref` o reuse funzione serie se identica.
- Quality standard: unit test puro su helper (T-6).
- Integration requirement: usato da EP02-02 e EP02-03 (se EP02-02 già mergeato, refactor EP02-02 per usare helper in stessa PR o PR precedente coordinata).
- Verification method: navigazione manuale serie vs singoli verso stessa WIP.

**Technical Requirements:**

- Functionality: AC7, AC8.
- Compatibility: deep link coerente con router EP-00.

**Implementation Approach:**

- Technical Design: parametri `slug` + enum `CatalogSectionKind` o boolean `singles` documentato in PR.
- Files to Modify/Create: helper + eventuali aggiunte minime a `CategoryWipPage`.

**Dependencies:**

- Tasks: T-1 (slug fixture).
- Technical: [US-EP02-02](./us-ep02-02-home-slider-corsi-webinar-serie-categoria.md) route categoria WIP esistente.

**Implementation Steps:**

1. Inventariare href attuali in EP02-02 dopo merge.
2. Estrarre helper e sostituire call site serie + singoli.
3. Documentare scelta query vs path in PR/README dev.

**Testing Strategy:**

- Unit Tests: snapshot stringa href per combinazioni slug/kind.
- Manual Testing: CTA serie e singoli aprono stessa base WIP attesa.

**Notes:** Conflitto merge: risolvere prima helper poi slider singoli.

---

### T-5: Integrazione Home (sotto slider serie / ordine documentato)

**Priority:** P0 | **Estimated Hours:** 2h | **Bounded Context:** Catalog & Publishing

**Summary:** Montare sezioni contenuti singoli sulla Home sotto header e **rispetto ordine verticale** concordato (es. prima slider serie, poi singoli — o viceversa; **documentare** in PR). Composizione via fixture T-1 + `SingleCategorySlider`.

**Type:** Feature Implementation

**Description:** Rispettare gerarchia heading (h1 Home vs h2 sezione). Nessuna regressione EP02-02.

**Acceptance Criteria:**

- Primary deliverable: Home mostra almeno due sezioni singoli mock in dev.
- Quality standard: ordine sezioni stabile e riproducibile.
- Integration requirement: coesistenza con [US-EP02-01](./us-ep02-01-home-header-logo-avatar-notifiche.md) / [US-EP02-02](./us-ep02-02-home-slider-corsi-webinar-serie-categoria.md).
- Verification method: run dev + ispezione DOM.

**Dependencies:**

- Tasks: T-3.

**Implementation Steps:**

1. Importare fixture singoli in pagina Home.
2. Inserire block sotto slider serie (o ordine scelto).
3. Verificare con team ordine verticale vs PRD.

**Testing Strategy:**

- Integration Tests: Home con router memory + fixture ridotta.
- Manual Testing: smoke affiancato serie vs singoli.

**Notes:** Se Home ancora non composta, usare route dev isolata temporanea e poi spostare.

---

### T-6: Test RTL, smoke affiancato EP02-02, `pnpm quality-gate`

**Priority:** P0 | **Estimated Hours:** 3h | **Bounded Context:** Catalog & Publishing (QA)

**Summary:** Coprire: slice 10; clamp 2 righe; assenza badge/tab serie; navigazione “Vedi tutti” vs helper; tap card; scroll; eseguire `pnpm quality-gate`.

**Type:** Testing + Documentation

**Description:** Allineare elenco a DoD story; smoke confronto visivo leggero con slider serie.

**Acceptance Criteria:**

- Primary deliverable: test verdi senza backend.
- Quality standard: copertura scenari Validation.
- Integration requirement: [way-of-working.md](../../tech/way-of-working.md).
- Verification method: `pnpm quality-gate`.

**Technical Requirements:**

- Functionality: verifica incrociata AC1–AC8.
- Compatibility: `MemoryRouter` + user-event.

**Implementation Approach:**

- Technical Design: [testing/README.md](../../../knowledge/guidelines/testing/README.md).
- Files to Modify/Create: `*.test.tsx`.

**Dependencies:**

- Tasks: T-1–T-5.

**Implementation Steps:**

1. Test `SingleContentCard` e slider con >10/≤10.
2. Test href helper con EP02-02 fixtures mock se condivise.
3. Test assenza elementi vietati nel DOM.
4. Quality gate.

**Testing Strategy:**

- Unit + Integration come sopra.
- Manual Testing: checklist smoke affiancato.

**Notes:** Se helper estratto in PR EP02-02, aggiungere test lì o qui senza duplicare.

---

**Refinement Completed By**: Pair (agent)  
**Refinement Date**: 2026-04-12  
**Review and Approval**: Product owner / team (da confermare)
