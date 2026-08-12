# GiLL ストーリー／ハイライト画像テンプレート

Instagram のストーリー／ハイライトで、GiLL のジェラートフレーバーや店舗情報を
紹介するための背景テンプレート画像です。**ジェラートの写真はあとから差し込む**前提で、
それ以外のデザイン（見出し・説明文・写真枠・装飾）を作り込んでいます。

- サイズ: **1080 × 1920 px**（ストーリー規格 9:16）
- テイスト: GiLL のサイトに合わせた和モダン（温かいオフホワイト＋木目、明朝体 Shippori Mincho）
- 写真枠は**シンプルな円形**。背景の装飾は猫モチーフではなく、**フルーツ・花のライン装飾**を各フレーバーに合わせて控えめに配置
- 写真枠に撮影したジェラート写真を重ねるだけで完成します

## 収録スライド（全10枚）

### フレーバー紹介（7枚）
| ファイル | フレーバー | ジェラート枠 |
|----------|-----------|:---:|
| `images/gill_story_01_shironeko.png` | 白猫さん（八ヶ岳ミルク） | 1個 |
| `images/gill_story_02_kuroneko.png` | 黒猫さん（黒ごま） | 1個 |
| `images/gill_story_03_mikeneko.png` | 三毛猫さん（ミルク・豆乳・きな粉・黒蜜） | 1個 |
| `images/gill_story_04_choco.png` | ちょこさん（イタリア産チョコ） | 1個 |
| `images/gill_story_05_matcha.png` | 抹茶 | 1個 |
| `images/gill_story_06_mango-framboise.png` | マンゴー＆フランボワーズ | 2個 |
| `images/gill_story_07_cheese.png` | チーズ | 1個 |

### テンプレート・その他（3枚）
| ファイル | 用途 |
|----------|------|
| `images/gill_story_template_blank.png` | **汎用テンプレート**。新フレーバーが増えたとき用。フレーバー名・説明・タグを差し替えて使用 |
| `images/gill_story_template_seasonal.png` | **季節限定フレーバー用**テンプレート。「季節限定」表示入り |
| `images/gill_story_access_map.png` | **アクセスマップ**。地図枠にGoogleマップのスクショを配置。住所・営業時間・定休日・駐車場入り |

## 使い方

### ジェラート写真の差し込み（フレーバー／テンプレート）
1. Instagram のストーリー編集、または Canva などで背景画像を配置
2. 撮影したジェラート写真を、円形の写真枠に合わせて丸く切り抜いて重ねる
3. 「ジェラート写真 / Gelato photo」のガイド文字が隠れる位置に置けば完成

### アクセスマップの地図
- 「ここに地図」の枠に、Google マップのスクリーンショットを配置してください

## デザインの再編集・再書き出し

デザインは `stories.html` 1枚で管理しています。フレーバー名・説明文・色・モチーフは
ファイル内の `flavors` 配列（およびテンプレートの `templateBlank` / `templateSeasonal`）を
編集するだけで変更できます。背景モチーフは `flower / blossom / clover / tea / cacao /
mango / berry / mangoBerry / mountain` から選べます。

再書き出し（要 Node.js + Playwright + Chromium、フォントは Shippori Mincho / Zen Kaku Gothic New）:

```bash
node render.mjs ./images 1   # 第2引数を 2 にすると 2160x3840 の高解像度で書き出し
```
