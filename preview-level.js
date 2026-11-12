/* Vorschau Erfahrungslevel – eigenständige Demo, nicht mit dem Spielstand verbunden. */
(() => {
  const LEVELS = [
    { v: 0, lbl: "Nie benutzt" },
    { v: 1, lbl: "Mal reingeschaut" },
    { v: 2, lbl: "Nutze ich ab und zu" },
    { v: 3, lbl: "Check ich" },
  ];
  // Demo-Kohorte: Anzahl Personen je Level 0–3 (12 Personen, ohne dich)
  const TEAM = [
    { app: "Slack", d: [0, 2, 5, 5] },
    { app: "Miro", d: [2, 3, 5, 2] },
    { app: "Figma", d: [4, 4, 3, 1], me: true },
    { app: "Jira", d: [6, 4, 2, 0] },
    { app: "GitHub", d: [7, 3, 2, 0] },
  ];
  const COLORS = ["#F2284B", "#F5C451", "#6B9EF7", "#1B7A6A"];

  const deck = document.getElementById("deck");
  const howto = document.getElementById("howto");
  const video = document.getElementById("video");
  const team = document.getElementById("team");
  let level = null;

  const pips = v => `<span class="pips">${[1, 2, 3].map(i => `<i class="${i <= v ? "on" : ""}"></i>`).join("")}</span>`;

  deck.innerHTML = LEVELS.map(l => `
    <button class="pcard" type="button" data-v="${l.v}" aria-pressed="false">
      <span class="idx tl">${l.v}</span>
      <span class="lbl">${l.lbl}</span>
      ${pips(l.v)}
      <span class="idx br">${l.v}</span>
    </button>`).join("");

  function renderTeam() {
    team.innerHTML = TEAM.map(r => {
      const d = r.d.slice();
      if (r.me && level !== null) d[level]++;
      const n = d.reduce((a, b) => a + b, 0);
      const avg = d.reduce((a, c, i) => a + c * i, 0) / n;
      const full = Math.round(avg);
      return `<tr${r.me ? ' style="font-weight:700"' : ""}>
        <td>${r.app}${r.me && level !== null ? ' <span style="color:var(--soft);font-weight:600">(+ du)</span>' : ""}</td>
        <td><span class="bar">${[1, 2, 3].map(i => `<i class="${i <= full ? "on" : ""}"></i>`).join("")}</span>${avg.toFixed(1).replace(".", ",")}</td>
        <td class="hide-m"><div class="dist">${d.map((c, i) => `<span style="flex:${c};background:${COLORS[i]}" title="Level ${i}: ${c}"></span>`).join("")}</div></td>
      </tr>`;
    }).join("");
  }

  deck.addEventListener("click", e => {
    const btn = e.target.closest(".pcard");
    if (!btn) return;
    level = Number(btn.dataset.v);
    deck.classList.add("picked");
    deck.querySelectorAll(".pcard").forEach(c => {
      const on = c === btn;
      c.setAttribute("aria-pressed", String(on));
      c.classList.toggle("flip", on);
    });
    howto.open = level < 2;
    video.className = level === 0 ? "note hot" : "note info";
    document.getElementById("combo").classList.toggle("speedrun", level >= 2);
    renderTeam();
  });

  // Deine Angabe: E-Mail ist für alle Pflicht, egal welches Level
  const mail = document.getElementById("tmail");
  const confirm = document.getElementById("tconfirm");
  const doneBtn = document.getElementById("tdone");
  const status = document.getElementById("tstatus");
  const ready = () => { doneBtn.disabled = !(mail.checkValidity() && mail.value.trim() && confirm.checked); };
  mail.addEventListener("input", ready);
  confirm.addEventListener("change", ready);
  doneBtn.addEventListener("click", () => {
    status.innerHTML = '<span class="done-banner">✓ +50 Punkte (Demo)</span>';
    doneBtn.dataset.done = "1";
    doneBtn.textContent = "Zur Map →";
  });
  deck.addEventListener("animationend", e => e.target.classList.remove("flip"));

  renderTeam();
})();
