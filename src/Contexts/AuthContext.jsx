import React, { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // ✅ NEW
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    const savedRole = localStorage.getItem('userRole');
    const savedUser = localStorage.getItem('user');

    if (savedToken && savedRole && savedUser) {
      setIsLoggedIn(true);
      setToken(savedToken);
      setUserRole(savedRole);
      setUser(JSON.parse(savedUser)); // ✅ restore user
    }

    setLoading(false);
  }, []);

  // ✅ login function updated
  const login = (token, role, userData) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userRole', role);
    localStorage.setItem('user', JSON.stringify(userData));

    setToken(token);
    setUserRole(role);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setUserRole(null);
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userRole,
        token,
        user,       // ✅ expose user
        login,
        logout,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
