import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import LessonNavigation from '@/components/LessonNavigation';

const VibeCoding: React.FC = () => {
  const { t, language } = useLanguage();

  const content = {
    hu: {
      title: 'Mi az a Vibe Coding?',
      intro: 'A vibe coding egy új megközelítés a szoftverfejlesztésben, ahol az AI-val természetes nyelven kommunikálsz, és ő írja meg helyetted a kódot. Nem kell minden szintaxist fejből tudnod - elég, ha tudod, mit szeretnél elérni.',
      sections: [
        {
          title: 'A paradigmaváltás',
          content: 'A hagyományos programozás során minden egyes sort neked kell megírnod. A vibe codingnál te vagy a "tervező" és az AI az "építő". Te mondod el, mit szeretnél, és az AI implementálja. Ez nem jelenti azt, hogy nem kell értened a kódot - de sokkal gyorsabban haladhatsz.',
        },
        {
          title: 'Hogyan működik a gyakorlatban?',
          content: 'Gondolj rá úgy, mintha egy nagyon ügyes fejlesztő asszisztenssel dolgoznál. Elmondod neki: "Szeretnék egy regisztrációs formot, ami email és jelszó mezőt tartalmaz, és validálja a bemenetet." Az AI megérti a kérést és megírja a kódot, amit aztán te átnézel és finomítasz.',
        },
        {
          title: 'Eszközök vibe codinghoz',
          content: 'Számos platform támogatja ezt a munkamódszert: a Lovable teljes webalkalmazásokat épít, a Cursor és a Windsurf AI-alapú kódszerkesztők, a GitHub Copilot pedig inline kódkiegészítést ad. Mindegyiknek megvan a maga helye a fejlesztési folyamatban.',
        },
        {
          title: 'Mikor használd?',
          content: 'A vibe coding különösen hasznos prototípusok készítéséhez, ismétlődő feladatokhoz, vagy ha olyan technológiával dolgozol, amit még nem ismersz jól. De fontos megjegyezni: a kritikus rendszereknél mindig alaposan nézd át a generált kódot.',
        },
      ],
      tipContent: 'A vibe coding nem helyettesíti a programozási tudást - kiegészíti azt. Minél jobban értesz a kódhoz, annál jobb promptokat tudsz írni, és annál gyorsabban veszed észre, ha valami nem stimmel.',
    },
    en: {
      title: 'What is Vibe Coding?',
      intro: 'Vibe coding is a new approach to software development where you communicate with AI in natural language, and it writes the code for you. You don\'t need to memorize every syntax - you just need to know what you want to achieve.',
      sections: [
        {
          title: 'The Paradigm Shift',
          content: 'In traditional programming, you have to write every single line yourself. In vibe coding, you\'re the "designer" and the AI is the "builder." You describe what you want, and the AI implements it. This doesn\'t mean you don\'t need to understand code - but you can move much faster.',
        },
        {
          title: 'How Does It Work in Practice?',
          content: 'Think of it as working with a very skilled developer assistant. You tell them: "I want a registration form with email and password fields that validates the input." The AI understands the request and writes the code, which you then review and refine.',
        },
        {
          title: 'Tools for Vibe Coding',
          content: 'Many platforms support this workflow: Lovable builds complete web applications, Cursor and Windsurf are AI-powered code editors, and GitHub Copilot provides inline code completion. Each has its place in the development process.',
        },
        {
          title: 'When to Use It?',
          content: 'Vibe coding is especially useful for creating prototypes, repetitive tasks, or when working with technology you\'re not yet familiar with. But it\'s important to note: for critical systems, always thoroughly review the generated code.',
        },
      ],
      tipContent: 'Vibe coding doesn\'t replace programming knowledge - it complements it. The better you understand code, the better prompts you can write, and the faster you\'ll notice when something isn\'t right.',
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
          path: '/learn/prompt-engineering',
          titleKey: 'content.promptEngineering',
        }}
        nextLesson={{
          path: '/learn/agentic-solutions',
          titleKey: 'content.agenticSolutions',
        }}
      />
    </article>
  );
};

export default VibeCoding;
