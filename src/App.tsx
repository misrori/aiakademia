import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Home from "./pages/Home";
import LearnLayout from "./layouts/LearnLayout";
import WhatIsAI from "./pages/learn/WhatIsAI";
import WhatIsLLM from "./pages/learn/WhatIsLLM";
import VibeCoding from "./pages/learn/VibeCoding";
import AgenticSolutions from "./pages/learn/AgenticSolutions";
import LovablePage from "./pages/learn/Lovable";
import Supabase from "./pages/learn/Supabase";
import CreatingMVP from "./pages/learn/CreatingMVP";
import VirtualMachine from "./pages/learn/VirtualMachine";
import Hosting from "./pages/learn/Hosting";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<LearnLayout />}>
              <Route path="what-is-ai" element={<WhatIsAI />} />
              <Route path="what-is-llm" element={<WhatIsLLM />} />
              <Route path="vibe-coding" element={<VibeCoding />} />
              <Route path="agentic-solutions" element={<AgenticSolutions />} />
              <Route path="lovable" element={<LovablePage />} />
              <Route path="supabase" element={<Supabase />} />
              <Route path="creating-mvp" element={<CreatingMVP />} />
              <Route path="virtual-machine" element={<VirtualMachine />} />
              <Route path="hosting" element={<Hosting />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
