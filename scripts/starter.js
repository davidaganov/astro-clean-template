import fs from "node:fs/promises"
import path from "node:path"
import readline from "node:readline"

const args = process.argv.slice(2)
const action = args[0]

const srcPath = path.resolve(process.cwd(), "src")
const starterDir = path.resolve(process.cwd(), "starter")
const cleanPath = path.join(starterDir, "clean")
const templateBackupPath = path.join(starterDir, "template")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const question = (query) => new Promise((resolve) => rl.question(query, resolve))

async function copyDir(src, dest) {
  await fs.mkdir(dest, { recursive: true })
  const entries = await fs.readdir(src, { withFileTypes: true })

  for (let entry of entries) {
    const srcEntryPath = path.join(src, entry.name)
    const destEntryPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      await copyDir(srcEntryPath, destEntryPath)
    } else {
      await fs.copyFile(srcEntryPath, destEntryPath)
    }
  }
}

async function runSwitch(type) {
  const isClean = type === "clean"
  const sourcePath = isClean ? cleanPath : templateBackupPath
  const name = isClean ? "minimal template" : "full demo template"

  try {
    await fs.access(sourcePath)
  } catch (_e) {
    console.error(`❌ Error: Source folder not found at ${sourcePath}`)
    process.exit(1)
  }

  const answer = await question(
    `🚨 WARNING: This will DESTROY all current files in src/ and switch to the ${name}. Are you sure? (y/N): `
  )

  if (answer.toLowerCase() !== "y") {
    console.log("Aborted.")
    process.exit(0)
  }

  console.log(`🗑️ Deleting current src/...`)
  await fs.rm(srcPath, { recursive: true, force: true })

  console.log(`✨ Copying from ${isClean ? "starter/clean/" : "starter/template/"} to src/...`)
  await copyDir(sourcePath, srcPath)

  console.log(`\n✅ Success! The ${name} has been loaded into src/`)
  process.exit(0)
}

if (action === "clean" || action === "restore") {
  runSwitch(action).catch(console.error)
} else {
  console.log("Usage: node scripts/starter.js [clean|restore]")
  process.exit(1)
}
