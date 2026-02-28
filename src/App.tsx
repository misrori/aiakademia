import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";

import Home from "./pages/Home";
import LearnLayout from "./layouts/LearnLayout";
import IdeaToLive from "./pages/learn/IdeaToLive";
import WhatIsAI from "./pages/learn/WhatIsAI";
import WhatIsLLM from "./pages/learn/WhatIsLLM";
import VibeCoding from "./pages/learn/VibeCoding";
import AgenticSolutions from "./pages/learn/AgenticSolutions";
import CreatingMVP from "./pages/learn/CreatingMVP";
import LovablePage from "./pages/learn/Lovable";
import GitHub from "./pages/learn/GitHub";
import LocalDevelopment from "./pages/learn/LocalDevelopment";
import CustomDomain from "./pages/learn/CustomDomain";
import Supabase from "./pages/learn/Supabase";
import AdvancedSupabase from "./pages/learn/AdvancedSupabase";
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
              <Route path="roadmap" element={<IdeaToLive />} />
              <Route path="what-is-ai" element={<WhatIsAI />} />
              <Route path="what-is-llm" element={<WhatIsLLM />} />
              <Route path="vibe-coding" element={<VibeCoding />} />
              <Route path="agentic-solutions" element={<AgenticSolutions />} />
              <Route path="creating-mvp" element={<CreatingMVP />} />
              <Route path="lovable" element={<LovablePage />} />
              <Route path="github" element={<GitHub />} />
              <Route path="local-dev" element={<LocalDevelopment />} />
              <Route path="custom-domain" element={<CustomDomain />} />
              <Route path="supabase" element={<Supabase />} />
              <Route path="advanced-supabase" element={<AdvancedSupabase />} />
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
