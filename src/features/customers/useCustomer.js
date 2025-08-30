import { useCallback, useState } from "react";
import {
  createCustomer,
  deleteCustomer,
  fetchCustomer,
  updateCustomer,
} from "./customerApi";

export default function useCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [customer, setCustomer] = useState(null);

  const getCustomer = useCallback(async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchCustomer(id);

      setIsLoading(false);
      setCustomer(res.data);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  }, []);

  const addCustomer = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createCustomer(data);

      setIsLoading(false);
      setSuccessMessage("Customer Successfully Added.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const editCustomer = async (id, data) => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const res = await updateCustomer(id, data);

      setIsLoading(false);
      setSuccessMessage("Customer Successfully Updated.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const removeCustomer = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await deleteCustomer(id, data);

      setIsLoading(false);
      setSuccessMessage("Customer Successfully Deleted.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setCustomer(null);
    setError("");
    setSuccessMessage("");
    setIsLoading(false);
  };

  return {
    customer,
    successMessage,
    isLoading,
    error,
    reset,
    getCustomer,
    addCustomer,
    editCustomer,
    removeCustomer,
  };
}
