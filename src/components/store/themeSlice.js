import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchExpenses } from "./expenseSlice";

const initialState = {
  theme: "light",
  isPremium: false,
};

//check isPremium?
export const checkPremiumStatus = createAsyncThunk(
  "theme/checkPremiumStatus",
  async ({ getState }) => {
    const expenseList = getState().expenses.expenseList;
    const totalExpenseAmount = expenseList.reduce(
      (total, expense) => total + parseFloat(expense.amount),
      0
    );
    
    return totalExpenseAmount > 10000;
  }
);

//slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      const totalExpenseAmount = action.payload.reduce(
        (total, expense) => total + parseFloat(expense.amount),
        0
      );
      console.log("totalamount", totalExpenseAmount)
      state.isPremium = totalExpenseAmount > 10000;
    });
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
