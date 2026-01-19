import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import LessonNavigation from '@/components/LessonNavigation';

const CreatingMVP: React.FC = () => {
  const { t, language } = useLanguage();

  const content = {
    hu: {
      title: 'MVP létrehozása',
      intro: 'Az MVP (Minimum Viable Product) a legegyszerűbb működő verzió a termékötletedből. A cél: gyorsan validálni az ötletet a piacon, mielőtt túl sok időt és pénzt fektetnél bele.',
      sections: [
        {
          title: 'Miért fontos az MVP?',
          content: 'A legtöbb startup azért bukik meg, mert olyat épít, amit senki nem akar. Az MVP segít ezt elkerülni. Ahelyett, hogy hónapokig fejlesztenél egy "tökéletes" terméket, gyorsan kiadsz valamit, és a felhasználói visszajelzések alapján iterálsz.',
        },
        {
          title: 'Mit tartalmazzon?',
          content: 'Csak azt, ami a fő értékajánlathoz szükséges. Semmi extrát, semmi "nice-to-have" funkciót. Kérdezd meg magadtól: "Mi az a legkisebb dolog, amivel bizonyíthatom, hogy az ötletem működik?"',
        },
        {
          title: 'MVP építése AI-val',
          content: 'A vibe coding és az AI eszközök tökéletesek MVP építésére. A Lovable-lel órák alatt elkészíthetsz egy működő prototípust, amit aztán tesztelhetsz valós felhasználókkal. Ha működik, tovább építed. Ha nem, gyorsan pivotálsz.',
        },
        {
          title: 'A folyamat',
          content: '1. Definiáld a problémát, amit megoldasz. 2. Határozd meg a célcsoportot. 3. Azonosítsd a kulcs funkciókat (max 3-5). 4. Építsd meg a lehető leggyorsabban. 5. Teszteld valós felhasználókkal. 6. Iterálj a visszajelzések alapján.',
        },
      ],
      tipContent: 'Az MVP-d csúnya lehet. Lassú lehet. De működnie kell, és meg kell oldania egy valós problémát. A tökéletesség később jön.',
    },
    en: {
      title: 'Creating an MVP',
      intro: 'An MVP (Minimum Viable Product) is the simplest working version of your product idea. The goal: quickly validate the idea in the market before investing too much time and money.',
      sections: [
        {
          title: 'Why is MVP Important?',
          content: 'Most startups fail because they build something nobody wants. MVP helps avoid this. Instead of developing a "perfect" product for months, you quickly release something and iterate based on user feedback.',
        },
        {
          title: 'What Should It Include?',
          content: 'Only what\'s necessary for the core value proposition. Nothing extra, no "nice-to-have" features. Ask yourself: "What\'s the smallest thing that can prove my idea works?"',
        },
        {
          title: 'Building MVP with AI',
          content: 'Vibe coding and AI tools are perfect for MVP building. With Lovable, you can create a working prototype in hours, which you can then test with real users. If it works, you keep building. If not, you pivot quickly.',
        },
        {
          title: 'The Process',
          content: '1. Define the problem you\'re solving. 2. Identify your target audience. 3. Identify key features (max 3-5). 4. Build as quickly as possible. 5. Test with real users. 6. Iterate based on feedback.',
        },
      ],
      tipContent: 'Your MVP can be ugly. It can be slow. But it must work and solve a real problem. Perfection comes later.',
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
          path: '/learn/vibe-coding',
          titleKey: 'content.whatIsVibeCoding',
        }}
        nextLesson={{
          path: '/learn/lovable',
          titleKey: 'content.lovable',
        }}
      />
    </article>
  );
};

export default CreatingMVP;
