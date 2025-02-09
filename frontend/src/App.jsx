import React, { useContext } from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Quiz from "./pages/Quiz";
import BalanceSheetVisualization from "./pages/BalanceSheetVisualization";
import EbitdaVisualization from "./pages/EbitdaVisualization";
import { UserContext } from "./context/UserContext";

const { user, setUser } = useContext(UserContext);

const testUserId = user._id;

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/quiz" element={<Quiz userId={testUserId} />} />
        <Route
          path="/balance-sheet-visualization"
          element={<BalanceSheetVisualization userId={testUserId} />}
        />
        <Route
          path="/ebitda-visualization"
          element={<EbitdaVisualization userId={testUserId} />}
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
