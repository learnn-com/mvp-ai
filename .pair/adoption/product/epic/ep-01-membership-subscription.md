# EP-01 — Autenticazione, profilo e abbonamento

## Meta

| Field | Value |
| ----- | ----- |
| **Epic ID** | EP-01 |
| **Initiative** | [INIT-001](../initiative/init-001-mvp-fase-1.md) |
| **Priority** | P0 |
| **Bounded context** | [Membership](../../tech/boundedcontext/membership.md) |
| **PRD reference** | §6 P0 (1–3), Epic 1 in §7 |

## Epic statement

**Come** abbonato **voglio** accedere con email/password, gestire il profilo e vedere lo stato abbonamento **affinché** usi Learnn in modo sicuro e coerente con il pagamento sul sito.

## Scope (P0)

- Login email/password; reset password; sessione/JWT coerente con Strapi.
- Account collegato al flusso post-checkout (integrazione da task tecnici).
- Area utente: modifica nome, cognome, email, password, immagine, social, professione.
- Abbonamento: sola lettura stato e scadenza; CTA “gestisci” apre browser esterno (no WebView).

## User stories (from PRD)

- US 1.1 — accesso post-pagamento
- US 1.2 — stato abbonamento e link esterno billing

### User story in backlog (file)

| # | Story | File |
|---|--------|------|
| US-EP01-01 | Login email/password e sessione (**auth mock**, niente Strapi in questa tornata) | [us-ep01-01-login-sessione-e-rate-limit.md](../story/us-ep01-01-login-sessione-e-rate-limit.md) |
| US-EP01-02 | Reset password | [us-ep01-02-reset-password.md](../story/us-ep01-02-reset-password.md) |
| US-EP01-03 | Account post-checkout e provisioning | [us-ep01-03-account-post-checkout-provisioning.md](../story/us-ep01-03-account-post-checkout-provisioning.md) |
| US-EP01-04 | Area profilo utente | [us-ep01-04-area-profilo-utente.md](../story/us-ep01-04-area-profilo-utente.md) |
| US-EP01-05 | Stato abbonamento e billing esterno | [us-ep01-05-stato-abbonamento-e-billing-esterno.md](../story/us-ep01-05-stato-abbonamento-e-billing-esterno.md) |

Mappatura PRD: US 1.1 → EP01-01…03; scope epic “profilo” → EP01-04; US 1.2 → EP01-05. Indice: [story/README.md](../story/README.md).

**Incremento corrente (allineamento EP-02):** [US-EP01-01](../story/us-ep01-01-login-sessione-e-rate-limit.md) implementa il **login con auth mock** (nessun server Strapi obbligatorio); swap a API reale in incremento dedicato.

## Technical considerations

- HTTPS, rate limit login/reset; allineamento [security KB](../../../knowledge/guidelines/quality-assurance/security/README.md) dove applicabile.

## Epic acceptance criteria

- [ ] Flussi P0 dell’Epic 1 PRD soddisfatti con AC indicate nel PRD.
- [ ] Nessun pagamento in-app che violi policy future app native.

## Dependencies

**Depends on:** EP-00 per Strapi Users/API. **Unlocks:** catalog e learning protetti.
