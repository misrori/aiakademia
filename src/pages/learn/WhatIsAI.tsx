import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import LessonNavigation from '@/components/LessonNavigation';

const WhatIsAI: React.FC = () => {
  const { t, language } = useLanguage();

  const content = {
    hu: {
      title: 'Mi az a mesterséges intelligencia?',
      intro: 'A mesterséges intelligencia (AI) olyan technológia, amely lehetővé teszi a gépek számára, hogy emberi-szerű intelligenciát mutassanak. Ez magában foglalja a tanulást, a problémamegoldást, a mintafelismerést és a döntéshozatalt.',
      sections: [
        {
          title: 'AI a mindennapokban',
          content: 'Talán nem is gondolnád, de az AI már most is része az életednek. Amikor a telefonod automatikusan rendezi a fotóidat, vagy a Spotify új zenéket ajánl, az mind mesterséges intelligencia. A modern AI rendszerek képesek beszélgetni, szöveget írni, képeket generálni és még kódot is írni.',
        },
        {
          title: 'Gépi tanulás vs. AI',
          content: 'A gépi tanulás (Machine Learning) az AI egy részhalmaza. Míg a hagyományos programok pontos utasításokat követnek, a gépi tanulás rendszerek adatokból tanulnak és javítják a teljesítményüket idővel. Gondolj rá úgy, mint a különbség aközött, hogy valaki elmondja neked a szabályokat, vagy te magad fedezed fel őket a tapasztalataidból.',
        },
        {
          title: 'Deep Learning és neurális hálózatok',
          content: 'A deep learning még egy lépéssel tovább megy - az emberi agy működését utánzó neurális hálózatokat használ. Ezek a rendszerek különösen jók a komplex minták felismerésében, legyen szó képekről, hangról vagy szövegről.',
        },
      ],
      tipContent: 'Az AI nem varázslat - matematikai modellek és algoritmusok eredménye. Minél jobban érted az alapokat, annál hatékonyabban tudod majd használni ezeket az eszközöket.',
    },
    en: {
      title: 'What is Artificial Intelligence?',
      intro: 'Artificial Intelligence (AI) is technology that enables machines to exhibit human-like intelligence. This includes learning, problem-solving, pattern recognition, and decision-making.',
      sections: [
        {
          title: 'AI in Everyday Life',
          content: 'You might not realize it, but AI is already part of your life. When your phone automatically organizes your photos, or Spotify recommends new music, that\'s all artificial intelligence. Modern AI systems can converse, write text, generate images, and even write code.',
        },
        {
          title: 'Machine Learning vs. AI',
          content: 'Machine Learning is a subset of AI. While traditional programs follow precise instructions, machine learning systems learn from data and improve their performance over time. Think of it as the difference between someone telling you the rules versus discovering them yourself through experience.',
        },
        {
          title: 'Deep Learning and Neural Networks',
          content: 'Deep learning goes one step further - it uses neural networks that mimic the human brain\'s function. These systems are particularly good at recognizing complex patterns, whether in images, audio, or text.',
        },
      ],
      tipContent: 'AI isn\'t magic - it\'s the result of mathematical models and algorithms. The better you understand the basics, the more effectively you\'ll be able to use these tools.',
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
        nextLesson={{
          path: '/learn/what-is-llm',
          titleKey: 'content.whatIsLlm',
        }}
      />
    </article>
  );
};

export default WhatIsAI;
