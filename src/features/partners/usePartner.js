import { useState } from "react";
import {
  createPartner,
  deletePartner,
  fetchPartner,
  updatePartner,
} from "./partnerApi";

export default function usePartner() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [partner, setPartner] = useState(null);

  const getPartner = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchPartner(id);

      setIsLoading(false);
      setPartner(res.data);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const addPartner = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createPartner(data);

      setIsLoading(false);
      setSuccessMessage("Partner Successfully Added.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const editPartner = async (id, data) => {
    setIsLoading(true);
    setSuccessMessage("");
    setError("");
    try {
      const res = await updatePartner(id, data);

      setIsLoading(false);
      setSuccessMessage("Partner Successfully Updated.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const removePartner = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await deletePartner(id);

      setIsLoading(false);
      setSuccessMessage("Partner Successfully Deleted.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setPartner(null);
    setError("");
    setSuccessMessage("");
    setIsLoading(false);
  };

  return {
    partner,
    successMessage,
    isLoading,
    error,
    reset,
    getPartner,
    addPartner,
    editPartner,
    removePartner,
  };
}
