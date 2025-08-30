import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { fetchPartners } from "./partnerApi";

export const fetchAllPartners = createAsyncThunk(
  "partner/fetchAll",
  fetchPartners
);

const initialState = {
  partners: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const partnersSlice = createSlice({
  name: "partner",
  initialState: initialState,
  reducers: {
    sort: (state, action) => {
      state.partners = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPartners.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllPartners.fulfilled, (state, action) => {
        state.partners = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllPartners.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export const { sort } = partnersSlice.actions;

export default partnersSlice.reducer;

const selectPartnersState = (state) => state.partners;

export const getAllPartners = (state) => {
  return state.partners.partners;
};

export const getPartnersPagination = createSelector(
  selectPartnersState,
  (partners) => {
    return {
      totalPages: partners.totalPages,
      totalResults: partners.totalResults,
      pageNo: partners.pageNo,
    };
  }
);

export const getPartnersLoading = (state) => {
  return state.partners.isLoading;
};

export const getPartnersError = (state) => {
  return state.partners.error;
};
