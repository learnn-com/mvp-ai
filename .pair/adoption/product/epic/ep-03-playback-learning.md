# EP-03 — Overview, player e fruizione

## Meta

| Field | Value |
| ----- | ----- |
| **Epic ID** | EP-03 |
| **Initiative** | [INIT-001](../initiative/init-001-mvp-fase-1.md) |
| **Priority** | P0 |
| **Bounded contexts** | [Learning Engagement](../../tech/boundedcontext/learning-engagement.md), [Media Platform](../../tech/boundedcontext/media-platform.md) |
| **PRD reference** | §6 P0 (4), Epic 3 in §7 |

## Epic statement

**Come** utente **voglio** overview corso/lezione e player video/audio/testo **affinché** consumi i contenuti in modo chiaro e controllabile.

## Scope (P0)

- Overview con trailer/immagine, metadati, tab Lezioni / Professionista / Simili, CTA start, tag, azioni My Learnn dove previsto.
- Player: video fullscreen, ±15s, barra, qualità manuale; audio; testo; **tab** tra formati senza sync timestamp (Fase 1).
- Autoplay al successivo con annullamento.
- FAQ corso/contenuto in lettura.
- **Video.js** + integrazione URL da media/VOD AWS.

## User stories (from PRD)

- US 3.1 — overview
- US 3.2 — player multi-formato
- US 3.3 — autoplay successivo

## Technical considerations

- Signed URL / token per stream; mobile network performance; [ux-ui.md](../../tech/ux-ui.md) dark + a11y AA su flussi critici.

## Epic acceptance criteria

- [ ] AC Epic 3 PRD soddisfatti per P0.
- [ ] Nessun requisito P1 (sottotitoli .vtt, sync formato) in questa epica.

## Dependencies

**Depends on:** EP-02 (navigazione verso contenuto), EP-00 (media delivery), EP-01 (auth).
