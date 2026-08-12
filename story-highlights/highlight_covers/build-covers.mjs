import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = process.argv[2];
fs.mkdirSync(path.join(outDir,'svg'), { recursive: true });
fs.mkdirSync(path.join(outDir,'png'), { recursive: true });

const FJP = "'Zen Kaku Gothic New','Hiragino Sans','Noto Sans JP',sans-serif";
const FSER = "'Shippori Mincho','Hiragino Mincho ProN',serif";

// ---- simple line icons, drawn around local origin, ~±70 units ----
function icon(name, c, bg){
  // solid silhouette style (like a painted shop sign); tone-on-tone with bg.
  const f = `fill="${c}" stroke="none"`;
  const cut = `fill="${bg}" stroke="none"`; // knockouts painted in the background color
  switch(name){
    case 'gelato': return `
      <path d="M-30,-58 a30,30 0 0 1 60,0 Z" ${f}/>
      <path d="M-33,-52 a33,20 0 0 0 66,0 Z" ${f}/>
      <path d="M-33,-40 L0,66 L33,-40 Z" ${f}/>
      <path d="M-20,-33 L0,52 L20,-33 Z" ${cut} opacity="0.35"/>
      <circle cx="0" cy="-62" r="8" ${f}/>`;
    case 'leaf': return `
      <path d="M4,-58 C42,-42 42,22 4,56 C-34,22 -34,-42 4,-58 Z" ${f}/>
      <path d="M4,-50 C4,-14 4,24 4,52" stroke="${bg}" stroke-width="4" fill="none" stroke-linecap="round" opacity="0.5"/>
      <path d="M4,-20 C-10,-24 -20,-34 -24,-46 M4,2 C16,-2 26,-12 30,-24" stroke="${bg}" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.5"/>`;
    case 'cat': return `
      <path d="M-34,60 C-44,16 -30,-4 0,-4 C30,-4 44,16 34,60 Z" ${f}/>
      <circle cx="0" cy="-26" r="30" ${f}/>
      <path d="M-30,-44 L-14,-62 L-6,-38 Z" ${f}/>
      <path d="M30,-44 L14,-62 L6,-38 Z" ${f}/>
      <path d="M30,58 C58,52 60,16 42,10 C52,26 44,44 24,48 Z" ${f}/>
      <circle cx="-12" cy="-28" r="3.4" ${cut}/>
      <circle cx="12" cy="-28" r="3.4" ${cut}/>
      <path d="M-3,-18 h6 l-3,5 Z" ${cut}/>`;
    case 'pin': return `
      <path d="M0,-54 C-27,-54 -40,-33 -40,-12 C-40,17 0,60 0,60 C0,60 40,17 40,-12 C40,-33 27,-54 0,-54 Z" ${f}/>
      <circle cx="0" cy="-14" r="13" ${cut}/>`;
    case 'chat': return `
      <path d="M-46,-36 L34,-36 Q48,-36 48,-22 L48,12 Q48,26 34,26 L-4,26 L-26,46 L-23,26 L-46,26 Q-46,26 -46,12 Z" ${f} transform="translate(0,-2)"/>
      <circle cx="-18" cy="-6" r="5" ${cut}/>
      <circle cx="0" cy="-6" r="5" ${cut}/>
      <circle cx="18" cy="-6" r="5" ${cut}/>`;
    case 'info': return `
      <circle cx="0" cy="2" r="50" ${f}/>
      <circle cx="0" cy="-20" r="6" ${cut}/>
      <rect x="-5" y="-6" width="10" height="34" rx="5" ${cut}/>`;
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
  <g transform="translate(540,300)">${icon(c.icon, c.accent, c.bg)}</g>
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
