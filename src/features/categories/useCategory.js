import { useState } from "react";
import {
  createCategory,
  deleteCategory,
  fetchCategory,
  updateCategory,
} from "./categoryApi";

export default function useCategory() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [category, setCategory] = useState(null);

  const getCategory = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchCategory(id);

      setIsLoading(false);
      setCategory(res.data);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const addCategory = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createCategory(data);

      setIsLoading(false);
      setSuccessMessage("Category Successfully Added.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const editCategory = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await updateCategory(id, data);

      setIsLoading(false);
      setSuccessMessage("Category Successfully Updated.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const removeCategory = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await deleteCategory(id, data);

      setIsLoading(false);
      setSuccessMessage("Category Successfully Deleted.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setCategory(null);
    setError("");
    setSuccessMessage("");
    setIsLoading(false);
  };

  return {
    category,
    successMessage,
    isLoading,
    error,
    reset,
    getCategory,
    addCategory,
    editCategory,
    removeCategory,
  };
}
