import { getData, getOne } from "@/services/api/generics";

import { baseUrl } from "@/services/api/baseApi";

const BASE_URL = baseUrl;

export const fetchTransactions = async (query) => {
  let endpoint;

  if (!query.raw) {
    endpoint = `${BASE_URL}/transactions?page=${query.pageNo}${
      query.search ? `&search=${query.search}` : ""
    }`;
  } else endpoint = `${BASE_URL}/transactions?raw=${query.raw}`;

  try {
    const response = await getData(endpoint);
    return response.data;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchTransactionDetails = async (id) => {
  try {
    const response = await getOne(`${BASE_URL}/transactions`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
