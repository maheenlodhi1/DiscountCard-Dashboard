import { postData } from "./generics";
import { baseUrl } from "@/services/api/baseApi";

const BASE_URL = baseUrl;

export const uploadImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const files = await postData(`${BASE_URL}/upload/images`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const urls = files.data.map((file) => file.location);
      resolve(urls);
    } catch (error) {
      reject(error);
    }
  });
};
