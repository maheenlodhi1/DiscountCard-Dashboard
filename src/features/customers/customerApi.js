import {
  deleteData,
  getData,
  getOne,
  postData,
  updateData,
} from "@/services/api/generics";

import { baseUrl } from "@/services/api/baseApi";

const BASE_URL = baseUrl;

export const fetchCustomers = async (query) => {
  let endpoint;
  if (!query.raw) {
    endpoint = `${BASE_URL}/customers?${
      query.pageNo ? `page=${query.pageNo}` : ""
    }${query.search ? `&search=${query.search}` : ""}`;
  } else endpoint = `${BASE_URL}/customers?raw=${query.raw}`;

  try {
    const response = await getData(endpoint);
    return response.data;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const createCustomer = async (data) => {
  try {
    const response = await postData(`${BASE_URL}/customers`, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchCustomer = async (id) => {
  try {
    const response = await getOne(`${BASE_URL}/customers`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const updateCustomer = async (id, data) => {
  try {
    const response = await updateData(`${BASE_URL}/customers`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const deleteCustomer = async (id) => {
  try {
    const response = await deleteData(`${BASE_URL}/customers`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
