import { createSlice } from "@reduxjs/toolkit";
import { fetchGraphData } from "./graphApi";

const initialState = {
  offers: {},
  partners: {},
  customers: {},
  memberships: {},
  isLoading: false,
  error: "",
};

const graphSlice = createSlice({
  name: "graph",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchGraphData.pending, (state, action) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchGraphData.fulfilled, (state, action) => {
        state.offers = action.payload.promotions;
        state.partners = action.payload.partners;
        state.customers = action.payload.customers;
        state.memberships = action.payload.memberships;
        state.isLoading = false;
      })
      .addCase(fetchGraphData.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default graphSlice.reducer;

export const getOffersGraph = (state) => {
  return state.graphs.offers;
};

export const getCustomersGraph = (state) => {
  return state.graphs.customers;
};

export const getPartnersGraph = (state) => {
  return state.graphs.partners;
};

export const getMembershipGraph = (state) => {
  return state.graphs.memberships;
};

export const getGraphLoading = (state) => {
  return state.categories.isLoading;
};

export const getGraphError = (state) => {
  return state.categories.error;
};
