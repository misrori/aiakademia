import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import LessonNavigation from '@/components/LessonNavigation';

const AgenticSolutions: React.FC = () => {
  const { t, language } = useLanguage();

  const content = {
    hu: {
      title: 'Agentic megoldások',
      intro: 'Az agentic AI rendszerek önállóan cselekvő mesterséges intelligencia ágensek, amelyek képesek komplex feladatokat végrehajtani, döntéseket hozni és eszközöket használni a céljaik eléréséhez.',
      sections: [
        {
          title: 'Mi teszi "agentic"-ká az AI-t?',
          content: 'Egy hagyományos AI modell válaszol a kérdéseidre. Egy agentic rendszer viszont képes önállóan cselekedni: eszközöket használ, lépéseket tervez, és iteratív módon halad a cél felé. Gondolj rá úgy, mint a különbség aközött, hogy valaki megmondja az irányt, vagy ténylegesen elvisz téged a helyszínre.',
        },
        {
          title: 'Tool use és function calling',
          content: 'Az ágensek képesek "eszközöket" használni - API-kat hívni, adatbázisokat lekérdezni, fájlokat kezelni. Ez teszi őket igazán erőteljessé. Például egy AI ágens nemcsak megmondja, milyen idő lesz holnap, hanem be is ütemezi a programjaidat az időjárás alapján.',
        },
        {
          title: 'Autonómia szintjei',
          content: 'Az ágensek különböző szintű autonómiával működhetnek. Egyesek minden lépésnél visszakérdeznek (human-in-the-loop), mások nagyobb szabadságot kapnak. A megfelelő szint megválasztása kritikus a biztonság és hatékonyság szempontjából.',
        },
        {
          title: 'Példák agentic rendszerekre',
          content: 'A Lovable maga is egy agentic rendszer - nem csak kódot generál, hanem komplex webalkalmazásokat épít lépésről lépésre. Más példák: AI asszisztensek, amelyek e-maileket kezelnek, vagy kutatási ágensek, amelyek önállóan gyűjtenek és elemeznek információkat.',
        },
      ],
      warningContent: 'Az agentic rendszerek nagyon erőteljesek, de megfelelő felügyeletet igényelnek. Mindig győződj meg róla, hogy az ágens csak olyan műveleteket hajt végre, amelyeket engedélyeztél.',
    },
    en: {
      title: 'Agentic Solutions',
      intro: 'Agentic AI systems are autonomous artificial intelligence agents capable of executing complex tasks, making decisions, and using tools to achieve their goals.',
      sections: [
        {
          title: 'What Makes AI "Agentic"?',
          content: 'A traditional AI model answers your questions. An agentic system, however, can act independently: it uses tools, plans steps, and iteratively moves toward the goal. Think of it as the difference between someone giving you directions versus actually taking you to the destination.',
        },
        {
          title: 'Tool Use and Function Calling',
          content: 'Agents can use "tools" - call APIs, query databases, manage files. This is what makes them truly powerful. For example, an AI agent doesn\'t just tell you what the weather will be tomorrow, but also schedules your activities based on the forecast.',
        },
        {
          title: 'Levels of Autonomy',
          content: 'Agents can operate with different levels of autonomy. Some ask for confirmation at every step (human-in-the-loop), while others are given more freedom. Choosing the right level is critical for safety and efficiency.',
        },
        {
          title: 'Examples of Agentic Systems',
          content: 'Lovable itself is an agentic system - it doesn\'t just generate code, but builds complex web applications step by step. Other examples: AI assistants that manage emails, or research agents that independently collect and analyze information.',
        },
      ],
      warningContent: 'Agentic systems are very powerful but require proper oversight. Always make sure the agent only performs operations you\'ve authorized.',
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

        <ContentBlock type="warning">
          {c.warningContent}
        </ContentBlock>
      </div>

      <LessonNavigation
        prevLesson={{
          path: '/learn/what-is-llm',
          titleKey: 'content.whatIsLlm',
        }}
        nextLesson={{
          path: '/learn/vibe-coding',
          titleKey: 'content.whatIsVibeCoding',
        }}
      />
    </article>
  );
};

export default AgenticSolutions;
