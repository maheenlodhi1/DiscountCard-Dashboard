import { useState } from "react";
import {
  createOffer,
  createOfferInvoice,
  deleteOffer,
  fetchOffer,
  updateOffer,
} from "./offerApi";

export default function useOffer() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [offer, setOffer] = useState(null);

  const getOffer = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchOffer(id);

      setOffer(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addOffer = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createOffer(data);

      setSuccessMessage("Offer Successfully Added.");
      if (res.status === 208) {
        setError("Partner Already has an Offer.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const approveOffer = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createOfferInvoice(data);
      if (res.status === 204) {
        setSuccessMessage("Invoice Successfully Created.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editOffer = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await updateOffer(id, data);

      setSuccessMessage("Offer Successfully Updated.");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeOffer = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await deleteOffer(id, data);

      setSuccessMessage("Offer Successfully Deleted.");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setOffer(null);
    setError("");
    setSuccessMessage("");
  };

  return {
    offer,
    successMessage,
    isLoading,
    error,
    reset,
    getOffer,
    addOffer,
    editOffer,
    removeOffer,
    approveOffer,
  };
}
