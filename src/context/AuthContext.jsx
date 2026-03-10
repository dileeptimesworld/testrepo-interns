import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seed dummy credentials if no users exist
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (existingUsers.length === 0) {
      const dummyUser = { 
        name: 'Demo User', 
        email: 'admin@example.com', 
        password: 'password123' 
      };
      localStorage.setItem('users', JSON.stringify([dummyUser]));
    }

    const savedUser = localStorage.getItem('activeUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signup = (userData) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(u => u.email === userData.email);
    
    if (userExists) {
      throw new Error('User already exists');
    }

    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);

    if (foundUser) {
      localStorage.setItem('activeUser', JSON.stringify(foundUser));
      setUser(foundUser);
      return true;
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    localStorage.removeItem('activeUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
