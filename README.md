# Astro Clean Template

**[Repository](https://github.com/davidaganov/astro-clean-template)** | **[Docs](https://aganov.dev/en/docs/guides/templates/astro-clean-template)**

Performance-oriented Astro template source for [@davidaganov/stack](https://www.npmjs.com/package/@davidaganov/stack): component-based pages, predictable static output, and optional i18n.

This repository is **generator source**, not a runnable app. Use the stack CLI to produce a project.

## Generate a project

```bash
npx @davidaganov/stack
```

Pick **Astro Clean Template**, then:

| Mode            | Description                               |
| :-------------- | :---------------------------------------- |
| **Empty**       | Minimal app from `template-empty/`        |
| **Recommended** | Demo pages plus default optional modules  |
| **Custom**      | Demo pages; enable **i18n** independently |

Optional modules: **i18n** (`@mannisto/astro-i18n`).

## Layout

| Path                   | Purpose                   |
| :--------------------- | :------------------------ |
| `template-empty/`      | Bare Astro project        |
| `features/demo-pages/` | Demo pages and components |
| `features/<name>/`     | Optional modules          |

Requirements: Node.js **>= 22.12**

## License

MIT © [David Aganov](https://aganov.dev/en)
