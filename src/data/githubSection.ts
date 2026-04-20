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
    hu: "4. szekció – GitHub, Actions, Pages",
    en: "Section 4 – GitHub, Actions, Pages",
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
        hu: `## Mi az a GitHub Pages?

A **GitHub Pages** **ingyenes statikus webhosztolás** (megfelelő beállításokkal): HTML/CSS/JS fájlokat szolgál ki **HTTPS**-en, közvetlenül egy **GitHub repository**-ból vagy egy **Actions** workflow **gh-pages** ágára feltöltött buildből.

**Mire jó?** Landing oldalak, dokumentáció, és a kurzusban: a **Lovable-ból exportált** (tipikusan **Vite + React**) projekt **build** utáni \`dist/\` mappájának kiszolgálása.

---

## Hogyan épül fel az URL?

| Típus | Példa URL |
|-------|-----------|
| **Felhasználói oldal** (user site) | \`https://felhasznalonev.github.io/\` – speciális \`felhasznalonev.github.io\` nevű repo |
| **Projekt oldal** (project site) | \`https://felhasznalonev.github.io/repository-nev/\` – a repo neve **path prefix** az útvonalban |

Ha **projekt Pages**-t használsz, a böngésző **minden kérést** a \`/repository-nev/\` alá tesz – ezért a **Vite** (és más bundlerek) **\`base\`** beállítását **egyeztetni kell** a repo nevével, különben a JS/CSS **rossz útvonalról** töltődik (fehér oldal / 404).

---

## Legyen egy egyszerű \`index.html\` is

A Pages működhet úgy is, hogy a repo **gyökerében** vagy egy \`docs/\` mappában ott van egy **statikus** \`index.html\` – **build nélkül**. Ez jól mutatja, **mi történik**: a GitHub kiszolgálja a fájlt. A **Lovable / Vite** export viszont **build lépést** igényel (\`npm run build\` → \`dist/\`).

---

## Lovable-ból exportált Vite projekt – mit állíts be?

1. **\`vite.config.ts\` – \`base\`:** projekt Pages esetén állítsd a repó nevére végződő útra, pl.:
   \`\`\`ts
   export default defineConfig({
     base: "/repository-nev/",
     // plugins: [react()],
   });
   \`\`\`
   Cseréld a \`repository-nev\`-et a **valós** GitHub repo nevére.

2. **\`npm run build\`:** ellenőrizd lokálisan, hogy a \`dist/\` megfelelő-e.

3. **Router (React Router) beállítása:** A React Routernek tudnia kell, hogy az alkalmazás nem a domain gyökerében, hanem egy alkönyvtárban fut (ha nem custom domaint használsz).
   1. Keresd meg az \`src/App.tsx\` fájlt.
   2. A \`<BrowserRouter>\` komponenshez add hozzá a \`basename\` paramétert:
      \`\`\`tsx
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* ... útvonalak */}
        </Routes>
      </BrowserRouter>
      \`\`\`

4. **Deploy:** a példában egy **GitHub Action** buildel (\`bun install\`, \`bun run build\`), majd az **actions/upload-pages-artifact** feltölti az artifactot, az **actions/deploy-pages** pedig publikálja a **GitHub Pages**-re. A repó **Settings → Pages** menüjében a forrást **„GitHub Actions"**-re kell állítani.

---

## Példa workflow: build + gh-pages ág

\`\`\`yaml
${workflowViteGhPages}
\`\`\`

**Megjegyzés:** a **GitHub** Actions dokumentációját érdemes a legfrissebb verzió szerint követni; a **Bun** verzió \`latest\` értékre állítva mindig a legfrissebbet használja.

---

## Egyedi domain (Custom Domain) használata

Ha saját domaint szeretnél használni (pl. \`www.pelda.hu\`):

1. **vite.config.ts**: A \`base\` értéket állítsd vissza gyökérre (\`/\`):
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
3. **GitHub Settings**: A repository **Settings → Pages → Custom domain** mezőjébe írd be a domaint és mentsd el.
4. **DNS beállítás**: A domain szolgáltatódnál állítsd be a CNAME rekordot a \`felhasznalonev.github.io\` címre (vagy az A rekordokat a GitHub szervereire).

---

## Összekötés a kurzus többi részével

- **2. szekció:** Lovable → **export** → kód a GitHubon.
- **3. szekció (most):** **Actions** + **Pages** → élő URL \`*.github.io\` alatt.
- **4. szekció:** **Saját domain** + **HTTPS**.

---

## Demó videó

A beágyazott videó **GitHub Pages** bevezető – cserélhető saját anyagra, ahol a **Lovable-export + base + Actions** lépéseit mutatod.

---

## Gyakorlat

1. Hozz létre egy teszt repót, tegyél be egy minimális **Vite** projektet, állítsd be a \`base\`-t, futtasd a fenti jellegű workflow-t.
2. Nyisd meg a \`https://felhasznalonev.github.io/repository-nev/\` címet – töltődnek-e a CSS/JS fájlok?
3. Olvasd el a Pages **Custom domain** szekcióját előkészületként a 4. szekcióhoz.
`,
        en: `## What is GitHub Pages?

**GitHub Pages** is **free static hosting** (with limits): it serves HTML/CSS/JS over **HTTPS** from a **branch** (often **gh-pages**) produced by a build.

**Why it matters here:** publish the **built output** (\`dist/\`) of a **Lovable-exported** (**Vite + React**) project.

---

## How the URL is shaped

| Kind | Example |
|------|---------|
| **User site** | \`https://username.github.io/\` (special \`username.github.io\` repo) |
| **Project site** | \`https://username.github.io/repo-name/\` — repo name is a **path prefix** |

For **project Pages**, configure **Vite \`base\`** to match \`/repo-name/\` or assets break.

---

## Simple \`index.html\` (no build)

You can publish plain static files **without** a bundler—useful to understand Pages. Lovable/Vite exports usually need **\`npm run build\`**.

---

## Lovable / Vite export—what to configure?

1. **\`vite.config.ts\` → \`base\`:** for **project Pages**:
   \`\`\`ts
   export default defineConfig({
     base: "/repo-name/",
   });
   \`\`\`

2. **\`npm run build\`:** verify \`dist/\` locally.

3. **Client-side routers configuration:** React Router needs to know that the app is running in a subdirectory (if not using a custom domain).
   1. Locate the \`src/App.tsx\` file.
   2. Add the \`basename\` prop to the \`<BrowserRouter>\` component:
      \`\`\`tsx
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* ... routes */}
        </Routes>
      </BrowserRouter>
      \`\`\`

4. **Deploy:** the sample workflow runs **bun install** + **bun run build**, then **actions/upload-pages-artifact** uploads the artifact and **actions/deploy-pages** publishes it to GitHub Pages. In **Settings → Pages**, set the source to **"GitHub Actions"**.

---

## Example workflow: build + gh-pages

\`\`\`yaml
${workflowViteGhPages}
\`\`\`

Follow upstream docs for the latest action versions and Node compatibility.

---

## Using a Custom Domain

If you want to use your own domain (e.g., \`www.example.com\`):

1. **vite.config.ts**: Set the \`base\` value back to root (\`/\`):
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
3. **GitHub Settings**: Enter the domain in the **Settings → Pages → Custom domain** field and save.
4. **DNS Setting**: At your domain provider, set the CNAME record to \`username.github.io\` (or A records to GitHub's servers).

---

## How this connects

- **Section 2:** export from Lovable → code on GitHub.
- **Section 3:** Actions + Pages → \`*.github.io\` URL.
- **Section 4:** **your domain** + **HTTPS**.

---

## Demo video

Embedded: general **GitHub Pages** intro—replace with your own Lovable + Vite + Actions walkthrough.

---

## Exercise

1. Create a test repo with a minimal **Vite** app, set \`base\`, run a deploy workflow.
2. Open \`https://username.github.io/repo-name/\`—do assets load?
3. Skim **Custom domain** docs to prepare for Section 5.
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
        hu: "Ellenőrizd a tudásod a GitHub, GitHub Actions és GitHub Pages témákban – majd végezd el a 10-15 perces gyakorlati feladatot.",
        en: "Test your knowledge of GitHub, GitHub Actions, and GitHub Pages — then complete the 10–15 minute hands-on task.",
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
