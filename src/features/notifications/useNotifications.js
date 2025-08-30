import { useState } from "react";
import {
  createNotification as createNotificationApi,
  deleteNotification,
  fetchNotification,
  broadcastNotification as broadcastNotificationApi,
  updateNotification,
} from "./notificationsApi";

export default function useNotifications() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [notification, setNotification] = useState(null);

  const getNotification = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchNotification(id);
    
        setIsLoading(false);
        setNotification(res.data);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const createNotification = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createNotificationApi(data);

        setIsLoading(false);
        setSuccessMessage("Ad Successfully Created.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const editNotification = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await updateNotification(id, data);
      
        setIsLoading(false);
        setSuccessMessage("Ad Successfully Updated.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const broadcastNotification = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await broadcastNotificationApi(id);
      
        setIsLoading(false);
        setSuccessMessage("Ad Successfully Updated.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const removeNotification = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await deleteNotification(id, data);
      
        setIsLoading(false);
        setSuccessMessage("Ad Successfully Deleted.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setNotification(null);
    setError("");
    setSuccessMessage("");
    setIsLoading(false);
  };

  return {
    notification,
    successMessage,
    isLoading,
    error,
    reset,
    getNotification,
    createNotification,
    editNotification,
    broadcastNotification,
    removeNotification,
  };
}
