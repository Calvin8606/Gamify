import React, { useEffect, useState } from "react";
import axios from "axios";

const Badges = ({ userId }) => {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return; // Prevent API call if userId is not set

    const fetchBadges = async () => {
      try {
        const response = await axios.get(`http://localhost:4781/api/user/${userId}`);
        setBadges(response.data.badges || []);
      } catch (error) {
        console.error("Error fetching badges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md text-black">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
        🏅 Your Badges
      </h2>

      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading badges...</p>
        </div>
      ) : badges.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="px-6 py-3 bg-yellow-400 text-white text-lg font-semibold rounded-full shadow-lg border border-yellow-500"
            >
              {badge}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-4">
          ❌ No badges earned yet.
        </p>
      )}
    </div>
  );
};

export default Badges;