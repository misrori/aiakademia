import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import { ArrowRight, Brain, Wand2, Rocket, Sparkles } from 'lucide-react';

const Home: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      titleKey: 'content.whatIsAi',
      descKey: 'Ismerd meg az AI alapjait és működési elveit.',
      path: '/learn/what-is-ai',
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      titleKey: 'content.whatIsVibeCoding',
      descKey: 'Tanulj meg programozni AI segítségével.',
      path: '/learn/vibe-coding',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      titleKey: 'content.mvp',
      descKey: 'Hozd létre első működő projektedet.',
      path: '/learn/creating-mvp',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[var(--gradient-glow)] animate-pulse-glow" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Akadémia</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-gradient glow-text">{t('hero.tagline')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('hero.subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link
              to="/learn/what-is-ai"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
            >
              {t('hero.cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/learn/what-is-ai"
              className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/80 transition-all"
            >
              {t('hero.secondary')}
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link
                key={index}
                to={feature.path}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all hover:-translate-y-1 card-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-muted-foreground">{feature.descKey}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-3xl md:text-4xl font-medium text-foreground leading-relaxed">
            "A mesterséges intelligencia nem helyettesít téged.{' '}
            <span className="text-gradient">Megerősít.</span>"
          </blockquote>
          <p className="mt-6 text-muted-foreground">— Képes vagy rá Akadémia</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold">Képes vagy rá</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 Képes vagy rá Akadémia. Minden jog fenntartva.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
