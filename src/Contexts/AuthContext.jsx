// Contexts/AuthContext.jsx
import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('userRole');

    if (savedToken && savedRole) {
      setIsLoggedIn(true);
      setToken(savedToken);
      setUserRole(savedRole);
    }
    setLoading(false);
  }, []);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    setToken(token);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userRole, token, login, logout, loading }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
