const ICON_CDN = SB.ICON_CDN, ICONS = SB.ICONS;
const icon = id => SB.TASK_EMOJI[id] ? `<span class="emoji-icon" aria-hidden="true">${SB.TASK_EMOJI[id]}</span>` : `<img src="${ICON_CDN}${ICONS[id]}.svg" alt="">`;
const DAY = 864e5, NOW = Date.now();

/* ---------- Demo-Kohorte (erfundene Personen) ---------- */
function seeded(seed) { return () => (seed = (seed * 16807) % 2147483647) / 2147483647; }
const DEMO = [
  ["Lea Müller", .95, 0], ["Jonas Becker", .9, 1], ["Amira Haddad", 1, 0], ["Tim Schröder", .5, 4],
  ["Sophie Wagner", .8, 1], ["Can Yılmaz", .7, 2], ["Marie Hoffmann", .35, 6], ["Felix Neumann", 1, 0],
  ["Nina Krause", .6, 3], ["David Okafor", .85, 1], ["Anna-Lena Vogt", .2, 8], ["Malte Brandt", .75, 2],
].map(([name, p, ago], i) => {
  const r = seeded(i + 7);
  const first = name.split(" ")[0].toLowerCase().replace("ı", "i");
  const mail = `${first}.${name.split(" ")[1].toLowerCase().replace(/ö/g, "oe").replace(/ü/g, "ue").replace("ı", "i")}@example.de`;
  const st = Object.assign(SB.blank(), { name, email: mail, os: r() < .7 ? "mac" : "win",
    consent: { accepted: true, at: new Date(NOW - (ago + 5) * DAY).toISOString(), policyUrl: "https://school.digitale-leute.de/datenschutz" },
    updatedAt: new Date(NOW - ago * DAY - r() * DAY / 2).toISOString() });
  const GAMER = ["PixelQueen", null, "AmiraAgile", "TurboTim42", "BacklogBoss", null, null, "FelixFlow", "NinjaNina", "RoadmapRanger", null, "SprintPilot"][i];
  if (GAMER) st.leaderboard = { optIn: true, gamerName: GAMER, at: st.consent.at };
  SB.TASKS.forEach(t => {
    if (r() >= p + .1) return;
    if (t.id === "gear") st.tasks.gear = { done: true, items: SB.GEAR.must.map(g => g.id), bonus: SB.GEAR.bonus.filter(() => r() < .5).map(g => g.id) };
    else if (t.id === "rules") st.tasks.rules = { done: true, seen: SB.RULES.map(x => x.id), pledge: true };
    else if (t.id === "calendar") st.tasks.calendar = { done: true, app: SB.CALENDAR_APPS[Math.floor(r() * 3)], confirmed: true };
    else st.tasks[t.id] = { done: true, email: t.id === "miro" && r() < .3 ? `${first}@gmail.com` : mail, ...(t.id === "google" ? { has: r() < .5 ? "gmail" : "other" } : {}) };
  });
  const hits = p >= 1 ? 4 : Math.min(4, Math.floor(r() * 5 * p));
  SB.BOSS.hits.slice(0, hits).forEach(h => { st.boss[h.id] = h.id === "account" ? { done: true, user: first + "-" + (100 + i) } : { done: true }; });
  return { ...SB.payload(st), _src: "demo" };
});

let rows = DEMO.slice();
let sortKey = "percent", sortDir = -1;

const esc = SB.esc;
const shortName = n => { const [f, ...rest] = (n || "?").split(/\s+/); const l = rest.pop(); return l ? `${f} ${l[0]}.` : f; };
function ago(iso) {
  if (!iso) return ["–", false];
  const d = (NOW - Date.parse(iso)) / DAY;
  return [d < 1 ? "heute" : d < 2 ? "gestern" : `vor ${Math.floor(d)} Tagen`, d > 3];
}

function render() {
  const q = document.getElementById("q").value.trim().toLowerCase();
  const onlyOpen = document.getElementById("open").checked, onlyStale = document.getElementById("stale").checked;
  let list = rows.filter(p => {
    const hay = [p.participant.name, p.participant.defaultEmail, ...Object.values(p.tools).map(t => t.email), p.github.username].join(" ").toLowerCase();
    return (!q || hay.includes(q)) && (!onlyOpen || p.progress.percent < 100) && (!onlyStale || ago(p.meta.updatedAt)[1]);
  });
  const val = p => sortKey === "name" ? (p.participant.name || "").toLowerCase() : sortKey === "updated" ? Date.parse(p.meta.updatedAt || 0) : p.progress.percent;
  list.sort((a, b) => (val(a) > val(b) ? 1 : val(a) < val(b) ? -1 : 0) * sortDir);

  // KPIs (über alle, nicht gefiltert)
  const n = rows.length, avg = n ? Math.round(rows.reduce((s, p) => s + p.progress.percent, 0) / n) : 0;
  const ready = rows.filter(p => p.progress.percent === 100).length;
  const boss = rows.filter(p => !p.github.defeated).length;
  const stale = rows.filter(p => ago(p.meta.updatedAt)[1] && p.progress.percent < 100).length;
  document.getElementById("kpis").innerHTML = `
    <div class="kpi"><strong>${n}</strong><span>Teilnehmende</span></div>
    <div class="kpi petrol"><strong>${avg} %</strong><span>Kohorte im Schnitt startklar · ${ready} komplett</span></div>
    <div class="kpi red"><strong>${boss}</strong><span>noch nicht durch den GitHub-Endboss</span></div>
    <div class="kpi"><strong>${stale}</strong><span>seit über 3 Tagen inaktiv und nicht fertig</span></div>`;

  // Erledigt-Quote pro App (über alle, nicht gefiltert)
  const COLS = [...SB.TASKS.map(t => ({ id: t.id, name: t.name, done: p => p.tools[t.id].done })),
    { id: "github", name: "GitHub (Endboss)", done: p => p.github.defeated }];
  const stats = COLS.map(c => { const count = rows.filter(c.done).length; return { ...c, count, pct: n ? Math.round(count / n * 100) : 0 }; });
  const minPct = Math.min(...stats.map(x => x.pct));
  const worst = new Set(n && minPct < 100 ? stats.filter(x => x.pct === minPct).map(x => x.id) : []);
  // Schwächste normale App (ohne Endboss), weil GitHub fast immer Schlusslicht ist
  const appStats = stats.filter(x => x.id !== "github");
  const minApp = Math.min(...appStats.map(x => x.pct));
  const weak = new Set(n && minApp < 100 ? appStats.filter(x => x.pct === minApp && !worst.has(x.id)).map(x => x.id) : []);
  const lvl = v => v < 50 ? "low" : v < 80 ? "mid" : "high";
  const S = Object.fromEntries(stats.map(x => [x.id, x]));
  const thApp = (id, label) => `<th class="${worst.has(id) ? "worst" : weak.has(id) ? "weak" : ""}">${icon(id)}${label}<span class="pct ${lvl(S[id].pct)}">${S[id].pct}%</span>${worst.has(id) ? `<span class="worst-tag"><span class="emo">😬</span>am wenigsten</span>` : weak.has(id) ? `<span class="worst-tag weak-tag"><span class="emo">⚠️</span>schwächste Aufgabe</span>` : ""}</th>`;
  const wc = id => worst.has(id) ? " worst" : weak.has(id) ? " weak" : "";

  document.getElementById("rank").innerHTML = `<h2><span class="emo">🧭</span>Wo hakt's?</h2>
    <p class="sub">Erledigt-Quote pro App, die schwächste zuerst. Hier wird die Kohorte am meisten Hilfe brauchen.</p>
    <div class="rank">${stats.slice().sort((a, b) => a.pct - b.pct || a.name.localeCompare(b.name)).map(x => `
      <div class="rank-row${worst.has(x.id) ? " worst" : weak.has(x.id) ? " weak" : ""}">
        <span class="rank-name">${icon(x.id)}${x.name}</span>
        <span class="rank-bar"><i class="${lvl(x.pct)}" style="width:${Math.max(x.pct, 2)}%"></i></span>
        <span class="rank-val">${x.pct}%</span><span class="rank-n">${x.count}/${n}</span>
        <span class="rank-tag">${worst.has(x.id) ? `<span class="emo">😬</span>Seelisch-moralisch vorbereiten` : weak.has(x.id) ? `<span class="emo">⚠️</span>Schwächste Aufgabe` : ""}</span>
      </div>`).join("")}</div>`;

  const arr = k => sortKey === k ? `<span class="arr">${sortDir > 0 ? "▲" : "▼"}</span>` : "";
  document.getElementById("thead").innerHTML = `<tr>
    <th class="name sort" data-sort="name">Name${arr("name")}</th>
    <th class="sort" data-sort="percent">Startklar${arr("percent")}</th>
    ${SB.TASKS.map(t => thApp(t.id, t.name)).join("")}
    ${thApp("github", "GitHub")}
    <th>Punkte</th>
    <th class="sort" data-sort="updated">Zuletzt${arr("updated")}</th></tr>`;

  document.getElementById("tbody").innerHTML = list.map(p => {
    const [when, isStale] = ago(p.meta.updatedAt);
    const hits = Object.values(p.github.hits);
    return `<tr>
      <td class="name"><strong>${esc(p.participant.name)}${p._src !== "demo" ? `<span class="src">${esc(p._src)}</span>` : ""}</strong><small>${esc(p.participant.defaultEmail || "–")}</small>${p.leaderboard && p.leaderboard.optIn ? `<small class="gn"><span class="emo">🏆</span>${esc(p.leaderboard.gamerName)}</small>` : ""}</td>
      <td><div class="prog"><div class="bar"><i style="width:${Number(p.progress.percent) || 0}%"></i></div><b>${Number(p.progress.percent) || 0}%</b></div></td>
      ${SB.TASKS.map(t => { const x = p.tools[t.id]; return `<td class="${wc(t.id)}">${x.done ? `<span class="ok" title="${esc(x.email || (t.id === "calendar" ? x.app : t.id === "gear" ? `Bonus: ${(x.bonusItems || []).length}` : "") || "")}${t.id === "google" && x.accountType ? " · " + esc(x.accountType) : ""}">✓</span>` : `<span class="no">·</span>`}</td>`; }).join("")}
      <td class="${wc("github")}" title="${esc(p.github.username ? p.github.profileUrl : "noch kein Profil")}"><span class="pips${p.github.defeated ? " full" : ""}">${hits.map(h => `<i class="${h ? "on" : ""}"></i>`).join("")}</span></td>
      <td class="pts">${Number(p.progress.score) || 0}</td>
      <td class="when${isStale && p.progress.percent < 100 ? " stale" : ""}">${when}</td></tr>`;
  }).join("") || `<tr><td colspan="${SB.TASKS.length + 5}" class="sub">Keine Treffer.</td></tr>`;

  document.getElementById("tfoot").innerHTML = `<tr><td class="name">Erledigt</td><td></td>
    ${[...SB.TASKS.map(t => t.id), "github"].map(id => `<td class="${wc(id)}">${S[id].count}/${n}</td>`).join("")}<td></td><td></td></tr>`;

  const lbRows = rows.filter(p => p.leaderboard && p.leaderboard.optIn && p.leaderboard.gamerName);
  document.getElementById("lbInfo").textContent = `${lbRows.length} von ${n} haben zugestimmt.`;
  document.getElementById("lb").innerHTML = lbRows.slice().sort((a, b) => b.progress.score - a.progress.score || Date.parse(a.meta.updatedAt) - Date.parse(b.meta.updatedAt))
    .slice(0, 5).map(p => `<li><span class="nm">${esc(p.leaderboard.gamerName)}</span><span class="pts">${Number(p.progress.score) || 0} P</span></li>`).join("");

  document.querySelectorAll("[data-sort]").forEach(th => th.onclick = () => {
    const k = th.dataset.sort; sortDir = sortKey === k ? -sortDir : (k === "name" ? 1 : -1); sortKey = k; render();
  });
}

/* CSV mit Schutz gegen Formel-Injection in Tabellenprogrammen */
function cell(v) { v = String(v ?? ""); if (/^[=+\-@\t\r]/.test(v)) v = "'" + v; return `"${v.replace(/"/g, '""')}"`; }
document.getElementById("csv").onclick = () => {
  const head = ["Name", "Startklar %", "Punkte", ...SB.TASKS.flatMap(t => t.noEmail ? [`${t.name} erledigt`] : [`${t.name} erledigt`, `${t.name} E-Mail`]), "GitHub-Benutzername", "GitHub-Profil", "GitHub Treffer", "Zuletzt aktiv"];
  const lines = rows.map(p => [p.participant.name, p.progress.percent, p.progress.score,
    ...SB.TASKS.flatMap(t => t.noEmail ? [p.tools[t.id].done ? "ja" : "nein"] : [p.tools[t.id].done ? "ja" : "nein", p.tools[t.id].email || ""]),
    p.github.username || "", p.github.profileUrl || "", Object.values(p.github.hits).filter(Boolean).length, p.meta.updatedAt || ""].map(cell).join(";"));
  const blob = new Blob(["﻿" + [head.map(cell).join(";"), ...lines].join("\n")], { type: "text/csv;charset=utf-8" });
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "speedyboarding-ergebnisse.csv"; a.click(); URL.revokeObjectURL(a.href);
};

/* Fremde Payloads nie ungeprüft anzeigen: in einen Spielstand zurückführen und Punkte selbst neu berechnen.
   So kommen nur bekannte Felder mit sauberen Typen in die Tabelle. */
const isObj = v => v !== null && typeof v === "object" && !Array.isArray(v);
function normalizePayload(p) {
  if (!isObj(p) || !isObj(p.participant) || !isObj(p.tools)) throw new Error("Das sieht nicht nach einem SpeedyBoarding-Payload aus.");
  const gh = isObj(p.github) ? p.github : {}, hits = isObj(gh.hits) ? gh.hits : {};
  const user = typeof gh.username === "string" && /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(gh.username) ? gh.username : null;
  const lb = isObj(p.leaderboard) ? p.leaderboard : {};
  const meta = isObj(p.meta) ? p.meta : {};
  const raw = {
    name: p.participant.name, email: p.participant.defaultEmail, os: meta.os,
    updatedAt: typeof meta.updatedAt === "string" && !isNaN(Date.parse(meta.updatedAt)) ? meta.updatedAt : null,
    consent: isObj(p.consent) && p.consent.privacyNoticeAccepted === true ? { accepted: true, at: p.consent.acceptedAt, policyUrl: p.consent.policyUrl } : null,
    leaderboard: { optIn: lb.optIn === true, gamerName: lb.gamerName, at: lb.optedInAt },
    tasks: Object.fromEntries(SB.TASKS.map(t => { const x = isObj(p.tools[t.id]) ? p.tools[t.id] : {}; return [t.id, { done: x.done === true, email: x.email, has: x.accountType }]; })),
    boss: Object.fromEntries(SB.BOSS.hits.map(h => [h.id, { done: hits[h.id] === true, ...(h.id === "account" && user ? { user } : {}) }])),
  };
  return SB.payload(SB.sanitize(raw));
}
function addPayload(p, src) {
  const clean = normalizePayload(p);
  rows = rows.filter(r => r._src === "demo" || r.participant.name !== clean.participant.name);
  rows.push({ ...clean, _src: src });
  render();
}
document.getElementById("mine").onclick = () => {
  const st = SB.load();
  if (!st.name && !st.email && !Object.keys(st.tasks).length) { alert("In diesem Browser gibt es noch keinen Spielstand. Spiel zuerst das SpeedyBoarding."); return; }
  if (!st.name) st.name = "Du (ohne Namen)";
  addPayload(SB.payload(st), "du");
};
document.getElementById("addjson").onclick = () => {
  const m = document.getElementById("jsonmsg");
  try { addPayload(JSON.parse(document.getElementById("json").value), "importiert"); m.textContent = "✓ Hinzugefügt"; }
  catch (e) { m.textContent = e.message.startsWith("Das") ? e.message : "Kein gültiges JSON."; }
};
document.getElementById("reset").onclick = () => { rows = DEMO.slice(); render(); };
["q", "open", "stale"].forEach(id => document.getElementById(id).addEventListener("input", render));
render();
