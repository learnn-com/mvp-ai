# US-EP01-01 — Login email/password e sessione (JWT/Strapi)

## Incremento corrente: **auth mock** (nessun server)

In questa tornata **non** è richiesto Strapi né API login reali: implementare un **layer di autenticazione mock** (es. adapter) che simula successo/errore, emette un **token fittizio** con **shape** allineato al futuro JWT Strapi, e consente di sostituire il mock con una sola integrazione quando il backend sarà disponibile.

## Story Statement

**Come** abbonato **voglio** accedere alla webapp con email e password e mantenere una sessione sicura **affinché** solo utenti autenticati raggiungano le aree protette.

## Epic Context

**Parent Epic**: [EP-01 — Autenticazione, profilo e abbonamento](../epic/ep-01-membership-subscription.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## Riferimento visivo

Mock schermata login (titolo “Benvenuto”, campi pill Email/Password, CTA “Accedi” ghost outline, link “Password dimenticata?”): [`design-references/login-screen.png`](../design-references/login-screen.png).

## User Value

**User Benefit**: Ingresso standard e coerente con Strapi Users & Permissions.  
**Business Impact**: Prerequisito per catalogo e learning protetti (PRD US 1.1 — parte login).  
**Visible UI Value**: Schermata login, feedback errori, redirect post-login; flusso **mock** indistinguibile in UX dal futuro flusso reale (stesso persistenza token sul device).

### Criteri prodotto (login — tracciamento)

| Requisito | Coperto |
| --------- | ------- |
| Maschera login: inserimento **email** e **password**, **verifica** (in questa tornata: regole **mock**, non Strapi) | Sì (form + adapter mock; vedi Initial Scope) |
| Autenticazione **riuscita** → navigazione alla **Home** | Implicito in DoD (“area autenticata”); **Home** come destinazione esplicita sotto |
| **Token** (mock o futuro server) **persistito sul device** per **login automatico** alla riapertura | Sì — in DoD; storage in refinement |
| **Press lungo** su “Accedi”: sfondo pulsante **bianco**, testo **nero**, label resta **“Accedi”** | **Non** era nella story — ora in Initial Scope / DoD |
| **Credenziali errate** → l’app mostra un **errore** chiaro all’utente | Sì in parte (PRD AC1 “messaggi adeguati”; “feedback errori”) — reso esplicito in DoD |

## Rough Sizing

**Story Points**: M (3)  
**Confidence**: Medium  
**Reasoning**: UI + adapter mock + persistenza; integrazione Strapi **differita** a incremento successivo.

## Initial Scope

### Likely In Scope

- Form login (solo email + password per PRD).  
- **Servizio auth mock**: credenziali di test documentate (es. una coppia email/password che **accetta**, almeno una che **rifiuta**); risposta con token fittizio e payload minimo utile alla Home protetta.  
- Interfaccia/strato pronto per swap con Strapi ([membership.md](../../tech/boundedcontext/membership.md)).  
- Logout o invalidazione base se prevista (cancella token mock da storage).  
- Dopo login riuscito: redirect alla **Home** (o route home adottata).  
- Persistenza credenziali di sessione: **salvare il token** (o meccanismo equivalente) sul device in modo che alla **riapertura** dell’applicazione l’utente risulti ancora autenticato senza re-inserire email/password, salvo scadenza/revoca (dettaglio storage in refinement: cookie httpOnly vs altro, vincoli sicurezza).  
- Stato **`:active` / press lungo** sul pulsante “Accedi”: riempimento **bianco**, testo **nero**, caption **“Accedi”** invariata (allineamento a mock [login-screen.png](../design-references/login-screen.png)).

### Likely Out of Scope

- **Chiamate HTTP reali** a Strapi `/auth/local` (o equivalente) in questa tornata.  
- **Rate limiting** lato server (opzionale mock lato client o assente fino a backend).  
- Reset password ([US-EP01-02](./us-ep01-02-reset-password.md)).  
- Provisioning da checkout ([US-EP01-03](./us-ep01-03-account-post-checkout-provisioning.md)).

### Open Questions

- Meccanismo esatto di persistenza (cookie vs `localStorage` vs session) e rinnovo token; allineamento a ADR auth se presente; comportamento **PWA** vs browser tab.

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] Con **auth mock**: credenziali valide secondo regole documentate → successo; altrimenti → **messaggio di errore visibile** (stesso comportamento atteso con Strapi).  
- [ ] Login riuscito: redirect alla **Home** (route definita in refinement).  
- [ ] Token (o sessione) **persistito** sul device: alla riapertura app/sito l’utente **non** deve reinserire credenziali finché il token è valido (test E2E o manuale documentato).  
- [ ] Pulsante “Accedi”: con **press prolungato** (o stato premuto concordato con UX), sfondo **bianco** e testo **nero**, testo ancora **“Accedi”**.  
- [ ] UI dimostra flusso completo fino a area autenticata (anche placeholder).  
- [ ] Test automatizzati sull’adapter mock e/o E2E smoke UI (nessuna dipendenza da Strapi in CI per questa story).  
- [ ] Code review e merge.

## Dependencies

**Story Dependencies**: Shell webapp (es. da [EP-00](../epic/ep-00-foundation-platform.md)) **non** obbligatoria se il login mock vive in app già avviabile in locale.  
**Epic Dependencies**: Nessun server Strapi richiesto per chiudere questa story in modalità mock.

## Notes

Riferimento PRD §7 Epic 1 — US 1.1 (AC1). Allineato a EP-02 (catalogo mock): stesso approccio “UI prima, API dopo”.
