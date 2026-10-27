# MOSQUE ATLAS 3D

A multilingual, evidence-linked atlas of mosque architecture and heritage. This implementation publishes six limited documented-core records and keeps 96 provisional research candidates clearly separated.

## Run locally

```bash
npm install
npm run validate:data
npm run dev
```

Open `http://localhost:3000/en`, `/fr`, or `/ar`.

## Verification

```bash
npm test
npm run build
```

The research package remains in `research/`. Its Python validator and JSON Schema are authoritative. The additional Node validation checks atlas-specific publication boundaries, counts, source references, empty media/model policy, and uncertain-date sorting.

## Editorial boundary

The public app is read-only. It does not simulate insecure client-side authentication. `research/schema/relational_postgres.sql` provides the starting database contract; `/[locale]/editorial` documents the required authenticated candidate → documented core → scholarly-approved transition. Before enabling writes, add server-side identity, role checks, content sanitization, audit events, rate limits, and object storage for reviewed media/GLB files.

## Deployment

The app is compatible with Vercel. Preview deployment may be created from the feature branch. Production deployment and domain connection require explicit owner approval.

## Known research limits

- No licensed images or reviewed 3D assets are supplied.
- No verified coordinates or architectural dimensions are supplied.
- French and Arabic translations require native-language copyediting.
- The six pilot notices are not peer-reviewed complete scholarly dossiers.
