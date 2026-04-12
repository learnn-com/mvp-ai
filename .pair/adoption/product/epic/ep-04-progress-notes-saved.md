# EP-04 — Progressi, note e My Learnn

## Meta

| Field | Value |
| ----- | ----- |
| **Epic ID** | EP-04 |
| **Initiative** | [INIT-001](../initiative/init-001-mvp-fase-1.md) |
| **Priority** | P0 |
| **Bounded context** | [Learning Engagement](../../tech/boundedcontext/learning-engagement.md) |
| **PRD reference** | §6 P0 (6–8), Epic 4 in §7 |

## Epic statement

**Come** utente **voglio** vedere corsi iniziati, segnare completamenti, scrivere note e salvare corsi/lezioni **affinché** la mia sessione di apprendimento sia tracciata e ritrovabile.

## Scope (P0)

- Corso “iniziato” al primo play lezione; lista in home; **senza** resume al minuto (Fase 2).
- Completamento lezione manuale.
- Una nota testuale per lezione (modificabile, limite caratteri opzionale).
- My Learnn: salvati corsi vs lezioni; azione su corso e lezione.

## User stories (from PRD)

- US 4.1 — corsi iniziati
- US 4.2 — completamento manuale
- US 4.3 — note per lezione
- US 4.4 — salvati

## Technical considerations

- API coerenti con Strapi/custom controllers; consistenza cross-device per note e salvataggi.

## Epic acceptance criteria

- [ ] AC Epic 4 PRD per tutte le US P0.

## Dependencies

**Depends on:** EP-03 (play avvia progresso), EP-01 (utente).
