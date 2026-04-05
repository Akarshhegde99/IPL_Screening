import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';

import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import MatchBookingPage from './pages/MatchBookingPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessPage from './pages/SuccessPage';
import InvoicePage from './pages/InvoicePage';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/auth" />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <BookingProvider>
          <div className="min-h-screen flex flex-col font-sans bg-hcDark text-gray-100">
            {/* Simple Navbar */}
            <nav className="p-4 border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
              <div className="max-w-6xl mx-auto flex items-center justify-between">
                <div className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
                  Harvey's Cafe
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                  IPL Screenings
                </div>
              </div>
            </nav>

            <main className="flex-1 w-full max-w-6xl mx-auto p-4 md:p-8">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/book/:matchId" element={
                  <ProtectedRoute>
                    <MatchBookingPage />
                  </ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                } />
                <Route path="/success" element={<SuccessPage />} />
                <Route path="/invoice/:id" element={<InvoicePage />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Routes>
            </main>
          </div>
        </BookingProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
