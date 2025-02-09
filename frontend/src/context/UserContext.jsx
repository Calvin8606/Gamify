import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ✅ Automatically fetch user data when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`/api/user/login`, { email, password });
      const userData = response.data.user;

      setUser(userData);
      setToken(response.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logoutUser = () => {
    console.log("🚀 Logging out user...");

    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];

    // 🚀 Force state update by reloading the page
    setTimeout(() => {
      window.location.reload(); // ✅ Hard refresh forces re-evaluation of state
    }, 100);
};

  return (
    <UserContext.Provider value={{ user, setUser, loading, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;