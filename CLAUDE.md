# CLAUDE.md — shuku-site プロジェクト設定

このファイルは `shuku-site/` フォルダ内で作業する際の固有ルールを定義する。
ワークスペース共通ルール（`claudecode_ws/CLAUDE.md`）、およびSHUKU全体共通ルール
（`ws/SHUKU/CLAUDE.md`。教育コンテンツのファクトチェックを行う `education-content-evaluator`
サブエージェント等）と併せて適用される。

---

## 1. プロジェクト概要

- **目的**: 「SHUKU」の組織ホームページ（GitHub Pages）。`kids-ai-workshop/` で企画している
  イベントの詳細ページも、このサイトの1ページ（`/event/`）として掲載する。
- **フォルダの場所**: `ws/SHUKU/shuku-site/`（2026-07-31 に `ws/宿/` から `ws/SHUKU/` へ改名済み）。
- **企画の詳細・意思決定の経緯**: `../kids-ai-workshop/docs/` にまとまっている
  （特に [website-sitemap.md](../kids-ai-workshop/docs/website-sitemap.md) がこのサイトの
  構成案そのもの）。内容面の相談・変更はそちらのドキュメントも参照しながら進める。
- **ホスティング**: kentaro-sk（個人アカウント）とは別の **`shuku-inc` アカウント**配下の
  `shuku-inc.github.io` リポジトリで公開する（公開URL: `https://shuku-inc.github.io`）。
- **git remote**: SSHのHostエイリアスを使う。
  `git@github.com-shuku-inc:shuku-inc/shuku-inc.github.io.git`
  （`~/.ssh/config` に `github.com-shuku-inc` を定義済み。kentaro-sk側の別リポジトリを
  操作する場合は `git@github.com-kentaro-sk:...` を使う）。

## 2. 技術構成

- ビルド不要の素の **HTML5 / CSS3 / JavaScript** によるマルチページ構成（`portfolio/` と同じ方針）。
- デザインは `kids-ai-workshop/.claude/skills/shuku-design-system/` の
  「SHUKU Design System v1.0」に100%準拠する（カラー・レイアウト・タイポグラフィ・禁止事項）。
- UI実装なので `uiux-standards` スキル（アクセシビリティ・レスポンシブ対応）も必ず適用する。

## 3. アセット

- `assets/logo/shuku-logo.png` — SHUKUロゴ（`kids-ai-workshop/logo/` からコピー、AIによる
  再生成・改変は禁止）
- `assets/images/founder.jpg` — 組織責任者 杉浦健太郎の実写真（`ws/personal/portfolio/fig/me.jpg`
  からコピー。AI生成画像ではなく本人の実写真を使う方針）
