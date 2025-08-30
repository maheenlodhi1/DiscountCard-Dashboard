import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCategories } from "./categoryApi";

const initialState = {
  categories: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const categoriesSlice = createSlice({
  name: "category",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.categories = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default categoriesSlice.reducer;

export const getAllCategories = (state) => {
  return state.categories.categories;
};
export const getCategoriesPagination = (state) => {
  return {
    totalPages: state.categories.totalPages,
    totalResults: state.categories.totalResults,
    pageNo: state.categories.pageNo,
  };
};
export const getCategoriesLoading = (state) => {
  return state.categories.isLoading;
};

export const getCategoriesError = (state) => {
  return state.categories.error;
};
