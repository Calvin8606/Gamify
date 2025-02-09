import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BalanceSheetUpload from "../components/BalanceSheetUpload";

const BalanceSheetVisualization = ({ userId }) => {
  const [balanceSheetData, setBalanceSheetData] = useState([]);
  const [companyName, setCompanyName] = useState(""); // Default empty
  const [companies, setCompanies] = useState([]); // Store list of companies

  // Fetch available companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4781/api/companies/bs/${userId}`
        ); // New API to get companies
        setCompanies(response.data);
        if (response.data.length > 0) {
          setCompanyName(response.data[0]); // Default to first company
        }
      } catch (error) {
        console.error("Error fetching company list:", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!companyName) return;
        const encodedCompanyName = encodeURIComponent(companyName);
        const response = await axios.get(
          `http://localhost:4781/api/balanceSheet/company?companyName=${encodedCompanyName}`
        );

        setBalanceSheetData(response.data);
      } catch (error) {
        console.error("Error fetching balance sheet data:", error);
      }
    };

    fetchData();
  }, [companyName]);

  // Format data for visualization
  const formattedData = balanceSheetData.map((entry) => ({
    period: entry.period,
    assets: entry.assets.totalAssets,
    liabilities: entry.liabilities.totalLiabilities,
    equity: entry.shareholdersEquity.totalEquity,
  }));

  // Function to format large numbers (handles negatives too)
  const formatNumber = (num) => {
    if (Math.abs(num) >= 1000) {
      return `${(num / 1000).toFixed(1)}k`; // Convert to "k" format with 1 decimal
    }
    return num.toString(); // Keep small numbers unchanged
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md text-black">
        <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
          Balance Sheet Trends
        </h2>

        <div className="mb-4 text-center">
          <label htmlFor="company" className="font-semibold text-gray-900">
            Select Company:
          </label>
          <select
            id="company"
            className="ml-2 p-2 border rounded-md bg-white text-black"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          >
            {companies.map((company, index) => (
              <option key={index} value={company}>
                {company}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 text-center">
            Assets, Liabilities & Equity Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={formattedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis tickFormatter={formatNumber} />{" "}
              {/* Format Y-axis numbers */}
              <Tooltip formatter={(value) => formatNumber(value)} />{" "}
              {/* Format Tooltip numbers */}
              <Legend />
              <Line
                type="monotone"
                dataKey="assets"
                stroke="#1f77b4"
                name="Total Assets"
              />
              <Line
                type="monotone"
                dataKey="liabilities"
                stroke="#ff7f0e"
                name="Total Liabilities"
              />
              <Line
                type="monotone"
                dataKey="equity"
                stroke="#2ca02c"
                name="Total Equity"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <BalanceSheetUpload className="" />
    </div>
  );
};

export default BalanceSheetVisualization;
