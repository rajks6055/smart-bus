import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Home } from "./pages/Home";
import { LiveTracking } from "./pages/LiveTracking";
import { FareCalculator } from "./pages/FareCalculator";
import { Feedback } from "./pages/Feedback";
import { Language } from "@/types";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import { AuthProvider, ProtectedRoute, useAuth } from "@/hooks/use-auth";

const queryClient = new QueryClient();

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          {!selectedLanguage ? (
            <LanguageSelector onLanguageSelect={handleLanguageSelect} isFullscreen />
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Home />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/live-tracking"
                  element={
                    <ProtectedRoute>
                      <LiveTracking />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/fare-calculator"
                  element={
                    <ProtectedRoute>
                      <FareCalculator />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/feedback"
                  element={
                    <ProtectedRoute>
                      <Feedback />
                    </ProtectedRoute>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
