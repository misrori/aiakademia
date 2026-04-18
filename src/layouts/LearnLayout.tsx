import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

const LearnLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Mobile sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-6 right-6 lg:hidden z-30 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center hover:bg-primary/90 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Main content */}
      <main className="pt-16 lg:pl-72">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default LearnLayout;
