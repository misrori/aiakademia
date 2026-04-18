import type { CourseSection } from "./courseContentTypes";

const actionYml = [
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

export const localModSection: CourseSection = {
  id: "local-modifications",
  title: {
    hu: "3. szekció – Lokális módosítás",
    en: "Section 3 – Local Modifications",
  },
  lessons: [
    {
      id: "github-desktop",
      format: "reading",
      title: {
        hu: "3.1 GitHub Desktop – grafikus Git kezelés",
        en: "3.1 GitHub Desktop – Visual Git Management",
      },
      summary: {
        hu: "Mi az a GitHub Desktop, mire jó, hogyan töltöd le a repót és hogyan töltöd vissza a módosításaidat GitHubra – parancssor nélkül.",
        en: "What GitHub Desktop is, what you can do with it, how to clone a repo and push your changes back to GitHub – no command line needed.",
      },
      duration: "25–35 perc olvasás",
      videoUrl: null,
      markdown: {
        hu: `## Mi az a GitHub Desktop?

A **GitHub Desktop** egy ingyenes asztali alkalmazás a GitHub-tól, amely grafikus felületet biztosít a Git és GitHub műveletek elvégzéséhez. Lehetővé teszi a repository-k kezelését, módosítások feltöltését és letöltését – parancssor (terminál) használata nélkül.

Letöltés: [desktop.github.com](https://desktop.github.com) – Windows és macOS verziók elérhetők.

---

## Mire jó?

| Művelet | Mit jelent a gyakorlatban |
|---------|--------------------------|
| **Clone** | Letölti a GitHub-on lévő repository-t a gépedre |
| **Commit** | Elment egy „pillanatképet" a változásaidról, üzenettel |
| **Push** | Feltölti a helyi commitjaidat GitHubra |
| **Pull** | Letölti a GitHubról az újabb változásokat |
| **Branch** | Párhuzamos munkavonal létrehozása (pl. kísérletezés) |
| **Diff** | Vizuálisan mutatja, mi változott a fájlokban |

**Miért jó?** Nem kell megtanulni a Git parancsokat. A GitHub Desktop megmutatja, melyik fájl változott, mi az a változás, és egyetlen kattintással feltöltheted.

---

## A workflow – lépésről lépésre

### 1. Repository klónozása (Clone)

1. Nyisd meg a GitHub Desktop-ot
2. Kattints: **File → Clone Repository...**
3. Válaszd ki a GitHub-os repódat a listából (vagy illeszd be az URL-t)
4. Válassz egy helyi mappát
5. Kattints: **Clone**

Ezután a kód ott lesz a gépeden – szerkesztheted bármilyen szövegszerkesztővel vagy az Antigravity-val.

### 2. Módosítások elvégzése

Módosítsd a fájlokat (szövegszerkesztőben, VS Code-ban, Antigravity-val stb.).

A GitHub Desktop automatikusan látja a változásokat: a bal oldali panelen megjelennek a módosított fájlok, és ha rákattintasz, a diff megmutatja pontosan mit változtattál.

### 3. Commit – változások mentése

1. A bal oldali panelen pipáld be a menteni kívánt fájlokat
2. A bal alsó sarkában írd be a **commit üzenetet** (pl. *„Navigáció javítva"*)
3. Kattints: **Commit to main**

Ez helyben elmenti a változásod – GitHubra még nem ment fel!

### 4. Push – feltöltés GitHubra

A commitálás után a jobb felső sarokban megjelenik a **Push origin** gomb. Kattints rá.

Ez feltölti az összes helyi commitodat GitHubra. Ha van GitHub Actions workflow-od (lásd következő lecke), ez azonnal beindítja a build folyamatot.

---

## Tipp: Pull vs Fetch

- **Fetch origin:** megnézi, van-e változás GitHubon (de nem tölti le)
- **Pull origin:** letölti **és beolvasztja** a GitHub-os változásokat a helyi kódba

Ha csak te dolgozol a repón, általában csak push-ot fogsz használni.

---

## Összefoglalás

A tipikus ciklus:
\`\`\`
[Módosítás] → Commit → Push origin → GitHub Actions build → Élő oldal frissül
\`\`\`

Ez az a folyamat, amit újra és újra megcsinálsz, amikor frissíteni szeretnéd a weboldalad.
`,
        en: `## What is GitHub Desktop?

**GitHub Desktop** is a free desktop application from GitHub that provides a graphical interface for Git and GitHub operations. It enables repository management, uploading and downloading changes — without using the command line (terminal).

Download: [desktop.github.com](https://desktop.github.com) — available for Windows and macOS.

---

## What can you do with it?

| Operation | What it means in practice |
|-----------|--------------------------|
| **Clone** | Downloads a GitHub repository to your computer |
| **Commit** | Saves a "snapshot" of your changes with a message |
| **Push** | Uploads your local commits to GitHub |
| **Pull** | Downloads newer changes from GitHub |
| **Branch** | Creates a parallel line of work (e.g. for experiments) |
| **Diff** | Shows visually what changed in each file |

**Why use it?** No need to learn Git commands. GitHub Desktop shows you which files changed, what the changes are, and lets you upload with a single click.

---

## The workflow — step by step

### 1. Clone a repository

1. Open GitHub Desktop
2. Click: **File → Clone Repository...**
3. Select your GitHub repo from the list (or paste the URL)
4. Choose a local folder
5. Click: **Clone**

The code is now on your machine — edit it with any text editor, VS Code, or Antigravity.

### 2. Make modifications

Edit the files (in a text editor, VS Code, Antigravity, etc.).

GitHub Desktop automatically detects the changes: modified files appear in the left panel, and clicking one shows the exact diff.

### 3. Commit — save your changes

1. Check the files you want to include in the left panel
2. In the lower left, type a **commit message** (e.g. *"Fix navigation"*)
3. Click: **Commit to main**

This saves your changes locally — they haven't been uploaded to GitHub yet!

### 4. Push — upload to GitHub

After committing, the **Push origin** button appears in the top right. Click it.

This uploads all your local commits to GitHub. If you have a GitHub Actions workflow (see next lesson), this immediately triggers the build process.

---

## Tip: Pull vs Fetch

- **Fetch origin:** checks if there are changes on GitHub (but doesn't download)
- **Pull origin:** downloads **and merges** changes from GitHub into your local code

If you're working alone, you'll mostly just push.

---

## Summary

The typical cycle:
\`\`\`
[Edit files] → Commit → Push origin → GitHub Actions build → Live site updates
\`\`\`

This is the loop you'll repeat every time you want to update your website.
`,
      },
    },
    {
      id: "antigravity-and-github-action",
      format: "reading",
      title: {
        hu: "3.2 Antigravity + GitHub Action a GitHub Pages-hez",
        en: "3.2 Antigravity + GitHub Action for GitHub Pages",
      },
      summary: {
        hu: "Mi az Antigravity, hogyan változtatsz kódot AI segítségével, és hogyan generáltatod meg a GitHub Actions workflow fájlt, ami automatikusan buildeli és publikálja az oldalad.",
        en: "What Antigravity is, how to make AI-assisted code changes, and how to generate the GitHub Actions workflow file that automatically builds and publishes your site.",
      },
      duration: "30–45 perc olvasás",
      videoUrl: null,
      markdown: {
        hu: `## Mi az Antigravity?

Az **Antigravity** egy AI-alapú kódszerkesztő eszköz lokális fejlesztéshez. A Lovable-hez hasonlóan természetes nyelven fogadja az utasításokat, de a **helyi fájlrendszerben** lévő projektfájlokat módosítja közvetlenül.

**Mire jó?**
- Bugok javítása – leírod a problémát, az AI megkeresi és kijavítja
- Új funkciók hozzáadása – „adj hozzá egy feliratkozó gombot a hero szekcióhoz"
- Stílus és design módosítása
- Konfigurációs fájlok generálása (pl. GitHub Actions workflow)

**Belépés és tokenek:**
Az Antigravity platformra **ingyenesen regisztrálhatsz**, és sok tokent kapsz a kezdéshez. Minden AI-módosítás tokeneket használ – így rengeteg változtatást el tudsz végezni fizetés nélkül, mielőtt elfogyna a keret.

---

## A workflow Antigravity-vel

1. **Clone a repót** GitHub Desktop-pal (ld. előző lecke)
2. Nyisd meg az Antigravity-t, és mutasd meg a projekt mappát
3. Írd be a promptodat (mit szeretnél változtatni)
4. Az AI elvégzi a módosítást a fájlokon
5. GitHub Desktop-ban commit + push → az oldal automatikusan frissül

---

## GitHub Action fájl generálása Antigravity-vel

Most jön a **legjobb rész**: az Antigravity-nek adsz egy promptot, és ő megcsinálja a teljes GitHub Actions workflow fájlt, ami **automatikusan buildeli** és **GitHub Pages-re publikálja** az oldaladat minden push után.

### A prompt, amit be kell adnod

Másold be ezt az Antigravity promptmezőbe, és cseréld le a \`[REPO_NEVE]\` részt a valódi GitHub repository nevédre:

\`\`\`
Kérem, hozd létre a következő fájlt a projektben:

Fájl neve és helye: .github/workflows/deploy.yml

Követelmények:
- Triggerelődjön minden "main" ágra való push esetén,
  és manuálisan is lehessen futtatni (workflow_dispatch)
- Két job legyen: build és deploy
- Build job: Bun telepítése (oven-sh/setup-bun@v2, latest),
  majd bun install és bun run build
- A ./dist mappát töltse fel artifact-ként
  az actions/upload-pages-artifact@v3 action segítségével
- Deploy job: az actions/deploy-pages@v4 action-nel
  tegye élővé az artifact-ot
- Permissions: contents: read, pages: write, id-token: write
- Concurrency group: "pages", cancel-in-progress: false

Emellett frissítsd a vite.config.ts fájlt:
- Állítsd be a base értékét "/[REPO_NEVE]/" értékre
  (csak ha projekt Pages-t használunk, ne user Pages-t)

A végén írd le lépésről lépésre, mit kell beállítanom
a GitHub repository Settings > Pages menüben,
hogy az oldal élessé váljon.
\`\`\`

### Az elkészült deploy.yml fájl

Az Antigravity ehhez hasonló fájlt fog létrehozni:

\`\`\`yaml
${actionYml}
\`\`\`

---

## Mit kell beállítani a GitHub-on?

Miután az Antigravity elkészítette a workflow fájlt, és GitHub Desktop-pal commitoltad + pushold a változást:

**1.** Nyisd meg a repository-t GitHub.com-on

**2.** Kattints: **Settings** (jobb felső sorban)

**3.** Bal oldalt görgess le: **Pages**

**4.** A „Build and deployment" szekcióban:
   - **Source:** válaszd a **"GitHub Actions"** opciót
   *(nem "Deploy from a branch" – a workflow maga intézi a deploy-t)*

**5.** Nincs más teendő – a következő push után a GitHub Actions automatikusan elvégzi a deploy-t

**6.** Az első sikeres deploy után az oldal elérhető lesz ezen az URL-en:
   \`https://[GITHUB_FELHASZNALONEV].github.io/[REPO_NEVE]/\`

---

## Mikor fut le automatikusan?

**Minden push után!** Amikor GitHub Desktop-pal pusholsz változásokat a \`main\` ágra:

\`\`\`
Push → GitHub Actions: build job → bun install + bun build → artifact → deploy job → GitHub Pages frissül
\`\`\`

Ez azt jelenti, hogy **egy commit és push** után 1–2 perccel az élő oldalad frissül. Nincs kézi deploy, nincs terminálba gépelés.

---

## Tipp: az Actions fülön látod a buildet

A repository **Actions** fülén valós időben láthatod, hogy fut-e éppen a build. Ha valami hibára fut (piros X), ott kattintva meg is nézed a hibaüzenetet.
`,
        en: `## What is Antigravity?

**Antigravity** is an AI-powered code editing tool for local development. Similar to Lovable, it accepts natural language instructions, but it modifies project files directly in the **local file system**.

**What can you do with it?**
- Fix bugs — describe the problem, AI finds and fixes it
- Add new features — "add a subscribe button to the hero section"
- Modify styles and design
- Generate configuration files (e.g. GitHub Actions workflows)

**Sign-in and tokens:**
You can **register for free** on the Antigravity platform and get a generous token allowance to start. Each AI modification uses tokens — you can make many changes for free before running out.

---

## The workflow with Antigravity

1. **Clone the repo** with GitHub Desktop (see previous lesson)
2. Open Antigravity and point it at the project folder
3. Type your prompt (what you want to change)
4. AI makes the changes to the files
5. In GitHub Desktop: commit + push → site updates automatically

---

## Generate the GitHub Action file with Antigravity

Here's the **best part**: you give Antigravity a prompt and it creates the full GitHub Actions workflow file that automatically **builds** and **publishes** your site to GitHub Pages on every push.

### The prompt to use

Copy this into Antigravity's prompt field, replacing \`[REPO_NAME]\` with your actual GitHub repository name:

\`\`\`
Please create the following file in this project:

File path: .github/workflows/deploy.yml

Requirements:
- Trigger on every push to the "main" branch,
  and allow manual runs (workflow_dispatch)
- Two jobs: build and deploy
- Build job: install Bun (oven-sh/setup-bun@v2, latest),
  then run bun install and bun run build
- Upload ./dist as an artifact using
  actions/upload-pages-artifact@v3
- Deploy job: publish the artifact using
  actions/deploy-pages@v4
- Permissions: contents: read, pages: write, id-token: write
- Concurrency group: "pages", cancel-in-progress: false

Also update vite.config.ts:
- Set the base value to "/[REPO_NAME]/"
  (only if using project Pages, not user Pages)

At the end, list step by step what I need to configure
in GitHub repository Settings > Pages
to make the site go live.
\`\`\`

### The resulting deploy.yml file

Antigravity will generate something like this:

\`\`\`yaml
${actionYml}
\`\`\`

---

## What to configure on GitHub

After Antigravity creates the workflow file and you commit + push it with GitHub Desktop:

**1.** Open the repository on GitHub.com

**2.** Click: **Settings** (top right row)

**3.** Scroll down on the left: **Pages**

**4.** Under "Build and deployment":
   - **Source:** select **"GitHub Actions"**
   *(not "Deploy from a branch" — the workflow handles deployment itself)*

**5.** Nothing else to do — after the next push, GitHub Actions handles the deploy automatically

**6.** After the first successful deploy, your site will be live at:
   \`https://[GITHUB_USERNAME].github.io/[REPO_NAME]/\`

---

## When does it run automatically?

**After every push!** When you push changes via GitHub Desktop to the \`main\` branch:

\`\`\`
Push → GitHub Actions: build job → bun install + bun build → artifact → deploy job → GitHub Pages updates
\`\`\`

This means your live site updates **1–2 minutes after a commit and push**. No manual deploy, no typing in a terminal.

---

## Tip: watch the build in the Actions tab

In the repository's **Actions** tab you can see the build running in real time. If it fails (red X), clicking it shows you the error message.
`,
      },
    },
    {
      id: "local-mod-quiz",
      format: "quiz",
      title: {
        hu: "3. szekció – Kvíz és gyakorlat",
        en: "Section 3 – Quiz & Practice",
      },
      summary: {
        hu: "Ellenőrizd a tudásod a lokális módosításról, GitHub Desktop-ról és az Antigravity-ről – majd végezd el a 10-15 perces gyakorlati feladatot.",
        en: "Test your knowledge of local modifications, GitHub Desktop, and Antigravity — then complete the 10–15 minute hands-on task.",
      },
      duration: "10–15 perc kvíz + feladat",
      videoUrl: null,
      markdown: { hu: "", en: "" },
      quizData: [
        {
          id: "lm-q1",
          question: {
            hu: "Mire jó a GitHub Desktop?",
            en: "What is GitHub Desktop used for?",
          },
          options: [
            {
              hu: "Grafikus felületen kezelheted a Git/GitHub műveleteket (clone, commit, push) terminál nélkül",
              en: "Managing Git/GitHub operations (clone, commit, push) visually without a terminal",
            },
            {
              hu: "Weboldalak tesztelésére böngészőben",
              en: "Testing websites in a browser",
            },
            {
              hu: "Docker konténerek futtatására",
              en: "Running Docker containers",
            },
            {
              hu: "Domain DNS-beállítások szerkesztésére",
              en: "Editing domain DNS settings",
            },
          ],
          correctIndex: 0,
          explanation: {
            hu: "A GitHub Desktop egy ingyenes, nyílt forráskódú asztali alkalmazás, amely grafikus felületet ad a Git és GitHub műveletekhez.",
            en: "GitHub Desktop is a free, open-source desktop app that provides a visual interface for Git and GitHub operations.",
          },
        },
        {
          id: "lm-q2",
          question: {
            hu: "Mi a helyes sorrendje a GitHub Desktop-os workflow-nak?",
            en: "What is the correct GitHub Desktop workflow order?",
          },
          options: [
            {
              hu: "Commit → Push origin",
              en: "Commit → Push origin",
            },
            {
              hu: "Push origin → Commit",
              en: "Push origin → Commit",
            },
            {
              hu: "Pull → Push → Commit",
              en: "Pull → Push → Commit",
            },
            {
              hu: "Fetch → Branch → Commit",
              en: "Fetch → Branch → Commit",
            },
          ],
          correctIndex: 0,
          explanation: {
            hu: "Először commitolsz (helyi mentés), majd pusholsz (feltöltés GitHubra). A sorrend: módosítás → commit → push.",
            en: "First you commit (local save), then push (upload to GitHub). The order is: edit → commit → push.",
          },
        },
        {
          id: "lm-q3",
          question: {
            hu: "Az Antigravity mire jó a weboldalfejlesztésben?",
            en: "What is Antigravity used for in web development?",
          },
          options: [
            {
              hu: "AI-alapú kódmódosítások elvégzésére lokálisan – bugjavítás, új funkciók, konfiguráció generálás",
              en: "AI-powered code modifications locally – bug fixes, new features, config generation",
            },
            {
              hu: "Domain regisztrációra",
              en: "Domain registration",
            },
            {
              hu: "GitHub Actions workflow-k manuális futtatására",
              en: "Manually running GitHub Actions workflows",
            },
            {
              hu: "Képek tömörítésére és optimalizálására",
              en: "Compressing and optimizing images",
            },
          ],
          correctIndex: 0,
          explanation: {
            hu: "Az Antigravity egy AI kódszerkesztő eszköz, amellyel természetes nyelvű utasításokkal módosíthatsz fájlokat lokálisan.",
            en: "Antigravity is an AI code editor that lets you modify local files using natural language instructions.",
          },
        },
        {
          id: "lm-q4",
          question: {
            hu: "Mit csinál a `.github/workflows/deploy.yml` fájl?",
            en: "What does the `.github/workflows/deploy.yml` file do?",
          },
          options: [
            {
              hu: "Megmondja a GitHub Actions-nek, hogy push után buildeli és deploy-olja az oldalt GitHub Pages-re",
              en: "Tells GitHub Actions to build and deploy the site to GitHub Pages after every push",
            },
            {
              hu: "Automatikusan megveszi a domain nevet",
              en: "Automatically purchases the domain name",
            },
            {
              hu: "A DNS rekordokat állítja be",
              en: "Configures DNS records",
            },
            {
              hu: "Tömöríti a képeket a dist/ mappában",
              en: "Compresses images in the dist/ folder",
            },
          ],
          correctIndex: 0,
          explanation: {
            hu: "A workflow fájl definiálja az automatizációt: a GitHub Actions ezt a fájlt olvassa, és push esetén végrehajtja a build + deploy lépéseket.",
            en: "The workflow file defines the automation: GitHub Actions reads this file and executes the build + deploy steps on push.",
          },
        },
        {
          id: "lm-q5",
          question: {
            hu: "Mit kell beállítani a GitHub Settings → Pages menüben a deploy workflow futtatása után?",
            en: "What must you configure in GitHub Settings → Pages after running the deploy workflow?",
          },
          options: [
            {
              hu: 'Source: "GitHub Actions" opciót kell kiválasztani',
              en: 'Source: select the "GitHub Actions" option',
            },
            {
              hu: "HTTPS tanúsítványt kell manuálisan feltölteni",
              en: "Manually upload an HTTPS certificate",
            },
            {
              hu: "A workflow fájlt kézzel kell aktiválni",
              en: "Manually activate the workflow file",
            },
            {
              hu: "A dist/ mappát kell a gyökérmappába másolni",
              en: "Copy the dist/ folder to the root directory",
            },
          ],
          correctIndex: 0,
          explanation: {
            hu: 'A deploy.yml az actions/upload-pages-artifact és actions/deploy-pages action-öket használja, ezért a Pages forrásának "GitHub Actions"-re kell állnia (nem "Deploy from a branch").',
            en: 'The deploy.yml uses actions/upload-pages-artifact and actions/deploy-pages, so the Pages source must be set to "GitHub Actions" (not "Deploy from a branch").',
          },
        },
      ],
      practicalTask: {
        hu: `## Gyakorlati feladat (~10–15 perc)

**Cél:** Klónozd le a Lovable-ból exportált repódat, és töltsd fel az első változtatással.

### Lépések

1. **Telepítsd a GitHub Desktop-ot** (ha még nincs): töltsd le a [desktop.github.com](https://desktop.github.com) oldalról

2. **Clone a repód**: File → Clone Repository → válaszd ki a Lovable-ből exportált repót

3. **Nyisd meg a projektet** egy szövegszerkesztővel (pl. VS Code) és végezz egy apró változtatást – pl. módosítsd az oldal főcímét

4. **Commit + Push**: GitHub Desktop-ban commitold a változást egy értő üzenettel, majd pushold

5. **Ellenőrzés**: Nyisd meg a repository Actions fülét GitHub.com-on – ha van már workflow, látod hogy elindult-e a build

> **Bónusz:** Ha még nincs deploy.yml fájlod, add be az Antigravity promptot a leckéből, és generáltatd le a workflow fájlt!`,
        en: `## Hands-on Task (~10–15 minutes)

**Goal:** Clone the repo you exported from Lovable and push your first change.

### Steps

1. **Install GitHub Desktop** (if not yet): download from [desktop.github.com](https://desktop.github.com)

2. **Clone your repo**: File → Clone Repository → select the repo you exported from Lovable

3. **Open the project** in a text editor (e.g. VS Code) and make a small change — e.g. edit the main heading on the page

4. **Commit + Push**: in GitHub Desktop, commit the change with a descriptive message, then push

5. **Check**: open the repository's Actions tab on GitHub.com — if you already have a workflow, you'll see if the build started

> **Bonus:** If you don't have a deploy.yml yet, paste the Antigravity prompt from this lesson and generate the workflow file!`,
      },
    },
  ],
};
