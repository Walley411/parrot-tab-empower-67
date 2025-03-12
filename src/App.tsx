
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProfileOverview from "./pages/ProfileOverview";
import ProfileContact from "./pages/ProfileContact";
import ProfileOrganization from "./pages/ProfileOrganization";
import Parrot from "./pages/Parrot";
import TellParrot from "./pages/TellParrot";
import Sources from "./pages/Sources";
import Domains from "./pages/Domains";

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
            <Route path="parrot" element={<Parrot />}>
              <Route index element={<Navigate to="tell-parrot" replace />} />
              <Route path="tell-parrot" element={<TellParrot />} />
              <Route path="sources" element={<Sources />} />
              <Route path="domains" element={<Domains />} />
            </Route>
            {/* Redirect old routes to new structure */}
            <Route path="tell-parrot" element={<Navigate to="/profile/:userId/parrot/tell-parrot" replace />} />
            <Route path="sources" element={<Navigate to="/profile/:userId/parrot/sources" replace />} />
            <Route path="domains" element={<Navigate to="/profile/:userId/parrot/domains" replace />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
