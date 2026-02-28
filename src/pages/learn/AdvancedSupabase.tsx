import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import CodeBlock from '@/components/CodeBlock';
import LessonNavigation from '@/components/LessonNavigation';

const AdvancedSupabase: React.FC = () => {
    const { language } = useLanguage();

    const content = {
        hu: {
            title: 'Haladó Supabase és integrációk',
            intro: 'Ha már az alapokat tudod, nézzük meg, hogyan válik a Supabase egy igazi powerhouse-szá a Lovable-lel együttműködve.',
            sections: [
                {
                    title: 'Lovable és Supabase integráció',
                    content: 'A Lovable beépített módon tud kommunikálni a Supabase-szel. Képes létrehozni a táblákat, kezelni a kapcsolatokat, és beállítani az autentikációt. Nem csak adatokat tárolhatsz, hanem komplett üzleti logikát építhetsz.',
                },
                {
                    title: 'Mi az az Edge Function?',
                    content: 'Az Edge Function-ök olyan kisméretű backend kódok, amik a felhasználóhoz legközelebbi szerveren futnak. Miért jó ez? Nincs szükség külön backend szerverre, mégis futtathatsz komplex logikát, hívhatsz külső API-kat (pl. Stripe vagy OpenAI), és mindezt villámgyorsan.',
                },
                {
                    title: 'További integrációk: Shopify és AI',
                    content: 'A Lovable és Supabase párosa könnyen összeköthető más platformokkal is. Készíthetsz e-kereskedelmi oldalt Shopify integrációval, vagy beépíthetsz AI funkciókat, amik a Supabase adatbázisodból dolgoznak.',
                },
                {
                    title: 'Backend-less architektúra',
                    content: 'A modern vibe coding világában a hagyományos backend szerverek gyakran elavultak. A weboldalad közvetlenül beszél a Supabase-szel, az Edge Function-ök pedig ellátják a maradék feladatokat. Ez kevesebb hibalehetőséget és egyszerűbb karbantartást jelent.',
                },
            ],
            tipContent: 'Használd a Supabase AI asszisztensét SQL lekérdezések írásához és táblák tervezéséhez. Nagyban felgyorsítja a munkát!',
        },
        en: {
            title: 'Advanced Supabase & Integrations',
            intro: 'Once you know the basics, let\'s see how Supabase becomes a real powerhouse when working together with Lovable.',
            sections: [
                {
                    title: 'Lovable & Supabase Integration',
                    content: 'Lovable communicates with Supabase out of the box. It can create tables, handle relationships, and set up authentication. You don\'t just store data; you can build complete business logic.',
                },
                {
                    title: 'What is an Edge Function?',
                    content: 'Edge Functions are small pieces of backend code that run on servers closest to the user. Why is this good? You don\'t need a separate backend server, yet you can run complex logic, call external APIs (like Stripe or OpenAI), and do it all at lightning speed.',
                },
                {
                    title: 'Other Integrations: Shopify & AI',
                    content: 'The Lovable and Supabase duo can easily be linked with other platforms. You can create an e-commerce site with Shopify integration or build AI features that work with data directly from your Supabase database.',
                },
                {
                    title: 'Backend-less Architecture',
                    content: 'In the modern vibe coding world, traditional backend servers are often obsolete. Your website talks directly to Supabase, and Edge Functions handle the rest. This means fewer points of failure and easier maintenance.',
                },
            ],
            tipContent: 'Use the Supabase AI assistant to write SQL queries and design tables. It speeds up the work significantly!',
        },
    };

    const c = content[language];

    const edgeFunctionCode = `// Supabase Edge Function példa
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const { name } = await req.json()
  const data = {
    message: \`Hello \${name} from the edge!\`,
  }

  return new Response(
    JSON.stringify(data),
    { headers: { "Content-Type": "application/json" } },
  )
})`;

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

                <ContentBlock type="example">
                    <CodeBlock code={edgeFunctionCode} language="typescript" filename="hello-edge.ts" />
                </ContentBlock>

                <ContentBlock type="tip">
                    {c.tipContent}
                </ContentBlock>
            </div>

            <LessonNavigation
                prevLesson={{
                    path: '/learn/supabase',
                    titleKey: 'content.supabase',
                }}
                nextLesson={{
                    path: '/learn/virtual-machine',
                    titleKey: 'content.virtualMachine',
                }}
            />
        </article>
    );
};

export default AdvancedSupabase;
