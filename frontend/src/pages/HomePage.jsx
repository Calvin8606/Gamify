import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col p-10 bg-gray-100 text-gray-800">
      {/* Title Section */}
      <header className="text-center mb-8">
        <h1 className="text-5xl font-extrabold text-blue-700">Money Stretch</h1>
      </header>
      
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600">
            Balance Sheet Basics
          </h2>
          <p className="mt-2 text-lg">
            Understand aspects of a Balance Sheet in terms of income, revenue,
            profit, assets, liabilities, and shareholders' equity.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600">
            EBITDA Calculator
          </h2>
          <p className="mt-2 text-lg">
            Calculate EBITDA from financial statements, highlighting key metrics
            like operating income, depreciation, and amortization.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600">
            Horizontal Analysis/Visualization
          </h2>
          <p className="mt-2 text-lg">
            Compare balance sheet items/EBITDA across time periods to identify
            trends.
          </p>
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600">
            Stretch - Sustainability Metrics
          </h2>
          <p className="mt-2 text-lg">
            Design a solution that integrates ESG (Environmental, Social,
            Governance) metrics into balance sheet analysis to assess
            sustainable profitability.
          </p>
        </section>
      </div>
      
      {/* Tutorial Section */}
      <section className="bg-white p-6 rounded-lg shadow-lg mt-8 text-center">
        <h2 className="text-2xl font-bold text-blue-600">Game Tutorial</h2>
        <p className="mt-2 text-lg">Learn how to play Money Stretch and maximize your financial knowledge through interactive challenges!</p>
        <img src="https://via.placeholder.com/400" alt="Game Tutorial" className="mt-4 mx-auto rounded-lg shadow-md" />
      </section>
      
      {/* Quiz Button */}
      <div className="text-center mt-8">
        <button className="px-6 py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow-lg hover:bg-blue-700 transition">
          Quiz Now
        </button>
      </div>
    </div>
  );
};

export default HomePage;



