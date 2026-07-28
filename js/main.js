// SHUKU サイト共通スクリプト
// Apple.com的な「スクロールで少しずつ要素が現れる」演出と、
// ヘッダーの縮小・モバイルナビの開閉のみを行う軽量スクリプト。

document.addEventListener("DOMContentLoaded", () => {
  initHeaderShrink();
  initMobileNav();
  initScrollReveal();
});

// スクロール量に応じてヘッダーの余白を縮める
function initHeaderShrink() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

// モバイル幅でのハンバーガーメニュー開閉
function initMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav-list");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

// IntersectionObserverでビューポートに入った要素に is-visible を付与する。
// prefers-reduced-motion の場合はCSS側で即表示にフォールバックするため、
// ここでは特別な分岐は設けていない。
function initScrollReveal() {
  const targets = document.querySelectorAll(".reveal, .reveal-stagger");
  if (!targets.length) return;

  if (!("IntersectionObserver" in window)) {
    targets.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => observer.observe(el));
}
