import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { fetchTransactions } from "./transactionApi";

export const fetchAllTransactions = createAsyncThunk(
  "transaction/fetchAll",
  fetchTransactions
);
const initialState = {
  transactions: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const transactionsSlice = createSlice({
  name: "transaction",
  initialState: initialState,
  reducers: {
    sort: (state, action) => {
      state.transactions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { sort } = transactionsSlice.actions;

export default transactionsSlice.reducer;

const selectTransactionsState = (state) => state.transactions;

export const getAllTransactions = (state) => {
  return state.transactions.transactions;
};

export const getTransactionsPagination = createSelector(
  selectTransactionsState,
  (transactions) => {
    return {
      totalPages: transactions.totalPages,
      totalResults: transactions.totalResults,
      pageNo: transactions.pageNo,
    };
  }
);

export const getTransactionsLoading = (state) => {
  return state.transactions.isLoading;
};

export const getTransactionsError = (state) => {
  return state.transactions.error;
};
