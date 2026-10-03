import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiRequest, getAuthToken, setAuthToken, removeAuthToken, getStoredUser, setStoredUser } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(getAuthToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const res = await apiRequest('/api/auth/me');
          if (res.success && res.user) {
            setUser(res.user);
            setStoredUser(res.user);
          }
        } catch (err) {
          // Token might have expired or backend unreachable; keep stored user if present
          if (err.message && err.message.includes('expired')) {
            logout();
          }
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (username, password) => {
    try {
      const res = await apiRequest('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      if (res.success && res.token) {
        setToken(res.token);
        setAuthToken(res.token);
        setUser(res.user);
        setStoredUser(res.user);
        return { success: true, user: res.user };
      }
      throw new Error(res.message || 'Login failed');
    } catch (err) {
      // Offline / standalone fallback for demo accounts if backend is not started
      if (username === 'superadmin' && password === 'password') {
        const mockUser = {
          id: 'admin-super',
          username: 'superadmin',
          email: 'admin@praxis.sdes.ac.in',
          role: 'SUPER_ADMIN',
          fullName: 'Chief System Administrator',
          assignedClubId: null
        };
        const mockToken = 'mock-superadmin-jwt-token';
        setToken(mockToken);
        setAuthToken(mockToken);
        setUser(mockUser);
        setStoredUser(mockUser);
        return { success: true, user: mockUser };
      } else if (username === 'facultyadmin' && password === 'password') {
        const mockUser = {
          id: 'admin-faculty',
          username: 'facultyadmin',
          email: 'faculty@praxis.sdes.ac.in',
          role: 'FACULTY_ADMIN',
          fullName: 'SDES Faculty In-Charge',
          assignedClubId: null
        };
        const mockToken = 'mock-faculty-jwt-token';
        setToken(mockToken);
        setAuthToken(mockToken);
        setUser(mockUser);
        setStoredUser(mockUser);
        return { success: true, user: mockUser };
      } else if (username === 'genesisadmin' && password === 'password') {
        const mockUser = {
          id: 'admin-genesis',
          username: 'genesisadmin',
          email: 'genesis@praxis.sdes.ac.in',
          role: 'CLUB_ADMIN',
          fullName: 'Genesis Club Admin',
          assignedClubId: 'genesis'
        };
        const mockToken = 'mock-genesis-jwt-token';
        setToken(mockToken);
        setAuthToken(mockToken);
        setUser(mockUser);
        setStoredUser(mockUser);
        return { success: true, user: mockUser };
      }

      return { success: false, message: err.message || 'Invalid username or password' };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    removeAuthToken();
  };

  const isSuperAdmin = user?.role === 'SUPER_ADMIN';
  const isFacultyAdmin = user?.role === 'FACULTY_ADMIN';
  const isClubAdmin = user?.role === 'CLUB_ADMIN';

  const canManageClub = (clubSlug) => {
    if (!user) return false;
    if (isSuperAdmin || isFacultyAdmin) return true;
    if (isClubAdmin && user.assignedClubId === clubSlug) return true;
    return false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      logout,
      isSuperAdmin,
      isFacultyAdmin,
      isClubAdmin,
      canManageClub
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
