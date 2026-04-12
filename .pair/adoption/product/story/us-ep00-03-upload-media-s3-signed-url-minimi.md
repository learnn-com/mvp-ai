# US-EP00-03 — Upload media da Strapi verso S3 e signed URL minimi

## Story Statement

**Come** editor **voglio** caricare media dall’admin Strapi verso storage AWS (S3) con meccanismo di accesso controllato agli asset **affinché** il flusso editoriale sia realistico e il playback possa usare URL firmati in modo minimo e sicuro.

## Epic Context

**Parent Epic**: [EP-00 — Piattaforma e fondamenta](../epic/ep-00-foundation-platform.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Asset non solo locali; prerequisito per VOD e webapp.  
**Business Impact**: Allinea a ADR infrastruttura (S3, CloudFront) e riduce rework su EP-03.  
**Visible UI Value**: Strapi Media Library con upload riuscito; verifica che l’oggetto sia in bucket; eventuale fetch tramite signed URL di prova (documentato in demo).

## Rough Sizing

**Story Points**: M (3)  
**Confidence**: Medium  
**Reasoning**: Integrazione AWS + plugin/provider Strapi; policy IAM e URL firmati da chiarire in refinement.

## Initial Scope

### Likely In Scope

- Configurazione upload Strapi → S3 (bucket dedicato o prefissi adottati).  
- Policy/permessi minimi per upload da Strapi.  
- Signed URL (o equivalente adottato) per almeno un asset di test (coerente con “signed URL minime” dell’epic).

### Likely Out of Scope

- Player video completo e catalogo utente (epiche successive).  
- CDN full per tutti gli asset (può essere iterazione).

### Open Questions

- TTL e formato URL; separazione bucket webapp vs media.

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] Upload da admin verificato su AWS per almeno un file di test.  
- [ ] Dimostrazione accesso controllato all’asset (signed URL o path documentato).  
- [ ] Test automatizzati o script di verifica ove possibile.  
- [ ] Code review e merge.  
- [ ] Demo-ready: percorso editor → S3 → accesso file di prova.

## Dependencies

**Story Dependencies**: [US-EP00-02](./us-ep00-02-strapi-locale-content-types-ruoli.md) (Strapi funzionante); infrastruttura bucket/policy può richiedere fondamenta AWS in [US-EP00-04](./us-ep00-04-deploy-strapi-ecs.md) — da coordinare in refinement (ordine o ambienti condivisi).  
**Epic Dependencies**: Account/bucket AWS disponibili per dev.

## Notes

Riferimento: [infrastructure.md](../../../tech/infrastructure.md), ADR VOD/S3/CloudFront se adottati.
