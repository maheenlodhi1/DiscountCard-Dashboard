import { getData, postData, updateData } from "@/services/api/generics";

import { baseUrl } from "@/services/api/baseApi";

const BASE_URL = baseUrl;

export const createCommission = async (data) => {
  try {
    const response = await postData(
      `${BASE_URL}/admin/referralCommission`,
      data
    );
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchCommission = async () => {
  try {
    const response = await getData(`${BASE_URL}/admin/referralCommission`);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const updateCommission = async (id, data) => {
  try {
    const response = await updateData(
      `${BASE_URL}/admin/referralCommission`,
      id,
      data
    );
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
