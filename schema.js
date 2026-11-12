/* =========================================================
   SpeedyBoarding – Datenmodell (gemeinsam für index.html und intern.html)

   Einzige Quelle für: Aufgaben-IDs, Punkte, Ränge, Speicher-Schlüssel
   und das Format, in dem die Daten später übertragen werden (payload).
   ========================================================= */
window.SB = (() => {
  const SCHEMA_VERSION = 1;
  const STORAGE_KEY = "speedyboarding-v2";

  const TASKS = [
    { id: "google",  name: "Google",  points: 50 },
    { id: "slack",   name: "Slack",   points: 50 },
    { id: "miro",    name: "Miro",    points: 50 },
    { id: "figma",   name: "Figma",   points: 50 },
    { id: "jira",    name: "Jira",    points: 50 },
    { id: "claude",  name: "Claude",  points: 50 },
    { id: "chatgpt", name: "ChatGPT", points: 50 },
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
    updatedAt: null,
  });
  function load() {
    try { return Object.assign(blank(), JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}); }
    catch { return blank(); }
  }
  function save(state) {
    state.updatedAt = new Date().toISOString();
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  }

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
      tools[t.id] = { done: !!raw.done, email: raw.email || null };
      if (t.id === "google") tools.google.accountType = raw.has || null; // "gmail" | "other" | "none"
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

  return { SCHEMA_VERSION, STORAGE_KEY, TASKS, BOSS, RANKS, MAX, blank, load, save, taskDone, hitDone, score, percent, rank, payload };
})();
