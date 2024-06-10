import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialExpenseState = {
  expenseList: [],
  status: "idle",
  error: null,
};

//fetch expense data
export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (userEmail) => {
    const response = await fetch(
      `https://add-expense-2e2e8-default-rtdb.firebaseio.com/expenses/${userEmail}.json`
    );
    const data = await response.json();
    return data ? Object.keys(data).map((key) => ({ ...data[key], key })) : [];
  }
);

//add expense data
export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async ({ userEmail, expenseData }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://add-expense-2e2e8-default-rtdb.firebaseio.com/expenses/${userEmail}.json`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expenseData),
        }
      );
      const newDataKey = await response.json();
      return { key: newDataKey.name, ...expenseData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//remove a expense list
export const removeExpense = createAsyncThunk(
  "expenses/removeExpense",
  async ({ userEmail, id }, { rejectWithValue }) => {
    try {
      await fetch(
        `https://add-expense-2e2e8-default-rtdb.firebaseio.com/expenses/${userEmail}/${id}.json`,
        { method: "DELETE" }
      );
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//edit expense data
export const editExpense = createAsyncThunk(
  "expenses/editExpense",
  async ({ userEmail, id, expenseData }, { rejectWithValue }) => {
    try {
      await fetch(
        `https://add-expense-2e2e8-default-rtdb.firebaseio.com/expenses/${userEmail}/${id}.json`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(expenseData),
        }
      );
      return { key: id, ...expenseData };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


//slice
const expenseSlice = createSlice({
  name: "expenses",
  initialState: initialExpenseState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenseList = action.payload;
      })
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.expenseList.push(action.payload);
      })
      .addCase(addExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Add Expense Failed:", action.payload);
      })
      .addCase(removeExpense.fulfilled, (state, action) => {
        state.expenseList = state.expenseList.filter(
          (expense) => expense.key !== action.payload
        );
      })
      .addCase(removeExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Remove Expense Failed:", action.payload);
      })
      .addCase(editExpense.fulfilled, (state, action) => {
        const index = state.expenseList.findIndex(
          (expense) => expense.key === action.payload.key
        );
        if (index !== -1) {
          state.expenseList[index] = action.payload;
        }
      })
      .addCase(editExpense.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        console.error("Edit Expense Failed:", action.payload);
      });
  },
});

export default expenseSlice.reducer;
