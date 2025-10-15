// src/context/AuthContext.js
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = (id, pw) => {
    // 고정된 아이디/비번 확인
    if (id === "test" && pw === "1234") {
      setIsLogin(true);
      setUserId(id);
      localStorage.setItem("loginInfo", JSON.stringify({ userId: id }));
      return true; 
    }
    return false; 
  };

  const handleLogout = () => {
    setIsLogin(false);
    setUserId(null);
    localStorage.removeItem("loginInfo");
  };

  return (
    <AuthContext.Provider value={{ isLogin, userId, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
