import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import LessonNavigation from '@/components/LessonNavigation';

const VirtualMachine: React.FC = () => {
  const { t, language } = useLanguage();

  const content = {
    hu: {
      title: 'Virtuális gép vásárlása',
      intro: 'A virtuális gép (VPS - Virtual Private Server) egy felhőben futó szerver, amit bérelhetsz. Saját szerverként működik, de nincs szükség fizikai hardverre.',
      sections: [
        {
          title: 'Mikor van szükség VPS-re?',
          content: 'Ha olyan alkalmazást futtatsz, ami folyamatos szervert igényel (pl. Discord bot, API szerver, saját hosztolt szolgáltatás), vagy ha több kontrollt szeretnél a környezeted felett, mint amit a platform-as-a-service megoldások nyújtanak.',
        },
        {
          title: 'Népszerű szolgáltatók',
          content: 'DigitalOcean, Linode, Vultr, Hetzner - ezek mind megbízható, költséghatékony választások. A Hetzner különösen jó ár-érték arányú, míg a DigitalOcean dokumentációja és közössége a legerősebb.',
        },
        {
          title: 'Mit válassz?',
          content: 'Kezdőként egy 1GB RAM / 1 CPU magos VPS (kb. $5-6/hó) bőven elég legtöbb projekthez. Linux (Ubuntu) ajánlott, mert a legtöbb tutorial és támogatás ehhez érhető el.',
        },
        {
          title: 'Első lépések',
          content: 'A VPS vásárlás után SSH-val csatlakozol a szerverhez, telepíted a szükséges szoftvereket (Node.js, Docker, stb.), és beállítod az alkalmazásod. Érdemes alapvető biztonságot is konfigurálni: tűzfal, SSH kulcs alapú belépés.',
        },
      ],
      noteContent: 'A VPS karbantartást igényel - frissítések, biztonsági javítások, monitoring. Ha ezt szeretnéd elkerülni, használj menedzselt szolgáltatásokat, mint a Railway vagy Render.',
    },
    en: {
      title: 'Buying a Virtual Machine',
      intro: 'A virtual machine (VPS - Virtual Private Server) is a cloud-hosted server you can rent. It works like your own server, but requires no physical hardware.',
      sections: [
        {
          title: 'When Do You Need a VPS?',
          content: 'If you\'re running an application that requires a continuous server (e.g., Discord bot, API server, self-hosted service), or if you want more control over your environment than platform-as-a-service solutions provide.',
        },
        {
          title: 'Popular Providers',
          content: 'DigitalOcean, Linode, Vultr, Hetzner - these are all reliable, cost-effective choices. Hetzner offers particularly good value, while DigitalOcean has the strongest documentation and community.',
        },
        {
          title: 'What to Choose?',
          content: 'As a beginner, a 1GB RAM / 1 CPU core VPS (about $5-6/month) is plenty for most projects. Linux (Ubuntu) is recommended because most tutorials and support are available for it.',
        },
        {
          title: 'First Steps',
          content: 'After purchasing a VPS, you connect via SSH, install necessary software (Node.js, Docker, etc.), and set up your application. It\'s worth configuring basic security: firewall, SSH key-based login.',
        },
      ],
      noteContent: 'A VPS requires maintenance - updates, security patches, monitoring. If you want to avoid this, use managed services like Railway or Render.',
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

        <ContentBlock type="note">
          {c.noteContent}
        </ContentBlock>
      </div>

      <LessonNavigation
        prevLesson={{
          path: '/learn/advanced-supabase',
          titleKey: 'content.advancedSupabase',
        }}
        nextLesson={{
          path: '/learn/hosting',
          titleKey: 'content.hosting',
        }}
      />
    </article>
  );
};

export default VirtualMachine;
