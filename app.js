/* =========================================================
   SpeedyBoarding – Konfiguration
   Punkte, Aufgaben und Texte hier anpassen.
   ========================================================= */
const ICON_CDN = SB.ICON_CDN;

/* Kurskalender: vor Kursstart die echte URL der Kohorte eintragen */
const CALENDAR_URL = "https://pm.digitale-leute.de/batch-XX-26/calendar/online-sessions";
const CALENDAR_IS_PLACEHOLDER = true;

const TASKS = [
  {
    id: "gear", name: "Ausrüstungs-Check", custom: "gear",
    teaser: "Hardware & Arbeitsplatz",
    why: "Damit du erfolgreich an den Online-Sessions teilnehmen kannst, sammle deine Ausrüstung ein. <strong>Must-haves</strong> brauchst du, <strong>Bonus-Items</strong> machen es angenehmer.",
  },
  {
    id: "rules", name: "Spielregeln", custom: "rules",
    teaser: "So arbeiten wir zusammen",
    why: "Damit das Bootcamp für alle produktiv, inspirierend und lebendig wird, braucht es Engagement, Offenheit und gegenseitige Unterstützung. Deck alle Karten auf.",
  },
  {
    id: "calendar", name: "Kalender", custom: "calendar",
    teaser: "Alle Sessions automatisch",
    why: "Abonniere den Bootcamp-Kalender: Alle Sessions erscheinen automatisch in deiner Kalender-App und bleiben immer aktuell.",
  },
  {
    id: "google", name: "Google", icon: "google", color: "var(--blue)",
    teaser: "Classroom, Kalender, Docs & Forms",
    why: "Wir organisieren das Bootcamp in Google: Kurse in Classroom, Termine im Kalender, Unterlagen in Docs. Dafür brauchst du ein Google-Konto – <strong>Gmail ist aber nicht nötig.</strong>",
    google: true,
    emailLabel: "E-Mail-Adresse deines Google-Kontos",
  },
  {
    id: "slack", name: "Slack", icon: "slack", color: "var(--yellow)",
    teaser: "Unser Chat für alles",
    video: { url: "https://www.youtube.com/watch?v=0DA2PUpKRec", label: "Slack als Kommunikationstool", lang: "Deutsch" },
    why: "In Slack läuft die Kommunikation im Bootcamp: Ankündigungen, Fragen, Austausch mit deiner Kohorte.",
    steps: [
      "Gib unten die E-Mail-Adresse an, mit der du Slack nutzen willst. Hast du schon einen Slack-Account, nimm dessen Adresse.",
      "Du bekommst von uns eine <strong>Einladung</strong> an diese Adresse. Link öffnen und beitreten.",
      "Empfohlen: die <a href=\"https://slack.com/downloads\" target=\"_blank\" rel=\"noopener\">Slack-App</a> für deinen Rechner installieren.",
    ],
  },
  {
    id: "miro", name: "Miro", icon: "miro", color: "var(--yellow)",
    teaser: "Whiteboard für Workshops",
    video: { url: "https://www.youtube.com/watch?v=7L1-0DOGHDY", label: "Einführung in Miro", lang: "Englisch" },
    why: "Auf Miro-Boards arbeiten wir gemeinsam in Workshops: Brainstorming, User Journeys, Priorisierung.",
    steps: [
      "Auf <a href=\"https://miro.com/signup/\" target=\"_blank\" rel=\"noopener\">miro.com</a> einen kostenlosen Account anlegen – oder deinen bestehenden nutzen.",
      "Die E-Mail-Adresse deines Miro-Accounts unten eintragen. An diese Adresse laden wir dich zu den Kurs-Boards ein.",
    ],
  },
  {
    id: "figma", name: "Figma", icon: "figma", color: "var(--red)",
    teaser: "Designs & Prototypen",
    video: { url: "https://www.youtube.com/watch?v=zzhSFobLkYw&list=PLXDU_eVOJTx5IuSrbtanZHnDuPB3Hx0hq", label: "Figma für Beginner (Playlist)", lang: "Deutsch" },
    why: "In Figma schaust du dir Designs an, kommentierst sie und baust eigene Klick-Prototypen.",
    steps: [
      "Auf <a href=\"https://www.figma.com/signup\" target=\"_blank\" rel=\"noopener\">figma.com</a> einen kostenlosen Account anlegen – oder deinen bestehenden nutzen.",
      "Die E-Mail-Adresse deines Figma-Accounts unten eintragen.",
      "Optional: die <a href=\"https://www.figma.com/downloads/\" target=\"_blank\" rel=\"noopener\">Figma-Desktop-App</a> installieren. Im Browser geht's aber auch.",
    ],
  },
  {
    id: "jira", name: "Jira", icon: "jira", color: "var(--blue)",
    teaser: "Backlog & Tickets",
    why: "In Jira lernst du, wie Produktteams Backlogs, Stories und Sprints organisieren.",
    steps: [
      "Gib unten die E-Mail-Adresse an, mit der du Jira nutzen willst. Hast du schon einen Atlassian-Account, nimm dessen Adresse.",
      "Du bekommst von uns eine <strong>Einladung</strong>. Beim Annehmen legst du einen Atlassian-Account an, falls du noch keinen hast.",
    ],
  },
  {
    id: "claude", name: "Claude", icon: "claude", color: "var(--petrol)",
    teaser: "Dein KI-Teamkollege",
    why: "Mit Claude schreibst, recherchierst und baust du – und Claude hilft dir auch, wenn beim Setup mal etwas hakt.",
    steps: [
      "Auf <a href=\"https://claude.ai\" target=\"_blank\" rel=\"noopener\">claude.ai</a> einen Account anlegen – oder deinen bestehenden nutzen.",
      "Die <a href=\"https://claude.ai/download\" target=\"_blank\" rel=\"noopener\">Claude-App</a> für deinen Rechner installieren und anmelden.",
      "Die E-Mail-Adresse deines Claude-Accounts unten eintragen.",
    ],
  },
  {
    id: "chatgpt", name: "ChatGPT", icon: "openai", color: "var(--petrol)",
    teaser: "Zweite KI-Perspektive",
    why: "Im Bootcamp vergleichen wir verschiedene KI-Tools. ChatGPT gehört dazu.",
    steps: [
      "Auf <a href=\"https://chatgpt.com\" target=\"_blank\" rel=\"noopener\">chatgpt.com</a> einen Account anlegen – oder deinen bestehenden nutzen.",
      "Die E-Mail-Adresse deines ChatGPT-Accounts unten eintragen.",
    ],
  },
];

const BOSS = SB.BOSS;


// Punkte kommen aus schema.js (einzige Quelle)
TASKS.forEach(t => { const d = SB.TASKS.find(x => x.id === t.id); Object.assign(t, { points: d.points, world: d.world, emoji: d.emoji, noEmail: !!d.noEmail }); });
const MAX = SB.MAX;

/* ---------- Pixel-Sprites (eigene Figuren) ---------- */
const PAL = { k: "#222222", w: "#FFFFFF", s: "#F2C6A0", h: "#5A3A22", t: "#02F3DA", p: "#1B7A6A", y: "#F5C451", r: "#F2284B", d: "#B5122F", b: "#6B9EF7", g: "#9A9A9A", l: "#DADADA" };
const SPRITES = {
  hero: [
    "....hhhh....",
    "...hhhhhh...",
    "...hsssss...",
    "...skssks...",
    "...ssssss...",
    "....ssss....",
    "..tttttttt..",
    ".ttttttttttt",
    ".sttggggtts.",
    "..ttglllgt..",
    "...tggggg...",
    "...kk..kk...",
    "...kk..kk...",
    "..kkk..kkk..",
  ],
  boss: [
    "....rrrrrrrr....",
    "..rrrrrrrrrrrr..",
    ".rrrrrrrrrrrrrr.",
    ".rrrrrrrrrrrrrr.",
    "rrrwwwrrrrwwwrrr",
    "rrrwkkrrrrwkkrrr",
    "rrrwkkrrrrwkkrrr",
    "rrrrrrrrrrrrrrrr",
    ".rrrkwkwkwkwrrr.",
    ".rrrkkkkkkkkrrr.",
    "..rrrrrrrrrrrr..",
    ".rr.rr.rr.rr.rr.",
    "rd..rd.rd.dr..dr",
    "d...d..d...d...d",
  ],
  bossDown: [
    "................",
    "................",
    "....gggggggg....",
    "..gggggggggggg..",
    ".gggkgkggkgkggg.",
    ".ggggkggggkgggg.",
    ".gggkgkggkgkggg.",
    "gggggggggggggggg",
    "gggggggggggggggg",
    ".gggkkkkkkkkggg.",
    "..gggggggggggg..",
    ".gg.gg.gg.gg.gg.",
    "gg..gg.gg.gg..gg",
    "................",
  ],
  coin: [
    "..yyyy..",
    ".yywwyy.",
    "yyywyyyy",
    "yyywyyyy",
    "yyywyyyy",
    "yyyyyyyy",
    ".yyyyyy.",
    "..yyyy..",
  ],
  flag: [
    "kpppp...",
    "kpppppp.",
    "kpppppp.",
    "kppp....",
    "k.......",
    "k.......",
    "k.......",
    "kk......",
  ],
  trophy: [
    "..yyyyyyyy..",
    "yyyyyyyyyyyy",
    "y.yyyywyyy.y",
    "y.yyyywyyy.y",
    ".yyyyywyyyy.",
    "..yyyyyyyy..",
    "...yyyyyy...",
    ".....yy.....",
    ".....yy.....",
    "....pppp....",
    "...pppppp...",
    "..kkkkkkkk..",
  ],
};
/* ---------- Animation: Blinzeln & Umschauen ---------- */
const ANIM = {
  hero: { row: 3, gazes: ["c", "l", "r"], frames: {
    c: ["...skssks..."], l: ["...ksskss..."], r: ["...sskssk..."], b: ["...ssssss..."] } },
  boss: { row: 4, gazes: ["r", "l"], frames: {
    r: ["rrrwwwrrrrwwwrrr", "rrrwkkrrrrwkkrrr", "rrrwkkrrrrwkkrrr"],
    l: ["rrrwwwrrrrwwwrrr", "rrrkkwrrrrkkwrrr", "rrrkkwrrrrkkwrrr"],
    b: ["rrrrrrrrrrrrrrrr", "rrrkkkrrrrkkkrrr", "rrrrrrrrrrrrrrrr"] } },
};
const animSprite = name => `<span class="anim" data-anim="${name}">${sprite(name)}</span>`;
const rnd = () => 1000 + Math.random() * 500; // 1,0–1,5 s, unregelmäßig
function startAnims() {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.querySelectorAll("[data-anim]").forEach(el => {
    if (el._anim) return; el._anim = true;
    const a = ANIM[el.dataset.anim], name = el.dataset.anim;
    let gaze = a.gazes[0];
    // Nur die Augen-Pixel umfärben statt das ganze Bild neu zu bauen
    const cells = new Map([...el.querySelectorAll("rect")].map(r => [r.getAttribute("x") + "," + r.getAttribute("y"), r]));
    const show = k => {
      if (!el.isConnected) return;
      a.frames[k].forEach((row, j) => [...row].forEach((c, i) => {
        const r = cells.get(i + "," + (a.row + j)); if (r && c !== ".") r.setAttribute("fill", PAL[c]);
      }));
    };
    const tick = () => {
      if (!el.isConnected) return;
      if (Math.random() < 0.4) { show("b"); setTimeout(() => show(gaze), 110 + Math.random() * 80); }
      else { const others = a.gazes.filter(g => g !== gaze); gaze = others[Math.floor(Math.random() * others.length)]; show(gaze); }
      setTimeout(tick, rnd());
    };
    setTimeout(tick, rnd());
  });
}

function sprite(name, cls = "") {
  const rows = SPRITES[name], h = rows.length, w = rows[0].length;
  let r = "";
  rows.forEach((row, y) => [...row].forEach((c, x) => { if (c !== ".") r += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${PAL[c]}"/>`; }));
  return `<svg class="pixel ${cls}" viewBox="0 0 ${w} ${h}" aria-hidden="true">${r}</svg>`;
}
function cursor(label, color = "var(--red)") {
  return `<span class="cursor"><svg viewBox="0 0 24 24"><path d="M3 2l17 8.5-7.2 1.8L9.5 20z" fill="${color}" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg><span style="background:${color}">${esc(label)}</span></span>`;
}
function appIcon(t) {
  if (t.emoji) return `<span class="app-ico emoji-ico" aria-hidden="true">${t.emoji}</span>`;
  return `<span class="app-ico"><img src="${ICON_CDN}${t.icon}.svg" alt="" data-fallback="${esc(t.name[0])}"></span>`;
}
// Logo lädt nicht? Anfangsbuchstaben zeigen. Ohne Inline-Handler, damit eine strenge CSP möglich ist.
document.addEventListener("error", e => {
  const img = e.target;
  if (img instanceof HTMLImageElement && img.dataset.fallback) {
    const f = document.createElement("span"); f.className = "fallback"; f.textContent = img.dataset.fallback; img.replaceWith(f);
  }
}, true);

/* ---------- Zustand ---------- */
let state = SB.load();
function save(touch = true) { SB.save(state, touch); } // speichert erst nach dem Datenschutz-Haken

// Magic Link: ?name=Lea%20Müller&email=lea@example.de
(() => {
  const q = new URLSearchParams(location.search);
  if (q.get("name")) state.name = q.get("name").trim();
  if (q.get("email") && !state.email) state.email = q.get("email").trim();
  // Gespeichert und aus der URL entfernt wird erst nach dem Datenschutz-Haken (siehe Start-Button)
})();

const firstName = () => (state.name || "").split(/\s+/)[0] || "Du";
const taskDone = id => SB.taskDone(state, id);
const bossHits = () => BOSS.hits.filter(h => SB.hitDone(state, h.id));
const score = () => SB.score(state);
const pct = () => SB.percent(state);
const rank = () => SB.rank(state);
const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const esc = SB.esc;

/* ---------- Bausteine ---------- */
function hud() {
  return `<header class="hud"><div class="wrap">
    <a class="logo" href="#map"><b>DL</b> <i>SpeedyBoarding</i></a>
    <div class="hud-bar"><div class="bar" aria-hidden="true"><i style="width:${pct()}%"></i></div>
      <span class="score">${score()} <em>/ ${MAX} Punkte</em></span></div>
  </div></header>`;
}
function codeBox(text) { return `<div class="code">${esc(text)}<button class="copy" type="button" data-copy="${esc(text)}">Kopieren</button></div>`; }
function osSwitch() {
  return `<div class="os-switch" role="group" aria-label="Betriebssystem">
    <button type="button" data-os="mac" aria-pressed="${state.os === "mac"}">macOS</button>
    <button type="button" data-os="win" aria-pressed="${state.os === "win"}">Windows</button></div>`;
}
const AI_PROMPT = "Ich richte gerade GitHub für mein Bootcamp ein und komme nicht weiter. Das habe ich gemacht: … Das steht im Terminal (ohne Token!): … Erkläre mir Schritt für Schritt, was ich tun soll. Ich bin kein:e Entwickler:in.";

/* Nächste offene Aufgabe nach der aktuellen (in Map-Reihenfolge), am Ende der Boss */
function nextStop(current) {
  const order = [...TASKS.map(t => t.id), "github"];
  const open = id => id === "github" ? bossHits().length < BOSS.hits.length : !taskDone(id);
  const i = order.indexOf(current);
  for (let k = 1; k < order.length; k++) { const id = order[(i + k) % order.length]; if (open(id)) return id; }
  return null;
}
function navRow(current) {
  const n = nextStop(current);
  const right = n
    ? `<button class="btn btn-ghost" type="button" data-go="${n === "github" ? "#boss" : "#task/" + n}">${n === "github" ? "Zum Endboss" : "<span class='emo'>📋</span>Nächste Aufgabe: " + TASKS.find(t => t.id === n).name} →</button>`
    : (score() === MAX ? `<button class="btn btn-ghost" type="button" data-go="#finish">Zum Ziel<span class="emo emo-after">🏆</span></button>` : "");
  return `<nav class="navrow"><button class="btn btn-ghost" type="button" data-go="#map">← <span class="emo">🗺️</span>Zurück zur Map</button>${right}</nav>`;
}

/* ---------- Seiten ---------- */
function viewStart() {
  const greet = state.name ? `Hi ${esc(firstName())}!<span class="emo emo-after">👋</span>` : "Hi!<span class='emo emo-after'>👋</span>";
  return `<main class="start"><div class="wrap start-grid">
    <div class="st-head">
      <img class="school-logo" src="assets/dl-school-logo.png" alt="Digitale Leute School" width="108" height="32">
      <span class="tag">Product Management Bootcamp · Vor dem Start</span>
    </div>
    <h1 class="st-title">Wie bereit bist du, ein AI-Powered PM zu werden?</h1>
    <div class="st-body">
      <p class="lead">${greet} Bevor es losgeht, richtest du deine Werkzeuge ein. Sammle Punkte, besiege den Endboss – und starte startklar in die erste Session.</p>
      <ul class="rules">
        <li><span class="ico" style="background:var(--yellow)">${sprite("coin")}</span><span><strong>${TASKS.length} Aufgaben</strong> in ${SB.WORLDS.length} Welten, à 50 Punkte – in beliebiger Reihenfolge</span></li>
        <li><span class="ico" style="background:#FFE3E8">${sprite("boss")}</span><span><strong>1 Endboss: GitHub</strong> – 100 Punkte in 4 Treffern</span></li>
        <li><span class="ico" style="background:#E8F5F2">${sprite("flag")}</span><span>Nach jeder Aufgabe geht's <strong>zurück zur Map</strong></span></li>
      </ul>
      <div class="field">
        <label for="mail">Deine Standard-E-Mail für die Bootcamp-Tools</label>
        <input id="mail" type="email" autocomplete="email" placeholder="name@beispiel.de" value="${esc(state.email)}">
        <small>Wir schlagen sie dir bei jeder Aufgabe vor. Du kannst sie pro Tool ändern.</small>
      </div>
    </div>
    <div class="privacy st-priv">
        <label class="check" style="margin:0"><input type="checkbox" id="privacy" ${state.consent && state.consent.accepted ? "checked" : ""}>
          <span>Ich habe die <a href="https://school.digitale-leute.de/datenschutz" target="_blank" rel="noopener">Datenschutzerklärung der DL School</a> gelesen. Meine Angaben (Name, E-Mail-Adressen, GitHub-Benutzername) werden nur genutzt, um mich in die Bootcamp-Tools einzuladen.</span></label>
        <small><span class="emo">🧪</span>Prototyp: Deine Angaben bleiben derzeit nur in deinem Browser.</small>
    </div>
    <div class="st-cta">
      <button class="btn btn-primary" id="go" type="button">${score() ? "Weiter zur Map" : "Los geht's"} →</button>
      <p class="devlink"><a href="intern.html"><span class="emo">🛠️</span>Für Developer: Datenstruktur</a> · <a href="results.html"><span class="emo">📊</span>Team-Ansicht (Demo)</a></p>
    </div>
    <div class="stage st-stage" aria-hidden="true">
      <div class="sky"></div>
      <div class="coin" style="left:30%;top:28%">${sprite("coin")}</div>
      <div class="coin" style="left:40%;top:20%;animation-delay:.3s">${sprite("coin")}</div>
      <div class="coin" style="left:50%;top:28%;animation-delay:.6s">${sprite("coin")}</div>
      <div class="hero">${animSprite("hero")}</div>
      <div class="boss">${animSprite("boss")}<span style="position:absolute;left:55%;top:55%">${cursor("End Boss 49")}</span></div>
      <div class="cursor flip" style="right:76%;bottom:48%">${cursor(firstName(), "var(--blue)").replace(/^<span class="cursor">|<\/span>$/g, "")}</div>
      <div class="ground"></div>
    </div>
  </div></main>`;
}

/* ---------- Leaderboard: freiwillig, mit Gamer-Name ---------- */
const GN_A = ["Pixel", "Turbo", "Agile", "Mega", "Retro", "Sprint", "Backlog", "Roadmap", "Neon", "Quantum", "Ninja", "Laser"];
const GN_B = ["PM", "Owner", "Boss", "Hero", "Wizard", "Pilot", "Ranger", "Captain", "Explorer", "Builder"];
const randomGamerName = () => GN_A[Math.floor(Math.random() * GN_A.length)] + GN_B[Math.floor(Math.random() * GN_B.length)] + (10 + Math.floor(Math.random() * 90));
/* Zwischenseite nach dem Start: freiwillig, überspringbar */
let lbEditing = false; // „Namen ändern“: Formular zeigen, aber im Leaderboard bleiben, bis neu gespeichert wird
function viewLeaderboard() {
  const lb = state.leaderboard || {};
  const name = lb.optIn ? lb.gamerName : (lb.draft || "");
  const body = lb.optIn && !lbEditing ? `
      <p class="lead-lb">Du erscheinst im Leaderboard als <strong>${esc(lb.gamerName)}</strong>. Dein echter Name bleibt verborgen.</p>
      <div class="lb-actions"><button class="btn btn-ghost" type="button" id="lbEdit">Namen ändern</button><button class="btn btn-ghost" type="button" id="lbOut">Austreten</button></div>
      <div class="lb-foot"><button class="btn btn-primary" type="button" data-go="#map">Weiter zur Map →</button></div>` : `
      <p class="lead-lb">Andere Teilnehmende sehen dort nur deinen <strong>Gamer-Namen</strong> und deine Punkte, nicht deinen echten Namen. Du kannst jederzeit wieder austreten.</p>
      <div class="lb-form">
        <input type="text" id="gn" maxlength="20" autocomplete="off" spellcheck="false" placeholder="Dein Gamer-Name" value="${esc(name)}" aria-label="Gamer-Name">
        <button class="btn btn-ghost lb-dice" type="button" id="gnDice" title="Zufälligen Namen vorschlagen"><span class="emo">🎲</span>Vorschlag</button>
      </div>
      <small id="gnHint" style="color:var(--soft)">3–20 Zeichen: Buchstaben, Ziffern, Leerzeichen, _ und -. Bitte nicht deinen echten Namen.</small>
      <label class="check"><input type="checkbox" id="lbOk" ${lbEditing ? "checked" : ""}> Ich möchte mit diesem Gamer-Namen im Leaderboard erscheinen.</label>
      <div class="lb-foot">
        <button class="btn btn-primary" type="button" id="lbJoin">${lbEditing ? "Namen speichern" : "Ins Leaderboard"}</button>
        ${lbEditing ? `<button class="btn btn-ghost" type="button" id="lbCancel">Abbrechen</button>` : `<button class="btn btn-ghost" type="button" id="lbSkip">Überspringen →</button>`}
      </div>`;
  return `<main class="lb-page"><div class="wrap">
    <section class="card lb-big">
      <div class="lb-trophy">${sprite("trophy")}</div>
      <span class="eyebrow">Leaderboard · freiwillig</span>
      <h1>Willst du ins Leaderboard?</h1>
      ${body}
    </section>
    <p class="lb-later">Du kannst das jederzeit später auf der Map ändern.</p>
  </div></main>`;
}

/* Kurze Statuszeile auf der Map */
function leaderboardStrip() {
  const lb = state.leaderboard;
  const txt = lb && lb.optIn ? `Du bist im Leaderboard als <strong>${esc(lb.gamerName)}</strong>.` : "Du bist nicht im Leaderboard.";
  return `<div class="lb-strip"><span class="lb-mini">${sprite("trophy")}</span><span>${txt}</span><a href="#leaderboard">${lb && lb.optIn ? "Ändern" : "Doch mitmachen?"}</a></div>`;
}

function viewMap() {
  const hits = bossHits().length, bossDone = hits === BOSS.hits.length;
  const station = t => {
    const done = taskDone(t.id);
    return `<button class="card station${done ? " done" : ""}" type="button" data-go="#task/${t.id}">
      ${done ? `<span class="flag">${sprite("flag")}</span>` : ""}
      <span class="top">${appIcon(t)}<span class="pts">+${t.points}</span></span>
      <h3>${t.name}</h3>
      <span class="state">${done ? "✓ Erledigt" : esc(t.teaser)}</span>
      ${state.last === t.id ? cursor(firstName()) : ""}
    </button>`;
  };
  const worlds = SB.WORLDS.map(w => {
    const list = TASKS.filter(t => t.world === w.id), n = list.filter(t => taskDone(t.id)).length;
    return `<section class="world" aria-label="Welt ${w.id}">
      <span class="tag world-label">Welt ${w.id} · ${w.name}<span class="world-count">${n}/${list.length}</span></span>
      <div class="stations">${list.map(station).join("")}</div>
    </section>`;
  }).join("");
  return `${hud()}<main class="wrap">
    <div class="map-head">
      <div><span class="eyebrow"><span class="emo">🗺️</span>Deine Map</span><h2>Wähle deine nächste Aufgabe</h2></div>
      <div class="ready"><strong>${pct()} %</strong><span>bereit · ${rank()}</span></div>
    </div>
    ${worlds}
    <div class="boss-row">
      <button class="card boss-card${bossDone ? " defeated" : ""}" type="button" data-go="#boss">
        ${bossDone ? sprite("bossDown") : animSprite("boss")}
        <div>
          <span class="eyebrow">${bossDone ? "Besiegt" : "Endboss"}</span>
          <h3>GitHub</h3>
          <p>${bossDone ? "Du hast den Endboss besiegt!<span class='emo emo-after'>🎉</span>" : "Der härteste Gegner. Fehler gehören dazu – jeder Treffer zählt."}</p>
          <div class="hp"><span class="mono" style="font-size:12px;font-weight:700">HP</span><div class="bar"><i style="width:${100 - hits * 25}%"></i></div><span class="mono" style="font-size:12px">${hits}/4 Treffer</span></div>
        </div>
        <div class="pts-col"><span class="pts">+${BOSS.points}</span></div>
      </button>
    </div>
    ${leaderboardStrip()}
    <div class="map-foot">
      <span>Dein Fortschritt wird in diesem Browser gespeichert. · <button class="linkbtn" type="button" id="wipe">Meine Daten löschen</button> · <a href="https://school.digitale-leute.de/datenschutz" target="_blank" rel="noopener">Datenschutz</a> · <a href="intern.html"><span class="emo">🛠️</span>Datenstruktur</a> · <a href="results.html"><span class="emo">📊</span>Team-Ansicht</a></span>
      ${score() === MAX ? `<a class="btn btn-dark" href="#finish">Zum Ziel<span class="emo emo-after">🏆</span></a>` : ""}
    </div>
  </main>`;
}

function emailField(t) {
  const cur = (state.tasks[t.id] && state.tasks[t.id].email) || state.email || "";
  return `<div class="field" style="max-width:none">
    <label for="tmail">${esc(t.emailLabel || `E-Mail-Adresse für ${t.name}`)}</label>
    <input id="tmail" type="email" autocomplete="email" placeholder="name@beispiel.de" value="${esc(cur)}">
    ${state.email && cur === state.email ? `<small>Deine Standard-Adresse. Für ${esc(t.name)} eine andere? Einfach überschreiben.</small>` : ""}
  </div>`;
}

/* ---------- Startrampe: Ausrüstung, Spielregeln, Kalender ---------- */
const taskState = id => state.tasks[id] || {};
function customReady(id) {
  const x = taskState(id);
  if (id === "gear") return (x.items || []).length === SB.GEAR.must.length;
  if (id === "rules") return (x.seen || []).length === SB.RULES.length && x.pledge === true;
  if (id === "calendar") return !!x.app && x.confirmed === true;
  return false;
}
function gearBody() {
  const x = taskState("gear"), items = x.items || [], bonus = x.bonus || [];
  const card = (g, kind, on) => `<button type="button" class="item ${kind}${on ? " on" : ""}" data-gear="${g.id}" data-kind="${kind}" aria-pressed="${on}">
      <span class="item-emo" aria-hidden="true">${g.emoji}</span><span class="item-txt"><strong>${g.title}</strong><small>${g.text}</small></span>
      <span class="item-state">${on ? (kind === "must" ? "✓" : "⭐") : "+"}</span></button>`;
  return `<div class="card panel">
    <div class="gear-grid">
      <div><h2><span class="emo">✓</span>Must-haves <span class="count">${items.length}/${SB.GEAR.must.length}</span></h2>
        <div class="items">${SB.GEAR.must.map(g => card(g, "must", items.includes(g.id))).join("")}</div></div>
      <div><h2><span class="emo">⭐</span>Bonus-Items <span class="count">${bonus.length}/${SB.GEAR.bonus.length}</span></h2>
        <div class="items">${SB.GEAR.bonus.map(g => card(g, "bonus", bonus.includes(g.id))).join("")}</div>
        <div class="note info"><strong>Grundkenntnisse:</strong> Sicherer Umgang mit Computer, Browser & E-Mail. Interesse an Web-Anwendungen sowie Grundverständnis von Kollaborations- & Chat-Tools (Google Suite, Slack, Zoom) ist hilfreich.</div></div>
    </div>
    <p class="hint-line">Klick auf ein Teil, um es einzusammeln. Bonus-Items sind freiwillig und geben keine Punkte, aber Sternchen.</p>
  </div>`;
}
function rulesBody() {
  const x = taskState("rules"), seen = x.seen || [], all = seen.length === SB.RULES.length;
  return `<div class="card panel">
    <h2>Spielregeln <span class="count">${seen.length}/${SB.RULES.length} aufgedeckt</span></h2>
    <div class="rules-grid">${SB.RULES.map((r, i) => seen.includes(r.id)
      ? `<div class="rule open"><span class="rule-emo" aria-hidden="true">${r.emoji}</span><strong>${r.title}</strong><small>${r.text}</small></div>`
      : `<button type="button" class="rule closed" data-rule="${r.id}" aria-label="Regel ${i + 1} aufdecken"><span class="rule-q">?</span><span class="rule-n">${String(i + 1).padStart(2, "0")}</span></button>`).join("")}</div>
    <label class="check pledge${all ? "" : " locked"}"><input type="checkbox" id="pledge" ${x.pledge ? "checked" : ""} ${all ? "" : "disabled"}> <span>Ich bin dabei<span class="emo emo-after">🤝</span> Ich halte mich an die Spielregeln.${all ? "" : " <em>(erst alle Karten aufdecken)</em>"}</span></label>
  </div>`;
}
const CAL_APPS = {
  google: { name: "Google Calendar", emoji: "📆", steps: ["<a href=\"https://calendar.google.com\" target=\"_blank\" rel=\"noopener\">calendar.google.com</a> öffnen", "Links bei „Weitere Kalender“ auf <strong>+</strong> → <strong>Per URL</strong>", "URL einfügen → <strong>Kalender hinzufügen</strong>"] },
  apple: { name: "Apple Kalender", emoji: "🗓️", steps: ["Kalender-App öffnen", "Menü <strong>Ablage → Neues Kalenderabonnement …</strong>", "URL einfügen → <strong>Abonnieren</strong>"] },
  outlook: { name: "Outlook / Office 365", emoji: "📨", steps: ["<a href=\"https://outlook.com\" target=\"_blank\" rel=\"noopener\">outlook.com</a> → Kalender", "<strong>Kalender hinzufügen → Aus dem Internet abonnieren</strong>", "URL einfügen → <strong>Importieren</strong>"] },
};
function calendarBody() {
  const x = taskState("calendar"), app = CAL_APPS[x.app];
  return `<div class="card panel">
    <h2>1. Kalender-Link kopieren</h2>
    ${codeBox(CALENDAR_URL)}
    ${CALENDAR_IS_PLACEHOLDER ? `<div class="note warn"><span class="emo">🚧</span>Prototyp: Dieser Link ist ein Platzhalter. Vor Kursstart wird hier der Kalender deiner Kohorte eingetragen.</div>` : ""}
    <h2 style="margin-top:22px">2. Welche Kalender-App nutzt du?</h2>
    <div class="cal-apps">${Object.entries(CAL_APPS).map(([k, a]) => `<button type="button" class="cal-app${x.app === k ? " on" : ""}" data-cal="${k}" aria-pressed="${x.app === k}"><span class="emo">${a.emoji}</span>${a.name}</button>`).join("")}</div>
    ${app ? `<ol class="steps cal-steps">${app.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      <div class="note info"><span class="emo">💡</span>Der Kalender aktualisiert sich automatisch. Neue Termine oder Änderungen erscheinen ohne weiteres Zutun.</div>
      <label class="check"><input type="checkbox" id="calok" ${x.confirmed ? "checked" : ""}> Ich habe den Kalender abonniert.</label>` : ""}
  </div>`;
}
function customDone(t) {
  const done = taskDone(t.id), ready = customReady(t.id);
  const msg = { gear: "Sammle alle Must-haves ein.", rules: "Deck alle Karten auf und gib dein Versprechen.", calendar: "Wähle deine App und bestätige das Abo." }[t.id];
  return `<div class="card panel"><div class="task-actions">
    ${done ? `<span class="done-banner">✓ Erledigt · +${t.points} Punkte</span>` : `<span class="hint-line" style="margin:0">${ready ? "Alles bereit!" : msg}</span>`}
    <button class="btn btn-primary" id="cdone" type="button" ${ready ? "" : "disabled"}>${done ? "Zur Map" : `Erledigt · +${t.points}`}</button>
  </div></div>`;
}

function viewTask(id) {
  const t = TASKS.find(x => x.id === id);
  if (!t) return viewMap();
  const done = taskDone(t.id);
  if (t.custom) return `${hud()}<main class="wrap"><div class="task">
    ${navRow(t.id)}
    <div class="task-head">${appIcon(t)}<div><span class="eyebrow"><span class="emo">📋</span>Welt ${t.world} · +${t.points} Punkte</span><h1>${t.name}</h1></div></div>
    <p style="font-size:1.08rem;color:var(--muted);margin:0">${t.why}</p>
    ${t.custom === "gear" ? gearBody() : t.custom === "rules" ? rulesBody() : calendarBody()}
    ${customDone(t)}
  </div></main>`;
  const g = (state.tasks.google && state.tasks.google.has) || "";
  const body = t.google ? `
    <div class="card panel">
      <h2>Hast du schon ein Google-Konto?</h2>
      <div class="choices" id="gchoice">
        <label><input type="radio" name="g" value="gmail" ${g === "gmail" ? "checked" : ""}> Ja, mit einer Gmail-Adresse</label>
        <label><input type="radio" name="g" value="other" ${g === "other" ? "checked" : ""}> Ja, mit einer anderen Adresse (z. B. Posteo, Proton, eigene Domain)</label>
        <label><input type="radio" name="g" value="none" ${g === "none" ? "checked" : ""}> Nein, noch nicht</label>
      </div>
      <div id="gnone" ${g === "none" ? "" : "hidden"}>
        <ol class="steps">
          <li><a href="https://accounts.google.com/signup" target="_blank" rel="noopener">accounts.google.com/signup</a> öffnen und Vor- und Nachnamen eingeben.</li>
          <li>Bei der Frage nach der E-Mail-Adresse auf <strong>„Stattdessen meine aktuelle E-Mail-Adresse verwenden“</strong> klicken. So brauchst du kein Gmail-Postfach.</li>
          <li>Deine bestehende Adresse eingeben, den Bestätigungscode aus deinem Postfach eintragen und fertig.</li>
        </ol>
        <div class="note info"><span class="emo">💡</span>Lieber ein Gmail-Postfach? Geht natürlich auch – dann einfach eine neue Gmail-Adresse wählen.</div>
      </div>
      <div class="note warn"><span class="emo">⚠️</span>Bitte <strong>keine Arbeits-Adresse</strong> deines aktuellen Arbeitgebers. Die kann Kurse blockieren, und bei einem Jobwechsel ist der Zugang weg.</div>
    </div>` : `
    <div class="card panel">
      <h2>So geht's</h2>
      <ol class="steps">${t.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      ${t.video ? `<div class="note info"><span class="emo">📺</span>Neu bei ${esc(t.name)}? <a href="${t.video.url}" target="_blank" rel="noopener">${esc(t.video.label)}</a> (${t.video.lang}). Kennst du ${esc(t.name)} schon, kannst du das überspringen.</div>` : ""}
    </div>`;
  return `${hud()}<main class="wrap"><div class="task">
    ${navRow(t.id)}
    <div class="task-head">${appIcon(t)}<div><span class="eyebrow"><span class="emo">📋</span>Aufgabe · +${t.points} Punkte</span><h1>${t.name}</h1></div></div>
    <p style="font-size:1.08rem;color:var(--muted);margin:0">${t.why}</p>
    ${body}
    <div class="card panel">
      <h2>Deine Angabe</h2>
      ${emailField(t)}
      <label class="check"><input type="checkbox" id="tconfirm" ${done ? "checked" : ""}> ${t.google ? "Ich habe ein Google-Konto mit dieser Adresse." : `Ich habe einen ${esc(t.name)}-Account bzw. nutze diese Adresse für ${esc(t.name)}.`}</label>
      <div class="task-actions">
        ${done ? `<span class="done-banner">✓ Erledigt · +${t.points} Punkte</span>` : "<span></span>"}
        <button class="btn btn-primary" id="tdone" type="button">${done ? "Speichern & zur Map" : `Erledigt · +${t.points}`}</button>
      </div>
    </div>
  </div></main>`;
}

function hitPanel(h, i, inner) {
  const done = !!(state.boss[h.id] && state.boss[h.id].done);
  return `<section class="card panel hit${done ? " done" : ""}" id="hit-${h.id}">
    <div class="hit-head"><div><div class="hit-num">TREFFER ${i + 1}/4</div><h2 style="margin:4px 0 0">${h.title}</h2></div><span class="pts">${done ? "✓ " : ""}+${h.points}</span></div>
    ${inner}
    <div class="task-actions">
      <span>${done ? `<span class="done-banner">✓ Treffer gelandet!</span>` : ""}</span>
      <button class="btn ${done ? "btn-ghost" : "btn-primary"}" type="button" data-hit="${h.id}">${done ? "Rückgängig" : `Treffer! +${h.points}`}</button>
    </div>
  </section>`;
}

function viewBoss() {
  const hits = bossHits().length, mac = state.os === "mac";
  const user = (state.boss.account && state.boss.account.user) || "";
  const H = BOSS.hits;
  return `${hud()}<main class="wrap"><div class="task">
    ${navRow("github")}
    <div class="boss-hero">
      <div>
        <span class="eyebrow">Endboss · +100 Punkte</span>
        <h1>GitHub</h1>
        <p>Hier kommt dein Code ins Netz. Vier Treffer, und der Boss liegt am Boden.</p>
        <div class="hp"><span class="mono" style="font-size:12px;font-weight:700">HP</span><div class="bar"><i style="width:${100 - hits * 25}%"></i></div><span class="mono" style="font-size:12px">${hits}/4</span></div>
      </div>
      <div class="boss-sprite" id="bossSprite" style="position:relative">${hits === 4 ? sprite("bossDown") : animSprite("boss")}</div>
    </div>
    <div class="calm">
      <strong>Fehler passieren hier – alles easy.<span class="emo emo-after">🙌</span></strong>
      Fragt eure KI des Vertrauens. Wenn etwas nicht gleich funktioniert, probiert es nochmal – oder macht erst mit der nächsten Aufgabe weiter und kommt später zurück.
    </div>
    <details class="help"><summary><span class="emo">🤖</span>Joker: Fertiger Prompt für deine KI</summary>${codeBox(AI_PROMPT)}<div class="note danger" style="margin-top:8px"><span class="emo">🔒</span>Niemals deinen Token in einen Chat kopieren – auch nicht in eine KI.</div></details>

    ${hitPanel(H[0], 0, `
      <ol class="steps">
        <li>Auf <a href="https://github.com/signup" target="_blank" rel="noopener">github.com/signup</a> registrieren, den <strong>Free</strong>-Plan wählen und deine E-Mail bestätigen. Schon einen Account? Super, weiter mit 2.</li>
        <li>Auf github.com oben rechts auf dein Profilbild → <strong>Your profile</strong>. Den Link aus der Adresszeile kopieren.</li>
      </ol>
      <div class="field" style="max-width:none;margin-top:14px">
        <label for="ghuser">Dein GitHub-Profil-Link oder Benutzername</label>
        <input id="ghuser" type="text" autocomplete="off" spellcheck="false" placeholder="https://github.com/dein-name" value="${user ? "https://github.com/" + esc(user) : ""}">
        <small id="ghhint">${user ? `✓ Benutzername: <strong>${esc(user)}</strong>` : "Link oder nur den Namen – beides geht."}</small>
      </div>`)}

    ${hitPanel(H[1], 1, `
      <p style="margin:0 0 10px">Git ist das Programm, das deinen Code zu GitHub bringt. Das Terminal hat jeder Rechner – Git aber nicht.</p>
      ${osSwitch()}
      ${mac ? `
        <ol class="steps">
          <li>Terminal öffnen: <strong>⌘ + Leertaste</strong>, „Terminal“ tippen, Enter.</li>
          <li>Prüfen, ob Git schon da ist:${codeBox("git --version")}Zeigt es eine Versionsnummer? Dann bist du fertig – Treffer!</li>
          <li>Sonst installieren:${codeBox("xcode-select --install")}Im Fenster auf <strong>„Installieren“</strong> klicken – <strong>nicht</strong> auf „Xcode laden“ (über 10 GB, brauchst du nicht).</li>
          <li>Warten, bis <strong>„Die Software wurde installiert“</strong> erscheint. Das kann bis zu 45 Minuten dauern. Nicht auf „Stoppen“ klicken.</li>
          <li>Nochmal <code>git --version</code> eingeben – jetzt sollte eine Version erscheinen.</li>
        </ol>
        <div class="note info"><span class="emo">💡</span>Homebrew ist keine Abkürzung – es lädt genau dasselbe Paket.</div>` : `
        <ol class="steps">
          <li><a href="https://git-scm.com/download/win" target="_blank" rel="noopener">Git for Windows</a> herunterladen.</li>
          <li>Installer ausführen, alle Standardeinstellungen lassen.</li>
          <li>PowerShell öffnen (Start → „PowerShell“) und prüfen:${codeBox("git --version")}</li>
        </ol>
        <div class="note info"><span class="emo">💡</span>„git is not recognized“? PowerShell schließen und neu öffnen.</div>`}
      <p style="margin:14px 0 6px">Einmalig deinen Namen setzen (sonst gibt's beim ersten Commit einen Fehler):</p>
      ${codeBox(`git config --global user.name "${state.name || "Dein Name"}"\ngit config --global user.email "${state.email || "deine@email.de"}"`)}`)}

    ${hitPanel(H[2], 2, `
      <p style="margin:0 0 10px">Beim Hochladen fragt Git nach einem Passwort. Dein GitHub-Passwort funktioniert dort <strong>nicht</strong> – du brauchst einen <strong>Token</strong>.</p>
      <ol class="steps">
        <li>Bei github.com eingeloggt sein, dann <a href="https://github.com/settings/tokens/new?scopes=repo&description=PM%20Bootcamp" target="_blank" rel="noopener"><strong>diesen Link öffnen</strong></a>. Er füllt das Formular schon vor.</li>
        <li><strong>„Confirm access“:</strong> Code aus der E-Mail von GitHub eingeben (Spam-Ordner prüfen!), dann <strong>Verify</strong>.</li>
        <li><strong>Expiration</strong> auf <strong>90 days</strong> stellen (GitHub schlägt jedes Mal 30 vor). <strong>Nicht</strong> „No expiration“.</li>
        <li>Bei <strong>Select scopes</strong> nur <code>repo</code> angehakt lassen, sonst nichts.</li>
        <li>Ganz unten <strong>Generate token</strong> klicken und den Token (<code>ghp_…</code>) mit dem Kopier-Symbol kopieren.</li>
        <li>Die Seite offen lassen, bis Treffer 4 geschafft ist – der Token wird nur einmal angezeigt.</li>
      </ol>
      <div class="note danger"><span class="emo">🔒</span>Der Token ist wie ein Passwort: nie in Slack, Chats, KI-Tools, Screenshots oder Dateien – und auch <strong>nicht hier</strong> eintragen.</div>`)}

    ${hitPanel(H[3], 3, `
      <p style="margin:0 0 10px">Jetzt lädst du zum ersten Mal etwas hoch. Am einfachsten lässt du Claude die Vorarbeit machen.</p>
      <ol class="steps">
        <li>Auf github.com oben rechts <strong>+ → New repository</strong>, Name <code>hello-bootcamp</code>, <strong>Create repository</strong>.</li>
        <li>In der Claude-App (Code-Tab) diesen Auftrag geben:${codeBox(`Leg einen Ordner hello-bootcamp mit einer README an, mach einen ersten Commit und richte github.com/${user || "DEIN-NAME"}/hello-bootcamp als Remote ein. Trag meinen GitHub-Benutzernamen in die Remote-URL ein. Den Push mache ich selbst im Terminal.`)}</li>
        <li>Claude nennt dir den Push-Befehl. Im Terminal ausführen – <strong>erst dann</strong> erscheint:${codeBox(`Password for 'https://${user || "DEIN-NAME"}@github.com':`)}</li>
        <li>Jetzt den Token einfügen (${mac ? "<strong>Cmd + V</strong>" : "<strong>Rechtsklick</strong>"}) und <strong>Enter</strong>.</li>
      </ol>
      <div class="note warn"><span class="emo">⚠️</span><strong>Token nur einfügen, wenn <code>Password for …</code> dasteht.</strong> Steht am Zeilenanfang <code>${mac ? "name@Mac ~ %" : "PS C:\\Users\\name&gt;"}</code>, wartet das Terminal auf einen Befehl – dort nicht einfügen!</div>
      <div class="note info"><span class="emo">👀</span><strong>Beim Einfügen erscheint nichts</strong> – keine Punkte, keine Sternchen. Das ist richtig so.</div>
      <div class="note ok"><span class="emo">✅</span>Geschafft, wenn am Ende steht:${codeBox("* [new branch]      main -> main\nbranch 'main' set up to track 'origin/main'.")}</div>
      <details class="help"><summary>Es klappt nicht?</summary><dl>
        <dt>Ich sehe den Token auf dem Bildschirm</dt><dd>Er ist in der falschen Zeile. <strong>Nicht Enter drücken.</strong> Ctrl + C, dann <code>clear</code>. Token auf GitHub löschen und einen neuen erstellen – ein sichtbarer Token gilt als verbraucht.</dd>
        <dt><code>fatal: not a git repository</code></dt><dd>Falscher Ordner. Erst mit <code>cd</code> in den Projektordner wechseln – oder Claude fragen, welcher Befehl passt.</dd>
        <dt><code>Username for 'https://github.com':</code></dt><dd>Der Benutzername fehlt in der Remote-URL. Claude bitten, ihn einzutragen – oder den Namen <strong>tippen</strong>, Enter, und erst bei <code>Password</code> den Token einfügen.</dd>
        <dt><code>Authentication failed</code></dt><dd>Token falsch, abgelaufen oder ohne <code>repo</code>. Neuen Token erstellen (Treffer 3) und nochmal pushen.</dd>
        <dt><code>Repository not found</code></dt><dd>Repo auf GitHub noch nicht angelegt oder anders geschrieben.</dd>
        <dt>Die Passwort-Frage kommt doppelt</dt><dd>Zwei Versuche laufen gleichzeitig. Ctrl + C (ggf. zweimal), <code>clear</code>, dann einmal neu starten.</dd>
      </dl></details>`)}
  </div></main>`;
}

function viewFinish() {
  return `${hud()}<main class="wrap"><div class="finish">
    <img class="school-logo center" src="assets/dl-school-logo.png" alt="Digitale Leute School" width="108" height="32">
    <div class="badge">${sprite("trophy")}</div>
    <span class="eyebrow">${score()} / ${MAX} Punkte</span>
    <h1>${state.name ? `${esc(firstName())}, du bist bereit!` : "Du bist bereit!"}</h1>
    <p><span class="rank">${rank()}</span></p>
    <p style="color:var(--muted);font-size:1.1rem">Alle Werkzeuge sind eingerichtet und der Endboss liegt am Boden. Wir freuen uns auf die erste Session mit dir.</p>
    <p style="margin-top:26px"><button class="btn btn-primary" type="button" data-copy="Ich bin AI-Powered-PM-ready! 🏆 ${score()}/${MAX} Punkte im SpeedyBoarding – GitHub-Endboss besiegt.">Für Slack kopieren<span class="emo emo-after">📋</span></button></p>
    <p><button class="btn btn-ghost" type="button" data-go="#map">← <span class="emo">🗺️</span>Zurück zur Map</button></p>
  </div></main>`;
}

/* ---------- Router ---------- */
const app = document.getElementById("app");
function route() {
  let h = location.hash || "#start";
  if (h !== "#leaderboard") lbEditing = false;
  if (!(state.consent && state.consent.accepted)) h = "#start"; // ohne Datenschutz-Haken geht es nicht weiter
  if (h.startsWith("#task/")) { app.innerHTML = viewTask(h.slice(6)); state.last = h.slice(6); }
  else if (h === "#map") app.innerHTML = viewMap();
  else if (h === "#boss") { app.innerHTML = viewBoss(); state.last = "github"; }
  else if (h === "#finish") app.innerHTML = score() === MAX ? viewFinish() : viewMap(); // Ziel erst mit allen Punkten
  else if (h === "#leaderboard") app.innerHTML = viewLeaderboard();
  else app.innerHTML = viewStart();
  save(false); // merkt sich die letzte Station, zählt aber nicht als Aktivität
  window.scrollTo(0, 0);
  bind();
  startAnims();
}
function go(h) { if (location.hash === h) route(); else location.hash = h; }

function toast(text) {
  const t = document.getElementById("toast");
  t.innerHTML = `<span style="width:44px">${sprite("coin")}</span>${text}`;
  t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 1100);
}

function parseGitHub(v) {
  v = v.trim().replace(/\/+$/, "");
  const m = v.match(/^(?:https?:\/\/)?(?:www\.)?github\.com\/([^\/?#\s]+)/i);
  const name = m ? m[1] : v.replace(/^@/, "");
  return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(name) ? name : null;
}

function bind() {
  const mail = document.getElementById("mail");
  const goBtn = document.getElementById("go");
  const priv = document.getElementById("privacy");
  if (goBtn) {
    const upd = () => { goBtn.disabled = !priv.checked; };
    priv.onchange = upd; upd();
    goBtn.onclick = () => {
      const v = mail.value.trim();
      if (v && !validEmail(v)) { mail.classList.add("bad"); mail.focus(); return; }
      if (!priv.checked) return;
      if (!(state.consent && state.consent.accepted)) state.consent = { accepted: true, at: new Date().toISOString(), policyUrl: "https://school.digitale-leute.de/datenschutz" };
      state.email = v; save();
      if (location.search) history.replaceState(null, "", location.pathname + location.hash); // Name nicht in der URL lassen
      go(state.leaderboard && state.leaderboard.seen ? "#map" : "#leaderboard");
    };
  }

  // Startrampe
  const keepScroll = () => { const y = scrollY; route(); scrollTo(0, y); };
  const ensure = id => (state.tasks[id] = state.tasks[id] || { done: false, email: "" });
  document.querySelectorAll("[data-gear]").forEach(b => b.onclick = () => {
    const x = ensure("gear"), key = b.dataset.kind === "must" ? "items" : "bonus", list = new Set(x[key] || []);
    list.has(b.dataset.gear) ? list.delete(b.dataset.gear) : list.add(b.dataset.gear);
    x[key] = [...list];
    if (x.done && !customReady("gear")) x.done = false; // Must-have wieder abgegeben → nicht mehr erledigt
    save(); keepScroll();
  });
  document.querySelectorAll("[data-rule]").forEach(b => b.onclick = () => {
    const x = ensure("rules"); x.seen = [...new Set([...(x.seen || []), b.dataset.rule])]; save(); keepScroll();
  });
  const pledge = document.getElementById("pledge");
  if (pledge) pledge.onchange = () => { const x = ensure("rules"); x.pledge = pledge.checked; if (!pledge.checked) x.done = false; save(); keepScroll(); };
  document.querySelectorAll("[data-cal]").forEach(b => b.onclick = () => { const x = ensure("calendar"); x.app = b.dataset.cal; save(); keepScroll(); });
  const calok = document.getElementById("calok");
  if (calok) calok.onchange = () => { const x = ensure("calendar"); x.confirmed = calok.checked; if (!calok.checked) x.done = false; save(); keepScroll(); };
  const cdone = document.getElementById("cdone");
  if (cdone) cdone.onclick = () => {
    const id = location.hash.slice(6), t = TASKS.find(x => x.id === id);
    if (!customReady(id)) return;
    const was = taskDone(id);
    ensure(id).done = true; save();
    if (!was) toast(`+${t.points}!`);
    setTimeout(() => go("#map"), was ? 0 : 900);
  };

  // Aufgabe
  const tdone = document.getElementById("tdone");
  if (tdone) {
    const id = location.hash.slice(6), t = TASKS.find(x => x.id === id);
    const tm = document.getElementById("tmail"), tc = document.getElementById("tconfirm");
    const ok = () => validEmail(tm.value.trim()) && tc.checked && (!t.google || document.querySelector('input[name=g]:checked'));
    const upd = () => { tdone.disabled = !ok(); tm.classList.toggle("bad", !!tm.value.trim() && !validEmail(tm.value.trim())); };
    tm.oninput = upd; tc.onchange = upd;
    document.querySelectorAll("input[name=g]").forEach(r => r.onchange = () => {
      document.getElementById("gnone").hidden = r.value !== "none";
      state.tasks.google = Object.assign(state.tasks.google || {}, { has: r.value }); save(); upd();
    });
    upd();
    tdone.onclick = () => {
      if (!ok()) return;
      const was = taskDone(id);
      state.tasks[id] = Object.assign(state.tasks[id] || {}, { done: true, email: tm.value.trim() });
      if (!state.email) state.email = tm.value.trim();
      save();
      if (!was) toast(`+${t.points}!`);
      setTimeout(() => go("#map"), was ? 0 : 900);
    };
  }

  // Boss
  const gh = document.getElementById("ghuser");
  if (gh) gh.oninput = () => {
    const n = parseGitHub(gh.value);
    document.getElementById("ghhint").innerHTML = n ? `✓ Benutzername: <strong>${esc(n)}</strong>` : (gh.value.trim() ? "Das sieht noch nicht nach einem GitHub-Profil aus." : "Link oder nur den Namen – beides geht.");
    gh.classList.toggle("bad", !!gh.value.trim() && !n);
  };
  document.querySelectorAll("[data-hit]").forEach(b => b.onclick = () => {
    const id = b.dataset.hit, h = BOSS.hits.find(x => x.id === id);
    const cur = state.boss[id] && state.boss[id].done;
    if (cur) { state.boss[id] = Object.assign(state.boss[id], { done: false }); save(); route(); document.getElementById("hit-" + id).scrollIntoView({ block: "center" }); return; }
    if (id === "account") {
      const n = parseGitHub(gh.value);
      if (!n) { gh.classList.add("bad"); gh.focus(); document.getElementById("ghhint").textContent = "Bitte zuerst deinen Profil-Link oder Benutzernamen eintragen."; return; }
      state.boss.account = { done: true, user: n };
    } else state.boss[id] = { done: true };
    save();
    const sp = document.getElementById("bossSprite"); sp.classList.add("shake");
    toast(`+${h.points}!`);
    setTimeout(() => {
      if (bossHits().length === BOSS.hits.length) { go("#map"); return; }
      route();
      const nextHit = BOSS.hits.find(x => !(state.boss[x.id] && state.boss[x.id].done));
      const el = document.getElementById("hit-" + (nextHit ? nextHit.id : id));
      if (el) el.scrollIntoView({ block: "start" });
    }, 900);
  });

  // Leaderboard
  const gn = document.getElementById("gn");
  if (gn) {
    const ok = document.getElementById("lbOk"), join = document.getElementById("lbJoin"), hint = document.getElementById("gnHint");
    const check = () => {
      const v = gn.value.trim(), valid = SB.validGamerName(v), real = SB.containsRealName(v, state.name);
      gn.classList.toggle("bad", !!v && (!valid || real));
      hint.textContent = real ? "Das sieht nach deinem echten Namen aus. Wähl lieber einen Fantasienamen." : "3–20 Zeichen: Buchstaben, Ziffern, Leerzeichen, _ und -. Bitte nicht deinen echten Namen.";
      join.disabled = !(valid && !real && ok.checked);
    };
    gn.oninput = () => { if (!lbEditing) { state.leaderboard = Object.assign(state.leaderboard || {}, { draft: gn.value }); save(false); } check(); };
    ok.onchange = check;
    document.getElementById("gnDice").onclick = () => { gn.value = randomGamerName(); gn.oninput(); };
    join.onclick = () => {
      const prev = state.leaderboard || {};
      state.leaderboard = { optIn: true, gamerName: gn.value.trim(), at: prev.optIn ? prev.at : new Date().toISOString(), seen: true };
      lbEditing = false;
      save(); toast("🏆"); setTimeout(() => go("#map"), 800);
    };
    check();
  }
  const lbSkip = document.getElementById("lbSkip");
  if (lbSkip) lbSkip.onclick = () => { state.leaderboard = Object.assign(state.leaderboard || {}, { optIn: false, seen: true }); save(); go("#map"); };
  const lbCancel = document.getElementById("lbCancel");
  if (lbCancel) lbCancel.onclick = () => { lbEditing = false; route(); };
  const lbOut = document.getElementById("lbOut");
  if (lbOut) {
    lbOut.onclick = () => { state.leaderboard = { optIn: false, draft: state.leaderboard.gamerName, seen: true }; save(); route(); };
    document.getElementById("lbEdit").onclick = () => { lbEditing = true; route(); document.getElementById("gn").focus(); };
  }

  const wipe = document.getElementById("wipe");
  if (wipe) wipe.onclick = () => {
    if (!confirm("Alle deine Angaben und Punkte in diesem Browser löschen? Das lässt sich nicht rückgängig machen.")) return;
    SB.clear(); state = SB.blank(); lbEditing = false; go("#start");
  };

  // Allgemein
  document.querySelectorAll("[data-go]").forEach(b => b.onclick = () => go(b.dataset.go));
  document.querySelectorAll("[data-os]").forEach(b => b.onclick = () => { state.os = b.dataset.os; save(); const y = scrollY; route(); scrollTo(0, y); });
  document.querySelectorAll("[data-copy]").forEach(b => b.onclick = () => {
    navigator.clipboard?.writeText(b.dataset.copy).then(() => { const o = b.textContent; b.textContent = "Kopiert ✓"; setTimeout(() => b.textContent = o, 1400); }).catch(() => {});
  });
}

window.addEventListener("hashchange", route);
route();
