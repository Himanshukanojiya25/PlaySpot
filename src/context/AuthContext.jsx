import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const token = authService.getStoredToken();
      const storedUser = authService.getStoredUser();

      if (token && storedUser) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData.user);
          setIsAuthenticated(true);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          authService.logout();
          setUser(null);
          setIsAuthenticated(false);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true, user: data.user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const signup = async (userData) => {
    try {
      const data = await authService.signup(userData);
      setUser(data.user);
      setIsAuthenticated(true);
      return { success: true, user: data.user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Signup failed'
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateUser = async (userData) => {
    try {
      const data = await authService.updateProfile(userData);
      setUser(data.user);
      return { success: true, user: data.user };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Update failed'
      };
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
