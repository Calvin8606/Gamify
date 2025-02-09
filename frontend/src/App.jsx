import React, { useContext, useState, useEffect } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import Quiz from "./pages/Quiz";
import BalanceSheetVisualization from "./pages/BalanceSheetVisualization";
import EbitdaVisualization from "./pages/EbitdaVisualization";
import { UserContext } from "./context/UserContext";

const App = () => {
  const { user, loading } = useContext(UserContext);
  const [userId, setUserId] = useState(null);

  // Ensure we have the correct userId before rendering routes
  useEffect(() => {
    if (user) {
      setUserId(user.id);
      console.log(`User ID: ${user.id}`);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  return (
    <div>
      {userId && <Navbar />}
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/infopage" element={<InfoPage />} />
        {userId ? (
          <>
            <Route path="/quiz" element={<Quiz userId={userId} />} />
            <Route
              path="/balance-sheet-visualization"
              element={<BalanceSheetVisualization userId={userId} />}
            />
            <Route
              path="/ebitda-visualization"
              element={<EbitdaVisualization userId={userId} />}
            />
          </>
        ) : (
          <Route path="/" /> // Redirect to login if user is not authenticated
        )}
       
      </Routes>
    </div>
  );
};

export default App;
