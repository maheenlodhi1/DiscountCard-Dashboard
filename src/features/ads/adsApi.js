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

export const fetchAllAds = createAsyncThunk(
  "ads/fetchAll",
  async ({ pageNo = 1, limit = 10 }) => {
    try {
      const response = await getData(
        `${BASE_URL}/content-ad?page=${pageNo}&limit=${limit}`
      );

      return response.data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const createAd = async (data) => {
  try {
    const response = await postData(`${BASE_URL}/content-ad`, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchAd = async (id) => {
  try {
    const response = await getOne(`${BASE_URL}/content-ad`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const updateAd = async (id, data) => {
  try {
    const response = await updateData(`${BASE_URL}/content-ad`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const deleteAd = async (id, data) => {
  try {
    const response = await deleteData(`${BASE_URL}/content-ad`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
