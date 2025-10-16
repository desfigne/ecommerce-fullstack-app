import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [isLogin, setIsLogin] = useState(localStorage.getItem("isLogin") === "true");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("loginUser")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const sync = () => {
      setIsLogin(localStorage.getItem("isLogin") === "true");
      try {
        setUser(JSON.parse(localStorage.getItem("loginUser")) || null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  
}
