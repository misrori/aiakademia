import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import LessonNavigation from '@/components/LessonNavigation';
import {
    Rocket,
    Lightbulb,
    Github,
    Globe,
    Database,
    Cpu,
    ShieldCheck,
    Code2,
    ExternalLink
} from 'lucide-react';

const IdeaToLive: React.FC = () => {
    const { language } = useLanguage();

    const content = {
        hu: {
            title: '🚀 Ötletből publikus weboldal – fő lépések',
            sections: [
                {
                    id: 'mindset',
                    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
                    title: '0. Gondolkodásmód',
                    items: [
                        '“Képes vagy rá” szemlélet',
                        'Nem tökéleteset építünk, hanem működőt',
                        'Lovable MVP-first megközelítés'
                    ],
                    link: '/learn/vibe-coding'
                },
                {
                    id: 'mvp',
                    icon: <Rocket className="w-6 h-6 text-blue-500" />,
                    title: '1. Lovable MVP létrehozása',
                    items: [
                        'Projekt létrehozása Lovable-ben',
                        'Funkciók minimalizálása',
                        'UI + alap logika',
                        'MVP validáció'
                    ],
                    link: '/learn/creating-mvp'
                },
                {
                    id: 'github',
                    icon: <Github className="w-6 h-6 text-purple-500" />,
                    title: '2. Export GitHub-ra',
                    items: [
                        'Mi az a GitHub? (Verziókezelés, Repository, Open source vs private)',
                        'Mit lehet rajta csinálni? (Kód tárolás, Verziózás, Branchek, Collaboration, CI/CD)'
                    ],
                    link: '/learn/github'
                },
                {
                    id: 'pages',
                    icon: <Globe className="w-6 h-6 text-green-500" />,
                    title: '3. Mi az a GitHub Pages?',
                    items: [
                        'Static hosting',
                        'Ingyenes publikálás',
                        'Mire jó / mire nem jó (limitációk)'
                    ],
                    link: '/learn/github'
                },
                {
                    id: 'clone',
                    icon: <Code2 className="w-6 h-6 text-indigo-500" />,
                    title: '4. Repo klónozás lokálisan',
                    items: [
                        'Git clone',
                        'Lokális fejlesztés',
                        'Branch stratégia'
                    ],
                    link: '/learn/local-dev'
                },
                {
                    id: 'tools',
                    icon: <Cpu className="w-6 h-6 text-orange-500" />,
                    title: '5. Fejlesztési eszközök',
                    items: [
                        'Antigravity & Cloud Code',
                        'VS Code & GitHub Codespaces',
                        'AI eszközök & CLI alapú fejlesztés'
                    ],
                    link: '/learn/local-dev'
                },
                {
                    id: 'deploy',
                    icon: <Rocket className="w-6 h-6 text-red-500" />,
                    title: '6. Deploy GitHub Pages-re',
                    items: [
                        'Build és Deploy scriptek',
                        'gh-pages branch',
                        'GitHub Pages beállítások'
                    ],
                    link: '/learn/github'
                },
                {
                    id: 'domain',
                    icon: <Globe className="w-6 h-6 text-cyan-500" />,
                    title: '7. Domain vásárlás',
                    items: [
                        'Hol? (GoDaddy, Cloudflare)',
                        'Mire figyelj? (.com előnyei, DNS kezelés, Ár, Ownership)'
                    ],
                    link: '/learn/custom-domain'
                },
                {
                    id: 'connect',
                    icon: <ExternalLink className="w-6 h-6 text-emerald-500" />,
                    title: '8. Domain összekötése GitHub Pages-szel',
                    items: [
                        'DNS A record & CNAME record',
                        'Propagáció',
                        'CNAME file a repo-ban'
                    ],
                    link: '/learn/custom-domain'
                },
                {
                    id: 'https',
                    icon: <ShieldCheck className="w-6 h-6 text-teal-500" />,
                    title: '9. HTTPS engedélyezése',
                    items: [
                        'GitHub Pages SSL (Let’s Encrypt)',
                        'Force HTTPS opció'
                    ],
                    link: '/learn/custom-domain'
                }
            ],
            advancedTitle: '🔥 Advanced rész – Backend & adatbázis',
            advancedSections: [
                {
                    id: 'supabase',
                    icon: <Database className="w-6 h-6 text-emerald-600" />,
                    title: '10. Mi az a Supabase?',
                    items: [
                        'Open source Firebase alternatíva (Postgres, Auth, Storage)'
                    ],
                    link: '/learn/supabase'
                },
                {
                    id: 'edge',
                    icon: <Cpu className="w-6 h-6 text-amber-500" />,
                    title: '11. Mi az az Edge Function?',
                    items: [
                        'Serverless logika',
                        'API endpoint backend nélkül',
                        'Gyors globális futás'
                    ],
                    link: '/learn/advanced-supabase'
                },
                {
                    id: 'why-supabase',
                    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
                    title: '12. Miért jó a Supabase?',
                    items: [
                        'Nem kell külön backend',
                        'Skálázható, integrált Auth'
                    ],
                    link: '/learn/supabase'
                },
                {
                    id: 'integrations',
                    icon: <ExternalLink className="w-6 h-6 text-blue-400" />,
                    title: '13. Lovable integrációk',
                    items: [
                        'Supabase, Shopify, AI API-k',
                        'Third-party integrációk'
                    ],
                    link: '/learn/advanced-supabase'
                }
            ]
        },
        en: {
            title: '🌍 From Idea to Live Website – High-Level Steps',
            sections: [
                {
                    id: 'mindset',
                    icon: <Lightbulb className="w-6 h-6 text-yellow-500" />,
                    title: '0. Mindset',
                    items: [
                        'You are capable',
                        'Build usable, not perfect',
                        'MVP-first approach'
                    ],
                    link: '/learn/vibe-coding'
                },
                {
                    id: 'mvp',
                    icon: <Rocket className="w-6 h-6 text-blue-500" />,
                    title: '1. Create MVP in Lovable',
                    items: [
                        'Create project in Lovable',
                        'Minimize features',
                        'Basic UI + logic',
                        'Validate'
                    ],
                    link: '/learn/creating-mvp'
                },
                {
                    id: 'github',
                    icon: <Github className="w-6 h-6 text-purple-500" />,
                    title: '2. Export to GitHub',
                    items: [
                        'What is GitHub? (Version control, Repository concept)',
                        'What can you do with it? (Store code, Manage versions, Branches, Collaboration, CI/CD)'
                    ],
                    link: '/learn/github'
                },
                {
                    id: 'pages',
                    icon: <Globe className="w-6 h-6 text-green-500" />,
                    title: '3. What is GitHub Pages?',
                    items: [
                        'Free static hosting',
                        'Great for MVP',
                        'Limitations'
                    ],
                    link: '/learn/github'
                },
                {
                    id: 'clone',
                    icon: <Code2 className="w-6 h-6 text-indigo-500" />,
                    title: '4. Clone Locally',
                    items: [
                        'git clone',
                        'Local changes',
                        'Branch strategy'
                    ],
                    link: '/learn/local-dev'
                },
                {
                    id: 'tools',
                    icon: <Cpu className="w-6 h-6 text-orange-500" />,
                    title: '5. Development Tools',
                    items: [
                        'Antigravity & Cloud Code',
                        'VS Code & GitHub Codespaces',
                        'AI tools & CLI based development'
                    ],
                    link: '/learn/local-dev'
                },
                {
                    id: 'deploy',
                    icon: <Rocket className="w-6 h-6 text-red-500" />,
                    title: '6. Deploy to GitHub Pages',
                    items: [
                        'Build script & Deploy script',
                        'gh-pages branch',
                        'Enable Pages in settings'
                    ],
                    link: '/learn/github'
                },
                {
                    id: 'domain',
                    icon: <Globe className="w-6 h-6 text-cyan-500" />,
                    title: '7. Buy a Domain',
                    items: [
                        'Where? (GoDaddy, Cloudflare)',
                        'Consider: .com advantage, DNS control, Annual pricing, Ownership'
                    ],
                    link: '/learn/custom-domain'
                },
                {
                    id: 'connect',
                    icon: <ExternalLink className="w-6 h-6 text-emerald-500" />,
                    title: '8. Connect Domain to GitHub Pages',
                    items: [
                        'A record & CNAME',
                        'DNS propagation',
                        'CNAME file'
                    ],
                    link: '/learn/custom-domain'
                },
                {
                    id: 'https',
                    icon: <ShieldCheck className="w-6 h-6 text-teal-500" />,
                    title: '9. Enable HTTPS',
                    items: [
                        'Built-in SSL',
                        'Force HTTPS'
                    ],
                    link: '/learn/custom-domain'
                }
            ],
            advancedTitle: '🔥 Advanced Section – Backend & Database',
            advancedSections: [
                {
                    id: 'supabase',
                    icon: <Database className="w-6 h-6 text-emerald-600" />,
                    title: '10. What is Supabase?',
                    items: [
                        'Open source Firebase alternative (Postgres, Auth, Storage)'
                    ],
                    link: '/learn/supabase'
                },
                {
                    id: 'edge',
                    icon: <Cpu className="w-6 h-6 text-amber-500" />,
                    title: '11. What is an Edge Function?',
                    items: [
                        'Serverless logic',
                        'API endpoint without backend',
                        'Fast global execution'
                    ],
                    link: '/learn/advanced-supabase'
                },
                {
                    id: 'why-supabase',
                    icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
                    title: '12. Why Supabase?',
                    items: [
                        'No separate backend needed',
                        'Scalable, integrated Auth'
                    ],
                    link: '/learn/supabase'
                },
                {
                    id: 'integrations',
                    icon: <ExternalLink className="w-6 h-6 text-blue-400" />,
                    title: '13. Lovable Integrations',
                    items: [
                        'Supabase, Shopify, AI APIs',
                        'Third-party integrations'
                    ],
                    link: '/learn/advanced-supabase'
                }
            ]
        },
    };

    const c = content[language];

    return (
        <article className="animate-fade-in pb-20">
            <h1 className="text-4xl md:text-5xl font-bold mb-10 text-foreground leading-tight">
                {c.title}
            </h1>

            <div className="space-y-8">
                {c.sections.map((section) => (
                    <div key={section.id} className="relative group">
                        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex items-start gap-4 p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all hover:shadow-lg hover:shadow-primary/5">
                            <div className="p-3 rounded-xl bg-muted shrink-0">
                                {section.icon}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-3">
                                    <h2 className="text-xl font-bold text-foreground">{section.title}</h2>
                                    <Link
                                        to={section.link}
                                        className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                                    >
                                        {language === 'hu' ? 'Részletek' : 'Details'}
                                        <ExternalLink className="w-3 h-3" />
                                    </Link>
                                </div>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    {section.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-muted-foreground text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/40 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="pt-12 pb-6">
                    <h2 className="text-3xl font-bold mb-8 text-foreground">{c.advancedTitle}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {c.advancedSections.map((section) => (
                            <div key={section.id} className="p-6 rounded-2xl bg-gradient-to-br from-card to-muted border border-border/50 hover:border-emerald-500/30 transition-all">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-xl bg-background shrink-0">
                                        {section.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold mb-2 text-foreground">{section.title}</h3>
                                        <ul className="space-y-1 mb-4">
                                            {section.items.map((item, i) => (
                                                <li key={i} className="text-muted-foreground text-sm flex items-center gap-2">
                                                    <div className="w-1 h-1 rounded-full bg-emerald-500 shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link
                                            to={section.link}
                                            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-emerald-600 hover:text-emerald-500 transition-colors"
                                        >
                                            {language === 'hu' ? 'Tovább olvasom' : 'Read more'}
                                            <ChevronRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <LessonNavigation
                nextLesson={{
                    path: '/learn/what-is-ai',
                    titleKey: 'content.whatIsAi',
                }}
            />
        </article>
    );
};

// Explicit Lucide imports if used inside the component or just use the icons passed down
import { ChevronRight as ChevronRightIcon } from 'lucide-react';
const ChevronRight = ChevronRightIcon;

export default IdeaToLive;
