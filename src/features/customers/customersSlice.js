import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { fetchCustomers } from "./customerApi";

export const fetchAllCustomers = createAsyncThunk(
  "customer/fetchAll",
  fetchCustomers
);

const initialState = {
  customers: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const customersSlice = createSlice({
  name: "customer",
  initialState: initialState,
  reducers: {
    sort: (state, action) => {
      state.customers = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCustomers.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllCustomers.fulfilled, (state, action) => {
        state.customers = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllCustomers.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { sort } = customersSlice.actions;

export default customersSlice.reducer;

const selectCustomersState = (state) => state.customers;

export const getAllCustomers = (state) => {
  return state.customers.customers;
};

export const getCustomersPagination = createSelector(
  selectCustomersState,
  (customers) => ({
    totalPages: customers.totalPages,
    totalResults: customers.totalResults,
    pageNo: customers.pageNo,
  })
);

export const getCustomersLoading = (state) => {
  return state.customers.isLoading;
};

export const getCustomersError = (state) => {
  return state.customers.error;
};
