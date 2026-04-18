import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { BookOpen, CheckCircle2, ChevronRight, PlayCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { allLessons, firstCourse } from "@/data/courseContent";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const location = useLocation();
  const activeLessonId = location.pathname.replace("/learn/", "");

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border z-40 overflow-y-auto transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        <nav className="p-4 space-y-6">
          <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/50 p-4">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              {language === "hu" ? "Aktiv kurzus" : "Active course"}
            </p>
            <h2 className="text-sm font-semibold text-sidebar-accent-foreground leading-relaxed">
              {firstCourse.title[language]}
            </h2>
            <p className="mt-2 text-xs text-muted-foreground">
              {allLessons.length} {language === "hu" ? "lecke" : "lessons"}
            </p>
          </div>

          {firstCourse.sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                {section.title[language]}
              </h3>
              <ul className="space-y-1">
                {section.lessons.map((lesson) => {
                  const lessonPath = `/learn/${lesson.id}`;
                  const isActive = location.pathname === lessonPath;
                  const isCompleted = allLessons.findIndex((l) => l.id === lesson.id) < allLessons.findIndex((l) => l.id === activeLessonId);

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
                        <span className={isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}>
                          {isCompleted ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : lesson.format === "reading" ? (
                            <BookOpen className="w-4 h-4" />
                          ) : (
                            <PlayCircle className="w-4 h-4" />
                          )}
                        </span>
                        <span className="flex-1">{lesson.title[language]}</span>
                        <ChevronRight
                          className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                            isActive ? "opacity-100 text-primary" : ""
                          }`}
                        />
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
