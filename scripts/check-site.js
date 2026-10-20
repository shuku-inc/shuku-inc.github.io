#!/usr/bin/env node
// shuku-site の公開前点検（依存なし）。使い方: node scripts/check-site.js [サイトのフォルダ]
// FAIL: 公開してはいけない記述・壊れたリンクなど（終了コード1）／WARN: 直したほうがよい点
const fs = require("fs");
const path = require("path");

const root = path.resolve(process.argv[2] || path.join(__dirname, "..", "shuku-site"));
let fail = 0,
  warn = 0;
const ng = (m) => {
  fail++;
  console.log("FAIL " + m);
};
const wn = (m) => {
  warn++;
  console.log("WARN " + m);
};
const ok = (m) => console.log("OK   " + m);

if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
  console.log("FAIL サイトのフォルダが見つかりません: " + root);
  process.exit(1);
}

const SKIP = new Set([".git", "node_modules", ".github", ".lighthouseci"]);
let files = [];
// git 管理されているファイルだけを見る（公開されるのはそれだけ。.gitignore のファイルは対象外）
try {
  const out = require("child_process").execFileSync("git", ["-C", root, "ls-files"], {
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  });
  files = out
    .split("\n")
    .filter(Boolean)
    .map((r) => path.join(root, r))
    .filter((p) => fs.existsSync(p));
} catch (e) {
  files = [];
}
if (!files.length)
  (function walk(d) {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (SKIP.has(e.name)) continue;
      const p = path.join(d, e.name);
      e.isDirectory() ? walk(p) : files.push(p);
    }
  })(root);
const rel = (p) => path.relative(root, p).replace(/\\/g, "/");
const TEXT = /\.(html|css|js|json|md|txt|svg|xml|yml|yaml)$/i;
// 点検の道具や設定自体は検査の対象にしない（パターンの文字列が入っているため）
const SELF = /^(scripts\/check-site\.js|\.github\/|package(-lock)?\.json$)/;

// 1. 公開してはいけない内部向けの記述
const SECRET = [
  [/github\.com-shuku-inc/i, "SSH の別名"],
  [/[A-Za-z]:\\Users\\|\/Users\/[a-z]+\//, "PC のフォルダの場所"],
  [/claudecode_ws|ai-instructions/i, "内部のフォルダ名"],
  [/kentaro-sk(?!\.github\.io)/i, "個人アカウント名"], // 公開の個人サイト kentaro-sk.github.io へのリンクは可
  [
    /ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----/,
    "鍵・トークンらしき文字列",
  ],
  [/\.env\b/, ".env への言及"],
];
let leak = 0;
for (const f of files.filter((f) => TEXT.test(f) && !SELF.test(rel(f)))) {
  const t = fs.readFileSync(f, "utf8");
  for (const [re, label] of SECRET)
    if (re.test(t)) {
      ng(`${rel(f)}: ${label}が入っています`);
      leak++;
    }
}
if (!leak) ok("内部向けの記述・鍵らしきものはありません");

// 2. HTML の基本（title / lang / viewport / img の alt）
const htmls = files.filter((f) => /\.html$/i.test(f));
for (const f of htmls) {
  const t = fs.readFileSync(f, "utf8");
  if (!/<title>[^<]+<\/title>/i.test(t)) wn(`${rel(f)}: <title> がありません`);
  if (!/<html[^>]*\slang=/i.test(t)) wn(`${rel(f)}: <html lang> がありません`);
  if (!/<meta[^>]+name=["']viewport["']/i.test(t)) wn(`${rel(f)}: viewport の指定がありません`);
  for (const m of t.matchAll(/<img\b[^>]*>/gi))
    if (!/\salt=/i.test(m[0])) wn(`${rel(f)}: alt のない画像 ${m[0].slice(0, 60)}`);
}

// 3. 内部リンク・画像・css/js の存在
let broken = 0;
for (const f of htmls) {
  const t = fs.readFileSync(f, "utf8");
  for (const m of t.matchAll(/\b(?:href|src)=["']([^"'#?][^"']*)["']/gi)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(u)) continue;
    let target = u.startsWith("/") ? path.join(root, u) : path.resolve(path.dirname(f), u);
    if (u.endsWith("/") || (fs.existsSync(target) && fs.statSync(target).isDirectory()))
      target = path.join(target, "index.html");
    if (!fs.existsSync(target)) {
      ng(`${rel(f)}: リンク切れ ${u}`);
      broken++;
    }
  }
}
if (!broken) ok("内部リンク・画像・CSS/JS の参照先はすべてあります");

// 4. 大きすぎるファイル（GitHub Pages の表示が重くなる）
for (const f of files) {
  const s = fs.statSync(f).size;
  if (s > 2 * 1024 * 1024) wn(`${rel(f)}: ${(s / 1048576).toFixed(1)}MB（2MB 超。圧縮を検討）`);
}

console.log("---");
console.log(fail ? `問題あり（FAIL ${fail} 件、WARN ${warn} 件）` : `問題なし（WARN ${warn} 件）`);
process.exit(fail ? 1 : 0);
