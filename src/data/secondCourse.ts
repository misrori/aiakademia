import type { Course } from "./courseContentTypes";

/** Supabase config snippet a Lovable által generált projektben */
const supabaseClientSnippet = `import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);`;

/** Protected route példa */
const protectedRouteSnippet = `import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();

  if (loading) return <div>Betöltés…</div>;
  if (!session) return <Navigate to="/login" replace />;

  return <>{children}</>;
};`;

/** useAuth hook példa */
const useAuthSnippet = `import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  return { session, loading };
};`;

/** Egyszerű login form példa */
const loginFormSnippet = `import { useState } from "react";
import { supabase } from "@/lib/supabase";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-3">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Bejelentkezés</button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};`;

/** RLS policy példa – notes tábla */
const rlsPolicySql = `-- Engedélyezd az RLS-t a táblán
alter table public.notes enable row level security;

-- SELECT: a user csak a saját jegyzeteit olvashatja
create policy "notes_select_own"
on public.notes for select
to authenticated
using (auth.uid() = user_id);

-- INSERT: csak saját user_id-vel írhat
create policy "notes_insert_own"
on public.notes for insert
to authenticated
with check (auth.uid() = user_id);

-- UPDATE: csak a sajátját módosíthatja
create policy "notes_update_own"
on public.notes for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- DELETE: csak a sajátját törölheti
create policy "notes_delete_own"
on public.notes for delete
to authenticated
using (auth.uid() = user_id);`;

/** Notes tábla create SQL */
const createNotesTableSql = `create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index notes_user_id_idx on public.notes (user_id);`;

/** Migration fájl példa */
const migrationFileSnippet = `-- supabase/migrations/20260427120000_create_notes_table.sql

create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  created_at timestamptz not null default now()
);

alter table public.notes enable row level security;

create policy "notes_select_own"
on public.notes for select
to authenticated
using (auth.uid() = user_id);`;

/** Supabase CLI parancsok */
const supabaseCliCommands = `# 1. CLI telepítése (Mac)
brew install supabase/tap/supabase

# 2. Bejelentkezés
supabase login

# 3. Lokális projekt inicializálása
supabase init

# 4. Lokális Supabase indítása (Docker kell hozzá)
supabase start

# 5. Link a távoli projekthez
supabase link --project-ref abcdefgh1234

# 6. Lokális sémához migrációs fájl generálása
supabase db diff --use-migra -f create_notes_table

# 7. Migráció kipróbálása lokálisan
supabase db reset

# 8. Migráció pusholása prodba
supabase db push`;

/** Edge Function példa */
const edgeFunctionSnippet = `// supabase/functions/hello-world/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { name } = await req.json();
  return new Response(
    JSON.stringify({ message: \`Hello, \${name}!\` }),
    { headers: { "Content-Type": "application/json" } }
  );
});`;

export const secondCourse: Course = {
  id: "supabase-auth-app",
  title: {
    hu: "Supabase + Auth: dinamikus webalkalmazás Lovable-lel",
    en: "Supabase + Auth: a dynamic web app with Lovable",
  },
  subtitle: {
    hu: "Adatbázis, bejelentkezés és migrációk – csapatokhoz, produkcióhoz",
    en: "Database, authentication and migrations – ready for teams and production",
  },
  sections: [
    {
      id: "sb-overview-section",
      title: { hu: "0. szekció – Projekt áttekintés", en: "Section 0 – Project overview" },
      lessons: [
        {
          id: "sb-overview",
          format: "reading",
          title: {
            hu: "Mit építünk? – egy bejelentkezéses jegyzetelő alkalmazás",
            en: "What we will build — a login-gated notes app",
          },
          summary: {
            hu: "Végigvezetünk egy tiszta, produkcióra kész flow-n: Lovable + Supabase + auth + migrációk.",
            en: "A clean, production-ready flow: Lovable + Supabase + auth + migrations.",
          },
          duration: "5 perc áttekintés",
          videoUrl: null,
          markdown: {
            hu: `## Mit fogunk építeni?

Egy egyszerű **jegyzetelő alkalmazást**, amely:

- **Email + jelszó** vagy **Google OAuth** bejelentkezéssel indul
- Minden felhasználó **csak a saját jegyzeteit** látja (Row Level Security)
- Tud **új jegyzetet létrehozni**, **módosítani**, **törölni**
- A sémaváltozások **migrációs fájlokban** dokumentáltak, így bármelyik csapattag tudja futtatni lokálisan vagy élesben

**Miért ez a példa?** A „jegyzetelő app" ugyanazokat a problémákat éli meg, mint egy valódi SaaS: authentikáció, **multi-tenancy** (minden user csak a sajátját látja), migrációk verziókövetésben, deploy. Ha ezt érted, már tudod építeni a következő SaaS ötletedet is.

---

## Mit tanulsz ebben a kurzusban?

1. **Supabase alapok** – mit ad (Auth, Postgres, Storage, Edge Functions, Realtime) és mi ingyenes
2. **Lovable Supabase integráció** – hogyan kösd össze egy kattintással
3. **Autentikáció** – email+jelszó, magic link, Google/GitHub OAuth, protected routes
4. **Adatbázis** – táblák, **Row Level Security** policyk, kapcsolatok
5. **Migrációk** – ha kézzel csinálod, ha csapat, ha prod ↔ dev szinkron kell
6. **További integrációk** – Edge Functions, Storage, Stripe, Resend (áttekintés)

---

## Előfeltételek

- **1. kurzus ajánlott** (vagy: alap React / Vite / GitHub Pages ismeret)
- **GitHub fiók** (a Lovable és Supabase bejelentkezéshez is hasznos)
- **Modern böngésző** és kb. 4-6 óra

**Nem kell:** korábbi Supabase tapasztalat, SQL-ben profi háttér. Minden fogalmat elmagyarázunk.

---

## Technológiai stack

| Réteg | Eszköz |
|-------|--------|
| Frontend | **React + Vite + TypeScript** (Lovable generálja) |
| Hosting | **Vercel** (vagy GitHub Pages, ha tisztán statikus) |
| Auth + DB | **Supabase** (Postgres + GoTrue + RLS) |
| Deploy automatizáció | **GitHub** (PR preview + auto deploy) |
| Séma verziózás | **Supabase CLI migrations** |

---

## Mire nézz ki a kurzusból

- **Éles URL**: \`sajatapp.vercel.app\` (vagy sajátdomain) – működő bejelentkezéssel
- **GitHub repo** tiszta commit history-val és migrációs fájlokkal
- **Supabase projekt** prod + dev környezettel
- Tudás arról, **mikor használj Edge Function-t**, **mikor Realtime-ot**, és **mikor elég egy sima select**
`,
            en: `## What we will build

A simple **notes app** that:

- Opens with **email + password** or **Google OAuth** login
- Every user sees **only their own notes** (Row Level Security)
- Can **create**, **edit**, and **delete** notes
- Schema changes live in **migration files**, so any teammate can apply them locally or in production

**Why this example?** A "notes app" exercises the same problems as a real SaaS: authentication, **multi-tenancy** (each user sees only their own), version-controlled migrations, deploy. If you master this, you can ship your next SaaS idea.

---

## What you will learn

1. **Supabase fundamentals** – what it gives you (Auth, Postgres, Storage, Edge Functions, Realtime) and what is free
2. **Lovable Supabase integration** – connect them with a click
3. **Authentication** – email+password, magic link, Google/GitHub OAuth, protected routes
4. **Database** – tables, **Row Level Security** policies, relations
5. **Migrations** – whether you write them by hand, work in a team, or sync between dev ↔ prod
6. **Other integrations** – Edge Functions, Storage, Stripe, Resend (overview)

---

## Prerequisites

- **Course 1 is recommended** (or: basic React / Vite / GitHub Pages knowledge)
- **GitHub account** (useful for Lovable and Supabase login)
- **Modern browser** and roughly 4–6 hours

**Not required:** prior Supabase experience or deep SQL background. Every concept is explained.

---

## Technology stack

| Layer | Tool |
|-------|------|
| Frontend | **React + Vite + TypeScript** (generated by Lovable) |
| Hosting | **Vercel** (or GitHub Pages for purely static) |
| Auth + DB | **Supabase** (Postgres + GoTrue + RLS) |
| Deploy automation | **GitHub** (PR preview + auto deploy) |
| Schema versioning | **Supabase CLI migrations** |

---

## What you walk away with

- A **live URL** (\`yourapp.vercel.app\` or your domain) — with working login
- A **GitHub repo** with clean commit history and migration files
- A **Supabase project** with prod + dev environments
- Clarity on **when to use Edge Functions**, **when Realtime**, and **when a plain select is enough**
`,
          },
        },
      ],
    },
    {
      id: "sb-basics-section",
      title: { hu: "1. szekció – Supabase alapok", en: "Section 1 – Supabase basics" },
      lessons: [
        {
          id: "sb-what-is-supabase",
          format: "reading",
          title: {
            hu: "1.1 Mi a Supabase és miért pont ezt?",
            en: "1.1 What is Supabase, and why pick it?",
          },
          summary: {
            hu: "Open source Firebase-alternatíva Postgres alapokon – auth, DB, Storage, Edge Functions, Realtime egy helyen.",
            en: "An open-source Firebase alternative built on Postgres — auth, DB, Storage, Edge Functions, Realtime in one place.",
          },
          duration: "20–30 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## Mi a Supabase?

A **[Supabase](https://supabase.com)** egy **backend-as-a-service** (BaaS) platform – egy kattintással kapsz:

- **Postgres adatbázist** (nem NoSQL, igazi SQL)
- **Authentikációt** (email, OAuth, magic link, phone)
- **Object Storage-t** (fájl feltöltés S3-kompatibilis módon)
- **Edge Functions-t** (szerverless TypeScript / Deno)
- **Realtime** csatornákat (tábla-változások push-olva kliensre)
- **Auto-generált REST + GraphQL API-t** a táblák fölé

Gondolj rá úgy, mint a **Firebase**-re, de **open source**-ban és **igazi Postgres**-szel. Ha holnap költözni akarsz, a DB-d egy sima Postgres – bárhol futtatható.

---

## Miért NEM saját backend?

Egy induló projekt tipikus döntése:
- **Saját Node / Python backend:** sokat kell kódolni (auth, session, CRUD, deploy, monitoring)
- **Supabase:** a fenti 90%-át megkapod, te a **saját üzleti logikádra** tudsz fókuszálni

Kisebb projekteknél, SaaS MVP-knél és belső toolognál **Supabase** kiváló választás. Enterprise szintű, erősen specializált rendszereknél természetesen máshogy dönthetsz.

---

## Árazás – mi ingyenes?

A **Free tier** (oktatás, MVP, kis hobbi projekt):

| Erőforrás | Free csomag |
|-----------|-------------|
| Projektek száma | 2 aktív (inaktív 7 nap után felfüggesztésre kerül) |
| DB tárhely | 500 MB |
| Egyidejű kapcsolat | 60 (direct) / 200 (pooler) |
| Auth users | **50 000** aktív havonta |
| Storage | 1 GB |
| Edge Function hívások | 500K / hó |
| Bandwidth | 5 GB / hó |

A **Pro ($25/hó)** csomag komoly MVP-re, kis SaaS-ra is elég. Részletek: [supabase.com/pricing](https://supabase.com/pricing).

---

## Legfontosabb fogalmak

### 1. **Project**
Egy Supabase projekt = **egy Postgres adatbázis** + auth + storage + edge functions egy régióban. Dev és prod körnezethez **2 külön projekt**et érdemes létrehozni.

### 2. **Anon key** vs **Service role key**
- **anon key:** publikus, frontend-kódba kerülhet. Az **RLS** policyk döntik el, mit tud olvasni/írni.
- **service_role key:** **SOHA** ne kerüljön frontend-kódba – minden RLS-t megkerül. Csak szerver-oldali (Edge Function, saját backend) használatra.

### 3. **Row Level Security (RLS)**
A Postgres beépített funkciója: **policy**k alapján eldönti, melyik user melyik sort láthatja / írhatja. A Supabase **rá van optimalizálva** – a frontend biztonságosan hívhatja a DB-t, mert a policyk védenek.

### 4. **auth.users tábla**
Minden bejelentkezett user automatikusan bekerül egy **\`auth.users\`** táblába. Ennek \`id\` UUID-ja szolgál \`user_id\` idegenkulcsként a saját tábláidban.

---

## Mit NEM Supabase?

Fontos tudni a **határokat**:

- Nem helyettesíti a **hosztolt React/Next** frontendet (azt Vercel/Netlify adja)
- Nem natív **message queue** (Kafka, RabbitMQ helyett – csak Realtime)
- Az **Edge Function**-ök kicsik (5 MB limit, max 2 perc futás) – komoly backend nem ide való

Ha ezek kellenek: **Supabase + külön szolgáltatás** (pl. saját Render / Railway szerver).

---

## Összehasonlítás más BaaS-okkal

| Jellemző | **Supabase** | **Firebase** | **AWS Amplify** |
|----------|--------------|--------------|------------------|
| DB típus | Postgres (SQL) | Firestore (NoSQL) | DynamoDB (NoSQL) |
| Open source | ✅ | ❌ | ⚠️ (részben) |
| Lokális dev | ✅ (Docker) | ⚠️ (emulator) | ⚠️ |
| Migrációk | ✅ (CLI) | ❌ (nincs séma) | ✅ |
| Lock-in szint | **Alacsony** | Magas | Magas |
| Tanulási görbe | Közepes | Alacsony | Magas |
| Ingyenes limit | Bőkezű | Bőkezű | Szerény |

---

## Gyakorlat

1. Regisztrálj a [supabase.com](https://supabase.com)-on GitHub fiókkal
2. Hozz létre egy új projektet **EU régióban** (pl. Frankfurt)
3. Várj kb. 1-2 percet, amíg a DB felkészül
4. A **Project Settings → API** menüben jegyezd fel az URL-t és az **anon key**-t (a következő leckékben ezekre szükséged lesz)
`,
            en: `## What is Supabase?

**[Supabase](https://supabase.com)** is a **backend-as-a-service** (BaaS) platform — a click gets you:

- A **Postgres database** (real SQL, not NoSQL)
- **Authentication** (email, OAuth, magic link, phone)
- **Object Storage** (S3-compatible file uploads)
- **Edge Functions** (serverless TypeScript / Deno)
- **Realtime** channels (table changes pushed to clients)
- **Auto-generated REST + GraphQL API** over your tables

Think of it as **Firebase**, but **open source** and built on **real Postgres**. If you ever want to move, your DB is plain Postgres — portable anywhere.

---

## Why NOT a custom backend?

A typical starter-project decision:
- **Your own Node / Python backend:** lots to build (auth, sessions, CRUD, deploy, monitoring)
- **Supabase:** covers 90% of that so you can focus on **your actual business logic**

For small projects, SaaS MVPs, and internal tools, **Supabase** is an excellent choice. Enterprise-grade or heavily specialized systems may warrant something else.

---

## Pricing — what is free?

The **Free tier** (learning, MVPs, small hobbies):

| Resource | Free plan |
|----------|-----------|
| Projects | 2 active (paused after 7 days of inactivity) |
| DB storage | 500 MB |
| Concurrent connections | 60 (direct) / 200 (pooler) |
| Auth users | **50,000** monthly active |
| Storage | 1 GB |
| Edge Function invocations | 500K / month |
| Bandwidth | 5 GB / month |

The **Pro plan ($25/mo)** is enough for a serious MVP or small SaaS. See [supabase.com/pricing](https://supabase.com/pricing).

---

## Core concepts

### 1. **Project**
A Supabase project = **one Postgres database** + auth + storage + edge functions in a region. Spin up **two projects** for dev and prod.

### 2. **Anon key** vs **Service role key**
- **anon key:** public — safe in frontend code. **RLS** policies decide what it can read/write.
- **service_role key:** **NEVER** ship to the frontend — it bypasses every RLS policy. Server-side only (Edge Functions, your backend).

### 3. **Row Level Security (RLS)**
A built-in Postgres feature: **policies** decide which rows a user can read/write. Supabase is **optimized for it** — your frontend can hit the DB safely because policies enforce access.

### 4. **auth.users table**
Every signed-up user ends up in the **\`auth.users\`** table. Its UUID \`id\` is the \`user_id\` foreign key you reference from your own tables.

---

## What Supabase is NOT

Useful to know the **edges**:

- It doesn't replace your **hosted React/Next frontend** (that's Vercel/Netlify)
- It's not a native **message queue** (no Kafka/RabbitMQ — only Realtime)
- **Edge Functions are small** (5 MB limit, 2-minute max) — not a home for heavy backend work

When those are needed: **Supabase + a separate service** (e.g., your own Render/Railway server).

---

## Comparison with other BaaS options

| Feature | **Supabase** | **Firebase** | **AWS Amplify** |
|---------|--------------|--------------|------------------|
| DB type | Postgres (SQL) | Firestore (NoSQL) | DynamoDB (NoSQL) |
| Open source | ✅ | ❌ | ⚠️ (partial) |
| Local dev | ✅ (Docker) | ⚠️ (emulator) | ⚠️ |
| Migrations | ✅ (CLI) | ❌ (schemaless) | ✅ |
| Lock-in level | **Low** | High | High |
| Learning curve | Medium | Low | High |
| Free tier | Generous | Generous | Modest |

---

## Exercise

1. Sign up at [supabase.com](https://supabase.com) with your GitHub account
2. Create a new project in the **EU region** (e.g., Frankfurt)
3. Wait ~1–2 minutes while the DB provisions
4. In **Project Settings → API**, note the URL and **anon key** (you will need these in the next lessons)
`,
          },
        },
        {
          id: "sb-setup-project",
          format: "reading",
          title: {
            hu: "1.2 Supabase projekt létrehozása és eligazodás a dashboardon",
            en: "1.2 Create a Supabase project and find your way around the dashboard",
          },
          summary: {
            hu: "Projekt kattintása, dashboard főbb menüi (Table Editor, SQL Editor, Auth, Storage, Logs).",
            en: "Creating the project, key dashboard menus (Table Editor, SQL Editor, Auth, Storage, Logs).",
          },
          duration: "15–20 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## Projekt létrehozása

A Supabase dashboardon:

1. **New project** gomb
2. **Organization:** alapértelmezetten a saját személyes org
3. **Project name:** pl. \`jegyzetelo-app-dev\` (dev környezet)
4. **Database Password:** generáld **erős jelszóval**, és **azonnal mentsd el** jelszókezelőbe (csak egyszer látod)
5. **Region:** hozzád közeli (EU-ban: Frankfurt)
6. **Plan:** Free

Kb. 1-2 perc várakozás után a DB készen áll.

> **Tipp:** dev és prod környezethez **2 külön projekt**et hozz létre (\`jegyzetelo-dev\` és \`jegyzetelo-prod\`). Később a migrációkat először a dev-re pusholjuk, majd a prodra.

---

## Dashboard – főbb menüpontok

Amikor megnyitod a projektet, a bal oldalsáv ezeket mutatja:

### 🗄️ **Table Editor**
GUI az adatbázis tábláihoz. Olyan, mint az Excel + DB egyben:
- Új tábla létrehozása kattintással
- Oszlopok típussal (uuid, text, timestamp, jsonb…)
- Idegenkulcsok (foreign key) beállítása
- Sorok szerkesztése közvetlenül

### 📝 **SQL Editor**
Tetszőleges Postgres SQL lekérdezések futtatása. Itt írjuk meg a **DDL**-t (táblák, policyk) és itt tesztelünk **select**-eket.

### 🔐 **Authentication**
- **Users:** a regisztrált felhasználók listája
- **Providers:** email, magic link, Google, GitHub stb. ki/be
- **URL Configuration:** redirect URL-ek (fontos OAuth-hoz)
- **Email Templates:** visszaigazoló / jelszó-reset emailek testreszabása

### 📁 **Storage**
S3-szerű fájl tárhely. Bucket-eket hozol létre, majd fájlokat töltesz fel. RLS-szel védhető.

### ⚡ **Edge Functions**
Deno-alapú szerverless függvények. Pl. Stripe webhook, email küldés, harmadik fél API-hívás.

### 🔄 **Realtime**
Beállítható, mely táblák **broadcast**-olnak változásokat a klienseknek. Chat, live dashboard stb.

### 📊 **Database**
Mélyebb admin funkciók: schema vizualizáció, extensions (pgvector, pg_cron stb.), backup-ok.

### 🪵 **Logs**
Minden query, auth event, edge function hívás itt van. Hibakeresésre aranyat ér.

### ⚙️ **Project Settings**
- **API:** az URL és a kulcsok (anon, service_role)
- **Database:** connection string
- **Auth:** JWT secret, session beállítások
- **Integrations:** Stripe, Resend stb. beépített integrációk

---

## API kulcsok – hol, melyiket?

A **Project Settings → API** oldalon **három érték**et fogsz használni:

| Érték | Hol használd? | Biztonságos frontendre? |
|-------|---------------|--------------------------|
| **Project URL** | Mindenhol | ✅ |
| **anon / public key** | Frontend (browser, Lovable, Vite env) | ✅ – RLS véd |
| **service_role key** | Szerver (Edge Function, saját backend) | ❌ **SOHA** |

**Frontend .env példa:**

\`\`\`
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
\`\`\`

A \`service_role\` key-t **kizárólag** a Supabase dashboardon, vagy Edge Function secret-ként tárold – **sose** commitold, **sose** tedd frontendbe.

---

## Első SQL – "Hello Postgres"

Menj a **SQL Editor**-be, és futtasd:

\`\`\`sql
select 'Hello Supabase!' as message, now() as current_time;
\`\`\`

Ha látod az eredményt, a DB-d él. 🎉

---

## Gyakorlat

1. Hozz létre egy dev projektet a fentiek szerint
2. Járd körbe a dashboardot – minden menüpontba nézz be 30 másodpercre
3. Futtasd a „Hello Postgres" SQL-t
4. Jegyezd fel a \`.env\`-be a \`VITE_SUPABASE_URL\`-t és az anon key-t
`,
            en: `## Create the project

In the Supabase dashboard:

1. **New project** button
2. **Organization:** your personal org by default
3. **Project name:** e.g., \`notes-app-dev\` (dev environment)
4. **Database Password:** generate a **strong password** and **save it immediately** in a password manager (shown only once)
5. **Region:** closest to you
6. **Plan:** Free

The DB is ready after ~1–2 minutes.

> **Tip:** create **two projects** for dev and prod (\`notes-dev\` and \`notes-prod\`). We'll push migrations to dev first, then to prod.

---

## Dashboard — main menus

Opening a project, the left sidebar shows:

### 🗄️ **Table Editor**
A GUI for your DB tables. Excel + DB in one:
- Create tables with a click
- Columns with types (uuid, text, timestamp, jsonb…)
- Set foreign keys
- Edit rows directly

### 📝 **SQL Editor**
Run arbitrary Postgres SQL. This is where we write **DDL** (tables, policies) and test **selects**.

### 🔐 **Authentication**
- **Users:** list of registered users
- **Providers:** email, magic link, Google, GitHub, etc. on/off
- **URL Configuration:** redirect URLs (important for OAuth)
- **Email Templates:** customize confirmation / reset emails

### 📁 **Storage**
S3-like file storage. Create buckets, upload files. Can be gated with RLS.

### ⚡ **Edge Functions**
Deno-based serverless functions. E.g., Stripe webhooks, email sending, third-party API calls.

### 🔄 **Realtime**
Choose which tables **broadcast** changes to clients. Chat, live dashboards, etc.

### 📊 **Database**
Deeper admin features: schema viz, extensions (pgvector, pg_cron…), backups.

### 🪵 **Logs**
Every query, auth event, and edge function invocation. Gold for debugging.

### ⚙️ **Project Settings**
- **API:** URL and keys (anon, service_role)
- **Database:** connection string
- **Auth:** JWT secret, session settings
- **Integrations:** Stripe, Resend, and other built-ins

---

## API keys — which goes where?

Under **Project Settings → API** you'll use **three values**:

| Value | Use it where? | Safe for frontend? |
|-------|---------------|---------------------|
| **Project URL** | Everywhere | ✅ |
| **anon / public key** | Frontend (browser, Lovable, Vite env) | ✅ — RLS enforces |
| **service_role key** | Server (Edge Function, your backend) | ❌ **NEVER** |

**Frontend .env example:**

\`\`\`
VITE_SUPABASE_URL=https://abcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...
\`\`\`

Store the \`service_role\` key **only** in the Supabase dashboard or as an Edge Function secret — **never** commit it, **never** put it in the frontend.

---

## First SQL — "Hello Postgres"

Open the **SQL Editor** and run:

\`\`\`sql
select 'Hello Supabase!' as message, now() as current_time;
\`\`\`

If you see a result, your DB is alive. 🎉

---

## Exercise

1. Create a dev project following the steps above
2. Tour every sidebar menu for ~30 seconds
3. Run the "Hello Postgres" SQL
4. Save \`VITE_SUPABASE_URL\` and the anon key into your \`.env\`
`,
          },
        },
      ],
    },
    {
      id: "sb-lovable-integrations-section",
      title: { hu: "2. szekció – Lovable integrációk", en: "Section 2 – Lovable integrations" },
      lessons: [
        {
          id: "sb-lovable-integration",
          format: "reading",
          title: {
            hu: "2.1 Supabase összekötése Lovable-lel",
            en: "2.1 Connecting Supabase to Lovable",
          },
          summary: {
            hu: "Lovable + Supabase natív integráció – egy kattintás, és már mehet a prompt: csinálj bejelentkezést.",
            en: "Lovable + Supabase native integration — one click, then you can prompt: 'build me login'.",
          },
          duration: "25–30 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## Miért Lovable + Supabase?

A **Lovable** natívan támogatja a **Supabase**-t. Ez azt jelenti:

- Egy UI gombbal **összekötöd** a Lovable projektet a Supabase projekteddel
- A Lovable **ismeri** a séma szerkezetedet, a policykat, az auth állapotot
- Promptban kérhetsz olyat, hogy **„csinálj bejelentkezést email+jelszóval"**, és Lovable **tudja**, hogy Supabase Auth-ot kell használnia
- **Automatikusan** generál RLS policykat, amikor új táblát kérsz – nem felejt el védekezni

Ha kézzel integrálnád (Supabase SDK, auth hook, protected route, session figyelés), az sok boilerplate. Lovable **átugorja** ezt helyetted.

---

## Összekötés lépésről lépésre

### 1. A Lovable projektben

1. A Lovable projekted oldalán kattints a jobb felső **„Integrations"** (vagy **„Supabase"**) gombra
2. Válaszd a **„Connect Supabase"** opciót
3. Jelentkezz be a Supabase-re (OAuth)
4. Válaszd ki, melyik **projektet** kötöd hozzá (dev-et elsőre)

### 2. A Supabase oldalán

A Lovable **automatikusan beállítja**:
- A **Site URL**-t a Lovable preview domainre
- A **Redirect URL**-eket (OAuth callback-ekhez)

Ha később saját domaint használsz, ezeket át kell írnod – erről a 3. szekcióban.

---

## Mit kapsz az összekötés után?

A Lovable **automatikusan**:
- Telepíti a **\`@supabase/supabase-js\`** csomagot
- Létrehoz egy **\`src/integrations/supabase/client.ts\`** fájlt az inicializált klienssel
- Environment változókat kezeli (a Lovable build oldalon, nem fájlban)
- Tud **promptba reagálni** olyanra, hogy „csinálj auth flow-t" / „adj hozzá notes tábla CRUD-ot"

A kliens tipikusan így néz ki (Lovable által generálva):

\`\`\`ts
${supabaseClientSnippet}
\`\`\`

---

## Prompt minták Lovable-nek

A Supabase integráció után ezeket a promptokat használhatod közvetlenül:

### Auth
\`\`\`text
Készíts egy bejelentkezési oldalt email+jelszóval. Legyen regisztráció is,
és ha a user még nincs belépve, irányítsd át a /login oldalra.
A sikeres bejelentkezés után a /dashboard-ra menjen.
\`\`\`

### Tábla + CRUD
\`\`\`text
Hozz létre egy 'notes' táblát a Supabase-ben a következő oszlopokkal:
id (uuid, primary), user_id (uuid, kapcsolódik az auth.users-hez),
title (text), body (text), created_at (timestamptz default now()).
Állíts be RLS policyt: csak a saját sorait láthassa és módosíthassa a user.
Aztán a /dashboard oldalon legyen egy lista + új jegyzet form.
\`\`\`

### Social login
\`\`\`text
Adj hozzá Google bejelentkezés gombot a login oldalhoz.
\`\`\`

---

## Mit NE kérj Lovable-től?

Tapasztalat szerint van, ahol a Lovable gyengébb, ezért **kézzel** írd meg:

- **Komplex RLS policyk** 3+ táblás joinnel – inkább írd SQL-ben a Supabase SQL Editor-ben
- **Batch migrációk** több lépésben – a CLI jobb erre (5. szekció)
- **Edge Function** belső logikája – egyszerű skeletonig ok, komplex bizniszlogika jobb IDE-ben

**Általános szabály:** Lovable remek a **vázlatra** és a **80%-os** működőképes appra. A **utolsó 20%**-ot gyakran kézzel finomítod.

---

## Mikor NE használd a Lovable integrációt?

Néhány eset, amikor a sima **direct Supabase** használat jobb:
- Ha már van **kész kódod** és csak a **DB kell** – Lovable integrációja főleg új projekthez való
- Ha **csapatban** dolgoztok és a frontendet **nem Lovable-ben** fejlesztitek
- Ha **sok egyedi hookot** írsz – a Lovable generál, de utána cserélgetni kell

---

## Gyakorlat

1. Kösd össze a Lovable projektedet a Supabase dev projekteddel
2. Nézd meg a generált \`src/integrations/supabase/client.ts\` fájlt
3. Ellenőrizd a Supabase **Authentication → URL Configuration**-ben, hogy a Lovable URL-ek megjelentek-e
4. Tegyél fel egy promptot Lovable-nek: **„Csinálj egy sima 'Welcome' oldalt, és jelenítsd meg, hogy be vagyok-e lépve"** – figyeld, mit generál
`,
            en: `## Why Lovable + Supabase?

**Lovable** has native support for **Supabase**. This means:

- One click **connects** your Lovable project to your Supabase project
- Lovable **understands** your schema, policies, and auth state
- You can prompt **"build me email+password login"** and Lovable **knows** to reach for Supabase Auth
- It **automatically** generates RLS policies when you ask for a new table — it doesn't forget to guard the data

Wiring this up by hand (Supabase SDK, auth hook, protected route, session listener) is lots of boilerplate. Lovable **skips** it for you.

---

## Connecting step by step

### 1. On the Lovable side

1. In your Lovable project, click **"Integrations"** (or **"Supabase"**) in the top-right
2. Choose **"Connect Supabase"**
3. Log in via Supabase OAuth
4. Pick which **project** to link (start with dev)

### 2. On the Supabase side

Lovable **automatically configures**:
- **Site URL** = the Lovable preview domain
- **Redirect URLs** (for OAuth callbacks)

If you later switch to your own domain, you'll need to update these — covered in Section 3.

---

## What you get after connecting

Lovable **automatically**:
- Installs **\`@supabase/supabase-js\`**
- Creates **\`src/integrations/supabase/client.ts\`** with an initialized client
- Manages the environment variables (on the Lovable side, not in a file)
- **Reacts to prompts** like "build an auth flow" / "add CRUD for the notes table"

A typical generated client:

\`\`\`ts
${supabaseClientSnippet}
\`\`\`

---

## Prompt patterns for Lovable

After the Supabase connection, these prompts work directly:

### Auth
\`\`\`text
Build a sign-in page with email + password. Include registration.
If the user is not logged in, redirect them to /login.
After a successful login, send them to /dashboard.
\`\`\`

### Table + CRUD
\`\`\`text
Create a 'notes' table in Supabase with these columns:
id (uuid, primary), user_id (uuid, referencing auth.users),
title (text), body (text), created_at (timestamptz default now()).
Add RLS: the user may only see and modify their own rows.
Then build a list + new-note form on the /dashboard page.
\`\`\`

### Social login
\`\`\`text
Add a Google sign-in button to the login page.
\`\`\`

---

## What NOT to ask Lovable for

Where Lovable tends to struggle — better done **by hand**:

- **Complex RLS policies** across 3+ joined tables — write SQL directly in the Supabase SQL Editor
- **Batch migrations** across multiple steps — use the CLI (Section 5)
- **Deep Edge Function logic** — simple skeletons are fine; complex business logic lives better in your IDE

**Rule of thumb:** Lovable is great for the **skeleton** and the **80%-working** app. The **last 20%** you polish by hand.

---

## When NOT to use Lovable's integration

Cases where going **directly to Supabase** is cleaner:
- You already have **working code** and just need the **DB** — Lovable's integration is really for new projects
- Team projects where the frontend **isn't** in Lovable
- Heavy **custom hooks** — Lovable will generate, but you'll overwrite

---

## Exercise

1. Connect your Lovable project to your Supabase dev project
2. Inspect the generated \`src/integrations/supabase/client.ts\`
3. Check **Authentication → URL Configuration** in Supabase — do the Lovable URLs appear?
4. Prompt Lovable: **"Make a simple 'Welcome' page that shows whether I'm logged in"** — observe what it generates
`,
          },
        },
        {
          id: "sb-lovable-integrations-overview",
          format: "reading",
          title: {
            hu: "2.2 További Lovable integrációk – Stripe, Resend, GitHub",
            en: "2.2 More Lovable integrations — Stripe, Resend, GitHub",
          },
          summary: {
            hu: "Nem csak Supabase: mit tud még a Lovable egy kattintással összekötni és mire érdemes figyelni.",
            en: "Not only Supabase: what else Lovable can connect with one click, and what to watch out for.",
          },
          duration: "15–20 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## A Lovable integrációs ökoszisztéma

A Lovable natív integrációs listája folyamatosan bővül. A leghasznosabbak jelenleg:

| Integráció | Mire jó? | Ingyenes szint? |
|-----------|----------|------------------|
| **Supabase** | Auth + DB + Storage + Edge Functions | ✅ |
| **Stripe** | Fizetés, előfizetés, webhook-ok | ✅ (testing mód) |
| **Resend** | Tranzakciós email (signup, reset, receipts) | ✅ (3000 email/hó) |
| **GitHub** | Kód szinkronizáció (ezt a 1. kurzusban néztük) | ✅ |
| **Custom Domain** | Saját domain a Lovable oldalán (Pro) | ❌ (fizetős) |

Lehetnek további integrációk (pl. analytics, auth provider-specifikus) – a [Lovable dokumentáció](https://docs.lovable.dev) ad friss listát.

---

## Stripe – fizetés 15 perc alatt

A Stripe integrációval **egy kattintás** és egy **prompt** után működő fizetést kapsz.

### Beállítás
1. **Stripe dashboard** → szerezz egy **test API key**-t
2. **Lovable project → Integrations → Stripe → Connect**
3. Másold be az API key-t

### Prompt példa
\`\`\`text
Csinálj egy 'Premium' gombot a /dashboard-on. Kattintáskor indítson
Stripe Checkout Session-t 9.99 EUR/hó árral. A sikeres fizetés után
jelöld a user-t a 'profiles' táblában is_premium=true értékkel
(webhook használatával).
\`\`\`

A Lovable **generál**:
- Egy **Edge Function**-t a Stripe API hívásához
- Egy **webhook handler**-t a fizetés eredményéhez
- A **profiles** tábla update-jét

### Mire figyelj?
- **Test mode → Live mode váltás:** az éles keys-t csak a prod projektbe tedd
- **Webhook secret** beállítása a Stripe dashboardon (különben megkerülhetők)
- **Minimum $0.50** fizetés (Stripe szabálya)

---

## Resend – tranzakciós emailek

A Supabase auth alapból tud emailt küldeni – **de** saját SMTP / brand-olt email-hez a **Resend** jobb választás.

### Beállítás
1. [resend.com](https://resend.com) → regisztráció
2. Domain hozzáadása (SPF/DKIM DNS rekordok)
3. API key másolása
4. Lovable **Integrations → Resend → Connect** → API key

### Prompt példa
\`\`\`text
Amikor a user létrehoz egy új jegyzetet, küldj egy megerősítő email-t
Resend-en keresztül a saját email címére. A subject legyen:
"Új jegyzet mentve: {title}".
\`\`\`

### Mikor NE használd?
- Ha a user-nek minden művelet után küldenél emailt → **spam-fenyegetés**
- **Tömeg-email**ekhez (newsletter) – használj MailerLite / Beehiiv-et

---

## GitHub integráció – miben más most?

Ahogy az 1. kurzusban láttuk: Lovable → GitHub export → repo. A 2. kurzushoz **ugyanez a flow**, de:

- **Dev + Prod branch:** a \`main\` a prod, egy \`dev\` branch a dev Supabase projekthez
- **Pull request** → Vercel preview URL automatikusan → teszteled → merge-eled
- **Migrációs fájlok** (5. szekció) a repo részei – így PR-ben review-zható

---

## Custom Domain – Pro szolgáltatás

A Lovable **Pro** csomag része. Alternatíva az előző kurzusból: **Vercel / GitHub Pages + saját DNS** – ingyen.

Ebben a kurzusban a **Vercel** utat javasoljuk, mert:
- Automatikus preview deploy minden PR-hez
- Ingyenes Hobby szintig
- A Supabase env változók (URL, anon key) a Vercel dashboardon tárolhatók prod + dev szeparálással

---

## „Integrations" vs „saját SDK használat"

**Mikor jó az integráció?**
- Új projekt, gyors indulás
- Standard use-case (bejelentkezés, fizetés)
- Lovable-ben fejlesztesz

**Mikor írd kézzel?**
- Már van fejlett saját kódod
- Nagyon egyedi logika
- A Lovable kerete nem elég rugalmas (pl. custom hookok, context-ek)

---

## Gyakorlat

1. Nézd meg a Lovable projekted **Integrations** panelét – milyen opciók érhetők el
2. Ha van időd: kösd be **Stripe test mode**-ot, és próbálj egy „Premium" gomb promptot
3. Olvasd el a [Resend dokumentációját](https://resend.com/docs) – mikor érdemes saját domain nélkül (resend.dev subdomain) küldeni
`,
            en: `## The Lovable integration ecosystem

Lovable's native integration list keeps growing. The most useful ones right now:

| Integration | What it enables | Free tier? |
|-------------|-----------------|------------|
| **Supabase** | Auth + DB + Storage + Edge Functions | ✅ |
| **Stripe** | Payments, subscriptions, webhooks | ✅ (test mode) |
| **Resend** | Transactional email (signup, reset, receipts) | ✅ (3000 emails/mo) |
| **GitHub** | Code sync (covered in Course 1) | ✅ |
| **Custom Domain** | Own domain via Lovable (Pro) | ❌ (paid) |

The list grows over time — check the [Lovable docs](https://docs.lovable.dev) for the current state.

---

## Stripe — payments in 15 minutes

The Stripe integration gives you working payments after **one click** + **one prompt**.

### Setup
1. **Stripe dashboard** → grab a **test API key**
2. **Lovable project → Integrations → Stripe → Connect**
3. Paste the API key

### Prompt example
\`\`\`text
Add a 'Premium' button to /dashboard. When clicked, start a Stripe
Checkout Session priced at €9.99/month. On successful payment, mark
the user in the 'profiles' table as is_premium=true (via webhook).
\`\`\`

Lovable **generates**:
- An **Edge Function** for the Stripe API call
- A **webhook handler** for the payment result
- A **profiles** table update

### Watch out for
- **Test mode → Live mode**: put the live key only in the prod project
- **Webhook secret** set in the Stripe dashboard (otherwise webhooks can be spoofed)
- **Minimum $0.50** per charge (Stripe rule)

---

## Resend — transactional email

Supabase auth can send email out of the box — but for **branded / custom-SMTP** email, **Resend** is better.

### Setup
1. Sign up at [resend.com](https://resend.com)
2. Add your domain (SPF/DKIM DNS records)
3. Copy the API key
4. Lovable **Integrations → Resend → Connect** → paste key

### Prompt example
\`\`\`text
When a user creates a new note, send a confirmation email via Resend
to their own address. Subject: "New note saved: {title}".
\`\`\`

### When NOT to use it
- Sending email on every user action → **spam risk**
- **Bulk email** (newsletters) — use MailerLite / Beehiiv instead

---

## GitHub integration — what's different now?

Course 1 showed Lovable → GitHub export → repo. Course 2 uses the **same flow**, plus:

- **Dev + Prod branches:** \`main\` is prod, a \`dev\` branch for the dev Supabase project
- **Pull request** → automatic Vercel preview URL → test → merge
- **Migration files** (Section 5) live in the repo so they're reviewable in PRs

---

## Custom Domain — a Pro feature

Part of Lovable's **Pro** plan. Alternative (from Course 1): **Vercel / GitHub Pages + your own DNS** — free.

This course recommends **Vercel** because:
- Automatic preview deploys for every PR
- Free on the Hobby tier
- Supabase env vars (URL, anon key) live in the Vercel dashboard with prod/dev separation

---

## "Integrations" vs "direct SDK usage"

**When is an integration a win?**
- New project, fast start
- Standard use case (login, payments)
- You build in Lovable

**When to write it yourself?**
- You already have advanced hand-written code
- Very custom logic
- Lovable's template is not flexible enough (custom hooks, contexts)

---

## Exercise

1. Open the **Integrations** panel in your Lovable project — what's available?
2. If you have time: connect **Stripe in test mode** and try a "Premium" button prompt
3. Read the [Resend docs](https://resend.com/docs) — when can you send without a custom domain (resend.dev subdomain)?
`,
          },
        },
      ],
    },
    {
      id: "sb-auth-section",
      title: { hu: "3. szekció – Autentikáció", en: "Section 3 – Authentication" },
      lessons: [
        {
          id: "sb-auth-email-password",
          format: "reading",
          title: {
            hu: "3.1 Email + jelszó bejelentkezés és session kezelés",
            en: "3.1 Email + password login and session handling",
          },
          summary: {
            hu: "Regisztráció, bejelentkezés, kijelentkezés, session figyelés – a kliens oldali minimum.",
            en: "Sign up, sign in, sign out, session listener — the client-side minimum.",
          },
          duration: "30–40 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## Supabase Auth – hogyan működik?

A Supabase Auth egy **GoTrue** (open source) szolgáltatásra épül:

1. A user regisztrál email+jelszóval → Supabase létrehoz egy usert az **\`auth.users\`** táblában
2. Bejelentkezéskor a szerver **JWT tokent** ad vissza
3. A JWT **automatikusan** bekerül a Supabase klienst minden DB-hívásába (Authorization header)
4. Az **RLS policyk** a JWT-ből kiolvasott \`auth.uid()\`-t használják a jogosultság-ellenőrzésre

A teljes flow **kulcsmentesen** működik – a frontend-nek csak az anon key kell, minden más a JWT-ben utazik.

---

## 1. Bejelentkezési provider beállítása

Supabase dashboard → **Authentication → Providers → Email**

- **Enable email provider:** ✅ (alapból be van kapcsolva)
- **Confirm email:** javasolt ✅ – a user-nek megerősítő emailt küld Supabase
- **Password minimum length:** pl. 8+

Ha dev módban gyorsan tesztelsz, kikapcsolhatod a confirm emailt – prodban **kapcsold vissza**.

---

## 2. A kliens setup

Ha Lovable integrációt használtál, ez már készen van. Kézi setup:

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

\`\`\`ts
${supabaseClientSnippet}
\`\`\`

---

## 3. Regisztráció

\`\`\`ts
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "biztonsagos-jelszo",
});

if (error) {
  console.error(error.message);
} else {
  // data.user: létrehozott user (vagy null, ha email confirm van)
  // data.session: session (null, ha email confirm szükséges)
}
\`\`\`

**Email confirm ON esetén:** a user kap egy linket emailben, és csak annak megnyitása után kap session-t.

---

## 4. Bejelentkezés

\`\`\`ts
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "biztonsagos-jelszo",
});

// data.session ezt adja vissza sikernél:
// { access_token, refresh_token, expires_at, user, ... }
\`\`\`

Sikeres bejelentkezés után a kliens **automatikusan** eltárolja a session-t a böngésző **localStorage**-jában, és minden további DB-hívásnál beilleszti a JWT-t.

---

## 5. Kijelentkezés

\`\`\`ts
await supabase.auth.signOut();
// localStorage törölve, session null
\`\`\`

---

## 6. Session figyelése – \`useAuth\` hook

Minden „bejelentkezésre építő" app-nak kell egy **hook / context**, ami figyeli a session állapotot. Egy minimális verzió:

\`\`\`tsx
${useAuthSnippet}
\`\`\`

**Két dolgot figyelünk:**
1. **Initial session** – oldalbetöltéskor kiolvassuk a már létező session-t a localStorage-ből
2. **\`onAuthStateChange\`** – reagálunk a SIGN_IN / SIGN_OUT / TOKEN_REFRESHED eseményekre

---

## 7. Login form példa

\`\`\`tsx
${loginFormSnippet}
\`\`\`

Éles környezetben ide jön még: loading state, form validáció, „elfelejtett jelszó" link, szép UI.

---

## 8. Protected route – csak belépve érhető el

\`\`\`tsx
${protectedRouteSnippet}
\`\`\`

Használat:

\`\`\`tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
\`\`\`

---

## Tipikus hibák és elkerülésük

### ❌ „User logs in, but nothing happens"
**Ok:** nincs \`onAuthStateChange\` listener, vagy a navigáció nem reagál a session változásra.
**Megoldás:** a login után **explicit \`navigate("/dashboard")\`**, vagy a hook frissülése kiváltja a re-render-t.

### ❌ „Refresh után kijelentkezve vagyok"
**Ok:** vagy nem használod a Supabase SDK-t (manuálisan JWT-t tárolsz), vagy az \`autoRefreshToken\` ki van kapcsolva.
**Megoldás:** használd a Supabase klienst, az alapból \`persistSession: true\` és \`autoRefreshToken: true\`.

### ❌ „Email confirm link nem érkezik"
**Ok:** Supabase Free tier-en a kimenő SMTP limitált, **fejlesztői tesztesemények** gyorsan kimerítik.
**Megoldás:** prodban állíts be **Resend** vagy saját SMTP-t (Authentication → Email settings).

### ❌ „A token lejárt"
**Ok:** a JWT alapból **1 óra** után lejár, a Supabase automatikusan refreshel – de ha elalszik a gép / offline voltál, kapsz egy **401**-et.
**Megoldás:** csapd el az error-t, és \`signInWithPassword\` helyett próbáld a \`refreshSession()\`-t.

---

## Gyakorlat

1. Lovable-ben (vagy manuálisan) csinálj egy \`/login\` oldalt email+jelszó form-mal
2. Csinálj egy \`/register\` oldalt
3. Csinálj egy \`/dashboard\` oldalt, amit \`<ProtectedRoute>\` véd
4. Teszteld: regisztrálj, jelentkezz be, frissítsd az oldalt (maradj belépve), jelentkezz ki
5. Nézd meg a Supabase **Authentication → Users** menüben, hogy megjelentél-e
`,
            en: `## Supabase Auth — how it works

Supabase Auth is built on **GoTrue** (open source):

1. A user signs up with email+password → Supabase creates a row in **\`auth.users\`**
2. On sign-in, the server returns a **JWT**
3. The JWT is **automatically** attached to every DB call from the Supabase client (Authorization header)
4. **RLS policies** read \`auth.uid()\` from the JWT to enforce permissions

The whole flow runs **keylessly** from the client — frontend only needs the anon key, everything else rides inside the JWT.

---

## 1. Enable the provider

Supabase dashboard → **Authentication → Providers → Email**

- **Enable email provider:** ✅ (on by default)
- **Confirm email:** recommended ✅ — Supabase sends a confirmation email
- **Password minimum length:** e.g., 8+

During dev iteration you can turn off confirm email for speed — **turn it back on** in prod.

---

## 2. Client setup

If you used the Lovable integration, this is done. Manual setup:

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

\`\`\`ts
${supabaseClientSnippet}
\`\`\`

---

## 3. Sign up

\`\`\`ts
const { data, error } = await supabase.auth.signUp({
  email: "user@example.com",
  password: "secure-password",
});

if (error) {
  console.error(error.message);
} else {
  // data.user: the created user (or null if email confirm is required)
  // data.session: session (null if email confirm is required)
}
\`\`\`

**Email confirm ON:** the user receives a link by email; the session only appears after clicking it.

---

## 4. Sign in

\`\`\`ts
const { data, error } = await supabase.auth.signInWithPassword({
  email: "user@example.com",
  password: "secure-password",
});

// On success, data.session is:
// { access_token, refresh_token, expires_at, user, ... }
\`\`\`

On success, the client **automatically** stores the session in **localStorage** and injects the JWT into every subsequent DB call.

---

## 5. Sign out

\`\`\`ts
await supabase.auth.signOut();
// localStorage cleared, session is null
\`\`\`

---

## 6. Session listener — a \`useAuth\` hook

Every "auth-driven" app needs a **hook / context** that watches session state. A minimal version:

\`\`\`tsx
${useAuthSnippet}
\`\`\`

**We watch two things:**
1. **Initial session** — on page load, read any existing session from localStorage
2. **\`onAuthStateChange\`** — react to SIGN_IN / SIGN_OUT / TOKEN_REFRESHED events

---

## 7. Login form example

\`\`\`tsx
${loginFormSnippet}
\`\`\`

A production version adds loading state, form validation, a "forgot password" link, and proper styling.

---

## 8. Protected route — only accessible when signed in

\`\`\`tsx
${protectedRouteSnippet}
\`\`\`

Usage:

\`\`\`tsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
\`\`\`

---

## Common mistakes and how to avoid them

### ❌ "User logs in, but nothing happens"
**Cause:** no \`onAuthStateChange\` listener, or navigation doesn't react to the session change.
**Fix:** explicit \`navigate("/dashboard")\` after login, or have the hook update trigger a re-render.

### ❌ "I'm logged out after a refresh"
**Cause:** you're not using the Supabase SDK (storing the JWT yourself), or \`autoRefreshToken\` is off.
**Fix:** use the Supabase client — by default \`persistSession: true\` and \`autoRefreshToken: true\`.

### ❌ "Confirm email never arrives"
**Cause:** Supabase's built-in SMTP on the free tier is rate-limited and burns out fast with repeated testing.
**Fix:** in prod, configure **Resend** or a custom SMTP (Authentication → Email settings).

### ❌ "Token expired"
**Cause:** the JWT defaults to **1 hour** expiry; Supabase auto-refreshes — but if the machine slept or went offline, you'll see a **401**.
**Fix:** catch the error and call \`refreshSession()\` (instead of re-prompting the password).

---

## Exercise

1. In Lovable (or manually) build a \`/login\` page with an email+password form
2. Build a \`/register\` page
3. Build a \`/dashboard\` page gated by \`<ProtectedRoute>\`
4. Test: register, sign in, refresh (stay logged in), sign out
5. Check **Authentication → Users** in Supabase — did you show up?
`,
          },
        },
        {
          id: "sb-auth-oauth-social",
          format: "reading",
          title: {
            hu: "3.2 OAuth: Google és GitHub bejelentkezés",
            en: "3.2 OAuth: Google and GitHub sign-in",
          },
          summary: {
            hu: "Mikor érdemes OAuth? Provider beállítása, redirect URL-ek, callback kezelés.",
            en: "When to use OAuth? Provider setup, redirect URLs, handling the callback.",
          },
          duration: "25–30 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## Miért OAuth?

Az **OAuth** („Google-lel bejelentkezés", „GitHub-bal bejelentkezés") előnyei:

- **Nincs jelszó** a te rendszeredben – nincs mit ellopni
- **Gyorsabb onboarding** – egy kattintás, nem kell emailt megerősíteni
- **Magasabb conversion** – a user nem kényszerül új jelszót kitalálni
- **Automatikus email verification** – a Google / GitHub már megerősítette

**Tipikus döntés:** email+jelszó **+ legalább egy** OAuth provider (Google vagy GitHub).

---

## Google OAuth – beállítás

### 1. Google Cloud Console

1. Nyisd meg a [console.cloud.google.com](https://console.cloud.google.com)-ot
2. Hozz létre új **projektet** (vagy válassz meglévőt)
3. **APIs & Services → OAuth consent screen:** tölts ki (app név, logo, scope-ok)
4. **Credentials → Create Credentials → OAuth Client ID**
   - **Application type:** Web application
   - **Authorized redirect URIs:** \`https://abcdefgh.supabase.co/auth/v1/callback\` (a te projekt URL-ed)
5. Mentés után kapsz egy **Client ID**-t és egy **Client Secret**-et

### 2. Supabase dashboard

1. **Authentication → Providers → Google → Enable**
2. Másold be a **Client ID**-t és **Client Secret**-et
3. **Save**

### 3. URL Configuration (fontos!)

**Authentication → URL Configuration** – állítsd be:
- **Site URL:** a prod URL-ed (\`https://sajatapp.com\`)
- **Redirect URLs:** minden lehetséges érkezési pont
  - \`https://sajatapp.com/**\`
  - \`https://sajatapp.vercel.app/**\`
  - \`http://localhost:3000/**\` (dev)
  - A Lovable preview URL

Ha a redirect URL nincs beállítva, a Google login után a Supabase hibát dob.

---

## GitHub OAuth – beállítás

### 1. GitHub fiók

1. **Settings → Developer settings → OAuth Apps → New OAuth App**
2. **Homepage URL:** \`https://sajatapp.com\`
3. **Authorization callback URL:** \`https://abcdefgh.supabase.co/auth/v1/callback\` (ugyanaz a minta)
4. Kapsz **Client ID**-t és **Client Secret**-et

### 2. Supabase dashboard

**Authentication → Providers → GitHub → Enable** → paste Client ID + Secret → Save

---

## Kliens oldali kód – OAuth bejelentkezés

\`\`\`ts
import { supabase } from "@/lib/supabase";

const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: \`\${window.location.origin}/auth/callback\`,
    },
  });
  if (error) console.error(error);
};

const handleGitHubSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: \`\${window.location.origin}/auth/callback\`,
    },
  });
  if (error) console.error(error);
};
\`\`\`

A \`signInWithOAuth\` **átirányítja** a user-t a provider-hez. Siker után visszajön a \`redirectTo\` URL-re.

---

## Callback oldal – nagyon egyszerű

\`\`\`tsx
// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // A Supabase SDK automatikusan kezeli az URL-ben érkező tokent
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/dashboard");
      } else {
        navigate("/login?error=oauth_failed");
      }
    });
  }, [navigate]);

  return <div>Bejelentkezés…</div>;
};
\`\`\`

Útvonal hozzáadása:
\`\`\`tsx
<Route path="/auth/callback" element={<AuthCallback />} />
\`\`\`

---

## Magic Link – passwordless alternatíva

Ha nem akarsz OAuth-ot, de jelszómentességet igen, a **magic link** egyszerűbb:

\`\`\`ts
await supabase.auth.signInWithOtp({
  email: "user@example.com",
  options: { emailRedirectTo: \`\${window.location.origin}/auth/callback\` },
});
\`\`\`

A user kap egy emailt egy linkkel → kattintással bejelentkezik. **Nincs jelszó sehol.**

**Előny:** minimális UI, nincs „elfelejtettem" flow. **Hátrány:** ha nem érkezik az email, a user beragad.

---

## URL konfiguráció – dev és prod

A Supabase egy projekten **több URL-t** is elfogad redirect-re. Konfiguráció:

**Site URL:** a fő URL (csak egy)
**Redirect URLs:** minden elfogadott cél – minta-egyezéssel

\`\`\`
https://sajatapp.com/**
https://sajatapp-dev.vercel.app/**
http://localhost:3000/**
\`\`\`

A \`**\` wildcard az egész útvonalat lefedi. Ha ezt elfelejted, „Invalid redirect URL" hibát kapsz.

---

## Tipikus OAuth hibák

### „redirect_uri_mismatch" a Google oldaláról
A Google Cloud Console **Authorized redirect URIs**-be pontosan a Supabase callback URL-t kell beírni: **\`https://[project-ref].supabase.co/auth/v1/callback\`**. Nem a \`/auth/callback\`-ot és nem a Vercel URL-t.

### „URL not allowed" Supabase részéről
A **Redirect URLs** listán nincs rajta a \`window.location.origin\` – add hozzá (wildcard-dal).

### Sikeres bejelentkezés, de üres session
A frontend \`getSession()\` hívása túl korán történik – várj az \`onAuthStateChange\` eseményre.

---

## Gyakorlat

1. Hozz létre egy Google OAuth credential-t (csak dev-re, Supabase callback URL-lel)
2. Kapcsold be a Google providert a Supabase-ben
3. A Lovable projektedben add hozzá a „Sign in with Google" gombot
4. Teszteld: bejelentkezés → callback → dashboard
5. Ellenőrizd, hogy a **Authentication → Users** menüben megjelenik-e az új user (Google avatarral)
`,
            en: `## Why OAuth?

**OAuth** ("Sign in with Google", "Sign in with GitHub") wins:

- **No password** in your system — nothing for attackers to steal
- **Faster onboarding** — one click, no email confirmation needed
- **Higher conversion** — users don't need to invent another password
- **Automatic email verification** — already done by Google/GitHub

**Typical choice:** email+password **plus at least one** OAuth provider (Google or GitHub).

---

## Google OAuth — setup

### 1. Google Cloud Console

1. Open [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new **project** (or pick an existing one)
3. **APIs & Services → OAuth consent screen:** fill in app name, logo, scopes
4. **Credentials → Create Credentials → OAuth Client ID**
   - **Application type:** Web application
   - **Authorized redirect URIs:** \`https://abcdefgh.supabase.co/auth/v1/callback\` (your project URL)
5. Save — you get a **Client ID** and **Client Secret**

### 2. Supabase dashboard

1. **Authentication → Providers → Google → Enable**
2. Paste **Client ID** and **Client Secret**
3. **Save**

### 3. URL Configuration (critical!)

**Authentication → URL Configuration** — set:
- **Site URL:** your prod URL (\`https://yourapp.com\`)
- **Redirect URLs:** every possible landing point
  - \`https://yourapp.com/**\`
  - \`https://yourapp.vercel.app/**\`
  - \`http://localhost:3000/**\` (dev)
  - Your Lovable preview URL

If the redirect URL is missing, Google login fails with a Supabase error.

---

## GitHub OAuth — setup

### 1. GitHub account

1. **Settings → Developer settings → OAuth Apps → New OAuth App**
2. **Homepage URL:** \`https://yourapp.com\`
3. **Authorization callback URL:** \`https://abcdefgh.supabase.co/auth/v1/callback\` (same pattern)
4. You get a **Client ID** and **Client Secret**

### 2. Supabase dashboard

**Authentication → Providers → GitHub → Enable** → paste Client ID + Secret → Save

---

## Client code — OAuth sign-in

\`\`\`ts
import { supabase } from "@/lib/supabase";

const handleGoogleSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: \`\${window.location.origin}/auth/callback\`,
    },
  });
  if (error) console.error(error);
};

const handleGitHubSignIn = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: \`\${window.location.origin}/auth/callback\`,
    },
  });
  if (error) console.error(error);
};
\`\`\`

\`signInWithOAuth\` **redirects** the user to the provider. On success it returns to your \`redirectTo\` URL.

---

## Callback page — very small

\`\`\`tsx
// src/pages/AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";

export const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase SDK automatically parses the token from the URL
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate("/dashboard");
      } else {
        navigate("/login?error=oauth_failed");
      }
    });
  }, [navigate]);

  return <div>Signing in…</div>;
};
\`\`\`

Register the route:
\`\`\`tsx
<Route path="/auth/callback" element={<AuthCallback />} />
\`\`\`

---

## Magic Link — passwordless alternative

No OAuth but still passwordless? **Magic link** is simpler:

\`\`\`ts
await supabase.auth.signInWithOtp({
  email: "user@example.com",
  options: { emailRedirectTo: \`\${window.location.origin}/auth/callback\` },
});
\`\`\`

The user receives an email with a link → one click signs them in. **No password anywhere.**

**Pro:** minimal UI, no "forgot password" flow. **Con:** if the email doesn't arrive, the user is stuck.

---

## URL configuration — dev and prod

Supabase accepts **multiple URLs** as redirects for a single project. Config:

**Site URL:** the primary (just one)
**Redirect URLs:** every accepted destination — pattern-matched

\`\`\`
https://yourapp.com/**
https://yourapp-dev.vercel.app/**
http://localhost:3000/**
\`\`\`

The \`**\` wildcard matches any path. Forgetting this gives you "Invalid redirect URL".

---

## Common OAuth errors

### "redirect_uri_mismatch" from Google
In Google Cloud Console, the **Authorized redirect URIs** must be exactly the Supabase callback URL: **\`https://[project-ref].supabase.co/auth/v1/callback\`**. Not \`/auth/callback\`, not the Vercel URL.

### "URL not allowed" from Supabase
Your **Redirect URLs** list is missing \`window.location.origin\` — add it (with wildcard).

### Sign-in succeeds, session is empty
The frontend called \`getSession()\` too early — listen for \`onAuthStateChange\` instead.

---

## Exercise

1. Create a Google OAuth credential (dev only, with the Supabase callback URL)
2. Enable the Google provider in Supabase
3. Add a "Sign in with Google" button to your Lovable project
4. Test: login → callback → dashboard
5. Verify **Authentication → Users** shows your new user (with Google avatar)
`,
          },
        },
      ],
    },
    {
      id: "sb-database-section",
      title: { hu: "4. szekció – Adatbázis & RLS", en: "Section 4 – Database & RLS" },
      lessons: [
        {
          id: "sb-database-tables",
          format: "reading",
          title: {
            hu: "4.1 Táblák, oszlopok, kapcsolatok",
            en: "4.1 Tables, columns, relations",
          },
          summary: {
            hu: "A 'notes' tábla létrehozása – uuid primary key, foreign key az auth.users-hez, időbélyegek.",
            en: "Building the 'notes' table — uuid primary key, foreign key to auth.users, timestamps.",
          },
          duration: "25–30 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## Mit jelent egy jó tábla-design?

Supabase **Postgres**-re épít, tehát ugyanaz a filozófia, mint bármelyik SQL DB-nél:

- **Minden sornak** legyen egyedi **primary key**-e (\`uuid\` vagy \`bigint\`)
- **Időbélyeg** (\`created_at\`, \`updated_at\`) minden táblán – aranyat ér hibakeresésnél
- **Foreign key**-ekkel hivatkozz más táblákra – ne tárolj „user_email" oszlopot, ha van user_id
- **Index**-eld a gyakran szűrt oszlopokat (pl. \`user_id\`)
- **NOT NULL** ahol lehet – a nullable oszlopok bugok forrása

---

## A 'notes' tábla létrehozása

### GUI-val (Table Editor)

1. **Table Editor → New Table**
2. **Name:** \`notes\`
3. **Enable Row Level Security:** ✅ (nagyon fontos!)
4. Columns:
   - \`id\` — uuid, primary, default \`gen_random_uuid()\`
   - \`user_id\` — uuid, references \`auth.users(id)\`, on delete cascade
   - \`title\` — text, not null
   - \`body\` — text, nullable
   - \`created_at\` — timestamptz, default \`now()\`
   - \`updated_at\` — timestamptz, default \`now()\`
5. **Save**

### SQL-lel (gyorsabb, verziózható)

**SQL Editor** → paste → run:

\`\`\`sql
${createNotesTableSql}
\`\`\`

Ez a pontosabb út – **erre tudunk migrációt is készíteni** (5. szekció).

---

## Oszlop típusok – gyors útmutató

| Típus | Mire jó? | Példa |
|-------|----------|-------|
| \`uuid\` | Elsődleges kulcsok, felhasználói azonosítók | \`gen_random_uuid()\` |
| \`text\` | Sztringek (nincs hosszkorlát) | username, title |
| \`varchar(n)\` | Korlátozott hosszú sztring | country_code(2) |
| \`boolean\` | Igen/nem | is_active, is_premium |
| \`integer\` / \`bigint\` | Egész számok | count, price_cents |
| \`numeric(10,2)\` | Fix pontosságú tizedes | ár (ne \`float\`!) |
| \`timestamptz\` | Időbélyeg időzónával | created_at, expires_at |
| \`jsonb\` | Strukturált, kereshető JSON | metadata, settings |
| \`text[]\` | Tömb | tags, hashtag-ek |

---

## Foreign key – a kapcsolat

A \`user_id\` oszlop a **\`auth.users(id)\`**-re mutat. Az \`on delete cascade\` azt jelenti: ha a user-t törlik, a jegyzetei is törlődnek.

**Alternatíva:** \`on delete set null\` – a user törlődik, de a jegyzetek megmaradnak „névtelen" állapotban. Melyiket válaszd? Attól függ, GDPR-barát-e az árva adat.

---

## Select lekérdezések a klienstől

A Supabase kliens SDK **fluent API**-t ad a select-ekre:

\`\`\`ts
// Összes (saját) jegyzet
const { data, error } = await supabase
  .from("notes")
  .select("*")
  .order("created_at", { ascending: false });

// Egy konkrét jegyzet
const { data, error } = await supabase
  .from("notes")
  .select("id, title, body, created_at")
  .eq("id", noteId)
  .single();

// Szűrt lekérdezés
const { data, error } = await supabase
  .from("notes")
  .select("*")
  .ilike("title", "%todo%")
  .limit(20);
\`\`\`

**Fontos:** az RLS **itt lép be** – a kliens nem láthatja mások sorait, akkor se, ha a select nem szűr user_id-re. A policy-t a 4.2 leckében állítjuk be.

---

## Insert, update, delete

\`\`\`ts
// Insert
const { data, error } = await supabase
  .from("notes")
  .insert({ title: "Első jegyzet", body: "Ez egy jegyzet", user_id: user.id })
  .select()
  .single();

// Update
const { error } = await supabase
  .from("notes")
  .update({ title: "Új cím", updated_at: new Date().toISOString() })
  .eq("id", noteId);

// Delete
const { error } = await supabase
  .from("notes")
  .delete()
  .eq("id", noteId);
\`\`\`

---

## Joinok – több tábla egyszerre

Ha később lesz pl. \`tags\` táblád, relation-nel kérheted:

\`\`\`ts
const { data } = await supabase
  .from("notes")
  .select(\`
    id, title,
    tags ( name )
  \`)
  .eq("user_id", user.id);
\`\`\`

A Supabase **automatikusan** felismeri a foreign key alapján, hogy a \`tags\` tábla kapcsolódik.

---

## Index – miért számít?

A **\`notes_user_id_idx\`** index (lásd a create script végén) azt mondja a Postgres-nek: „ha valaki \`where user_id = ...\` szűr, gyorsan találd meg". Nélküle 100K sornál már lassul.

**Általános szabály:** minden foreign key-t indexelj, és minden gyakran \`where\`-elt oszlopot.

---

## Gyakorlat

1. Hozd létre a \`notes\` táblát a fenti SQL-lel a Supabase SQL Editor-ben
2. Kapcsold be rá az RLS-t (ha nem tetted)
3. **Table Editor**-ben szúrj be kézzel **2-3 sort** – mit látsz?
4. Próbálj a kliensből \`select\`-et – kapsz-e adatot? (Még nem, RLS policy nélkül. Ez a következő lecke.)
`,
            en: `## What makes a good table design?

Supabase runs on **Postgres**, so the rules are the same as any SQL DB:

- **Every row** needs a unique **primary key** (\`uuid\` or \`bigint\`)
- A **timestamp** (\`created_at\`, \`updated_at\`) on every table — gold for debugging
- Use **foreign keys** for references — don't store "user_email" when you have a user_id
- **Index** frequently-filtered columns (e.g., \`user_id\`)
- **NOT NULL** where you can — nullable columns are bug factories

---

## Creating the 'notes' table

### Via GUI (Table Editor)

1. **Table Editor → New Table**
2. **Name:** \`notes\`
3. **Enable Row Level Security:** ✅ (critical!)
4. Columns:
   - \`id\` — uuid, primary, default \`gen_random_uuid()\`
   - \`user_id\` — uuid, references \`auth.users(id)\`, on delete cascade
   - \`title\` — text, not null
   - \`body\` — text, nullable
   - \`created_at\` — timestamptz, default \`now()\`
   - \`updated_at\` — timestamptz, default \`now()\`
5. **Save**

### Via SQL (faster, versionable)

**SQL Editor** → paste → run:

\`\`\`sql
${createNotesTableSql}
\`\`\`

This is the precise path — and it's **what we'll convert into a migration** (Section 5).

---

## Column types — quick reference

| Type | Use for | Example |
|------|---------|---------|
| \`uuid\` | Primary keys, user IDs | \`gen_random_uuid()\` |
| \`text\` | Strings (no length limit) | username, title |
| \`varchar(n)\` | Bounded-length string | country_code(2) |
| \`boolean\` | Yes/no | is_active, is_premium |
| \`integer\` / \`bigint\` | Whole numbers | count, price_cents |
| \`numeric(10,2)\` | Fixed-precision decimal | money (never \`float\`!) |
| \`timestamptz\` | Timestamp with timezone | created_at, expires_at |
| \`jsonb\` | Structured, searchable JSON | metadata, settings |
| \`text[]\` | Array | tags, hashtags |

---

## Foreign key — the relation

\`user_id\` points at **\`auth.users(id)\`**. \`on delete cascade\` means: when the user is deleted, their notes go with them.

**Alternative:** \`on delete set null\` — the user is deleted but notes stay "anonymized". Which one is right depends on whether orphaned data is GDPR-friendly for your case.

---

## Client-side select queries

The Supabase client SDK has a **fluent API** for selects:

\`\`\`ts
// All (your own) notes
const { data, error } = await supabase
  .from("notes")
  .select("*")
  .order("created_at", { ascending: false });

// A specific note
const { data, error } = await supabase
  .from("notes")
  .select("id, title, body, created_at")
  .eq("id", noteId)
  .single();

// Filtered query
const { data, error } = await supabase
  .from("notes")
  .select("*")
  .ilike("title", "%todo%")
  .limit(20);
\`\`\`

**Important:** RLS kicks in **here** — the client can't see others' rows even if the select doesn't filter by user_id. We'll set up the policy in 4.2.

---

## Insert, update, delete

\`\`\`ts
// Insert
const { data, error } = await supabase
  .from("notes")
  .insert({ title: "First note", body: "Hello", user_id: user.id })
  .select()
  .single();

// Update
const { error } = await supabase
  .from("notes")
  .update({ title: "New title", updated_at: new Date().toISOString() })
  .eq("id", noteId);

// Delete
const { error } = await supabase
  .from("notes")
  .delete()
  .eq("id", noteId);
\`\`\`

---

## Joins — across tables

If you later add a \`tags\` table, Supabase can pull the relation:

\`\`\`ts
const { data } = await supabase
  .from("notes")
  .select(\`
    id, title,
    tags ( name )
  \`)
  .eq("user_id", user.id);
\`\`\`

Supabase **detects** the link through the foreign key.

---

## Indexes — why they matter

The **\`notes_user_id_idx\`** index (the last line of the create script) tells Postgres: "if someone filters \`where user_id = ...\`, find it fast". Without it, 100K rows already feel slow.

**Rule of thumb:** index every foreign key, and every frequently-\`where\`-clauseed column.

---

## Exercise

1. Run the \`notes\` SQL above in the Supabase SQL Editor
2. Turn on RLS (if you haven't)
3. In the **Table Editor**, insert **2–3 rows** manually — what do you see?
4. Try a \`select\` from the client — do you get data? (Not yet — no RLS policy. That's the next lesson.)
`,
          },
        },
        {
          id: "sb-database-rls",
          format: "reading",
          title: {
            hu: "4.2 Row Level Security (RLS) – a biztonság kulcsa",
            en: "4.2 Row Level Security (RLS) — the security keystone",
          },
          summary: {
            hu: "Hogyan döntsük el kliens oldalról biztonságosan, ki mit lát? Policy-k SELECT/INSERT/UPDATE/DELETE-re.",
            en: "How to safely decide who sees what from the client? Policies for SELECT/INSERT/UPDATE/DELETE.",
          },
          duration: "30–35 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## Miért KELL az RLS?

A Supabase frontendje **közvetlenül** hívja a Postgrest (PostgREST közvetítésével). Nincs közötte szerver, ami validáljon.

**Következmény:** ha az RLS **nincs** bekapcsolva és **nincs policy**, akkor:
- A user az anon key-jével **akármelyik** sort kérheti (\`from("notes").select("*")\` → mindenkiét visszakapja)
- Pláne, delete-elheti is

**RLS a védelem**. Bekapcsolni: \`alter table ... enable row level security;\`
Ezek után **alapból semmit sem** láthat senki – és a **policy**-k engedik vissza egyesével.

---

## RLS filozófia

Egy policy válaszol egy kérdésre:
- **SELECT:** melyik sort láthatja a user?
- **INSERT:** milyen sort szúrhat be?
- **UPDATE:** melyik sort módosíthatja és mivé?
- **DELETE:** melyik sort törölheti?

A 4 művelethez **4 külön policy** – így finom a kontroll.

---

## A 'notes' tábla teljes policy-szerelvénye

**SQL Editor-ben futtasd:**

\`\`\`sql
${rlsPolicySql}
\`\`\`

Bontsuk le:

### SELECT
\`\`\`sql
using (auth.uid() = user_id)
\`\`\`
„Csak olyan sort lássál, ahol a **te user_id-d** egyezik a sor \`user_id\`-jével." Az \`auth.uid()\` a JWT-ből jön, és a Supabase automatikusan injektálja.

### INSERT
\`\`\`sql
with check (auth.uid() = user_id)
\`\`\`
„Csak olyan sort szúrhatsz be, amiben a \`user_id\` a tiéd." Ez megakadályozza, hogy valaki más nevében posztolj jegyzetet.

### UPDATE
Szükséges **mindkettő**:
- \`using (auth.uid() = user_id)\` – melyik sort **keresheted** a módosításra
- \`with check (auth.uid() = user_id)\` – a **módosítás után** is a sajátod maradjon

### DELETE
Egyszerű: csak az „enyém" sorokat.

---

## Tesztelés – működnek-e a policyk?

A **SQL Editor-ben** impersonate-elhetsz egy usert:

\`\`\`sql
-- A user_id-t cseréld le egy valódi auth.users sor id-jére
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-000000000001"}', true);

select * from public.notes;
-- Csak az adott user sorait kéne látnod
\`\`\`

Vagy a **Frontendről**:
1. Jelentkezz be User A-val → hozz létre 2 jegyzetet
2. Jelentkezz ki, jelentkezz be User B-vel → próbáld listázni a jegyzeteket
3. Csak User B sajátjait kell látnia (User A-é láthatatlanok)

---

## Gyakori RLS minták

### 1. Publikus olvasás, privát írás
\`\`\`sql
-- Mindenki olvashatja
create policy "public_read"
on public.posts for select
to anon, authenticated
using (true);

-- Csak bejelentkezve írhat, saját kontóba
create policy "owner_insert"
on public.posts for insert
to authenticated
with check (auth.uid() = author_id);
\`\`\`

### 2. Admin role – speciális jogok
\`\`\`sql
-- Egy 'role' oszlop a profiles-ban
create policy "admin_all"
on public.any_table for all
to authenticated
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);
\`\`\`

### 3. Csapat-alapú hozzáférés
\`\`\`sql
-- A user látja a saját csapatának sorait
create policy "team_read"
on public.projects for select
to authenticated
using (
  team_id in (
    select team_id from public.team_members where user_id = auth.uid()
  )
);
\`\`\`

---

## Hibakeresés – „empty rows" RLS-sel

### Tünet: „minden helyes, mégsem jön adat"
**Ellenőrizd:**

1. **Be vagy jelentkezve?** Az anon user-nek gyakran nincs joga (ez szándékos).
2. **Van policy?** A policy nélküli RLS = **semmit** nem látsz. A SQL Editor \`select * from pg_policies where tablename = 'notes'\` kilistázza.
3. **A policy helyesen hasonlítja a user_id-t?** Debug-olj: \`select auth.uid();\` (dashboard-on gyorsan kiderül, mi érkezik JWT-ből).
4. **A beszúrás kitöltötte a user_id-t?** Ha üres marad, az RLS kizárja a saját sort a SELECT-ből.

### Tünet: „a user nem tud saját jegyzetet beszúrni"
Valószínűleg az INSERT policy hiányzik, vagy a \`with check\` rossz oszlopra utal.

---

## RLS vs. policy vs. privilege – mi a különbség?

- **Privilege** (GRANT): alap Postgres – ki tud egy táblát \`select\`-elni? Supabase alapból megadja az \`authenticated\`/\`anon\` role-oknak.
- **RLS engedélyezése**: \`alter table ... enable row level security;\` – „minden sor korlátozva".
- **Policy**: az konkrét szabály, mely sort láthatsz.

Mindhárom kell, hogy a frontend valamit láthasson.

---

## Service role – megkerüli az RLS-t

Ha van egy **Edge Function**-öd vagy saját backended, ami „admin nevében" dolgozik (pl. cron job, webhook), ott a **service_role key**-t használhatod. Ez **minden RLS-t megkerül**.

**Soha** ne add ezt a frontendnek – csakis Supabase secrets / Edge Function env.

---

## Gyakorlat

1. Futtasd a fenti policy SQL-t a \`notes\` táblán
2. Jelentkezz be két különböző userrel (pl. két böngészőben)
3. Mindegyikkel hozz létre 1-1 jegyzetet
4. Nézd a \`SELECT\`-et mindkét oldalon – csak a sajátodat látod?
5. Próbáld **kikapcsolni** az RLS-t (\`alter table notes disable row level security;\`) – most mit látsz? (Mindenét! Ezért kell RLS.)
`,
            en: `## Why RLS is REQUIRED

The Supabase frontend calls Postgres **directly** (through PostgREST). There is no middle server validating requests.

**Consequence:** with RLS **off** and **no policies**:
- The user's anon key can query **any** row (\`from("notes").select("*")\` → returns everyone's)
- They can also delete rows

**RLS is the guard.** Turn it on with \`alter table ... enable row level security;\`
After that, **nothing is visible** by default — **policies** grant access back.

---

## RLS philosophy

A policy answers one question:
- **SELECT:** which rows may the user see?
- **INSERT:** which rows may they insert?
- **UPDATE:** which rows may they modify — and into what?
- **DELETE:** which rows may they delete?

You typically write **one policy per operation** — fine-grained control.

---

## Full 'notes' policy bundle

**Run in the SQL Editor:**

\`\`\`sql
${rlsPolicySql}
\`\`\`

Breaking it down:

### SELECT
\`\`\`sql
using (auth.uid() = user_id)
\`\`\`
"Only see rows whose \`user_id\` matches **your user_id**." \`auth.uid()\` reads from the JWT, injected automatically by Supabase.

### INSERT
\`\`\`sql
with check (auth.uid() = user_id)
\`\`\`
"You may only insert rows where \`user_id\` is yours." This blocks posting as someone else.

### UPDATE
Needs **both**:
- \`using (auth.uid() = user_id)\` — which rows **you can target** for modification
- \`with check (auth.uid() = user_id)\` — the row must **stay yours** after the update

### DELETE
Simple: only "my" rows.

---

## Testing — do the policies actually work?

In the **SQL Editor**, you can impersonate a user:

\`\`\`sql
-- Replace with a real auth.users row id
select set_config('request.jwt.claims', '{"sub":"00000000-0000-0000-0000-000000000001"}', true);

select * from public.notes;
-- You should only see that user's rows
\`\`\`

Or from the **frontend**:
1. Sign in as User A → create 2 notes
2. Sign out, sign in as User B → try to list notes
3. User B must see only their own (User A's rows are hidden)

---

## Common RLS patterns

### 1. Public read, owner-only write
\`\`\`sql
-- Anyone can read
create policy "public_read"
on public.posts for select
to anon, authenticated
using (true);

-- Logged-in users can only write as themselves
create policy "owner_insert"
on public.posts for insert
to authenticated
with check (auth.uid() = author_id);
\`\`\`

### 2. Admin role — elevated rights
\`\`\`sql
-- A 'role' column on profiles
create policy "admin_all"
on public.any_table for all
to authenticated
using (
  exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  )
);
\`\`\`

### 3. Team-based access
\`\`\`sql
-- User sees rows of their team
create policy "team_read"
on public.projects for select
to authenticated
using (
  team_id in (
    select team_id from public.team_members where user_id = auth.uid()
  )
);
\`\`\`

---

## Debugging — "empty rows" with RLS

### Symptom: "everything looks right, but no data"
**Check:**

1. **Are you signed in?** The anon user often has no access (by design).
2. **Is there a policy?** RLS without policies = **nothing** is visible. \`select * from pg_policies where tablename = 'notes'\` in the SQL Editor lists them.
3. **Does the policy compare user_id correctly?** Debug with \`select auth.uid();\` to confirm the JWT content.
4. **Did the insert fill user_id?** If blank, the SELECT policy hides the row.

### Symptom: "user can't insert their own note"
Usually the INSERT policy is missing, or the \`with check\` targets the wrong column.

---

## RLS vs. policy vs. privilege — what's the difference?

- **Privilege** (GRANT): base Postgres — may this role \`select\` this table at all? Supabase grants this to \`authenticated\`/\`anon\` by default.
- **Enabling RLS**: \`alter table ... enable row level security;\` — "every row is now restricted".
- **Policy**: the specific rule determining which rows you may access.

All three must line up for the frontend to see anything.

---

## Service role — bypasses RLS

For **Edge Functions** or your own backend doing admin-like work (cron jobs, webhooks), use the **service_role key**. It **bypasses every RLS policy**.

**Never** put this in the frontend — only in Supabase secrets / Edge Function env.

---

## Exercise

1. Apply the policy SQL above to your \`notes\` table
2. Sign in with two different users (two browsers)
3. Create one note from each
4. Run the client \`SELECT\` on both sides — do you only see your own?
5. Try **disabling** RLS (\`alter table notes disable row level security;\`) — what do you see? (Everyone's! This is why RLS matters.)
`,
          },
        },
      ],
    },
    {
      id: "sb-migrations-section",
      title: { hu: "5. szekció – Migrációk és környezetek", en: "Section 5 – Migrations and environments" },
      lessons: [
        {
          id: "sb-migrations-why",
          format: "reading",
          title: {
            hu: "5.1 Miért kellenek migrációk? Dev ↔ Prod problémája",
            en: "5.1 Why migrations? The dev ↔ prod problem",
          },
          summary: {
            hu: "Amikor a SQL Editor-ben kattintgatás már nem elég – és elkezd ismételni a prod deploy előtt.",
            en: "When clicking around in the SQL Editor isn't enough — and you need to replay changes before a prod deploy.",
          },
          duration: "15–20 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## A probléma

Egy tipikus projekt-életciklus:

1. **Hétfő:** létrehozod a \`notes\` táblát a dev projektben (SQL Editor-ben írod)
2. **Kedd:** hozzáadsz egy \`is_archived\` oszlopot (megint SQL Editor)
3. **Szerda:** elkészül egy új tábla, \`note_tags\`
4. **Csütörtök:** **deploy a prodra!**
   De… a prod DB-ben semmi nincs ezekből. Most mit csinálsz?

**Kézzel másolgatni?** Minden csapattaggal? Minden új környezetnél? → **Nem skálázható**, **hibára hajlamos**.

---

## A megoldás: migrációk

A **migráció** egy SQL fájl, ami leír **egy** változást:

\`\`\`
supabase/migrations/
├── 20260401120000_create_notes_table.sql
├── 20260402153000_add_is_archived_to_notes.sql
└── 20260403090000_create_note_tags_table.sql
\`\`\`

Minden fájl **egyszer** fut le – a fájl neve **időbélyeg** + **leírás**.

**Előnyök:**
- **Verziózott:** commitolva a git repo-ban, PR-ben review-zható
- **Reprodukálható:** bárki futtathatja nulláról – prod, dev, új csapattag gépe
- **Nyomkövethetetlen ~~ ~~ Nyomonkövethető:** ki mit mikor változtatott – a commit history elárulja

---

## Két mód a változtatásra

| Mód | Mikor? |
|-----|--------|
| **SQL Editor / Table Editor GUI** | Gyors iteráció dev alatt, amikor még csak játszol |
| **Migráció fájl (CLI)** | Amikor szeretnél commitolni és prodra vinni |

A kettő **nem kizárja** egymást: dev-en kísérletezel GUI-val, majd amikor a séma **stabil**, **generálsz** egy migrációs fájlt (lesz rá parancs a következő leckében).

---

## Workflow – a tiszta út

\`\`\`
Dev Supabase projekt (kísérletezés)
        ↓ sikerült?
Migrációs fájl generálása (supabase db diff)
        ↓
Git commit + push + PR review
        ↓
CI lefuttatja lokálisan egy üres DB-n (supabase db reset) → siker?
        ↓
Merge main-re
        ↓
GitHub Action / kézi parancs: supabase db push → Prod Supabase
\`\`\`

**Eredmény:** a dev és a prod séma **azonos** marad, és minden változás **reproducible**.

---

## Supabase CLI – a főszereplő

A **Supabase CLI** egy parancssori eszköz, ami:
- **Lokális Supabase**-t futtat Dockerrel (teljes replika a laptopodon)
- **Migrációs fájlokat** generál és alkalmaz
- **Függvényeket** (Edge Functions) deployol
- **Types**-ot generál TypeScript-hez a sémából

**Installálás:**

\`\`\`bash
# macOS / Linux
brew install supabase/tap/supabase

# Windows
scoop install supabase

# npm (bárhol)
npm install -g supabase
\`\`\`

A következő leckében **végigmegyünk** a CLI alapparancsain egy valódi flow-ban.

---

## Migráció nélkül: a „csapat pillanatban felrobban" forgatókönyv

### Mi történik, ha nincs migráció?

- **Kolléga A** a dev-en kattint egy új oszlopot
- **Kolléga B** egy teljesen más oszlopot ad hozzá
- **Deploy napján:** a prod DB-ben semmi, de a kód mindkét oszlopot használja
- **Kézi sync:** valaki emlékszik, mit csinált – valami lemarad – bug, runtime hiba, rollback

A migrációs fájl **dokumentálja az elmúlt 3 hónap változásait**, így az új kolléga a \`supabase db reset\` paranccsal **5 másodperc alatt** előállítja a teljes sémát a laptopján.

---

## Gyakorlat (csak olvasás, nem kell telepíteni)

1. Nézd meg a Supabase projekted **Database → Migrations** menüpontját – van-e már valami?
2. Gondold végig: az eddig kattintgatással készült \`notes\` tábla **nem** migrációs fájlban van – ha most a prodra kellene vinni, mit csinálnál?
3. Olvasd el a [Supabase CLI docs](https://supabase.com/docs/reference/cli) kezdő oldalát – milyen parancsokat látsz?
`,
            en: `## The problem

A typical project lifecycle:

1. **Monday:** you create the \`notes\` table in the dev project (via SQL Editor)
2. **Tuesday:** you add an \`is_archived\` column (SQL Editor again)
3. **Wednesday:** you build a new \`note_tags\` table
4. **Thursday:** **time to deploy to prod!**
   But… prod has none of this. Now what?

**Copy by hand?** With every teammate? On every new environment? → **Doesn't scale**, **error-prone**.

---

## The fix: migrations

A **migration** is an SQL file describing **one** change:

\`\`\`
supabase/migrations/
├── 20260401120000_create_notes_table.sql
├── 20260402153000_add_is_archived_to_notes.sql
└── 20260403090000_create_note_tags_table.sql
\`\`\`

Each file runs **once** — the file name is a **timestamp** + **description**.

**Benefits:**
- **Versioned:** committed to git, reviewable in PRs
- **Reproducible:** anyone can run from scratch — prod, dev, a new teammate's laptop
- **Auditable:** who changed what, when — commit history tells the story

---

## Two ways to change things

| Mode | When? |
|------|-------|
| **SQL Editor / Table Editor GUI** | Fast iteration during dev, when you're still playing |
| **Migration file (CLI)** | When you want to commit and ship to prod |

They're **not exclusive**: prototype in dev with the GUI, then **generate** a migration file when the schema is **stable** (a command for this in the next lesson).

---

## Clean workflow

\`\`\`
Dev Supabase project (prototyping)
        ↓ good?
Generate migration file (supabase db diff)
        ↓
Git commit + push + PR review
        ↓
CI runs it against an empty DB (supabase db reset) — green?
        ↓
Merge to main
        ↓
GitHub Action / manual: supabase db push → Prod Supabase
\`\`\`

**Result:** dev and prod schemas stay **identical**, and every change is **reproducible**.

---

## Supabase CLI — the protagonist

The **Supabase CLI** is a command-line tool that:
- Runs a **local Supabase** via Docker (full replica on your laptop)
- **Generates and applies** migration files
- Deploys **Edge Functions**
- Generates **TypeScript types** from your schema

**Install:**

\`\`\`bash
# macOS / Linux
brew install supabase/tap/supabase

# Windows
scoop install supabase

# npm (anywhere)
npm install -g supabase
\`\`\`

Next lesson we **walk through** the CLI basics in a real flow.

---

## Without migrations: the "team melts down" scenario

### What happens without migrations?

- **Teammate A** clicks a new column in dev
- **Teammate B** adds a totally different column
- **Deploy day:** prod has nothing, but the code expects both columns
- **Manual sync:** someone remembers what they did — misses one — bug, runtime error, rollback

A migration file **documents three months of changes**, so a new teammate runs \`supabase db reset\` and regenerates the whole schema on their laptop in **5 seconds**.

---

## Exercise (read-only, nothing to install)

1. Open **Database → Migrations** in your Supabase project — is there anything yet?
2. Think about this: the \`notes\` table you built by clicking is **not** in a migration file — if you had to ship it to prod now, how would you do it?
3. Skim the [Supabase CLI docs](https://supabase.com/docs/reference/cli) — what commands do you see?
`,
          },
        },
        {
          id: "sb-migrations-cli",
          format: "reading",
          title: {
            hu: "5.2 A CLI flow: init, db diff, db push, db reset",
            en: "5.2 The CLI flow: init, db diff, db push, db reset",
          },
          summary: {
            hu: "Végigmegyünk egy valódi migrációs flow-n – initializálástól a prod pushig.",
            en: "A full real-world migration flow — from init to prod push.",
          },
          duration: "30–40 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## A teljes flow egy ábrán

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Dev Supabase (felhő)          Prod Supabase (felhő)      │
│         ▲                             ▲                     │
│         │                             │                     │
│         │ supabase db pull            │ supabase db push    │
│         │ (változás letöltése)        │ (változás feltölt.) │
│         │                             │                     │
│   ┌─────┴─────────────────┐           │                     │
│   │   Lokális gép         │───────────┘                     │
│   │                       │                                 │
│   │  supabase/migrations/ │   ← a repo ezt tartalmazza      │
│   │   ├── 001_create.sql │                                 │
│   │   └── 002_alter.sql  │                                 │
│   │                       │                                 │
│   │  supabase start       │   ← lokális Docker Postgres     │
│   └───────────────────────┘                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 1. Supabase CLI telepítése

\`\`\`bash
# Mac
brew install supabase/tap/supabase

# Linux
curl -L https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar xz
sudo mv supabase /usr/local/bin/

# Windows (Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
\`\`\`

Ellenőrzés:
\`\`\`bash
supabase --version
\`\`\`

---

## 2. Projekt inicializálása

A projekt gyökerében (ahol a \`package.json\` van):

\`\`\`bash
supabase init
\`\`\`

Létrejön:
\`\`\`
supabase/
├── config.toml        # lokális konfig (port, stb.)
├── migrations/        # ide jönnek a migrációs fájlok
├── seed.sql           # seed adat lokális teszthez (opcionális)
└── functions/         # Edge Functions
\`\`\`

Add hozzá a \`.gitignore\`-hez:
\`\`\`
.env
supabase/.temp/
\`\`\`

---

## 3. Link a távoli projekthez

Supabase dashboard → **Project Settings → General** → másold ki a **Project Ref**-et (pl. \`abcdefgh\`).

\`\`\`bash
supabase login
supabase link --project-ref abcdefgh
\`\`\`

**Bejelentkezés után** megkérdezi a DB jelszót (amit a projekt létrehozásakor mentettél).

---

## 4. Meglévő séma letöltése (ha már van)

Ha a Supabase dashboardon már pakoltál össze a SQL Editor-ben (pl. a \`notes\` táblát), **ez a parancs** legenerálja az első migrációs fájlt a meglévő sémából:

\`\`\`bash
supabase db pull
\`\`\`

Létrejön:
\`\`\`
supabase/migrations/20260427120000_remote_schema.sql
\`\`\`

Ez tartalmazza a \`notes\` táblát, az RLS policykat, stb. – minden, ami a prodban van.

**Commitold:**
\`\`\`bash
git add supabase/
git commit -m "Initial migration – imported from Supabase dashboard"
\`\`\`

---

## 5. Lokális DB indítása

A CLI Docker-ben futtat egy teljes Supabase stack-et (Postgres + Auth + Storage + Studio) a laptopodon:

\`\`\`bash
supabase start
\`\`\`

Az első futás 2-3 perc (imageket tölt). Utána:
- **Lokális Supabase URL:** \`http://localhost:54321\`
- **Studio (dashboard):** \`http://localhost:54323\`
- **anon key:** a kimenetben látod (lokális, biztonságos)

**Leállítás:**
\`\`\`bash
supabase stop
\`\`\`

---

## 6. Új migráció készítése – a tiszta munkamenet

Workflow, amikor **új táblát / oszlopot** akarsz hozzáadni:

### Opció A: írd kézzel
\`\`\`bash
# Új üres migrációs fájl
supabase migration new add_is_archived_to_notes
\`\`\`

Létrejön: \`supabase/migrations/20260427130000_add_is_archived_to_notes.sql\`

**Nyisd meg, és írd bele:**
\`\`\`sql
alter table public.notes add column is_archived boolean not null default false;
create index notes_is_archived_idx on public.notes(is_archived);
\`\`\`

### Opció B: GUI-val csinálod, majd generáltatsz diff-et
Ez a **kényelmesebb** út gyakran:

1. A **lokális Studio**-n kattints össze, amit akarsz (localhost:54323)
2. Generáltasd a diff-et:
   \`\`\`bash
   supabase db diff --use-migra -f add_is_archived_to_notes
   \`\`\`
3. Új fájl a \`migrations/\` alatt a különbséggel

---

## 7. Migráció tesztelése

A **\`db reset\`** parancs:
1. **Eldobja** a lokális DB-t
2. **Újra lefuttatja** az **összes** migrációs fájlt

\`\`\`bash
supabase db reset
\`\`\`

Ha **zölden** lefut, a migrációd **valid** és **idempotent** (bármikor újra lehet kezdeni).

Ha hibát dob, javítsd a fájlt, és futtasd újra. **Addig** ne commitold, amíg reset-en nem zöldül.

---

## 8. Migráció pusholása prodra

Amikor a migrációd tesztelt, stabil, és a kód is kész:

\`\`\`bash
supabase db push
\`\`\`

A CLI **összehasonlítja** a lokális és a távoli állapotot, és **csak azokat** a migrációkat futtatja le, amik még nincsenek ott.

**Látni fogod:**
\`\`\`
Applying migration 20260427130000_add_is_archived_to_notes.sql...
Finished supabase db push.
\`\`\`

---

## 9. TypeScript types generálása

A Supabase tudja a sémádat – így generál TS types-ot:

\`\`\`bash
supabase gen types typescript --project-id abcdefgh > src/types/database.ts
\`\`\`

Ezután a TS szerkesztőben **auto-complete**-ot kapsz a Supabase lekérdezéseidhez. **Minden prod deploy után** érdemes lefuttatni.

---

## 10. GitHub Actions automatizáció – a prod push

A \`main\` merge után automatikusan futtassuk a \`db push\`-t:

\`\`\`yaml
# .github/workflows/supabase-migrate.yml
name: Supabase migrate

on:
  push:
    branches: [main]
    paths: ["supabase/migrations/**"]

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
        with:
          version: latest
      - run: supabase link --project-ref \${{ secrets.SUPABASE_PROJECT_REF }}
        env:
          SUPABASE_ACCESS_TOKEN: \${{ secrets.SUPABASE_ACCESS_TOKEN }}
      - run: supabase db push --password \${{ secrets.SUPABASE_DB_PASSWORD }}
\`\`\`

**Secrets a GitHub repo-ban:**
- \`SUPABASE_ACCESS_TOKEN\` – a Supabase dashboardon **Account → Access Tokens**
- \`SUPABASE_PROJECT_REF\` – a prod projekt ref-je
- \`SUPABASE_DB_PASSWORD\` – a DB jelszó

---

## Főparancsok – csipegető

\`\`\`bash
${supabaseCliCommands}
\`\`\`

---

## Gyakori hibák

### „Migration already applied"
Valaki futtatta a migrációt, de te új fájlt kezdtél ugyanazzal az időbélyeggel. Töröld a duplikátot, vagy generálj új időbélyeget.

### „Docker not running"
A \`supabase start\` Docker-t igényel. Indítsd el a Docker Desktop-ot.

### „Password incorrect"
A \`supabase link\` a DB jelszót kéri – ami **NEM** a Supabase fiók jelszavad, hanem a projekt létrehozásakor megadott érték. Ha elfelejtetted, a dashboard **Project Settings → Database → Reset password**.

---

## Gyakorlat

1. Telepítsd a Supabase CLI-t
2. \`supabase init\` a repo-dban
3. \`supabase login\` + \`supabase link\` a dev projekttel
4. \`supabase db pull\` – generálj első migrációt a meglévő sémából
5. Próbáld meg: \`supabase start\` (5 perc Docker-re várás), \`supabase db reset\` – zöld?
6. Csinálj egy új migrációt (pl. egy új oszlop) és futtasd újra a reset-et
7. (Opcionális) Konfiguráld a GitHub Action-t a prod deploy-hoz
`,
            en: `## The complete flow in one diagram

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   Dev Supabase (cloud)          Prod Supabase (cloud)       │
│         ▲                             ▲                     │
│         │                             │                     │
│         │ supabase db pull            │ supabase db push    │
│         │ (download changes)          │ (upload changes)    │
│         │                             │                     │
│   ┌─────┴─────────────────┐           │                     │
│   │   Local machine       │───────────┘                     │
│   │                       │                                 │
│   │  supabase/migrations/ │   ← lives in the repo           │
│   │   ├── 001_create.sql │                                 │
│   │   └── 002_alter.sql  │                                 │
│   │                       │                                 │
│   │  supabase start       │   ← local Docker Postgres       │
│   └───────────────────────┘                                 │
│                                                             │
└─────────────────────────────────────────────────────────────┘
\`\`\`

---

## 1. Install the Supabase CLI

\`\`\`bash
# Mac
brew install supabase/tap/supabase

# Linux
curl -L https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar xz
sudo mv supabase /usr/local/bin/

# Windows (Scoop)
scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
scoop install supabase
\`\`\`

Verify:
\`\`\`bash
supabase --version
\`\`\`

---

## 2. Initialize the project

From your project root (where \`package.json\` lives):

\`\`\`bash
supabase init
\`\`\`

Creates:
\`\`\`
supabase/
├── config.toml        # local config (ports, etc.)
├── migrations/        # migration files land here
├── seed.sql           # seed data for local testing (optional)
└── functions/         # Edge Functions
\`\`\`

Add to \`.gitignore\`:
\`\`\`
.env
supabase/.temp/
\`\`\`

---

## 3. Link to the remote project

Supabase dashboard → **Project Settings → General** → copy the **Project Ref** (e.g. \`abcdefgh\`).

\`\`\`bash
supabase login
supabase link --project-ref abcdefgh
\`\`\`

**After login**, it asks for the DB password (the one you saved when creating the project).

---

## 4. Pull existing schema (if you already have one)

If you built things via the SQL Editor (e.g., the \`notes\` table), **this command** turns the current schema into a first migration:

\`\`\`bash
supabase db pull
\`\`\`

Creates:
\`\`\`
supabase/migrations/20260427120000_remote_schema.sql
\`\`\`

It captures the \`notes\` table, RLS policies, everything currently in prod.

**Commit:**
\`\`\`bash
git add supabase/
git commit -m "Initial migration — imported from Supabase dashboard"
\`\`\`

---

## 5. Start local DB

The CLI runs the entire Supabase stack in Docker (Postgres + Auth + Storage + Studio) on your laptop:

\`\`\`bash
supabase start
\`\`\`

First run takes 2–3 minutes (pulls images). Then:
- **Local Supabase URL:** \`http://localhost:54321\`
- **Studio (dashboard):** \`http://localhost:54323\`
- **anon key:** printed in the output (local, safe)

**Stop:**
\`\`\`bash
supabase stop
\`\`\`

---

## 6. Create a new migration — the clean flow

Workflow to add a **new table / column**:

### Option A: write it yourself
\`\`\`bash
# Empty migration file
supabase migration new add_is_archived_to_notes
\`\`\`

Creates: \`supabase/migrations/20260427130000_add_is_archived_to_notes.sql\`

**Open and write:**
\`\`\`sql
alter table public.notes add column is_archived boolean not null default false;
create index notes_is_archived_idx on public.notes(is_archived);
\`\`\`

### Option B: click it in the GUI, then diff
Often the **more pleasant** route:

1. Click through your changes in the **local Studio** (localhost:54323)
2. Generate the diff:
   \`\`\`bash
   supabase db diff --use-migra -f add_is_archived_to_notes
   \`\`\`
3. A new file appears under \`migrations/\` with the delta

---

## 7. Test the migration

The **\`db reset\`** command:
1. **Drops** the local DB
2. **Re-applies** **every** migration file

\`\`\`bash
supabase db reset
\`\`\`

If it runs **green**, your migration is **valid** and **idempotent** (safe to restart anytime).

If it errors, fix the file and run again. **Don't commit** until the reset is green.

---

## 8. Push the migration to prod

When the migration is tested, stable, and the code is ready:

\`\`\`bash
supabase db push
\`\`\`

The CLI **compares** local vs. remote state and runs **only** the migrations that aren't there yet.

**You'll see:**
\`\`\`
Applying migration 20260427130000_add_is_archived_to_notes.sql...
Finished supabase db push.
\`\`\`

---

## 9. Generate TypeScript types

Supabase knows your schema — so it can emit TS types:

\`\`\`bash
supabase gen types typescript --project-id abcdefgh > src/types/database.ts
\`\`\`

Now your TS editor gives you **auto-complete** on Supabase queries. Run it **after every prod deploy**.

---

## 10. GitHub Actions — auto-push to prod

After merging to \`main\`, push automatically:

\`\`\`yaml
# .github/workflows/supabase-migrate.yml
name: Supabase migrate

on:
  push:
    branches: [main]
    paths: ["supabase/migrations/**"]

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: supabase/setup-cli@v1
        with:
          version: latest
      - run: supabase link --project-ref \${{ secrets.SUPABASE_PROJECT_REF }}
        env:
          SUPABASE_ACCESS_TOKEN: \${{ secrets.SUPABASE_ACCESS_TOKEN }}
      - run: supabase db push --password \${{ secrets.SUPABASE_DB_PASSWORD }}
\`\`\`

**Secrets in the GitHub repo:**
- \`SUPABASE_ACCESS_TOKEN\` — from the Supabase dashboard **Account → Access Tokens**
- \`SUPABASE_PROJECT_REF\` — the prod project ref
- \`SUPABASE_DB_PASSWORD\` — your DB password

---

## Cheat sheet of key commands

\`\`\`bash
${supabaseCliCommands}
\`\`\`

---

## Common errors

### "Migration already applied"
Someone ran your migration but you started a new file with the same timestamp. Delete the duplicate or use a new timestamp.

### "Docker not running"
\`supabase start\` requires Docker. Launch Docker Desktop.

### "Password incorrect"
\`supabase link\` asks for the DB password — which is **not** your Supabase account password but the one you set when creating the project. Forgot it? Dashboard → **Project Settings → Database → Reset password**.

---

## Exercise

1. Install the Supabase CLI
2. \`supabase init\` in your repo
3. \`supabase login\` + \`supabase link\` to the dev project
4. \`supabase db pull\` — get a first migration from the existing schema
5. Try: \`supabase start\` (Docker warm-up), \`supabase db reset\` — green?
6. Create a new migration (e.g., a new column) and re-run reset
7. (Optional) Wire up the GitHub Action for the prod push
`,
          },
        },
      ],
    },
    {
      id: "sb-advanced-section",
      title: { hu: "6. szekció – További Supabase képességek", en: "Section 6 – More Supabase capabilities" },
      lessons: [
        {
          id: "sb-edge-functions-storage-realtime",
          format: "reading",
          title: {
            hu: "6.1 Edge Functions, Storage, Realtime – áttekintés",
            en: "6.1 Edge Functions, Storage, Realtime — overview",
          },
          summary: {
            hu: "Három Supabase feature, ami tipikusan a második iterációban jön – mikor melyik kell.",
            en: "Three Supabase features you reach for on the second iteration — when to pick which.",
          },
          duration: "25–30 perc olvasás",
          videoUrl: null,
          markdown: {
            hu: `## Az MVP után – mit kapunk még?

Ha az eddigi 5 szekciót végigcsináltad, kapsz egy működő **auth + CRUD** appot. Most jön a pikk-pakk:

1. **Edge Functions** – ha szerverless logika kell (emailküldés, külső API hívás)
2. **Storage** – fájl feltöltés, letöltés (avatar, attachment)
3. **Realtime** – tábla-változások push-olása kliensre (chat, notification, live dashboard)

---

## Edge Functions

A **Edge Function** egy **Deno** (TypeScript) alapú **szerverless** végpont. Futtathatsz benne bármi kódot, ami:
- Hívja a Supabase DB-t (pl. service_role-lal admin műveletek)
- Hív egy külső API-t (Stripe, Resend, OpenAI, stb.)
- Visszatér egy HTTP response-szal

### Mikor kell?
- **Webhook-ok fogadása:** Stripe, GitHub, vagy saját third-party
- **Titkok használata:** olyan API kulcsok, amiket nem akarsz frontendre
- **Admin műveletek:** pl. „töröld ezt a user-t 30 nap után" (cron)
- **Transzformációk:** pl. AI modell hívása, majd az eredmény DB-be

### Hogyan néz ki?

\`\`\`ts
${edgeFunctionSnippet}
\`\`\`

### Deploy
\`\`\`bash
supabase functions deploy hello-world
\`\`\`

A függvény elérhető: \`https://abcdefgh.supabase.co/functions/v1/hello-world\`

### Secrets
\`\`\`bash
supabase secrets set OPENAI_API_KEY=sk-...
\`\`\`

A függvényből: \`Deno.env.get("OPENAI_API_KEY")\`

### Limitek (fontos!)
- **5 MB** body méret
- **2 perc** max futási idő
- **150 MB** memória
- Nem alkalmas hosszú háttér-feladatra (inkább: saját worker)

---

## Storage

A **Supabase Storage** egy **S3-kompatibilis** object store. Bucket-eket hozol létre, majd fájlokat töltesz fel.

### Mikor használd?
- **Avatar képek:** user feltölti, jelenítsd meg
- **Dokumentumok:** PDF, docx, bármilyen
- **Generated tartalom:** pl. AI által készített kép

### Használat – frontend

\`\`\`ts
// Upload
const { data, error } = await supabase.storage
  .from("avatars")
  .upload(\`\${user.id}/profile.png\`, file, {
    cacheControl: "3600",
    upsert: true,
  });

// Public URL (ha a bucket publikus)
const { data: { publicUrl } } = supabase.storage
  .from("avatars")
  .getPublicUrl(\`\${user.id}/profile.png\`);

// Letöltés (privát bucket)
const { data, error } = await supabase.storage
  .from("documents")
  .download(\`\${user.id}/report.pdf\`);
\`\`\`

### RLS a Storage-hez
Ugyanúgy policy-zhető, mint a tábla:

\`\`\`sql
create policy "avatar_upload_own"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);
\`\`\`

Ez azt mondja: „csak az avatars bucket-be tölthetsz fel, és csak a saját UUID-s mappádba".

### Mikor használj inkább S3 / Cloudflare R2-t?
- Ha **több TB** adat – Supabase Free tier: 1 GB
- Ha **extrém sok** kis fájl (metaadat overhead lehet)
- Ha **saját CDN**-re kell kötni

---

## Realtime

A **Realtime** a Postgres **\`LISTEN/NOTIFY\`** + **WebSocket** kombinációja. A kliens **feliratkozik** egy tábla változásaira, és a Supabase push-olja őket.

### Mikor jó?
- **Chat:** új üzenet azonnal megjelenik minden résztvevőnél
- **Live dashboard:** metrikák real-time frissülnek
- **Collaborative editing:** több user egy dokumentumon
- **Notification:** „Új jegyzeted érkezett"

### Bekapcsolás
A táblán a **Database → Replication → Realtime** menüben engedélyezd.

### Használat – frontend

\`\`\`ts
useEffect(() => {
  const channel = supabase
    .channel("notes-changes")
    .on(
      "postgres_changes",
      {
        event: "*", // INSERT, UPDATE, DELETE vagy '*'
        schema: "public",
        table: "notes",
        filter: \`user_id=eq.\${user.id}\`,
      },
      (payload) => {
        console.log("Change:", payload);
        // Frissítsd az állapotot
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user.id]);
\`\`\`

### Mikor NE?
- **Ha a user ritkán van online:** hozzáférési költség lehet
- **Minden 2 másodperces poll elég:** egyszerűbb sima fetch-elni
- **Nagy volumenű broadcast** (pl. 100K egyidejű user): a Realtime limitált, inkább külön service

---

## Postgres extensions

A Supabase sok **Postgres extension**-t enged bekapcsolni a **Database → Extensions** menüben. Érdekesek:

- **\`pgvector\`** – embeddings tárolása, hasonlóság-keresés (AI/RAG)
- **\`pg_cron\`** – ütemezett SQL futtatás közvetlenül a DB-n belül
- **\`pg_graphql\`** – GraphQL API a Postgres fölé (auto-gen)
- **\`pg_net\`** – HTTP hívás triggerből
- **\`postgis\`** – geokoordináták, térinformatika

Ezek többsége **ingyenes**, és a projekted Postgres funkcionalitását **drasztikusan** kibővíti.

---

## Döntési mátrix

| Igény | Eszköz |
|-------|--------|
| Egyszerű CRUD (notes app) | **Supabase DB + RLS** – kész |
| Titkot tartalmazó API hívás (Stripe, OpenAI) | **Edge Function** |
| Fájl feltöltés | **Storage** |
| Chat, live UI | **Realtime** |
| Újrajátszható séma változás | **Migration + CLI** |
| Ütemezett DB feladat | **pg_cron extension** vagy **Edge Function + GitHub Actions** |
| Semantic search, embeddings | **pgvector extension** |

---

## Gyakorlat (válassz egyet)

1. Csinálj egy Edge Function-t, ami egy inputra (user email) küld egy üdvözlő emailt (Resend-en át)
2. Adj hozzá avatar feltöltést a Storage-dzsel a user profilhoz
3. Ha az app chat-jellegű lehet, építs be Realtime-ot a \`notes\` táblára
`,
            en: `## After the MVP — what else?

If you followed the first five sections, you have a working **auth + CRUD** app. Time for the next layer:

1. **Edge Functions** — serverless logic (send email, hit external API)
2. **Storage** — file uploads/downloads (avatars, attachments)
3. **Realtime** — push table changes to clients (chat, notifications, live dashboards)

---

## Edge Functions

An **Edge Function** is a **Deno** (TypeScript) based **serverless** endpoint. You can run any code that:
- Hits the Supabase DB (including service_role admin operations)
- Calls external APIs (Stripe, Resend, OpenAI, …)
- Returns an HTTP response

### When you need it
- **Receive webhooks:** Stripe, GitHub, your own third parties
- **Use secrets:** API keys that mustn't reach the frontend
- **Admin ops:** e.g., "delete this user after 30 days" (cron)
- **Transformations:** call an AI model and store the result in the DB

### What it looks like

\`\`\`ts
${edgeFunctionSnippet}
\`\`\`

### Deploy
\`\`\`bash
supabase functions deploy hello-world
\`\`\`

Endpoint: \`https://abcdefgh.supabase.co/functions/v1/hello-world\`

### Secrets
\`\`\`bash
supabase secrets set OPENAI_API_KEY=sk-...
\`\`\`

From the function: \`Deno.env.get("OPENAI_API_KEY")\`

### Limits (important!)
- **5 MB** body size
- **2 minute** max runtime
- **150 MB** memory
- Not suitable for long background tasks (use a worker instead)

---

## Storage

**Supabase Storage** is an **S3-compatible** object store. Create buckets, upload files.

### When to use it
- **Avatar images:** user uploads, you display
- **Documents:** PDF, docx, anything
- **Generated content:** e.g., AI-generated images

### Usage — frontend

\`\`\`ts
// Upload
const { data, error } = await supabase.storage
  .from("avatars")
  .upload(\`\${user.id}/profile.png\`, file, {
    cacheControl: "3600",
    upsert: true,
  });

// Public URL (if the bucket is public)
const { data: { publicUrl } } = supabase.storage
  .from("avatars")
  .getPublicUrl(\`\${user.id}/profile.png\`);

// Download (private bucket)
const { data, error } = await supabase.storage
  .from("documents")
  .download(\`\${user.id}/report.pdf\`);
\`\`\`

### RLS for Storage
Policies exactly like tables:

\`\`\`sql
create policy "avatar_upload_own"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);
\`\`\`

This says: "you can only upload into the \`avatars\` bucket, and only into your own UUID-named folder".

### When to reach for S3 / Cloudflare R2 instead
- **Multiple TB** of data — Supabase Free tier caps at 1 GB
- **Huge numbers** of tiny files (metadata overhead)
- Need to wire up your **own CDN**

---

## Realtime

**Realtime** is Postgres **\`LISTEN/NOTIFY\`** + **WebSockets**. The client **subscribes** to table changes and Supabase pushes them.

### When it's great
- **Chat:** every new message appears for all participants
- **Live dashboard:** metrics update in real time
- **Collaborative editing:** several users on one document
- **Notifications:** "You have a new note"

### Enable it
Go to **Database → Replication → Realtime** and enable the table.

### Usage — frontend

\`\`\`ts
useEffect(() => {
  const channel = supabase
    .channel("notes-changes")
    .on(
      "postgres_changes",
      {
        event: "*", // INSERT, UPDATE, DELETE or '*'
        schema: "public",
        table: "notes",
        filter: \`user_id=eq.\${user.id}\`,
      },
      (payload) => {
        console.log("Change:", payload);
        // Update state
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, [user.id]);
\`\`\`

### When NOT to
- **Users rarely online:** connection overhead isn't worth it
- **Polling every 2 seconds is plenty:** simpler to just fetch
- **Huge-volume broadcast** (100K concurrent users): Realtime has limits, use a dedicated service

---

## Postgres extensions

Supabase lets you enable many **Postgres extensions** under **Database → Extensions**. Notable ones:

- **\`pgvector\`** — store embeddings, similarity search (AI/RAG)
- **\`pg_cron\`** — scheduled SQL directly inside the DB
- **\`pg_graphql\`** — auto-generated GraphQL on top of Postgres
- **\`pg_net\`** — HTTP calls from triggers
- **\`postgis\`** — geocoordinates, geospatial

Most are **free** and **dramatically** expand what your Postgres can do.

---

## Decision matrix

| Need | Tool |
|------|------|
| Simple CRUD (notes app) | **Supabase DB + RLS** — done |
| API call with a secret (Stripe, OpenAI) | **Edge Function** |
| File upload | **Storage** |
| Chat, live UI | **Realtime** |
| Reproducible schema change | **Migration + CLI** |
| Scheduled DB task | **pg_cron extension** or **Edge Function + GitHub Actions** |
| Semantic search, embeddings | **pgvector extension** |

---

## Exercise (pick one)

1. Build an Edge Function that, given a user email, sends a welcome email via Resend
2. Add avatar uploads to the user profile using Storage
3. If your app is chat-like, wire up Realtime on the \`notes\` table
`,
          },
        },
      ],
    },
    {
      id: "sb-quiz-section",
      title: { hu: "Kvíz és gyakorlat", en: "Quiz & practice" },
      lessons: [
        {
          id: "sb-quiz",
          format: "quiz",
          title: {
            hu: "2. kurzus – Kvíz és záró projekt",
            en: "Course 2 — Quiz & capstone",
          },
          summary: {
            hu: "Ellenőrizd a tudásod Supabase, auth, RLS és migrációk témákban – majd csináld meg a záró projektet.",
            en: "Test your knowledge of Supabase, auth, RLS, and migrations — then build the capstone project.",
          },
          duration: "15–20 perc kvíz + feladat",
          videoUrl: null,
          markdown: { hu: "", en: "" },
          quizData: [
            {
              id: "sb-q1",
              question: {
                hu: "Miért van szükség Row Level Security (RLS) policyra a Supabase-ben?",
                en: "Why do you need Row Level Security (RLS) policies in Supabase?",
              },
              options: [
                {
                  hu: "Mert a frontend közvetlenül hívja a Postgres-t, így a DB oldalon kell eldönteni, ki mit lát",
                  en: "Because the frontend calls Postgres directly, so the DB side must decide who sees what",
                },
                {
                  hu: "Mert a Supabase backend-je automatikusan levédi az adatokat, és az RLS csak extra védelem",
                  en: "Because Supabase's backend already secures everything and RLS is just extra",
                },
                {
                  hu: "Mert a Supabase csak RLS-sel engedi meg a performance optimalizálást",
                  en: "Because RLS is the only way to enable performance tuning in Supabase",
                },
                {
                  hu: "Mert a service_role key csak RLS-sel tud bejutni a DB-be",
                  en: "Because the service_role key can only access the DB with RLS enabled",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "A frontend Supabase kliens közvetlenül a Postgres-hez beszél (PostgREST-en át), ezért csak a DB oldalán tudunk jogosultság-ellenőrzést végezni – ez az RLS. Policyk nélkül az anon key-vel bárki bármit megnézhetne.",
                en: "The frontend Supabase client speaks directly to Postgres (via PostgREST), so permission checks must happen at the DB layer — that's RLS. Without policies, any anon key could read everything.",
              },
            },
            {
              id: "sb-q2",
              question: {
                hu: "Melyik kulcsot NE tedd frontend kódba soha?",
                en: "Which key must NEVER appear in frontend code?",
              },
              options: [
                {
                  hu: "service_role key – megkerül minden RLS-t, csak szerver oldalon használható",
                  en: "service_role key — it bypasses every RLS policy, server-side only",
                },
                {
                  hu: "anon / public key – ez titkos, sose mutasd",
                  en: "anon / public key — this is secret, never expose it",
                },
                {
                  hu: "Project URL – túl sok információt árul el",
                  en: "Project URL — it reveals too much information",
                },
                {
                  hu: "JWT access_token – soha ne kerüljön a böngészőbe",
                  en: "JWT access_token — must never appear in the browser",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "A service_role key minden RLS-t megkerül – ha frontendre kerül, bárki bármit tehet a DB-del. Csak Edge Function secret-ben vagy saját szerver env-ben tárold. Az anon key biztonságosan frontendre tehető, mert az RLS védi a sorokat.",
                en: "The service_role key bypasses every RLS policy — if it reaches the frontend, anyone can do anything with your DB. Store it only in Edge Function secrets or server env. The anon key is safe in the frontend because RLS guards the rows.",
              },
            },
            {
              id: "sb-q3",
              question: {
                hu: "Mi a legnagyobb előnye a migrációs fájloknak a dashboard-on kattingatás helyett?",
                en: "What is the biggest advantage of migration files over clicking in the dashboard?",
              },
              options: [
                {
                  hu: "Git-ben verziózhatók, PR-ben review-zhatók, és dev → prod környezetben pontosan újrajátszhatók",
                  en: "They are versioned in git, reviewable in PRs, and reproducible across dev → prod environments",
                },
                {
                  hu: "Gyorsabbak, mert a Supabase optimalizálva van a SQL fájlok futtatására",
                  en: "They run faster because Supabase is optimized for SQL files",
                },
                {
                  hu: "Nem kell írni SQL-t, mert a CLI minden lépést automatikusan generál",
                  en: "You never write SQL because the CLI generates every step",
                },
                {
                  hu: "Nincs szükség Docker-re a migrációs fájlok miatt",
                  en: "They eliminate the need for Docker",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "A migrációs fájlok verziókövetettek (git), review-zhatók (PR), és reprodukálhatók bármely környezetben (dev, prod, új csapattag laptopja). Dashboard-kattingatás nem ad semmit ezekből – nem dokumentált, nem visszajátszható.",
                en: "Migration files are versioned (git), reviewable (PR), and reproducible across every environment (dev, prod, a new teammate's laptop). Dashboard-clicking gives none of this — it's undocumented and not replayable.",
              },
            },
            {
              id: "sb-q4",
              question: {
                hu: "Mikor érdemes Edge Function-t használni egy sima Supabase lekérdezés helyett?",
                en: "When is an Edge Function the right choice over a plain Supabase query?",
              },
              options: [
                {
                  hu: "Amikor titkot (API key) tartalmazó hívás kell (pl. Stripe, OpenAI), vagy webhook-ot kell fogadni",
                  en: "When you need to call something with a secret (Stripe, OpenAI) or receive a webhook",
                },
                {
                  hu: "Minden egyes SELECT lekérdezéshez, mert gyorsabb, mint a közvetlen DB hívás",
                  en: "For every SELECT, because it's faster than a direct DB call",
                },
                {
                  hu: "Csak akkor, ha a user ingyen csomagon van",
                  en: "Only for users on the free plan",
                },
                {
                  hu: "Amikor hosszú, órákig tartó batch folyamatokat kell futtatni",
                  en: "For long-running batch jobs that take hours",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "Edge Function kell, ha titok van a hívásban (pl. Stripe secret key), webhook-ot fogadsz, vagy admin műveletet végzel (service_role-lal). Egyszerű SELECT-re a közvetlen Supabase kliens jobb – kevesebb latency, kevesebb kód. Hosszú futású folyamathoz Edge Function nem jó (5 MB / 2 perc limit).",
                en: "Edge Functions are right when the call involves a secret (e.g., Stripe secret key), a webhook arrives, or you need admin operations (service_role). For plain SELECTs the direct Supabase client is better — less latency, less code. Edge Functions aren't for long jobs (5 MB / 2-minute limits).",
              },
            },
            {
              id: "sb-q5",
              question: {
                hu: "Mit csinál a `supabase db push` parancs?",
                en: "What does `supabase db push` do?",
              },
              options: [
                {
                  hu: "A lokálisan új migrációs fájlokat feltölti a távoli (linkelt) Supabase projektre",
                  en: "Uploads local migration files that aren't yet on the linked remote Supabase project",
                },
                {
                  hu: "Letölti a Supabase dashboardról az összes változást egy migrációs fájlba",
                  en: "Downloads every change from the Supabase dashboard into a migration file",
                },
                {
                  hu: "Kidobja a lokális DB-t és újraépíti minden migrációból",
                  en: "Drops the local DB and rebuilds it from every migration",
                },
                {
                  hu: "Deploy-olja az Edge Functions-öket",
                  en: "Deploys Edge Functions",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "A `db push` a lokális migrációs fájlok közül azokat tölti fel a távoli projektre, amik még nincsenek ott. A `db pull` a fordított irány – letöltés. A `db reset` a lokális DB eldobása + migrációk újrajátszása. A `functions deploy` deployolja az Edge Function-öket.",
                en: "`db push` uploads the local migration files that aren't yet applied on the remote project. `db pull` is the reverse. `db reset` drops the local DB and replays every migration. `functions deploy` ships Edge Functions.",
              },
            },
            {
              id: "sb-q6",
              question: {
                hu: "Mire figyelj OAuth (pl. Google) bejelentkezés beállításánál?",
                en: "What must you set up correctly for OAuth (e.g., Google) sign-in?",
              },
              options: [
                {
                  hu: "A Google Console-ban a redirect URI pontosan a Supabase `/auth/v1/callback` legyen, és a Supabase Redirect URLs listában szerepeljen az app frontend URL-je",
                  en: "The redirect URI in Google Console must be exactly the Supabase `/auth/v1/callback`, and your app's frontend URL must appear in Supabase Redirect URLs",
                },
                {
                  hu: "A Google Console-ban az alkalmazás nevét pontosan ugyanarra kell állítani, mint a Supabase projekt neve",
                  en: "The Google Console app name must match the Supabase project name exactly",
                },
                {
                  hu: "Csak a Supabase service_role key-t kell beírni a Google Console-ba",
                  en: "You just enter the Supabase service_role key into Google Console",
                },
                {
                  hu: "OAuth bejelentkezés csak Pro csomagon működik",
                  en: "OAuth sign-in only works on the Pro plan",
                },
              ],
              correctIndex: 0,
              explanation: {
                hu: "Két dolog kell: (1) Google Console-ban az Authorized redirect URI pontosan a Supabase callback-je (pl. `https://abcd.supabase.co/auth/v1/callback`), és (2) a Supabase Authentication → URL Configuration-ben a frontend URL-ed (vercel, saját domain, localhost) fel legyen véve a Redirect URLs listába.",
                en: "Two things: (1) in Google Console, the Authorized redirect URI must be exactly the Supabase callback (e.g., `https://abcd.supabase.co/auth/v1/callback`), and (2) in Supabase Authentication → URL Configuration, your frontend URLs (Vercel, custom domain, localhost) must appear in the Redirect URLs list.",
              },
            },
          ],
          practicalTask: {
            hu: `## Záró projekt (~45-60 perc)

**Cél:** Építsd meg a 'notes app'-od teljes verzióját, deploy-old Vercel-re, és a migrációkat commitold git-be.

### Lépések

1. **Supabase projekt (dev):** létrehozva + Lovable-lel összekötve
2. **Táblák:** \`notes\` tábla a kurzusban megadott sémával, **RLS policyk** beállítva
3. **Auth:** email+jelszó **+ Google OAuth**
4. **UI:**
   - \`/login\` és \`/register\` oldal
   - \`/dashboard\` – list + add form + edit/delete gombok
   - Protected route: nem belépve → /login-re redirect
5. **Deploy:** Vercel-re (lásd az 1. kurzus 4.4 leckét)
6. **Migrációs fájlok:**
   - Telepítsd a Supabase CLI-t
   - \`supabase init\` + \`supabase link\` + \`supabase db pull\`
   - Az így kapott migrációs fájlt commitold a repo-ba
7. **Teszt:** hozz létre 2 user-t, mindegyikkel 2-2 jegyzetet – egymás adatát **ne** láthassák

### Mit kellene átadnod

- **Élő URL** (\`*.vercel.app\`)
- **GitHub repo URL**
- **Screenshot**-ok: a login, dashboard, egy Supabase Authentication → Users lista

> **Tipp:** ha elakadtál, kérj Lovable promptot: *„Csinálj egy /login és /register oldalt email+jelszóval, egy /dashboard-ot protected route-tal, és a dashboardon egy notes lista + új jegyzet formot a Supabase 'notes' tábla alapján."*`,
            en: `## Capstone project (~45–60 minutes)

**Goal:** Build the full notes app, deploy to Vercel, and commit the migrations to git.

### Steps

1. **Supabase project (dev):** created + connected to Lovable
2. **Tables:** \`notes\` with the schema from the course, **RLS policies** in place
3. **Auth:** email+password **+ Google OAuth**
4. **UI:**
   - \`/login\` and \`/register\` pages
   - \`/dashboard\` — list + new-note form + edit/delete
   - Protected route: redirect to /login when not signed in
5. **Deploy:** to Vercel (see Course 1, lesson 4.4)
6. **Migration files:**
   - Install the Supabase CLI
   - \`supabase init\` + \`supabase link\` + \`supabase db pull\`
   - Commit the generated migration file to the repo
7. **Test:** create 2 users, 2 notes each — they must **not** see each other's data

### Deliverables

- **Live URL** (\`*.vercel.app\`)
- **GitHub repo URL**
- Screenshots: login, dashboard, Supabase Authentication → Users

> **Tip:** stuck? Prompt Lovable: *"Build /login and /register with email+password, /dashboard with protected route, and on the dashboard a notes list + new-note form based on the Supabase 'notes' table."*`,
          },
        },
      ],
    },
  ],
};
