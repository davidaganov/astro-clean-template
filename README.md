# Astro Clean Template

Performance-oriented Astro starter focused on predictable static output: component-based pages, a single handoff-friendly CSS bundle, and optional production minification.

**Repository:** [github.com/davidaganov/astro-clean-template](https://github.com/davidaganov/astro-clean-template)

## Recommended setup: WebStack CLI

The preferred way to scaffold a new project is **[`@davidaganov/stack`](https://www.npmjs.com/package/@davidaganov/stack)** ([CLI source](https://github.com/davidaganov/stack)). It clones this template from GitHub (or uses a local checkout), applies **Empty**, **Recommended**, or **Custom**, and merges `.webstack` layers.

```bash
npx @davidaganov/stack
```

Select **Astro Clean Template**, then pick:

| Mode            | What you get                                                                                                            |
| :-------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **Empty**       | Minimal app from `.webstack/template-empty` only (no demo pages slice).                                                 |
| **Recommended** | Demo pages plus default optional choices from the wizard (for this stack: **i18n** enabled via `@mannisto/astro-i18n`). |
| **Custom**      | Same baseline demo slice; you toggle **i18n** on or off.                                                                |

With **i18n** enabled, the generator adds localized routes (`src/pages/[locale]/…`), removes duplicate non-localized entry pages where appropriate, and patches layout, links, and `404.astro`. Without **i18n**, routing stays at the root `src/pages/` tree with static English strings.

Maintainers: **[GUIDLINE.md](https://github.com/davidaganov/stack/blob/main/GUIDLINE.md)** in [davidaganov/stack](https://github.com/davidaganov/stack).

---

## Manual setup (clone this repository)

Use this path when you work inside the template repo itself:

1. **Install dependencies:** `npm install`
2. **Development:** `npm run dev`
3. **Handoff build** (no minification): `npm run build`
4. **Production build** (bundled and minified): `npm run build:prod`

Requires **Node.js v22.12+** (Astro 6).

---

## Capabilities

- Component-based authoring with shared layouts.
- Single CSS bundle under `dist/assets/style/` for handoff.
- Modern CSS with native nesting (no Sass required).
- Client JS: multi-file handoff path or one minified bundle for production.
- Images via `astro:assets` (AVIF/WebP).
- ESLint (flat config) and Prettier.

---

## Build modes

- **`npm run build`** — Handoff-oriented output (readable assets).
- **`npm run build:prod`** — Optimized bundle via esbuild for direct static hosting.

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

MIT © David Aganov
