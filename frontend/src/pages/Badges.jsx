import React, { useEffect, useState } from "react";
import axios from "axios";

const Badges = ({ userId }) => {
  const [userBadges, setUserBadges] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Define all available badges
  const allBadges = ["Rockstar", "Bronze", "Silver", "Gold", "Diamond"];

  useEffect(() => {
    if (!userId) return;

    const fetchBadges = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4781/api/user/${userId}`
        );
        setUserBadges(response.data.badges || []);
        setTotalScore(response.data.totalScore || 0);
      } catch (error) {
        console.error("Error fetching badges:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBadges();
  }, [userId]);

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-md text-black">
      <div className="text-center text-2xl font-extrabold pb-3 text-white">
        <p>Total Points:</p>
        {totalScore}
      </div>
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
        🏅 Your Badges
      </h2>

      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading badges...</p>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-4">
          {allBadges.map((badge, index) => {
            const isEarned = userBadges.includes(badge);

            return (
              <div
                key={index}
                className={`px-6 py-3 text-lg font-semibold rounded-full shadow-lg border 
                  ${
                    isEarned
                      ? "bg-yellow-400 text-gray-700 border-yellow-500"
                      : "bg-gray-400 text-gray-700 border-gray-500"
                  }`}
              >
                {badge}
              </div>
            );
          })}
        </div>
      )}

      {/* Badge Info Section */}
      <div className="mt-8">
        <section className="bg-[#31344A] p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-yellow-300">
            Badge Information
          </h2>
          <p className="mt-2 text-lg text-white">
            <strong>
              -----------------------------------------------------------------------------
              <p>🏆 Rockstar: Complete Quiz</p>
              <p>🥉 Bronze: 0 points</p>
              <p>🥈 Silver: 50 points</p>
              <p>🥇 Gold: 100 points</p>
              <p>💎 Diamond: 200 points</p>
            </strong>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Badges;
