# EP-02 — Discovery, ricerca e catalogo

## Meta

| Field | Value |
| ----- | ----- |
| **Epic ID** | EP-02 |
| **Initiative** | [INIT-001](../initiative/init-001-mvp-fase-1.md) |
| **Priority** | P0 |
| **Bounded context** | [Catalog & Publishing](../../tech/boundedcontext/catalog-and-publishing.md) |
| **PRD reference** | §6 P0 (5, 9 parz.), Epic 2 in §7 |

## Epic statement

**Come** utente **voglio** home in stile streaming, ricerca per parola/tema e coming soon **affinché** trovi e anticipi contenuti rilevanti.

## Scope (P0)

- Home con sezioni configurabili (continua, nuovi, categorie, prossime uscite, ecc.).
- Ricerca su corsi, lezioni, webinar; filtri tema; tag su lezioni; risultati raggruppati per tipologia.
- Card mobile ratio **4:5** come da PRD.
- **Coming soon — base:** elenco anteprime corsi/webinar in uscita (promemoria push giorno prima = P1).

## User stories (from PRD)

- US 2.1 — home streaming
- US 2.2 — ricerca tema/tag
- US 5.2 (base) — coming soon anteprime

### User story in backlog (file)

| # | Story | File |
|---|--------|------|
| US-EP02-01 | Header Home: logo, avatar notifiche, badge, maschera titoli (parziale) | [us-ep02-01-home-header-logo-avatar-notifiche.md](../story/us-ep02-01-home-header-logo-avatar-notifiche.md) |
| US-EP02-02 | Slider corsi/webinar multi-episodio per categoria (mock, max 5) | [us-ep02-02-home-slider-corsi-webinar-serie-categoria.md](../story/us-ep02-02-home-slider-corsi-webinar-serie-categoria.md) |
| US-EP02-03 | Slider contenuti singoli per categoria (mock, max 10) | [us-ep02-03-home-slider-contenuti-singoli-categoria.md](../story/us-ep02-03-home-slider-contenuti-singoli-categoria.md) |
| US-EP02-04 | Ricerca parola/tema (mock, US 2.2) | [us-ep02-04-ricerca-parola-tema-mock.md](../story/us-ep02-04-ricerca-parola-tema-mock.md) |
| US-EP02-05 | Coming soon anteprime (mock, US 5.2 base) | [us-ep02-05-coming-soon-anteprime-mock.md](../story/us-ep02-05-coming-soon-anteprime-mock.md) |

Indice: [story/README.md](../story/README.md).

### Incremento release (mock, vincoli UI concordati)

- **Riferimenti visivi (PNG):** cartella [design-references/](../design-references/README.md) (login, header, card slider serie).  
- **Dati:** mock lato client come se Strapi esistesse; nessun fetch reale in questa tornata.  
- **Header:** logo + avatar → notifiche; badge rosso se ci sono notifiche; tap → maschera con **solo titoli** (completamento maschera = PBI successivo). **Non** in scope: link “Home” e “My Learnn”.  
- **Slider serie (corsi/webinar multi-episodio):** scroll orizzontale; max **5** item; “Vedi tutti” → pagina categoria con navigazione + **WIP** per lista paginata; badge solo per **webinar** (asset UX da definire); thumb con **conteggio contenuti**; caption: titolo, autore, professione, durata totale; **no** HD/CC/AU/TX.  
- **Slider contenuti singoli:** max **10** item; stesso pattern “Vedi tutti” + WIP; caption testo **max 2 righe**.  
- **Card:** aspect ratio **4:5** su mobile per card catalogo (PRD US 2.1 AC2).

## Technical considerations

- Temi da API (admin CRUD); performance liste e caching dove utile.

## Epic acceptance criteria

- [ ] AC Epic 2 PRD per US 2.1, 2.2.
- [ ] US 5.2 soddisfatta per scope Fase 1 (anteprime; notifiche giorno uscita come da PRD P0 item 9).

## Dependencies

**Depends on:** EP-00 (content model), EP-01 (utente loggato per personalizzazioni dove richiesto).
