import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Brain, 
  MessageSquare, 
  Wand2, 
  Bot, 
  Heart, 
  Database,
  Server,
  Rocket,
  Lightbulb,
  ChevronRight
} from 'lucide-react';

interface SidebarItem {
  titleKey: string;
  path: string;
  icon: React.ReactNode;
}

interface SidebarSection {
  titleKey: string;
  items: SidebarItem[];
}

const sidebarSections: SidebarSection[] = [
  {
    titleKey: 'sidebar.aiBasics',
    items: [
      { titleKey: 'content.whatIsAi', path: '/learn/what-is-ai', icon: <Brain className="w-4 h-4" /> },
      { titleKey: 'content.whatIsLlm', path: '/learn/what-is-llm', icon: <MessageSquare className="w-4 h-4" /> },
      { titleKey: 'content.agenticSolutions', path: '/learn/agentic-solutions', icon: <Bot className="w-4 h-4" /> },
    ],
  },
  {
    titleKey: 'sidebar.vibeCoding',
    items: [
      { titleKey: 'content.whatIsVibeCoding', path: '/learn/vibe-coding', icon: <Wand2 className="w-4 h-4" /> },
      { titleKey: 'content.mvp', path: '/learn/creating-mvp', icon: <Lightbulb className="w-4 h-4" /> },
    ],
  },
  {
    titleKey: 'sidebar.tools',
    items: [
      { titleKey: 'content.lovable', path: '/learn/lovable', icon: <Heart className="w-4 h-4" /> },
      { titleKey: 'content.supabase', path: '/learn/supabase', icon: <Database className="w-4 h-4" /> },
    ],
  },
  {
    titleKey: 'sidebar.deployment',
    items: [
      { titleKey: 'content.virtualMachine', path: '/learn/virtual-machine', icon: <Server className="w-4 h-4" /> },
      { titleKey: 'content.hosting', path: '/learn/hosting', icon: <Rocket className="w-4 h-4" /> },
    ],
  },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const location = useLocation();

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
        className={`fixed top-16 left-0 bottom-0 w-72 bg-sidebar border-r border-sidebar-border z-40 overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <nav className="p-4 space-y-6">
          {sidebarSections.map((section, index) => (
            <div key={index} className="space-y-2">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                {t(section.titleKey)}
              </h3>
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        onClick={onClose}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group ${
                          isActive
                            ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                            : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                        }`}
                      >
                        <span className={isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'}>
                          {item.icon}
                        </span>
                        <span className="flex-1">{t(item.titleKey)}</span>
                        <ChevronRight className={`w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity ${
                          isActive ? 'opacity-100 text-primary' : ''
                        }`} />
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
