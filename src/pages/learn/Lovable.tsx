import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import LessonNavigation from '@/components/LessonNavigation';

const LovablePage: React.FC = () => {
  const { t, language } = useLanguage();

  const content = {
    hu: {
      title: 'Lovable platform',
      intro: 'A Lovable egy AI-alapú platform, amellyel teljes webalkalmazásokat építhetsz természetes nyelven. Gondolj rá úgy, mintha egy tapasztalt full-stack fejlesztő csapat állna a rendelkezésedre.',
      sections: [
        {
          title: 'Hogyan működik?',
          content: 'Írd le, mit szeretnél építeni, és a Lovable megírja a kódot, beállítja az adatbázist, és üzembe helyezi az alkalmazást. Az egész folyamat valós időben történik, látod, ahogy az alkalmazásod épül.',
        },
        {
          title: 'Technológiai stack',
          content: 'A Lovable React-et, TypeScript-et és Tailwind CSS-t használ a frontendhez. A backend oldalon Supabase-t integrál, ami PostgreSQL adatbázist, autentikációt és fájltárolást biztosít. Modern, skálázható technológiák - ugyanazok, amiket a profi fejlesztők használnak.',
        },
        {
          title: 'Mire jó?',
          content: 'MVP-k gyors prototipizálása, SaaS alkalmazások építése, landing page-ek készítése, dashboard-ok létrehozása. Bármi, ami webalkalmazásként működik, elkészíthető vele.',
        },
        {
          title: 'A vibe coding tökéletes példája',
          content: 'A Lovable pontosan azt a munkafolyamatot testesíti meg, amiről a vibe coding szól. Te az ötletekre és a designra koncentrálsz, az AI pedig a technikai implementációra. Ez nem helyettesíti a fejlesztői tudást, de demokratizálja az alkalmazásfejlesztést.',
        },
      ],
      tipContent: 'Kezdj egyszerű projektekkel, hogy megismerd a platform működését. Aztán fokozatosan haladj a komplexebb alkalmazások felé.',
    },
    en: {
      title: 'Lovable Platform',
      intro: 'Lovable is an AI-powered platform that lets you build complete web applications using natural language. Think of it as having an experienced full-stack development team at your disposal.',
      sections: [
        {
          title: 'How Does It Work?',
          content: 'Describe what you want to build, and Lovable writes the code, sets up the database, and deploys the application. The entire process happens in real-time - you can watch your application being built.',
        },
        {
          title: 'Technology Stack',
          content: 'Lovable uses React, TypeScript, and Tailwind CSS for the frontend. On the backend, it integrates Supabase, which provides PostgreSQL database, authentication, and file storage. Modern, scalable technologies - the same ones professional developers use.',
        },
        {
          title: 'What\'s It Good For?',
          content: 'Rapid prototyping of MVPs, building SaaS applications, creating landing pages, building dashboards. Anything that works as a web application can be built with it.',
        },
        {
          title: 'The Perfect Example of Vibe Coding',
          content: 'Lovable embodies exactly the workflow that vibe coding is about. You focus on ideas and design, while the AI handles the technical implementation. It doesn\'t replace developer knowledge, but it democratizes application development.',
        },
      ],
      tipContent: 'Start with simple projects to learn how the platform works. Then gradually move toward more complex applications.',
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
          path: '/learn/creating-mvp',
          titleKey: 'content.mvp',
        }}
        nextLesson={{
          path: '/learn/github',
          titleKey: 'content.github',
        }}
      />
    </article>
  );
};

export default LovablePage;
