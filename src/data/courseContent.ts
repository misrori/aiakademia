import { githubAndDeploySection } from "./githubSection";
import { localModSection } from "./localModSection";
import { secondCourse } from "./secondCourse";
import type { Course, CourseLesson } from "./courseContentTypes";

export type {
  LocalizedText,
  LessonFormat,
  CourseLesson,
  CourseSection,
  Course,
} from "./courseContentTypes";

export const firstCourse: Course = {
  id: "static-site-domain",
  title: {
    hu: "Ötletből saját domaines statikus weboldal",
    en: "From Idea to a Static Website on Your Own Domain",
  },
  subtitle: {
    hu: "Lépésről lépésre gyakorlati kurzus",
    en: "Hands-on course, step by step",
  },
  sections: [
    {
      id: "project-overview-section",
      title: { hu: "0. szekció – Projekt áttekintés", en: "Section 0 – Project Overview" },
      lessons: [
        {
          id: "project-overview",
          format: "reading",
          title: {
            hu: "A kurzus projekt áttekintése",
            en: "Course Project Overview",
          },
          summary: {
            hu: "Ismerd meg a teljes folyamatot: ötlettől saját domaines élő weboldalig – animált lépésekkel és technológia-magyarázatokkal.",
            en: "Understand the full journey: from idea to a live website on your own domain – with animated steps and technology explanations.",
          },
          duration: "5 perc áttekintés",
          videoUrl: null,
          markdown: { hu: "", en: "" },
        },
      ],
    },
    {
      id: "domain-fundamentals",
      title: { hu: "1. szekció – Domain alapok", en: "Section 1 – Domain basics" },
      lessons: [
        {
          id: "choose-and-buy-domain",
          format: "reading",
          title: {
            hu: "Domain név kiválasztása és megvásárlása",
            en: "Choosing and buying a domain name",
          },
          summary: {
            hu: "Névválasztás, vásárlás, DNS és HTTPS alapok – úgy, hogy később könnyen összekösd a GitHub Pages-szel.",
            en: "Naming, purchase, DNS and HTTPS basics – so you can connect GitHub Pages later without guesswork.",
          },
          duration: "35–45 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## Mi a domain név?

A **domain név** (például \`barkacsbolt.hu\` vagy \`sajatprojekt.com\`) egy ember számára olvasható cím az interneten. A háttérben a számítógépek IP-címekkel (számsorokkal) azonosítják a szervereket – a **DNS** (Domain Name System) nevű rendszer végzi az átfordítást a név és a szám között.

A domain az a név, amit az emberek beírnak a böngészőbe. Ha ezt most jól választod meg, később bármikor rámutathatod egy másik szerverre is – a cím megmarad.

---

## Subdomain (aldomain)

A **subdomain** a fő domain elé tett résznév, ponttal elválasztva. Egyetlen megvásárolt domainhez korlátlan számú aldomaint hozhatsz létre, és mindegyik külön webhelyre mutathat.

**Példák:**
- \`www.sajatdomain.hu\` – a fő weboldal
- \`blog.sajatdomain.hu\` – külön blog
- \`app.sajatdomain.hu\` – alkalmazás

Az aldomaineket a DNS-ben külön rekordokkal kezeljük. A kurzus későbbi részében a \`www\` aldomaint fogjuk beállítani a GitHub Pages-hez.

---

## Szempontok a névválasztásnál

- **Rövid és kimondható** – telefonon is egyértelműen elmondható legyen
- **Egyértelmű karakterek** – kerüld a \`0\`/\`O\` és \`1\`/\`l\` keveredést
- **Jövőálló** – ha vállalkozássá nő, a név még mindig megfelelő legyen
- **Foglaltság** – ellenőrizd előre, és legyen alternatívád
- **Védjegy** – ne utánozz ismert márkákat

### Hol vásárolhatsz domaint?

Népszerű szolgáltatók: **Cloudflare**, **Namecheap**, **GoDaddy**. A választásnál két szempont a legfontosabb:
- **Ár** – az első év gyakran akciós (2–3 USD), a megújítás drágább (10–15 USD). Mindig ellenőrizd a második éves árat.
- **DNS kezelés** – szükséged lesz rá a kurzus későbbi részében, amikor a domaint a GitHub Pages-hez kötöd.

---

## Miért érdemes saját domain?

| Előny | Részletezés |
|-------|-------------|
| **Professzionális megjelenés** | A \`sajatprojekt.hu\` hitelesebb, mint egy hosszú, szolgáltató-specifikus cím |
| **Állandó cím** | Névjegykártyán, plakáton, e-mail aláírásban is használható |
| **E-mail cím** | Később beállítható pl. \`hello@sajatdomain.hu\` (külön konfiguráció szükséges) |
| **SEO és bizalom** | A keresők és a látogatók is előnyben részesítik a saját domaint |

---

## Mi az a DNS?

A **DNS** (Domain Name System) az internet névfeloldó rendszere. Feladata: a domain neveket IP-címekre fordítani, hogy a böngésző megtalálja a megfelelő szervert.

**Működése:**
1. A felhasználó beírja a böngészőbe: \`sajatdomain.hu\`
2. A böngésző DNS-lekérdezést indít
3. A DNS visszaadja a szerverhez tartozó IP-címet
4. A böngésző csatlakozik a szerverhez és betölti az oldalt

A DNS nem tárolja a weboldal fájljait – kizárólag a név és a szerver közötti összerendelést biztosítja.

---

## DNS-rekordok típusai

A DNS-ben **rekordok** határozzák meg, hogy egy domain hova mutasson. A három legfontosabb típus:

### A rekord
Egy domain nevet közvetlenül egy **IPv4 IP-címre** mutat.

| Név | Típus | Érték |
|-----|-------|--------|
| \`@\` (apex domain) | A | \`185.199.108.153\` |

A GitHub Pages-hez 4 A rekordot kell beállítani – ezt az 5. szekcióban lépésről lépésre elvégezzük.

### CNAME rekord
Egy domain nevet **egy másik domain névre** irányít (alias).

| Név | Típus | Érték |
|-----|-------|--------|
| \`www\` | CNAME | \`felhasznalonev.github.io\` |

### TXT rekord
Szöveges információt tárol – leggyakrabban **domain tulajdonjog igazolására** használják.

---

## Kapcsolat a GitHub Pages-szel

A DNS-beállítások összekötik a domain neved a GitHub Pages szerverrel. Ennek lépései (az 5. szekcióban részletezzük):

1. A rekordok és CNAME beállítása a domain regisztrátornál
2. Custom domain megadása a GitHub repository beállításaiban
3. HTTPS engedélyezése

Ebben a leckében az alapfogalmak megismerése a cél – a gyakorlati beállítást a kurzus végén végezzük el.

---

## Gyakorlat

1. Írj fel **10 domainötletet** a projektedhez (rövid, kimondható, egyedi nevek)
2. Szűkítsd le **3-ra** – ellenőrizd a foglaltságukat (pl. [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) vagy Namecheap keresőjével)
3. A kedvencednél nézd meg az **első éves** és a **megújítási** árat
4. **Opcionális:** vásárold meg a kiválasztott domaint – a kurzus végén szükséged lesz rá
`,
            en: `## What is a domain name?

A **domain name** (e.g., \`myshop.com\` or \`myproject.io\`) is a human-readable address on the internet. Behind the scenes, computers identify servers by IP addresses (numeric sequences) — the **DNS** (Domain Name System) translates between names and numbers.

The domain is the name people type into their browser. Once registered, it can be pointed to any server at any time — the address itself remains permanent.

---

## Subdomains

A **subdomain** is a prefix placed before the main domain, separated by a dot. A single purchased domain can have an unlimited number of subdomains, each pointing to a different service.

**Examples:**
- \`www.mysite.com\` – the main website
- \`blog.mysite.com\` – a separate blog
- \`app.mysite.com\` – an application

Subdomains are managed via separate DNS records. Later in the course, we will configure the \`www\` subdomain for GitHub Pages.

---

## Name selection criteria

- **Short and pronounceable** — it should be unambiguous when spoken over the phone
- **Unambiguous characters** — avoid \`0\`/\`O\` and \`1\`/\`l\` confusion
- **Future-proof** — the name should still work if it grows into a business
- **Availability** — check in advance and have alternatives ready
- **Trademarks** — do not imitate known brands

### Where to buy

Popular registrars: **Cloudflare**, **Namecheap**, **GoDaddy**. Two key factors:
- **Price** — first-year pricing is often promotional ($2–3); renewals are typically higher ($10–15). Always verify the second-year price.
- **DNS management** — you will need this later in the course when connecting the domain to GitHub Pages.

---

## Benefits of a custom domain

| Benefit | Details |
|---------|---------|
| **Professional appearance** | \`myproject.com\` is more credible than a long, provider-specific URL |
| **Permanent address** | Usable on business cards, posters, email signatures |
| **Custom email** | Enables addresses like \`hello@mysite.com\` (separate configuration required) |
| **SEO and trust** | Search engines and visitors favor custom domains |

---

## What is DNS?

**DNS** (Domain Name System) is the internet’s name resolution system. Its role: translating domain names into IP addresses so the browser can locate the correct server.

**How it works:**
1. The user types \`mysite.com\` into the browser
2. The browser initiates a DNS lookup
3. DNS returns the IP address associated with the server
4. The browser connects to the server and loads the page

DNS does not store website files — it only provides the mapping between names and servers.

---

## DNS record types

DNS **records** determine where a domain points. The three most important types:

### A record
Points a domain name directly to an **IPv4 IP address**.

| Name | Type | Value |
|------|------|--------|
| \`@\` (apex domain) | A | \`185.199.108.153\` |

GitHub Pages requires 4 A records — we will configure these step by step in Section 5.

### CNAME record
Points a domain name to **another domain name** (alias).

| Name | Type | Value |
|------|------|--------|
| \`www\` | CNAME | \`username.github.io\` |

### TXT record
Stores text information — most commonly used for **domain ownership verification**.

---

## Connection to GitHub Pages

DNS settings link your domain name to the GitHub Pages server. The steps (detailed in Section 5):

1. Configure A records and CNAME at the domain registrar
2. Set the custom domain in the GitHub repository settings
3. Enable HTTPS

This lesson covers the foundational concepts — the hands-on configuration comes at the end of the course.

---

## Exercise

1. Write down **10 domain ideas** for your project (short, pronounceable, unique names)
2. Narrow down to **3** — check availability (e.g., [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/) or Namecheap search)
3. For your top pick, check the **first-year** and **renewal** pricing
4. **Optional:** purchase your chosen domain — you will need it at the end of the course
`,
          },
        },
        {
          id: "domain-purchase-demo",
          format: "video",
          title: {
            hu: "Demó: domain vásárlása (lépésről lépésre)",
            en: "Demo: buying a domain (step by step)",
          },
          summary: {
            hu: "Placeholder videó – később cseréld a saját felvételre. A cél: lásd a kattintási sorrendet egy valódi regisztrátornál.",
            en: "Placeholder video – replace with your own later. Goal: see the click path at a real registrar.",
          },
          duration: "8–12 perc",
          videoUrl: "https://www.youtube.com/embed/8DVEezEkRF4",
          markdown: { hu: "", en: "" },
        },
        {
          id: "domain-quiz",
          format: "quiz",
          title: {
            hu: "1. szekció – Kvíz és gyakorlat",
            en: "Section 1 – Quiz & Practice",
          },
          summary: {
            hu: "Ellenőrizd a tudásod a domain nevekről, DNS-ről és a vásárlás szempontjairól – majd végezd el a 10-15 perces gyakorlati feladatot.",
            en: "Test your knowledge of domain names, DNS, and buying criteria — then complete the 10–15 minute hands-on task.",
          },
          duration: "10–15 perc kvíz + feladat",
          videoUrl: null,
          markdown: { hu: "", en: "" },
          quizData: [
            {
              id: "dom-q1",
              question: {
                hu: "Mi a DNS (Domain Name System) feladata?",
                en: "What is the role of DNS (Domain Name System)?",
              },
              options: [
                {
                  hu: "Az emberi olvasható domainneveket IP-címekre fordítja, hogy a böngésző megtalálja a szervert",
                  en: "Translates human-readable domain names into IP addresses so the browser can find the server",
                },
                {
                  hu: "Titkosítja a weboldalad tartalmát (SSL)",
                  en: "Encrypts your website's content (SSL)",
                },
                {
                  hu: "Tárolja a weboldalad HTML/CSS/JS fájljait",
                  en: "Stores your website's HTML/CSS/JS files",
                },
                {
                  hu: "Összeköti a GitHub-ot a domain regisztrátorral",
                  en: "Links GitHub to the domain registrar",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "A DNS egy névfeloldó rendszer: pl. a 'barkacsbolt.hu' nevet lefordítja egy IP-számra, amit a böngésző már tud kezelni.",
                en: "DNS is a name resolution system: it translates e.g. 'myshop.com' into an IP address that the browser can use.",
              },
            },
            {
              id: "dom-q2",
              question: {
                hu: "Hol vásárolhatsz domain nevet?",
                en: "Where can you buy a domain name?",
              },
              options: [
                {
                  hu: "Cloudflare, GoDaddy, Namecheap (domain regisztrátoroknál)",
                  en: "Cloudflare, GoDaddy, Namecheap (domain registrars)",
                },
                {
                  hu: "GitHub, GitLab, Bitbucket",
                  en: "GitHub, GitLab, Bitbucket",
                },
                {
                  hu: "Google Drive, Dropbox, OneDrive",
                  en: "Google Drive, Dropbox, OneDrive",
                },
                {
                  hu: "Vercel, Netlify, Heroku",
                  en: "Vercel, Netlify, Heroku",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "A Cloudflare, GoDaddy és Namecheap domain regisztrátorok, ahol megvásárolhatod és kezelheted a domain neved.",
                en: "Cloudflare, GoDaddy, and Namecheap are domain registrars where you can buy and manage your domain.",
              },
            },
            {
              id: "dom-q3",
              question: {
                hu: "Mi az a subdomain (aldomain)?",
                en: "What is a subdomain?",
              },
              options: [
                {
                  hu: "A fő domain elé tett résznév (pl. blog.sajatdomain.hu), ami külön helyre irányíthat",
                  en: "A prefix added before the main domain (e.g. blog.mysite.com) that can point to a different destination",
                },
                {
                  hu: "Egy olcsóbb alternatíva a .com végzős domainekre",
                  en: "A cheaper alternative to .com domains",
                },
                {
                  hu: "A domain titkosított, HTTPS-es változata",
                  en: "The encrypted, HTTPS version of a domain",
                },
                {
                  hu: "A domain IPv6 neve",
                  en: "The IPv6 name of the domain",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "Egy megvásárolt domainhez korlátlan aldomaint hozhatsz létre ingyen, amelyek különböző webhelyekre mutathatnak.",
                en: "With one purchased domain you can create unlimited subdomains for free, each pointing to a different site.",
              },
            },
            {
              id: "dom-q4",
              question: {
                hu: "Mire figyelj domain név vásárlásakor?",
                en: "What should you pay attention to when buying a domain name?",
              },
              options: [
                {
                  hu: "Legyen rövid, kimondható, egyedi; ellenőrizd a védjegyet és a megújítási árat",
                  en: "Keep it short, pronounceable, unique; check for trademarks and the renewal price",
                },
                {
                  hu: "Minél hosszabb a domain, annál jobb a keresőoptimalizálás",
                  en: "The longer the domain, the better the SEO",
                },
                {
                  hu: "Csak .com végzős domaint érdemes vásárolni",
                  en: "Only .com domains are worth buying",
                },
                {
                  hu: "A domain neve kötelezően tartalmazza a cégnevet",
                  en: "The domain name must always contain the company name",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "Figyelj: sok regisztrátornál az első év kedvezményes, a megújítás már magasabb áron történik. Ellenőrizd a second-year árat vásárlás előtt!",
                en: "Watch out: many registrars offer a discount for the first year, but renewals are priced higher. Check the second-year price before buying!",
              },
            },
            {
              id: "dom-q5",
              question: {
                hu: "Melyik állítás igaz a domain árazásról?",
                en: "Which statement about domain pricing is true?",
              },
              options: [
                {
                  hu: "Az első év általában kedvezményes, a megújítás (2. évtől) drágább lehet",
                  en: "The first year is usually discounted; renewal (from year 2) can be more expensive",
                },
                {
                  hu: "A domain ár minden évben pontosan ugyanannyi",
                  en: "Domain prices are exactly the same every year",
                },
                {
                  hu: "A domain vásárlás egyszeri díj, megújítás soha nem szükséges",
                  en: "Buying a domain is a one-time fee; renewal is never needed",
                },
                {
                  hu: "Domainek kizárólag éves előfizetéssel, havi díj nélkül vásárolhatók",
                  en: "Domains can only be purchased as annual subscriptions, never monthly",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "Pl. egy .com domain első éve lehet 1-3 USD promóciós áron, de megújítása 10-15 USD. Érdemes az első vásárlás előtt a megújítási árat is megnézni.",
                en: "E.g. a .com domain's first year might cost $1–3 on promo, but renewal is $10–15. Always check the renewal price before purchasing.",
              },
            },
          ],
          practicalTask: {
            hu: `## Gyakorlati feladat (~10–15 perc)

**Cél:** Keress egy domain nevet a te projekted számára és végezd el az előkészületeket.

### Lépések

1. Írj fel **10 domain ötletet** a projektedhez (rövid, kimondható, egyedi nevek)

2. Szűkítsd le a listát **3 jelöltre** – ellenőrizd, hogy elérhetők-e (pl. [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/), GoDaddy vagy Namecheap keresőjével)

3. Az 1 legjobbnál nézd meg:
   - Mennyibe kerül az **első év**?
   - Mennyibe kerül a **megújítás** (2. évtől)?
   - Ki a DNS kezelő (a regisztrátor vagy átviheted máshová)?

4. **Opcionális:** Vásárold meg a kiválasztott domaint – a következő szekciókban szükséged lesz rá!

> **Tipp:** Ha még nem tudod melyik projektet akarod elkészíteni, vedd meg a neved + .com / .hu kombinációját – ez mindig hasznos.`,
            en: `## Hands-on Task (~10–15 minutes)

**Goal:** Find a domain name for your project and do the preparation work.

### Steps

1. Write down **10 domain ideas** for your project (short, pronounceable, unique names)

2. Narrow down to **3 candidates** — check if they're available (e.g. using [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/), GoDaddy, or Namecheap search)

3. For your top pick, check:
   - How much is the **first year**?
   - How much is the **renewal** (from year 2)?
   - Who manages DNS (the registrar, or can you transfer it)?

4. **Optional:** Purchase your chosen domain — you'll need it in the upcoming sections!

> **Tip:** If you're not sure which project to build yet, buy your name + .com/.io — that's always useful.`,
          },
        },
      ],
    },
    {
      id: "build-with-ai",
      title: { hu: "2. szekció – Weboldal készítése AI-val", en: "Section 2 – Build the site with AI" },
      lessons: [
        {
          id: "prompt-and-build",
          format: "reading",
          title: {
            hu: "2.1 Részletes prompt írás: diktálás, sablonok, referenciák",
            en: "2.1 Detailed prompts: dictation, templates, and references",
          },
          summary: {
            hu: "A legfontosabb: minél részletesebb prompt. ChatGPT + 21st.dev minták + példa weboldalak – egy fájlba, amit a buildernek adsz.",
            en: "The key is detail. ChatGPT + 21st.dev patterns + example sites—one prompt package for your builder.",
          },
          duration: "30–40 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## A legfontosabb szabály: legyen *nagyon* részletes

Az AI-k (és a weboldal-építők) azt adják vissza, amit **pontosan** kérsz. Egy homályos mondatból „átlagos” eredmény jön; egy **strukturált, részletes** promptból olyan oldal, ami közel áll a fejedben lévőhöz.

**Cél:** egy olyan **egész promptot** előállítani, amit **úgy, ahogy van** át tudsz adni:
- egy **weboldal-készítőnek** (pl. Lovable),
- vagy egy **általános AI-nak** előmunkának,
- és onnan már csak finomítasz.

---

## 1. lépés: beszéld meg a ChatGPT-vel (diktálás)

Nyisd meg például a **ChatGPT**-t, és **hangosan, folyékonyan** mondd el, min dolgozol:

- kinek készül az oldal (célcsoport),
- milyen hangnem (formális / laza),
- milyen szekciók kellenek (Hero, árak, FAQ…),
- milyen színek, stílus, példák,
- mit *nem* szeretnél.

**Fontos:** ne tördelgesd előre túl szépen – a lényeg, hogy **kiömlik** az összes kontextus.

---

## 2. lépés: az egész szöveget vedd át *változtatás nélkül*

Amikor a ChatGPT (vagy más eszköz) összerak egy **jó, strukturált promptot**, azt a blokkot:

1. **Másold ki egybe** (egy nagy szövegként).
2. **Ne vagdosd szét** „mert hosszú” – éppen a részletesség a lényeg.
3. Ezt a blokkot fogod **bemásolni** a kiválasztott builder „prompt / utasítás” mezőjébe, vagy **Lovable-hoz előkészített projekt-leírásként** használni.

Ha kell, kérsz még egy kört: „*Rövidítsd fejlécekre és listákra, de ne veszíts információt!*”

---

## 3. lépés: építs sablont – például a 21st.dev-ről

A **[21st.dev](https://21st.dev/)** olyan gyűjtemény, ahol **kész UI-mintákat** (szekciókat) nézhetsz meg: hero, pricing, FAQ, footer, stb.

**Hogyan használd?**

1. Böngészd a szekciókat, ami **közel áll** ahhoz, amit szeretnél.
2. A promptodba írd bele **konkrétan**: „*A hero szekció olyan legyen, mint egy 21st.dev-s [pl. minimal split hero], de színek: …*”
3. Ha van **kód-részlet** vagy leírás – hivatkozz rá: „*Hasonló elrendezés, de a szövegem a következő…*”

Így nem a nulláról találod ki a „milyen legyen a layout”, hanem **viszonyítási pontot** adsz az AI-nak.

---

## 4. lépés: másolj be *konkrét* weboldalakat referenciának

A második nagy trükk: **meglétező oldalakat** adsz mintának.

- Másold be a promptba: **URL + 2–3 mondat**, mi tetszik (tipográfia, sűrűség, szekciók sorrendje).
- Vagy: **screenshot** + rövid leírás (ha az eszköz támogatja).

**Példa mondat a promptban:**  
„*A főoldal struktúrája hasonlítson a [példa-url] oldalra: felül nagy cím, alatta 3 kártya, de a szöveg a saját termékemhez igazodjon.*”

Ez **nem** másolás jogi értelemben – te adod meg a saját szöveget és márkát; csak a **szerkezetet** és a **ritmust** veszed át.

---

## 5. lépés: egy összefoglaló prompt-sablon (kiindulópont)

Az alábbiakat töltsd ki, és így add át a buildernek:

\`\`\`
Projekt: [név / téma]
Célcsoport: [kik]
Hangnem: [formális / barátságos / …]
Szekciók sorrendben: [Hero, …]
Stílus / referencia: [21st.dev minta + 1–2 példa URL]
Színek / betűk: [ha van]
Kötelező elemek: [CTA szöveg, űrlap, …]
Kerülendő: […]
\`\`\`

---

## 6. lépés: GitHub Pages kompatibilitás – rakd a prompt végére

A kész oldalt a kurzus **4. szekciójában GitHub Pages**-re publikáljuk. A projekt-oldalak egy **path prefix** alatt szolgálódnak ki (\`username.github.io/repo-neve/\`), ezért a buildernek már az elején meg kell mondanunk, hogy **routing-kompatibilis** projektet generáljon. Enélkül az oldal élesben **404**-et vagy üres képernyőt ad.

**Illeszd be a prompt végére ezt a blokkot:**

\`\`\`text
Fontos: ezt a projektet GitHub Pages-re fogom deployolni, ezért a routing-nak kompatibilisnek kell lennie alútvonalakkal. Kérlek a következőket biztosítsd:

1. A vite.config.ts-ben legyen beállítva a base érték a repository nevére (a repo név helyét később könnyen átírom):

export default defineConfig({
  base: "/repo-neve/",
  plugins: [react()],
  // ...
});

2. Az src/App.tsx-ben a <BrowserRouter> kapjon basename paramétert, ami a Vite környezeti változóból olvas:

<BrowserRouter basename={import.meta.env.BASE_URL}>
  <Routes>
    {/* ... útvonalak */}
  </Routes>
</BrowserRouter>

A fenti két beállítás nélkül a GitHub Pages deploy után az oldal 404-et vagy üres képernyőt ad.
\`\`\`

> **Miért most?** Ha a Lovable kemény (\`/\`) útvonalakkal generál, utólag kézzel kell kijavítanod a routert – fájdalommentesebb, ha az elejétől jó.
>
> **Vercelre deployolnál?** Akkor a \`base\` maradhat \`/\` és a \`basename\` sem kell. A fenti beállítás mindkét úttal kompatibilis, mert \`import.meta.env.BASE_URL\` a Vite \`base\`-ét követi – csak akkor hat, ha szükséges. (Részletek: **4.4 lecke**.)

---

## Gyakorlat

1. Diktálj 5 percet a ChatGPT-nek egy valós ötletről, kérd meg, hogy **egy összefoglaló „builder-promptot”** írjon belőle.
2. Válassz **2 szekció-mintát** a 21st.dev-en, és **nevezd meg** őket a promptban.
3. Adj hozzá **1 példa weboldalt** URL-lel + 2 mondatos „mit másoljunk el” leírással.
4. Illeszd a prompt végére a **6. lépés GitHub Pages kompatibilitás** blokkját.
5. Másold be a teljes szöveget egy **jegyzetbe** – ez lesz a **Lovable / más builder** induló promptja a következő leckékhez.
`,
            en: `## Rule #1: make the prompt *very* detailed

Models and builders return what you **explicitly** ask for. A vague sentence yields an average page; a **structured, rich** prompt gets you close to what you imagine.

**Goal:** produce **one full prompt block** you can paste **as-is** into:
- a **site builder** (for example Lovable), or
- as **prep work** before you iterate.

---

## Step 1: talk it through (dictate)

Open **ChatGPT** (or similar) and **speak** your idea out loud:

- audience and goal
- tone (formal / casual)
- required sections (Hero, pricing, FAQ…)
- visual direction, examples, constraints
- what you **do not** want

Let the context spill out first—do not over-edit too early.

---

## Step 2: copy the whole prompt *without trimming*

When the model returns a strong structured prompt:

1. Copy it **as one block**
2. Avoid chopping it “because it is long”—detail is the point
3. Paste it into your builder’s instruction field or keep it as your **Lovable project brief**

Ask for a cleanup pass if needed: “*Reformat with headings and bullets but do not lose information.*”

---

## Step 3: add templates—for example from 21st.dev

**[21st.dev](https://21st.dev/)** is a library of **UI section patterns** (hero, pricing, FAQ, etc.).

**How to use it**

1. Pick patterns that match your vision
2. Name them in your prompt: “*Hero similar to a minimal split layout on 21st.dev, colors: …*”
3. If there is code or a description, reference it explicitly

You give the AI a **layout anchor** instead of inventing structure from zero.

---

## Step 4: paste real websites as references

Add **concrete examples**:

- URL + a few sentences about what you want to mirror (spacing, typography, section order)
- Optional: screenshot + caption if your tool supports images

**Example sentence:**  
“*Match the information hierarchy of [example-url]: big headline, then three cards, but use my copy and brand.*”

You are borrowing **structure and rhythm**, not stealing content—your text and brand stay yours.

---

## Step 5: starter template

Fill this in and hand it to the builder:

\`\`\`
Project: [name / topic]
Audience: [who]
Tone: [voice]
Sections in order: [Hero, …]
Style / references: [21st.dev pattern + 1–2 URLs]
Colors / fonts: [optional]
Must-haves: [CTA, form, …]
Avoid: […]
\`\`\`

---

## Step 6: GitHub Pages compatibility — paste this at the end

We will publish the finished site to **GitHub Pages** in **Section 4**. GitHub Pages project sites are served under a **path prefix** (\`username.github.io/repo-name/\`), so you must tell the builder **up front** to generate a **routing-compatible** project. Otherwise the live site will throw **404s** or show a blank page.

**Paste this block at the end of your prompt:**

\`\`\`text
Important: I will deploy this project to GitHub Pages, so the routing must be compatible with sub-paths. Please ensure:

1. In vite.config.ts, set the base value to the repository name (I can easily swap the repo name later):

export default defineConfig({
  base: "/repo-name/",
  plugins: [react()],
  // ...
});

2. In src/App.tsx, give <BrowserRouter> a basename prop that reads from the Vite env:

<BrowserRouter basename={import.meta.env.BASE_URL}>
  <Routes>
    {/* ... routes */}
  </Routes>
</BrowserRouter>

Without these two settings, the GitHub Pages deploy will return 404s or a blank screen.
\`\`\`

> **Why now?** If Lovable hard-codes (\`/\`) paths, you will have to fix the router afterwards by hand. Baking this in up front saves pain later.
>
> **Deploying to Vercel instead?** Then \`base\` can stay \`/\` and \`basename\` is not needed. The setup above is safely compatible with both paths because \`import.meta.env.BASE_URL\` tracks the Vite \`base\` — it only kicks in when it needs to. (Details: **lesson 4.4**.)

---

## Exercise

1. Dictate for ~5 minutes, then ask the model for a single **“builder-ready prompt”**.
2. Pick **two section patterns** on 21st.dev and **name them** in the prompt.
3. Add **one reference site** with URL + two sentences on what to mimic.
4. Append the **Step 6 GitHub Pages compatibility** block to the end of the prompt.
5. Save the full text as your **starting prompt** for Lovable or another builder in the next lessons.
`,
          },
        },
        {
          id: "lovable-platform-overview",
          format: "reading",
          title: {
            hu: "2.2 Mi a Lovable (lovable.dev)?",
            en: "2.2 What is Lovable (lovable.dev)?",
          },
          summary: {
            hu: "Részletesen: mi a Lovable, publikálás, integrációk (Supabase, Stripe, Edge), kreditek – hivatalos dokumentáció szerint.",
            en: "Deep dive: what Lovable is, publishing, integrations (Supabase, Stripe, Edge), credits—aligned with official docs.",
          },
          duration: "35–50 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## Mi a Lovable?

A **[Lovable](https://lovable.dev/)** egy AI-vezérelt webalkalmazás-építő platform. Természetes nyelven írt utasítások (promptok) alapján **teljes weboldalakat generál** – a végeredmény valódi, szerkeszthető forráskód (React + Vite + TypeScript).

**Fő jellemzők:**
- Nem igényel programozási tudást – szöveges utasításokkal irányítható
- Az eredmény exportálható és tovább fejleszthető
- Azonnali előnézet és iteratív finomítás

---

## Munkafolyamat

1. Regisztráció a [lovable.dev](https://lovable.dev)-en (ingyenes)
2. Új projekt létrehozása
3. Szöveges utasítás megadása (pl. *„Készíts egy landing oldalt egy barkácsbolt számára, hero szekcióval, szolgáltatásokkal és kapcsolati formmal”*)
4. Az AI generálja az oldalt
5. Iteratív finomítás további utasításokkal (szöveg, szín, elrendezés módosítása)
6. Publikálás vagy exportálás

---

## Publikálás

Az elkészült projekt azonnal megtekinthető egy **\`*.lovable.app\`** végződésű URL-en. Ez a link megosztható, de **nem a saját domained** – a saját domain beállításához a projektet GitHubra exportáljuk és GitHub Pages-szel publikáljuk (ingyenesen).

---

## További képességek

Ebben a kurzusban statikus weboldalakat készítünk, de a Lovable további integrációkat is támogat:

| Funkció | Technológia |
|---------|-------------|
| Adatbázis | Supabase (PostgreSQL) |
| Felhasználókezelés | Supabase Auth (e-mail, Google, stb.) |
| Fizetés | Stripe integráció |
| Fájltárolás | Supabase Storage |

Ezek a funkciók a kurzus anyagán kívül esnek, de érdemes tudni róluk a jövőbeli bővítéshez.

---

## Kreditrendszer

A Lovable kreditalapú rendszert használ: minden prompt kreditbe kerül, az összeg az utasítás összetettségétől függ.

**Ingyenes csomag:**
- **Napi 5 kredit** (éjfélkor UTC újraindul)
- **Havi maximum 30** kredit
- A fel nem használt napi kreditek nem halmozódnak

**Gyakorlati becslés:** napi 5 kreditből kb. 2–3 érdemi módosítás végezhető el. Egyszerűbb módosítások (szín, szöveg) kevesebb kreditet használnak, összetettebb kérések (új szekció, integráció) többet.

Részletek: [Plans and credits – Lovable Docs](https://docs.lovable.dev/introduction/plans-and-credits).

---

## Saját domain: két lehetőség

| Megoldás | Jellemzők |
|----------|-----------|
| **Lovable Custom Domain** | A fizetős (Pro) csomagban elérhető – kényelmes, de nem ingyenes |
| **Export → GitHub → GitHub Pages** | A kód GitHubra kerül, ingyenesen publikálható GitHub Pages-szel, a domain DNS-beállítással csatlakoztatható |

Ebben a kurzusban a második megoldást használjuk.

---

## Összefoglaló

| Kérdés | Válasz |
|--------|--------|
| Mi a Lovable? | AI-vezérelt weboldal-építő platform |
| Szükséges-e programozási tudás? | Nem – szöveges utasításokkal működik |
| Azonnali előnézet? | Igen – \`*.lovable.app\` URL-en |
| Ingyenes keret | Napi 5 kredit, havi max. 30 |
| Saját domain | A kurzusban: export → GitHub Pages → DNS |

---

## Gyakorlat

1. Regisztrálj a [lovable.dev](https://lovable.dev)-en
2. Hozz létre egy új projektet az előző leckéből készült prompt alapján
3. Végezz 2–3 iteratív finomítást (szín, szöveg, elrendezés)
4. Figyeld meg a kreditfogyást a felületen
`,
            en: `## What is Lovable?

**[Lovable](https://lovable.dev/)** is an AI-driven web application builder. It generates **complete websites** from natural language instructions (prompts) — the output is real, editable source code (React + Vite + TypeScript).

**Key characteristics:**
- No programming knowledge required — controlled via text instructions
- Output is exportable and can be further developed
- Immediate preview and iterative refinement

---

## Workflow

1. Register at [lovable.dev](https://lovable.dev) (free)
2. Create a new project
3. Provide a text instruction (e.g., *”Build a landing page for a hardware store with a hero section, services, and a contact form”*)
4. The AI generates the page
5. Refine iteratively with additional instructions (text, colors, layout)
6. Publish or export

---

## Publishing

Completed projects are immediately viewable at a **\`*.lovable.app\`** URL. This link is shareable, but it is **not your custom domain** — to use your own domain, we will export the project to GitHub and publish via GitHub Pages (free of charge).

---

## Additional capabilities

This course focuses on static websites, but Lovable supports further integrations:

| Feature | Technology |
|---------|------------|
| Database | Supabase (PostgreSQL) |
| User management | Supabase Auth (email, Google, etc.) |
| Payments | Stripe integration |
| File storage | Supabase Storage |

These features are outside the scope of this course but worth knowing about for future expansion.

---

## Credit system

Lovable uses a credit-based system: each prompt costs credits, with the amount depending on instruction complexity.

**Free plan:**
- **5 credits per day** (resets at midnight UTC)
- **Monthly maximum of 30** credits
- Unused daily credits do not accumulate

**Practical estimate:** 5 daily credits allow approximately 2–3 meaningful modifications. Simple changes (color, text) consume fewer credits; complex requests (new sections, integrations) consume more.

Details: [Plans and credits – Lovable Docs](https://docs.lovable.dev/introduction/plans-and-credits).

---

## Custom domain: two options

| Approach | Characteristics |
|----------|----------------|
| **Lovable Custom Domain** | Available with the paid (Pro) plan — convenient but not free |
| **Export → GitHub → GitHub Pages** | Code is exported to GitHub, published for free via GitHub Pages, domain connected via DNS |

This course uses the second approach.

---

## Summary

| Question | Answer |
|----------|--------|
| What is Lovable? | AI-driven web application builder |
| Programming required? | No — controlled via text instructions |
| Immediate preview? | Yes — at a \`*.lovable.app\` URL |
| Free tier | 5 credits/day, 30/month max |
| Custom domain | In this course: export → GitHub Pages → DNS |

---

## Exercise

1. Register at [lovable.dev](https://lovable.dev)
2. Create a new project using the prompt from the previous lesson
3. Perform 2–3 iterative refinements (colors, text, layout)
4. Observe the credit usage on the interface
`,
          },
        },
        {
          id: "export-lovable-to-github",
          format: "reading",
          title: {
            hu: "Exportálás",
            en: "Export",
          },
          summary: {
            hu: "Először: .lovable.app és saját domain – miért exportálunk GitHubra ingyen. Aztán: repo, továbbfejlesztés, GitHub Pages.",
            en: "First: .lovable.app vs your domain—why we export to GitHub for a free path. Then: repo, iteration, GitHub Pages.",
          },
          duration: "15–20 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## Először: a Lovable-projekt már rögtön publikálható

A Lovable-ban összerakott alkalmazás **nem csak vázlat**: **azonnal publikálható**, és tipikusan egy **\`*.lovable.app\`** végződésű címen érhető el. Tehát **kapsz egy élő linket** – megosztható, bemutatható – **anélkül**, hogy most a saját, megvásárolt domainhez kötnéd.

## Saját domain – két út

**Amit szeretnél:** a weboldal ne \`valami.lovable.app\` legyen, hanem a **saját domain** (pl. \`sajatweb.hu\`) – lehetőleg **minél kevesebb extra díjjal**.

| Út | Lényeg |
|----|--------|
| **Lovable custom domain** | A platform **meg tudja** kötni a saját domained – ez a hivatalos dokumentáció szerint a **fizetős (Pro) csomag** része. Kényelmes, egy helyen maradsz, de **nem ingyenes** opció. |
| **Export → GitHub → GitHub Pages + DNS** | A projektet **kiexportáljuk GitHubra**; a kód **nálad** van. A **GitHub Pages** (megfelelő beállításokkal) **ingyen** kiszolgálhatja az oldalt; a **saját domain** a **DNS** beállításával jön rá (későbbi leckék) – **a Lovable fizetős domain-szolgáltatása nélkül** is megoldható. |
| **Export → GitHub → Vercel + DNS** | Ugyanaz az export, de a hostingot a **Vercel** végzi (ingyenes Hobby csomag, non-commercial). Nincs \`base\` / \`basename\` vesződés, minden branchhez automatikus preview URL. Részletek: **4.4 lecke**. |

**Ebben a kurzusban** a második utat választjuk alapértelmezettnek (**export + GitHub Pages**), a **4.4 Vercel** lecke pedig megmutatja az alternatívát.

---

## Miért pont a GitHub az export célja?

A Lovable-ban (vagy más **AI / vizuális builderben**) elkészült alap gyakran **nagyon jól néz ki** – működő **React / Vite / Node-alapú** projekt (a pontos stack az eszköztől függ). A következő lépés: ez a kód **ne csak a builderben** éljen, hanem **egy GitHub repository-ban** legyen.

**Miért jó a GitHub?**

- **Verziókezelés:** minden változás követhető (commitok, visszaállítás).
- **Együttműködés:** később más is klónozhatja, PR-t küldhet.
- **Folytatás:** lokálisan (Cursor, VS Code) vagy böngészőben tovább fejleszthető.
- **Ingyenes publikálás:** a **GitHub Pages** képes a repo-ból **statikus weboldalt** kiszolgálni **fizetés nélkül** (megfelelő beállításokkal).

---

## Nem csak Lovable: a lényeg a „legyen a GitHubon”

Bármilyen olyan eszközzel elkezdheted a weboldal-építést, ami **modern frontend stacket** ad ki (például **React**, **Vite**, **Node** környéki projekt). A lényeg a kurzusban:

1. Legyen **egy tiszta projekt** a gépen / a felhőben.
2. Kerüljön fel **egy GitHub repository-ba** (push / export / import).
3. Onnan **ugyanabból a kódból** tudunk tovább dolgozni és **GitHub Pages-szel** élesíteni.

Ha a builder mást exportál, mint te várod – a következő szekciókban a **Git** és a **repo** lesz a közös nyelv.

---

## Lovable → GitHub: mit fogunk csinálni?

1. A Lovable-ban elkészült projektet **exportáljuk / összekötjük** úgy, hogy a forráskód **GitHub repository-ban** landoljon.
2. A repo lesz a **„single source of truth”**: innen deploy, innen issue, innen PR.
3. A **GitHub Pages** bekapcsolásával ugyanabból a kódból lehet **publikus URL-t** kapni (a build lépéseket a 3. szekció részletezi).

Az export **pontos gombneve és menüje** változhat a Lovable felületén – ezért itt csak a **célt** rögzítjük; a saját képeddel kiegészítve pontos lesz.

---

## Hova kattints? (placeholder)

Az alábbi **helykitöltő kép** mutatja, hova fogod majd berakni a **screenshotot**: a Lovable felületén azt a részt, ahol az **export / GitHub / Connect** jellegű lépés van.

![Lovable export – ide jön a saját screenshot (hova kattints)](/images/lovable-export-placeholder.svg)

*Cseréld le a \`public/images/lovable-export-placeholder.svg\` fájlt a saját PNG/JPG képedre, vagy módosítsd a leckében a kép útvonalát.*

---

## Rövid összefoglaló

| Kérdés | Válasz |
|--------|--------|
| Miért export? | A kód **nálad legyen**, és **ingyenes** út legyen a saját domainhez (GitHub Pages + DNS). |
| Lovable domain? | **Pro** alatt megoldható – mi most **GitHub**-ot választunk. |
| Miért GitHub? | **Git**, **közös munka**, **Pages** egy helyen. |
| Mi a GitHub Pages? | Ingyenes **statikus** kiszolgálás repo-ból. |
| Kell-e most mindent érteni? | Nem – a 3. szekció lépésről lépésre visz tovább. |

---

## Gyakorlat

1. Ha már van Lovable projekted: keresd meg az **export / GitHub** lehetőséget, és jegyezd fel **3 lépésben**, mit kattintottál (később ebből lesz a saját képed szövege).
2. Ha még nincs: olvasd el a Lovable súgóját „**GitHub**” vagy „**export**” kulcsszóval – csak a folyamatot ismerd meg előre.
3. Gondold át: **milyen fájlok** kerülnek a repo-ba (pl. \`package.json\`, \`src/\`) – ezekkel fogsz a következő szekcióban dolgozni.
`,
            en: `## First: your Lovable app is already publishable

What you build in Lovable is not just a mock: you can **publish it right away**, typically on a **\`*.lovable.app\`** URL. You get a **live link** you can share—**without** attaching your purchased domain yet.

## Your own domain—two paths

**Goal:** the site should live on **your domain** (for example \`mybrand.com\`), not only on \`something.lovable.app\`, with **minimal extra cost** where possible.

| Path | What it means |
|------|----------------|
| **Custom domain inside Lovable** | Lovable can connect your domain—this is a **paid (Pro)** capability per official docs. Convenient, all-in-one, **not free**. |
| **Export → GitHub → GitHub Pages + DNS** | Export the project to **GitHub**; you **own the code**. **GitHub Pages** can host **for free** (with the right setup); your domain is wired via **DNS** (later lessons)—**without** paying Lovable for domain hosting. |
| **Export → GitHub → Vercel + DNS** | Same export, but hosting is handled by **Vercel** (free Hobby plan, non-commercial). No \`base\` / \`basename\` fiddling, automatic preview URL for every branch. See **lesson 4.4**. |

**This course** treats the second path (**export + GitHub Pages**) as the default, with **lesson 4.4** showing Vercel as the alternative.

---

## Why GitHub as the export target?

Your Lovable (or other builder) output is often a solid **React / Vite / Node-style** project. The next step is to ensure the source lives in a **GitHub repository**, not only inside the builder.

**Why GitHub?**

- **Version control:** track every change (commits, rollbacks).
- **Collaboration:** others can clone and open pull requests.
- **Keep building:** continue locally (Cursor, VS Code) or in the cloud.
- **Free hosting:** **GitHub Pages** can serve a **static site** from a repo **at no cost** (with the right settings).

---

## Not only Lovable: the goal is “get it on GitHub”

You can start with **any** tool that outputs a modern frontend project (**React**, **Vite**, **Node** ecosystem, etc.). For this course the through-line is:

1. End up with a **clean project**.
2. Put it in a **GitHub repository** (push / export / import).
3. Iterate from that repo and optionally publish with **GitHub Pages**.

If a builder exports differently than expected—**Git** and the **repo** become the shared language in the next sections.

---

## Lovable → GitHub: what we will do

1. **Export / connect** the Lovable project so the source lands in a **GitHub repo**.
2. The repo becomes the **single source of truth** for deploys and changes.
3. **GitHub Pages** can expose a public URL from that code (build steps come in Section 3).

Exact **button labels** change over time—here we only lock the **intent**; your screenshot will document the real UI.

---

## Where to click? (placeholder)

Replace the image below with your **screenshot** of the **export / GitHub / connect** area in Lovable.

![Lovable export – replace with your screenshot (where to click)](/images/lovable-export-placeholder.svg)

*Replace \`public/images/lovable-export-placeholder.svg\` with your PNG/JPG, or update the image path in the lesson.*

---

## Quick summary

| Question | Answer |
|----------|--------|
| Why export? | Own the **code** and keep a **free path** to your domain (GitHub Pages + DNS). |
| Lovable domain? | Available on **Pro**—we choose **GitHub** in this course. |
| Why GitHub? | **Git**, collaboration, **Pages** in one place. |
| What is GitHub Pages? | Free **static** hosting from a repository. |
| Need to master it now? | No—Section 3 walks through the steps. |

---

## Exercise

1. If you already have a Lovable project, find **export / GitHub** and write **three short steps** you clicked (later this becomes your caption).
2. If not, skim Lovable docs for “**GitHub**” or “**export**” to preview the flow.
3. Think about which files land in the repo (for example \`package.json\`, \`src/\`)—you will work with them next.
`,
          },
        },
        {
          id: "build-quiz",
          format: "quiz",
          title: {
            hu: "2. szekció – Kvíz és gyakorlat",
            en: "Section 2 – Quiz & Practice",
          },
          summary: {
            hu: "Ellenőrizd a tudásod a Lovable-ről, AI promptírásról és a GitHubra exportálásról – majd végezd el a 10-15 perces gyakorlati feladatot.",
            en: "Test your knowledge of Lovable, AI prompt writing, and exporting to GitHub — then complete the 10–15 minute hands-on task.",
          },
          duration: "10–15 perc kvíz + feladat",
          videoUrl: null,
          markdown: { hu: "", en: "" },
          quizData: [
            {
              id: "bld-q1",
              question: {
                hu: "Mi az AI-alapú promptírás legfontosabb szabálya Lovable-nél?",
                en: "What is the most important rule of AI-based prompt writing in Lovable?",
              },
              options: [
                {
                  hu: "Minél részletesebb a prompt (célcsoport, szekciók, stílus, referenciák), annál pontosabb az eredmény",
                  en: "The more detailed the prompt (target audience, sections, style, references), the more accurate the result",
                },
                {
                  hu: "Minél rövidebb a prompt, annál jobb az AI teljesítménye",
                  en: "The shorter the prompt, the better the AI performs",
                },
                {
                  hu: "A prompt csak angolul lehet hatékony",
                  en: "The prompt can only be effective in English",
                },
                {
                  hu: "Kerüld a URL-ek és referenciák feltüntetését",
                  en: "Avoid including URLs and references",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "Az AI azt adja vissza, amit kérsz. Egy részletes, strukturált promptból sokkal közelebb kerülsz a fejedben lévő eredményhez.",
                en: "AI returns what you ask for. A detailed, structured prompt gets you much closer to the result you have in mind.",
              },
            },
            {
              id: "bld-q2",
              question: {
                hu: "Mire jó a 21st.dev platform promptíráshoz?",
                en: "What is 21st.dev useful for when writing prompts?",
              },
              options: [
                {
                  hu: "Kész UI-szekció mintákat böngészhetsz és referenciaként hivatkozhatsz rájuk a promptban",
                  en: "You can browse ready-made UI section patterns and reference them in your prompt",
                },
                {
                  hu: "Domain vásárlásra és DNS kezelésre",
                  en: "Domain purchasing and DNS management",
                },
                {
                  hu: "GitHub repo hosztolásra",
                  en: "GitHub repo hosting",
                },
                {
                  hu: "AI chatbot platform saját bot létrehozásához",
                  en: "AI chatbot platform for creating your own bot",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "A 21st.dev egy UI-szekció gyűjtemény (hero, pricing, FAQ stb.), ahol vizuálisan inspirálódhatsz, és a promptodba hivatkozhatsz a stílusra.",
                en: "21st.dev is a UI section gallery (hero, pricing, FAQ, etc.) where you can get visual inspiration and reference the style in your prompt.",
              },
            },
            {
              id: "bld-q3",
              question: {
                hu: "Miért exportáljuk a Lovable projektünket GitHubra a kurzusban?",
                en: "Why do we export our Lovable project to GitHub in this course?",
              },
              options: [
                {
                  hu: "Verziókövetés, szabad testreszabhatóság és ingyenes GitHub Pages deploy lehetőség miatt",
                  en: "For version control, free customization, and the ability to deploy via GitHub Pages for free",
                },
                {
                  hu: "Mert a Lovable nem tárolja a kódot",
                  en: "Because Lovable doesn't store the code",
                },
                {
                  hu: "Csak GitHub Pages-ről lehet weboldalt elérni",
                  en: "You can only access a website from GitHub Pages",
                },
                {
                  hu: "A Lovable előírja a GitHub kötelező használatát",
                  en: "Lovable requires GitHub to be used",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "GitHubra exportálva te tulajdonolod a kódot, visszaállíthatsz korábbi verziókat, és ingyenesen publikálhatsz GitHub Pages segítségével.",
                en: "By exporting to GitHub, you own the code, can revert to earlier versions, and publish for free using GitHub Pages.",
              },
            },
            {
              id: "bld-q4",
              question: {
                hu: "Mi az MVP-first megközelítés lényege?",
                en: "What is the core idea of the MVP-first approach?",
              },
              options: [
                {
                  hu: "Először egy minimális, de működő verziót készítünk, majd iteratívan fejlesztünk tovább",
                  en: "First build a minimal but working version, then iteratively improve it",
                },
                {
                  hu: "Az összes funkciót egyszerre kell megvalósítani a piacra lépés előtt",
                  en: "All features must be implemented at once before going to market",
                },
                {
                  hu: "Az MVP = csak backend, a frontend jöhet majd később",
                  en: "MVP = backend only; the frontend comes later",
                },
                {
                  hu: "A kódot mindig teszteléssel kell kezdeni",
                  en: "Development must always start with testing",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "MVP = Minimum Viable Product. A cél: egy működő, de nem tökéletes verzió, amivel visszajelzést kaphatsz, mielőtt tovább fejlesztenél.",
                en: "MVP = Minimum Viable Product. The goal: a working but not perfect version so you can get feedback before investing more.",
              },
            },
            {
              id: "bld-q5",
              question: {
                hu: "Ha Lovable-ben épített projektedet GitHubra exportálod, milyen fájlokat fogsz megtalálni a repository-ban?",
                en: "When you export a Lovable-built project to GitHub, what files will you find in the repository?",
              },
              options: [
                {
                  hu: "Forráskód fájlokat (pl. package.json, src/ mappa) – React/Vite projektstruktúra",
                  en: "Source code files (e.g. package.json, src/ folder) — React/Vite project structure",
                },
                {
                  hu: "Csak a kész HTML/CSS fájlokat, forráskód nélkül",
                  en: "Only the finished HTML/CSS files, without source code",
                },
                {
                  hu: "Csak egy ZIP fájlt, amit ki kell csomagolni",
                  en: "Just a ZIP file that you need to unpack",
                },
                {
                  hu: "Adatbázis-sémákat és SQL scripteket",
                  en: "Database schemas and SQL scripts",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "A Lovable (és hasonló AI builderek) modern frontend projectet generálnak: React + Vite + TypeScript stack, package.json, src/ mappa stb.",
                en: "Lovable (and similar AI builders) generate a modern frontend project: React + Vite + TypeScript stack, package.json, src/ folder, etc.",
              },
            },
          ],
          practicalTask: {
            hu: `## Gyakorlati feladat (~10–15 perc)

**Cél:** Építsd meg a weboldalad első verzióját Lovable-ben és exportáld GitHubra.

### Lépések

1. Nyisd meg a [Lovable](https://lovable.dev) platformot és hozz létre egy új projektet

2. Írj egy részletes promptot a weboldaladhoz a 2.1 leckében tanultak alapján:
   - Ki a célközönség?
   - Milyen szekciók kellenek (Hero, CTA, Features...)?
   - Milyen stílus/referencia?

3. Generáltatd le az oldalt, és finomítsd 2-3 iterációval

4. Exportáld a projektet GitHubra:
   - Lovable-ben keresd az **Export** vagy **GitHub Connect** funkciót
   - Kösd össze a GitHub fiókoddal
   - Ellenőrizd, hogy létrejött-e a repository a GitHub.com-on

5. Nyisd meg a repository-t és ellenőrizd, hogy ott vannak-e a fájlok (package.json, src/)

> **Következő lépés:** A 3. szekcióban klónozzuk le a repót és Antigravity-vel hozzáadjuk a deploy workflow-t!`,
            en: `## Hands-on Task (~10–15 minutes)

**Goal:** Build the first version of your website in Lovable and export it to GitHub.

### Steps

1. Open [Lovable](https://lovable.dev) and create a new project

2. Write a detailed prompt for your website using what you learned in lesson 2.1:
   - Who is the target audience?
   - What sections are needed (Hero, CTA, Features...)?
   - What style/reference?

3. Generate the site and refine it with 2–3 iterations

4. Export the project to GitHub:
   - In Lovable, find the **Export** or **GitHub Connect** feature
   - Connect it to your GitHub account
   - Verify a repository was created on GitHub.com

5. Open the repository and check the files are there (package.json, src/)

> **Next step:** In Section 3 we'll clone the repo and use Antigravity to add the deploy workflow!`,
          },
        },
      ],
    },
    localModSection,
    githubAndDeploySection,
    {
      id: "custom-domain-and-https",
      title: { hu: "5. szekció – Domain összekötés és HTTPS", en: "Section 5 – Domain connection and HTTPS" },
      lessons: [
        {
          id: "connect-domain",
          format: "mixed",
          title: { hu: "5.1 Domain összekötése a GitHub Pages-szel", en: "5.1 Connect your domain to GitHub Pages" },
          summary: {
            hu: "DNS rekordok, CNAME fájl és propagáció megértése gyakorlati példával.",
            en: "DNS records, CNAME file, and propagation with practical steps.",
          },
          duration: "19 perc",
          videoUrl: "https://www.youtube.com/embed/mJgBOIoGihA",
          markdown: {
            hu: `## Hol tartunk a kurzusban?

A **4. szekcióban** beállítottad a **GitHub Pages** oldalt – tipikusan egy \`*.github.io\` URL-en érhető el. Most a **saját megvásárolt domaineddel** fogjuk összekapcsolni ezt az oldalt, hogy a te saját neved (pl. \`barkacsbolt.hu\`) mutasson rá.

---

## Mi az a DNS rekord?

A **DNS (Domain Name System)** az internetes „telefonkönyv": az emberi olvasható domainneveket (pl. \`barkacsbolt.hu\`) IP-számokra fordítja, amelyek a szerverek tényleges címei.

Amikor valakit beír a böngészőjébe a \`barkacsbolt.hu\` nevet, a böngésző megkérdezi a DNS-t: „melyik IP-re menjek?" – a DNS visszaad egy számot, a böngésző odacsatlakozik.

---

## A két legfontosabb rekordtípus

### A rekord (Address Record)
Az **A rekord** egy **domaint** (vagy aldomaint) **IPv4 IP-számra** mutat.

| Mező | Értéke |
|------|--------|
| **Típus** | A |
| **Név / Host** | @ (az apex domain, pl. \`barkacsbolt.hu\`) |
| **Érték / Points to** | 185.199.108.153 |
| **TTL** | 3600 (vagy Auto) |

**GitHub Pages esetén** 4 A rekordot kell hozzáadni az apex domainhez – ezek a GitHub Pages szerverek IP-jei:
\`\`\`
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
\`\`\`

### CNAME rekord (Canonical Name)
A **CNAME rekord** egy **domainnevet** egy **másik domainnévre** irányít – nem IP-re, hanem névláncolással.

| Mező | Értéke |
|------|--------|
| **Típus** | CNAME |
| **Név / Host** | www |
| **Érték / Points to** | felhasznalonev.github.io |
| **TTL** | 3600 (vagy Auto) |

**Miért kell a CNAME?** A \`www.barkacsbolt.hu\` aldomaint az apex domain helyett CNAME-mel irányítjuk a \`[felhasznalonev].github.io\`-ra. Így mind a \`barkacsbolt.hu\`, mind a \`www.barkacsbolt.hu\` az oldaladra mutat.

---

## Konkrét példa

**Minta domain:** \`barkacsbolt.hu\`
**GitHub felhasználónév:** \`misrori\`
**Repository neve:** \`barkacsbolt\`
**GitHub Pages URL:** \`https://misrori.github.io/barkacsbolt/\`

### DNS rekordok beállítása (pl. Cloudflare-ben)

**A rekordok az apex domainhez (\`barkacsbolt.hu\`):**
\`\`\`
Típus  Név  Érték               TTL
A      @    185.199.108.153     Auto
A      @    185.199.109.153     Auto
A      @    185.199.110.153     Auto
A      @    185.199.111.153     Auto
\`\`\`

**CNAME rekord a www-hez:**
\`\`\`
Típus   Név   Érték                      TTL
CNAME   www   misrori.github.io          Auto
\`\`\`

---

## GitHub beállítás: Custom domain

Miután beállítottad a DNS rekordokat:

1. Menj a repository **Settings → Pages** menübe
2. A **Custom domain** mezőbe írd be: \`barkacsbolt.hu\` (az apex domaint, www nélkül)
3. Kattints **Save**
4. GitHub ellenőrzi a DNS-t – ez 1-24 órát vehet igénybe (DNS propagáció)
5. Ha sikeres, megjelenik a zöld pipa és az **Enforce HTTPS** opció

---

## Mi az a CNAME fájl a repo-ban?

Ha a GitHub Pages custom domain-t állít be, **automatikusan** létrehoz (vagy te is létrehozhatod manuálisan) egy \`CNAME\` nevű fájlt a repo gyökerében:

\`\`\`
barkacsbolt.hu
\`\`\`

Ez a fájl tartalmazza a custom domainedet – **ne töröld ki**, mert a deploy workflow felülírhatja (ezért érdemes a build folyamatba is belevenni, pl. a \`public/\` mappában elhelyezni Vite projekteknél).

---

## Mi az a DNS propagáció?

Amikor megváltoztatod a DNS rekordokat, az internet DNS szerverei **nem frissülnek azonnal** – ez az ún. **propagáció** folyamata. Az internet különböző pontjain eltérő ideig tart az új rekord „terjedése".

Általában: **néhány perc – 48 óra** között van, de a legtöbb esetben 15-60 percen belül érvényesül.

**Hogyan ellenőrizheted?**
- Böngészőből: üsd be a domaint és nézd, töltődik-e a GitHub Pages
- Online eszközzel: [dnschecker.org](https://dnschecker.org) – több pontból egyszerre ellenőrizheted

---

## Az összes lépés összefoglalva

1. **DNS** – A rekordok + CNAME a domain regisztrátornál
2. **GitHub** – Settings → Pages → Custom domain megadása
3. **CNAME fájl** – a repo gyökerében legyen meg
4. **Várakozás** – DNS propagáció (max. 48 óra)
5. **HTTPS** – Settings → Pages → Enforce HTTPS bekapcsolása

---

## Demó videó

Az alábbi beágyazott videó a domain + GitHub Pages összekapcsolásának folyamatát mutatja be.
`,
            en: `## Where we are in the course

In **Section 4** you set up **GitHub Pages** — accessible via a \`*.github.io\` URL. Now we connect your **purchased domain** to that site, so your own name (e.g. \`mybrand.com\`) points to it.

---

## What is a DNS record?

**DNS (Domain Name System)** is the internet's "phone book": it translates human-readable domain names (e.g. \`mybrand.com\`) into IP addresses, which are the actual addresses of servers.

When someone types \`mybrand.com\` into their browser, the browser asks DNS: "what IP do I go to?" — DNS returns a number, and the browser connects.

---

## The two most important record types

### A Record (Address Record)
An **A record** points a **domain** (or subdomain) to an **IPv4 IP address**.

| Field | Value |
|-------|-------|
| **Type** | A |
| **Name / Host** | @ (the apex domain, e.g. \`mybrand.com\`) |
| **Value / Points to** | 185.199.108.153 |
| **TTL** | 3600 (or Auto) |

**For GitHub Pages** you need to add 4 A records for the apex domain — these are GitHub Pages server IPs:
\`\`\`
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
\`\`\`

### CNAME Record (Canonical Name)
A **CNAME record** points a **domain name** to **another domain name** — not to an IP, but via name chaining.

| Field | Value |
|-------|-------|
| **Type** | CNAME |
| **Name / Host** | www |
| **Value / Points to** | username.github.io |
| **TTL** | 3600 (or Auto) |

**Why CNAME?** The \`www.mybrand.com\` subdomain is redirected via CNAME to \`[username].github.io\`. This way both \`mybrand.com\` and \`www.mybrand.com\` point to your site.

---

## Concrete example

**Sample domain:** \`mybrand.com\`
**GitHub username:** \`johndoe\`
**Repository name:** \`mybrand\`
**GitHub Pages URL:** \`https://johndoe.github.io/mybrand/\`

### DNS record configuration (e.g. in Cloudflare)

**A records for the apex domain (\`mybrand.com\`):**
\`\`\`
Type   Name  Value               TTL
A      @     185.199.108.153     Auto
A      @     185.199.109.153     Auto
A      @     185.199.110.153     Auto
A      @     185.199.111.153     Auto
\`\`\`

**CNAME record for www:**
\`\`\`
Type    Name  Value                  TTL
CNAME   www   johndoe.github.io      Auto
\`\`\`

---

## GitHub setting: Custom domain

After configuring the DNS records:

1. Go to the repository **Settings → Pages**
2. In the **Custom domain** field enter: \`mybrand.com\` (the apex domain, without www)
3. Click **Save**
4. GitHub verifies the DNS — this can take 1–24 hours (DNS propagation)
5. On success, a green checkmark and the **Enforce HTTPS** option appear

---

## What is the CNAME file in the repo?

When GitHub Pages sets a custom domain, it **automatically creates** (or you can create manually) a file named \`CNAME\` in the repo root:

\`\`\`
mybrand.com
\`\`\`

This file contains your custom domain — **don't delete it**, as the deploy workflow may overwrite it (best practice: place it in the \`public/\` folder for Vite projects so it's copied to \`dist/\` on build).

---

## What is DNS propagation?

When you change DNS records, the internet's DNS servers **don't update instantly** — this is the **propagation** process. It takes different amounts of time at different points around the internet.

Typically: anywhere from **a few minutes to 48 hours**, but usually within 15–60 minutes.

**How to check:**
- Browser: type your domain and see if the GitHub Pages site loads
- Online tool: [dnschecker.org](https://dnschecker.org) — check from multiple locations at once

---

## Summary of all steps

1. **DNS** — A records + CNAME at your domain registrar
2. **GitHub** — Settings → Pages → enter Custom domain
3. **CNAME file** — must exist in the repo root
4. **Wait** — DNS propagation (up to 48 hours)
5. **HTTPS** — Settings → Pages → enable Enforce HTTPS

---

## Demo video

The embedded video below shows the process of connecting a domain to GitHub Pages.
`,
          },
        },
        {
          id: "enable-https",
          format: "mixed",
          title: { hu: "5.2 HTTPS bekapcsolása és éles ellenőrzés", en: "5.2 Enable HTTPS and production checks" },
          summary: {
            hu: "TLS, Force HTTPS, mixed content hibák és launch checklist.",
            en: "TLS, Force HTTPS, mixed content, and launch checklist.",
          },
          duration: "14 perc",
          videoUrl: "https://www.youtube.com/embed/hExRDVZHhig",
          markdown: {
            hu: `## Miért fontos a HTTPS?

A **HTTPS** (Hypertext Transfer Protocol Secure) titkosított kapcsolatot biztosít a látogató böngészője és a szerver között. A titkosítás a következőket védi:

- **Adatátvitel** – jelszavak, űrlapok, személyes adatok titkosítva utaznak
- **Tartalom integritás** – harmadik fél nem módosíthatja az oldal tartalmát átvitel közben
- **Hitelesítés** – a látogató biztosan azt a szervert éri el, amelyiket várja

**HTTPS nélkül** a böngészők „Nem biztonságos" figyelmeztetést jelenítenek meg, és a keresőmotorok (Google) alacsonyabb rangsorolást adnak az oldalnak.

A GitHub Pages **ingyenes Let's Encrypt tanúsítványt** biztosít a custom domainhez – nem szükséges külön tanúsítványt vásárolni.

---

## HTTPS engedélyezése

A DNS propagáció lezajlása után a GitHub Pages automatikusan Let's Encrypt tanúsítványt állít ki a domainhez.

**Lépések:**

1. Nyisd meg a repository-t a GitHub.com-on
2. Navigálj a **Settings → Pages** menübe
3. A Custom domain szekció alatt aktiváld az **Enforce HTTPS** jelölőnégyzetet

Ha a jelölőnégyzet szürkén (inaktív) jelenik meg, a DNS propagáció még nem fejeződött be, vagy a tanúsítvány kiállítása folyamatban van. Ebben az esetben várj 15–30 percet és próbáld újra.

---

## Mi az a „mixed content"?

Előfordulhat, hogy az oldalad HTTPS-en töltődik, de egyes képek vagy linkek még **http://** címmel vannak benne (titkosítatlanul). Ezt hívják **mixed content**-nek.

A böngésző ilyenkor:
- **figyelmeztet** (sárga háromszög a lakat helyett), vagy
- **egyáltalán nem tölti be** a nem biztonságos tartalmat.

**Hogyan kerüld el?**
- Használj **relatív URL-eket** képekhez és hivatkozásokhoz (pl. \`/images/logo.png\` a \`http://...\` helyett)
- Ha külső szolgáltatásra linkelsz, győződj meg, hogy az is **https://** címen elérhető

---

## Éles ellenőrzés – Launch checklist

Mielőtt megosztanád az oldalad a világgal, futtasd végig ezt a listát:

### Működés
- [ ] Az oldal betöltődik a **saját domaineden** (pl. \`barkacsbolt.hu\`)
- [ ] A **www**-s verzió is működik (pl. \`www.barkacsbolt.hu\`)
- [ ] **HTTPS** aktív – lakat ikon jelenik meg a böngészőben
- [ ] **Enforce HTTPS** be van kapcsolva a GitHub Pages beállításokban

### Tartalom
- [ ] Nincs **mixed content** figyelmeztetés (nyisd meg a böngésző fejlesztői eszközeit – F12 → Console – és keresd a „mixed content" üzeneteket)
- [ ] Az oldal **mobilon** is jól néz ki (próbáld ki telefonon, vagy a böngészőben F12 → mobil nézet)
- [ ] A képek betöltődnek, nem töröttek
- [ ] A linkek működnek (nincs 404)

### Technikai
- [ ] A **GitHub Actions** build zöld pipával futott le
- [ ] A \`CNAME\` fájl megvan a repo gyökerében (a custom domain miatt)
- [ ] A \`vite.config.ts\` **base** értéke helyes (ha projekt Pages-t használsz)

---

## Mi a teendő, ha valami nem működik?

| Probléma | Megoldás |
|----------|---------|
| „Nem biztonságos" figyelmeztetés | Ellenőrizd, hogy az Enforce HTTPS be van-e kapcsolva. Ha szürke, várj a DNS propagációra. |
| A www-s verzió nem működik | Ellenőrizd a CNAME rekordot a DNS-ben (\`www → felhasznalonev.github.io\`) |
| Képek nem töltődnek | Nézd meg a böngésző Console-ját – lehet, hogy mixed content vagy rossz elérési út |
| 404-es hiba | Ellenőrizd a \`base\` beállítást a \`vite.config.ts\`-ben |
| Az oldal régi verziót mutat | Próbáld Ctrl+Shift+R (hard refresh) vagy várd meg az Actions build befejezését |

---

## A kurzus eredménye

Ezen a ponton a weboldal élesben fut a saját domainen, HTTPS titkosítással. A frissítési ciklus:

\`\`\`
Módosítás → Commit → Push → GitHub Actions build → Élő oldal frissül (1–2 perc)
\`\`\`

---

## Demó videó

Az alábbi beágyazott videó a HTTPS bekapcsolásának és az éles ellenőrzésnek a folyamatát mutatja be.
`,
            en: `## Why HTTPS matters

**HTTPS** (Hypertext Transfer Protocol Secure) provides an encrypted connection between the visitor's browser and the server. The encryption protects:

- **Data transmission** — passwords, forms, and personal data travel encrypted
- **Content integrity** — third parties cannot modify page content during transmission
- **Authentication** — the visitor reaches the actual intended server

**Without HTTPS**, browsers display a "Not secure" warning, and search engines (Google) assign lower rankings.

GitHub Pages provides a **free Let's Encrypt certificate** for custom domains — no separate certificate purchase is required.

---

## Enabling HTTPS

After DNS propagation completes, GitHub Pages automatically issues a Let's Encrypt certificate for the domain.

**Steps:**

1. Open the repository on GitHub.com
2. Navigate to **Settings → Pages**
3. Under the Custom domain section, activate the **Enforce HTTPS** checkbox

If the checkbox appears grayed out (inactive), DNS propagation has not yet completed or the certificate is still being issued. Wait 15–30 minutes and try again.

---

## What is "mixed content"?

Sometimes your page loads over HTTPS, but some images or links still use plain **http://** (unencrypted). This is called **mixed content**.

The browser will either:
- **warn** you (yellow triangle instead of the lock icon), or
- **refuse to load** the insecure content entirely.

**How to avoid it:**
- Use **relative URLs** for images and links (e.g. \`/images/logo.png\` instead of \`http://...\`)
- If linking to external services, make sure they support **https://**

---

## Going live – Launch checklist

Before sharing your site with the world, run through this checklist:

### Functionality
- [ ] The site loads on your **own domain** (e.g. \`mybrand.com\`)
- [ ] The **www** version also works (e.g. \`www.mybrand.com\`)
- [ ] **HTTPS** is active — lock icon appears in the browser
- [ ] **Enforce HTTPS** is enabled in GitHub Pages settings

### Content
- [ ] No **mixed content** warnings (open browser dev tools — F12 → Console — and search for "mixed content" messages)
- [ ] The site looks good on **mobile** (test on your phone, or F12 → mobile view in the browser)
- [ ] Images load correctly, no broken images
- [ ] Links work (no 404s)

### Technical
- [ ] **GitHub Actions** build finished with a green checkmark
- [ ] The \`CNAME\` file exists in the repo root (for the custom domain)
- [ ] The \`vite.config.ts\` **base** value is correct (if using project Pages)

---

## What if something doesn't work?

| Problem | Solution |
|---------|----------|
| "Not secure" warning | Check that Enforce HTTPS is enabled. If grayed out, wait for DNS propagation. |
| www version doesn't work | Check the CNAME record in DNS (\`www → username.github.io\`) |
| Images not loading | Check the browser Console — could be mixed content or wrong path |
| 404 error | Check the \`base\` setting in \`vite.config.ts\` |
| Site shows old version | Try Ctrl+Shift+R (hard refresh) or wait for the Actions build to finish |

---

## Course result

At this point, the website is live on your own domain with HTTPS encryption. The update cycle:

\`\`\`
Edit → Commit → Push → GitHub Actions build → Live site updates (1–2 minutes)
\`\`\`

---

## Demo video

The embedded video below walks through enabling HTTPS and the go-live checklist.
`,
          },
        },
        {
          id: "domain-connect-quiz",
          format: "quiz",
          title: {
            hu: "5. szekció – Kvíz és gyakorlat",
            en: "Section 5 – Quiz & Practice",
          },
          summary: {
            hu: "Ellenőrizd a tudásod a DNS rekordokról, domain összekötésről és HTTPS beállításról – majd végezd el a 10-15 perces gyakorlati feladatot.",
            en: "Test your knowledge of DNS records, domain connection, and HTTPS setup — then complete the 10–15 minute hands-on task.",
          },
          duration: "10–15 perc kvíz + feladat",
          videoUrl: null,
          markdown: { hu: "", en: "" },
          quizData: [
            {
              id: "dns-q1",
              question: {
                hu: "Mire való az A rekord a DNS beállításban?",
                en: "What is the A record used for in DNS settings?",
              },
              options: [
                {
                  hu: "Egy domain nevet IPv4 IP-számra mutat (pl. az apex domaint a GitHub Pages IP-jeire)",
                  en: "Points a domain name to an IPv4 IP address (e.g. the apex domain to GitHub Pages IPs)",
                },
                {
                  hu: "E-mail forgalmat irányít a levelezőszerverre",
                  en: "Routes email traffic to the mail server",
                },
                {
                  hu: "A domain titkosítási tanúsítványát tárolja",
                  en: "Stores the domain's encryption certificate",
                },
                {
                  hu: "A domain megújítási dátumát rögzíti",
                  en: "Records the domain renewal date",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "GitHub Pages esetén az apex domainhez 4 A rekordot kell felvenni: 185.199.108–111.153 IP-kre.",
                en: "For GitHub Pages, you add 4 A records for the apex domain: IPs 185.199.108–111.153.",
              },
            },
            {
              id: "dns-q2",
              question: {
                hu: "Mit csinál a CNAME rekord?",
                en: "What does a CNAME record do?",
              },
              options: [
                {
                  hu: "Egy domainnevet egy másik domainnévre mutat (pl. www.domain.hu → felhasznalonev.github.io)",
                  en: "Points a domain name to another domain name (e.g. www.domain.com → username.github.io)",
                },
                {
                  hu: "IPv6 IP-re mutat",
                  en: "Points to an IPv6 IP address",
                },
                {
                  hu: "A domain gazdájának nevét rögzíti",
                  en: "Records the domain owner's name",
                },
                {
                  hu: "A webszerver szoftver verziószámát jelöli",
                  en: "Indicates the web server software version",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "CNAME-mel a www aldomaint egy github.io névhez irányítjuk – így a www.domain.hu is az oldaladra mutat.",
                en: "With CNAME, we point the www subdomain to a github.io name — so www.domain.com also points to your site.",
              },
            },
            {
              id: "dns-q3",
              question: {
                hu: "Mit jelent a DNS propagáció?",
                en: "What does DNS propagation mean?",
              },
              options: [
                {
                  hu: "Az az időszak, amíg az új DNS rekordok szerte az interneten érvényesülnek (percektől 48 óráig)",
                  en: "The period during which new DNS records take effect across the internet (minutes to 48 hours)",
                },
                {
                  hu: "A GitHub Actions build folyamatának neve",
                  en: "The name for the GitHub Actions build process",
                },
                {
                  hu: "A domain megújítási folyamata",
                  en: "The domain renewal process",
                },
                {
                  hu: "Az SSL tanúsítvány érvényesítési folyamata",
                  en: "The SSL certificate validation process",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "A DNS propagáció 15 perctől 48 óráig is tarthat, de általában 1 órán belül érvényesül. Ellenőrzésre jó a dnschecker.org.",
                en: "DNS propagation can take 15 minutes to 48 hours, but usually resolves within an hour. Use dnschecker.org to check.",
              },
            },
            {
              id: "dns-q4",
              question: {
                hu: "Mire kell beállítani a CNAME rekordot GitHub Pages esetén (a www aldomainhoz)?",
                en: "What should the CNAME record point to for GitHub Pages (for the www subdomain)?",
              },
              options: [
                {
                  hu: "felhasznalonev.github.io",
                  en: "username.github.io",
                },
                {
                  hu: "github.com/felhasznalonev/repo",
                  en: "github.com/username/repo",
                },
                {
                  hu: "pages.github.com",
                  en: "pages.github.com",
                },
                {
                  hu: "raw.githubusercontent.com/felhasznalonev",
                  en: "raw.githubusercontent.com/username",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "A CNAME mindig a GitHub-felhasználónevedre végődő .github.io névre mutat – a repo neve NEM kell ide.",
                en: "CNAME always points to your GitHub username followed by .github.io — the repo name is NOT included here.",
              },
            },
            {
              id: "dns-q5",
              question: {
                hu: "Hogyan engedélyezheted a HTTPS-t GitHub Pages egyedi domainnél?",
                en: "How do you enable HTTPS for a GitHub Pages custom domain?",
              },
              options: [
                {
                  hu: "Settings → Pages → Enforce HTTPS bekapcsolása (miután a DNS propagáció lezajlott)",
                  en: "Settings → Pages → Enable Enforce HTTPS (after DNS propagation completes)",
                },
                {
                  hu: "SSL tanúsítványt kell külön vásárolni és feltölteni",
                  en: "Buy and upload an SSL certificate separately",
                },
                {
                  hu: "A vite.config.ts-be kell beírni: https: true",
                  en: "Add https: true to vite.config.ts",
                },
                {
                  hu: "Csak GitHub Enterprise előfizetéssel érhető el HTTPS",
                  en: "HTTPS is only available with GitHub Enterprise",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "A GitHub Pages automatikusan integrált Let's Encrypt SSL-t biztosít. Az Enforce HTTPS opció kizárólag HTTPS-en keresztül kiszolgálja az oldalt.",
                en: "GitHub Pages provides automatic Let's Encrypt SSL. The Enforce HTTPS option serves your site over HTTPS only.",
              },
            },
          ],
          practicalTask: {
            hu: `## Gyakorlati feladat (~10–15 perc)

**Cél:** Kösd össze a megvásárolt domained a GitHub Pages oldaladdal.

### Lépések

1. **DNS beállítás** – Lépj be a domain regisztrátorodnál a DNS kezelőbe (pl. Cloudflare, GoDaddy, Namecheap)

2. **A rekordok hozzáadása** – Add hozzá a 4 GitHub Pages IP-t az apex domainhez (@):
   \`\`\`
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   \`\`\`

3. **CNAME rekord** – Add hozzá a www-hez:
   - Név: \`www\`
   - Értéke: \`[felhasznalonev].github.io\`

4. **GitHub beállítás** – Menj a repository Settings → Pages menübe, és írd be a Custom domain mezőbe a domained

5. **Várakozás és ellenőrzés** – DNS ellenőrzés: [dnschecker.org](https://dnschecker.org) – add meg a domained és nézd, zöld-e mindenhol

6. **HTTPS bekapcsolása** – Ha a DNS kész: Settings → Pages → Enforce HTTPS ✓

> **Eredmény:** Ha minden rendben, az oldalad elérhető a saját domaineden, HTTPS-sel!`,
            en: `## Hands-on Task (~10–15 minutes)

**Goal:** Connect your purchased domain to your GitHub Pages site.

### Steps

1. **DNS setup** — Log in to your domain registrar's DNS manager (e.g. Cloudflare, GoDaddy, Namecheap)

2. **Add A records** — Add the 4 GitHub Pages IPs for the apex domain (@):
   \`\`\`
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   \`\`\`

3. **CNAME record** — Add for www:
   - Name: \`www\`
   - Value: \`[username].github.io\`

4. **GitHub setup** — Go to repository Settings → Pages and enter your domain in the Custom domain field

5. **Wait and check** — DNS check at [dnschecker.org](https://dnschecker.org) — enter your domain and check if it's green everywhere

6. **Enable HTTPS** — Once DNS is ready: Settings → Pages → Enforce HTTPS ✓

> **Result:** If everything is correct, your site is live on your own domain, secured with HTTPS!`,
          },
        },
      ],
    },
  ],
};

export { secondCourse } from "./secondCourse";

export const allCourses: Course[] = [firstCourse, secondCourse];

const flattenCourseLessons = (course: Course) =>
  course.sections.flatMap((section) => section.lessons);

export const allLessons = allCourses.flatMap(flattenCourseLessons);

export const firstLessonId = flattenCourseLessons(firstCourse)[0]?.id ?? "";

export const findLessonById = (lessonId: string) =>
  allLessons.find((lesson) => lesson.id === lessonId);

export const findCourseByLessonId = (lessonId: string): Course | undefined =>
  allCourses.find((course) =>
    course.sections.some((section) =>
      section.lessons.some((lesson) => lesson.id === lessonId),
    ),
  );

export const findCourseById = (courseId: string): Course | undefined =>
  allCourses.find((course) => course.id === courseId);

export const getCourseFirstLessonId = (courseId: string): string => {
  const course = findCourseById(courseId);
  return course ? flattenCourseLessons(course)[0]?.id ?? "" : "";
};

export const getLessonNeighbors = (lessonId: string) => {
  const course = findCourseByLessonId(lessonId);
  if (!course) {
    return { previousLesson: undefined, nextLesson: undefined };
  }

  const lessons = flattenCourseLessons(course);
  const index = lessons.findIndex((lesson) => lesson.id === lessonId);
  if (index === -1) {
    return { previousLesson: undefined, nextLesson: undefined };
  }

  return {
    previousLesson: lessons[index - 1] as CourseLesson | undefined,
    nextLesson: lessons[index + 1] as CourseLesson | undefined,
  };
};

export const getCourseLessonCount = (course: Course) =>
  flattenCourseLessons(course).length;
