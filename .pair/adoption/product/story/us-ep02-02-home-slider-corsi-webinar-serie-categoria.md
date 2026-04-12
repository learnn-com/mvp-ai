# US-EP02-02 — Home: slider corsi/webinar multi-episodio per categoria (mock)

## Story Statement

**Come** utente **voglio** uno slider orizzontale di corsi o webinar “a puntate” (contenuto multiplo) della stessa categoria, con “Vedi tutti” **affinché** esplori la categoria senza ancora dipendere da Strapi in questa release.

## Epic Context

**Parent Epic**: [EP-02 — Discovery, ricerca e catalogo](../epic/ep-02-catalog-discovery.md)  
**Status**: Todo  
**Priority**: P0 (Must-Have)

## Riferimento visivo

Slider categoria (es. titolo sezione + **“Vedi tutto >”** a destra in grigio chiaro), card con thumb arrotondata: [`design-references/card-catalogo-serie-slider.png`](../design-references/card-catalogo-serie-slider.png).

Da replicare per i **webinar**:

- **Badge “WEBINAR”** in alto a sinistra sulla thumb: riquadro semi-trasparente, bordo bianco sottile, testo bianco maiuscolo.
- **Conteggio episodi** in basso a destra sulla thumb: **tab rettangolare viola** con numero bianco (es. `16`).

Sotto l’immagine: titolo in evidenza; riga autore — professione (es. grigio secondario); durata totale (es. `1h 20min`). **Non** mostrare la riga pill HD / CC / AU / TX presente nel mockup (fuori scope release).

## User Value

**User Benefit**: Discovery tipo streaming per raccolte serializzate.  
**Business Impact**: Copre parte di US 2.1 PRD (sezioni per categoria) con dati controllati via mock.  
**Visible UI Value**: Slider scrollabile orizzontalmente; **max 5** elementi per riga categoria; CTA **“Vedi tutti”** → rotta pagina categoria con **paginazione prevista**, contenuto lista **“working in progress”** per ora; card mobile **aspect ratio 4:5** (PRD US 2.1 AC2).

## Rough Sizing

**Story Points**: L (5)  
**Confidence**: Medium  
**Reasoning**: Regole caption/thumb/badge; navigazione; mock dati strutturati.

## Initial Scope

### Likely In Scope

- Dati **mock** (shape compatibile con futuro Strapi).  
- **Max 5** item per slider categoria.  
- **Webinar**: badge come da [riferimento visivo](#riferimento-visivo). **Corso**: nessun badge “WEBINAR”.  
- **Thumb**: mostra anche **numero contenuti** nel corso/webinar (es. “16”).  
- **Caption**: titolo corso/webinar; autore + professione; **durata totale**.  
- **Non** mostrare in questa release le icone/caratteristiche formato (HD, CC, AU, TX).  
- Tap card: navigazione verso overview EP-03 **o** placeholder coerente (da fissare in refinement; PRD US 2.1 AC3).

### Likely Out of Scope

- Fetch reale da Strapi.  
- Paginazione funzionante oltre shell WIP (solo navigazione + pagina segnaposto).

### Open Questions

- Più slider stesso tipo per categorie diverse: configurazione mock (array sezioni).

## Definition of Done Expectations

**Standard DoD Requirements** (da dettagliare in refinement):

- [ ] Comportamento “Vedi tutti” + pagina WIP verificabile.  
- [ ] Limite 5 elementi e scroll orizzontale verificabili.  
- [ ] Test componenti critici (badge webinar, conteggio thumb, caption).

## Dependencies

**Story Dependencies**: [US-EP02-01](./us-ep02-01-home-header-logo-avatar-notifiche.md) opzionale (stesso layout Home).  
**Epic Dependencies**: EP-00, EP-01 se Home autenticata.

## Notes

Allineamento a [catalog-and-publishing.md](../../tech/boundedcontext/catalog-and-publishing.md) quando si sostituisce il mock.
