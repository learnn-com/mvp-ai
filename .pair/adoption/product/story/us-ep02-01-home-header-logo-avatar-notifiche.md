# US-EP02-01 — Header Home: logo, avatar notifiche e badge

## Story Statement

**Come** utente sulla Home **voglio** un header con logo e avatar che apre le notifiche, con badge se ci sono notifiche non lette **affinché** capisca subito se c’è qualcosa da leggere senza navigazioni extra in questa release.

## Epic Context

**Parent Epic**: [EP-02 — Discovery, ricerca e catalogo](../epic/ep-02-catalog-discovery.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## Riferimento visivo

Header su fondo scuro: wordmark **Learnn** a sinistra; a destra avatar circolare (iniziali) con **badge rosso** in alto a destra se ci sono notifiche: [`design-references/header.png`](../design-references/header.png).

Il mockup include **“Home”** e **“My Learnn”** al centro: restano **fuori scope** in questa release (solo logo + avatar come da piano).

## User Value

**User Benefit**: Accesso rapido al centro notifiche dalla Home.  
**Business Impact**: Allinea a incremento notifiche (maschera completa in PBI successivo).  
**Visible UI Value**: Header con logo; avatar cliccabile; badge rosso su avatar se `count > 0`; al tap overlay/modale con **solo elenco titoli** notifiche (contenuto maschera completato in release futura).

## Rough Sizing

**Story Points**: M (3)  
**Confidence**: High  
**Reasoning**: UI + stato locale/mock; nessuna integrazione Strapi in questa release.

## Initial Scope

### Likely In Scope

- Layout header: logo + avatar (notifiche).  
- Dati notifiche **mock** (come se Strapi/API esistessero).  
- Badge rosso condizionale sull’avatar.  
- Maschera modale: lista titoli notifiche (chiusura tap fuori / pulsante base).

### Esplicitamente fuori scope (questa release)

- Link testuali **“Home”** e **“My Learnn”** nell’header o nav primaria associata — **non** inclusi.  
- Completamento UX della maschera notifiche (azioni, dettaglio, mark-as-read persistito) — PBI successivo.

### Open Questions

- Comportamento se utente non autenticato (placeholder avatar vs requisito EP-01).

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] UI demo-ready: header + badge + modale titoli con mock.  
- [ ] Test UI (stato con/senza notifiche).  
- [ ] Card ratio Home generale: allineamento a PRD 4:5 sulle **card catalogo** nelle story slider dedicate, non necessariamente sull’avatar.

## Dependencies

**Story Dependencies**: [EP-01](../epic/ep-01-membership-subscription.md) se la Home è solo per utente loggato; altrimenti opzionale.  
**Epic Dependencies**: EP-00 (webapp), EP-01 per sessione se richiesta.

## Notes

Incremento prodotto concordato: mock server; maschera notifiche parziale fino a PBI dedicato.
