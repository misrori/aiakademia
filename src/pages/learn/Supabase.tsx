import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import CodeBlock from '@/components/CodeBlock';
import LessonNavigation from '@/components/LessonNavigation';

const Supabase: React.FC = () => {
  const { t, language } = useLanguage();

  const content = {
    hu: {
      title: 'Mi az a Supabase?',
      intro: 'A Supabase egy nyílt forráskódú Firebase alternatíva, amely PostgreSQL adatbázist, autentikációt, valós idejű előfizetéseket és fájltárolást biztosít. Gyakorlatilag egy teljes backend, amit percek alatt beállíthatsz.',
      sections: [
        {
          title: 'PostgreSQL ereje',
          content: 'A Supabase szíve egy teljes értékű PostgreSQL adatbázis. Ez nem egy leegyszerűsített NoSQL megoldás - ez a világ egyik legmegbízhatóbb relációs adatbázis-kezelője, minden funkcióval.',
        },
        {
          title: 'Beépített autentikáció',
          content: 'Email/jelszó, OAuth (Google, GitHub, stb.), magic link - a Supabase mindezt alapból támogatja. Row Level Security (RLS) segítségével pedig biztosíthatod, hogy a felhasználók csak a saját adataikhoz férjenek hozzá.',
        },
        {
          title: 'Valós idejű képességek',
          content: 'A Supabase Realtime funkcióval az adatbázis változásai azonnal megjelennek a klienseken. Tökéletes chat alkalmazásokhoz, kollaboratív eszközökhöz vagy bármilyen alkalmazáshoz, ahol az azonnali frissítés fontos.',
        },
        {
          title: 'Fájltárolás',
          content: 'A Storage szolgáltatással képeket, dokumentumokat és bármilyen fájlt tárolhatsz. Beépített CDN és képtranszformáció is van, szóval nem kell külön szolgáltatóval bíbelődnöd.',
        },
      ],
      tipContent: 'A Supabase ingyenes tier-je bőven elég a legtöbb hobbi projekthez és MVP-hez. Éles alkalmazásnál érdemes figyelni a használati limiteket.',
    },
    en: {
      title: 'What is Supabase?',
      intro: 'Supabase is an open-source Firebase alternative that provides PostgreSQL database, authentication, real-time subscriptions, and file storage. It\'s essentially a complete backend that you can set up in minutes.',
      sections: [
        {
          title: 'The Power of PostgreSQL',
          content: 'At the heart of Supabase is a full-fledged PostgreSQL database. This isn\'t a simplified NoSQL solution - it\'s one of the world\'s most reliable relational database management systems, with all its features.',
        },
        {
          title: 'Built-in Authentication',
          content: 'Email/password, OAuth (Google, GitHub, etc.), magic link - Supabase supports all of these out of the box. With Row Level Security (RLS), you can ensure users only access their own data.',
        },
        {
          title: 'Real-time Capabilities',
          content: 'With Supabase Realtime, database changes appear instantly on clients. Perfect for chat applications, collaborative tools, or any application where immediate updates matter.',
        },
        {
          title: 'File Storage',
          content: 'The Storage service lets you store images, documents, and any files. There\'s built-in CDN and image transformation, so you don\'t need to deal with separate providers.',
        },
      ],
      tipContent: 'Supabase\'s free tier is plenty for most hobby projects and MVPs. For production applications, keep an eye on usage limits.',
    },
  };

  const c = content[language];

  const exampleCode = `import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://your-project.supabase.co',
  'your-anon-key'
)

// Adatok lekérdezése
const { data, error } = await supabase
  .from('posts')
  .select('*')
  .order('created_at', { ascending: false })`;

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
          <CodeBlock code={exampleCode} language="typescript" filename="supabase-example.ts" />
        </ContentBlock>

        <ContentBlock type="tip">
          {c.tipContent}
        </ContentBlock>
      </div>

      <LessonNavigation
        prevLesson={{
          path: '/learn/lovable',
          titleKey: 'content.lovable',
        }}
        nextLesson={{
          path: '/learn/virtual-machine',
          titleKey: 'content.virtualMachine',
        }}
      />
    </article>
  );
};

export default Supabase;
