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

1. Account auf [github.com](https://github.com) anlegen, falls noch nicht vorhanden.
2. Beim ersten Push fragt Git nach einer Anmeldung. Dann die **Anmeldung im Browser** wählen oder einen *Personal Access Token* verwenden, **nicht** das normale GitHub-Passwort.

## 5. In der Claude-App arbeiten

Wir arbeiten direkt in der Claude-App (Code-Tab), nicht über VS Code. Das ist komfortabler: Claude legt Dateien an, committet und pusht für dich, sobald Git installiert ist.
