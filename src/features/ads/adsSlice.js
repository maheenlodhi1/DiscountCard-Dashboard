import { createSlice } from "@reduxjs/toolkit";
import { fetchAllAds } from "./adsApi";

const initialState = {
  ads: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const adsSlice = createSlice({
  name: "ads",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllAds.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllAds.fulfilled, (state, action) => {
        state.ads = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllAds.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default adsSlice.reducer;

export const getAllAds = (state) => {
  return state.ads.ads;
};
export const getAdsPagination = (state) => {
  return {
    totalPages: state.ads.totalPages,
    totalResults: state.ads.totalResults,
    pageNo: state.ads.pageNo,
  };
};
export const getAdsLoading = (state) => {
  return state.ads.isLoading;
};

export const getAdsError = (state) => {
  return state.ads.error;
};
