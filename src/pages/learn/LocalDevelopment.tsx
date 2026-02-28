import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import CodeBlock from '@/components/CodeBlock';
import LessonNavigation from '@/components/LessonNavigation';

const LocalDevelopment: React.FC = () => {
    const { language } = useLanguage();

    const content = {
        hu: {
            title: 'Lokális fejlesztés',
            intro: 'Bár a Lovable-ben sokat tudsz fejleszteni, eljön a pont, amikor le szeretnéd tölteni a kódot a saját gépedre, hogy ott finomítsd tovább. Itt jön képbe az Antigravity és a cloud kód.',
            sections: [
                {
                    title: 'A projekt leklónozása',
                    content: 'A GitHub-ra kiexportált kódot le kell töltened a saját számítógépedre. Ehhez a "git clone" parancsot használjuk. Ez létrehoz egy másolatot a gépeden, ahol szabadon kísérletezhetsz.',
                },
                {
                    title: 'Fejlesztőeszközök: Antigravity',
                    content: 'Az Antigravity (vagy hasonló AI asszisztensek) segítségével lokálisan is "vibe coding" stílusban fejleszthetsz. Megkérheted, hogy javítson ki egy bugot, adjon hozzá egy új oldalt, vagy alakítsa át a designt - pont úgy, ahogy a Lovable tette, de immár a saját környezetedben.',
                },
                {
                    title: 'Cloud Kód és CLI',
                    content: 'A modern fejlesztéshez hozzátartoznak a CLI (parancssori) eszközök. Megismerheted a build folyamatokat, a függőségek kezelését (npm/bun), és a deploy szkriptek használatát, amivel gyorsabbá és megbízhatóbbá válik a munka.',
                },
                {
                    title: 'Eszközök a folytatáshoz',
                    content: 'Milyen irányba mehetsz tovább? Használhatsz VS Code-ot, Cursor-t, vagy direkt az Antigravity platformját. Mindegyik eszköz segít abban, hogy a Lovable-ben elkezdett alapokat profi szintű alkalmazássá fejleszd.',
                },
            ],
            tipContent: 'Mindig használj git ágakat (branches), amikor új funkción dolgozol lokálisan. Így ha valami nem sikerül, könnyen visszatérhetsz a legutóbbi működő verzióhoz.',
        },
        en: {
            title: 'Local Development',
            intro: 'While you can do a lot in Lovable, there comes a point where you want to download the code to your own machine to refine it further. This is where Antigravity and cloud code come into play.',
            sections: [
                {
                    title: 'Cloning the Project',
                    content: 'You need to download the code exported to GitHub to your own computer. For this, we use the "git clone" command. This creates a copy on your machine where you can experiment freely.',
                },
                {
                    title: 'Dev Tools: Antigravity',
                    content: 'With Antigravity (or similar AI assistants), you can continue "vibe coding" locally. You can ask it to fix a bug, add a new page, or redesign a component - just like Lovable did, but now in your own environment.',
                },
                {
                    title: 'Cloud Code & CLI',
                    content: 'Modern development involves CLI (Command Line Interface) tools. You can learn about build processes, dependency management (npm/bun), and using deploy scripts to make your work faster and more reliable.',
                },
                {
                    title: 'Tools for Moving Forward',
                    content: 'Which direction can you go next? You can use VS Code, Cursor, or the Antigravity platform directly. Each of these tools helps you evolve the foundation started in Lovable into a professional-grade application.',
                },
            ],
            tipContent: 'Always use git branches when working on new features locally. That way, if something goes wrong, you can easily revert to the last working version.',
        },
    };

    const c = content[language];

    const cloneCode = `git clone https://github.com/username/your-repo-name.git
cd your-repo-name
npm install
npm run dev`;

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
                    <CodeBlock code={cloneCode} language="bash" filename="terminal" />
                </ContentBlock>

                <ContentBlock type="tip">
                    {c.tipContent}
                </ContentBlock>
            </div>

            <LessonNavigation
                prevLesson={{
                    path: '/learn/github',
                    titleKey: 'content.github',
                }}
                nextLesson={{
                    path: '/learn/custom-domain',
                    titleKey: 'content.customDomain',
                }}
            />
        </article>
    );
};

export default LocalDevelopment;
