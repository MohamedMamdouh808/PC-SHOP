import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../lib/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (accessToken: string, userData: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we have an active session on mount
    const checkAuth = async () => {
      try {
        const res = await api.post('/auth/refresh'); // Use refresh to get a new access token
        if (res.status === 200) {
          // Success indicates active cookie session
          // We'd ideally fetch profile here, but for MVP registration/login res handles it
          // For mount, we might need a /me endpoint
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    const handleLogout = () => {
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
    };

    window.addEventListener('auth:logout', handleLogout);
    checkAuth();

    return () => window.removeEventListener('auth:logout', handleLogout);
  }, []);

  const login = (accessToken: string, userData: User) => {
    api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    setUser(userData);
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      setUser(null);
      delete api.defaults.headers.common['Authorization'];
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
