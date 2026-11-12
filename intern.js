const FIELDS = [
  ["schemaVersion", "number", "Version dieses Formats. Aktuell " + SB.SCHEMA_VERSION + "."],
  ["participant.name", "string | null", "Vor- und Nachname aus dem Magic Link."],
  ["participant.defaultEmail", "string | null", "Standard-E-Mail von der Startseite. Wird bei jeder Aufgabe vorgeschlagen."],
  ["consent.privacyNoticeAccepted", "boolean", "Haken „Datenschutzerklärung der DL School gelesen“ auf der Startseite. Ohne Haken geht es nicht weiter."],
  ["consent.acceptedAt", "string (ISO 8601) | null", "Zeitpunkt, an dem der Haken gesetzt wurde."],
  ["leaderboard.optIn", "boolean", "Freiwillig auf der Map: im Leaderboard erscheinen. Jederzeit widerrufbar."],
  ["leaderboard.gamerName", "string | null", "Selbst gewählter Fantasiename (3–20 Zeichen). Wird abgelehnt, wenn er Teile des echten Namens enthält."],
  ["leaderboard.optedInAt", "string (ISO 8601) | null", "Zeitpunkt des Opt-ins."],
  ["consent.policyUrl", "string | null", "Version bzw. URL der Datenschutzerklärung, die galt."],
  ...SB.TASKS.map(t => [`tools.${t.id}.done`, "boolean", `${t.name}: Aufgabe abgeschlossen (+${t.points} Punkte).`]),
  ...SB.TASKS.map(t => [`tools.${t.id}.email`, "string | null", `E-Mail, die für ${t.name} genutzt wird bzw. an die wir einladen.`]),
  ["tools.google.accountType", '"gmail" | "other" | "none" | null', "Art des Google-Kontos. „other“ = Google-Konto mit Nicht-Gmail-Adresse (Posteo, Proton, eigene Domain). „none“ = musste neu angelegt werden."],
  ["github.username", "string | null", "Aus dem Profil-Link geparst (Link oder reiner Name werden akzeptiert)."],
  ["github.profileUrl", "string | null", "Normalisiert: https://github.com/&lt;username&gt;"],
  ...SB.BOSS.hits.map(h => [`github.hits.${h.id}`, "boolean", `Treffer „${h.title}“ (+${h.points}). Selbstauskunft per Haken${h.id === "account" ? ", zusätzlich Profil-Link" : ""}.`]),
  ["github.defeated", "boolean", "Alle vier Treffer erledigt."],
  ["progress.score", "number", "Erreichte Punkte."],
  ["progress.maxScore", "number", `Maximal erreichbare Punkte (aktuell ${SB.MAX}).`],
  ["progress.percent", "number", "score / maxScore in Prozent, gerundet. Die Anzeige „Wie bereit bist du?“."],
  ["progress.rank", "string", "Rang anhand der Prozent (siehe Tabelle Ränge)."],
  ["meta.os", '"mac" | "win"', "Vom Browser erkannt, von der Person umschaltbar. Steuert die Anleitungen."],
  ["meta.updatedAt", "string (ISO 8601) | null", "Zeitpunkt der letzten Änderung."],
];

// Beispielzustand: Lea hat 5 Aufgaben und 2 Treffer erledigt
const EXAMPLE = Object.assign(SB.blank(), {
  name: "Lea Müller", email: "lea@posteo.de", os: "mac", updatedAt: "2026-11-12T10:42:00.000Z",
  consent: { accepted: true, at: "2026-11-12T10:30:12.000Z", policyUrl: "https://school.digitale-leute.de/datenschutz" },
  leaderboard: { optIn: true, gamerName: "PixelQueen", at: "2026-11-12T10:41:05.000Z" },
  tasks: {
    google: { done: true, email: "lea@posteo.de", has: "other" },
    slack: { done: true, email: "lea@posteo.de" },
    miro: { done: true, email: "lea.mueller@gmail.com" },
    figma: { done: true, email: "lea@posteo.de" },
    claude: { done: true, email: "lea@posteo.de" },
  },
  boss: { account: { done: true, user: "lea-mueller" }, git: { done: true } },
});

function highlight(json) {
  return json.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]))
    .replace(/("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d+)?/g, (m, str, colon, lit) =>
      str ? (colon ? `<span class="k">${str}</span>${colon}` : `<span class="s">${str}</span>`)
          : lit ? `<span class="b">${m}</span>` : `<span class="n">${m}</span>`);
}

let tab = "example", current = "";
function render() {
  let data;
  if (tab === "example") data = SB.payload(EXAMPLE);
  else if (tab === "live") data = SB.payload(SB.load());
  else { try { data = JSON.parse(localStorage.getItem(SB.STORAGE_KEY)); } catch { data = null; } }
  current = JSON.stringify(data, null, 2);
  document.getElementById("json").innerHTML = data ? highlight(current) : '<span class="empty">Noch keine Daten in diesem Browser.</span>';
  document.getElementById("liveHint").hidden = tab === "example";
  document.querySelectorAll("[data-tab]").forEach(b => b.setAttribute("aria-pressed", b.dataset.tab === tab));
}

document.getElementById("keyName").textContent = SB.STORAGE_KEY;
document.getElementById("fields").innerHTML = FIELDS.map(([f, t, d]) => `<tr><td><code>${f}</code></td><td class="type">${t.replace(/</g, "&lt;")}</td><td>${d}</td></tr>`).join("");
document.getElementById("points").innerHTML =
  SB.TASKS.map(t => `<tr><td><code>${t.id}</code></td><td>${t.name}</td><td>${t.points}</td></tr>`).join("") +
  SB.BOSS.hits.map(h => `<tr><td><code>github.${h.id}</code></td><td>${h.title}</td><td>${h.points}</td></tr>`).join("") +
  `<tr><td colspan="2"><strong>Gesamt</strong></td><td><strong>${SB.MAX}</strong></td></tr>`;
document.getElementById("ranks").innerHTML = SB.RANKS.map(([p, r]) => `<tr><td>${p} %</td><td>${r}</td></tr>`).join("");

document.querySelectorAll("[data-tab]").forEach(b => b.onclick = () => { tab = b.dataset.tab; render(); });
document.getElementById("refresh").onclick = render;
document.getElementById("copy").onclick = e => navigator.clipboard?.writeText(current).then(() => { e.target.textContent = "Kopiert ✓"; setTimeout(() => e.target.textContent = "JSON kopieren", 1400); }).catch(() => {});
document.getElementById("download").onclick = () => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([current], { type: "application/json" }));
  a.download = `speedyboarding-${tab}.json`; a.click(); URL.revokeObjectURL(a.href);
};
render();
