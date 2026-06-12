import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock JWT check on initial load
    const token = localStorage.getItem('jwt_token');
    if (token) {
      // Simulate validation delay
      setTimeout(() => {
        setUser({ id: 'u1', name: 'Commander Admin', email: 'commander@defense.gov', role: 'Admin' });
        setLoading(false);
      }, 500);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'commander@defense.gov' && password === 'admin') {
          const mockUser = { id: 'u1', name: 'Commander Admin', email, role: 'Admin' };
          localStorage.setItem('jwt_token', 'mock_jwt_token_xyz');
          setUser(mockUser);
          resolve(mockUser);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 800);
    });
  };

  const register = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!email || !password || !name) {
          reject(new Error('All fields are required'));
        } else {
          const mockUser = { id: `u${Date.now()}`, name, email, role: 'Analyst' };
          localStorage.setItem('jwt_token', 'mock_jwt_token_xyz');
          setUser(mockUser);
          resolve(mockUser);
        }
      }, 1000);
    });
  };

  const logout = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
