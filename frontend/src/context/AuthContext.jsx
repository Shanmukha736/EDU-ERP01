import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('eduerp_user');
    const storedRole = localStorage.getItem('eduerp_role');
    const storedToken = localStorage.getItem('eduerp_token');

    if (storedUser && storedRole && storedToken) {
      setUser(JSON.parse(storedUser));
      setRole(storedRole);
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (email, password, selectedRole) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const data = response.data;

      if (data.user && data.token) {
        if (data.user.role.toLowerCase() === selectedRole.toLowerCase()) {
          const userData = { id: data.user.id, email: data.user.email, name: data.user.name, role: selectedRole };
          
          setUser(userData);
          setRole(selectedRole);
          setToken(data.token);

          localStorage.setItem('eduerp_user', JSON.stringify(userData));
          localStorage.setItem('eduerp_role', selectedRole);
          localStorage.setItem('eduerp_token', data.token);

          return { success: true };
        } else {
          return { success: false, message: `Wrong credentials.\nThese credentials are registered in the ${data.user.role.toLowerCase()} role.` };
        }
      }
      return { success: false, message: 'Invalid response from server.' };
    } catch (err) {
      return { success: false, message: err.message || 'Login failed.' };
    }
  };

  const register = async (name, email, password, confirmPassword, roleToRegister) => {
    try {
      const response = await api.post('/auth/signup', {
        name,
        email,
        password,
        confirmPassword,
        role: roleToRegister.toUpperCase()
      });
      return { success: true, message: response.data.message };
    } catch (err) {
      return { success: false, message: err.message || 'Registration failed.' };
    }
  };

  const logout = () => {
    setUser(null);
    setRole(null);
    setToken(null);
    localStorage.removeItem('eduerp_user');
    localStorage.removeItem('eduerp_role');
    localStorage.removeItem('eduerp_token');
  };

  const deleteAccount = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      logout();
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || 'Could not delete account.' };
    }
  };

  const updatePassword = async (id, oldPassword, newPassword) => {
    try {
      await api.put(`/users/${id}/password`, { oldPassword, newPassword });
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message || 'Could not update password.' };
    }
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, role, token, isAuthenticated, loading, login, logout, register, deleteAccount, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
