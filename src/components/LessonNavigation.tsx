import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LessonNavigationProps {
  prevLesson?: {
    path: string;
    titleKey: string;
  };
  nextLesson?: {
    path: string;
    titleKey: string;
  };
}

const LessonNavigation: React.FC<LessonNavigationProps> = ({ prevLesson, nextLesson }) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-12 pt-8 border-t border-border">
      {prevLesson ? (
        <Link
          to={prevLesson.path}
          className="flex-1 group p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>{t('common.prevLesson')}</span>
          </div>
          <p className="font-medium text-foreground">{t(prevLesson.titleKey)}</p>
        </Link>
      ) : (
        <div className="flex-1" />
      )}

      {nextLesson && (
        <Link
          to={nextLesson.path}
          className="flex-1 group p-4 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-card/80 transition-all text-right"
        >
          <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground mb-1">
            <span>{t('common.nextLesson')}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
          <p className="font-medium text-foreground">{t(nextLesson.titleKey)}</p>
        </Link>
      )}
    </div>
  );
};

export default LessonNavigation;
