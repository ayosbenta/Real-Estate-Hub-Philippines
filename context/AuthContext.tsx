
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from './RouterContext';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (user: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { navigate } = useRouter();

  useEffect(() => {
    try {
        const loggedIn = sessionStorage.getItem('isAdminAuthenticated') === 'true';
        setIsAuthenticated(loggedIn);
    } catch (e) {
        console.error('Could not access session storage:', e);
    }
  }, []);

  const login = (user: string, pass: string): boolean => {
    if (user === 'admin' && pass === 'admin') {
      try {
        sessionStorage.setItem('isAdminAuthenticated', 'true');
        setIsAuthenticated(true);
        navigate('#/admin/dashboard');
      } catch(e) {
        console.error('Could not access session storage:', e);
        // Still allow login for this session if storage fails
        setIsAuthenticated(true);
        navigate('#/admin/dashboard');
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    try {
        sessionStorage.removeItem('isAdminAuthenticated');
    } catch (e) {
        console.error('Could not access session storage:', e);
    }
    setIsAuthenticated(false);
    navigate('#/admin');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
