import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Navbar from "./components/Navbar";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import InfoPage from "./pages/InfoPage";
import Quiz from "./pages/Quiz";
import BalanceSheetVisualization from "./pages/BalanceSheetVisualization";
import EbitdaVisualization from "./pages/EbitdaVisualization";

const testUserId = "67a780bea849cd0d0fcd62f8";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/quiz" element={<Quiz userId={testUserId}/>} />
        <Route path="/balance-sheet-visualization" element={<BalanceSheetVisualization />} />
        <Route path="/ebitda-visualization" element={<EbitdaVisualization />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/infopage" element={<InfoPage />} /> 
      </Routes>
    </div>
  );
};

export default App;
