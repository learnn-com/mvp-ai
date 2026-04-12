# US-EP01-03 — Account post-checkout e vincolo abbonato

## Story Statement

**Come** utente che ha completato il pagamento sul sito **voglio** che la mia utenza sia creata/aggiornata in Learnn in modo coerente con l’esito del checkout **affinché** solo gli abbonati possano accedere ai contenuti (PRD).

## Epic Context

**Parent Epic**: [EP-01 — Autenticazione, profilo e abbonamento](../epic/ep-01-membership-subscription.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Continuità tra pagamento esterno e accesso webapp senza creazione account manuale.  
**Business Impact**: Colonna “solo abbonati” per gated content; anti-corruption verso billing esterno.  
**Visible UI Value**: Evidenza in sprint review tramite scenario di test (webhook/evento simulato → utente presente e con diritti attesi); eventuale prima login post-acquisto.

## Rough Sizing

**Story Points**: L (5)  
**Confidence**: Low–Medium  
**Reasoning**: Integrazione asincrona, idempotenza, mapping payload; dipende da contratto [EP-00](../epic/ep-00-foundation-platform.md).

## Initial Scope

### Likely In Scope

- Gestione evento checkout → creazione/aggiornamento utente e snapshot abbonamento (anti-corruption layer).  
- Allineamento a [US-EP00-06](./us-ep00-06-webhook-checkout-contratto-provisioning.md) o evoluzione dello stesso contratto.  
- Verifica che login consentito solo a profili coerenti con stato pagante (regole MVP).

### Likely Out of Scope

- UI billing completa sul sito esterno (fuori Learnn).  
- Gestione edge case avanzati multi-piano (iterazioni).

### Open Questions

- Sorgente di verità per email utente; riconciliazione duplicati.

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] AC PRD 1.1 — AC3: account collegato al completamento pagamento (percorso tecnico documentato e verificabile).  
- [ ] Test con payload fittizio o sandbox; idempotenza base.  
- [ ] Code review e merge.

## Dependencies

**Story Dependencies**: [US-EP00-06](./us-ep00-06-webhook-checkout-contratto-provisioning.md) (contratto/stub); EP-00 completato per Strapi Users.  
**Epic Dependencies**: EP-00.

## Notes

Riferimento PRD §7 Epic 1 — US 1.1 (AC3). Coordinare con initiative checkout sul sito.
