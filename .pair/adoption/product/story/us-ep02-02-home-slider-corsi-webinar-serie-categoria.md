# US-EP02-02 — Home: slider corsi/webinar multi-episodio per categoria (mock)

## Story Statement

**Come** utente **voglio** uno slider orizzontale di corsi o webinar “a puntate” (contenuto multiplo) della stessa categoria, con “Vedi tutti” **affinché** esplori la categoria senza ancora dipendere da Strapi in questa release.

**Where:** pagina **Home** della webapp **React**, sotto l’header ([US-EP02-01](./us-ep02-01-home-header-logo-avatar-notifiche.md)); una o più **sezioni** configurabili via mock.

## Epic Context

**Parent Epic**: [EP-02 — Discovery, ricerca e catalogo](../epic/ep-02-catalog-discovery.md)  
**Status**: Refined  
**Priority**: P0 (Must-Have)

### Status Workflow

- **Refined**: Story dettagliata, stimata, pronta allo sviluppo
- **In Progress**: Sviluppo attivo
- **Done**: Consegnata e accettata

## Riferimento visivo

Slider categoria (es. titolo sezione + **“Vedi tutto >”** a destra in grigio chiaro), card con thumb arrotondata: [`design-references/card-catalogo-serie-slider.png`](../design-references/card-catalogo-serie-slider.png).

Da replicare per i **webinar**:

- **Badge “WEBINAR”** in alto a sinistra sulla thumb: riquadro semi-trasparente, bordo bianco sottile, testo bianco maiuscolo.
- **Conteggio episodi** in basso a destra sulla thumb: **tab rettangolare viola** con numero bianco (es. `16`).

Sotto l’immagine: titolo in evidenza; riga autore — professione (es. grigio secondario); durata totale (es. `1h 20min`). **Non** mostrare la riga pill HD / CC / AU / TX presente nel mockup (fuori scope release).

## User Value

**User Benefit**: Discovery tipo streaming per raccolte serializzate.  
**Business Impact**: Copre parte di US 2.1 PRD (sezioni per categoria) con dati controllati via mock.  
**Visible UI Value**: Slider scrollabile orizzontalmente; **max 5** elementi per riga categoria; CTA **“Vedi tutti”** → rotta pagina categoria con **paginazione prevista**, contenuto lista **“working in progress”** per ora; card mobile **aspect ratio 4:5** (PRD US 2.1 AC2).

## Acceptance Criteria

### Functional Requirements (Given–When–Then)

1. **Given** la Home con mock **sezioni slider serie** (almeno **due** sezioni con titolo categoria diverso, per verificare ripetibilità del pattern)  
   **When** la pagina è renderizzata  
   **Then** ogni sezione mostra **titolo** (nome categoria/tema), link/CTA **“Vedi tutti”** (o “Vedi tutto >” coerente con design) allineato come da [riferimento visivo](#riferimento-visivo), e una **riga orizzontale scrollabile** di card.

2. **Given** una sezione con dati mock con **N > 5** elementi idonei alla slider  
   **When** l’utente scorre lo slider  
   **Then** sono visibili al massimo **5** card nella sezione (gli elementi oltre il quinto **non** compaiono in questa story — trimming lato mock o slice documentato).

3. **Given** una sezione con **N ≤ 5** elementi  
   **When** la sezione è renderizzata  
   **Then** compaiono **N** card, scroll orizzontale ancora presente se il contenuto supera la viewport (overflow-x), senza duplicare item fantasma.

4. **Given** un item mock di tipo **webinar** (`kind === 'webinar'` o equivalente nel modello)  
   **When** la card è mostrata  
   **Then** sulla thumb compare il **badge “WEBINAR”** come da specifica visiva (semi-trasparente, bordo bianco sottile, testo bianco maiuscolo).

5. **Given** un item mock di tipo **corso** (non webinar)  
   **When** la card è mostrata  
   **Then** **non** compare il badge “WEBINAR”.

6. **Given** qualsiasi card serie (corso o webinar)  
   **When** la card è mostrata  
   **Then** sulla thumb è visibile il **conteggio contenuti** (episodi/lezioni) in **tab viola** in basso a destra con numero leggibile (come mock), e sotto la thumb: **titolo**, riga **autore — professione**, **durata totale** formattata in modo umano (es. `1h 20min`).

7. **Given** una card renderizzata  
   **When** si ispeziona caption e thumb  
   **Then** **non** sono presenti icone o indicatori **HD / CC / AU / TX** (fuori scope).

8. **Given** una card  
   **When** l’utente la attiva  
   **Then** avviene **navigazione** verso una **route documentata** di overview contenuto (placeholder allineato a [EP-03](../epic/ep-03-playback-learning.md) se già presente; altrimenti pagina WIP con titolo/`id` mock in URL — scelta unica registrata in PR o in Technical Analysis).

9. **Given** una sezione con CTA “Vedi tutti”  
   **When** l’utente la attiva  
   **Then** si apre la **pagina categoria** (rotta dedicata, es. `/category/:slug` o convenzione adottata) con titolo categoria e **stato WIP** per lista paginata (messaggio o skeleton; **nessuna** paginazione funzionante oltre la shell).

### Business Rules

- Dati **solo mock** lato client; shape TypeScript (o equivalente) **documentata** e compatibile con futuro aggregato Strapi “serie / corso / webinar” in [Catalog & Publishing](../../tech/boundedcontext/catalog-and-publishing.md).
- Ogni item mock deve esporre almeno: `id`, `kind` (`course` | `webinar`), `title`, `authorName`, `authorRole`, `totalDurationLabel`, `episodeCount`, `thumbnailUrl` (o placeholder), `categoryKey`/`slug` per “Vedi tutti”.
- **Nessun** `fetch` HTTP a Strapi in questa tornata.
- Aspect ratio card su **viewport mobile** (breakpoint definito dal progetto, es. `<768px`): **4:5** come da PRD US 2.1 AC2; su desktop il ratio può seguire token layout se già definito in EP-00, senza violare il requisito mobile.

### Edge Cases and Error Handling

- **Sezione con 0 item**: non mostrare la sezione **oppure** mostrare empty state minimo — **scegliere una strategia** e applicarla in modo coerente in tutte le sezioni mock (documentare in implementazione).
- **Immagine thumb mancante o errore load**: fallback placeholder (colore/skeleton) senza rompere il layout 4:5.
- **Testi lunghi** (titolo, professione): troncamento con ellipsis o max linee **senza** superare altezza card concordata con design.
- **Accessibilità**: sezioni con `heading` appropriato; card attivabili da tastiera; CTA “Vedi tutti” con nome accessibile (es. include nome categoria).

## Definition of Done Checklist

### Development Completion

- [ ] Tutti gli acceptance criteria soddisfatti in locale.
- [ ] Mock sezioni in modulo dedicato (config array ≥2 sezioni per demo).
- [ ] Route “Vedi tutti” + pagina WIP categoria collegate nel router.
- [ ] `pnpm quality-gate` (o gate in [way-of-working.md](../../tech/way-of-working.md)) verde sulla parte toccata.

### Quality Assurance

- [ ] Test su: limite 5 item, badge webinar vs corso, conteggio thumb, caption, assenza HD/CC/AU/TX, navigazione “Vedi tutti”, tap card (navigazione o WIP).
- [ ] Smoke manuale: scroll orizzontale touch e mouse; verifica 4:5 su viewport mobile (DevTools o device).

### Deployment and Release

- [ ] Nessun deploy backend; solo asset statici/mock nel bundle.

## Story Sizing and Sprint Readiness

### Refined Story Points

**Final Story Points**: L (5)  
**Confidence Level**: Medium  
**Sizing Justification**: più varianti card + scroll + routing + fixture strutturata + test; complessità UX (badge, tab conteggio, caption) superiore a singolo componente.

### Sprint Capacity Validation

**Sprint Fit Assessment**: Entra in sprint **1 settimana** se accoppiata a poche altre story; altrimenti valutare accorciamento fixture.  
**Development Time Estimate**: ~3 giorni.  
**Testing Time Estimate**: ~1 giorno.  
**Total Effort Assessment**: **Sì**, con Medium confidence.

### Story Splitting Recommendations

Se necessario: (A) UI slider + card + mock senza navigazione tap; (B) routing “Vedi tutti” + WIP + tap verso EP-03. Preferibile monolite per valore demo.

## Dependencies and Coordination

### Story Dependencies

**Prerequisite Stories**: [US-EP02-01](./us-ep02-01-home-header-logo-avatar-notifiche.md) **opzionale** (stesso layout Home); [EP-00](../epic/ep-00-foundation-platform.md) per router/layout; [US-EP01-01](./us-ep01-01-login-sessione-e-rate-limit.md) se Home solo autenticata.  
**Dependent Stories**: [US-EP02-03](./us-ep02-03-home-slider-contenuti-singoli-categoria.md) può riusare pattern slider; EP-03 per destinazione reale tap card.  
**Shared Components**: `HorizontalScroll`, `CatalogCard` serie, token Tailwind/shadcn.

### Team Coordination

**Development Roles Involved**: Frontend; **UX** conferma badge/tab su thumb webinar.

### External Dependencies

**Third-party Integrations**: Nessuna.  
**Infrastructure Requirements**: Nessuna.

## Validation and Testing Strategy

### Acceptance Testing Approach

**Testing Methods**: RTL su componenti puri (props in): rendering sezione, slice a 5, badge condizionale, conteggio, navigazione mock (`MemoryRouter`). Opzionale test visuale/Chromatic se adottato.  
**Test Data Requirements**: fixture con mix corsi/webinar, >5 item in una sezione, sezione con ≤5, almeno un webinar.  
**Environment Requirements**: webapp locale.

### User Validation

**User Feedback Collection**: review interna vs PNG serie.  
**Success Metrics**: AC coperti da test + demo scroll + “Vedi tutti”.  
**Rollback Plan**: revert branch.

## Notes and Additional Context

Allineamento a [catalog-and-publishing.md](../../tech/boundedcontext/catalog-and-publishing.md) quando si sostituisce il mock con API. **Open question** “più slider per categorie diverse”: risolta con **config mock ad array di sezioni** (vedi Technical Analysis).

## Technical Analysis

### Implementation Approach

**Technical Strategy**: definire tipo `CatalogSeriesSection` e `CatalogSeriesItem`; componente `SeriesCategorySlider` che riceve `section` e renderizza header + `HorizontalScroller` + lista `SeriesCard`. Mock in `fixtures/home-series-sections.mock.ts` esporta array ordinato. “Vedi tutti” usa `Link`/`navigate` con `slug` categoria; pagina `CategoryWipPage` mostra titolo + placeholder paginazione. Tap card: `navigate` verso route overview (stub) con `id` — allineare nome path al router esistente.  
**Key Components**: `SeriesCategorySlider`, `SeriesCard`, `CategoryWipPage`, eventuale `useHorizontalScroll`.  
**Data Flow**: Home legge fixture → mappa sezioni → ogni slider riceve max 5 item (`.slice(0, 5)` in container o dati già tagliati in fixture — **una sola** fonte di verità per il limite 5).  
**Integration Points**: futuro hook `useCatalogSeries(categoryId)` che sostituisce la fixture senza cambiare firma UI ideale.

### Technical Requirements

- Scroll orizzontale: `overflow-x-auto`, scroll-snap opzionale se non conflitto con design; niente dipendenza da librerie pesanti salvo già adottate.
- Immagini: `loading="lazy"` dove applicabile; aspect ratio via `aspect-[4/5]` Tailwind o CSS equivalente.

### Technical Risks and Mitigation

| Risk | Impact | Probability | Mitigation |
| ---- | ------ | ----------- | ---------- |
| Divergenza card serie vs singoli (US-EP02-03) | Medio | Media | Estrarre primitive condivise (thumb, typography) early |
| Tap card vs EP-03 non pronto | Medio | Alta | Route WIP con `id` fino a merge EP-03 |
| Scroll orizzontale + focus tastiera | Medio | Bassa | `role="region"` + label sezione; focus visibile su card |

### Spike Requirements

**Required Spikes**: Nessuno; eventuale micro-allineamento asset badge webinar con UX ≤0,5g.

## Task Breakdown

- [ ] **T-1**: Tipi `CatalogSeriesItem` / `CatalogSeriesSection` e fixture Home (≥2 sezioni, trim a 5)
- [ ] **T-2**: `SeriesCard`: thumb 4:5, badge WEBINAR, tab conteggio, caption, fuori scope HD/CC/AU/TX
- [ ] **T-3**: `SeriesCategorySlider`: header sezione, “Vedi tutti”, scroll orizzontale, strategia sezione vuota, a11y
- [ ] **T-4**: Route pagina categoria WIP + route overview contenuto (tap card); convenzione path in PR
- [ ] **T-5**: Integrazione Home sotto header (composizione sezioni mock)
- [ ] **T-6**: Test RTL, smoke manuale scroll/mobile, `pnpm quality-gate`

### Dependency Graph

```
       T-1
      /  \
    T-2   T-4
     |
    T-3
     \ /
      T-5
       |
      T-6
```

### AC Coverage

| AC | Tasks |
| -- | ----- |
| AC-1 (≥2 sezioni: titolo, Vedi tutti, riga scrollabile) | T-1, T-3, T-5, T-6 |
| AC-2 (N > 5 → max 5 visibili) | T-1, T-3, T-6 |
| AC-3 (N ≤ 5, scroll senza duplicati) | T-1, T-3, T-6 |
| AC-4 (badge WEBINAR su thumb) | T-2, T-6 |
| AC-5 (corso senza badge WEBINAR) | T-2, T-6 |
| AC-6 (tab conteggio + titolo/autore/durata) | T-2, T-6 |
| AC-7 (assenza HD/CC/AU/TX) | T-2, T-6 |
| AC-8 (tap card → route overview/WIP) | T-2, T-4, T-5, T-6 |
| AC-9 (“Vedi tutti” → pagina categoria WIP) | T-3, T-4, T-5, T-6 |

---

### T-1: Tipi `CatalogSeriesItem` / `CatalogSeriesSection` e fixture Home (≥2 sezioni, trim a 5)

**Priority:** P0 | **Estimated Hours:** 3h | **Bounded Context:** Catalog & Publishing

**Summary:** Definire shape TypeScript documentata (`kind: 'course' | 'webinar'`, `id`, `title`, `authorName`, `authorRole`, `totalDurationLabel`, `episodeCount`, `thumbnailUrl`, `categoryKey`/`slug`, …) e fixture `home-series-sections.mock.ts` con **almeno due** sezioni (titoli categoria diversi), una con **N > 5** item, mix corsi/webinar; **una sola** policy per limite 5 (`.slice(0,5)` nel selettore dati **oppure** dati già tagliati in fixture — scegliere e documentare).

**Type:** Feature Implementation + Documentation

**Description:** Nessun fetch Strapi. Ordine sezioni stabile. Strategia **sezione 0 item**: empty state vs nascondere sezione — **scegliere una opzione** e applicarla a tutte le sezioni mock, nota in codice/README breve.

**Acceptance Criteria:**

- Primary deliverable: tipi + modulo mock esportato, coerente con [catalog-and-publishing.md](../../tech/boundedcontext/catalog-and-publishing.md).
- Quality standard: fixture utilizzabili dai test (T-6) senza dipendenze di rete.
- Integration requirement: API dati stabile per `SeriesCategorySlider` / hook futuro `useCatalogSeries`.
- Verification method: review tipi + test fixture (T-6) o test unit leggeri su pure function slice.

**Technical Requirements:**

- Functionality: dati sufficienti per verificare AC2/AC3/AC4/AC5 in combinazione.
- Compatibility: URL thumb possono essere placeholder locali o data-URI documentati.

**Implementation Approach:**

- Technical Design: `fixtures/home-series-sections.mock.ts` + `types/catalog-series.ts` (path adattabili al monorepo).
- Bounded Context & Modules: Catalog & Publishing — discovery Home.
- Technical Standards: [code-design/README.md](../../../knowledge/guidelines/code-design/README.md).

**Dependencies:**

- Tasks: nessuna.
- Technical: router EP-00 per sapere convenzione `slug` (allineamento con T-4).

**Implementation Steps:**

1. Definire interfacce sezione + item.
2. Creare fixture ≥2 sezioni, una con >5 elementi.
3. Implementare policy limite 5 e documentarla in commento export.
4. Decidere e codificare comportamento sezione vuota.

**Testing Strategy:**

- Unit Tests: funzione `takeVisibleItems(items, 5)` se estratta; altrimenti coperto in T-6 via componenti.
- Manual Testing: n/d.

**Notes:** Allineare `slug` con path scelti in T-4 prima del merge finale.

---

### T-2: `SeriesCard`: thumb 4:5, badge WEBINAR, tab conteggio, caption, fuori scope HD/CC/AU/TX

**Priority:** P0 | **Estimated Hours:** 5h | **Bounded Context:** Catalog & Publishing

**Summary:** Card serie mobile-first: thumb `aspect-[4/5]` (o CSS equivalente) sotto breakpoint progetto; badge “WEBINAR” solo se `kind === 'webinar'`; tab viola conteggio episodi; sotto thumb: titolo, riga autore — professione, durata; **nessuna** icona/riga HD/CC/AU/TX; fallback immagine rotta; troncamento testi lunghi (ellipsis / max linee) senza rompere altezza card.

**Type:** Feature Implementation

**Description:** Card riceve props tipizzate da T-1; navigazione onClick/onKeyDown delegata a callback `onSelect` o `Link` wrapper — firma concordata con T-4/T-5.

**Acceptance Criteria:**

- Primary deliverable: componente `SeriesCard` (nome adattabile) conforme a [card-catalogo-serie-slider.png](../design-references/card-catalogo-serie-slider.png) per badge/tab/caption.
- Quality standard: contrasto testo su thumb dove richiesto; `loading="lazy"` su `img` se applicabile.
- Integration requirement: nessun accoppiamento a Strapi.
- Verification method: RTL su varianti course/webinar, immagine rotta, caption.

**Technical Requirements:**

- Functionality: AC4, AC5, AC6, AC7, parte di AC8 (handler navigazione).
- Accessibility: card come controllo tastiera focusabile; nome accessibile derivato da titolo.

**Implementation Approach:**

- Technical Design: sottocomponenti opzionali `SeriesThumb`, `SeriesCaption` se riduce complessità.
- Files to Modify/Create: `SeriesCard.tsx`, stili Tailwind/token EP-00.
- Technical Standards: [code-design/README.md](../../../knowledge/guidelines/code-design/README.md), linee guida a11y.

**Dependencies:**

- Tasks: T-1.

**Implementation Steps:**

1. Strutturare layout thumb + overlay badge/tab.
2. Implementare caption e tipografia secondaria.
3. Aggiungere fallback `onError` immagine.
4. Escludere esplicitamente indicatori fuori scope (non renderizzarli).

**Testing Strategy:**

- Unit Tests: props matrix course/webinar, assenza badge, presenza conteggio.
- Manual Testing: confronto PNG su viewport mobile.

**Notes:** Primitive condivisibili con [US-EP02-03](./us-ep02-03-home-slider-contenuti-singoli-categoria.md) se emerge duplicazione — estrarre solo se costo accettabile in questa story.

---

### T-3: `SeriesCategorySlider`: header sezione, “Vedi tutti”, scroll orizzontale, strategia sezione vuota, a11y

**Priority:** P0 | **Estimated Hours:** 4h | **Bounded Context:** Catalog & Publishing

**Summary:** Sezione composita: `heading` livello coerente con gerarchia Home; titolo categoria; CTA “Vedi tutti” / “Vedi tutto >” allineata al mock; contenitore `overflow-x-auto` (scroll-snap opzionale); render di `SeriesCard` per item visibili; **non** mostrare item oltre il quinto se policy T-1 è slice a monte.

**Type:** Feature Implementation

**Description:** `Link`/`navigate` verso route categoria con `slug` da sezione; `role="region"` + `aria-labelledby` dove utile.

**Acceptance Criteria:**

- Primary deliverable: `SeriesCategorySlider` (o equivalente) riusabile per ogni entry fixture.
- Quality standard: tap target CTA; scroll orizzontale mouse + touch senza layout rotto.
- Integration requirement: composizione con T-2; rispetto strategia sezione vuota da T-1.
- Verification method: RTL region + link “Vedi tutti” con nome accessibile che include categoria.

**Technical Requirements:**

- Functionality: AC1 (per sezione), AC2, AC3, AC9 (navigazione CTA — path da T-4).
- Performance: lista max 5 nodi DOM per sezione.

**Implementation Approach:**

- Technical Design: lista orizzontale flex + `gap`; eventuale `ScrollArea` shadcn solo se già in stack.
- Files to Modify/Create: `SeriesCategorySlider.tsx`.

**Dependencies:**

- Tasks: T-2.

**Implementation Steps:**

1. Header riga titolo + CTA allineati mock.
2. Mappare item in `SeriesCard` con chiavi stabili.
3. Collegare `to`/`navigate` a path categoria documentato.
4. Verificare accessibilità sezione e focus visibile.

**Testing Strategy:**

- Integration Tests: due sezioni in pagina test, presenza titoli distinti, max 5 card.
- Manual Testing: scroll orizzontale.

**Notes:** Se EP-02-01 header non mergeato, slider resta comunque testabile su pagina isolata fino a T-5.

---

### T-4: Route pagina categoria WIP + route overview contenuto (tap card); convenzione path in PR

**Priority:** P0 | **Estimated Hours:** 3h | **Bounded Context:** Catalog & Publishing + shell router (EP-00)

**Summary:** Registrare nel router: (1) pagina categoria **WIP** (es. `/category/:slug`) con titolo da param/mock lookup e messaggio/skeleton per lista paginata **non** funzionante; (2) route tap card verso overview contenuto **stub** con `id` in path o query — **una** convenzione allineata a [EP-03](../epic/ep-03-playback-learning.md) o placeholder esplicito in PR + Technical Analysis story (aggiornare nota se necessario).

**Type:** Feature Implementation + Documentation

**Description:** Nessuna chiamata server; titolo categoria può venire da mappa slug→label in mock finché non c’è API.

**Acceptance Criteria:**

- Primary deliverable: route funzionanti senza 404; pagine WIP chiare per utente dev/demo.
- Quality standard: parametri tipizzati (react-router o stack adottato).
- Integration requirement: path usati da T-3 (CTA) e T-5 (card).
- Verification method: navigazione manuale + test router `MemoryRouter`.

**Technical Requirements:**

- Functionality: AC8, AC9.
- Compatibility: deep link reload opzionale se SPA lo supporta già.

**Implementation Approach:**

- Technical Design: componenti pagina minimi `CategoryWipPage`, `SeriesOverviewWipPage` (nomi adattabili).
- Files to Modify/Create: file route centrali del package webapp.

**Dependencies:**

- Tasks: T-1 (slug/id coerenti con fixture).

**Implementation Steps:**

1. Aggiungere definizioni route e lazy import se pattern repo.
2. Implementare pagine WIP con titolo/`id` da params.
3. Documentare convenzione path nella descrizione PR.

**Testing Strategy:**

- Integration Tests: navigate da CTA e da card con fixture nota.
- Manual Testing: refresh su route WIP.

**Notes:** Coordinarsi con ownership EP-03 per rinominare route stub senza breaking change successivo.

---

### T-5: Integrazione Home sotto header (composizione sezioni mock)

**Priority:** P0 | **Estimated Hours:** 2h | **Bounded Context:** Catalog & Publishing

**Summary:** Montare in pagina Home (layout autenticato) la lista di `SeriesCategorySlider` generata dalla fixture T-1, **sotto** header [US-EP02-01](./us-ep02-01-home-header-logo-avatar-notifiche.md) quando presente; evitare duplicazione logica slice tra Home e slider (single source).

**Type:** Feature Implementation

**Description:** Se Home non ancora composta, creare wrapper `HomePage` che importa fixture e renderizza sezioni filtrate (es. skip sezioni vuote se strategia T-1 è “nascondi”).

**Acceptance Criteria:**

- Primary deliverable: demo scrollabile con ≥2 sezioni su route Home reale.
- Quality standard: gerarchia heading non duplicata in modo invalidante (h1 Home vs h2 sezione).
- Integration requirement: coesistenza con EP-02-01 e guard EP-01 se attive.
- Verification method: run dev + ispezione DOM.

**Dependencies:**

- Tasks: T-3, T-4.

**Implementation Steps:**

1. Importare fixture e `.map` sezioni visibili.
2. Inserire in layout Home sotto regione header.
3. Verificare ordine verticale sezioni vs design.

**Testing Strategy:**

- Integration Tests: Home con `MemoryRouter` + fixture ridotta.
- Manual Testing: flusso completo post-login mock.

**Notes:** Opzionale estrarre `HomeSeriesSections` per testabilità.

---

### T-6: Test RTL, smoke manuale scroll/mobile, `pnpm quality-gate`

**Priority:** P0 | **Estimated Hours:** 4h | **Bounded Context:** Catalog & Publishing (QA)

**Summary:** Coprire: slice 5; badge webinar vs corso; tab conteggio; caption; assenza HD/CC/AU/TX; navigazione “Vedi tutti”; tap card; scroll container; eseguire `pnpm quality-gate` sul package toccato.

**Type:** Testing + Documentation

**Description:** Allineare elenco test alla sezione Validation della story; smoke mobile 4:5 via DevTools/device.

**Acceptance Criteria:**

- Primary deliverable: test verdi in CI senza backend.
- Quality standard: copertura scenari elencati in DoD.
- Integration requirement: [way-of-working.md](../../tech/way-of-working.md).
- Verification method: `pnpm quality-gate`.

**Technical Requirements:**

- Functionality: verifica incrociata su tutti gli AC.
- Compatibility: `MemoryRouter` + user-event per tap/keyboard.

**Implementation Approach:**

- Technical Design: RTL + Vitest come [testing/README.md](../../../knowledge/guidelines/testing/README.md).
- Files to Modify/Create: `*.test.tsx` accanto ai componenti.

**Dependencies:**

- Tasks: T-1–T-5.

**Implementation Steps:**

1. Test puri `SeriesCard` con fixture inline.
2. Test `SeriesCategorySlider` con >5 e ≤5 item.
3. Test navigazione CTA e card.
4. Quality gate e fix regressioni.

**Testing Strategy:**

- Unit + Integration: come sopra.
- Manual Testing: checklist scroll touch + ratio mobile.

**Notes:** Chromatic solo se già adottato nel repo.

---

**Refinement Completed By**: Pair (agent)  
**Refinement Date**: 2026-04-12  
**Review and Approval**: Product owner / team (da confermare)
