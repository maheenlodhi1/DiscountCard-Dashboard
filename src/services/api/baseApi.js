import axios from "axios";
const baseDomain =
  "https://discountcard-node-c3e0bxhhbgdqg5g5.ukwest-01.azurewebsites.net/api/v1";

export const appName = "DiscountCard";

export const customHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "ngrok-skip-browser-warning": "1",
};
export const baseUrl = `${baseDomain}`;

export const GOOGLE_MAPS_API_KEY = "AIzaSyAGtTzCFC5I7fdjV2E3QJTUMggoKSTYOv0";
export const ENCRYPTION_KEY =
  "6acab038d275fb7459435fbf6ab0ce3feff4eeb723260b2c21280b4ae651e0f6";

const instance = axios.create({
  baseUrl,
  headers: customHeaders,
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

export const getError = (error) => {
  if (error.response) {
    if (error?.response?.data?.data?.errorMessage) {
      return `${error.response.data.data.errorMessage}`;
    } else if (error?.response?.data?.message) {
      return `${error.response.data.message}`;
    } else {
      return error.response;
    }
  } else if (error.request) {
    return error.request;
  } else {
    return `${error}`;
  }
};
