# US-EP00-06 — Contratto webhook checkout → provisioning utente (stub)

## Story Statement

**Come** team di sviluppo **voglio** uno stub o un contratto API documentato per il webhook post-checkout che avvia il provisioning utente **affinché** EP-01 membership possa integrarsi senza ambiguità sul formato eventi e risposte.

## Epic Context

**Parent Epic**: [EP-00 — Piattaforma e fondamenta](../epic/ep-00-foundation-platform.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Chiarezza su payload, autenticazione webhook e idempotenza.  
**Business Impact**: Collega monetizzazione a identità senza blocchi di integrazione tardivi.  
**Visible UI Value**: Endpoint o mock esposto (es. risposta 200, log strutturato, OpenAPI/minima doc) dimostrabile; eventuale pagina/postman di prova.

## Rough Sizing

**Story Points**: S (2)  
**Confidence**: Medium  
**Reasoning**: Scope deliberatamente sottile: contratto + stub, non business logic completa.

## Initial Scope

### Likely In Scope

- Definizione contratto (campi obbligatori, errori, retry attesi).  
- Implementazione stub (serverless o route Strapi/custom) che accetta eventi fittizi.  
- Documentazione per integrazione futura con provider di pagamento.

### Likely Out of Scope

- Integrazione reale con gateway di pagamento e utenza prod.  
- Gestione completa abbonamenti (EP-01).

### Open Questions

- Dove ospitare lo stub (stesso servizio Strapi vs microservizio).

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] Contratto versionato (markdown o OpenAPI snippet nel repo).  
- [ ] Stub risponde a richieste di esempio; test automatizzato base se possibile.  
- [ ] Code review e merge.  
- [ ] Demo-ready: chiamata di esempio mostrata (curl o client).

## Dependencies

**Story Dependencies**: Opzionale dopo [US-EP00-04](./us-ep00-04-deploy-strapi-ecs.md) se lo stub è in cloud; può restare locale per MVP.  
**Epic Dependencies**: Nessuna.

## Notes

Dettaglio “in task” come da epic; questa story incarna il taglio minimo verticalizzato.
