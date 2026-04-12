# US-EP00-02 — Strapi locale: content types base e ruoli editorial

## Story Statement

**Come** editor (o sviluppatore in veste editoriale) **voglio** Strapi avviabile in locale con i content types base (corso, lezione, webinar, tema, tag) e ruoli editor/consumer **affinché** il modello dati del catalogo sia pronto prima del delivery pubblico.

## Epic Context

**Parent Epic**: [EP-00 — Piattaforma e fondamenta](../epic/ep-00-foundation-platform.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Modello contenuti coerente con il PRD, testabile in admin senza deploy.  
**Business Impact**: Sblocca EP-02 catalogo e contenuti editoriali.  
**Visible UI Value**: Strapi Admin — creazione/consultazione record su almeno un content type di prova; permessi distinti editor vs consumer dove definiti.

## Rough Sizing

**Story Points**: L (5)  
**Confidence**: Medium  
**Reasoning**: Più entità e ruoli; possibili iterazioni su schema.

## Initial Scope

### Likely In Scope

- Strapi in esecuzione in locale con configurazione condivisa nel repo.  
- Content types: corso, lezione, webinar, tema, tag (campi minimi plausibili, raffinamento in refinement).  
- Ruoli editor e consumer (permessi base coerenti con le epiche successive).

### Likely Out of Scope

- Upload produzione su S3 (story dedicata).  
- Deploy ECS (story dedicata).

### Open Questions

- Granularità campi e relazioni tra entità (definizione in refinement).

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] Admin raggiungibile; API coerenti con i content types.  
- [ ] UI admin dimostra creazione/consultazione dati di prova.  
- [ ] Test automatizzati ove applicabile (API/plugin).  
- [ ] Code review e merge.  
- [ ] Demo-ready: flusso in Strapi Admin registrabile.

## Dependencies

**Story Dependencies**: Preferibile dopo o in parallelo stretto con [US-EP00-01](./us-ep00-01-monorepo-convenzioni-e-quality-gate.md) (monorepo che ospita Strapi).  
**Epic Dependencies**: Nessuna upstream.

## Notes

Coerenza con [architecture.md](../../../tech/architecture.md) e bounded context Catalog & Publishing.
