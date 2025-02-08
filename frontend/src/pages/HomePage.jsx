import React from "react";
import logo from "../images/logo.jpg";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col p-10 bg-[#27293D] text-white">
      {/* Logo Section */}
      <div className="flex justify-center mb-4">
        <img src={logo} alt="Money Stretch Logo" className="h-70 w-70 rounded-full" />
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




