#!/usr/bin/env node
// Manual, local-only tool: (re)captures a project's thumbnail at a fixed
// viewport so aspect ratio stays consistent across the catalog. Not run in CI.
//
// Usage:
//   node scripts/screenshot.mjs <project-folder> <url> [--hero]
//
// Example:
//   node scripts/screenshot.mjs 08-stringweave https://stringweave.crubio.fyi --hero

import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const [folder, url, flag] = process.argv.slice(2);

if (!folder || !url) {
  console.error('Usage: node scripts/screenshot.mjs <project-folder> <url> [--hero]');
  process.exit(1);
}

const isHero = flag === '--hero';
// 4/3 for a regular card, 16/11 for the current featured/hero card.
const viewport = isHero ? { width: 1600, height: 1100 } : { width: 1200, height: 900 };

const root = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(root, '..', 'src', 'content', 'projects', folder);
const outFile = path.join(outDir, 'thumbnail.png');

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport });
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: outFile });
await browser.close();

console.log(`Saved ${outFile} (${viewport.width}x${viewport.height})`);
