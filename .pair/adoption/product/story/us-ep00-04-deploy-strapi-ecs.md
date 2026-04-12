# US-EP00-04 — Deploy Strapi su ECS ripetibile

## Story Statement

**Come** team di sviluppo **voglio** un processo ripetibile per costruire e distribuire Strapi su ECS **affinché** l’API e l’admin siano disponibili in ambiente condiviso (es. staging/prod) senza passaggi manuali opachi.

## Epic Context

**Parent Epic**: [EP-00 — Piattaforma e fondamenta](../epic/ep-00-foundation-platform.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Ambiente stabile per integrazione e test end-to-end.  
**Business Impact**: Prerequisito per rilasci catalogo e membership contro API reali.  
**Visible UI Value**: URL pubblico/riservato dove Strapi risponde (health + admin/API); dimostrazione deploy ripetuto (due esecuzioni o documentazione + evidenza).

## Rough Sizing

**Story Points**: L (5)  
**Confidence**: Low–Medium  
**Reasoning**: ECS, networking, secrets, immagine container — variabile.

## Initial Scope

### Likely In Scope

- Dockerfile / build immagine Strapi adottata dal repo.  
- Task definition ECS e servizio con variabili da secret manager o parametri documentati.  
- Verifica: API e admin raggiungibili secondo policy di sicurezza adottate.

### Likely Out of Scope

- Scalatura avanzata e osservabilità completa (MVP baseline).  
- Ottimizzazioni costi AWS.

### Open Questions

- Ambiente unico vs staging+prod; dominio e TLS.

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] Deploy documentato e ripetibile (script/pipeline).  
- [ ] Evidenza: Strapi risponde su API protette; admin accessibile per profili editoriali come da epic AC.  
- [ ] Test smoke post-deploy ove automatizzabile.  
- [ ] Code review e merge.  
- [ ] Demo-ready: mostrare endpoint e admin dopo deploy.

## Dependencies

**Story Dependencies**: [US-EP00-02](./us-ep00-02-strapi-locale-content-types-ruoli.md) (app Strapi stabile nel repo).  
**Epic Dependencies**: Account AWS, VPC/ECS allineati a [infrastructure.md](../../../tech/infrastructure.md).

## Notes

Coordinare segreti (DB, chiavi API) con linee guida sicurezza del progetto.
