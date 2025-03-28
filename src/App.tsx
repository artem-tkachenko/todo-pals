
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import AssignedByMe from "./pages/AssignedByMe";
import Archived from "./pages/Archived";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import AuthLayout from "./components/layout/AuthLayout";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

// Create a route guard component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // We'll fetch the auth state from localStorage for the initial check
  const storedUser = localStorage.getItem('user');
  
  if (!storedUser) {
    // Redirect to the login page if there's no user in localStorage
    return <Navigate to="/sign-in" replace />;
  }
  
  return <>{children}</>;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner position="top-center" />
            <Routes>
              {/* Auth Routes */}
              <Route element={<AuthLayout />}>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
              </Route>
              
              {/* App Routes - Protected */}
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/assigned-by-me" element={<ProtectedRoute><AssignedByMe /></ProtectedRoute>} />
              <Route path="/archived" element={<ProtectedRoute><Archived /></ProtectedRoute>} />
              
              {/* Not Found */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
