import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";

const PremiumFeatures = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isPremium = useSelector((state) => state.theme.isPremium);
  const expenseList = useSelector((state) => state.expenses.expenseList);

  const downloadCSV = () => {
    if (expenseList.length === 0) return;

    const csvHeaders = ["Title", "Amount", "Date", "Category"];
    const csvRows = expenseList.map((expense) => [
      expense.title,
      expense.amount,
      new Date(expense.date).toLocaleDateString(),
      expense.category,
    ]);

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += csvHeaders.join(",") + "\n";
    csvRows.forEach((row) => {
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isPremium) {
    return null;
  }

  return (
    <div className="ml-64 p-4 flex justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded-md shadow-md">
        <button
          className={`toggle-button mr-4 py-2 px-4 rounded-md mb-4 ${
            theme === "light"
              ? "bg-gray-200 text-black"
              : "bg-gray-700 text-white"
          }`}
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? "Switch to Dark Theme" : "Switch to Light Theme"}
        </button>
        <button
          className="py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
          onClick={downloadCSV}
        >
          Download Expense File
        </button>
      </div>
    </div>
  );
};

export default PremiumFeatures;
