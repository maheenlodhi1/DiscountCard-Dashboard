import axios from "axios";

export const convertImageToBase64 = (img) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(img);

    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };
  });
};

export const uploadImage = (img, setProgress) => {
  return new Promise(async (resolve, reject) => {
    if (img != null) {
      const options = {
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          let precentage = Math.floor((loaded * 100) / total);
          if (precentage < 100) setProgress(precentage);
        },
      };
      const data = new FormData();
      data.append("file", img);
      data.append("upload_preset", "imagesStore");
      data.append("cloud_name", "kafucard");
      try {
        const res = await axios.post(
          "https://api.cloudinary.com/v1_1/kafucard/image/upload/",
          data,
          options
        );
        resolve(res.data);
      } catch (error) {
        reject(error);
      }
    }
  });
};
