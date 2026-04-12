# US-EP01-05 — Stato abbonamento e gestione pagamento sul sito (browser esterno)

## Story Statement

**Come** abbonato **voglio** vedere in sola lettura stato e scadenza dell’abbonamento e aprire la gestione pagamento sul sito in browser esterno **affinché** rispetti le policy store e la sicurezza senza acquisti in-app non previsti.

## Epic Context

**Parent Epic**: [EP-01 — Autenticazione, profilo e abbonamento](../epic/ep-01-membership-subscription.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Trasparenza sul piano attivo e percorso chiaro per modifiche di billing sul web.  
**Business Impact**: Conformità a vincoli distribuzione futura (app native); riduce contestazioni su pagamenti.  
**Visible UI Value**: Schermata (o sezione) con stato, data scadenza, CTA “Gestisci abbonamento” che apre URL esterno nel browser di sistema — **no WebView** (PRD).

## Rough Sizing

**Story Points**: M (3)  
**Confidence**: Medium  
**Reasoning**: UI + snapshot dati da backend; link esterno configurabile.

## Initial Scope

### Likely In Scope

- Visualizzazione snapshot: stato (es. attivo), scadenza o equivalente da modello dati.  
- CTA che apre `window.open` / link esterno documentato (non WebView).  
- Copy che chiarisce che il pagamento avviene sul sito.

### Likely Out of Scope

- Integrazione acquisto dentro la webapp (esplicitamente fuori per policy).  
- Storno o upgrade complessi (fuori MVP se non in PRD).

### Open Questions

- URL del portale billing per ambiente; fallback se snapshot non ancora sincronizzato.

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] AC PRD US 1.2 — AC1, AC2, AC3 (sola lettura, browser esterno, nessun acquisto in-app mobile nella webapp corrente).  
- [ ] Demo-ready: schermata con dati di test e tap su CTA verificabile.  
- [ ] Test automatizzati (UI critica + contratto dati).  
- [ ] Code review e merge.

## Dependencies

**Story Dependencies**: [US-EP01-01](./us-ep01-01-login-sessione-e-rate-limit.md); dati abbonamento coerenti con [US-EP01-03](./us-ep01-03-account-post-checkout-provisioning.md).  
**Epic Dependencies**: EP-00.

## Notes

Riferimento PRD §7 Epic 1 — US 1.2. Allineamento epic AC “nessun pagamento in-app che violi policy future app native”.
