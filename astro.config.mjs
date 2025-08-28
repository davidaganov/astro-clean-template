import { defineConfig } from "astro/config"

export default defineConfig({
  output: "static",
  compressHTML: false,

  build: {
    inlineStylesheets: `never`,
    assets: "assets"
  },

  vite: {
    build: {
      minify: false,
      rollupOptions: {
        output: {
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.fileName || assetInfo.names?.[0] || "asset"

            if (/\.(woff2?|ttf|eot)$/.test(fileName)) {
              return `assets/resources/fonts/[name].[ext]`
            }

            if (fileName.endsWith(".css")) {
              return `assets/style/main.[ext]`
            }

            return `assets/[name].[ext]`
          }
        }
      }
    }
  }
})
