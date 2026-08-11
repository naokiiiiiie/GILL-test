import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = process.argv[2];
fs.mkdirSync(path.join(outDir,'svg'), { recursive: true });
fs.mkdirSync(path.join(outDir,'png'), { recursive: true });

const FJP = "'Zen Kaku Gothic New','Hiragino Sans','Noto Sans JP',sans-serif";
const FSER = "'Shippori Mincho','Hiragino Mincho ProN',serif";

// ---- simple line icons, drawn around local origin, ~±70 units ----
function icon(name, c){
  const s = `stroke="${c}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  const soft = `fill="${c}" fill-opacity="0.16"`;
  switch(name){
    case 'gelato': return `
      <path d="M-40,-6 Q-36,-58 0,-58 Q36,-58 40,-6 Z" ${soft} ${s}/>
      <path d="M-40,-6 L0,64 L40,-6 Z" ${soft} ${s}/>
      <path d="M-24,-14 Q0,-34 24,-14" ${s} stroke-opacity="0.7"/>
      <circle cx="0" cy="-58" r="6" fill="${c}" fill-opacity="0.5" stroke="none"/>`;
    case 'leaf': return `
      <path d="M2,-56 C40,-44 40,18 2,52 C-36,18 -36,-44 2,-56 Z" ${soft} ${s}/>
      <path d="M2,-52 C2,-16 2,20 2,50" ${s} stroke-opacity="0.7"/>
      <path d="M2,-18 C-14,-22 -24,-32 -28,-44 M2,4 C18,0 28,-10 32,-22" ${s} stroke-opacity="0.5" stroke-width="4.5"/>
      <circle cx="30" cy="-40" r="8" fill="${c}" fill-opacity="0.4" stroke="none"/>`;
    case 'cat': return `
      <path d="M-46,-30 L-30,-58 L-10,-40 Z" ${soft} ${s}/>
      <path d="M46,-30 L30,-58 L10,-40 Z" ${soft} ${s}/>
      <circle cx="0" cy="6" r="46" ${soft} ${s}/>
      <circle cx="-16" cy="0" r="3.5" fill="${c}" stroke="none"/>
      <circle cx="16" cy="0" r="3.5" fill="${c}" stroke="none"/>
      <path d="M0,10 l0,6 M0,16 q-7,7 -14,4 M0,16 q7,7 14,4" ${s} stroke-width="4.5" stroke-opacity="0.8"/>
      <path d="M-52,4 L-30,8 M-52,16 L-30,16 M52,4 L30,8 M52,16 L30,16" ${s} stroke-width="3.5" stroke-opacity="0.4"/>`;
    case 'pin': return `
      <path d="M0,-52 C-26,-52 -38,-32 -38,-12 C-38,16 0,58 0,58 C0,58 38,16 38,-12 C38,-32 26,-52 0,-52 Z" ${soft} ${s}/>
      <circle cx="0" cy="-12" r="13" ${s}/>`;
    case 'chat': return `
      <path d="M-46,-34 L34,-34 Q46,-34 46,-22 L46,14 Q46,26 34,26 L-6,26 L-26,46 L-24,26 L-46,26 Q-46,26 -46,14 Z" transform="translate(0,-2)" ${soft} ${s}/>
      <path d="M0,4 c-6,-10 -20,-6 -20,4 c0,8 12,16 20,22 c8,-6 20,-14 20,-22 c0,-10 -14,-14 -20,-4 Z" fill="${c}" fill-opacity="0.5" stroke="none" transform="translate(0,-10) scale(0.7)"/>`;
    case 'info': return `
      <circle cx="0" cy="0" r="48" ${soft} ${s}/>
      <circle cx="0" cy="-20" r="5" fill="${c}" stroke="none"/>
      <path d="M0,-4 L0,26" ${s}/>`;
  }
  return '';
}

const covers = [
  { key:'hl-menu',     jp:'メニュー',   jpSize:72, en:'MENU',        icon:'gelato', bg:'#F8EAEC', accent:'#E0A0B4', dark:'#C17E97' },
  { key:'hl-seasonal', jp:'今月の限定', jpSize:58, en:'SEASONAL',    icon:'leaf',   bg:'#FBF0DA', accent:'#E4B45C', dark:'#C0944A' },
  { key:'hl-catgoods', jp:'猫雑貨',     jpSize:72, en:'CAT GOODS',   icon:'cat',    bg:'#EEEAF5', accent:'#B4A0D2', dark:'#9484B8' },
  { key:'hl-access',   jp:'アクセス',   jpSize:72, en:'ACCESS',      icon:'pin',    bg:'#E6F0E8', accent:'#93C09E', dark:'#6FA37E' },
  { key:'hl-reviews',  jp:'口コミ',     jpSize:72, en:'REVIEWS',     icon:'chat',   bg:'#E5EFF3', accent:'#9DC4D6', dark:'#6F9FB0' },
  { key:'hl-info',     jp:'お知らせ',   jpSize:64, en:'INFORMATION', icon:'info',   bg:'#F3EBDD', accent:'#D2B48E', dark:'#B29B72' },
];

function svgFor(c){
  const enSize = c.en.length > 8 ? 26 : 32;
  const half = c.en.length > 8 ? 120 : 100;
  return `<svg viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <rect width="1080" height="1080" fill="${c.bg}"/>
  <circle cx="540" cy="540" r="462" fill="none" stroke="${c.accent}" stroke-width="2" stroke-dasharray="9 7" opacity="0.55"/>
  <circle cx="540" cy="540" r="420" fill="none" stroke="${c.accent}" stroke-width="1" opacity="0.35"/>
  <g transform="translate(540,300)">${icon(c.icon, c.accent)}</g>
  <text x="540" y="512" text-anchor="middle" fill="#3A2E2C" font-family="${FSER}" font-weight="600" font-size="${c.jpSize}" letter-spacing="0.08em">${c.jp}</text>
  <text x="540" y="582" text-anchor="middle" fill="${c.dark}" font-family="${FJP}" font-weight="400" font-size="${enSize}" letter-spacing="0.24em">${c.en}</text>
  <line x1="${540-half}" y1="628" x2="${540+half}" y2="628" stroke="${c.accent}" stroke-width="1.5" opacity="0.6"/>
  <text x="540" y="680" text-anchor="middle" fill="#b3a595" font-family="${FSER}" font-weight="500" font-size="26" letter-spacing="0.28em">GiLL</text>
</svg>`;
}

// write svgs
for (const c of covers){
  fs.writeFileSync(path.join(outDir,'svg', c.key + '.svg'), svgFor(c));
}

// render pngs
const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport: { width: 1080, height: 1080 }, deviceScaleFactor: 1 });
for (const c of covers){
  const svg = svgFor(c);
  await page.setContent(`<style>*{margin:0;padding:0}html,body{width:1080px;height:1080px}svg{display:block;width:1080px;height:1080px}</style>${svg}`, { waitUntil:'load' });
  await page.evaluate(()=>document.fonts.ready);
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(outDir,'png', c.key + '.png'), clip:{x:0,y:0,width:1080,height:1080} });
  console.log('rendered', c.key);
}
// contact sheet for quick review
await page.setViewportSize({ width: 1120, height: 760 });
await page.setContent(`<style>*{margin:0}body{background:#cfc9bf;display:grid;grid-template-columns:repeat(3,1fr);gap:16px;padding:20px}
.c{position:relative}.c img{width:100%;border-radius:50%;display:block}</style>
${covers.map(c=>`<div class="c"><img src="data:image/svg+xml;utf8,${encodeURIComponent(svgFor(c))}"></div>`).join('')}`, {waitUntil:'load'});
await page.evaluate(()=>document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(outDir,'contact_sheet.png') });
console.log('contact sheet done');
await browser.close();
