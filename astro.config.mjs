import { defineConfig, fontProviders } from "astro/config"

export default defineConfig({
  output: "static",
  compressHTML: false,

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Roboto",
        cssVariable: "--font-roboto"
      }
    ]
  },

  build: {
    inlineStylesheets: `never`,
    assets: "assets"
  },

  vite: {
    build: {
      minify: false,
      rollupOptions: {
        output: {
          assetFileNames: `assets/style/main.[ext]`
        }
      }
    }
  }
})
