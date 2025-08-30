import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPayoutRequests } from "./payoutRequestsApi";

export const fetchAllPayoutRequests = createAsyncThunk(
  "payoutRequests/fetchAll",
  fetchPayoutRequests
);

const initialState = {
  payoutRequests: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const PayoutRequestsSlice = createSlice({
  name: "payoutRequests",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPayoutRequests.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllPayoutRequests.fulfilled, (state, action) => {
        state.payoutRequests = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllPayoutRequests.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default PayoutRequestsSlice.reducer;

export const getAllPayoutRequests = (state) => {
  return state.payoutRequests.payoutRequests;
};

export const getPayoutRequestsLoading = (state) => {
  return state.payoutRequests.isLoading;
};

export const getPayoutRequestsError = (state) => {
  return state.payoutRequests.error;
};
