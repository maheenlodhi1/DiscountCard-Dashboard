import { postData } from "./generics";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const uploadImage = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const files = await postData(`${baseUrl}/upload/images`, data, {
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
