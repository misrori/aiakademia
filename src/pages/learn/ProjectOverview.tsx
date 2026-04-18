import React from 'react';
import { Lightbulb, Globe, Layout, Github, Zap, Link2, Rocket } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LessonNavigation from '@/components/LessonNavigation';

const colorConfigs = [
  {
    circleBg: 'bg-yellow-500',
    cardBg: 'bg-yellow-500/10',
    border: 'border-yellow-500/30',
    label: 'text-yellow-500',
    badgeBg: 'bg-yellow-500/20',
    badgeText: 'text-yellow-300',
    dot: 'bg-yellow-500',
  },
  {
    circleBg: 'bg-blue-500',
    cardBg: 'bg-blue-500/10',
    border: 'border-blue-500/30',
    label: 'text-blue-400',
    badgeBg: 'bg-blue-500/20',
    badgeText: 'text-blue-300',
    dot: 'bg-blue-500',
  },
  {
    circleBg: 'bg-purple-500',
    cardBg: 'bg-purple-500/10',
    border: 'border-purple-500/30',
    label: 'text-purple-400',
    badgeBg: 'bg-purple-500/20',
    badgeText: 'text-purple-300',
    dot: 'bg-purple-500',
  },
  {
    circleBg: 'bg-slate-500',
    cardBg: 'bg-slate-500/10',
    border: 'border-slate-500/30',
    label: 'text-slate-400',
    badgeBg: 'bg-slate-500/20',
    badgeText: 'text-slate-300',
    dot: 'bg-slate-400',
  },
  {
    circleBg: 'bg-orange-500',
    cardBg: 'bg-orange-500/10',
    border: 'border-orange-500/30',
    label: 'text-orange-400',
    badgeBg: 'bg-orange-500/20',
    badgeText: 'text-orange-300',
    dot: 'bg-orange-500',
  },
  {
    circleBg: 'bg-emerald-500',
    cardBg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    label: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/20',
    badgeText: 'text-emerald-300',
    dot: 'bg-emerald-500',
  },
];

const icons = [Lightbulb, Globe, Layout, Github, Zap, Link2];

const content = {
  hu: {
    title: 'A kurzus projekt áttekintése',
    subtitle: 'Ötletből saját domaines statikus weboldal – az út lépésről lépésre',
    intro:
      'Ez a kurzus végigvezet egy teljes weboldalépítési folyamaton: a kezdeti ötlettől egészen az éles, saját domain névvel rendelkező oldalig. Az alábbi animált folyamatábra megmutatja az összes lépést és az egyes fázisokban használt technológiákat.',
    steps: [
      {
        num: 1,
        label: '1. lépés',
        title: 'Legyen egy ötleted',
        description:
          'Minden projekt egy vízióval kezdődik. Gondold át, mit szeretnél megvalósítani – egy portfóliót, landing page-t, vagy valami egészen egyedit. Az ötlet az egyetlen dolog, amire szükséged van az induláshoz.',
        tech: [],
      },
      {
        num: 2,
        label: '2. lépés',
        title: 'Vásárolj domain nevet',
        description:
          'Foglald le a weboldalad egyedi internetes címét. Ez lesz az a cím, amit a látogatók beírnak a böngészőbe. Érdemes korán lépni – a legjobb nevek hamar elfogynak.',
        tech: ['Cloudflare', 'GoDaddy', 'Namecheap'],
      },
      {
        num: 3,
        label: '3. lépés',
        title: 'Építsd fel a frontendet Lovable-ben',
        description:
          'Hozd létre a felhasználói felületet vizuálisan, AI segítségével. A Lovable egy AI-alapú webfejlesztő eszköz: természetes nyelvű utasításokkal írja meg helyetted a kódot, nem kell hozzá programozói tudás.',
        tech: ['Lovable (AI builder)'],
      },
      {
        num: 4,
        label: '4. lépés',
        title: 'Exportáld GitHub-ra',
        description:
          'Töltsd fel a projektedet GitHubra – a világ legnagyobb kódtár-platformjára. Ez lesz a projekt „lakhelye": verziókövetés, biztonsági mentés és a következő lépések alapja.',
        tech: ['GitHub', 'Git', 'Repository'],
      },
      {
        num: 5,
        label: '5. lépés',
        title: 'GitHub Action fájl hozzáadása Antigravity-vel',
        description:
          'Az Antigravity AI eszköz segítségével add hozzá a GitHub Actions workflow fájlt. Ez az automatizáló rendszer minden egyes kódmódosítás után felépíti és publikálja az oldalt GitHub Pages-re – emberi beavatkozás nélkül.',
        tech: ['Antigravity AI', 'GitHub Actions', 'GitHub Pages', 'CI/CD'],
      },
      {
        num: 6,
        label: '6. lépés',
        title: 'Kösd össze a domaint',
        description:
          'Állítsd be a DNS rekordokat, hogy a megvásárolt domain neve a GitHub Pages oldaladra mutasson. Néhány percnyi beállítás után az oldalad él, és a te domaineden érhető el – titkosítva, HTTPS-en.',
        tech: ['DNS', 'CNAME', 'A Record', 'HTTPS / SSL'],
      },
    ],
    techSummaryTitle: 'Technológiák ebben a kurzusban',
    techSummaryItems: [
      { name: 'Lovable', desc: 'AI-alapú webfejlesztő eszköz – természetes nyelvű promptokkal' },
      { name: 'GitHub', desc: 'Kódtároló és verziókezelő platform' },
      { name: 'GitHub Actions', desc: 'Automatizált build és deploy pipeline' },
      { name: 'GitHub Pages', desc: 'Ingyenes statikus webhosting' },
      { name: 'Antigravity AI', desc: 'AI eszköz GitHub Action fájlok generálásához' },
      { name: 'DNS / CNAME', desc: 'Domain összekapcsolás és irányítás' },
    ],
  },
  en: {
    title: 'Course Project Overview',
    subtitle: 'From Idea to a Static Website on Your Own Domain – Step by Step',
    intro:
      "This course walks you through a complete website-building journey: from the initial idea all the way to a live site with your own domain name. The animated roadmap below shows every step and the technologies used in each phase.",
    steps: [
      {
        num: 1,
        label: 'Step 1',
        title: 'Have an idea',
        description:
          "Every project starts with a vision. Think about what you want to build – a portfolio, a landing page, or something entirely unique. An idea is the only thing you need to get started.",
        tech: [],
      },
      {
        num: 2,
        label: 'Step 2',
        title: 'Purchase a domain',
        description:
          "Claim your unique address on the internet. This is the address visitors will type into their browser. Act early – the best names go fast.",
        tech: ['Cloudflare', 'GoDaddy', 'Namecheap'],
      },
      {
        num: 3,
        label: 'Step 3',
        title: 'Build a front-end in Lovable',
        description:
          "Create your user interface with AI assistance. Lovable is an AI-powered web builder: describe what you want in plain language and it writes the code for you — no programming skills required.",
        tech: ['Lovable (AI builder)'],
      },
      {
        num: 4,
        label: 'Step 4',
        title: 'Export to GitHub',
        description:
          "Upload your project to GitHub – the world's largest code repository platform. This becomes your project's home: version control, backup, and the foundation for the next steps.",
        tech: ['GitHub', 'Git', 'Repository'],
      },
      {
        num: 5,
        label: 'Step 5',
        title: 'Add GitHub Action file with Antigravity',
        description:
          "Use the Antigravity AI tool to add a GitHub Actions workflow file. This automation system builds and publishes your site to GitHub Pages after every code push – hands free.",
        tech: ['Antigravity AI', 'GitHub Actions', 'GitHub Pages', 'CI/CD'],
      },
      {
        num: 6,
        label: 'Step 6',
        title: 'Connect the domain',
        description:
          "Configure DNS records so your purchased domain points to your GitHub Pages site. A few minutes of setup later, your site is live on your own domain – secured with HTTPS.",
        tech: ['DNS', 'CNAME', 'A Record', 'HTTPS / SSL'],
      },
    ],
    techSummaryTitle: 'Technologies in this course',
    techSummaryItems: [
      { name: 'Lovable', desc: 'AI-powered web builder – write code via natural language prompts' },
      { name: 'GitHub', desc: 'Code hosting and version control platform' },
      { name: 'GitHub Actions', desc: 'Automated build and deploy pipeline' },
      { name: 'GitHub Pages', desc: 'Free static web hosting' },
      { name: 'Antigravity AI', desc: 'AI tool for generating GitHub Action files' },
      { name: 'DNS / CNAME', desc: 'Domain connection and routing' },
    ],
  },
};

const ProjectOverview: React.FC = () => {
  const { language } = useLanguage();
  const c = content[language];

  return (
    <article className="animate-fade-in pb-20">
      {/* Hero header */}
      <header className="mb-12 rounded-2xl border border-border bg-gradient-to-br from-primary/10 via-card to-card p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/15 px-3 py-1 rounded-full">
              {language === 'hu' ? '0. lépés' : 'Step 0'}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 leading-tight">
            {c.title}
          </h1>
          <p className="text-lg text-primary/80 font-medium mb-4">{c.subtitle}</p>
          <p className="text-muted-foreground leading-relaxed max-w-2xl">{c.intro}</p>
        </div>
      </header>

      {/* Animated Timeline */}
      <section className="mb-12">
        <div className="relative">
          {c.steps.map((step, index) => {
            const colors = colorConfigs[index];
            const Icon = icons[index];
            const delay = `${index * 0.18}s`;
            const isLast = index === c.steps.length - 1;

            return (
              <div key={step.num} className="relative flex gap-5 md:gap-7">
                {/* Left column: circle + connecting line */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`relative z-10 w-11 h-11 rounded-full flex items-center justify-center shrink-0 opacity-0 animate-scale-in shadow-lg ${colors.circleBg}`}
                    style={{ animationDelay: delay }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  {!isLast && (
                    <div className="w-0.5 flex-1 min-h-8 bg-gradient-to-b from-border/80 to-transparent mt-1" />
                  )}
                </div>

                {/* Right column: card */}
                <div
                  className={`flex-1 opacity-0 animate-slide-in-left pb-8`}
                  style={{ animationDelay: `${index * 0.18 + 0.1}s` }}
                >
                  <div
                    className={`p-5 md:p-6 rounded-2xl border ${colors.border} ${colors.cardBg} hover:shadow-lg hover:shadow-primary/5 transition-all`}
                  >
                    <span
                      className={`inline-block text-xs font-bold uppercase tracking-widest mb-2 ${colors.label}`}
                    >
                      {step.label}
                    </span>
                    <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {step.description}
                    </p>
                    {step.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {step.tech.map((t) => (
                          <span
                            key={t}
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${colors.badgeBg} ${colors.badgeText}`}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technology summary table */}
      <section
        className="mb-12 opacity-0 animate-fade-in rounded-2xl border border-border bg-card p-6 md:p-8"
        style={{ animationDelay: '1.4s' }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Rocket className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">{c.techSummaryTitle}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {c.techSummaryItems.map((item) => (
            <div
              key={item.name}
              className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 border border-border/50"
            >
              <div className="w-2 h-2 rounded-full bg-primary/60 mt-1.5 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <LessonNavigation
        nextLesson={{
          path: '/learn/choose-and-buy-domain',
          titleKey: 'content.chooseDomain',
        }}
      />
    </article>
  );
};

export default ProjectOverview;
