import {
  deleteData,
  getData,
  getOne,
  postData,
  updateData,
} from "@/services/api/generics";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchPartners = async (query) => {
  let endpoint = "";

  if (!query.raw) {
    endpoint = `${BASE_URL}/partners?${
      query.pageNo ? `page=${query.pageNo}` : ""
    }${query.pageSize ? `&limit=${query.pageSize}` : ""}${
      query.search ? `&search=${query.search}` : ""
    }`;
  } else endpoint = `${BASE_URL}/partners?raw=${query.raw}`;

  try {
    const response = await getData(endpoint);
    return response.data;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const createPartner = async (data) => {
  try {
    const response = await postData(`${BASE_URL}/partners`, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchPartner = async (id) => {
  try {
    const response = await getOne(`${BASE_URL}/partners`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const updatePartner = async (id, data) => {
  try {
    const response = await updateData(`${BASE_URL}/partners`, id, data);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const deletePartner = async (id) => {
  try {
    const response = await deleteData(`${BASE_URL}/partners`, id);
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
