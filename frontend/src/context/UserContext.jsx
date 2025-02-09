import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Retrieve token from local storage
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  // ✅ Automatically fetch user data on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Ensure user contains `id`
    }
    setLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`/api/user/login`, { email, password });

      const userData = response.data.user;
      setUser(userData); // ✅ Ensure `id` is part of `user`
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, loading, loginUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
