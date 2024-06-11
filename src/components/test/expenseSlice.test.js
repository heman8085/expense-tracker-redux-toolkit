import expenseReducer, {
  fetchExpenses,

} from "../store/expenseSlice";

describe("expenseSlice reducer", () => {
  const initialState = {
    expenseList: [],
    status: "idle",
    error: null,
  };

  it("should handle fetchExpenses.pending", () => {
    const nextState = expenseReducer(initialState, fetchExpenses.pending());
    expect(nextState.status).toEqual("loading");
  });

  it("should handle fetchExpenses.fulfilled", () => {
    const fetchedExpenses = [{ id: 1, title: "Expense 1", amount: 100 }];
    const nextState = expenseReducer(
      initialState,
      fetchExpenses.fulfilled(fetchedExpenses)
    );
    expect(nextState.status).toEqual("succeeded");
    expect(nextState.expenseList).toEqual(fetchedExpenses);
  });

  it("should handle fetchExpenses.rejected", () => {
    const error = "Failed to fetch expenses";
    const nextState = expenseReducer(
      initialState,
      fetchExpenses.rejected(error)
    );
    expect(nextState.status).toEqual("failed");
    expect(nextState.error).toEqual(error);
  });

  
});
