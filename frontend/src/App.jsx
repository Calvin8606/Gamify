import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BalanceSheetQuiz from "./pages/BalanceSheetQuiz";
import IncomeStatementQuiz from "./pages/IncomeStatementQuiz";
import BalanceSheetVisualization from "./pages/BalanceSheetVisualization";
import EbitdaVisualization from "./pages/EbitdaVisualization";

const testUserId = "67a780bea849cd0d0fcd62f8";

const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/balance-sheet-quiz" element={<BalanceSheetQuiz userId={testUserId}/>} />
        <Route path="/income-statement-quiz" element={<IncomeStatementQuiz userId={testUserId}/>} />
        <Route path="/balance-sheet-visualization" element={<BalanceSheetVisualization />} />
        <Route path="/ebitda-visualization" element={<EbitdaVisualizationnpm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
