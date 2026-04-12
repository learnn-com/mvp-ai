# US-EP02-04 — Ricerca per parola o tema (mock, US 2.2)

## Story Statement

**Come** utente **voglio** cercare per parola o selezionare un tema **affinché** trovi corsi, contenuti singoli e webinar anche quando i metadati sono distribuiti, usando in questa release dati mock allineati al contratto futuro Strapi.

## Epic Context

**Parent Epic**: [EP-02 — Discovery, ricerca e catalogo](../epic/ep-02-catalog-discovery.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Entry point discovery oltre la Home.  
**Business Impact**: Soddisfa US 2.2 PRD con incremento incrementale (mock prima, API dopo).  
**Visible UI Value**: UI ricerca + risultati **raggruppati per tipologia** (corsi, contenuti singoli, webinar/live) come da PRD AC2; temi da **lista mock** (PRD AC3 richiede lista dinamica da API — qui mock documentato come stand-in).

## Rough Sizing

**Story Points**: M (3)  
**Confidence**: Medium  
**Reasoning**: UX ricerca + stati vuoto/caricamento simulato; grouping.

## Initial Scope

### Likely In Scope

- Input ricerca parola; filtro/indicizzazione **mock** su titoli/tag (PRD AC1 semplificato).  
- Sezioni risultati per tipologia (PRD AC2).  
- Lista temi mock selezionabili (stand-in per AC3 fino a hook Strapi).

### Likely Out of Scope

- Indicizzazione server-side e performance tuning.  
- CRUD temi in admin (EP-00/Strapi).

### Open Questions

- Debounce e min caratteri; accessibilità tastiera.

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] Flussi principali con mock verificabili in demo.  
- [ ] Test componenti ricerca e raggruppamento.

## Dependencies

**Story Dependencies**: Nessuna stretta verso altre US-EP02; coerenza tipi dati con [US-EP02-02](./us-ep02-02-home-slider-corsi-webinar-serie-categoria.md) / [US-EP02-03](./us-ep02-03-home-slider-contenuti-singoli-categoria.md) utile.  
**Epic Dependencies**: EP-00, EP-01 se ricerca solo autenticata.

## Notes

Quando Strapi è disponibile: sostituire mock mantenendo shape DTO concordato.
