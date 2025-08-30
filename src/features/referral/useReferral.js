import { useState } from "react";
import {
  createCommission,
  fetchCommission,
  updateCommission,
} from "./referralApi";

export default function useReferral() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [commission, setCommission] = useState(null);

  const getCommission = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchCommission();

      setIsLoading(false);
      setCommission(res.data);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const addCommission = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createCommission(data);

      setIsLoading(false);
      setSuccessMessage("Referral Commission Successfully Added.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const editCommission = async (id, data) => {
    setIsLoading(true);
    setSuccessMessage("");
    setError("");
    try {
      const res = await updateCommission(id, data);

      setIsLoading(false);
      setSuccessMessage("Referral Commission Successfully Updated.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setError("");
    setSuccessMessage("");
    setIsLoading(false);
  };

  return {
    commission,
    successMessage,
    isLoading,
    error,
    reset,
    getCommission,
    editCommission,
    addCommission,
  };
}
