import { createSlice } from "@reduxjs/toolkit";
import { fetchAllNotifications } from "./notificationsApi";

const initialState = {
  notifications: [],
  pageNo: 0,
  totalPages: 0,
  totalResults: 0,
  isLoading: false,
  error: "",
};

const notificationsSlice = createSlice({
  name: "notifications",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload.results;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
        state.pageNo = action.payload.page;
        state.isLoading = false;
      })
      .addCase(fetchAllNotifications.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      });
  },
});

export default notificationsSlice.reducer;

export const getAllNotifications = (state) => {
  return state.notifications.notifications;
};
export const getNotificationsPagination = (state) => {
  return {
    totalPages: state.notifications.totalPages,
    totalResults: state.notifications.totalResults,
    pageNo: state.notifications.pageNo,
  };
};
export const getNotificationsLoading = (state) => {
  return state.notifications.isLoading;
};

export const getNotificationsError = (state) => {
  return state.notifications.error;
};
