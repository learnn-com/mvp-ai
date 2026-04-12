# US-EP00-01 — Monorepo, convenzioni e quality gate (locale + CI)

## Story Statement

**Come** team di sviluppo **voglio** un monorepo con layout Strapi/React, convenzioni di package e quality gate eseguibile in locale e in CI **affinché** ogni contributo rispetti gli stessi controlli prima delle epiche funzionali.

## Epic Context

**Parent Epic**: [EP-00 — Piattaforma e fondamenta](../epic/ep-00-foundation-platform.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## User Value

**User Benefit**: Baseline tecnica condivisa e ripetibile; meno attrito tra dev e integrazione continua.  
**Business Impact**: Riduce rischio di ritardi e regressioni quando crescono i package.  
**Visible UI Value**: Report/esito del quality gate (locale e job CI) dimostrabile in sprint review — nessuna UI prodotto end-user richiesta.

## Rough Sizing

**Story Points**: M (3)  
**Confidence**: Medium  
**Reasoning**: Tocca tooling, convenzioni e pipeline; variabile in base a stato repo esistente.

## Initial Scope

### Likely In Scope

- Layout monorepo (pnpm/turbo o equivalente adottato), package app Strapi e webapp React.  
- Comandi documentati per dev locale (README / doc ambienti).  
- Integrazione `pnpm quality-gate` (o equivalente adottato) in CI per i package previsti.

### Likely Out of Scope

- Content types Strapi completi (altra story).  
- Deploy cloud (altra story).

### Open Questions

- Struttura esatta dei package se il repo è ancora in bootstrap.

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] Funzionalità implementata e documentazione aggiornata per avvio locale.  
- [ ] Valore visibile: esito quality gate riproducibile (log CI o comando).  
- [ ] Test automatizzati e lint dove applicabile.  
- [ ] Code review e merge.  
- [ ] Demo-ready: mostrare gate verde su branch di prova.

## Dependencies

**Story Dependencies**: Nessuna.  
**Epic Dependencies**: Nessuna upstream.

## Notes

Allinea a [tech-stack.md](../../../tech/tech-stack.md) e [way-of-working.md](../../../tech/way-of-working.md) per i gate.
