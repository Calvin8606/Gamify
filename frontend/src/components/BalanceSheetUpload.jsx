import React, { useState } from "react";

const BalanceSheetUpload = () => {
  const [fileName, setFileName] = useState("");

  // Handle file selection
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;
    setFileName(file.name);

    // Validate file type
    if (file.type !== "text/csv") {
      alert("Please upload a valid CSV file.");
      return;
    }

    // You can process the file here (e.g., send to backend)
    console.log("CSV file uploaded:", file);
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4">Upload Balance Sheet (CSV)</h2>

      {/* File Upload Input */}
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        className="block w-full p-2 border border-gray-500 rounded-md bg-gray-700"
      />

      {/* Display Uploaded File Name */}
      {fileName && <p className="mt-2 text-sm">📂 Uploaded: {fileName}</p>}
    </div>
  );
};

export default BalanceSheetUpload;
