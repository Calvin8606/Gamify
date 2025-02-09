import React, { useState } from "react";
import axios from "axios";

const BalanceSheetUpload = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Handle file selection
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    // Validate file type
    if (selectedFile.type !== "text/csv") {
      setMessage("❌ Please upload a valid CSV file.");
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setMessage(""); // Clear previous messages
  };

  // Handle form submission (Upload CSV)
  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ No file selected. Please choose a CSV file.");
      return;
    }

    setUploading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("file", file); // Key must be "file" for the backend

      const response = await axios.post(
        `http://localhost:4781/api/balanceSheet/uploadCSVWithAI/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage("✅ File uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
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

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        disabled={uploading}
        className={`mt-4 px-6 py-2 font-semibold rounded-md ${
          uploading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>

      {/* Status Message */}
      {message && (
        <p className="mt-4 text-sm font-semibold">
          {message}
        </p>
      )}
    </div>
  );
};

export default BalanceSheetUpload;