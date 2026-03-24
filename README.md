# Astro Clean Template

An **Astro** starter for **static** sites where the deliverable is predictable **HTML, CSS, and JavaScript**: build with components and layouts, ship output that is easy to hand off or embed in a CMS theme.

**Repository:** [github.com/davidaganov/astro-clean-template](https://github.com/davidaganov/astro-clean-template)  
**Author:** [David Aganov](https://github.com/davidaganov)

## Goals

- **Authoring**: components, shared layout, no duplicated markup.
- **CSS**: one main bundle in `dist/assets/style/main.css` (handoff-friendly naming via Vite).
- **No Sass** — native CSS with nesting.
- **Client JS** (see below): **`npm run build`** copies files as-is; **`npm run build:prod`** ships **one** minified `dist/assets/script/main.js`.

### Client JavaScript (`src/assets/script/`)

Layouts reference **`/assets/script/main.js`** with an inline `<script type="module" src="…">` (no Vite bundling of that file).

- **`npm run build`** — `vite-plugin-static-copy` copies `src/assets/script/*.js` into **`dist/assets/script/`** unchanged (same `import` graph as in source). `compressHTML` is off; CSS is not minified.
- **`npm run build:prod`** — after the copy, **`esbuild`** bundles `src/assets/script/main.js` (resolves imports) into **`dist/assets/script/main.js` only** (minified); other `.js` files in that folder are removed. **HTML and CSS** are minified via Astro/Vite (`compressHTML` + `minify`).

### Images (`astro:assets`)

- Example: `src/components/base/ImageCard.astro` uses `<Picture>`. With **`formats={['avif','webp']}`** on a PNG source, Astro emits **three** derivatives: AVIF WebP sources + one optimized `<img>` fallback (PNG), i.e. three files under `dist/assets/images/` — not seven. Two `<Picture>` blocks on the same asset would double that count.
- Place raster assets under `src/assets/` (e.g. `src/assets/images/`) so Astro can optimize them at build time.

## Commands

| Command                | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Dev server                                               |
| `npm run build`        | Handoff build: no JS/CSS minification, uncompressed HTML |
| `npm run build:prod`   | Minified JS/CSS, compressed HTML                         |
| `npm run preview`      | Preview `dist/`                                          |
| `npm run lint`         | ESLint (flat config, Astro + TS + Prettier integration)  |
| `npm run lint:fix`     | ESLint with `--fix`                                      |
| `npm run format`       | Prettier write (respects `.prettierignore`)              |
| `npm run format:check` | Prettier check only                                      |

### Starter Configuration Commands

| Command                   | Description                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------- |
| `npm run config:template` | Restores `src/` to the full demo template (features, hero, etc.)                            |
| `npm run config:clean`    | Restores `src/` to a minimal template with just the base layout and blank active pages      |
| `npm run config:empty`    | Wipes the `src/` directory entirely, creating a completely empty folder for a scratch build |

`PROD_BUILD=1` enables the production-style build (same as `npm run build:prod`). **`.env.example`** documents optional variables; copy to `.env` if you prefer env-based flags over npm scripts. It contains no secrets.

Formatting and linting follow the same baseline as the author’s Vue/Nuxt projects (Prettier options + import sort), adapted for Astro: **`prettier-plugin-astro`** is loaded after **`@trivago/prettier-plugin-sort-imports`**, and ESLint uses **`eslint-plugin-astro`**, **`typescript-eslint`**, **`eslint-config-prettier`**, and **`eslint-plugin-prettier`**. Node globals apply to `*.mjs` config files; browser globals apply to `src/assets/script/**/*.js`.

## Structure

```
src/
  assets/
    script/          # copied verbatim to dist (handoff) or bundled to main.js (prod)
    styles/          # reset, variables, main.css (@import)
  components/
  layouts/
    Layout.astro
    SubpageLayout.astro   # same <script src="/assets/script/main.js"> as Layout
  pages/
    index.astro
    about.astro
public/
astro.config.mjs     # static copy + prod esbuild bundle hook
```

## Styles and HMR

- Global styles: `src/assets/styles/main.css` (imported from layouts).
- Component styles: `<style is:global>` and native nesting.

## Troubleshooting

- If `/assets/script/main.js` 404s in dev, ensure `vite-plugin-static-copy` ran (check the dev console). In `dist`, `npm run build` should list `dist/assets/script/*.js` matching `src/assets/script/`.
- **Node 22.12+** is required (Astro 6).

## Notes

A similar workflow used to be common with Gulp/EJS; this repo is a modern equivalent on Astro.

## License

MIT © [David Aganov](https://github.com/davidaganov)
