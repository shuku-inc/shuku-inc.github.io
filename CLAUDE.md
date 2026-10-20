# CLAUDE.md — shuku-site プロジェクト設定

このファイルは `shuku-site/` フォルダ内で作業する際の固有ルールを定義する。
作業環境の共通ルールと併せて適用される。

---

## 1. プロジェクト概要

- **目的**: 「SHUKU」の組織ホームページ（GitHub Pages）。企画中の
  イベントの詳細ページも、このサイトの1ページ（`/event/`）として掲載する。
- **企画の詳細**: 内部の企画資料（非公開）にまとまっている。内容面の相談・変更はそちらも参照する。
- **ホスティング**: `shuku-inc` 組織の `shuku-inc.github.io` リポジトリで公開する
  （公開URL: `https://shuku-inc.github.io`）。

## 2. 技術構成

- ビルド不要の素の **HTML5 / CSS3 / JavaScript** によるマルチページ構成（`portfolio/` と同じ方針）。
- デザインは「SHUKU Design System v1.0」に100%準拠する（カラー・レイアウト・タイポグラフィ・禁止事項）。
- UI実装なので `uiux-standards` スキル（アクセシビリティ・レスポンシブ対応）も必ず適用する。

## 3. アセット

- `assets/logo/shuku-logo.png` — SHUKUロゴ（AIによる再生成・改変は禁止）
- `assets/images/founder.jpg` — 組織責任者の実写真（AI生成画像ではなく本人の実写真を使う方針）
