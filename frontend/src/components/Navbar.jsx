import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const Navbar = () => {
  return (
    <nav className="bg-[#27293D] text-white shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-extrabold text-yellow-400">
          <Link to="/">Money Stretch</Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link to="/quiz" className="hover:text-yellow-400 transition-colors">
            Quiz
          </Link>
          <Link to="/visual" className="hover:text-yellow-400 transition-colors">
            Visual
          </Link>
        </div>

        {/* Log Out Button */}
        <button className="px-6 py-2 bg-yellow-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition duration-300">
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
