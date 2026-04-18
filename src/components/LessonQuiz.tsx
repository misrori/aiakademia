import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Trophy, ChevronRight, Lightbulb } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import type { QuizQuestion } from '@/data/courseContentTypes';

interface LessonQuizProps {
  questions: QuizQuestion[];
}

function isCorrectAnswer(correctIndex: number | number[], selected: number[]): boolean {
  if (typeof correctIndex === 'number') {
    return selected.length === 1 && selected[0] === correctIndex;
  }
  const sorted = [...correctIndex].sort();
  const selSorted = [...selected].sort();
  return sorted.length === selSorted.length && sorted.every((v, i) => v === selSorted[i]);
}

function getCorrectIndices(correctIndex: number | number[]): number[] {
  return typeof correctIndex === 'number' ? [correctIndex] : correctIndex;
}

const LessonQuiz: React.FC<LessonQuizProps> = ({ questions }) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number[]>([]);
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const question = questions[currentIndex];
  const isMulti = Array.isArray(question?.correctIndex);
  const correct = question ? isCorrectAnswer(question.correctIndex, selected) : false;
  const correctIndices = question ? getCorrectIndices(question.correctIndex) : [];

  const toggleOption = (oi: number) => {
    if (checked) return;
    if (isMulti) {
      setSelected(prev =>
        prev.includes(oi) ? prev.filter(x => x !== oi) : [...prev, oi]
      );
    } else {
      setSelected([oi]);
    }
  };

  const handleCheck = () => {
    if (selected.length === 0) return;
    setChecked(true);
    if (correct) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      setDone(true);
    } else {
      setCurrentIndex(i => i + 1);
      setSelected([]);
      setChecked(false);
    }
  };

  const reset = () => {
    setCurrentIndex(0);
    setSelected([]);
    setChecked(false);
    setScore(0);
    setDone(false);
  };

  const pct = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  if (done) {
    const scoreColor =
      pct === 100
        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
        : pct >= 60
        ? 'border-yellow-500/40 bg-yellow-500/10 text-yellow-400'
        : 'border-red-500/40 bg-red-500/10 text-red-400';

    const scoreMsg =
      language === 'hu'
        ? pct === 100
          ? 'Tökéletes! Mindent tudtál. Gratulálunk!'
          : pct >= 60
          ? 'Jó eredmény! Néhány dologra érdemes visszatérni.'
          : 'Érdemes újra átnézni az anyagot!'
        : pct === 100
        ? 'Perfect! You got everything right. Congratulations!'
        : pct >= 60
        ? 'Good job! A few things are worth revisiting.'
        : 'Consider reviewing the material again!';

    return (
      <div className={`p-8 rounded-2xl border text-center animate-fade-in ${scoreColor}`}>
        <Trophy className="w-12 h-12 mx-auto mb-4" />
        <p className="text-5xl font-bold mb-2">{score} / {questions.length}</p>
        <p className="text-lg font-medium mb-6">{scoreMsg}</p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-current bg-transparent hover:bg-white/5 transition-colors font-semibold"
        >
          <RotateCcw className="w-4 h-4" />
          {language === 'hu' ? 'Újra próbálom' : 'Try again'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>
            {language === 'hu' ? 'Kérdés' : 'Question'} {currentIndex + 1} / {questions.length}
          </span>
          <span>{score} {language === 'hu' ? 'helyes' : 'correct'}</span>
        </div>
        <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500"
            style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question card */}
      <div
        key={question.id}
        className={`p-5 md:p-6 rounded-2xl border transition-all animate-fade-in ${
          checked
            ? correct
              ? 'border-emerald-500/40 bg-emerald-500/5'
              : 'border-red-500/40 bg-red-500/5'
            : 'border-border bg-card'
        }`}
      >
        {/* Question header */}
        <div className="flex items-start gap-3 mb-5">
          <span className="text-xs font-bold bg-primary/15 text-primary px-2.5 py-1 rounded-full shrink-0 mt-0.5">
            {currentIndex + 1}
          </span>
          <div className="flex-1">
            <p className="font-semibold text-foreground leading-relaxed">
              {question.question[language]}
            </p>
            {isMulti && (
              <p className="text-xs text-muted-foreground mt-1">
                {language === 'hu' ? '(Több helyes válasz is lehetséges)' : '(Multiple answers may be correct)'}
              </p>
            )}
          </div>
          {checked && (
            correct
              ? <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              : <XCircle className="w-5 h-5 text-red-500 shrink-0" />
          )}
        </div>

        {/* Options */}
        <div className="space-y-2 ml-9">
          {question.options.map((opt, oi) => {
            const isSelected = selected.includes(oi);
            const isCorrectOpt = correctIndices.includes(oi);

            let cls = 'flex items-center gap-3 p-3 rounded-xl border transition-all select-none ';
            if (checked) {
              cls += isCorrectOpt
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-300 cursor-default '
                : isSelected
                ? 'border-red-500/50 bg-red-500/10 text-red-300 line-through opacity-70 cursor-default '
                : 'border-border/30 opacity-30 text-muted-foreground cursor-default ';
            } else {
              cls += isSelected
                ? 'border-primary bg-primary/10 text-foreground cursor-pointer '
                : 'border-border hover:border-primary/50 hover:bg-muted/40 text-muted-foreground cursor-pointer ';
            }

            const InputComp = isMulti ? 'input' : 'input';
            const inputType = isMulti ? 'checkbox' : 'radio';

            return (
              <label key={oi} className={cls} onClick={() => toggleOption(oi)}>
                <InputComp
                  type={inputType}
                  checked={isSelected}
                  readOnly
                  className="sr-only"
                />
                {isMulti ? (
                  <span className="w-5 h-5 rounded-md border-2 border-current flex items-center justify-center shrink-0">
                    {isSelected && <span className="w-2.5 h-2.5 rounded-sm bg-current" />}
                  </span>
                ) : (
                  <span className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center shrink-0">
                    {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-current" />}
                  </span>
                )}
                <span className="text-sm">{opt[language]}</span>
              </label>
            );
          })}
        </div>

        {/* Feedback after check */}
        {checked && (
          <div className={`mt-5 ml-9 p-3 rounded-xl border animate-fade-in ${correct ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-amber-500/30 bg-amber-500/5'}`}>
            <p className={`text-sm font-semibold mb-1 ${correct ? 'text-emerald-400' : 'text-amber-400'}`}>
              {correct
                ? (language === 'hu' ? '🎉 Helyes! Gratulálunk!' : '🎉 Correct! Well done!')
                : (language === 'hu' ? '❌ Nem sikerült ezúttal.' : '❌ Not quite this time.')}
            </p>
            {question.explanation && (
              <div className="flex items-start gap-2 mt-2">
                <Lightbulb className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground italic">{question.explanation[language]}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 pt-2">
        {!checked ? (
          <button
            onClick={handleCheck}
            disabled={selected.length === 0}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
          >
            {language === 'hu' ? 'Ellenőrzés' : 'Check answer'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            {currentIndex + 1 >= questions.length
              ? (language === 'hu' ? 'Eredmény megtekintése' : 'See results')
              : (language === 'hu' ? 'Következő kérdés' : 'Next question')}
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LessonQuiz;
