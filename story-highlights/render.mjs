import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const dir = '/tmp/claude-0/-home-user-GILL-test/535adbf0-eb7a-5103-9f13-26cbd69a455a/scratchpad';
const outDir = process.argv[2] || path.join(dir, 'out');
const scale = Number(process.argv[3] || 1);
fs.mkdirSync(outDir, { recursive: true });

const names = ['01_shironeko','02_kuroneko','03_mikeneko','04_choco','05_matcha','06_mango-framboise','07_cheese'];

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 2000 }, deviceScaleFactor: scale });
await page.goto('file://' + path.join(dir, 'stories.html'), { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);

const stories = await page.$$('.story');
console.log('found', stories.length, 'stories @', scale + 'x');
for (let i = 0; i < stories.length; i++) {
  const file = path.join(outDir, `gill_story_${names[i]}.png`);
  await stories[i].screenshot({ path: file });
  console.log('saved', file);
}
await browser.close();
