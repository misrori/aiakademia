import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'hu' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  hu: {
    // Navigation
    'nav.home': 'Kezdőlap',
    'nav.courses': 'Kurzusok',
    'nav.about': 'Rólam',

    // Hero
    'hero.tagline': 'Képes vagy rá.',
    'hero.subtitle': 'Fedezd fel a mesterséges intelligencia világát és építs valódi projekteket vibe coding segítségével.',
    'hero.cta': 'Kezdjük el',
    'hero.secondary': 'Böngéssz a tartalmak között',

    // Sidebar sections
    'sidebar.gettingStarted': 'Kezdő lépések',
    'sidebar.roadmap': 'Útiterv',
    'sidebar.aiBasics': 'AI alapok',
    'sidebar.vibeCoding': 'Vibe Coding',
    'sidebar.tools': 'Eszközök',
    'sidebar.deployment': 'Üzembe helyezés',

    // Content titles
    'content.ideaToLive': 'Ötletből élő weboldal',
    'content.whatIsAi': 'Mi az a mesterséges intelligencia?',
    'content.whatIsLlm': 'Mi az LLM?',
    'content.promptEngineering': 'Prompt Engineering alapok',
    'content.whatIsVibeCoding': 'Mi az a Vibe Coding?',
    'content.agenticSolutions': 'Agentic megoldások',
    'content.lovable': 'Lovable platform',
    'content.supabase': 'Mi az a Supabase?',
    'content.advancedSupabase': 'Haladó Supabase',
    'content.virtualMachine': 'Virtuális gép vásárlása',
    'content.hosting': 'Alkalmazás hosztolása',
    'content.mvp': 'MVP létrehozása',
    'content.github': 'GitHub és GitHub Pages',
    'content.localDev': 'Lokális fejlesztés',
    'content.customDomain': 'Egyedi domain használata',
    'content.chooseDomain': 'Domain név kiválasztása és megvásárlása',

    // Common
    'common.readMore': 'Tovább olvasom',
    'common.nextLesson': 'Következő lecke',
    'common.prevLesson': 'Előző lecke',
    'common.tip': 'Tipp',
    'common.note': 'Megjegyzés',
    'common.warning': 'Figyelem',
    'common.example': 'Példa',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.about': 'About',

    // Hero
    'hero.tagline': 'You are capable.',
    'hero.subtitle': 'Explore the world of artificial intelligence and build real projects with vibe coding.',
    'hero.cta': 'Get Started',
    'hero.secondary': 'Browse Content',

    // Sidebar sections
    'sidebar.gettingStarted': 'Getting Started',
    'sidebar.roadmap': 'Roadmap',
    'sidebar.aiBasics': 'AI Basics',
    'sidebar.vibeCoding': 'Vibe Coding',
    'sidebar.tools': 'Tools',
    'sidebar.deployment': 'Deployment',

    // Content titles
    'content.ideaToLive': 'From Idea to Live Website',
    'content.whatIsAi': 'What is Artificial Intelligence?',
    'content.whatIsLlm': 'What is an LLM?',
    'content.promptEngineering': 'Prompt Engineering Basics',
    'content.whatIsVibeCoding': 'What is Vibe Coding?',
    'content.agenticSolutions': 'Agentic Solutions',
    'content.lovable': 'Lovable Platform',
    'content.supabase': 'What is Supabase?',
    'content.advancedSupabase': 'Advanced Supabase',
    'content.virtualMachine': 'Buying a Virtual Machine',
    'content.hosting': 'Hosting an Application',
    'content.mvp': 'Creating an MVP',
    'content.github': 'GitHub & GitHub Pages',
    'content.localDev': 'Local Development',
    'content.customDomain': 'Using a Custom Domain',
    'content.chooseDomain': 'Choosing and buying a domain name',

    // Common
    'common.readMore': 'Read more',
    'common.nextLesson': 'Next lesson',
    'common.prevLesson': 'Previous lesson',
    'common.tip': 'Tip',
    'common.note': 'Note',
    'common.warning': 'Warning',
    'common.example': 'Example',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('hu');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
