// Small helpers + global selectors
window.$ = (s) => document.querySelector(s);
window.$$ = (s) => Array.from(document.querySelectorAll(s));
window.toast = (msg) => alert(msg);
window.fmt = (n) => (n || 0).toLocaleString("vi-VN") + "₫";

// Countdown (h: number)
window.startTimer = function (el, hours = 3) {
  const end = Date.now() + hours * 3600 * 1000;
  const tick = () => {
    const t = Math.max(0, end - Date.now());
    const h = Math.floor(t / 3600000);
    const m = Math.floor((t % 3600000) / 60000);
    const s = Math.floor((t % 60000) / 1000);
    el.textContent = [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
    if (t <= 0) clearInterval(iv);
  };
  tick();
  const iv = setInterval(tick, 1000);
};

// Simple carousel for hero
window.initHero = function () {
  const hero = $("#hero");
  const imgs = $$("#hero img");
  const dots = $("#heroDots");
  if (!hero || imgs.length === 0) return;
  dots.innerHTML = imgs.map((_, i) => `<div class="dot ${i ? "" : "active"}"></div>`).join("");
  let idx = 0;
  setInterval(() => {
    imgs.forEach((im, i) => im.classList.toggle("hide", i !== idx));
    $$("#heroDots .dot").forEach((d, i) => d.classList.toggle("active", i === idx));
    idx = (idx + 1) % imgs.length;
  }, 3000);
};
