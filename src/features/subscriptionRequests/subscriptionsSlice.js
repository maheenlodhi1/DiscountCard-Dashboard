import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { fetchSubscriptionRequests } from "./subscriptionsApi";

export const fetchAllSubscriptions = createAsyncThunk(
  "subscriptions/fetchAll",
  fetchSubscriptionRequests
);
const initialState = {
  subscriptions: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState: initialState,
  reducers: {
    sort: (state, action) => {
      state.subscriptions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSubscriptions.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllSubscriptions.fulfilled, (state, action) => {
        state.subscriptions = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllSubscriptions.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { sort } = subscriptionsSlice.actions;

export default subscriptionsSlice.reducer;

const selectSubscriptionsState = (state) => state.subscriptions;

export const getSubscriptionRequests = (state) => {
  return state.subscriptions.subscriptions;
};

export const getSubscriptionsPagination = createSelector(
  selectSubscriptionsState,
  (subscriptions) => {
    return {
      totalPages: subscriptions.totalPages,
      totalResults: subscriptions.totalResults,
      pageNo: subscriptions.pageNo,
    };
  }
);

export const getSubscriptionsLoading = (state) => {
  return state.subscriptions.isLoading;
};

export const getSubscriptionsError = (state) => {
  return state.subscriptions.error;
};
