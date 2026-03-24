import { build } from "esbuild"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { viteStaticCopy } from "vite-plugin-static-copy"
import { defineConfig } from "astro/config"

/** @type {boolean} */
const prod = process.env.PROD_BUILD === "1"

/**
 * Handoff (`npm run build`): `vite-plugin-static-copy` copies `src/assets/script/*` to `dist/assets/script/` verbatim.
 * Prod (`npm run build:prod`): after the static copy, bundle + minify into a single `main.js` and remove other `.js` files there.
 */
function prodBundleClientScript() {
  return {
    name: "prod-bundle-client-script",
    hooks: {
      "astro:build:done": async ({ dir }) => {
        if (!prod) return

        const root = fileURLToPath(dir)
        const scriptDir = path.join(root, "assets", "script")
        const entry = path.resolve(process.cwd(), "src/assets/script/main.js")
        const outfile = path.join(scriptDir, "main.js")

        await build({
          entryPoints: [entry],
          bundle: true,
          minify: true,
          format: "esm",
          platform: "browser",
          outfile,
          allowOverwrite: true
        })

        if (!fs.existsSync(scriptDir)) return
        for (const name of fs.readdirSync(scriptDir)) {
          if (name !== "main.js" && name.endsWith(".js")) {
            fs.unlinkSync(path.join(scriptDir, name))
          }
        }
      }
    }
  }
}

export default defineConfig({
  output: "static",
  compressHTML: prod,

  integrations: [prodBundleClientScript()],

  build: {
    inlineStylesheets: "never",
    assets: "assets"
  },

  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: "src/assets/script/*.js",
            dest: "assets/script",
            rename: { stripBase: true }
          }
        ]
      })
    ],

    build: {
      minify: prod ? "esbuild" : false,
      cssMinify: prod,
      cssCodeSplit: false,

      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const name = assetInfo.names?.[0] ?? ""
            const ext = name.split(".").pop()?.toLowerCase()

            if (ext === "css") {
              return "assets/style/main.[ext]"
            }

            if (["png", "jpg", "jpeg", "gif", "svg", "webp", "avif", "ico"].includes(ext)) {
              return "assets/images/[name]-[hash][extname]"
            }

            if (["woff", "woff2", "ttf", "eot", "otf"].includes(ext)) {
              return "assets/fonts/[name][extname]"
            }

            if (ext === "js") {
              return "assets/script/[name][extname]"
            }

            return "assets/[name]-[hash][extname]"
          }
        }
      }
    }
  }
})
