import fs from "node:fs/promises"
import path from "node:path"
import readline from "node:readline"

const args = process.argv.slice(2)
const action = args[0] // "clean" | "template" | "empty"

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
  let sourcePath = null
  let name = ""

  if (type === "clean") {
    sourcePath = cleanPath
    name = "minimal template"
  } else if (type === "template") {
    sourcePath = templateBackupPath
    name = "full demo template"
  } else if (type === "empty") {
    name = "completely empty src directory"
  }

  if (sourcePath) {
    try {
      await fs.access(sourcePath)
    } catch (_e) {
      console.error(`❌ Error: Source folder not found at ${sourcePath}`)
      process.exit(1)
    }
  }

  const answer = await question(
    `🚨 WARNING: This will DESTROY all current files in src/ and switch to a ${name}. Are you sure? (y/N): `
  )

  if (answer.toLowerCase() !== "y") {
    console.log("Aborted.")
    process.exit(0)
  }

  console.log(`🗑️ Deleting current src/...`)
  try {
    await fs.rm(srcPath, { recursive: true, force: true, maxRetries: 3, retryDelay: 500 })
  } catch (err) {
    if (err.code === "EBUSY" || err.code === "EPERM") {
      console.error(`\n❌ Error: The src/ folder is locked by another process (EBUSY).`)
      console.error(
        `Please stop your dev server (Ctrl+C in terminal) and close open files from src/ before switching templates.\n`
      )
      process.exit(1)
    }
    throw err
  }

  if (sourcePath) {
    console.log(`✨ Copying from starter/${type}/ to src/...`)
    await copyDir(sourcePath, srcPath)
  } else {
    console.log(`✨ Creating an empty src/ directory...`)
    await fs.mkdir(srcPath, { recursive: true })
  }

  console.log(`\n✅ Success! The ${name} has been loaded into src/`)
  process.exit(0)
}

if (["clean", "template", "empty"].includes(action)) {
  runSwitch(action).catch(console.error)
} else {
  console.log("Usage: node scripts/starter.js [clean|template|empty]")
  process.exit(1)
}
