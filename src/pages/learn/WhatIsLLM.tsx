import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import CodeBlock from '@/components/CodeBlock';
import LessonNavigation from '@/components/LessonNavigation';

const WhatIsLLM: React.FC = () => {
  const { t, language } = useLanguage();

  const content = {
    hu: {
      title: 'Mi az LLM?',
      intro: 'Az LLM (Large Language Model) olyan mesterséges intelligencia modell, amelyet hatalmas mennyiségű szöveges adaton képeztek ki. Ezek a modellek képesek megérteni és generálni emberi nyelvet megdöbbentő pontossággal.',
      sections: [
        {
          title: 'Hogyan működik?',
          content: 'Az LLM-ek statisztikai módszerekkel "tanulják meg" a nyelv működését. Több milliárd paramétert tartalmaznak, amelyek a szavak és mondatok közötti összefüggéseket tárolják. Amikor felteszel egy kérdést, a modell a tanult minták alapján generálja a választ.',
        },
        {
          title: 'Népszerű LLM-ek',
          content: 'A legismertebb LLM-ek közé tartozik a GPT-4 (OpenAI), Claude (Anthropic), Gemini (Google), és a Llama (Meta). Mindegyiknek megvannak az erősségei és gyengeségei.',
        },
        {
          title: 'Token és context window',
          content: 'Az LLM-ek "tokenekben" gondolkodnak - ezek szó-töredékek, amelyekre a szöveget bontják. A context window pedig azt határozza meg, hogy mennyi információt tud a modell egyszerre kezelni. Minél nagyobb a context window, annál hosszabb beszélgetéseket vagy dokumentumokat tud feldolgozni.',
        },
      ],
      noteContent: 'Az LLM-ek nem "tudnak" a hagyományos értelemben - statisztikai előrejelzéseket végeznek. Ezért fontos, hogy kritikusan kezeld a válaszaikat és ellenőrizd a tényeket.',
    },
    en: {
      title: 'What is an LLM?',
      intro: 'An LLM (Large Language Model) is an artificial intelligence model trained on vast amounts of text data. These models can understand and generate human language with remarkable accuracy.',
      sections: [
        {
          title: 'How Does It Work?',
          content: 'LLMs use statistical methods to "learn" how language works. They contain billions of parameters that store relationships between words and sentences. When you ask a question, the model generates a response based on learned patterns.',
        },
        {
          title: 'Popular LLMs',
          content: 'The most well-known LLMs include GPT-4 (OpenAI), Claude (Anthropic), Gemini (Google), and Llama (Meta). Each has its own strengths and weaknesses.',
        },
        {
          title: 'Tokens and Context Window',
          content: 'LLMs think in "tokens" - word fragments that text is broken into. The context window determines how much information the model can handle at once. The larger the context window, the longer conversations or documents it can process.',
        },
      ],
      noteContent: 'LLMs don\'t "know" things in the traditional sense - they make statistical predictions. That\'s why it\'s important to critically evaluate their responses and verify facts.',
    },
  };

  const c = content[language];

  const exampleCode = `// Példa LLM API hívásra
const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    { role: "user", content: "Mi az a vibe coding?" }
  ]
});

console.log(response.choices[0].message.content);`;

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

        <ContentBlock type="example" title={language === 'hu' ? 'API hívás példa' : 'API Call Example'}>
          <CodeBlock code={exampleCode} language="javascript" filename="example.js" />
        </ContentBlock>

        <ContentBlock type="note">
          {c.noteContent}
        </ContentBlock>
      </div>

      <LessonNavigation
        prevLesson={{
          path: '/learn/what-is-ai',
          titleKey: 'content.whatIsAi',
        }}
        nextLesson={{
          path: '/learn/agentic-solutions',
          titleKey: 'content.agenticSolutions',
        }}
      />
    </article>
  );
};

export default WhatIsLLM;
