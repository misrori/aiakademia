import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import LessonNavigation from '@/components/LessonNavigation';

const Hosting: React.FC = () => {
  const { t, language } = useLanguage();

  const content = {
    hu: {
      title: 'Alkalmazás hosztolása',
      intro: 'Hogyan tedd elérhetővé az alkalmazásodat az interneten? A hosztolás ma már egyszerűbb, mint valaha - de fontos választani a megfelelő megoldást.',
      sections: [
        {
          title: 'Frontend hosztolás',
          content: 'Statikus oldalakhoz és React alkalmazásokhoz a Vercel, Netlify vagy a Cloudflare Pages tökéletes választás. Ingyenesek, gyorsak, és automatikusan deployolnak GitHub-ból. A Lovable saját hosztolást is biztosít.',
        },
        {
          title: 'Backend hosztolás',
          content: 'Backend szolgáltatásokhoz Railway, Render vagy Fly.io ajánlott. Ezek menedzselt platformok - nem kell szerver adminisztrációval foglalkoznod. Alternatívaként használhatsz serverless megoldásokat, mint a Supabase Edge Functions.',
        },
        {
          title: 'Adatbázis hosztolás',
          content: 'A Supabase, PlanetScale, vagy Neon ingyenes tier-rel rendelkeznek, és kiválóak kezdéshez. Éles projektekhez érdemes figyelni a skálázási lehetőségeket és az árképzést.',
        },
        {
          title: 'Domain és SSL',
          content: 'A saját domain ($10-15/év) professzionálisabbá teszi a projekted. Az SSL tanúsítvány (HTTPS) ma már alapkövetelmény - a legtöbb hosztolási platform automatikusan biztosítja ingyen.',
        },
      ],
      tipContent: 'Kezdéshez a Lovable + Supabase kombináció mindent megad: frontend hosztolás, backend, adatbázis. Csak akkor bonyolítsd, ha tényleg szükséges.',
    },
    en: {
      title: 'Hosting an Application',
      intro: 'How do you make your application available on the internet? Hosting is easier than ever today - but it\'s important to choose the right solution.',
      sections: [
        {
          title: 'Frontend Hosting',
          content: 'For static sites and React applications, Vercel, Netlify, or Cloudflare Pages are perfect choices. They\'re free, fast, and deploy automatically from GitHub. Lovable also provides its own hosting.',
        },
        {
          title: 'Backend Hosting',
          content: 'For backend services, Railway, Render, or Fly.io are recommended. These are managed platforms - you don\'t need to deal with server administration. Alternatively, use serverless solutions like Supabase Edge Functions.',
        },
        {
          title: 'Database Hosting',
          content: 'Supabase, PlanetScale, or Neon have free tiers and are excellent for getting started. For production projects, consider scaling options and pricing.',
        },
        {
          title: 'Domain and SSL',
          content: 'A custom domain ($10-15/year) makes your project more professional. An SSL certificate (HTTPS) is now a basic requirement - most hosting platforms provide it automatically for free.',
        },
      ],
      tipContent: 'For starting out, the Lovable + Supabase combination gives you everything: frontend hosting, backend, database. Only complicate things if truly necessary.',
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
          path: '/learn/virtual-machine',
          titleKey: 'content.virtualMachine',
        }}
      />
    </article>
  );
};

export default Hosting;
