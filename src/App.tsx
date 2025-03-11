
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProfileOverview from "./pages/ProfileOverview";
import ProfileContact from "./pages/ProfileContact";
import ProfileOrganization from "./pages/ProfileOrganization";
import TellParrot from "./pages/TellParrot";
import Sources from "./pages/Sources";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/profile/:userId" element={<Profile />}>
            <Route index element={<ProfileOverview />} />
            <Route path="contact" element={<ProfileContact />} />
            <Route path="organization" element={<ProfileOrganization />} />
            <Route path="tell-parrot" element={<TellParrot />} />
            <Route path="sources" element={<Sources />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
