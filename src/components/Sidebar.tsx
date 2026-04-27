import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BookOpen, CheckCircle2, ChevronRight, GraduationCap, PlayCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  allCourses,
  findCourseByLessonId,
  firstLessonId,
  getCourseLessonCount,
} from "@/data/courseContent";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const location = useLocation();
  const activeLessonId = location.pathname.replace("/learn/", "");

  const activeCourse =
    findCourseByLessonId(activeLessonId) ??
    findCourseByLessonId(firstLessonId) ??
    allCourses[0];

  const activeCourseIndex = allCourses.findIndex((c) => c.id === activeCourse.id);
  const courseAccent = activeCourseIndex === 0 ? "primary" : "accent";

  const accentClasses = {
    primary: {
      badgeBg: "bg-primary/10",
      badgeText: "text-primary",
      activeIcon: "text-primary",
      hoverIcon: "group-hover:text-primary",
      chevron: "text-primary",
    },
    accent: {
      badgeBg: "bg-accent/10",
      badgeText: "text-accent",
      activeIcon: "text-accent",
      hoverIcon: "group-hover:text-accent",
      chevron: "text-accent",
    },
  }[courseAccent];

  const courseLessonCount = getCourseLessonCount(activeCourse);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border z-40 overflow-y-auto transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <nav className="p-4 space-y-6">
          {/* Course switcher */}
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-wider text-muted-foreground px-1">
              {language === "hu" ? "Kurzus" : "Course"}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {allCourses.map((course, idx) => {
                const accent = idx === 0 ? "primary" : "accent";
                const isActive = course.id === activeCourse.id;
                const firstId = course.sections[0]?.lessons[0]?.id ?? "";
                return (
                  <NavLink
                    key={course.id}
                    to={`/learn/${firstId}`}
                    onClick={onClose}
                    className={`relative rounded-lg px-3 py-2.5 text-xs font-semibold text-center transition-all ${
                      isActive
                        ? accent === "primary"
                          ? "bg-primary/15 text-primary border border-primary/40"
                          : "bg-accent/15 text-accent border border-accent/40"
                        : "bg-sidebar-accent/40 text-sidebar-foreground border border-transparent hover:bg-sidebar-accent/70"
                    }`}
                  >
                    <span className="block text-[10px] uppercase tracking-wider opacity-70 mb-0.5">
                      {language === "hu" ? `${idx + 1}. kurzus` : `Course ${idx + 1}`}
                    </span>
                    <span className="text-[11px] leading-tight block">
                      {idx === 0
                        ? language === "hu" ? "Weboldal" : "Website"
                        : language === "hu" ? "Supabase + Auth" : "Supabase + Auth"}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          </div>

          {/* Active course info */}
          <div className={`rounded-xl border border-sidebar-border ${accentClasses.badgeBg} p-4`}>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className={`w-4 h-4 ${accentClasses.badgeText}`} />
              <p className={`text-xs uppercase tracking-wider font-semibold ${accentClasses.badgeText}`}>
                {language === "hu" ? "Aktív kurzus" : "Active course"}
              </p>
            </div>
            <h2 className="text-sm font-semibold text-sidebar-accent-foreground leading-snug">
              {activeCourse.title[language]}
            </h2>
            <p className="mt-2 text-xs text-muted-foreground">
              {courseLessonCount} {language === "hu" ? "lecke" : "lessons"}
            </p>
          </div>

          {/* Lesson list */}
          {activeCourse.sections.map((section) => {
            const courseLessons = activeCourse.sections.flatMap((s) => s.lessons);
            return (
              <div key={section.id} className="space-y-2">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                  {section.title[language]}
                </h3>
                <ul className="space-y-1">
                  {section.lessons.map((lesson) => {
                    const lessonPath = `/learn/${lesson.id}`;
                    const isActive = location.pathname === lessonPath;
                    const activeIndex = courseLessons.findIndex((l) => l.id === activeLessonId);
                    const lessonIndex = courseLessons.findIndex((l) => l.id === lesson.id);
                    const isCompleted = activeIndex >= 0 && lessonIndex < activeIndex;

                    return (
                      <li key={lesson.id}>
                        <NavLink
                          to={lessonPath}
                          onClick={onClose}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all group ${
                            isActive
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                          }`}
                        >
                          <span
                            className={
                              isActive
                                ? accentClasses.activeIcon
                                : `text-muted-foreground ${accentClasses.hoverIcon}`
                            }
                          >
                            {isCompleted ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : lesson.format === "reading" ? (
                              <BookOpen className="w-4 h-4" />
                            ) : lesson.format === "quiz" ? (
                              <GraduationCap className="w-4 h-4" />
                            ) : (
                              <PlayCircle className="w-4 h-4" />
                            )}
                          </span>
                          <span className="flex-1 leading-snug">{lesson.title[language]}</span>
                          <ChevronRight
                            className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                              isActive ? `opacity-100 ${accentClasses.chevron}` : ""
                            }`}
                          />
                        </NavLink>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
