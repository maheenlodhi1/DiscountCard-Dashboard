import {
  getData,
  postData,
  updateData,
  deleteData,
  getOne,
} from "@/services/api/generics";
import { createAsyncThunk } from "@reduxjs/toolkit";

import { baseUrl } from "@/services/api/baseApi";

const BASE_URL = baseUrl;

export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async ({ pageNo = 1, limit = 10 }) => {
    try {
      const response = await getData(
        `${BASE_URL}/notifications/?page=${pageNo}&limit=${limit}`
      );

      return response.data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const createNotification = async (data) => {
  try {
    const response = await postData(`${BASE_URL}/notifications`, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchNotification = async (id) => {
  try {
    const response = await getOne(`${BASE_URL}/notifications`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const broadcastNotification = async (id) => {
  try {
    const response = await getOne(`${BASE_URL}/notifications/broadcast`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const updateNotification = async (id, data) => {
  try {
    const response = await updateData(`${BASE_URL}/notifications`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const deleteNotification = async (id, data) => {
  try {
    const response = await deleteData(`${BASE_URL}/notifications`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
