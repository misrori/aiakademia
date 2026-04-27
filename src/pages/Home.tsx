import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import {
  ArrowRight,
  Globe,
  Github,
  Database,
  Lock,
  Sparkles,
  Zap,
  Code2,
  Rocket,
  Layers,
  Check,
} from "lucide-react";
import { allCourses } from "@/data/courseContent";

interface CourseCardMeta {
  accent: "primary" | "accent";
  icon: React.ReactNode;
  badge: { hu: string; en: string };
  tagline: { hu: string; en: string };
  highlights: { hu: string[]; en: string[] };
  outcome: { hu: string; en: string };
}

const courseMeta: CourseCardMeta[] = [
  {
    accent: "primary",
    icon: <Globe className="w-6 h-6" />,
    badge: { hu: "Kezdő-közép", en: "Beginner → Mid" },
    tagline: {
      hu: "Ötletből saját domaines statikus weboldal",
      en: "From idea to a static website on your own domain",
    },
    highlights: {
      hu: [
        "Domain választása, vásárlása, DNS alapok",
        "Weboldal építése Lovable-lel (AI promptok)",
        "GitHub, Actions és Pages – ingyen hosting",
        "Saját domain + HTTPS beállítása",
        "Vercel deploy alternatíva",
      ],
      en: [
        "Pick, buy and configure a domain (DNS basics)",
        "Build the site with Lovable (AI prompting)",
        "GitHub, Actions, and Pages — free hosting",
        "Connect your custom domain + HTTPS",
        "Vercel deploy alternative",
      ],
    },
    outcome: {
      hu: "Egy élő weboldal a saját domaineden – a kurzus végére.",
      en: "A live website on your own domain — by the end of the course.",
    },
  },
  {
    accent: "accent",
    icon: <Database className="w-6 h-6" />,
    badge: { hu: "Közép", en: "Intermediate" },
    tagline: {
      hu: "Dinamikus webalkalmazás Supabase-szel és auth-tal",
      en: "A dynamic web app with Supabase + auth",
    },
    highlights: {
      hu: [
        "Supabase alapok – Postgres, Auth, Storage",
        "Lovable integrációk: Supabase, Stripe, Resend",
        "Email+jelszó és Google / GitHub OAuth",
        "Row Level Security – biztonság a kliens oldalról",
        "Migrációk CLI-vel: dev → prod workflow",
        "Edge Functions, Realtime, Storage",
      ],
      en: [
        "Supabase fundamentals — Postgres, Auth, Storage",
        "Lovable integrations: Supabase, Stripe, Resend",
        "Email+password and Google / GitHub OAuth",
        "Row Level Security — client-side safety",
        "Migrations with the CLI: dev → prod workflow",
        "Edge Functions, Realtime, Storage",
      ],
    },
    outcome: {
      hu: "Egy bejelentkezéses SaaS-váz – migrációkkal, prod-ready-en.",
      en: "A login-gated SaaS skeleton — migrated and production-ready.",
    },
  },
];

const pillars = [
  {
    icon: <Rocket className="w-5 h-5" />,
    title: { hu: "Gyakorlati", en: "Practical" },
    desc: {
      hu: "Minden lecke után van kézzel fogható eredmény.",
      en: "Every lesson leaves you with something tangible.",
    },
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: { hu: "AI-natív", en: "AI-native" },
    desc: {
      hu: "Lovable + ChatGPT + AI asszisztensek a központban.",
      en: "Lovable + ChatGPT + AI assistants front and center.",
    },
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: { hu: "Modern stack", en: "Modern stack" },
    desc: {
      hu: "React, Vite, TypeScript, Supabase, Vercel.",
      en: "React, Vite, TypeScript, Supabase, Vercel.",
    },
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: { hu: "Ingyen indulhatsz", en: "Free to start" },
    desc: {
      hu: "Free tier szolgáltatások, zsebe-barát indulás.",
      en: "Free-tier tooling — kind to your wallet.",
    },
  },
];

const Home: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <Header />

      {/* Hero */}
      <section className="relative pt-36 pb-24 px-4 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 bg-hero-glow opacity-70" />
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[520px] h-[420px] bg-[var(--gradient-glow)] animate-pulse-glow pointer-events-none" />
        <div
          className="absolute top-1/2 right-1/4 translate-x-1/2 w-[420px] h-[380px] bg-[var(--gradient-glow-accent)] animate-pulse-glow pointer-events-none"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/70 border border-border backdrop-blur-sm mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="text-xs font-semibold tracking-wider uppercase text-foreground/80">
              AI Akadémia · {language === "hu" ? "2 kurzus elérhető" : "2 courses available"}
            </span>
          </div>

          <h1
            className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold mb-6 leading-[1.05] animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="text-gradient-warm glow-text">
              {language === "hu"
                ? "Valódi termékek,"
                : "Real products,"}
            </span>
            <br />
            <span className="text-foreground">
              {language === "hu"
                ? "nem csak tutorialok."
                : "not just tutorials."}
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            {language === "hu"
              ? "Két AI-natív kurzus: ötletből saját domaines weboldalig, majd bejelentkezéses webalkalmazásig Supabase-szel. Minden lecke után élő kimenet."
              : "Two AI-native courses: from idea to a site on your own domain, then a login-gated web app with Supabase. Every lesson ships something real."}
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Link
              to="/learn"
              className="inline-flex items-center gap-2 px-7 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.03] shadow-xl shadow-primary/30"
            >
              {language === "hu" ? "Kezdd az 1. kurzussal" : "Start with Course 1"}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to={`/learn/${allCourses[1].sections[0].lessons[0].id}`}
              className="inline-flex items-center gap-2 px-7 py-4 bg-card border border-accent/30 text-accent-foreground rounded-xl font-semibold hover:border-accent/60 transition-all"
            >
              <Database className="w-5 h-5 text-accent" />
              {language === "hu" ? "Ugorj a 2. kurzusra" : "Jump to Course 2"}
            </Link>
          </div>

          {/* Quick pillars */}
          <div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.45s" }}
          >
            {pillars.map((p) => (
              <div
                key={p.title.en}
                className="flex flex-col items-center gap-2 rounded-xl bg-card/60 border border-border backdrop-blur-sm px-3 py-4 text-center"
              >
                <span className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  {p.icon}
                </span>
                <p className="text-sm font-semibold text-foreground">{p.title[language]}</p>
                <p className="text-xs text-muted-foreground leading-snug">{p.desc[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0 bg-grid-pattern-dense opacity-40 pointer-events-none" />
        <div className="relative max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              {language === "hu" ? "Kurzusok" : "Courses"}
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              {language === "hu" ? "Válassz, hol szeretnél kezdeni" : "Pick where you want to start"}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {language === "hu"
                ? "Az 1. kurzus nulláról tanít – statikus oldallal. A 2. kurzus továbbmegy auth-ra, adatbázisra és migrációkra."
                : "Course 1 starts from zero — a static site. Course 2 goes further into auth, databases, and migrations."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {allCourses.map((course, idx) => {
              const meta = courseMeta[idx];
              const isAccent = meta.accent === "accent";
              const firstLessonId = course.sections[0]?.lessons[0]?.id ?? "";
              const totalLessons = course.sections.reduce(
                (acc, s) => acc + s.lessons.length,
                0,
              );
              return (
                <div
                  key={course.id}
                  className={`group relative rounded-3xl bg-card border p-8 overflow-hidden transition-all hover:-translate-y-1.5 ${
                    isAccent
                      ? "border-accent/25 hover:border-accent/50 hover:card-glow-accent"
                      : "border-primary/25 hover:border-primary/50 hover:card-glow"
                  }`}
                >
                  <div
                    className={`absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity ${
                      isAccent ? "bg-accent/30" : "bg-primary/30"
                    }`}
                  />
                  <div className="relative">
                    <div className="flex items-center justify-between mb-6">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          isAccent
                            ? "bg-accent/15 text-accent"
                            : "bg-primary/15 text-primary"
                        }`}
                      >
                        {meta.icon}
                      </div>
                      <span
                        className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full ${
                          isAccent
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {meta.badge[language]}
                      </span>
                    </div>

                    <p
                      className={`text-xs uppercase tracking-wider font-semibold mb-2 ${
                        isAccent ? "text-accent" : "text-primary"
                      }`}
                    >
                      {language === "hu" ? `${idx + 1}. kurzus` : `Course ${idx + 1}`}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-2 leading-tight">
                      {course.title[language]}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {meta.tagline[language]}
                    </p>

                    <ul className="space-y-2.5 mb-8">
                      {meta.highlights[language].map((h) => (
                        <li key={h} className="flex items-start gap-3 text-sm text-foreground/85">
                          <Check
                            className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                              isAccent ? "text-accent" : "text-primary"
                            }`}
                          />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`text-sm rounded-lg p-3 mb-6 border ${
                        isAccent
                          ? "border-accent/20 bg-accent/5 text-foreground/90"
                          : "border-primary/20 bg-primary/5 text-foreground/90"
                      }`}
                    >
                      <span
                        className={`font-semibold ${
                          isAccent ? "text-accent" : "text-primary"
                        }`}
                      >
                        {language === "hu" ? "Eredmény: " : "Outcome: "}
                      </span>
                      {meta.outcome[language]}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        {totalLessons} {language === "hu" ? "lecke" : "lessons"}
                      </div>
                      <Link
                        to={`/learn/${firstLessonId}`}
                        className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all hover:scale-[1.03] ${
                          isAccent
                            ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/25"
                            : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                        }`}
                      >
                        {language === "hu" ? "Kezdés" : "Start"}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stack strip */}
      <section className="py-14 px-4 border-y border-border bg-card/40">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
            {language === "hu" ? "Eszközök, amikkel dolgozunk" : "Tools we work with"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-sm font-semibold text-muted-foreground">
            {[
              "Lovable",
              "Supabase",
              "React",
              "Vite",
              "TypeScript",
              "GitHub",
              "Vercel",
              "Stripe",
              "Resend",
            ].map((name) => (
              <span
                key={name}
                className="hover:text-foreground transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="relative max-w-4xl mx-auto text-center">
          <Sparkles className="w-8 h-8 text-primary mx-auto mb-6" />
          <blockquote className="font-display text-3xl md:text-4xl font-semibold text-foreground leading-tight">
            {language === "hu"
              ? '"A kurzus célja nem csak a tanulás, hanem egy éles termék átadása."'
              : '"The goal is not only learning — it is shipping a live product."'}
          </blockquote>
          <p className="mt-6 text-muted-foreground">— AI Akadémia</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-lg bg-primary-gradient flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </span>
            <span className="font-display font-semibold text-foreground">AI Akadémia</span>
          </Link>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-1.5"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <span>·</span>
            <span>© 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
