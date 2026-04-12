# US-EP02-03 — Home: slider contenuti singoli per categoria (mock)

## Story Statement

**Come** utente **voglio** uno slider orizzontale di contenuti singoli della stessa categoria, con “Vedi tutti” **affinché** scopra lezioni o pezzi isolati senza integrazione server in questa release.

## Epic Context

**Parent Epic**: [EP-02 — Discovery, ricerca e catalogo](../epic/ep-02-catalog-discovery.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Discovery per contenuti non serializzati come unico corso.  
**Business Impact**: Complemento a [US-EP02-02](./us-ep02-02-home-slider-corsi-webinar-serie-categoria.md) per mix Home tipo streaming.  
**Visible UI Value**: Slider orizzontale; **max 10** elementi per categoria; “Vedi tutti” → stessa rotta/pattern pagina categoria con **WIP** e paginazione da implementare in seguito; card **4:5**; **caption**: solo testo titolo/descrizione breve del contenuto, **max due righe** (ellipsis o clamp).

## Rough Sizing

**Story Points**: M (3)  
**Confidence**: High  
**Reasoning**: Parallelo a EP02-02 con regole caption più semplici.

## Initial Scope

### Likely In Scope

- Mock dati contenuti singoli per categoria.  
- Scroll orizzontale; cap a **10** elementi.  
- Stessa navigazione “Vedi tutti” della story serie (stessa pagina WIP o parametro categoria — da unificare in refinement).  
- Nessun badge webinar obbligatorio su contenuto singolo salvo diverso accordo UX.

### Likely Out of Scope

- Caratteristiche formato HD/CC/AU/TX.  
- API Strapi.

### Open Questions

- Condivisione componente slider base tra EP02-02 e EP02-03 vs duplicazione temporanea.

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] Limite 10 e caption 2 righe verificabili.  
- [ ] Test UI scroll e navigazione WIP.

## Dependencies

**Story Dependencies**: Coerenza rotte con [US-EP02-02](./us-ep02-02-home-slider-corsi-webinar-serie-categoria.md).  
**Epic Dependencies**: EP-00, EP-01 se applicabile.

## Notes

Dati mock con shape pensato per futuro swap Strapi.
