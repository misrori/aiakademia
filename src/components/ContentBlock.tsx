import React, { ReactNode } from 'react';
import { Lightbulb, AlertCircle, Info, Code2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContentBlockProps {
  type: 'tip' | 'note' | 'warning' | 'example';
  title?: string;
  children: ReactNode;
}

const ContentBlock: React.FC<ContentBlockProps> = ({ type, title, children }) => {
  const { t } = useLanguage();

  const configs = {
    tip: {
      icon: <Lightbulb className="w-5 h-5" />,
      defaultTitle: t('common.tip'),
      className: 'bg-success/10 border-success/30 text-success',
      titleClassName: 'text-success',
    },
    note: {
      icon: <Info className="w-5 h-5" />,
      defaultTitle: t('common.note'),
      className: 'bg-primary/10 border-primary/30 text-primary',
      titleClassName: 'text-primary',
    },
    warning: {
      icon: <AlertCircle className="w-5 h-5" />,
      defaultTitle: t('common.warning'),
      className: 'bg-accent/10 border-accent/30 text-accent',
      titleClassName: 'text-accent',
    },
    example: {
      icon: <Code2 className="w-5 h-5" />,
      defaultTitle: t('common.example'),
      className: 'bg-secondary border-border text-muted-foreground',
      titleClassName: 'text-foreground',
    },
  };

  const config = configs[type];

  return (
    <div className={`rounded-lg border p-4 my-6 ${config.className}`}>
      <div className={`flex items-center gap-2 font-semibold mb-2 ${config.titleClassName}`}>
        {config.icon}
        <span>{title || config.defaultTitle}</span>
      </div>
      <div className="text-content-foreground/90">{children}</div>
    </div>
  );
};

export default ContentBlock;
