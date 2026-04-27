import type { CourseSection } from "./courseContentTypes";

/** requirements.txt tartalma */
const requirementsTxt = `python-dotenv
python-telegram-bot
requests`;

/** Python script – BTC ár lekérése + Telegram küldés */
const pythonBtcTelegram = `import os
import requests
from dotenv import load_dotenv
from telegram import Bot

load_dotenv()

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")

# Bitcoin ár lekérése a CoinGecko API-ból
response = requests.get(
    "https://api.coingecko.com/api/v3/simple/price",
    params={"ids": "bitcoin", "vs_currencies": "usd"},
)
response.raise_for_status()
price = response.json()["bitcoin"]["usd"]

# Üzenet összeállítása és küldése Telegram-ra
message = f"BTC \\u2248 {price:,} USD (CoinGecko)"
bot = Bot(token=TELEGRAM_BOT_TOKEN)
bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=message)

print(f"Sent: {message}")`;

/** YAML – Python scriptet futtat; titkok: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID */
const workflowBtcTelegram = [
  "name: Bitcoin price to Telegram",
  "",
  "on:",
  "  schedule:",
  '    - cron: "0 * * * *"   # minden óra elején UTC',
  "  workflow_dispatch: {}   # kézi futtatás: Actions → Run workflow",
  "",
  "jobs:",
  "  notify:",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - name: Checkout",
  "        uses: actions/checkout@v4",
  "",
  "      - name: Install Python dependencies",
  "        run: pip install -r requirements.txt",
  "",
  "      - name: Run BTC Telegram script",
  "        env:",
  "          TELEGRAM_BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}",
  "          TELEGRAM_CHAT_ID: ${{ secrets.TELEGRAM_CHAT_ID }}",
  "        run: python3 scripts/btc_telegram.py",
].join("\n");

/** Bun build → GitHub Pages artifact/deploy (hivatalos GitHub actions flow) */
const workflowViteGhPages = [
  "name: Deploy to GitHub Pages",
  "",
  "on:",
  '  push:',
  '    branches: ["main"]',
  "  workflow_dispatch:",
  "",
  "permissions:",
  "  contents: read",
  "  pages: write",
  "  id-token: write",
  "",
  "concurrency:",
  '  group: "pages"',
  "  cancel-in-progress: false",
  "",
  "jobs:",
  "  build:",
  "    runs-on: ubuntu-latest",
  "    steps:",
  "      - name: Checkout",
  "        uses: actions/checkout@v4",
  "      - name: Setup Bun",
  "        uses: oven-sh/setup-bun@v2",
  "        with:",
  "          bun-version: latest",
  "      - name: Install dependencies",
  "        run: bun install",
  "      - name: Build",
  "        run: bun run build",
  "      - name: Upload artifact",
  "        uses: actions/upload-pages-artifact@v3",
  "        with:",
  "          path: './dist'",
  "",
  "  deploy:",
  "    environment:",
  "      name: github-pages",
  "      url: ${{ steps.deployment.outputs.page_url }}",
  "    runs-on: ubuntu-latest",
  "    needs: build",
  "    steps:",
  "      - name: Deploy to GitHub Pages",
  "        id: deployment",
  "        uses: actions/deploy-pages@v4",
].join("\n");

export const githubAndDeploySection: CourseSection = {
  id: "github-and-deploy",
  title: {
    hu: "4. szekció – GitHub, Actions, Pages, Vercel",
    en: "Section 4 – GitHub, Actions, Pages, Vercel",
  },
  lessons: [
    {
      id: "github-introduction",
      format: "mixed",
      title: {
        hu: "4.1 Mi az a GitHub? (a kockák Instagramja)",
        en: "4.1 What is GitHub? (Instagram for developers)",
      },
      summary: {
        hu: "Repository, verziókezelés, open source, privát/publikus tárolás, titkok – és egy demó videó.",
        en: "Repositories, version control, open source, public/private storage, secrets—and a demo video.",
      },
      duration: "35–45 perc + videó",
      videoUrl: "https://www.youtube.com/embed/RGOj5yH7evk",
      markdown: {
        hu: `## A GitHub a kockák Instagramja

A **GitHub** egy felhőalapú platform, amely a **Git** verziókezelő rendszerre épül. Lehetővé teszi projektek tárolását, a változások nyomon követését, és csapatok közötti együttműködést – mindezt egy webes felületen keresztül.

Ebben a kurzusban a GitHub három fő funkcióját fogjuk használni:

- **Kódtárolás** – a Lovable-ből exportált projekted ide kerül
- **GitHub Actions** – automatikusan buildeli és frissíti az oldalad minden feltöltés (push) után
- **GitHub Pages** – ingyenesen kiszolgálja a weboldaladat a világ számára

---

## Repository (repo)

A **repository** (röviden: **repo**) a GitHub alapegysége. Egy repo tartalmazza:

- A projekt **összes fájlját** (forráskód, képek, konfigurációk)
- A fájlok **teljes változástörténetét** (minden módosítás időbélyeggel és leírással)
- **Beállításokat** (jogosultságok, titkos kulcsok, automatizációk)

**Két típusa van:**

| Típus | Láthatóság | Jellemző felhasználás |
|-------|-----------|----------------------|
| **Publikus** | Bárki megtekintheti | Portfolió, nyílt projektek, oktatási anyagok |
| **Privát** | Csak meghívott felhasználók látják | Személyes projektek, fejlesztés alatt álló munkák |

A Lovable-ből exportált projekted egy ilyen repository-ban fog élni.

---

## Verziókezelés (Git)

A **Git** egy verziókezelő rendszer, amely rögzíti a fájlok változásait. A **GitHub** ezt a rendszert teszi elérhetővé a felhőben.

**Három alapfogalom:**

- **Commit** – egy mentési pont üzenettel. Példa: *„Hero szekció hozzáadva”*, *„Navigáció javítva”*
- **Push** – a helyi módosítások feltöltése a GitHub szerverre
- **Pull** – a legfrissebb változtatások letöltése a GitHub szerverről

**A verziókezelés előnye:** bármilyen módosítás visszavonható. Ha egy változtatás hibát okoz, visszaállítható az utolsó működő állapot.

---

## Open source

Az **open source** (nyílt forráskód) azt jelenti, hogy egy projekt forráskódja nyilvánosan elérhető. A GitHubon milliónyi nyílt projekt található – böngészők, operációs rendszerek, keretrendszerek.

A nyílt projektek licence (pl. MIT, GPL) határozza meg, hogy milyen feltételekkel használhatók. A saját projekted természetesen lehet **privát** is.

---

## Secrets (titkos kulcsok)

**API kulcsok**, **tokenek** és **jelszavak** soha nem kerülhetnek a forráskódba – különösen publikus repóknál, ahol bárki megtekintheti a fájlokat.

A GitHub erre biztosítja a **Secrets** funkciót:

1. **Settings → Secrets and variables → Actions** menüben tárolhatod a titkos értékeket
2. A workflow fájlokból a \`\${{ secrets.NEV }}\` szintaxissal hivatkozol rájuk
3. A futási logokban automatikusan **maszkolva** jelennek meg

A következő leckében egy konkrét példán (Bitcoin ár → Telegram üzenet) keresztül bemutatjuk a titkos kulcsok használatát.

---

## Demó videó

Az alábbi videó általános Git és GitHub bevezető – cserélhető saját felvételre.

---

## Gyakorlat

1. Ha még nincs GitHub fiókod: regisztrálj a [github.com](https://github.com) oldalon
2. Hozz létre egy teszt repót (publikus, üres README-vel)
3. Tekintsd meg a **Settings** menüt és keresd meg a **Secrets** szekciót
`,
        en: `## GitHub is Instagram for developers

**GitHub** is a cloud-based platform built on the **Git** version control system. It enables project storage, change tracking, and team collaboration — all through a web interface.

In this course, we will use three core GitHub features:

- **Code storage** — your Lovable-exported project will live here
- **GitHub Actions** — automatically builds and updates your site after every push
- **GitHub Pages** — serves your website to the world, free of charge

---

## Repository (repo)

A **repository** (or **repo**) is the fundamental unit of GitHub. A repo contains:

- All **project files** (source code, images, configuration)
- The **full change history** of those files (every modification with a timestamp and description)
- **Settings** (permissions, secret keys, automations)

**Two visibility types:**

| Type | Visibility | Typical use |
|------|-----------|-------------|
| **Public** | Anyone can view | Portfolios, open projects, educational materials |
| **Private** | Only invited users can see | Personal projects, work in progress |

Your Lovable-exported project will live in one of these repositories.

---

## Version control (Git)

**Git** is a version control system that records file changes over time. **GitHub** makes this system accessible in the cloud.

**Three core concepts:**

- **Commit** — a save point with a descriptive message. Example: *”Added hero section”*, *”Fixed navigation”*
- **Push** — uploading local changes to the GitHub server
- **Pull** — downloading the latest changes from the GitHub server

**The benefit of version control:** any change can be reversed. If a modification causes an issue, you can restore the last working state.

---

## Open source

**Open source** means a project's source code is publicly available. GitHub hosts millions of open projects — browsers, operating systems, frameworks.

Each open project's license (e.g., MIT, GPL) defines how it may be used. Your own project can remain **private** if you prefer.

---

## Secrets

**API keys**, **tokens**, and **passwords** must never be placed in source code — especially in public repos where anyone can view the files.

GitHub provides the **Secrets** feature for this:

1. Store secret values under **Settings → Secrets and variables → Actions**
2. Reference them in workflow files using \`\${{ secrets.NAME }}\`
3. They appear **masked** in run logs automatically

The next lesson demonstrates secret usage through a concrete example (Bitcoin price → Telegram message).

---

## Demo video

The embedded video is a general Git and GitHub introduction — replace with your own recording as needed.

---

## Exercise

1. If you don't have a GitHub account yet: register at [github.com](https://github.com)
2. Create a test repository (public, with an empty README)
3. Explore the **Settings** menu and locate the **Secrets** section
`,
      },
    },
    {
      id: "github-actions-bitcoin-telegram",
      format: "mixed",
      title: {
        hu: "4.2 GitHub Actions – ütemezés, titkok, példa (BTC → Telegram)",
        en: "4.2 GitHub Actions – scheduling, secrets, example (BTC → Telegram)",
      },
      summary: {
        hu: "Mi az a workflow? Cron, kézi futtatás, Telegram + Bitcoin ár – teljes YAML magyarázattal.",
        en: "Workflows, cron, manual dispatch, Telegram + Bitcoin price—with a full YAML walkthrough.",
      },
      duration: "40–50 perc + videó",
      videoUrl: "https://www.youtube.com/embed/1h59Q8uuSTs",
      markdown: {
        hu: `## Mi az a GitHub Actions?

A **GitHub Actions** egy **automatizációs motor** a repóban: **workflow** fájlokban leírod, **mikor** és **mit** futtasson a GitHub (virtuális gépen, **runner**en).

**Tipikus esetek:**

- **CI:** teszt + build minden pushra
- **Ütemezés:** pl. **óránként** lefutó feladat (\`schedule\` + **cron**)
- **Deploy:** build után feltöltés GitHub Pages-re vagy másra
- **Kézi indítás:** \`workflow_dispatch\` – gombbal elindítható

**Miért jó?** Nem a saját gépeden kell cron-t üzemeltetni; a GitHub **ingyenes kvótáig** (csomagtól függően) futtatja.

---

## Mire jó a cron és a kézi futtatás?

- **\`schedule\`:** „**minden órában** küldj egy üzenetet” – a példában **Coingecko** publikus API-ból kérjük a **Bitcoin** árát, és **Telegram**on küldjük el.
- **\`workflow_dispatch\`:** az **Actions** fülön **Run workflow** – teszteléshez, vagy ha nem akarsz várni az órára.

---

## Titkok (Secrets) a példában

A **Telegram Bot API** token és a **chat ID** **nem** mehet a YAML szövegébe nyíltan.

1. Készíts botot a [@BotFather](https://t.me/BotFather)-rel → kapsz egy **tokent**.
2. Szerezd meg a **chat_id**-t (pl. üzenet a botnak, majd \`getUpdates\` API, vagy közös csoport ID).
3. GitHub repó: **Settings → Secrets and variables → Actions → New repository secret**
   - \`TELEGRAM_BOT_TOKEN\`
   - \`TELEGRAM_CHAT_ID\`

A workflow így hivatkozik rájuk: \`\${{ secrets.TELEGRAM_BOT_TOKEN }}\`.

---

## Használt Python csomagok

A projekt három külső csomagot használ:

| Csomag | Funkció |
|--------|---------|
| **\`python-dotenv\`** | A \`.env\` fájlból betölti a környezeti változókat. Lokális fejlesztésnél a titkokat egy \`.env\` fájlba írod (amit **nem** töltesz fel GitHubra), és a \`load_dotenv()\` betölti őket. GitHub Actions-ben a Secrets automatikusan környezeti változóként érkeznek – a \`load_dotenv()\` ilyenkor egyszerűen nem csinál semmit. |
| **\`python-telegram-bot\`** | A Telegram Bot API hivatalos Python könyvtára. A \`Bot\` osztály \`send_message()\` metódusával egy sor kóddal küldhetsz üzenetet – nem kell kézzel HTTP kéréseket összeállítani. |
| **\`requests\`** | HTTP kérések küldéséhez használt könyvtár. A beépített \`urllib\`-nél olvashatóbb és egyszerűbb szintaxist biztosít. |

---

## Fájlstruktúra

A példa három fájlból áll:

\`\`\`
repo/
├── requirements.txt
├── scripts/
│   └── btc_telegram.py
└── .github/
    └── workflows/
        └── bitcoin-telegram.yml
\`\`\`

---

## 1. requirements.txt

A Python csomagok listája, amelyeket a \`pip install -r requirements.txt\` parancs telepít.

\`\`\`
${requirementsTxt}
\`\`\`

---

## 2. A Python script

Hozd létre: \`scripts/btc_telegram.py\`

\`\`\`python
${pythonBtcTelegram}
\`\`\`

**A script működése:**
1. A \`load_dotenv()\` betölti a \`.env\` fájlt (ha létezik) – ez lokális teszteléshez hasznos
2. Az \`os.getenv()\` kiolvassa a \`TELEGRAM_BOT_TOKEN\` és \`TELEGRAM_CHAT_ID\` értékeket a környezeti változókból
3. A \`requests.get()\` lekéri a Bitcoin aktuális USD árát a CoinGecko API-ból
4. A \`Bot.send_message()\` elküldi az eredményt Telegram üzenetként

---

## 3. A GitHub Actions workflow

Hozd létre: \`.github/workflows/bitcoin-telegram.yml\`

\`\`\`yaml
${workflowBtcTelegram}
\`\`\`

### A workflow lépései

1. **\`on:\`** – mikor induljon: ütemezés (cron) + kézi futtatás (workflow_dispatch)
2. **\`cron: "0 * * * *"\`** – minden óra 0. percében, UTC idő szerint
3. **\`actions/checkout@v4\`** – a repo fájljainak letöltése (szükséges, hogy a runner elérhesse a Python scriptet és a requirements.txt-t)
4. **\`pip install -r requirements.txt\`** – a Python csomagok telepítése a runner-en
5. **\`env:\`** – a GitHub a Secrets-ből injektálja a titkos értékeket környezeti változókként
6. **\`python3 scripts/btc_telegram.py\`** – a script futtatása

---

## Lokális tesztelés (.env fájl)

Lokálisan a \`.env\` fájlban tárolhatod a titkos értékeket:

\`\`\`
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=987654321
\`\`\`

A \`.env\` fájlt **soha ne commitold** – add hozzá a \`.gitignore\`-hoz:

\`\`\`
.env
\`\`\`

Így ugyanaz a script működik **lokálisan** (\`.env\` fájlból olvas) és **GitHub Actions-ben** (Secrets-ből kap környezeti változókat).

**Fontos:** a CoinGecko ingyenes végpontjának rate limit-je lehet – oktatási célra megfelelő; éles használathoz ellenőrizd a feltételeket.

---

## Manuális futtatás hol van?

**Actions** fül → válaszd ki a workflow-t → **Run workflow** → **Run workflow**. Így azonnal láthatod, sikerült-e az üzenet.

---

## Demó videó

A beágyazott videó **GitHub Actions** bevezető – cserélhető saját felvételre, ahol végigkattintod a fenti példát.

---

## Gyakorlat

1. Hozd létre a \`scripts/btc_telegram.py\` fájlt és a \`.github/workflows/bitcoin-telegram.yml\` workflow-t egy **privát** teszt repóban
2. Állítsd be a két secretet: \`TELEGRAM_BOT_TOKEN\` és \`TELEGRAM_CHAT_ID\`
3. Futtasd **kézzel** (Actions fül → Run workflow) és ellenőrizd, hogy megérkezett-e a Telegram üzenet
4. Nézd meg a futás **logját**: hol jelenik meg maszkolva a titok?
`,
        en: `## What is GitHub Actions?

**GitHub Actions** is an **automation engine** tied to your repository: **workflows** describe **when** and **what** to run on GitHub-hosted **runners**.

**Common uses**

- **CI:** test + build on every push
- **Scheduling:** cron jobs (e.g. hourly)
- **Deploy:** upload build artifacts to Pages or elsewhere
- **Manual runs:** \`workflow_dispatch\`

**Why it matters:** you do not need your own server to run scheduled tasks—GitHub runs them within **free tier limits** (plan-dependent).

---

## Cron + manual dispatch

- **\`schedule\`:** e.g. **hourly** fetch of **Bitcoin** price from a public **CoinGecko** API and send to **Telegram**.
- **\`workflow_dispatch\`:** run from the **Actions** tab → **Run workflow** for testing.

---

## Secrets in this example

Never paste **Telegram bot tokens** or **chat IDs** into public YAML.

1. Create a bot with [@BotFather](https://t.me/BotFather).
2. Obtain **chat_id** (private chat or group).
3. Repo → **Settings → Secrets and variables → Actions**:
   - \`TELEGRAM_BOT_TOKEN\`
   - \`TELEGRAM_CHAT_ID\`

Reference in YAML: \`\${{ secrets.TELEGRAM_BOT_TOKEN }}\`.

---

## Python packages used

The project uses three external packages:

| Package | Purpose |
|---------|---------|
| **\`python-dotenv\`** | Loads environment variables from a \`.env\` file. For local development, you store secrets in a \`.env\` file (which is **not** uploaded to GitHub), and \`load_dotenv()\` loads them. In GitHub Actions, Secrets are injected automatically as environment variables — \`load_dotenv()\` simply does nothing. |
| **\`python-telegram-bot\`** | The official Python library for the Telegram Bot API. The \`Bot\` class and its \`send_message()\` method let you send messages in one line — no manual HTTP request assembly needed. |
| **\`requests\`** | HTTP request library. Provides cleaner and more readable syntax than the built-in \`urllib\`. |

---

## File structure

The example consists of three files:

\`\`\`
repo/
├── requirements.txt
├── scripts/
│   └── btc_telegram.py
└── .github/
    └── workflows/
        └── bitcoin-telegram.yml
\`\`\`

---

## 1. requirements.txt

The list of Python packages installed by \`pip install -r requirements.txt\`.

\`\`\`
${requirementsTxt}
\`\`\`

---

## 2. The Python script

Create: \`scripts/btc_telegram.py\`

\`\`\`python
${pythonBtcTelegram}
\`\`\`

**How the script works:**
1. \`load_dotenv()\` loads the \`.env\` file (if it exists) — useful for local testing
2. \`os.getenv()\` reads \`TELEGRAM_BOT_TOKEN\` and \`TELEGRAM_CHAT_ID\` from environment variables
3. \`requests.get()\` fetches the current Bitcoin USD price from the CoinGecko API
4. \`Bot.send_message()\` sends the result as a Telegram message

---

## 3. The GitHub Actions workflow

Create: \`.github/workflows/bitcoin-telegram.yml\`

\`\`\`yaml
${workflowBtcTelegram}
\`\`\`

### Workflow steps

1. **\`on:\`** — when to trigger: schedule (cron) + manual run (workflow_dispatch)
2. **\`cron: "0 * * * *"\`** — runs at minute 0 of every hour, UTC
3. **\`actions/checkout@v4\`** — checks out repo files (required for the runner to access the Python script and requirements.txt)
4. **\`pip install -r requirements.txt\`** — installs the Python packages on the runner
5. **\`env:\`** — GitHub injects secret values as environment variables from Secrets
6. **\`python3 scripts/btc_telegram.py\`** — runs the script

---

## Local testing (.env file)

Locally, you can store secret values in a \`.env\` file:

\`\`\`
TELEGRAM_BOT_TOKEN=1234567890:ABCdefGHIjklMNOpqrsTUVwxyz
TELEGRAM_CHAT_ID=987654321
\`\`\`

**Never commit** the \`.env\` file — add it to \`.gitignore\`:

\`\`\`
.env
\`\`\`

This way, the same script works **locally** (reads from \`.env\`) and in **GitHub Actions** (receives environment variables from Secrets).

**Note:** CoinGecko's free endpoint may have rate limits — suitable for educational purposes; check terms for production use.

---

## Where to run manually

**Actions** → select the workflow → **Run workflow**.

---

## Demo video

Embedded video is a general **GitHub Actions** intro—replace with your own step-by-step recording if you want.

---

## Exercise

1. Create the \`scripts/btc_telegram.py\` file and the \`.github/workflows/bitcoin-telegram.yml\` workflow in a **private** test repo
2. Set the two secrets: \`TELEGRAM_BOT_TOKEN\` and \`TELEGRAM_CHAT_ID\`
3. Run **manually** (Actions tab → Run workflow) and verify the Telegram message arrives
4. Inspect the run **logs**: where are the secrets **masked**?
`,
      },
    },
    {
      id: "github-pages-vite-deploy",
      format: "mixed",
      title: {
        hu: "4.3 GitHub Pages – statikus oldal, URL, Lovable / Vite export",
        en: "4.3 GitHub Pages – static site, URL, Lovable / Vite export",
      },
      summary: {
        hu: "Hogyan néz ki a Pages URL, index.html, Vite base path, Actions deploy – összekötés a Lovable exporttal.",
        en: "Pages URL shape, index.html, Vite base path, Actions deploy—connected to your Lovable export.",
      },
      duration: "40–55 perc + videó",
      videoUrl: "https://www.youtube.com/embed/QyFcl_Fba-k",
      markdown: {
                hu: `> ⚠️ **Figyelem – csak bizonyos projekt-stackre működik zökkenőmentesen!** Az alábbi útmutató egy klasszikus **Vite + React + react-router-dom** stack-re van szabva: a projektben létezik \`vite.config.ts\` és egy \`src/App.tsx\` \`<BrowserRouter>\`-rel. Ha a te projekted másképp néz ki – nincs \`App.tsx\`, más router van (pl. \`<HashRouter>\`, Next.js App Router, Remix), vagy nem Vite-alapú a build – akkor a lentebbi lépések **nem biztos, hogy működnek**, és a GitHub Pages deploy **404**-et, üres képernyőt vagy nem töltődő fájlokat adhat.
>
> **Három lehetőséged van ilyenkor:**
> 1. **Hash routing:** cseréld a routert \`<HashRouter>\`-re – a Pages path prefix így nem zavar be (URL-k ilyenek lesznek: \`pelda.hu/#/about\`).
> 2. **Másik platform:** ha SSR-re (Next.js, Remix) épül a projekt, a GitHub Pages nem jó választás – lépj a **4.4 Vercel** leckére.
> 3. **Refaktor a szabványra:** kérdezd meg a buildert / AI-t, hogy alakítsa át a projektet Vite + react-router-dom-ra – utána az alábbi útmutató működik.
>
> Ha már a **2.1 lecke 6. lépését** követted (GitHub Pages kompatibilitás blokk a promptban), valószínűleg ez már rendben van.

### 🚀 Válassz módszert a publikáláshoz

Ebben a részben két út közül választhatsz: az **AI-alapú automatizált** módszer (gyors és javasolt), vagy a **Manuális** beállítás, ha szeretnéd érteni a folyamat minden lépését.

---

## „A” módszer: AI Prompt (Javasolt)

Ezt a promptot másold be a Lovable-nek vagy az AI asszisztensednek.

### 1. Első publikálás (GitHub Pages)
**Másold be a GitHub projekt URL-edet ide:** \`[IDE MÁSOLD AZ URL-T]\`

\`\`\`text
Szia! Szeretném ezt a projektet GitHub Pages-re deployolni. Kérlek végezd el az alábbi módosításokat:

A Github repo url-em: [IDE MÁSOLD AZ URL-T]

1. Config beállítása: A vite.config.ts fájlban keresd meg az export default defineConfig({ részt, és add hozzá vagy módosítsd a base értéket a repository nevére:

export default defineConfig({
  base: "/repo-neve/", // <--- Ide írd a saját repository-d nevét
  plugins: [react()],
  // ...
});

Ezen kívül az src/App.tsx-ben keresd meg a <BrowserRouter> komponenst, és add hozzá a basename paramétert:

<BrowserRouter basename={import.meta.env.BASE_URL}>
  <Routes>
    {/* ... útvonalak */}
  </Routes>
</BrowserRouter>

2. Deploy script: Hozd létre a .github/workflows/deploy.yml fájlt az alábbi tartalommal (használd ezt az Actions scriptet):

${workflowViteGhPages}
\`\`\`

### 2. Egyedi domain beállítása (Opcionális)
Ha már van saját domained (pl. \`www.pelda.hu\`), használd ezt a promptot:

\`\`\`text
Szia! Egyedi domaint állítottam be a GitHub Pages-hez: [IDE MÁSOLD A DOMAINEDET]. Kérlek frissítsd a projektet:

1. A Vite 'base' paraméterét állítsd gyökérre ('/'), mert egyedi domain esetén nem kell a repo név előtag.
2. Hozz létre egy 'public/CNAME' fájlt, aminek a tartalma csak a domain nevem.
3. Ellenőrizd, hogy az src/App.tsx továbbra is az import.meta.env.BASE_URL-t használja a BrowserRouter esetén.
\`\`\`

---

## „B” módszer: Manuális beállítás

Ha kézzel szeretnéd elvégezni a beállításokat, kövesd az alábbi lépéseket:

### 1. Alapbeállítások a GitHub Pages-hez
1. **vite.config.ts**: Keresd meg az \`export default defineConfig({\` részt, és add hozzá vagy módosítsd a \`base\` értéket a repository nevére:
   \`\`\`ts
   export default defineConfig({
     base: "/repo-neve/", // <--- Ide írd a saját repository-d nevét
     plugins: [react()],
     // ...
   });
   \`\`\`
2. **src/App.tsx**: Keresd meg a \`<BrowserRouter>\` komponenst, és add hozzá a \`basename\` paramétert:
   \`\`\`tsx
   <BrowserRouter basename={import.meta.env.BASE_URL}>
     <Routes>
       {/* ... útvonalak */}
     </Routes>
   </BrowserRouter>
   \`\`\`
3. **Workflow**: Hozd létre a \`.github/workflows/deploy.yml\` fájlt a fenti YAML kóddal.
4. **GitHub Settings**: A repóban: *Settings -> Pages -> Build and deployment -> Source: GitHub Actions*.

### 2. Egyedi domain manuális beállítása
Ha saját domaint szeretnél használni:
1. **vite.config.ts**: Módosítsd a \`base\` értéket gyökérre (\`/\`):
   \`\`\`ts
   export default defineConfig({
     base: "/", // <--- Egyedi domain esetén csak egy perjel kell
     // ...
   });
   \`\`\`
2. **CNAME fájl**: Hozz létre egy \`CNAME\` nevű fájlt (kiterjesztés nélkül!) a \`public\` mappában. Tartalma csak a domain neved legyen (pl. \`pelda.hu\`):
   \`\`\`text
   pelda.hu
   \`\`\`
3. **DNS beállítás**: A domain szolgáltatódnál állítsd be a CNAME rekordot a \`felhasznalonev.github.io\` címre, vagy az A rekordokat a GitHub szervereire.
4. **GitHub Settings**: *Settings -> Pages -> Custom domain* mezőbe írd be a domaint és mentsd el.

---

## Mi az a GitHub Pages?

A **GitHub Pages** **ingyenes statikus webhosztolás** (megfelelő beállításokkal): HTML/CSS/JS fájlokat szolgál ki **HTTPS**-en, közvetlenül egy **GitHub repository**-ból vagy egy **Actions** workflow-ból.

**Mire jó?** Landing oldalak, dokumentáció, és a kurzusban: a **Lovable-ból exportált** (tipikusan **Vite + React**) projekt **build** utáni \`dist/\` mappájának kiszolgálása.

---

## Hogyan épül fel az URL?

| Típus | Példa URL |
|-------|-----------|
| **Felhasználói oldal** (user site) | \`https://felhasznalonev.github.io/\` – speciális \`felhasznalonev.github.io\` nevű repo |
| **Projekt oldal** (project site) | \`https://felhasznalonev.github.io/repository-nev/\` – a repo neve **path prefix** az útvonalban |

Ha **projekt Pages**-t használsz saját domain nélkül, a böngésző minden kérést a \`/repository-nev/\` alá tesz – ezért kell a **Vite \`base\`** beállítása.

---

## Összekötés a kurzus többi részével

- **2. szekció:** Lovable → **export** → kód a GitHubon.
- **3. szekció (most):** **Actions** + **Pages** → élő URL \`*.github.io\` alatt vagy saját domainen.
- **4. szekció:** **Saját domain** + **HTTPS** beállítása mélyebben (DNS).

---

## Gyakorlat

1. Hozz létre egy teszt repót, tegyél be egy minimális **Vite** projektet, állítsd be a \`base\`-t, futtasd a fenti jellegű workflow-t.
2. Nyisd meg a \`https://felhasznalonev.github.io/repository-nev/\` címet – töltődnek-e a CSS/JS fájlok?
3. Próbáld ki az egyedi domain beállítását, ha van saját címed!
`,
                en: `> ⚠️ **Warning — this guide assumes a specific project stack!** The instructions below are tailored to a classic **Vite + React + react-router-dom** setup: the project has a \`vite.config.ts\` and an \`src/App.tsx\` with \`<BrowserRouter>\`. If your project looks different — no \`App.tsx\`, a different router (e.g. \`<HashRouter>\`, Next.js App Router, Remix), or a non-Vite build — the steps below **may not work**, and the GitHub Pages deploy can return **404s**, a blank screen, or missing assets.
>
> **Three options in that case:**
> 1. **Hash routing:** swap the router for \`<HashRouter>\` — the Pages path prefix no longer matters (URLs look like \`example.com/#/about\`).
> 2. **Different platform:** if the project depends on SSR (Next.js, Remix), GitHub Pages is the wrong fit — jump to the **4.4 Vercel** lesson.
> 3. **Refactor to the standard:** ask the builder / AI to convert the project to Vite + react-router-dom — then the steps below become applicable.
>
> If you already followed **Step 6 of lesson 2.1** (the GitHub Pages compatibility block in your prompt), you are most likely covered.

### 🚀 Choose Your Deployment Method

In this section, you can choose between two paths: the **AI-based automated** method (fast and recommended) or the **Manual** setup if you want to understand every step of the process.

---

## Method "A": AI Prompt (Recommended)

Copy and paste this prompt into Lovable or your AI assistant.

### 1. Initial Deployment (GitHub Pages)
**Paste your GitHub project URL here:** \`[PASTE URL HERE]\`

\`\`\`text
Hi! I want to deploy this project to GitHub Pages. Please perform the following changes:

My Github repo URL is: [PASTE URL HERE]

1. Configure Settings: In vite.config.ts, find the export default defineConfig({ part and add or update the base value to match the repository name:

export default defineConfig({
  base: "/repo-name/", // <--- Enter your repository name here
  plugins: [react()],
  // ...
});

Also, in src/App.tsx, find the <BrowserRouter> component and add the basename prop:

<BrowserRouter basename={import.meta.env.BASE_URL}>
  <Routes>
    {/* ... routes */}
  </Routes>
</BrowserRouter>

2. Deploy script: Create a .github/workflows/deploy.yml file with the following content (use this Actions script):

${workflowViteGhPages}
\`\`\`

### 2. Custom Domain Setup (Optional)
If you already have your own domain (e.g., \`www.myapp.com\`), use this prompt:

\`\`\`text
Hi! I've set up a custom domain for my GitHub Pages: [PASTE YOUR DOMAIN HERE]. Please update the project accordingly:

1. Set the Vite 'base' parameter to the root ('/'), as custom domains don't need the repo name prefix.
2. Create a 'public/CNAME' file containing only my domain name.
3. Ensure that src/App.tsx still uses import.meta.env.BASE_URL for the BrowserRouter.
\`\`\`

---

## Method "B": Manual Setup

If you prefer to perform the settings manually, follow these steps:

### 1. Basic Settings for GitHub Pages
1. **vite.config.ts**: Locate the \`export default defineConfig({\` part, and add or update the \`base\` value to match your repository name:
   \`\`\`ts
   export default defineConfig({
     base: "/repo-name/", // <--- Enter your repository name here
     plugins: [react()],
     // ...
   });
   \`\`\`
2. **src/App.tsx**: Locate the \`<BrowserRouter>\` component and add the \`basename\` prop:
   \`\`\`tsx
   <BrowserRouter basename={import.meta.env.BASE_URL}>
     <Routes>
       {/* ... routes */}
     </Routes>
   </BrowserRouter>
   \`\`\`
3. **Workflow**: Create the \`.github/workflows/deploy.yml\` file using the YAML code provided above.
4. **GitHub Settings**: In the repo: *Settings -> Pages -> Build and deployment -> Source: GitHub Actions*.

### 2. Manual Custom Domain Setup
If you want to use a custom domain:
1. **vite.config.ts**: Change the \`base\` value to root (\`/\`):
   \`\`\`ts
   export default defineConfig({
     base: "/", // <--- For custom domains, just a single forward slash is needed
     // ...
   });
   \`\`\`
2. **CNAME file**: Create a file named \`CNAME\` (no extension!) in the \`public\` folder. Its content should be just your domain name (e.g., \`example.com\`):
   \`\`\`text
   example.com
   \`\`\`
3. **DNS Setting**: At your domain provider, set the CNAME record to \`username.github.io\`, or A records to GitHub's servers.
4. **GitHub Settings**: Enter the domain in the *Settings -> Pages -> Custom domain* field and save.

---

## What is GitHub Pages?

**GitHub Pages** is **free static web hosting** (with proper configuration): it serves HTML/CSS/JS files over **HTTPS** directly from a **GitHub repository** or from an **Actions** workflow.

**Why is it useful?** For landing pages, documentation, and in this course: serving the \`dist/\` folder of your **Lovable-exported** (**Vite + React**) project after building.

---

## How the URL is Shaped

| Type | Example URL |
|------|-------------|
| **User site** | \`https://username.github.io/\` – special \`username.github.io\` repo |
| **Project site** | \`https://username.github.io/repository-name/\` – the repo name is a **path prefix** |

If you use **project Pages** without a custom domain, the browser puts every request under \`/repository-name/\` – that's why the **Vite \`base\`** setting is required.

---

## How This Connects

- **Section 2:** Lovable → **export** → code on GitHub.
- **Section 3 (now):** **Actions** + **Pages** → live URL under \`*.github.io\` or a custom domain.
- **Section 4:** **Custom domain** + **HTTPS** setup.

---

## Exercise

1. Create a test repo, add a minimal **Vite** project, set the \`base\`, and run a workflow like the one above.
2. Open the \`https://username.github.io/repository-name/\` address – do the CSS/JS files load?
3. Try setting up a custom domain if you have your own address!
`,
      },
    },
    {
      id: "vercel-alternative",
      format: "reading",
      title: {
        hu: "4.4 Alternatíva: Vercel – GitHub Pages helyett",
        en: "4.4 Alternative: Vercel – instead of GitHub Pages",
      },
      summary: {
        hu: "Mikor válassz Vercel-t? Összehasonlítás GitHub Pages-szel, előnyök-hátrányok, és egy kb. 3 perces deploy workflow.",
        en: "When to pick Vercel? A comparison with GitHub Pages, pros/cons, and a ~3-minute deployment workflow.",
      },
      duration: "20–30 perc olvasás",
      videoUrl: null,
      markdown: {
        hu: `## Mi a Vercel?

A **[Vercel](https://vercel.com/)** egy **hosting- és frontend-deploy platform**, amit a **Next.js** fejlesztői csapata épít. Nem csak statikus oldalakat, hanem **dinamikus React / Next.js / SvelteKit / Vite** alkalmazásokat is ki tud szolgálni – globális **CDN**-nel, automatikus **preview deploy**-okkal minden git branchre.

Az ingyenes **Hobby** csomag bőven elég egy induló projekthez vagy portfólióhoz (non-commercial használatra).

---

## Miben más, mint a GitHub Pages?

| Szempont | GitHub Pages | Vercel |
|---|---|---|
| **Ár (hobbi szint)** | Ingyenes | Ingyenes (Hobby, non-commercial) |
| **Sávszélesség-limit** | 100 GB/hó (soft) | 100 GB/hó |
| **Build időlimit** | 10 perc/job | 45 perc/build |
| **Routing URL** | \`user.github.io/repo/\` (path prefix) | \`projekt.vercel.app\` (root domain) |
| **Vite \`base\` kell?** | **Igen** – \`"/repo-neve/"\` | **Nem** – \`"/"\` marad |
| **BrowserRouter \`basename\`** | Kell | Nem kell |
| **Saját domain** | Ingyenes (csak DNS) | Ingyenes (csak DNS) |
| **HTTPS (Let's Encrypt)** | Automatikus | Automatikus |
| **Preview deploy** | ❌ (csak main) | ✅ **minden branch + PR** automatikus preview URL |
| **Deploy trigger** | Manuális \`deploy.yml\` | Automatikus git integráció |
| **SSR / serverless functions** | ❌ | ✅ (Edge Functions, Serverless) |
| **Környezeti változók** | Csak build-time (GitHub Secrets) | Build-time **+ runtime** |
| **Analytics** | ❌ | ✅ beépített (Hobby: korlátos) |
| **Build log** | GitHub Actions felület | Vercel dashboard |
| **Kereskedelmi használat** | Megengedett | Hobby-n **tiltva** – Pro kell ($20/hó) |
| **Vendor lock-in** | Nulla (sima statikus fájlok) | Minimális (\`vercel.json\` opcionális) |

---

## Előnyök / hátrányok

### Vercel előnyei
- **Nulla konfiguráció** – a Vite projektet automatikusan felismeri, nem kell workflow-t írnod
- **Preview deploy minden PR-hez** – mielőtt merge-elsz, kipróbálhatod a változást egy külön URL-en (csapatmunkánál óriási különbség)
- **Gyorsabb build-to-live** – commit után ~30–60 másodperccel már élesben van
- **Nincs \`base\` / \`basename\` vesződés** – root domainről szolgál, a routing „csak működik”
- **Serverless funkciók** – ha később API végpontot kell hozzáadnod (űrlap-továbbítás, Stripe webhook), nem kell külön szerver

### Vercel hátrányai
- **Vendor dashboard** – a build logok és beállítások a Vercel oldalán vannak, nem a GitHubon
- **Ingyenes csomag korlátai** – havi ~100 GB sávszélesség, 6000 build perc; nagy forgalmú oldalnál figyelni kell
- **Kereskedelmi használat korlátozott** – a Hobby terv **non-commercial**; komoly projekthez **Pro ($20/hó)**
- **Enyhe lock-in** – tiszta Vite projektnél minimális, de ha Vercel-specifikus Edge Function-öket használsz, nehezebb költözni

### GitHub Pages előnyei
- **Minden egy helyen** – kód, issue, CI, hosting ugyanabban a fiókban
- **Nincs third-party vendor** – csak GitHubra van szükséged
- **Teljes kontroll** – pontosan látod és módosíthatod, hogyan épül a build (\`.github/workflows/deploy.yml\`)
- **Kereskedelmi használatra alkalmas** – nincs non-commercial kitétel

### GitHub Pages hátrányai
- **Routing komplikáció** – a \`base\` path prefixet nem felejtheted el, különben az oldal 404-et dob
- **Nincs preview deploy** – csak a main branch megy élesbe
- **Csak statikus tartalom** – nincs szerveroldali logika, nincsenek API végpontok

---

## Konkrét Vercel deploy workflow

A Lovable-ből exportált (vagy bármilyen Vite + React) projekt Vercel-re tétele **kb. 3 perc**, GitHub Actions nélkül.

### 1. lépés: regisztráció

1. Nyisd meg a [vercel.com/signup](https://vercel.com/signup)-ot
2. Válaszd a **„Continue with GitHub”** gombot – így egyben adsz is jogosultságot a repóid olvasására
3. Engedélyezd Vercel-nek vagy az összes repód, vagy csak azt, amit deployolni szeretnél

### 2. lépés: projekt importálása

1. A Vercel dashboardon kattints az **„Add New… → Project”** gombra
2. A **„Import Git Repository”** listából keresd meg a repót, majd **„Import”**
3. Vercel automatikusan felismeri, hogy **Vite** projekt:
   - **Framework Preset:** Vite
   - **Build Command:** \`bun run build\` (vagy \`npm run build\`)
   - **Output Directory:** \`dist\`
   - **Install Command:** \`bun install\` (vagy \`npm install\`)
4. Ha van **környezeti változód** (pl. Supabase URL, API kulcs), add meg az **„Environment Variables”** szekcióban
5. Kattints a **„Deploy”** gombra

### 3. lépés: élesben van

Kb. 30–60 másodperc alatt:
- A build lefut a Vercel szerverein
- Kapsz egy automatikus URL-t: \`projekt-neve.vercel.app\`
- Ezen kívül minden branch kap egy **preview URL-t**: pl. \`projekt-neve-git-feature-x.vercel.app\`

### 4. lépés: állítsd vissza a Vite \`base\`-t

**Fontos:** ha előzőleg GitHub Pages-re optimalizáltad a projektet (pl. \`base: "/repo-neve/"\`), Vercelen **állítsd vissza** gyökérre, különben az oldalak rossz útvonalon keresnék a fájlokat:

\`\`\`ts
export default defineConfig({
  base: "/", // Vercel root domainről szolgál
  plugins: [react()],
  // ...
});
\`\`\`

Az \`App.tsx\`-ben a \`basename={import.meta.env.BASE_URL}\` **maradhat** – ez Vercelen automatikusan \`/\`-ra oldódik, tehát nem kell változtatni.

### 5. lépés: saját domain (opcionális)

1. A projekt dashboardján: **Settings → Domains**
2. Add meg a domained (pl. \`sajatweb.hu\`)
3. Vercel kijelzi a DNS rekordokat, amiket a regisztrátorodnál be kell állítanod:
   - **A rekord** a gyökérhez (\`@\`) → \`76.76.21.21\`
   - **CNAME rekord** a \`www\`-hez → \`cname.vercel-dns.com\`
4. Mentés után Vercel **automatikusan** kér SSL tanúsítványt (Let's Encrypt) – kb. 1–5 perc

---

## Automatikus deploy minden pushra – ingyen

A Vercel **git integrációjának** lényege: minden commit, ami a **main**-re érkezik, **automatikusan élesbe** megy. Minden feature branch **automatikusan kap egy preview URL-t**. Nincs szükség \`deploy.yml\`-re, nincs Actions konfigurálás.

\`\`\`
git push origin main        → projekt.vercel.app                  (élő)
git push origin feature-x   → projekt-git-feature-x.vercel.app    (preview)
\`\`\`

---

## Mikor válassz mit?

- **Csak landing / portfólió, nincs szerver-logika, kereskedelmi is:** GitHub Pages.
- **Csapatmunka, PR review-k, preview deploy fontos:** **Vercel**.
- **Kell serverless funkció, form backend, Stripe webhook:** **Vercel** (vagy Netlify).
- **SSR / Next.js / Remix:** csak **Vercel** (GitHub Pages nem alkalmas).
- **Tanulni szeretnéd a CI/CD-t:** maradj a GitHub Pages + Actions úton – pontosan látod, mi történik.

---

## Gyakorlat

1. Regisztrálj a [vercel.com](https://vercel.com)-en GitHub fiókkal.
2. Importáld a Lovable-ből exportált repódat (vagy egy másik Vite projektet tesztnek).
3. Deploy után nyisd meg a kapott \`*.vercel.app\` URL-t – működik-e minden útvonal?
4. Hozz létre egy teszt branchet, pushold – kapsz-e **preview URL-t** a dashboardon?
5. (Opcionális) Hasonlítsd össze a GitHub Pages és a Vercel buildet: melyik gyorsabb nálad?
`,
        en: `## What is Vercel?

**[Vercel](https://vercel.com/)** is a **hosting and frontend deploy platform** built by the **Next.js** team. It serves not only static sites but also **dynamic React / Next.js / SvelteKit / Vite** apps — over a global **CDN**, with automatic **preview deploys** for every git branch.

The free **Hobby** plan is more than enough for a starter project or portfolio (non-commercial use).

---

## How does it differ from GitHub Pages?

| Aspect | GitHub Pages | Vercel |
|---|---|---|
| **Cost (hobby tier)** | Free | Free (Hobby, non-commercial) |
| **Bandwidth limit** | 100 GB/mo (soft) | 100 GB/mo |
| **Build time limit** | 10 min/job | 45 min/build |
| **Routing URL** | \`user.github.io/repo/\` (path prefix) | \`project.vercel.app\` (root domain) |
| **Vite \`base\` needed?** | **Yes** – \`"/repo-name/"\` | **No** – stays \`"/"\` |
| **BrowserRouter \`basename\`** | Required | Not required |
| **Custom domain** | Free (DNS only) | Free (DNS only) |
| **HTTPS (Let's Encrypt)** | Automatic | Automatic |
| **Preview deploy** | ❌ (main only) | ✅ **every branch + PR** gets a preview URL |
| **Deploy trigger** | Manual \`deploy.yml\` | Automatic git integration |
| **SSR / serverless functions** | ❌ | ✅ (Edge Functions, Serverless) |
| **Environment variables** | Build-time only (GitHub Secrets) | Build-time **+ runtime** |
| **Analytics** | ❌ | ✅ built-in (Hobby: limited) |
| **Build logs** | GitHub Actions UI | Vercel dashboard |
| **Commercial use** | Allowed | **Blocked** on Hobby — Pro required ($20/mo) |
| **Vendor lock-in** | None (plain static files) | Minimal (\`vercel.json\` optional) |

---

## Pros / cons

### Vercel pros
- **Zero config** — detects the Vite project automatically, no workflow to write
- **Preview deploy for every PR** — test the change on a separate URL before merging (huge for teams)
- **Faster build-to-live** — typically live within ~30–60 seconds of a commit
- **No \`base\` / \`basename\` fiddling** — served from the root domain, routing "just works"
- **Serverless functions** — if you later need an API endpoint (form relay, Stripe webhook), no separate server required

### Vercel cons
- **Vendor dashboard** — build logs and settings live on Vercel, not GitHub
- **Free-tier limits** — ~100 GB bandwidth/mo, 6000 build minutes; watch out on high-traffic sites
- **Commercial use restricted** — Hobby is **non-commercial**; production projects need **Pro ($20/mo)**
- **Mild lock-in** — negligible for a plain Vite project, but Vercel-specific Edge Functions make migration harder

### GitHub Pages pros
- **Everything in one place** — code, issues, CI, hosting under a single account
- **No third-party vendor** — you only need GitHub
- **Full control** — you see and edit exactly how the build runs (\`.github/workflows/deploy.yml\`)
- **Commercial-friendly** — no non-commercial clause

### GitHub Pages cons
- **Routing complexity** — you can't forget the \`base\` path prefix, or the site returns 404s
- **No preview deploys** — only main goes live
- **Static only** — no server-side logic, no API endpoints

---

## Concrete Vercel deploy workflow

Deploying a Lovable-exported (or any Vite + React) project to Vercel takes **~3 minutes**, without GitHub Actions.

### Step 1: sign up

1. Open [vercel.com/signup](https://vercel.com/signup)
2. Choose **"Continue with GitHub"** — this also grants Vercel read access to your repos
3. Allow Vercel to see either all repos or just the one you want to deploy

### Step 2: import the project

1. On the Vercel dashboard click **"Add New… → Project"**
2. In the **"Import Git Repository"** list find your repo and click **"Import"**
3. Vercel auto-detects that it's a **Vite** project:
   - **Framework Preset:** Vite
   - **Build Command:** \`bun run build\` (or \`npm run build\`)
   - **Output Directory:** \`dist\`
   - **Install Command:** \`bun install\` (or \`npm install\`)
4. If you have **environment variables** (e.g. Supabase URL, API keys), enter them under **"Environment Variables"**
5. Click **"Deploy"**

### Step 3: it's live

In ~30–60 seconds:
- The build runs on Vercel's servers
- You get an automatic URL: \`project-name.vercel.app\`
- Every branch also gets a **preview URL**: e.g. \`project-name-git-feature-x.vercel.app\`

### Step 4: reset the Vite \`base\`

**Important:** if you previously tuned the project for GitHub Pages (e.g. \`base: "/repo-name/"\`), **reset it** to root on Vercel, otherwise pages will look for assets at the wrong path:

\`\`\`ts
export default defineConfig({
  base: "/", // Vercel serves from the root domain
  plugins: [react()],
  // ...
});
\`\`\`

The \`basename={import.meta.env.BASE_URL}\` in \`App.tsx\` **can stay** — it resolves to \`/\` on Vercel automatically.

### Step 5: custom domain (optional)

1. In the project dashboard: **Settings → Domains**
2. Enter your domain (e.g. \`mybrand.com\`)
3. Vercel shows the DNS records you must set at your registrar:
   - **A record** for the apex (\`@\`) → \`76.76.21.21\`
   - **CNAME record** for \`www\` → \`cname.vercel-dns.com\`
4. After saving Vercel requests an SSL certificate (Let's Encrypt) **automatically** — about 1–5 minutes

---

## Automatic deploy on every push — free

The core of Vercel's **git integration**: every commit landing on **main** **automatically** goes live. Every feature branch **automatically gets a preview URL**. No \`deploy.yml\`, no Actions config.

\`\`\`
git push origin main        → project.vercel.app                  (live)
git push origin feature-x   → project-git-feature-x.vercel.app    (preview)
\`\`\`

---

## Which one to pick?

- **Just a landing page / portfolio, no server logic, commercial OK:** GitHub Pages.
- **Team work, PR reviews, preview deploys matter:** **Vercel**.
- **Need serverless functions, form backend, Stripe webhook:** **Vercel** (or Netlify).
- **SSR / Next.js / Remix:** **Vercel** only (GitHub Pages doesn't fit).
- **Want to learn CI/CD:** stick with GitHub Pages + Actions — you see exactly what happens.

---

## Exercise

1. Sign up at [vercel.com](https://vercel.com) with your GitHub account.
2. Import your Lovable-exported repo (or another Vite project for testing).
3. Open the \`*.vercel.app\` URL you get — do all routes work?
4. Create a test branch, push it — do you get a **preview URL** in the dashboard?
5. (Optional) Compare the GitHub Pages and Vercel builds: which one is faster for you?
`,
      },
    },
    {
      id: "github-quiz",
      format: "quiz",
      title: {
        hu: "4. szekció – Kvíz és gyakorlat",
        en: "Section 4 – Quiz & Practice",
      },
      summary: {
        hu: "Ellenőrizd a tudásod a GitHub, GitHub Actions, GitHub Pages és Vercel témákban – majd végezd el a 10-15 perces gyakorlati feladatot.",
        en: "Test your knowledge of GitHub, GitHub Actions, GitHub Pages, and Vercel — then complete the 10–15 minute hands-on task.",
      },
      duration: "10–15 perc kvíz + feladat",
      videoUrl: null,
      markdown: { hu: "", en: "" },
      quizData: [
        {
          id: "gh-q1",
          question: {
            hu: "Mi a repository (repo)?",
            en: "What is a repository (repo)?",
          },
          options: [
            {
              hu: "Egy projektmappa a fájlokkal és azok Git-előzményével (commit-ok)",
              en: "A project folder containing files and their Git history (commits)",
            },
            {
              hu: "Egy webszerver, ahol az oldal fut",
              en: "A web server where the site runs",
            },
            {
              hu: "A GitHub fizetős prémium előfizetése",
              en: "GitHub's paid premium subscription",
            },
            {
              hu: "Az SSL tanúsítvány tárolóhelye",
              en: "The storage location for SSL certificates",
            },
          ],
          correctIndex: 0,
          explanation: {
            hu: "A repository egy projektároló: fájlok + commit előzmény. Gondolj rá mint egy szinkronizált mappára, ahol minden mentés időbélyeggel és üzenettel tárolódik.",
            en: "A repository is a project container: files + commit history. Think of it as a synced folder where every save is stored with a timestamp and message.",
          },
        },
        {
          id: "gh-q2",
          question: {
            hu: "Miért NEM szabad API kulcsot vagy titkot a GitHub repó fájljaiba írni?",
            en: "Why should you NEVER put API keys or secrets into GitHub repo files?",
          },
          options: [
            {
              hu: "Mert nyilvános repónál bárki láthatja és ellophatja a titkot",
              en: "Because in a public repo, anyone can see and steal the secret",
            },
            {
              hu: "Mert a GitHub nem engedi az ilyen fájlokat",
              en: "Because GitHub does not allow such files",
            },
            {
              hu: "Mert az API kulcsok csak helyi gépen működnek",
              en: "Because API keys only work on a local machine",
            },
            {
              hu: "Mert a Git titkosítja a fájlokat, és a kulcs elveszne",
              en: "Because Git encrypts files and the key would be lost",
            },
          ],
          correctIndex: 0,
          explanation: {
            hu: "Nyilvános repóban mindenki látja a fájlokat. A titkokat a GitHub Settings → Secrets and variables → Actions alatt tárold.",
            en: "In a public repo, everyone can see the files. Store secrets under GitHub Settings → Secrets and variables → Actions.",
          },
        },
        {
          id: "gh-q3",
          question: {
            hu: "Mit jelent a `on: push: branches: [main]` egy GitHub Actions workflow-ban?",
            en: "What does `on: push: branches: [main]` mean in a GitHub Actions workflow?",
          },
          options: [
            {
              hu: "A workflow lefut, amikor a main ágra push érkezik",
              en: "The workflow runs when a push is made to the main branch",
            },
            {
              hu: "A workflow csak kézzel indítható el",
              en: "The workflow can only be started manually",
            },
            {
              hu: "A workflow minden pull request-nél lefut",
              en: "The workflow runs on every pull request",
            },
            {
              hu: "A workflow minden éjfélkor indul el",
              en: "The workflow starts every midnight",
            },
          ],
          correctIndex: 0,
          explanation: {
            hu: "Az `on:` blokk határozza meg, mikor indul a workflow. A `push: branches: [main]` pontosan azt jelenti: minden main ágra érkező push-nál.",
            en: "The `on:` block defines when the workflow triggers. `push: branches: [main]` means exactly: on every push to the main branch.",
          },
        },
        {
          id: "gh-q4",
          question: {
            hu: "Mi a GitHub Pages és mire való?",
            en: "What is GitHub Pages and what is it for?",
          },
          options: [
            {
              hu: "Ingyenes statikus webhosztolás, közvetlenül egy GitHub repo tartalmából",
              en: "Free static web hosting served directly from a GitHub repository's content",
            },
            {
              hu: "GitHub fizetős tárhelyszolgáltatás dinamikus backend-del",
              en: "GitHub's paid hosting service with a dynamic backend",
            },
            {
              hu: "A repository dokumentációs rendszere",
              en: "The repository's documentation system",
            },
            {
              hu: "GitHub belső csapatchat platformja",
              en: "GitHub's internal team chat platform",
            },
          ],
          correctIndex: 0,
          explanation: {
            hu: "A GitHub Pages ingyenes, HTTPS-es statikus hosztolást biztosít közvetlenül a repóból – ideális landing oldalakhoz, portfóliókhoz és a Lovable-ből exportált projektekhez.",
            en: "GitHub Pages provides free, HTTPS static hosting directly from the repo — ideal for landing pages, portfolios, and Lovable-exported projects.",
          },
        },
        {
          id: "gh-q5",
          question: {
            hu: "Vite projektben miért fontos a `base` beállítás a vite.config.ts-ben GitHub Pages esetén?",
            en: "Why is the `base` setting in vite.config.ts important for Vite projects on GitHub Pages?",
          },
          options: [
            {
              hu: "Mert projekt Pages-nél a repo neve az URL path előtagja, és a CSS/JS rossz útvonalról töltődne be nélküle",
              en: "Because with project Pages, the repo name is a URL path prefix, and without it CSS/JS would load from the wrong path",
            },
            {
              hu: "Mert különben a build folyamat nem indul el",
              en: "Because otherwise the build process won't start",
            },
            {
              hu: "Mert a GitHub Pages csak HTTPS-en keresztül éri el a fájlokat",
              en: "Because GitHub Pages only accesses files over HTTPS",
            },
            {
              hu: "Mert a `base` állítja be a domain nevet",
              en: "Because `base` sets the domain name",
            },
          ],
          correctIndex: 0,
          explanation: {
            hu: "Projekt Pages-nél az URL pl. `username.github.io/repo-neve/` – ha a Vite base nincs beállítva a repo nevére, a statikus fájlok 404-et dobnak.",
            en: "With project Pages, the URL is e.g. `username.github.io/repo-name/` — if Vite base isn't set to the repo name, static assets return 404.",
          },
        },
        {
          id: "gh-q6",
          question: {
            hu: "Mi az egyik legnagyobb különbség a Vercel és a GitHub Pages között egy Vite + React projektnél?",
            en: "What is one of the biggest differences between Vercel and GitHub Pages for a Vite + React project?",
          },
          options: [
            {
              hu: "Vercel root domainről szolgál, ezért nincs szükség `base` vagy `basename` beállításra, és minden branch kap automatikus preview URL-t",
              en: "Vercel serves from the root domain, so no `base` or `basename` setup is needed, and every branch gets an automatic preview URL",
            },
            {
              hu: "A Vercel csak statikus HTML-t tud kiszolgálni, míg a GitHub Pages dinamikus backendet is",
              en: "Vercel can only serve static HTML, while GitHub Pages also supports dynamic backends",
            },
            {
              hu: "A Vercel fizetős, a GitHub Pages ingyenes – ezért csak nagy cégek használják a Vercel-t",
              en: "Vercel is paid and GitHub Pages is free — so only large companies use Vercel",
            },
            {
              hu: "A Vercel csak Next.js projekteket fogad el, a Vite-ot nem támogatja",
              en: "Vercel accepts only Next.js projects and does not support Vite",
            },
          ],
          correctIndex: 0,
          explanation: {
            hu: "A Vercel gyökér domainről szolgál (`projekt.vercel.app`), így a Vite `base` maradhat `/`, és nem kell `basename` a routerben. Emellett minden branch automatikusan kap egy preview URL-t – ez GitHub Pages-en külön konfiguráció nélkül nem elérhető. A Hobby csomag ingyenes (non-commercial), és a Vite hivatalosan támogatott preset.",
            en: "Vercel serves from a root domain (`project.vercel.app`), so the Vite `base` can stay `/` and no router `basename` is needed. Every branch also gets an automatic preview URL — something GitHub Pages doesn't offer out of the box. The Hobby plan is free (non-commercial) and Vite is a first-class supported preset.",
          },
        },
      ],
      practicalTask: {
        hu: `## Gyakorlati feladat (~10–15 perc)

**Cél:** Hozz létre egy GitHub Actions workflow-t és ellenőrizd, hogy elindul-e a build.

### Lépések

1. Nyisd meg a Lovable-ből exportált repódat GitHub.com-on

2. Hozd létre a \`.github/workflows/\` mappát és benne a \`deploy.yml\` fájlt (vagy használd az Antigravity promptot a 3.2 leckéből)

3. Commitold és pushold a változtatást (GitHub Desktop)

4. Nyisd meg a repository **Actions** fülét – látod, hogy elindult-e a build?

5. Ha zöld pipa van: menj a **Settings → Pages** menübe és ellenőrizd, hogy a forrás **„GitHub Actions"**-re van-e állítva

6. Ellenőrizd az URL-t: \`https://[felhasznalonev].github.io/[repo-neve]/\`

> **Megjegyzés:** Ha a build piros X-et kap, kattints rá és olvasd el a hibaüzenetet. A leggyakoribb ok: hiányzó \`package-lock.json\` (ha nincs, futtass \`npm install\` lokálisan és töltsd fel).`,
        en: `## Hands-on Task (~10–15 minutes)

**Goal:** Create a GitHub Actions workflow and verify the build starts.

### Steps

1. Open your Lovable-exported repo on GitHub.com

2. Create the \`.github/workflows/\` folder and \`deploy.yml\` inside (or use the Antigravity prompt from lesson 3.2)

3. Commit and push the change (GitHub Desktop)

4. Open the repository's **Actions** tab — can you see the build running?

5. If there's a green checkmark: go to **Settings → Pages** and verify the source is set to **"GitHub Actions"**

6. Check the URL: \`https://[username].github.io/[repo-name]/\`

> **Note:** If the build shows a red X, click it and read the error message. The most common cause: missing \`package-lock.json\` (if absent, run \`npm install\` locally and push it).`,
      },
    },
  ],
};
