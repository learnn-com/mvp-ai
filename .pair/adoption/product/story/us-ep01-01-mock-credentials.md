# US-EP01-01 — Credenziali mock (QA / dev)

Fonte di verità in codice: `apps/web/src/features/auth/mock/mock-credentials.ts` (importata dall’adapter mock). Questo file riassume per chi non apre il repo.

## Coppie valide

| Email                         | Password           | Note                          |
| ----------------------------- | ------------------ | ----------------------------- |
| `abbone.test@learnn.local`    | `MockPassword123!` | Utente di test MVP (nessun backend) |

## Coppie invalide (esempi)

| Email                      | Password | Esito atteso                         |
| -------------------------- | -------- | ------------------------------------ |
| `sbagliato@test.local`     | qualsiasi | Messaggio generico “credenziali non valide” |
| `abbone.test@learnn.local` | `x`      | Stesso messaggio generico            |
| (vuota)                    | (qualsiasi) | Validazione client: email obbligatoria |
| `non-una-email`            | `***`    | Validazione client: email non valida |

Nessuna password reale in repository.
