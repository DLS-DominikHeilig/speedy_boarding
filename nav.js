/* SpeedyBoarding – gemeinsame Navigationsleiste für Team-Ansicht und Datenstruktur.
   Sprungmarken auf der Seite kommen aus <body data-sections='[["id","Label"], …]'>. */
(() => {
  const path = location.pathname;
  const page = path.endsWith("results.html") ? "results" : path.endsWith("intern.html") ? "intern" : "game";
  const PAGES = [
    ["./#map", "🗺️", "Zur Map", "game"],
    ["intern.html", "🛠️", "Datenstruktur", "intern"],
    ["results.html", "📊", "Team-Ansicht", "results"],
  ];
  let sections = [];
  try { sections = JSON.parse(document.body.dataset.sections || "[]"); } catch {}

  const style = document.createElement("style");
  style.textContent = `
    .sbnav { position: sticky; top: 0; z-index: 30; background: rgba(255,255,255,.92); backdrop-filter: blur(8px); border-bottom: 1px solid #E8E8E8; font-family: Manrope, Arial, sans-serif; }
    .sbnav-in { max-width: 1240px; margin: 0 auto; padding: 10px 16px; display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
    .sbnav-logo { font-weight: 800; letter-spacing: -0.03em; font-size: 1.05rem; text-decoration: none; color: #222; display: flex; align-items: center; gap: 8px; }
    .sbnav-logo b { background: #222; color: #fff; border-radius: 6px; padding: 1px 6px; font-size: .8rem; }
    .sbnav-logo i { font-synthesis: style; letter-spacing: -0.02em; padding-right: .1em; }
    .sbnav-sec { display: flex; gap: 4px; flex-wrap: wrap; flex: 1; }
    .sbnav-sec a { color: #7F7F7F; font-weight: 600; font-size: .86rem; text-decoration: none; padding: 5px 9px; border-radius: 6px; }
    .sbnav-sec a:hover { color: #222; background: #F2F2F2; }
    .sbnav-sec a.on { color: #1B7A6A; background: #E8F5F2; }
    .sbnav-pages { display: flex; gap: 4px; background: #F5F5F5; border-radius: 8px; padding: 3px; }
    .sbnav-pages a { color: #4F4F4F; font-weight: 700; font-size: .84rem; text-decoration: none; padding: 5px 11px; border-radius: 6px; white-space: nowrap; }
    .sbnav-pages a:hover { color: #222; }
    .sbnav-pages a[aria-current] { background: #222; color: #fff; }
    .sbnav .emo { display: inline-block; margin-right: .3em; }
    [id] { scroll-margin-top: 80px; }
    @media (max-width: 760px) { .sbnav-sec { order: 3; flex-basis: 100%; } .sbnav-pages { margin-left: auto; } .sbnav-pages a .lbl { display: none; } .sbnav-pages a .emo { margin: 0; } }
  `;
  document.head.appendChild(style);

  const nav = document.createElement("div");
  nav.className = "sbnav";
  nav.innerHTML = `<div class="sbnav-in">
    <a class="sbnav-logo" href="./#map"><b>DL</b> <i>SpeedyBoarding</i></a>
    <nav class="sbnav-sec" aria-label="Auf dieser Seite">${sections.map(([id, label]) => `<a href="#${id}" data-sec="${id}">${label}</a>`).join("")}</nav>
    <nav class="sbnav-pages" aria-label="Seiten">${PAGES.map(([href, emo, label, key]) =>
      `<a href="${href}"${key === page ? ' aria-current="page"' : ""} title="${label}"><span class="emo">${emo}</span><span class="lbl">${label}</span></a>`).join("")}</nav>
  </div>`;
  document.body.prepend(nav);

  // Aktiven Abschnitt markieren
  const links = [...nav.querySelectorAll("[data-sec]")];
  if (links.length && "IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.filter(e => e.isIntersecting).forEach(e => links.forEach(a => a.classList.toggle("on", a.dataset.sec === e.target.id)));
    }, { rootMargin: "-90px 0px -60% 0px" });
    sections.forEach(([id]) => { const el = document.getElementById(id); if (el) io.observe(el); });
  }
})();
