import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  removeExpense,
  editExpense,
} from "../store/expenseSlice";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenseList);
  const user = useSelector((state) => state.auth.user);
  const userEmail = user ? user.email.replace(/\./g, "_") : null;

  useEffect(() => {
    if (userEmail) {
      dispatch(fetchExpenses(userEmail));
    }
  }, [dispatch, userEmail]);

  const [editingExpense, setEditingExpense] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedAmount, setEditedAmount] = useState("");
  const [editedDate, setEditedDate] = useState("");
  const [editedCategory, setEditedCategory] = useState("");

  const startEditingHandler = (expense) => {
    setEditingExpense(expense);
    setEditedTitle(expense.title);
    setEditedAmount(expense.amount);
    setEditedDate(expense.date.split("T")[0]);
    setEditedCategory(expense.category);
  };

  const stopEditingHandler = () => {
    setEditingExpense(null);
  };

  const deleteExpenseHandler = (id) => {
    dispatch(removeExpense({ userEmail, id }));
  };

  const editExpenseHandler = (event) => {
    event.preventDefault();

    const updatedExpense = {
      title: editedTitle,
      amount: editedAmount,
      date: new Date(editedDate).toISOString(),
      category: editedCategory,
    };

    dispatch(
      editExpense({
        userEmail,
        id: editingExpense.key,
        expenseData: updatedExpense,
      })
    );
    stopEditingHandler();
  };

  return (
    <div className="ml-64 p-4">
      <ul className="space-y-4">
        {expenses.map((expense) =>
          editingExpense && editingExpense.key === expense.key ? (
            <li key={expense.key}>
              <div className="bg-gray-800 p-4 rounded-md shadow-md">
                <form
                  onSubmit={editExpenseHandler}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="space-y-2">
                    <label className="block text-gray-300">
                      Description of expense
                    </label>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-300">Amount Spent</label>
                    <input
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={editedAmount}
                      onChange={(e) => setEditedAmount(e.target.value)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-300">
                      Date of Expense
                    </label>
                    <input
                      type="date"
                      value={editedDate}
                      onChange={(e) => setEditedDate(e.target.value)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-gray-300">Category</label>
                    <select
                      value={editedCategory}
                      onChange={(e) => setEditedCategory(e.target.value)}
                      className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
                      required
                    >
                      <option value="Food">Food</option>
                      <option value="Clothing">Clothing</option>
                      <option value="Housing">Housing</option>
                      <option value="Transportation">Transportation</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="miscellaneous">Miscellaneous</option>
                    </select>
                  </div>
                  <div className="col-span-2 flex justify-end space-x-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={stopEditingHandler}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </li>
          ) : (
            <li key={expense.key}>
              <div className="bg-gray-800 p-4 rounded-md shadow-md flex justify-between items-center">
                <p className="text-gray-400">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
                <h2 className="text-xl text-white">{expense.category}</h2>
                <p className="text-gray-400">{expense.title}</p>
                <h2 className="text-xl text-white">Rs. {expense.amount}</h2>
                <div className="space-x-2">
                  <button
                    onClick={() => startEditingHandler(expense)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteExpenseHandler(expense.key)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default ExpenseList;
