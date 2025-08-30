import ModalLayout from "@/components/Modals/Layout";
import Spinner from "@/components/Loaders/Spinner";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useCoupon from "@/features/coupons/useCoupon";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ErrorAlert from "@/components/Alerts/ErrorAlert";
import { fetchAllCoupons } from "@/features/coupons/couponsSlice";

export default function DeleteCouponModal({
  couponId,
  show,
  setShow,
  setCouponData,
}) {
  const { removeCoupon, error, successMessage, isLoading, reset } = useCoupon();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(fetchAllCoupons());
    reset();
    setShow(false);
    setCouponData(null);
  };

  useEffect(() => {
    if (successMessage) {
      closeModal();
    }
  }, [successMessage]);

  return (
    <ModalLayout isOpen={show} setIsOpen={closeModal}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Delete Coupon</h3>
          <button type="button" onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>

        <h4 className="text-center">
          Are you sure want to delete this coupon ?
        </h4>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        <div className=" flex justify-center  gap-x-4 mt-10 text-center md:text-base text-xs font-medium">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-md text-gray-600 bg-gray-100 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={() => {
              removeCoupon(couponId);
            }}
            className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-800"
          >
            {isLoading ? <Spinner /> : "Delete"}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
