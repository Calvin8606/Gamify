import React, { useState } from "react";
import axios from "axios";

const IncomeStatementsUpload = ({ userId }) => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorDetails, setErrorDetails] = useState("");

  // Handle file selection
  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "text/csv") {
      setMessage("❌ Please upload a valid CSV file.");
      return;
    }

    setFile(selectedFile);
    setFileName(selectedFile.name);
    setMessage("");
    setErrorDetails("");
  };

  // Handle form submission (Upload CSV)
  const handleUpload = async () => {
    if (!file) {
      setMessage("❌ No file selected. Please choose a CSV file.");
      return;
    }

    setUploading(true);
    setMessage("");
    setErrorDetails("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(
        `http://localhost:4781/api/incomeStatement/uploadCSVWithAI/${userId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.entriesAdded > 0) {
        setMessage(
          `✅ Successfully processed ${response.data.entriesAdded} entries!`
        );
      } else {
        setMessage("⚠️ File uploaded, but no valid data was found.");
      }
    } catch (error) {
      console.error("Upload error:", error);

      setMessage("❌ Upload failed. Please try again.");
      if (error.response && error.response.data.message) {
        setErrorDetails(error.response.data.message);
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg text-white w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Upload Income Statement (CSV)
        </h2>

        {/* File Upload Input */}
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="block w-full p-2 border border-gray-500 rounded-md bg-gray-700"
        />

        {/* Display Uploaded File Name */}
        {fileName && (
          <p className="mt-2 text-sm text-center">📂 Uploaded: {fileName}</p>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={uploading}
          className={`mt-4 px-6 py-2 w-full font-semibold rounded-md ${
            uploading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {uploading ? "Uploading..." : "Upload File"}
        </button>

        {/* Status Message */}
        {message && (
          <p className="mt-4 text-sm font-semibold text-center">{message}</p>
        )}

        {/* Display Detailed Errors */}
        {errorDetails && (
          <p className="mt-2 text-red-400 text-sm italic text-center">
            {errorDetails}
          </p>
        )}
      </div>
    </div>
  );
};

export default IncomeStatementsUpload;
