# Initiative INIT-001 — Learnn MVP (Fase 1)

## Meta

| Field | Value |
| ----- | ----- |
| **ID** | INIT-001 |
| **Title** | Learnn webapp MVP — Fase 1 |
| **Priority** | P0 |
| **Target** | Fase 1 PRD (riferimento: metà ottobre, da confermare) |
| **Source** | [PRD.md](../PRD.md) §4 Goals, §6 Key Features P0 |

## Statement

Consegnare una **webapp mobile-first** in abbonamento con **autenticazione**, **catalogo e discovery**, **fruizione multi-formato**, **progressi, note, salvati**, **coming soon** e **notifiche base**, con **qualità percepita** tipo streaming e infrastruttura **AWS** + **Strapi** + **React** adottata.

## Success metrics (from PRD)

- Validazione Tier 1 (€9,99/mese); traguardo successivo **≥ 2.500** abbonati paganti per fase di validazione (non tutti entro MVP).
- MVP: feature P0 complete; SLO prodotto da definire in engineering.

## Epics (children)

| ID | File | Theme |
| -- | ---- | ----- |
| EP-00 | [epic/ep-00-foundation-platform.md](../epic/ep-00-foundation-platform.md) | Piattaforma e fondamenta |
| EP-01 | [epic/ep-01-membership-subscription.md](../epic/ep-01-membership-subscription.md) | Autenticazione, profilo, abbonamento |
| EP-02 | [epic/ep-02-catalog-discovery.md](../epic/ep-02-catalog-discovery.md) | Discovery, ricerca, catalogo |
| EP-03 | [epic/ep-03-playback-learning.md](../epic/ep-03-playback-learning.md) | Overview, player, fruizione |
| EP-04 | [epic/ep-04-progress-notes-saved.md](../epic/ep-04-progress-notes-saved.md) | Progressi, note, My Learnn |
| EP-05 | [epic/ep-05-notifications-coming-soon.md](../epic/ep-05-notifications-coming-soon.md) | Notifiche, coming soon |

## Bounded contexts

See [boundedcontext/README.md](../../tech/boundedcontext/README.md).

## Notes

- PM su **filesystem** ([way-of-working.md](../../tech/way-of-working.md)); nessuna issue GitHub generata automaticamente.
- User story form: *Come … voglio … affinché …* (italiano).
