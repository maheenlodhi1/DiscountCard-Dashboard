import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCoupons } from "./couponApi";
import { createSelector } from "@reduxjs/toolkit";

export const fetchAllCoupons = createAsyncThunk(
  "coupon/fetchAll",
  fetchCoupons
);

const initialState = {
  coupons: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const CouponsSlice = createSlice({
  name: "coupon",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCoupons.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.coupons = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default CouponsSlice.reducer;

export const getAllCoupons = (state) => {
  return state.coupons.coupons;
};

export const getCouponsLoading = (state) => {
  return state.coupons.isLoading;
};

export const getCouponsError = (state) => {
  return state.coupons.error;
};
