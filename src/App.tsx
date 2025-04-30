
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ProfileOverview from "./pages/ProfileOverview";
import ProfileContact from "./pages/ProfileContact";
import ProfileOrganization from "./pages/ProfileOrganization";
import Governance from "./pages/Parrot";
import Department from "./pages/TellParrot";
import Systems from "./pages/Systems";
import Domains from "./pages/Domains";
import Roles from "./pages/Roles";
import Copilot from "./pages/Copilot";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
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
              <Route path="governance" element={<Governance />}>
                <Route index element={<Navigate to="department" replace />} />
                <Route path="department" element={<Department />} />
                <Route path="systems" element={<Systems />} />
                <Route path="domains" element={<Domains />} />
                <Route path="roles" element={<Roles />} />
              </Route>
              <Route path="copilot" element={<Copilot />} />
              <Route path="activity" element={<Copilot />} />
              <Route path="chat" element={<Copilot />} />
              <Route path="teams" element={<Copilot />} />
              <Route path="calendar" element={<Copilot />} />
              <Route path="calls" element={<Copilot />} />
              <Route path="onedrive" element={<Copilot />} />
              {/* Redirect old routes to new structure */}
              <Route path="parrot" element={<Navigate to="governance" replace />} />
              <Route path="parrot/tell-parrot" element={<Navigate to="governance/department" replace />} />
              <Route path="parrot/sources" element={<Navigate to="governance/systems" replace />} />
              <Route path="parrot/domains" element={<Navigate to="governance/domains" replace />} />
              <Route path="tell-parrot" element={<Navigate to="governance/department" replace />} />
              <Route path="sources" element={<Navigate to="governance/systems" replace />} />
              <Route path="domains" element={<Navigate to="governance/domains" replace />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
