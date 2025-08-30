import {
  getData,
  postData,
  updateData,
  deleteData,
} from "@/services/api/generics";

import { baseUrl } from "@/services/api/baseApi";

const BASE_URL = baseUrl;

export const fetchCoupons = async (pageNo = 1) => {
  try {
    const response = await getData(`${BASE_URL}/coupons?page=${pageNo}`);

    return response.data;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const createCoupon = async (data) => {
  try {
    const response = await postData(`${BASE_URL}/coupons`, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const updateCoupon = async (id, data) => {
  try {
    const response = await updateData(`${BASE_URL}/coupons`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const deleteCoupon = async (id, data) => {
  try {
    const response = await deleteData(`${BASE_URL}/coupons`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
