import { useState } from "react";
import {
  createCoupon,
  deleteCoupon,
  fetchCoupons,
  updateCoupon,
} from "./couponApi";

export default function useCoupon() {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [Coupon, setCoupon] = useState(null);

  const getCoupon = async (id) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetchCoupons(id);

      setIsLoading(false);
      setCoupon(res.data);
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const addCoupon = async (data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await createCoupon(data);

      setIsLoading(false);
      setSuccessMessage("Coupon Successfully Added.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const editCoupon = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await updateCoupon(id, data);

      setIsLoading(false);
      setSuccessMessage("Coupon Successfully Updated.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const removeCoupon = async (id, data) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await deleteCoupon(id, data);

      setIsLoading(false);
      setSuccessMessage("Coupon Successfully Deleted.");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setCoupon(null);
    setError("");
    setSuccessMessage("");
    setIsLoading(false);
  };

  return {
    Coupon,
    successMessage,
    isLoading,
    error,
    reset,
    getCoupon,
    addCoupon,
    editCoupon,
    removeCoupon,
  };
}
