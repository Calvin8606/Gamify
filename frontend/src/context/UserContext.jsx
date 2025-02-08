import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create UserContext
export const UserContext = createContext();

// UserProvider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user data by ID (Replace `userId` with actual user ID from auth or state)
  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`/api/user/${userId}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Update user data
  const updateUser = async (userId, updatedData) => {
    try {
      const response = await axios.put(`/api/user/${userId}`, updatedData);
      setUser(response.data);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      await axios.delete(`/api/user/${userId}`);
      setUser(null);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Reward a user with a badge
  const rewardBadge = async (userId, badge) => {
    try {
      const response = await axios.post(`/api/user/${userId}/reward/badge`, {
        badge,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error awarding badge:", error);
    }
  };

  // Add points to a user
  const addPoints = async (userId, points) => {
    try {
      const response = await axios.post(`/api/user/${userId}/reward/points`, {
        points,
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error adding points:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        fetchUser,
        updateUser,
        deleteUser,
        rewardBadge,
        addPoints,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
