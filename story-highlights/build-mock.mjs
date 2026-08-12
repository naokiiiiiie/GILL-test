import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const cov = 'story-root/story-highlights/highlight_covers/png';
const root = '/home/user/GILL-test/story-highlights/highlight_covers/png';
const b64 = k => 'data:image/png;base64,' + fs.readFileSync(path.join(root, k + '.png')).toString('base64');

const HL = [
  { key:'hl-menu',     jp:'メニュー',  en:'MENU',        accent:'#E0A0B4', bg:'#F8EAEC', dark:'#C17E97',
    slides:['表紙 MENU','ラインナップ','看板フレーバー','猫耳をのせて','価格 ¥450/¥550','今月の限定へ→'] },
  { key:'hl-seasonal', jp:'今月の限定', en:'SEASONAL',   accent:'#E4B45C', bg:'#FBF0DA', dark:'#C0944A',
    slides:['表紙 SEASONAL','フレーバー＋素材','旬の素材','提供期間'] },
  { key:'hl-catgoods', jp:'猫雑貨',    en:'CAT GOODS',   accent:'#B4A0D2', bg:'#EEEAF5', dark:'#9484B8',
    slides:['表紙 CAT GOODS','あちこちに猫','探してみて','由来「森の猫」','猫探し×ジェラート'] },
  { key:'hl-access',   jp:'アクセス',  en:'ACCESS',      accent:'#93C09E', bg:'#E6F0E8', dark:'#6FA37E',
    slides:['表紙 ACCESS','店舗情報','目印','駐車場あり','入口→店内','地図 MAP','姉妹店'] },
  { key:'hl-reviews',  jp:'口コミ',    en:'REVIEWS',     accent:'#9DC4D6', bg:'#E5EFF3', dark:'#6F9FB0',
    slides:['表紙 REVIEWS','リポスト'] },
  { key:'hl-info',     jp:'お知らせ',  en:'INFORMATION', accent:'#D2B48E', bg:'#F3EBDD', dark:'#B29B72',
    slides:['表紙 INFO','営業カレンダー','臨時休業','イベント出店'] },
];

const cover = k => b64(k);

const profileCircles = HL.map(h => `
  <div class="pc">
    <div class="pc-ring"><img src="${cover(h.key)}"></div>
    <span>${h.jp}</span>
  </div>`).join('');

const rows = HL.map(h => `
  <div class="row">
    <div class="rlabel">
      <div class="rc"><img src="${cover(h.key)}"></div>
      <div class="rt">
        <b>${h.jp}</b>
        <i>${h.en}</i>
        <em>${h.slides.length}枚</em>
      </div>
    </div>
    <div class="strip">
      ${h.slides.map((s,i)=>`
        <div class="slide" style="--bg:${h.bg};--ac:${h.accent};--dk:${h.dark}">
          <div class="stop ${i===0?'cover':''}">${i===0?'表紙':i+1}</div>
          <div class="sbody">${s.replace(/^表紙\s?/, '')}</div>
        </div>`).join('')}
    </div>
  </div>`).join('');

const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
*{margin:0;padding:0;box-sizing:border-box;-webkit-font-smoothing:antialiased}
body{width:1240px;height:1754px;background:#fff;font-family:'Zen Kaku Gothic New',sans-serif;color:#2E2A27}
.page{width:1240px;height:1754px;padding:64px 68px 54px;display:flex;flex-direction:column;
  background:linear-gradient(180deg,#FAF8F5,#F3EEE6)}
.h1{font-family:'Shippori Mincho',serif;font-weight:600;font-size:40px;letter-spacing:.06em}
.h1 span{color:#8B6A4F}
.sub{margin-top:10px;font-size:19px;color:#6E655D;font-weight:300;letter-spacing:.04em}
.hr{height:1px;background:#E0D8CB;margin:26px 0}

.top{display:flex;gap:44px}
/* phone */
.phone{width:360px;flex:none;border:10px solid #2E2A27;border-radius:44px;overflow:hidden;background:#fff;
  box-shadow:0 26px 50px -28px rgba(60,45,30,.5)}
.notch{height:26px;background:#2E2A27;position:relative}
.notch::after{content:"";position:absolute;top:8px;left:50%;transform:translateX(-50%);width:96px;height:10px;background:#000;border-radius:6px}
.pbody{padding:20px 20px 24px}
.prow1{display:flex;align-items:center;gap:20px}
.avatar{width:74px;height:74px;border-radius:50%;flex:none;padding:2px;background:conic-gradient(from 30deg,#E0A0B4,#E4B45C,#93C09E,#9DC4D6,#B4A0D2,#E0A0B4)}
.avatar div{width:100%;height:100%;border-radius:50%;background:#1A1818;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Shippori Mincho',serif;font-size:26px;letter-spacing:.1em}
.stats{display:flex;gap:16px;font-size:13px;color:#3A3532}
.stats b{display:block;font-size:17px;text-align:center}
.pname{margin-top:12px;font-size:14px;font-weight:500}
.pbio{margin-top:3px;font-size:12px;color:#6E655D;line-height:1.5}
.hlrow{margin-top:16px;display:flex;gap:5px;justify-content:space-between}
.pc{width:47px;text-align:center}
.pc-ring{width:47px;height:47px;border-radius:50%;padding:2px;background:#EDE6DB;border:1px solid #DcD3c6}
.pc-ring img{width:100%;height:100%;border-radius:50%;display:block}
.pc span{display:block;margin-top:5px;font-size:8.5px;color:#3A3532;white-space:nowrap;transform:scale(.9)}
.tabbar{margin-top:16px;border-top:1px solid #eee;display:flex;justify-content:space-around;padding-top:10px;color:#bbb;font-size:15px}

.caption{flex:1;padding-top:6px}
.caption h3{font-family:'Shippori Mincho',serif;font-size:22px;margin-bottom:12px;color:#3A3532}
.caption p{font-size:15px;line-height:1.9;color:#544c45;font-weight:300}
.caption .tags{margin-top:16px;display:flex;flex-wrap:wrap;gap:8px}
.caption .tags span{font-size:12px;color:#8B6A4F;border:1px solid #DcD3c6;border-radius:999px;padding:5px 12px;background:#fff8}
.arrow{margin:14px 0 4px;font-size:13px;color:#8B6A4F;letter-spacing:.1em}

/* highlight rows */
.rows{margin-top:30px;display:flex;flex-direction:column;gap:20px}
.row{display:flex;gap:24px;align-items:center}
.rlabel{width:220px;flex:none;display:flex;align-items:center;gap:16px}
.rc{width:76px;height:76px;border-radius:50%;flex:none;border:1px solid #E0D8CB}
.rc img{width:100%;height:100%;border-radius:50%;display:block}
.rt b{font-family:'Shippori Mincho',serif;font-size:21px;display:block}
.rt i{font-style:normal;font-size:11px;letter-spacing:.2em;color:#8B6A4F;display:block;margin-top:4px}
.rt em{font-style:normal;font-size:11px;color:#9a8f80;display:block;margin-top:6px}
.strip{flex:1;display:flex;gap:11px;overflow:hidden}
.slide{width:66px;flex:none}
.stop{height:17px;border-radius:6px 6px 0 0;background:var(--ac);color:#fff;font-size:10px;display:flex;align-items:center;justify-content:center;font-weight:500}
.stop.cover{background:var(--dk)}
.sbody{height:104px;border:1px solid var(--ac);border-top:none;border-radius:0 0 8px 8px;background:var(--bg);
  font-size:11px;line-height:1.35;color:#4b433c;padding:9px 6px;text-align:center;display:flex;align-items:center;justify-content:center}
.foot{margin-top:auto;padding-top:16px;font-size:12px;color:#9a8f80;display:flex;justify-content:space-between}
</style></head><body>
<div class="page">
  <div class="h1">GiLL｜ハイライト構成 <span>モック</span></div>
  <div class="sub">プロフィールに並ぶ6つのハイライトと、タップした中身（ストーリー）の流れ</div>
  <div class="hr"></div>
  <div class="top">
    <div class="phone">
      <div class="notch"></div>
      <div class="pbody">
        <div class="prow1">
          <div class="avatar"><div>GiLL</div></div>
          <div class="stats">
            <div><b>128</b>投稿</div><div><b>2.4k</b>フォロワー</div><div><b>86</b>フォロー中</div>
          </div>
        </div>
        <div class="pname">GiLL｜八ヶ岳・北杜市のジェラート＆猫雑貨</div>
        <div class="pbio">🐾 猫モチーフのジェラート店／えのき笑店街2階<br>火・水定休 11:00–17:00｜@gill_by_lechatdesbois</div>
        <div class="hlrow">${profileCircles}</div>
        <div class="tabbar">▦　⧉　♡</div>
      </div>
    </div>
    <div class="caption">
      <h3>プロフィール画面での見え方</h3>
      <p>アイコンの丸カバーは<b>各カラーの塗りシルエット</b>で、ひと目で用途が分かります。
      アイコン下の名称（メニュー／今月の限定／猫雑貨／アクセス／口コミ／お知らせ）で導線を整理。</p>
      <div class="arrow">▼ それぞれをタップすると、下の順番でストーリーが流れます</div>
      <div class="tags"><span>資産型＝一度作れば長く使える</span><span>運用型＝月次で差し替え</span><span>スポット型＝随時</span></div>
    </div>
  </div>

  <div class="rows">${rows}</div>

  <div class="foot"><span>各ストーリーは 1080×1920（9:16）／点線枠にジェラート写真を差し込み</span><span>GiLL Instagram 運用設計</span></div>
</div>
</body></html>`;

fs.writeFileSync('/tmp/claude-0/-home-user-GILL-test/535adbf0-eb7a-5103-9f13-26cbd69a455a/scratchpad/mock.html', html);

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const page = await browser.newPage({ viewport:{ width:1240, height:1754 }, deviceScaleFactor:2 });
await page.goto('file:///tmp/claude-0/-home-user-GILL-test/535adbf0-eb7a-5103-9f13-26cbd69a455a/scratchpad/mock.html', { waitUntil:'load' });
await page.evaluate(()=>document.fonts.ready);
await page.waitForTimeout(400);
await page.screenshot({ path:'/tmp/claude-0/-home-user-GILL-test/535adbf0-eb7a-5103-9f13-26cbd69a455a/scratchpad/hl_mock_A4.png' });
await browser.close();
console.log('done');
