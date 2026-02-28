import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import LessonNavigation from '@/components/LessonNavigation';

const CustomDomain: React.FC = () => {
    const { language } = useLanguage();

    const content = {
        hu: {
            title: 'Egyedi domain használata',
            intro: 'A username.github.io cím helyett használhatsz saját domain nevet is (pl. www.teoldalad.com). Ez komolyabb megjelenést kölcsönöz a projektednek.',
            sections: [
                {
                    title: 'Hol érdemes domaint vásárolni?',
                    content: 'Két fő ajánlásunk van: a GoDaddy és a Cloudflare. A GoDaddy-nél gyakran találsz olcsó ($1-2) kezdő ajánlatokat az első évre, míg a Cloudflare a transzparens, önköltségi árairól és a kiváló DNS kezelőfelületéről híres.',
                },
                {
                    title: 'Árak és választás',
                    content: 'Egy .com domain általában $10-15 évente. Érdemes olyan nevet választani, ami rövid, megjegyezhető, és passzol a projekted témájához. A Cloudflare-nél a biztonsági funkciók (pl. DDoS védelem) ingyen járnak a domain mellé.',
                },
                {
                    title: 'Összekötés a GitHub Pages-szel',
                    content: '1. A domain regisztrátorodnál állíts be egy CNAME rekordot, ami a username.github.io-ra mutat. 2. A GitHub Pages beállításainál add meg a "Custom Domain" mezőben a saját címedet. 3. Pár órán belül a GitHub automatikusan összeköti a kettőt.',
                },
                {
                    title: 'HTTPS: A biztonság az első',
                    content: 'A GitHub Pages minden egyedi domainhez ingyenes SSL tanúsítványt biztosít. Csak pipáld be az "Enforce HTTPS" opciót a beállításokban. Így a látogatóid biztonságban lesznek, és a böngészők sem jelzik "nem biztonságosnak" az oldaladat.',
                },
            ],
            tipContent: 'Ha a Cloudflare-t választod, használd a Proxy funkciót (narancssárga felhő) a gyorsabb betöltés és az extra védelem érdekében.',
        },
        en: {
            title: 'Using a Custom Domain',
            intro: 'Instead of username.github.io, you can use your own domain name (e.g., www.yoursite.com). This gives your project a more professional look.',
            sections: [
                {
                    title: 'Where Should You Buy a Domain?',
                    content: 'We have two main recommendations: GoDaddy and Cloudflare. GoDaddy often has cheap ($1-2) introductory offers for the first year, while Cloudflare is famous for its transparent, at-cost pricing and excellent DNS management interface.',
                },
                {
                    title: 'Pricing and Selection',
                    content: 'A .com domain usually costs $10-15 per year. It\'s worth choosing a name that is short, memorable, and fits your project\'s theme. At Cloudflare, security features (like DDoS protection) come free with the domain.',
                },
                {
                    title: 'Connecting to GitHub Pages',
                    content: '1. In your domain registrar, set up a CNAME record pointing to username.github.io. 2. In the GitHub Pages settings, enter your domain in the "Custom Domain" field. 3. Within a few hours, GitHub will automatically link the two.',
                },
                {
                    title: 'HTTPS: Safety First',
                    content: 'GitHub Pages provides a free SSL certificate for every custom domain. Just check the "Enforce HTTPS" option in the settings. This keeps your visitors safe and prevents browsers from flagging your site as "not secure".',
                },
            ],
            tipContent: 'If you choose Cloudflare, use the Proxy feature (orange cloud) for faster loading and extra protection.',
        },
    };

    const c = content[language];

    return (
        <article className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{c.title}</h1>

            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {c.intro}
            </p>

            <div className="content-prose">
                {c.sections.map((section, index) => (
                    <section key={index} className="mb-10">
                        <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">{section.title}</h2>
                        <p className="text-content-foreground/90 leading-relaxed">{section.content}</p>
                    </section>
                ))}

                <ContentBlock type="tip">
                    {c.tipContent}
                </ContentBlock>
            </div>

            <LessonNavigation
                prevLesson={{
                    path: '/learn/local-dev',
                    titleKey: 'content.localDev',
                }}
                nextLesson={{
                    path: '/learn/supabase',
                    titleKey: 'content.supabase',
                }}
            />
        </article>
    );
};

export default CustomDomain;
