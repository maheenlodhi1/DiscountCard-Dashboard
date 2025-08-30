import {
  getData,
  postData,
  updateData,
  deleteData,
  getOne,
} from "@/services/api/generics";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchAllCategories = createAsyncThunk(
  "category/fetchAll",
  async (pageNo = 1) => {
    try {
      const response = await getData(
        `${BASE_URL}/categories?page=${pageNo}&limit=${1000}`
      );

      return response.data;
    } catch (error) {
      throw Error(
        error.response?.data?.message || error.message || "Something went wrong"
      );
    }
  }
);

export const createCategory = async (data) => {
  try {
    const response = await postData(`${BASE_URL}/categories`, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchCategory = async (id) => {
  try {
    const response = await getOne(`${BASE_URL}/categories`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const updateCategory = async (id, data) => {
  try {
    const response = await updateData(`${BASE_URL}/categories`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const deleteCategory = async (id, data) => {
  try {
    const response = await deleteData(`${BASE_URL}/categories`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
