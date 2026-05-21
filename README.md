# Astro Clean Template

Performance-oriented Astro starter focused on predictable static output: component-based pages, a single handoff-friendly CSS bundle, and optional production minification.

**Repository:** [github.com/davidaganov/astro-clean-template](https://github.com/davidaganov/astro-clean-template)
**Catalog starters:** [github.com/davidaganov/stack](https://aganov.dev/en/docs/guides/starters)

## Recommended setup

Use **[@davidaganov/stack](https://www.npmjs.com/package/@davidaganov/stack)**:

```bash
npx @davidaganov/stack
```

Pick **Astro Clean Template**, then:

| Mode            | What you get                                           |
| :-------------- | :----------------------------------------------------- |
| **Empty**       | Minimal app from `.webstack/template-empty`.           |
| **Recommended** | Demo pages plus **i18n** (via `@mannisto/astro-i18n`). |
| **Custom**      | Demo pages; toggle **i18n** independently.             |

---

## Manual setup

1. `git clone https://github.com/davidaganov/astro-clean-template.git`
2. `cd astro-clean-template`
3. `npm install`
4. `npm run dev`
5. `npm run build` for production assets.

---

## Prerequisites

- **Node.js** v22+.

---

## Internationalization

Locale JSON under `src/i18n/locales/`. Typical usage:

```typescript
import { useI18n } from "@/utils/i18n"

const t = useI18n(Astro.url)
t("home.hero.title")
```

`npm run translate` runs [Polyglot Keeper](https://aganov.dev/en/docs/about/projects/polyglot-keeper) sync when the **i18n** layer is present.

## Features

- Component-based authoring with shared layouts.
- Single CSS bundle under `dist/assets/style/` for handoff.
- Modern CSS with native nesting (no Sass required).
- Client JS: multi-file handoff path or one minified bundle for production.
- Images via `astro:assets` (AVIF/WebP).

---

## Commands

| Command              | Description               |
| :------------------- | :------------------------ |
| `npm run dev`        | Dev server                |
| `npm run build`      | Handoff static build      |
| `npm run build:prod` | Minified production build |
| `npm run preview`    | Preview `dist/`           |
| `npm run lint:fix`   | ESLint + Prettier fixes   |

---

## Layout

- `src/pages/` — Routes and entries.
- `src/components/` — Astro components.
- `src/assets/script/` — Client-side JS.
- `src/assets/styles/` — Global CSS and tokens.

---

## License

MIT © [David Aganov](https://aganov.dev/en)
