import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Mỗi lần load trang, kiểm tra xem có token trong localStorage không
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        // Lấy thông tin role (có thể là mảng hoặc chuỗi)
        const roles = decodedUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        setUser({
          ...decodedUser,
          roles: Array.isArray(roles) ? roles : [roles]
        });
      } catch (error) {
        console.error('Token không hợp lệ', error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  const login = token => {
    localStorage.setItem('token', token);
    const decodedUser = jwtDecode(token);
    const roles = decodedUser['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    setUser({
      ...decodedUser,
      roles: Array.isArray(roles) ? roles : [roles]
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
