import React from "react";
import BalanceSheetUpload from "../components/BalanceSheetUpload";
import IncomeStatementUpload from "../components/IncomeStatementUpload";

const Upload = ({ userId }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
        Upload Your Financial Statements
      </h1>
      <div className="grid grid-cols-2 gap-8">
        <BalanceSheetUpload userId={userId} />
        <IncomeStatementUpload userId={userId} />
      </div>
    </div>
  );
};

export default Upload;
