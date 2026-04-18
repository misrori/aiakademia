export type LocalizedText = {
  hu: string;
  en: string;
};

/** Egy leckén belül: csak szöveg, csak videó, (régi) videó+jegyzet együtt, vagy kvíz. */
export type LessonFormat = "reading" | "video" | "mixed" | "quiz";

export interface QuizQuestion {
  id: string;
  question: LocalizedText;
  options: LocalizedText[];
  /** Single answer: number. Multiple correct answers: number[]. */
  correctIndex: number | number[];
  explanation?: LocalizedText;
}

export interface CourseLesson {
  id: string;
  format: LessonFormat;
  title: LocalizedText;
  summary: LocalizedText;
  duration: string;
  /** Beágyazott videó URL; olvasmánynál `null`. */
  videoUrl: string | null;
  markdown: LocalizedText;
  /** Kvíz kérdések – csak `format: "quiz"` esetén töltendő ki. */
  quizData?: QuizQuestion[];
  /** Szekció végi gyakorlati feladat – kvíz lecke után jelenik meg. */
  practicalTask?: LocalizedText;
}

export interface CourseSection {
  id: string;
  title: LocalizedText;
  lessons: CourseLesson[];
}

export interface Course {
  id: string;
  title: LocalizedText;
  subtitle: LocalizedText;
  sections: CourseSection[];
}
