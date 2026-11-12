/* =========================================================
   SpeedyBoarding – Datenmodell (gemeinsam für index.html und intern.html)

   Einzige Quelle für: Aufgaben-IDs, Punkte, Ränge, Speicher-Schlüssel
   und das Format, in dem die Daten später übertragen werden (payload).
   ========================================================= */
window.SB = (() => {
  const SCHEMA_VERSION = 1;
  const STORAGE_KEY = "speedyboarding-v2";

  /* world 1 = Startrampe (Vorbereitung), world 2 = Werkzeugkiste (Apps) */
  const WORLDS = [
    { id: 1, name: "Startrampe" },
    { id: 2, name: "Werkzeugkiste" },
  ];

  /* Ausrüstungs-Check: Must-haves zählen, Nice-to-haves sind Bonus-Items ohne Punkte */
  const GEAR = {
    must: [
      { id: "computer", emoji: "🖥️", title: "Notebook oder Computer", text: "Mac oder Windows" },
      { id: "webcam", emoji: "📹", title: "Hochwertige Webcam", text: "Mindestens 1080p Auflösung (extern empfohlen)" },
      { id: "headset", emoji: "🎙️", title: "Mikrofon oder Headset", text: "Kabelgebunden für stabile Audioqualität" },
      { id: "internet", emoji: "🌐", title: "Stabile Internetverbindung", text: "Gutes Down- & Upload – bei instabilem WLAN: LAN empfohlen" },
      { id: "accounts", emoji: "📧", title: "E-Mail- und Google-Konto", text: "Für Einladungen & Google Classroom" },
      { id: "quiet", emoji: "🤫", title: "Ruhiger Arbeitsort", text: "Ein Raum, in dem du ungestört arbeiten kannst" },
    ],
    bonus: [
      { id: "monitor", emoji: "🖼️", title: "Externer Monitor", text: "Mehr Platz für Figma, Miro & Zoom parallel" },
      { id: "light", emoji: "💡", title: "Separate Lichtquelle", text: "Optional mit Helligkeitsregelung" },
      { id: "background", emoji: "🎬", title: "Neutraler Hintergrund", text: "Oder ein passender virtueller Hintergrund" },
      { id: "ergo", emoji: "🪑", title: "Ergonomischer Arbeitsplatz", text: "Optimal mit Stehtisch" },
    ],
  };

  /* Spielregeln: alle Karten aufdecken + Versprechen */
  const RULES = [
    { id: "meetings", emoji: "📹", title: "Sessions wie Geschäftstermine", text: "Kamera an, aktiv mitmachen, ruhiges Umfeld – keine parallelen Termine." },
    { id: "language", emoji: "🗣️", title: "Sprache im Bootcamp", text: "Überwiegend Deutsch – einige Sessions und Materialien sind auf Englisch." },
    { id: "team", emoji: "🤝", title: "Teamarbeit zählt", text: "Teile Ideen, gib Feedback, unterstütze andere – jede Perspektive zählt." },
    { id: "respect", emoji: "💛", title: "Respektvoll & offen", text: "Unterschiedliche Meinungen bereichern. Sachlich, interessiert, wertschätzend bleiben." },
    { id: "visual", emoji: "🎨", title: "Visualisiere deine Ideen", text: "Miro, Figma oder Stift & Papier – sichtbare Gedanken beleben Diskussionen." },
    { id: "feedback", emoji: "🪞", title: "Konstruktive Feedbackkultur", text: "Beschreibend statt bewertend, lösungsorientiert geben – und offen annehmen." },
    { id: "prepared", emoji: "🧭", title: "Vorbereitet & organisiert", text: "Technik prüfen, pünktlich starten, Zeit zum Vertiefen und Ausprobieren einplanen." },
    { id: "curious", emoji: "🚀", title: "Neugierig bleiben", text: "Experimentieren, reflektieren, verbessern – Fehler gehören dazu." },
  ];

  const CALENDAR_APPS = ["google", "apple", "outlook"];

  const TASKS = [
    { id: "gear",     name: "Ausrüstungs-Check", points: 50, world: 1, emoji: "🎒", noEmail: true },
    { id: "rules",    name: "Spielregeln",       points: 50, world: 1, emoji: "📜", noEmail: true },
    { id: "calendar", name: "Kalender",          points: 50, world: 1, emoji: "📅", noEmail: true },
    { id: "google",  name: "Google",  points: 50, world: 2 },
    { id: "slack",   name: "Slack",   points: 50, world: 2 },
    { id: "miro",    name: "Miro",    points: 50, world: 2 },
    { id: "figma",   name: "Figma",   points: 50, world: 2 },
    { id: "jira",    name: "Jira",    points: 50, world: 2 },
    { id: "claude",  name: "Claude",  points: 50, world: 2 },
    { id: "chatgpt", name: "ChatGPT", points: 50, world: 2 },
  ];

  const BOSS = {
    id: "github", name: "GitHub", points: 100,
    hits: [
      { id: "account", title: "GitHub-Account & Profil-Link", points: 25 },
      { id: "git",     title: "Git installieren",             points: 25 },
      { id: "token",   title: "Token erstellen",              points: 25 },
      { id: "push",    title: "Erster Push",                  points: 25 },
    ],
  };

  const RANKS = [
    [0, "Neu im Spiel"],
    [25, "Setup-Entdecker:in"],
    [50, "PM in Ausbildung"],
    [75, "Fast AI-Powered"],
    [100, "AI-Powered PM"],
  ];

  const MAX = TASKS.reduce((s, t) => s + t.points, 0) + BOSS.points;

  /* Rohzustand, wie er im Browser (localStorage) liegt */
  const blank = () => ({
    name: "", email: "", tasks: {}, boss: {}, last: null,
    os: typeof navigator !== "undefined" && /Win/i.test(navigator.platform) ? "win" : "mac",
    consent: null, // { accepted, at, policyUrl }
    leaderboard: null, // { optIn, gamerName, at }
    updatedAt: null,
  });
  /* Gespeicherten Zustand nur übernehmen, wenn die Form stimmt. Kaputte Teile fallen auf Standardwerte zurück. */
  const isObj = v => v !== null && typeof v === "object" && !Array.isArray(v);
  const str = v => (typeof v === "string" ? v : "");
  function sanitize(raw) {
    const st = blank();
    if (!isObj(raw)) return st;
    st.name = str(raw.name);
    st.email = str(raw.email);
    st.os = raw.os === "win" ? "win" : "mac";
    st.last = typeof raw.last === "string" ? raw.last : null;
    st.updatedAt = typeof raw.updatedAt === "string" ? raw.updatedAt : null;
    if (isObj(raw.tasks)) TASKS.forEach(t => {
      const x = raw.tasks[t.id];
      if (!isObj(x)) return;
      const o = { done: x.done === true, email: str(x.email) };
      if (typeof x.has === "string") o.has = x.has;
      const pick = (arr, list) => Array.isArray(arr) ? [...new Set(arr.filter(v => list.some(i => i.id === v)))] : [];
      if (t.id === "gear") { o.items = pick(x.items, GEAR.must); o.bonus = pick(x.bonus, GEAR.bonus); }
      if (t.id === "rules") { o.seen = pick(x.seen, RULES); o.pledge = x.pledge === true; }
      if (t.id === "calendar") { if (CALENDAR_APPS.includes(x.app)) o.app = x.app; o.confirmed = x.confirmed === true; }
      st.tasks[t.id] = o;
    });
    if (isObj(raw.boss)) BOSS.hits.forEach(h => {
      const x = raw.boss[h.id];
      if (isObj(x)) st.boss[h.id] = { done: x.done === true, ...(h.id === "account" && typeof x.user === "string" ? { user: x.user } : {}) };
    });
    if (isObj(raw.consent) && raw.consent.accepted === true) st.consent = { accepted: true, at: str(raw.consent.at), policyUrl: str(raw.consent.policyUrl) };
    if (isObj(raw.leaderboard)) st.leaderboard = {
      optIn: raw.leaderboard.optIn === true && validGamerName(raw.leaderboard.gamerName),
      gamerName: str(raw.leaderboard.gamerName), draft: str(raw.leaderboard.draft),
      at: str(raw.leaderboard.at), seen: raw.leaderboard.seen === true,
    };
    return st;
  }
  function load() {
    try { return sanitize(JSON.parse(localStorage.getItem(STORAGE_KEY))); }
    catch { return blank(); }
  }
  /* touch = echter Fortschritt (aktualisiert updatedAt). Ohne Datenschutz-Haken wird nichts gespeichert. */
  function save(state, touch = true) {
    if (!(state.consent && state.consent.accepted)) return;
    if (touch) state.updatedAt = new Date().toISOString();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }
  function clear() { try { localStorage.removeItem(STORAGE_KEY); } catch {} }

  const taskDone = (st, id) => !!(st.tasks[id] && st.tasks[id].done);
  const hitDone = (st, id) => !!(st.boss[id] && st.boss[id].done);
  const score = st =>
    TASKS.filter(t => taskDone(st, t.id)).reduce((s, t) => s + t.points, 0) +
    BOSS.hits.filter(h => hitDone(st, h.id)).reduce((s, h) => s + h.points, 0);
  const percent = st => Math.round(score(st) / MAX * 100);
  const rank = st => RANKS.filter(([p]) => percent(st) >= p).pop()[1];

  /* Übertragungsformat: so sollen die Daten beim Team ankommen.
     Der GitHub-Token wird NIE erfasst. */
  function payload(st) {
    const tools = {};
    TASKS.forEach(t => {
      const raw = st.tasks[t.id] || {};
      tools[t.id] = t.noEmail ? { done: !!raw.done } : { done: !!raw.done, email: raw.email || null };
      if (t.id === "google") tools.google.accountType = raw.has || null; // "gmail" | "other" | "none"
      if (t.id === "gear") { tools.gear.mustHaves = (raw.items || []).length; tools.gear.bonusItems = raw.bonus || []; }
      if (t.id === "calendar") tools.calendar.app = raw.app || null; // "google" | "apple" | "outlook"
    });
    const user = (st.boss.account && st.boss.account.user) || null;
    const hits = {};
    BOSS.hits.forEach(h => { hits[h.id] = hitDone(st, h.id); });
    return {
      schemaVersion: SCHEMA_VERSION,
      participant: { name: st.name || null, defaultEmail: st.email || null },
      consent: st.consent
        ? { privacyNoticeAccepted: !!st.consent.accepted, acceptedAt: st.consent.at || null, policyUrl: st.consent.policyUrl || null }
        : { privacyNoticeAccepted: false, acceptedAt: null, policyUrl: null },
      leaderboard: st.leaderboard && st.leaderboard.optIn
        ? { optIn: true, gamerName: st.leaderboard.gamerName || null, optedInAt: st.leaderboard.at || null }
        : { optIn: false, gamerName: null, optedInAt: null },
      tools,
      github: {
        username: user,
        profileUrl: user ? `https://github.com/${user}` : null,
        hits,
        defeated: Object.values(hits).every(Boolean),
      },
      progress: { score: score(st), maxScore: MAX, percent: percent(st), rank: rank(st) },
      meta: { os: st.os, updatedAt: st.updatedAt || null },
    };
  }

  /* Gamer-Name: 3–20 Zeichen, Buchstaben/Ziffern/Leerzeichen/_/-, keine E-Mail */
  const validGamerName = n => /^[\p{L}\p{N} _-]{3,20}$/u.test((typeof n === "string" ? n : "").trim());

  /* Enthält der Gamer-Name den echten Vor- oder Nachnamen als eigenes Wort?
     „LeaRocks“, „lea_92“ → ja; „ScannerPM“ bei „Can“ → nein. */
  function containsRealName(gamer, realName) {
    const parts = str(realName).toLowerCase().split(/[\s-]+/).filter(x => x.length >= 2);
    const words = str(gamer).replace(/([\p{Ll}\p{N}])(\p{Lu})/gu, "$1 $2").toLowerCase().split(/[^\p{L}]+/u).filter(Boolean);
    const joined = words.join("");
    return parts.some(p => words.includes(p)) || (parts.length > 1 && joined.includes(parts.join("")));
  }

  /* Gemeinsame Helfer für alle Seiten */
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ICON_CDN = "https://cdn.jsdelivr.net/npm/simple-icons@13.21.0/icons/";
  const TASK_EMOJI = Object.fromEntries(TASKS.filter(t => t.emoji).map(t => [t.id, t.emoji]));
  const ICONS = { google: "google", slack: "slack", miro: "miro", figma: "figma", jira: "jira", claude: "claude", chatgpt: "openai", github: "github" };

  return { WORLDS, GEAR, RULES, CALENDAR_APPS, TASK_EMOJI, esc, ICON_CDN, ICONS, containsRealName, sanitize, clear, validGamerName, SCHEMA_VERSION, STORAGE_KEY, TASKS, BOSS, RANKS, MAX, blank, load, save, taskDone, hitDone, score, percent, rank, payload };
})();
