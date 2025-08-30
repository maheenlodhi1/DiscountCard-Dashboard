import { getData, getOne, updateData } from "@/services/api/generics";
import { decrypt, encrypt, encryptObject } from "@/utils/encryption";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const fetchPayoutRequests = async (pageNo = 1) => {
  try {
    const response = await getData(
      `${BASE_URL}/payout-requests?page=${pageNo}`
    );

    return response.data;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const updatePayoutRequest = async (id, data) => {
  try {
    const encryptedData = encrypt(JSON.stringify(data));
    const response = await updateData(
      `${BASE_URL}/payout-requests`,
      id,
      encryptedData,
      { headers: { "Content-Type": "text/plain" } }
    );
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};

export const fetchPayoutRequest = async (id) => {
  try {
    let response = await getOne(`${BASE_URL}/payout-requests`, id);
    response.data = JSON.parse(decrypt(response?.data));
    return response;
  } catch (error) {
    throw Error(
      error.response?.data?.message || error.message || "Something went wrong"
    );
  }
};
