import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import LessonNavigation from '@/components/LessonNavigation';

const PromptEngineering: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    hu: {
      title: 'Prompt Engineering alapok',
      intro:
        'A prompt engineering annak a gyakorlata, hogyan fogalmazz pontos, egyertelmu es kontextusban gazdag utasitasokat AI modelleknek, hogy jobb valaszokat kapj.',
      sections: [
        {
          title: 'Miert ennyire fontos?',
          content:
            'A modellek azt tudjak teljesiteni, amit pontosan kersz toluk. Egy homalyos prompt gyakran altalanos vagy felrevezeto valaszt ad, mig egy jo prompt konkret formatumot, celkozonseget, stilust es korlatokat ad meg.',
        },
        {
          title: 'A jo prompt 4 eleme',
          content:
            '1) Szerep: add meg, milyen szemszogbol valaszoljon a modell. 2) Feladat: fogalmazd meg pontosan az elvart eredmenyt. 3) Kontextus: add meg a hatterinformaciot, celcsoportot es korlatokat. 4) Formatum: irj elo konkret kimeneti format, pl. lista, JSON vagy lepesenkenti terv.',
        },
        {
          title: 'Iteracio es visszacsatolas',
          content:
            'Ritkan tokeletes az elso valasz. Erdemes tobb korben finomitani: kerj rovidebb valtozatot, javitsd a hangsulyokat, adj peldat, vagy kerj ellenorzo listat. A prompt engineering gyakorlatban egy gyors tanulas-ellenorzes ciklus.',
        },
      ],
      tipContent:
        'Hasznalj ujrahasznosithato prompt sablonokat. Ha ugyanazt a tipusu feladatot tobbszor vegzed, egy jo sablon jelentosen gyorsitja a munkat.',
    },
    en: {
      title: 'Prompt Engineering Basics',
      intro:
        'Prompt engineering is the practice of writing clear, specific, and context-rich instructions for AI models to get better outputs.',
      sections: [
        {
          title: 'Why it matters',
          content:
            'Models can only optimize for what you explicitly ask. A vague prompt often produces generic or misleading responses, while a good prompt defines the objective, audience, style, and constraints.',
        },
        {
          title: 'Four parts of a strong prompt',
          content:
            '1) Role: define the perspective the model should take. 2) Task: state the expected outcome clearly. 3) Context: include relevant background, audience, and constraints. 4) Format: require a concrete output structure such as bullets, JSON, or step-by-step instructions.',
        },
        {
          title: 'Iteration and feedback',
          content:
            'The first response is rarely perfect. Iterate quickly: ask for a shorter version, adjust emphasis, provide examples, or request a validation checklist. In practice, prompt engineering is a rapid loop of testing and refinement.',
        },
      ],
      tipContent:
        'Create reusable prompt templates. If you repeat similar tasks, a good template can dramatically speed up your workflow.',
    },
  };

  const c = content[language];

  return (
    <article className="animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">{c.title}</h1>

      <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{c.intro}</p>

      <div className="content-prose">
        {c.sections.map((section, index) => (
          <section key={index} className="mb-10">
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-foreground">{section.title}</h2>
            <p className="text-content-foreground/90 leading-relaxed">{section.content}</p>
          </section>
        ))}

        <ContentBlock type="tip">{c.tipContent}</ContentBlock>
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

export default PromptEngineering;
