# Astro Clean Template

A performance-focused Astro starter for predictable static sites. Designed for clean HTML/CSS handoff or seamless integration into CMS themes.

## Key Features

- **Component Authoring**: Build with components and shared layouts without duplicating markup.
- **Single Bundle CSS**: Generates a single, handoff-friendly CSS file in `dist/assets/style/`.
- **Modern CSS**: Native nesting support without the need for Sass or preprocessors.
- **Hybrid JS Pipeline**: Choice between a multi-file handoff build or a single minified production bundle.
- **Image Optimization**: Automated multi-format asset generation (AVIF/WebP) via `astro:assets`.
- **Code Quality**: Pre-configured ESLint (Flat Config) and Prettier integration.

## Prerequisites

- **Node.js** (v22.12 or higher / Astro 6+)

## Quick Start

1.  **Install dependencies**:
    ```bash
    npm install
    ```
2.  **Start development server**:
    ```bash
    npm run dev
    ```
3.  **Handoff Build** (No minification):
    ```bash
    npm run build
    ```
4.  **Production Build** (Bundled & Minified):
    ```bash
    npm run build:prod
    ```

## Build Pipeline

The template supports two distinct build strategies:

- **Handoff** (`npm run build`): Copies JS/CSS as-is. Useful for developers who need to manually edit the output or integrate it into other systems.
- **Production** (`npm run build:prod`): Bundles and minifies all assets using esbuild. Best for direct deployment to static hosting.

## Commands

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the local development server |
| `npm run build` | Generates unminified, handoff-ready static files |
| `npm run build:prod` | Generates fully optimized and minified production build |
| `npm run preview` | Previews the generated `dist/` folder locally |
| `npm run lint:fix` | Automatically fixes ESLint and Prettier issues |

## Project Structure

- `src/pages/` — Routing and entry points.
- `src/components/` — Reusable Astro components.
- `src/assets/script/` — Client-side JavaScript (bundled on prod).
- `src/assets/styles/` — Global CSS and design tokens.

## License

MIT © David Aganov
