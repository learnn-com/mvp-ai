# EP-00 — Piattaforma e fondamenta (Epic 0)

## Meta

| Field | Value |
| ----- | ----- |
| **Epic ID** | EP-00 |
| **Initiative** | [INIT-001](../initiative/init-001-mvp-fase-1.md) |
| **Priority** | P0 |
| **Bounded contexts** | All — Membership, Catalog & Publishing, Learning Engagement, Communications, Media Platform |
| **Sprint sizing** | ~2–3 sprint da 1 settimana (team-dependent) |

## Epic statement

**Come** team di sviluppo **voglio** repository, Strapi, webapp React, pipeline di qualità e infrastruttura AWS allineata alle adoption **affinché** le epiche funzionali possano essere implementate senza blocchi tecnici.

## Business value

Riduce rischio di ritardi su autenticazione, contenuti e video; abilita integrazione checkout→utenza e delivery VOD.

## Scope (P0)

- Monorepo / layout progetti: app **Strapi** (ECS), app **React** (S3+CloudFront), convenzioni package.
- **Strapi:** content types base (corso, lezione, webinar, tema, tag), ruoli editor/consumer, upload media verso S3.
- **AWS:** account, ECS per Strapi, bucket S3 + CloudFront per webapp e asset; policy signed URL minime per playback.
- **CI:** build, test, lint; allineamento a [way-of-working.md](../../tech/way-of-working.md) quality gate.
- **Integrazione esterna:** stub o contratto per webhook checkout → provisioning utente (dettaglio in task).

## User stories (high level)

- Setup engineering completato e documentato per ambienti (dev locale + prod).
- Strapi avviabile in locale; deploy su ECS ripetibile.
- Webapp buildabile e deployabile su S3/CF.

### User story in backlog (file)

| # | Story | File |
|---|--------|------|
| US-EP00-01 | Monorepo, convenzioni e quality gate (locale + CI) | [us-ep00-01-monorepo-convenzioni-e-quality-gate.md](../story/us-ep00-01-monorepo-convenzioni-e-quality-gate.md) |
| US-EP00-02 | Strapi locale: content types base e ruoli editorial | [us-ep00-02-strapi-locale-content-types-ruoli.md](../story/us-ep00-02-strapi-locale-content-types-ruoli.md) |
| US-EP00-03 | Upload media Strapi → S3 e signed URL minimi | [us-ep00-03-upload-media-s3-signed-url-minimi.md](../story/us-ep00-03-upload-media-s3-signed-url-minimi.md) |
| US-EP00-04 | Deploy Strapi su ECS ripetibile | [us-ep00-04-deploy-strapi-ecs.md](../story/us-ep00-04-deploy-strapi-ecs.md) |
| US-EP00-05 | Webapp React su S3 e CloudFront | [us-ep00-05-webapp-react-s3-cloudfront.md](../story/us-ep00-05-webapp-react-s3-cloudfront.md) |
| US-EP00-06 | Contratto webhook checkout → provisioning (stub) | [us-ep00-06-webhook-checkout-contratto-provisioning.md](../story/us-ep00-06-webhook-checkout-contratto-provisioning.md) |

Indice: [story/README.md](../story/README.md).

## Technical considerations

- [architecture.md](../../tech/architecture.md), [tech-stack.md](../../tech/tech-stack.md), [infrastructure.md](../../tech/infrastructure.md).

## Epic acceptance criteria

- [ ] Strapi risponde su API protette; admin accessibile per editorial.
- [ ] Webapp raggiunge ambiente prod (anche con pagine placeholder).
- [ ] Media upload da admin verso storage AWS funziona per almeno un asset di test.
- [ ] `pnpm quality-gate` (o equivalente) in CI per i package adottati.

## Dependencies

Nessuna epica funzionale upstream; **blocks** EP-01…EP-05 se incompleto.
