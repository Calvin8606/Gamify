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

const EbitdaVisualization = ({ userId }) => {
  const [ebitdaData, setEbitdaData] = useState([]);
  const [companyName, setCompanyName] = useState(""); // Default empty
  const [companies, setCompanies] = useState([]); // Store list of companies

  // Fetch available companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4781/api/companies/is/${userId}`
        ); // API to get unique company names
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
          `http://localhost:4781/api/calc/ebitda/company?companyName=${encodedCompanyName}`
        );

        setEbitdaData(response.data);
      } catch (error) {
        console.error("Error fetching EBITDA data:", error);
      }
    };

    fetchData();
  }, [companyName]);

  // Format data for visualization
  const formattedData = ebitdaData.map((entry) => ({
    period: entry.period,
    ebitda: entry.ebitdaValue,
  }));

  // Function to format large numbers (handles negatives too)
  const formatNumber = (num) => {
    if (Math.abs(num) >= 1000) {
      return `${(num / 1000).toFixed(1)}k`; // Convert to "k" format with 1 decimal
    }
    return num.toString(); // Keep small numbers unchanged
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md text-black">
      <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
        EBITDA Trends
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
          EBITDA Over Time
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis tickFormatter={formatNumber} />{" "}
            {/* Format Y-axis numbers (supports negatives) */}
            <Tooltip formatter={(value) => formatNumber(value)} />{" "}
            {/* Format Tooltip numbers (supports negatives) */}
            <Legend />
            <Line
              type="monotone"
              dataKey="ebitda"
              stroke="#d62728"
              name="EBITDA"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EbitdaVisualization;
