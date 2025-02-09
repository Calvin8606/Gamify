import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";


const Navbar = () => {
  const { logoutUser } = useContext(UserContext); 
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser(); // Calls the logout function from context
    navigate("/"); // Redirect to login page
  };
  
  return (
    <nav className="bg-[#27293D] text-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-yellow-400">
          <Link to="/">Money Stretch</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg font-medium">
          <Link to="/home" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link to="/infopage" className="hover:text-yellow-400 transition-colors">
            Info
          </Link>
          <Link to="/quiz" className="hover:text-yellow-400 transition-colors">
            Quiz
          </Link>
          <Link to="/balance-sheet-visualization" className="hover:text-yellow-400 transition-colors">
            Balance Sheet Visual
          </Link>
          <Link to="/ebitda-visualization" className="hover:text-yellow-400 transition-colors">
            Ebitda Visual
          </Link>
        </div>

        {/* Log Out Button */}
        <button onClick={handleLogout} className="px-6 py-2 bg-yellow-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
