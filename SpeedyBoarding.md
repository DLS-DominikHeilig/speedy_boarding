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

**Worum geht es?** Wenn du (oder Claude) zum ersten Mal Code zu GitHub hochlädst („pushen“), fragt Git im Terminal nach einem Passwort. Dein normales GitHub-Passwort funktioniert dort **nicht**. Stattdessen brauchst du einen **Token**, eine Art Passwort nur für Git. Das machst du **einmal**, danach merkt sich dein Rechner die Anmeldung.

Dauer: ca. 5 Minuten.

### Teil A: Token auf GitHub erstellen

1. Bei [github.com](https://github.com) einloggen.
2. Diesen Link öffnen. Er füllt das Formular schon richtig vor:
   👉 **https://github.com/settings/tokens/new?scopes=repo&description=PM%20Bootcamp**
3. **„Confirm access“:** GitHub fragt zur Sicherheit noch einmal nach. Meist kommt ein **Code per E-Mail** (Spam-Ordner prüfen!), je nach Account auch per App oder Passkey. Code eingeben, dann **Verify** klicken.

4. Das Formular prüfen:
   - **Note:** `PM Bootcamp`, ein frei wählbarer Name, damit du den Token später wiedererkennst
   - **Expiration:** **90 days** wählen. GitHub stellt bei jedem neuen Token wieder 30 Tage ein, also bitte umstellen. **Nicht „No expiration“**: Ein Token ohne Ablaufdatum gilt ewig, falls er in falsche Hände gerät.
   - **Select scopes:** **nur `repo`** angehakt (die Unterpunkte werden automatisch mit angehakt). **Alles andere leer lassen.**

5. Ganz nach unten scrollen, dann **Generate token** klicken.

6. Den Token (beginnt mit `ghp_`) mit dem **Kopier-Symbol** daneben kopieren. **Die Seite offen lassen**, bis Teil B geklappt hat, denn der Token wird nur einmal angezeigt.

> 🔒 Den Token wie ein Passwort behandeln: **nie** in Slack, E-Mails, Chats, Screenshots oder Dateien teilen.

### Teil B: Im Terminal anmelden

**Einmal vorbereiten:** Damit Git nur nach dem Token fragt und nicht zusätzlich nach dem Benutzernamen, trägst du deinen GitHub-Benutzernamen in die Adresse deines Projekts ein. Am einfachsten bittest du Claude darum: *„Trag meinen GitHub-Benutzernamen in die Remote-URL ein.“* Oder du machst es selbst im Projektordner:

```bash
git remote set-url origin https://DEINNAME@github.com/DEINNAME/DEIN-REPO.git
```

**Dann pushen:**

1. Im Terminal in den Projektordner wechseln und pushen (ein Befehl):
   ```bash
   cd ~/Pfad/zu/deinem-projekt && git push -u origin main
   ```
2. **Erst jetzt** erscheint:
   ```
   Password for 'https://DEINNAME@github.com':
   ```
3. Den Token einfügen (Mac: **Cmd + V**, Windows: **Rechtsklick**) und **Enter** drücken.

> ⚠️ **Der wichtigste Hinweis:** Den Token **nur** einfügen, wenn `Password for …` dasteht.
> - Steht am Zeilenanfang `deinname@Mac ~ %` → das Terminal wartet auf einen **Befehl**. **Hier nicht einfügen!**
> - Steht dort `Password for …` → **hier einfügen**.
>
> 👀 **Beim Einfügen erscheint nichts**, keine Punkte, keine Sternchen. Das ist richtig so. **Siehst du den Token, ist er in der falschen Zeile:** nicht Enter drücken, sondern siehe „Wenn es nicht klappt“.

### Hat es geklappt?

Am Ende steht:

```
To https://github.com/deinname/dein-projekt.git
 * [new branch]      main -> main
branch 'main' set up to track 'origin/main'.
```

Fertig. Dein Code ist auf GitHub, und ab jetzt kann Claude ohne erneute Anmeldung pushen. Der Mac hat den Token im Schlüsselbund gespeichert.

### Wenn es nicht klappt

| Was du siehst | Bedeutung | Lösung |
|---|---|---|
| **Der Token ist auf dem Bildschirm zu sehen** | Er wurde in der falschen Zeile eingefügt (z. B. bei `Username` oder in der normalen Eingabezeile) | **Nicht Enter drücken.** **Ctrl + C** (Taste ctrl, nicht cmd), dann `clear` eingeben. Den Token auf GitHub **löschen** (Delete) und einen neuen erstellen, denn ein sichtbarer Token gilt als verbraucht. |
| `fatal: not a git repository` | Du bist im falschen Ordner | Zuerst mit `cd` in den Projektordner wechseln (siehe Teil B, Schritt 1) |
| `Username for 'https://github.com':` | Der Benutzername steht nicht in der Projekt-Adresse | Siehe „Einmal vorbereiten“ in Teil B. Oder Benutzernamen **tippen** (nicht einfügen), Enter, dann erst beim `Password` den Token einfügen. |
| `Authentication failed` / `Invalid username or token` | Token falsch, abgelaufen oder ohne Haken bei `repo` | Neuen Token erstellen (Teil A) und den Push erneut starten |
| `Repository not found` | Das Repo gibt es auf GitHub noch nicht oder der Name ist falsch geschrieben | Auf github.com prüfen, ob das Repo existiert und genauso heißt |
| Die Frage nach dem Passwort erscheint doppelt oder durcheinander | Zwei Push-Versuche laufen gleichzeitig | **Ctrl + C** (ggf. zweimal), `clear`, dann den Push **einmal** neu starten |
| Nach dem Einfügen passiert nichts | Enter vergessen | Einmal Enter drücken |
| Nach 90 Tagen klappt der Push plötzlich nicht mehr | Token abgelaufen | Neuen Token erstellen. Beim nächsten Push fragt Git wieder nach dem Passwort. |

## 6. In der Claude-App arbeiten

Wir arbeiten direkt in der Claude-App (Code-Tab), nicht über VS Code. Das ist komfortabler: Claude legt Dateien an, committet und pusht für dich, sobald Git installiert ist.
