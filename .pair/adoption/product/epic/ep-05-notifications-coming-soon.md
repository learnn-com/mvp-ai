# EP-05 — Notifiche e coming soon (comunicazione)

## Meta

| Field | Value |
| ----- | ----- |
| **Epic ID** | EP-05 |
| **Initiative** | [INIT-001](../initiative/init-001-mvp-fase-1.md) |
| **Priority** | P0 |
| **Bounded context** | [Communications](../../tech/boundedcontext/communications.md) |
| **PRD reference** | §6 P0 (9–10), Epic 5 in §7 |

## Epic statement

**Come** utente **voglio** essere avvisato su contenuti rilevanti e vedere cosa uscirà **affinché** non perda uscite importanti.

## Scope (P0)

- Push via provider tipo **OneSignal**; payload con ID per deep link (es. overview corso).
- In-app: lista notifiche **solo sessione** (non persistita) con app aperta.
- **Coming soon:** coperto in EP-02 per anteprime; questa epica completa **canale notifica** per giorno uscita *dove applicabile* in Fase 1 (PRD P0 item 9); promemoria giorno prima = P1.

## User stories (from PRD)

- US 5.1 — notifiche push e deep link
- Allineamento con US 5.2 per messaggistica uscite (split con EP-02 se necessario)

## Technical considerations

- SDK web, permessi browser; backend segmentazione minima; coerenza con [infrastructure.md](../../tech/infrastructure.md).

## Epic acceptance criteria

- [ ] AC US 5.1 PRD.
- [ ] Comportamento “giorno dell’uscita” coerente con vincoli P0/P1 del PRD (nessun overscope P1 senza decisione).

## Dependencies

**Depends on:** EP-01 (utente), EP-02 (content IDs), EP-00 (integrazione provider).
