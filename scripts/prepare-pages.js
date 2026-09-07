/**
 * prepare-pages.js
 *
 * Post-build script for Cloudflare Pages deployment with @opennextjs/cloudflare.
 *
 * Problem:
 *   OpenNext generates worker.js at .open-next/ with relative imports to:
 *     ./cloudflare/*, ./middleware/*, ./.build/*, ./server-functions/*
 *   These directories are siblings of worker.js at the .open-next/ level.
 *   Static assets are in .open-next/assets/.
 *
 *   Cloudflare Pages expects _worker.js AND static assets in the SAME
 *   pages_build_output_dir. If we use .open-next/assets/ as the output dir,
 *   _worker.js's relative imports break because the runtime dirs aren't there.
 *
 * Solution:
 *   Copy all OpenNext runtime directories INTO .open-next/assets/, then copy
 *   worker.js as _worker.js into .open-next/assets/. This way:
 *   - Static assets (favicon.ico, _next/, etc.) are at the root of the output dir
 *   - _worker.js is at the root of the output dir
 *   - All relative imports from _worker.js resolve to the copied runtime dirs
 */

const fs = require("fs");
const path = require("path");

const OPEN_NEXT_DIR = path.resolve(".open-next");
const ASSETS_DIR = path.join(OPEN_NEXT_DIR, "assets");

// Runtime directories that worker.js imports from (relative paths)
const RUNTIME_DIRS = ["cloudflare", "middleware", ".build", "server-functions"];

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    console.warn(`  SKIP: ${src} does not exist`);
    return;
  }

  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log("Preparing Cloudflare Pages output...\n");

// 1. Copy each runtime directory into the assets dir
for (const dir of RUNTIME_DIRS) {
  const src = path.join(OPEN_NEXT_DIR, dir);
  const dest = path.join(ASSETS_DIR, dir);

  if (fs.existsSync(src)) {
    console.log(`  Copying ${dir}/ -> assets/${dir}/`);
    copyDirRecursive(src, dest);
  } else {
    console.warn(`  WARN: ${dir}/ not found, skipping`);
  }
}

// 2. Copy worker.js as _worker.js into assets
const workerSrc = path.join(OPEN_NEXT_DIR, "worker.js");
const workerDest = path.join(ASSETS_DIR, "_worker.js");
console.log(`  Copying worker.js -> assets/_worker.js`);
fs.copyFileSync(workerSrc, workerDest);

console.log("\n✓ Cloudflare Pages output prepared at .open-next/assets/");
