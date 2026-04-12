# US-EP01-02 — Reset password (password dimenticata)

## Story Statement

**Come** utente registrato **voglio** richiedere il reset della password e impostarne una nuova tramite link sicuro **affinché** possa riottenere accesso senza assistenza manuale.

## Epic Context

**Parent Epic**: [EP-01 — Autenticazione, profilo e abbonamento](../epic/ep-01-membership-subscription.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Recupero credenziali conforme al PRD.  
**Business Impact**: Riduce attrito e supporto; requisito di sicurezza base.  
**Visible UI Value**: Flusso “password dimenticata”, email (o canale) di reset, form nuova password; conferma successo/errore.

## Rough Sizing

**Story Points**: M (3)  
**Confidence**: Medium  
**Reasoning**: Dipende da provider email/template e route Strapi dedicate (PRD).

## Initial Scope

### Likely In Scope

- Richiesta reset con email.  
- Token/link monouso o equivalente Strapi; scadenza ragionevole.  
- Impostazione nuova password con validazione.  
- Rate limit su richieste reset (PRD / security).

### Likely Out of Scope

- Cambio password da loggato ([US-EP01-04](./us-ep01-04-area-profilo-utente.md) può includerlo — da chiarire in refinement).

### Open Questions

- Provider email in dev vs prod; contenuto template messaggi.

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] AC PRD 1.1 — AC2: invio reset e possibilità di impostare nuova password.  
- [ ] Demo-ready: percorso completo in ambiente di test (email di test o capture).  
- [ ] Test automatizzati ove possibile (API + UI critiche).  
- [ ] Code review e merge.

## Dependencies

**Story Dependencies**: [US-EP01-01](./us-ep01-01-login-sessione-e-rate-limit.md) consigliata (stessa base auth); può svilupparsi in parallelo stretto.  
**Epic Dependencies**: EP-00.

## Notes

Riferimento PRD §7 Epic 1 — US 1.1 (AC2).
