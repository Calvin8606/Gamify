import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FaBolt } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import logo from "../images/logo.jpg";

// Flip and pulse animation
const flipAndPulse = keyframes`
  0% { transform: rotateY(0deg) scale(1); }  
  5% { transform: rotateY(45deg) scale(1.1); }  
  10% { transform: rotateY(90deg) scale(1.2); }  
  15% { transform: rotateY(135deg) scale(1.3); }  
  20% { transform: rotateY(180deg) scale(1.4); }  
  25% { transform: rotateY(225deg) scale(1.5); }  
  30% { transform: rotateY(270deg) scale(1.6); }  
  35% { transform: rotateY(315deg) scale(1.7); }  
  40% { transform: rotateY(360deg) scale(1.8); }  /* First full flip */
  45% { transform: rotateY(405deg) scale(1.9); }  
  50% { transform: rotateY(450deg) scale(2.1); }  
  55% { transform: rotateY(495deg) scale(1.9); }  
  60% { transform: rotateY(540deg) scale(1.8); }  
  65% { transform: rotateY(585deg) scale(1.7); }  
  70% { transform: rotateY(630deg) scale(1.6); }  
  75% { transform: rotateY(675deg) scale(1.3); }  
  80% { transform: rotateY(720deg) scale(1); }  /* Second full flip */  
  85% { transform: rotateY(300deg) scale(1.4); }  
  90% { transform: rotateY(324deg) scale(1.2); }  
  95% { transform: rotateY(342deg) scale(1.1); }  
  100% { transform: rotateY(360deg) scale(1); } 
`;

// Create a styled component for the logo
const AnimatedLogo = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 50%;
  animation: h-70 w-70 rounded-full infinite;
  

  &:hover {
    animation: ${flipAndPulse} 1s;
  }
`;

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col p-10 bg-[#27293D] text-white">
      {/* Logo Section */}
      <div className="flex justify-center mb-4">
        <AnimatedLogo src={logo} alt="Money Stretch Logo" />
      </div>
      {/* Title Section */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-yellow-400">Money Stretch</h1>
      </header>
      
      <div className="space-y-6">
        <section className="bg-[#31344A] p-6 rounded-lg shadow-lg mt-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-300">Balance Sheet Basics</h2>
          <p className="mt-2 text-lg">
            The balance sheet is a fundamental financial statement that provides a snapshot of a company's financial position. It details assets, liabilities, and shareholders' equity, offering insights into a company's liquidity, financial stability, and operational efficiency. Mastering balance sheet analysis is crucial for evaluating an organization’s health and making informed business decisions.
          </p>
        </section>

        <section className="bg-[#31344A] p-6 rounded-lg shadow-lg mt-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-300">EBITDA Calculator</h2>
          <p className="mt-2 text-lg">
            EBITDA (Earnings Before Interest, Taxes, Depreciation, and Amortization) is a key financial metric used to assess a company's profitability. Understanding EBITDA allows for the evaluation of an organization's operating performance by excluding non-operating expenses. Calculating EBITDA provides a clearer picture of a business’s earnings potential and financial health.
          </p>
        </section>

        <section className="bg-[#31344A] p-6 rounded-lg shadow-lg mt-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-300">Horizontal Analysis/Visualization</h2>
          <p className="mt-2 text-lg">
            Horizontal analysis compares financial data over multiple periods, helping to identify trends and patterns in revenue, expenses, and profitability. This technique enhances strategic planning by showcasing performance improvements, pinpointing inefficiencies, and forecasting future financial health based on historical data.
          </p>
        </section>

        <section className="bg-[#31344A] p-6 rounded-lg shadow-lg mt-8 text-center">
          <h2 className="text-2xl font-bold text-yellow-300">Stretch - Sustainability Metrics</h2>
          <p className="mt-2 text-lg">
            Sustainability metrics, including Environmental, Social, and Governance (ESG) factors, are critical in evaluating long-term business viability. By integrating ESG into financial analysis, organizations can assess their impact on society and the environment, ensuring responsible growth while maintaining financial profitability.
          </p>
        </section>
      </div>
      
      {/* Tutorial Section */}
      <section className="bg-[#31344A] p-6 rounded-lg shadow-lg mt-8 text-center">
        <h2 className="text-2xl font-bold text-yellow-300">Game Tutorial</h2>
        <p className="mt-2 text-lg">
          Learn how to play Money Stretch and maximize your financial knowledge through interactive challenges! Answer questions correctly to earn points, and receive detailed explanations when you make mistakes. This engaging approach ensures you gain a deep understanding of financial principles while having fun!
        </p>
        <img src="https://via.placeholder.com/400" alt="Game Tutorial" className="mt-4 mx-auto rounded-lg shadow-md" />
      </section>
      
      {/* Quiz Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-yellow-500 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-yellow-600 hover:scale-105 transition-transform duration-300">
          Quiz Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;
