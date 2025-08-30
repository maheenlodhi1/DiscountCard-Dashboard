import { useState } from "react";
import { createAd as createAdApi, deleteAd, fetchAd, updateAd } from "./adsApi";

export default function useAds() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [ad, setAd] = useState(null);

  const getAd = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchAd(id);

      setIsLoading(false);
      setAd(res.data);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const createAd = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createAdApi(data);

      setIsLoading(false);
      setSuccessMessage("Ad Successfully Created.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const editAd = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await updateAd(id, data);

      setIsLoading(false);
      setSuccessMessage("Ad Successfully Updated.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const removeAd = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await deleteAd(id, data);

      setIsLoading(false);
      setSuccessMessage("Ad Successfully Deleted.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setAd(null);
    setError("");
    setSuccessMessage("");
    setIsLoading(false);
  };

  return {
    ad,
    successMessage,
    isLoading,
    error,
    reset,
    getAd,
    createAd,
    editAd,
    removeAd,
  };
}
