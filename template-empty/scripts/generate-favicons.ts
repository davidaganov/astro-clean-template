import { favicons } from "favicons"
import fs from "node:fs/promises"
import path from "node:path"

interface ManifestIcon {
  src: string
  sizes: string
  types?: string
}

interface Manifest {
  icons: ManifestIcon[]
  [key: string]: unknown
}

const source = "public/favicon.src.png"
const dest = "public/favicons"

const configuration = {
  path: "/favicons/",
  appName: "Astro Clean Template",
  appShortName: "AstroClean",
  appDescription: "A clean starter for Astro projects.",
  background: "#ffffff",
  theme_color: "#ffffff",
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: false,
    favicons: true,
    windows: true,
    yandex: false
  }
}

async function generate(): Promise<void> {
  try {
    console.log(`Generating favicons from ${source}...`)

    await fs.mkdir(dest, { recursive: true })

    try {
      await fs.access(source)
    } catch (e) {
      console.error(
        `Error: Source file ${source} not found. Please place your master icon there.`,
        e
      )
      return
    }

    const response = await favicons(source, configuration)

    const KEEP_IMAGES = [
      "favicon.ico",
      "favicon-16x16.png",
      "favicon-32x32.png",
      "apple-touch-icon.png",
      "android-chrome-192x192.png",
      "android-chrome-512x512.png"
    ]

    for (const image of response.images) {
      if (KEEP_IMAGES.includes(image.name)) {
        await fs.writeFile(path.join(dest, image.name), image.contents)
        console.log(`Generated: ${image.name}`)
      }
    }

    for (const file of response.files) {
      let fileName = file.name
      if (fileName === "manifest.webmanifest") fileName = "site.webmanifest"

      if (fileName === "site.webmanifest") {
        const manifest = JSON.parse(file.contents.toString()) as Manifest
        manifest.icons = manifest.icons.filter((icon) =>
          ["192x192", "512x512"].includes(icon.sizes)
        )
        await fs.writeFile(path.join(dest, fileName), JSON.stringify(manifest, null, 2))
        console.log(`Generated: ${fileName} (filtered)`)
      } else if (fileName === "browserconfig.xml") {
        continue
      } else {
        await fs.writeFile(path.join(dest, fileName), file.contents)
        console.log(`Generated: ${fileName}`)
      }
    }

    console.log("Favicons generated successfully! (Optimized set)")
  } catch (error) {
    console.error("Error generating favicons:", error)
  }
}

void generate()
