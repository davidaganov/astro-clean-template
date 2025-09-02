import { defineConfig } from "astro/config"
import { viteStaticCopy } from "vite-plugin-static-copy"

export default defineConfig({
  output: "static",
  compressHTML: false,

  build: {
    inlineStylesheets: `never`,
    assets: "assets"
  },

  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: "src/assets/script/*",
            dest: "assets/script"
          }
        ]
      })
    ],

    build: {
      minify: false,
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
