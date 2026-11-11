# SpeedyBoarding – Setup für Teilnehmende

Diese Schritte bitte **vor dem ersten Kurstermin** erledigen. Einige Downloads dauern bis zu 45 Minuten. Wenn alle gleichzeitig im Kurs-WLAN laden, wird es noch langsamer.

## 1. Git installieren

**Warum?** Git ist das Programm, mit dem dein Code zu GitHub kommt. Das Terminal ist auf jedem Rechner vorhanden, **Git aber nicht**. Ohne Git kann Claude in der App nicht committen oder pushen.

> Hinweis: Wer früher mit VS Code gearbeitet hat, hat Git oft schon „nebenbei“ installiert. Wer direkt mit der Claude-App startet, bekommt es **nicht** automatisch. Deshalb diesen Schritt immer prüfen.

### Mac

1. Terminal öffnen (Cmd + Leertaste, „Terminal“ eingeben).
2. Diesen Befehl eingeben und Enter drücken:
   ```bash
   xcode-select --install
   ```
3. Im Fenster auf **„Installieren“** klicken, **nicht** auf „Xcode laden“ (das wäre die große Xcode-App mit über 10 GB, die du nicht brauchst).
4. Lizenz mit **„Akzeptieren“** bestätigen.
5. Warten, bis **„Die Software wurde installiert“** erscheint. Das dauert ungefähr 5–45 Minuten, die Zeitanzeige ist anfangs oft zu hoch. **Nicht auf „Stoppen“ klicken.**

Was hier installiert wird: die *Command Line Tools* von Apple, ein offizielles Paket mit Git und weiteren Entwickler-Werkzeugen.

**Homebrew ist keine Abkürzung:** Homebrew installiert zuerst genau dieses Paket und dauert dadurch nicht kürzer.

### Windows

1. **Git for Windows** von [git-scm.com](https://git-scm.com/download/win) herunterladen.
2. Installer ausführen, die Standardeinstellungen passen.

### Prüfen (Mac und Windows)

Im Terminal eingeben:
```bash
git --version
```
Erscheint eine Versionsnummer (z. B. `git version 2.x`), ist alles bereit. Erscheint stattdessen ein Hinweis auf fehlende Developer Tools, ist die Installation noch nicht fertig.

## 2. Git deinen Namen geben

Einmalig nach der Installation. Ohne Namen und E-Mail gibt es beim ersten Commit eine Fehlermeldung. Beides muss nicht mit GitHub übereinstimmen.

```bash
git config --global user.name "Dein Name"
git config --global user.email "deine@email.de"
```

Prüfen:
```bash
git config --global --list
```

## 3. Node.js installieren

**Warum?** Ohne Node.js laufen keine modernen Web-Projekte: Pakete installieren (`npm`), lokale Vorschau starten.

- **Mac:** Auf [nodejs.org](https://nodejs.org/en/download) die **LTS-Version** als macOS-Installer (.pkg) laden und installieren.
- **Windows:** Auf [nodejs.org](https://nodejs.org/en/download) die **LTS-Version** als Windows-Installer (.msi) laden, installieren und danach die PowerShell neu öffnen.

Prüfen:
```bash
node --version
```

## 4. GitHub-Account

1. Auf [github.com/signup](https://github.com/signup) registrieren und den kostenlosen Plan (**Free**) wählen.
2. E-Mail bestätigen.
3. **Benutzernamen merken.** Du brauchst ihn gleich und bei jedem Projekt.

Schon einen Account? Weiter zu Schritt 5.

## 5. GitHub mit deinem Rechner verbinden (Schritt für Schritt)

**Worum geht es?** Wenn du (oder Claude) zum ersten Mal Code zu GitHub hochlädst („pushen“), fragt Git im Terminal: *Wer bist du?* Dein normales GitHub-Passwort funktioniert dort **nicht**. Stattdessen brauchst du einen **Token**, eine Art Passwort nur für Git. Das machst du **einmal**, danach merkt sich dein Rechner die Anmeldung.

### Teil A: Token auf GitHub erstellen (ca. 2 Minuten)

1. Auf [github.com](https://github.com) einloggen.
2. Oben rechts auf dein **Profilbild** klicken, dann **Settings**.
3. In der linken Spalte ganz nach unten scrollen, dann **Developer settings**.
4. **Personal access tokens**, dann **Tokens (classic)**.
5. Oben rechts auf **Generate new token**, dann **Generate new token (classic)**.
6. Ausfüllen:
   - **Note:** ein Name, z. B. `Mein Laptop`
   - **Expiration:** wie lange der Token gilt, z. B. `90 days` (mindestens bis Kursende)
   - **Select scopes:** Haken bei **`repo`** setzen (die anderen nicht nötig)
7. Ganz unten auf **Generate token** klicken.
8. Den grünen Code, der mit `ghp_` beginnt, **sofort kopieren**.

> ⚠️ Der Token wird **nur einmal** angezeigt. Wenn du die Seite verlässt, ohne ihn kopiert zu haben, einfach einen neuen erstellen.
>
> 🔒 Den Token wie ein Passwort behandeln: nicht in Slack, E-Mails oder Dateien teilen.

### Teil B: Im Terminal anmelden

Beim ersten Push erscheint im Terminal:

```
Username for 'https://github.com':
```

1. Ins Terminal klicken.
2. Deinen **GitHub-Benutzernamen** eintippen (nicht die E-Mail) und **Enter** drücken.
3. Jetzt erscheint:
   ```
   Password for 'https://deinname@github.com':
   ```
4. Den **Token** einfügen (Mac: Cmd + V, Windows: Rechtsklick) und **Enter** drücken.

> 👀 **Beim Einfügen erscheint nichts**, keine Punkte, keine Sternchen. Das ist normal. Einfach einmal einfügen und Enter drücken.

### Hat es geklappt?

Am Ende steht so etwas wie:

```
To https://github.com/deinname/dein-projekt.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

Fertig. Dein Code ist auf GitHub, und ab jetzt kann Claude ohne erneute Anmeldung pushen.

### Wenn es nicht klappt

| Meldung | Bedeutung | Lösung |
|---|---|---|
| `Authentication failed` / `Invalid username or token` | Token falsch, abgelaufen oder ohne Haken bei `repo` | Neuen Token erstellen (Teil A) und den Push erneut starten |
| `Repository not found` | Das Repo gibt es auf GitHub noch nicht oder der Name ist falsch geschrieben | Auf github.com prüfen, ob das Repo existiert und genauso heißt |
| Terminal fragt gar nicht, sondern bricht ab | Ein alter, falscher Login ist gespeichert | Mac: Schlüsselbundverwaltung öffnen, nach `github.com` suchen, Eintrag löschen, Push erneut starten |
| Es passiert nichts nach dem Einfügen | Enter vergessen | Einmal Enter drücken |

## 6. In der Claude-App arbeiten

Wir arbeiten direkt in der Claude-App (Code-Tab), nicht über VS Code. Das ist komfortabler: Claude legt Dateien an, committet und pusht für dich, sobald Git installiert ist.
