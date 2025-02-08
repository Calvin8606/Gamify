import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col p-10 bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8">Financial Analysis & Optimization</h1>
      
      <div className="space-y-6">
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600">Balance Sheet Basics</h2>
          <p className="mt-2 text-lg">Understand aspects of a Balance Sheet in terms of income, revenue, profit, assets, liabilities, and shareholders' equity.</p>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600">EBITDA Calculator</h2>
          <p className="mt-2 text-lg">Calculate EBITDA from financial statements, highlighting key metrics like operating income, depreciation, and amortization.</p>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600">Horizontal Analysis/Visualization</h2>
          <p className="mt-2 text-lg">Compare balance sheet items/EBITDA across time periods to identify trends.</p>
        </section>
        
        <section className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-blue-600">Stretch - Sustainability Metrics</h2>
          <p className="mt-2 text-lg">Design a solution that integrates ESG (Environmental, Social, Governance) metrics into balance sheet analysis to assess sustainable profitability.</p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;


