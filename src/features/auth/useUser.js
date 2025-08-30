import { useState } from "react";

import { updateAdmin } from "./authApi";

export default function useUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const editAdmin = async (id, data) => {
    setIsLoading(true);
    setError("");
    setSuccessMessage("");
    try {
      const res = await updateAdmin(id, data);

      setSuccessMessage("User Successfully Updated.");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setError("");
    setSuccessMessage("");
    setIsLoading(false);
  };

  return {
    successMessage,
    isLoading,
    error,
    reset,
    editAdmin,
  };
}
