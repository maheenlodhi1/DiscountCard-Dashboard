import { useState } from "react";
import { createInvoice, fetchRequestDetails } from "./subscriptionsApi";

export default function useSubscriptions() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [requestDetails, setRequestDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const getRequestDetails = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchRequestDetails(id);
      setIsLoading(false);
      setRequestDetails(res.data);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  const sendInvoice = async (payload, requestId) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createInvoice(payload);
      getRequestDetails(requestId);
      setIsLoading(false);
      setSuccessMessage("Invoice Successfully Sent.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setRequestDetails(null);
    setError("");
    setIsLoading(false);
  };

  return {
    requestDetails,
    isLoading,
    error,
    successMessage,
    reset,
    getRequestDetails,
    sendInvoice,
  };
}
