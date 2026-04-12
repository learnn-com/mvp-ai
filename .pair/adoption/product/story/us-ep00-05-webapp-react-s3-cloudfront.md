# US-EP00-05 — Webapp React su S3 e CloudFront

## Story Statement

**Come** utente finale (o stakeholder) **voglio** una webapp React raggiungibile tramite CloudFront con deploy su bucket S3 **affinché** esista un canale web pubblico per il prodotto, anche con pagine placeholder iniziali.

## Epic Context

**Parent Epic**: [EP-00 — Piattaforma e fondamenta](../epic/ep-00-foundation-platform.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Presenza web reale; base per EP-02+ UI.  
**Business Impact**: Soddisfa AC epic “webapp raggiunge ambiente prod (anche placeholder)”.  
**Visible UI Value**: Pagina/e placeholder servite da CloudFront (URL dimostrabile); build e deploy automatizzati o documentati.

## Rough Sizing

**Story Points**: M (3)  
**Confidence**: Medium  
**Reasoning**: Pattern static hosting ben noto; variabili su dominio e invalidazione cache.

## Initial Scope

### Likely In Scope

- Build produzione dell’app React nel monorepo.  
- Pubblicazione artefatti su S3 e distribuzione CloudFront.  
- Contenuto minimo: home/placeholder coerente con brand o neutro.

### Likely Out of Scope

- Funzionalità catalogo/login complete (epiche successive).  
- i18n e accessibilità complete (iterazioni).

### Open Questions

- Dominio custom vs default CloudFront; HTTPS.

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] URL CloudFront (o dominio) raggiungibile con build deployata.  
- [ ] UI placeholder visibile e dimostrabile in review.  
- [ ] Test build/lint inclusi nel percorso qualità.  
- [ ] Code review e merge.  
- [ ] Demo-ready: browser che carica la SPA/static site.

## Dependencies

**Story Dependencies**: [US-EP00-01](./us-ep00-01-monorepo-convenzioni-e-quality-gate.md) (app React nel repo e CI).  
**Epic Dependencies**: Bucket e distribuzione CloudFront per webapp (vedi infrastruttura).

## Notes

Allineamento a [ux-ui.md](../../../tech/ux-ui.md) quando si sostituisce il placeholder.
