# US-EP01-04 — Area profilo utente (modifica dati)

## Story Statement

**Come** abbonato loggato **voglio** modificare nome, cognome, email, password, immagine, social e professione **affinché** il mio profilo sia aggiornato e coerente con come mi presento sulla piattaforma.

## Epic Context

**Parent Epic**: [EP-01 — Autenticazione, profilo e abbonamento](../epic/ep-01-membership-subscription.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Controllo dei dati personali e preferenze di profilo.  
**Business Impact**: Dati per personalizzazione e comunicazioni future; riduce richieste al supporto.  
**Visible UI Value**: Schermata “impostazioni / profilo” con form, salvataggio, validazione e messaggi di esito.

## Rough Sizing

**Story Points**: M (3)  
**Confidence**: Medium  
**Reasoning**: CRUD profilo su Strapi + UI; upload immagine se incluso nello stesso sprint.

## Initial Scope

### Likely In Scope

- Lettura e aggiornamento campi elencati nello scope epic (P0).  
- Validazione lato client e API; gestione errore/re-auth se necessario.  
- Cambio password da utente loggato (se non già coperto in altra story — consolidare in refinement).

### Likely Out of Scope

- Preferenze notifiche dettagliate ([EP-05](../epic/ep-05-notifications-coming-soon.md)).  
- Profilo pubblico social-style (se non richiesto PRD).

### Open Questions

- Limiti dimensione immagine; storage (S3) vs Strapi media.

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] Modifiche persistite e visibili al ricarico sessione.  
- [ ] UI demo-ready con almeno i campi P0 obbligatori funzionanti.  
- [ ] Test automatizzati per API critiche.  
- [ ] Code review e merge.

## Dependencies

**Story Dependencies**: [US-EP01-01](./us-ep01-01-login-sessione-e-rate-limit.md).  
**Epic Dependencies**: EP-00.

## Notes

Scope epic § “Area utente”; allineare campi a modello utente Strapi e PRD.
