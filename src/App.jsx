import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { BookingProvider } from './context/BookingContext';
import { useAuth } from './hooks/useAuth';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';

import Home from './pages/public/Home';
import Explore from './pages/public/Explore';
import FacilityDetails from './pages/public/FacilityDetails';
import Login from './pages/public/Login';
import Signup from './pages/public/Signup';
import Dashboard from './pages/user/Dashboard';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return !isAuthenticated ? children : <Navigate to="/dashboard" />;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<><Navbar /><Home /><Footer /></>} />
      <Route path="/explore" element={<><Navbar /><Explore /><Footer /></>} />
      <Route path="/facility/:id" element={<><Navbar /><FacilityDetails /><Footer /></>} />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Navbar />
            <Dashboard />
            <Footer />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <BookingProvider>
            <div className="min-h-screen bg-white dark:bg-dark-950 text-dark-900 dark:text-dark-50">
              <AppRoutes />
            </div>
          </BookingProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
