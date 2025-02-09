import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create UserContext
export const UserContext = createContext();

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Retrieve token from local storage
  const token = localStorage.getItem("token");

  // 🌐 Set Axios default authorization headers
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  // ✅ Automatically fetch user data on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // ✅ User login function
  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`/api/user/login`, { email, password });

      setUser(response.data.user); // ✅ Ensure setUser is defined here
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // ✅ User logout function
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser, // ✅ Add setUser to context
        loading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
