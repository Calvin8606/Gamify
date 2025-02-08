import React from "react";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
