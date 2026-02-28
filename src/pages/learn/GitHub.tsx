import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ContentBlock from '@/components/ContentBlock';
import LessonNavigation from '@/components/LessonNavigation';

const GitHub: React.FC = () => {
    const { language } = useLanguage();

    const content = {
        hu: {
            title: 'GitHub és GitHub Pages',
            intro: 'A GitHub a világ legnagyobb kódtároló platformja. Itt nemcsak tárolhatod a projektjeidet, hanem ingyenesen weboldalként is publikálhatod őket a GitHub Pages segítségével.',
            sections: [
                {
                    title: 'Mi az a GitHub?',
                    content: 'A GitHub egy felhőalapú szolgáltatás, amely a Git verziókezelő rendszert használja. Lehetővé teszi a fejlesztők számára, hogy nyomon kövessék a kódváltozásokat, együttműködjenek másokkal, és biztonságban tudják a munkájukat.',
                },
                {
                    title: 'Exportálás Lovable-ből GitHub-ra',
                    content: 'A Lovable egyik leghasznosabb funkciója a "GitHub Sync" vagy exportálás. Amikor elkészült az MVP-d, egy gombnyomással létrehozhatsz egy új repository-t a GitHubodon, ahová a Lovable feltölti a teljes forráskódot. Innen kezdve te irányítod a kódot.',
                },
                {
                    title: 'GitHub Pages: Ingyenes Webhosztolás',
                    content: 'A GitHub Pages segítségével a repository-dban lévő kódot (HTML, CSS, JS) pillanatok alatt élő weboldallá alakíthatod. Frontend projektekhez (mint amilyen a Lovable-ben készült React app) ez az egyik legegyszerűbb és leggyorsabb publikálási mód.',
                },
                {
                    title: 'Lépések a publikáláshoz',
                    content: '1. Exportáld a kódot GitHub-ra. 2. A repository beállításaiban (Settings) keresd meg a "Pages" menüpontot. 3. Válaszd ki a forrást (általában a "gh-pages" ágat vagy egy GitHub Action-t). 4. Pár perc múlva az oldalad elérhető lesz a username.github.io/repo-name címen.',
                },
            ],
            tipContent: 'Használj GitHub Action-öket az automatikus deploy-hoz. Így minden alkalommal, amikor változtatsz a kódon, az oldalad magától frissül.',
        },
        en: {
            title: 'GitHub & GitHub Pages',
            intro: 'GitHub is the world\'s largest code hosting platform. It\'s not just for storing code; you can also publish your projects as live websites for free using GitHub Pages.',
            sections: [
                {
                    title: 'What is GitHub?',
                    content: 'GitHub is a cloud-based service that uses the Git version control system. It allows developers to track code changes, collaborate with others, and keep their work secure.',
                },
                {
                    title: 'Exporting from Lovable to GitHub',
                    content: 'One of Lovable\'s most useful features is "GitHub Sync" or exporting. When your MVP is ready, you can create a new repository on your GitHub with one click, and Lovable will upload the entire source code. From there, you have full control over the code.',
                },
                {
                    title: 'GitHub Pages: Free Web Hosting',
                    content: 'With GitHub Pages, you can quickly turn the code in your repository (HTML, CSS, JS) into a live website. For frontend projects (like the React apps built in Lovable), this is one of the simplest and fastest ways to publish.',
                },
                {
                    title: 'Steps to Publish',
                    content: '1. Export your code to GitHub. 2. Go to "Settings" in your repository and find "Pages". 3. Select the source (usually the "gh-pages" branch or a GitHub Action). 4. After a few minutes, your site will be live at username.github.io/repo-name.',
                },
            ],
            tipContent: 'Use GitHub Actions for automatic deployment. This way, every time you make changes to the code, your site updates itself automatically.',
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
                    path: '/learn/lovable',
                    titleKey: 'content.lovable',
                }}
                nextLesson={{
                    path: '/learn/local-dev',
                    titleKey: 'content.localDev',
                }}
            />
        </article>
    );
};

export default GitHub;
