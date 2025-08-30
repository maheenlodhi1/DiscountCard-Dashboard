import { useState } from "react";
import { fetchPayoutRequest, updatePayoutRequest } from "./payoutRequestsApi";

export default function usePayoutRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [PayoutRequest, setPayoutRequest] = useState(null);

  const getPayoutRequest = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchPayoutRequest(id);

      setIsLoading(false);
      setPayoutRequest(res.data);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const editPayoutRequest = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await updatePayoutRequest(id, data);

      setIsLoading(false);
      setSuccessMessage("PayoutRequest Successfully Updated.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setPayoutRequest(null);
    setError("");
    setSuccessMessage("");
    setIsLoading(false);
  };

  return {
    PayoutRequest,
    successMessage,
    isLoading,
    error,
    reset,
    getPayoutRequest,
    editPayoutRequest,
  };
}
