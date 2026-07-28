# CLAUDE.md — shuku-site プロジェクト設定

このファイルは `shuku-site/` フォルダ内で作業する際の固有ルールを定義する。
ワークスペース共通ルール（`claudecode_ws/CLAUDE.md`）と併せて適用される。

---

## 1. プロジェクト概要

- **目的**: 「SHUKU」の組織ホームページ（GitHub Pages）。`kids-copilot-event/` で企画している
  イベントの詳細ページも、このサイトの1ページ（`/event/`）として掲載する。
- **企画の詳細・意思決定の経緯**: `../kids-copilot-event/docs/` にまとまっている
  （特に [website-sitemap.md](../kids-copilot-event/docs/website-sitemap.md) がこのサイトの
  構成案そのもの）。内容面の相談・変更はそちらのドキュメントも参照しながら進める。
- **ホスティング**: kentaro-sk（個人アカウント）とは別の **GitHub Organization「SHUKU」**
  配下にリポジトリを作り、GitHub Pagesで公開する想定（`SHUKU.github.io`）。

## 2. 技術構成

- ビルド不要の素の **HTML5 / CSS3 / JavaScript** によるマルチページ構成（`portfolio/` と同じ方針）。
- デザインは `kids-copilot-event/.claude/skills/shuku-design-system/` の
  「SHUKU Design System v1.0」に100%準拠する（カラー・レイアウト・タイポグラフィ・禁止事項）。
- UI実装なので `uiux-standards` スキル（アクセシビリティ・レスポンシブ対応）も必ず適用する。

## 3. アセット

- `assets/logo/shuku-logo.png` — SHUKUロゴ（`kids-copilot-event/logo/` からコピー、AIによる
  再生成・改変は禁止）
- `assets/images/founder.jpg` — 組織責任者 杉浦健太郎の実写真（`portfolio/fig/me.jpg` から
  コピー。AI生成画像ではなく本人の実写真を使う方針）
