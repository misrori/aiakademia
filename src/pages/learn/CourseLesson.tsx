import React, { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { BookOpen, ChevronLeft, ChevronRight, Clock, GraduationCap, PlayCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { findLessonById, firstLessonId, getLessonNeighbors } from "@/data/courseContent";
import type { CourseLesson as CourseLessonData } from "@/data/courseContentTypes";
import ProjectOverview from "./ProjectOverview";
import LessonQuiz from "@/components/LessonQuiz";

const hasText = (s: string) => s.trim().length > 0;

const LessonMeta: React.FC<{
  lesson: CourseLessonData;
  language: "hu" | "en";
}> = ({ lesson, language }) => {
  const md = lesson.markdown[language];
  const isReading = lesson.format === "reading" || (lesson.format === "mixed" && !lesson.videoUrl);
  const isVideoOnly = lesson.format === "video";
  const isQuizFormat = lesson.format === "quiz";

  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-2">
        <Clock className="w-4 h-4" />
        {lesson.duration}
      </span>
      {isReading && (
        <span className="inline-flex items-center gap-2">
          <BookOpen className="w-4 h-4" />
          {language === "hu" ? "Olvasmány + gyakorlat" : "Reading + exercises"}
        </span>
      )}
      {isVideoOnly && (
        <span className="inline-flex items-center gap-2">
          <PlayCircle className="w-4 h-4" />
          {language === "hu" ? "Videó lecke" : "Video lesson"}
        </span>
      )}
      {isQuizFormat && (
        <span className="inline-flex items-center gap-2">
          <GraduationCap className="w-4 h-4" />
          {language === "hu" ? "Kvíz + Gyakorlat" : "Quiz + Practice"}
        </span>
      )}
      {lesson.format === "mixed" && lesson.videoUrl && hasText(md) && (
        <span className="inline-flex items-center gap-2">
          <PlayCircle className="w-4 h-4" />
          {language === "hu" ? "Videó + jegyzet" : "Video + notes"}
        </span>
      )}
    </div>
  );
};

const markdownComponents = {
  a: ({ ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a {...props} className="text-primary underline underline-offset-4 hover:text-primary/80" target="_blank" rel="noreferrer" />
  ),
  img: ({ alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img
      alt={alt ?? ""}
      {...props}
      className="my-6 w-full max-w-3xl rounded-xl border border-border bg-muted/30 object-contain shadow-sm"
      loading="lazy"
    />
  ),
};

const CourseLesson: React.FC = () => {
  const { language } = useLanguage();
  const { lessonId } = useParams();

  const activeLessonId = lessonId ?? firstLessonId;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeLessonId]);

  if (activeLessonId === "project-overview") {
    return <ProjectOverview />;
  }

  const lesson = findLessonById(activeLessonId);

  if (!lesson) {
    return <Navigate to={`/learn/${firstLessonId}`} replace />;
  }

  const { previousLesson, nextLesson } = getLessonNeighbors(lesson.id);
  const md = lesson.markdown[language];
  const isQuiz = lesson.format === "quiz";
  const showVideo =
    !isQuiz &&
    lesson.videoUrl &&
    (lesson.format === "video" || lesson.format === "mixed");
  const showMarkdown =
    !isQuiz &&
    hasText(md) &&
    (lesson.format === "reading" || lesson.format === "mixed");

  const practicalTaskMd = lesson.practicalTask?.[language] ?? "";

  return (
    <article className="animate-fade-in pb-16">
      <header className={`mb-8 rounded-2xl border p-6 ${isQuiz ? "border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card" : "border-border bg-card"}`}>
        <p className="text-sm text-primary font-semibold mb-2 flex items-center gap-2">
          {isQuiz && <GraduationCap className="w-4 h-4" />}
          {language === "hu" ? "1. kurzus" : "Course 1"}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3 text-foreground">{lesson.title[language]}</h1>
        <p className="text-muted-foreground mb-4">{lesson.summary[language]}</p>
        <LessonMeta lesson={lesson} language={language} />
      </header>

      {showVideo && (
        <section className="mb-8">
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-border bg-black">
            <iframe
              title={lesson.title[language]}
              src={lesson.videoUrl!}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </section>
      )}

      {showMarkdown && (
        <section className="rounded-2xl border border-border bg-content p-6 md:p-8">
          <div
            className={[
              "prose prose-invert max-w-none",
              "prose-headings:scroll-mt-24 prose-headings:text-foreground",
              "prose-p:text-content-foreground/90 prose-li:text-content-foreground/90",
              "prose-strong:text-foreground prose-a:text-primary",
              "prose-code:text-primary prose-code:bg-muted/80 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none",
              "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
            ].join(" ")}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {md}
            </ReactMarkdown>
          </div>
        </section>
      )}

      {isQuiz && lesson.quizData && lesson.quizData.length > 0 && (
        <section className="mb-8">
          <LessonQuiz questions={lesson.quizData} />
        </section>
      )}

      {hasText(practicalTaskMd) && (
        <section className="mt-6 rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
          <div
            className={[
              "prose prose-invert max-w-none",
              "prose-headings:scroll-mt-24 prose-headings:text-foreground",
              "prose-p:text-content-foreground/90 prose-li:text-content-foreground/90",
              "prose-strong:text-foreground prose-a:text-primary",
              "prose-code:text-primary prose-code:bg-muted/80 prose-code:px-1 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none",
              "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
            ].join(" ")}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {practicalTaskMd}
            </ReactMarkdown>
          </div>
        </section>
      )}

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {previousLesson ? (
          <Link
            to={`/learn/${previousLesson.id}`}
            className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {language === "hu" ? "Előző lecke" : "Previous lesson"}
              </p>
              <p className="font-medium text-foreground">{previousLesson.title[language]}</p>
            </div>
          </Link>
        ) : (
          <div />
        )}

        {nextLesson ? (
          <Link
            to={`/learn/${nextLesson.id}`}
            className="flex items-center justify-end gap-3 rounded-xl border border-border bg-card p-4 hover:border-primary/50 transition-colors text-right"
          >
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {language === "hu" ? "Következő lecke" : "Next lesson"}
              </p>
              <p className="font-medium text-foreground">{nextLesson.title[language]}</p>
            </div>
            <ChevronRight className="w-5 h-5 text-primary" />
          </Link>
        ) : (
          <div />
        )}
      </section>
    </article>
  );
};

export default CourseLesson;
