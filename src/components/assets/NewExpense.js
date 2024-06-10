import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../store/expenseSlice";

const NewExpense = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const userEmail = user ? user.email.replace(/\./g, "_") : null;

  const saveExpenseDataHandler = async (event) => {
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: parseFloat(enteredAmount),
      date: new Date(enteredDate).toISOString(),
      category: enteredCategory,
    };

    console.log("User Email:", userEmail);
    console.log("Expense Data:", expenseData);

    if (userEmail) {
      const resultAction = await dispatch(
        addExpense({ userEmail, expenseData })
      );
      if (addExpense.fulfilled.match(resultAction)) {
        console.log("Expense added successfully:", resultAction.payload);
      } else {
        console.error("Failed to add expense:", resultAction.payload);
      }
    }

    // Clear the input fields
    setEnteredTitle("");
    setEnteredAmount("");
    setEnteredDate("");
    setEnteredCategory("");
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };
  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  return (
    <div className="ml-64 p-4 flex justify-center items-center">
      {!isEditing && (
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={startEditingHandler}
        >
          Add New Expense
        </button>
      )}
      {isEditing && (
        <form
          onSubmit={saveExpenseDataHandler}
          className="bg-gray-800 p-4 rounded-md shadow-md space-y-4 text-white"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="text" className="block text-gray-300">
                Description of expense
              </label>
              <input
                type="text"
                id="text"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={enteredTitle}
                onChange={(e) => setEnteredTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="num" className="block text-gray-300">
                Amount Spent
              </label>
              <input
                type="number"
                id="num"
                min="0.01"
                step="0.01"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={enteredAmount}
                onChange={(e) => setEnteredAmount(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-gray-300">
                Date
              </label>
              <input
                type="date"
                id="date"
                min="2020-01-01"
                max="2024-12-31"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={enteredDate}
                onChange={(e) => setEnteredDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-gray-300">
                Category
              </label>
              <select
                id="category"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                value={enteredCategory}
                onChange={(e) => setEnteredCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Clothing">Clothing</option>
                <option value="Housing">Housing</option>
                <option value="Transportation">Transportation</option>
                <option value="entertainment">Entertainment</option>
                <option value="miscellaneous">Miscellaneous</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              onClick={stopEditingHandler}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Add Expense
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewExpense;
