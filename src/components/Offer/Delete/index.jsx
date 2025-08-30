import { useDispatch } from "react-redux";
import ModalLayout from "@/components/Modals/Layout";
import Spinner from "@/components/Loaders/Spinner";
import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect } from "react";
import useOffer from "@/features/offers/useOffer";
import { fetchAllOffers } from "@/features/offers/offersSlice";

export default function DeleteOfferModal({
  pageNo,
  offerId,
  show,
  setShow,
  setMessage,
}) {
  const dispatch = useDispatch();
  const { removeOffer, reset, successMessage, error, isLoading } = useOffer();

  const handleDelete = () => {
    removeOffer(offerId);
  };

  const closeModal = useCallback(() => {
    setTimeout(() => {
      reset();
      setShow(false);
    }, 500);
  }, [reset, setShow]);

  useEffect(() => {
    if (successMessage) {
      setMessage(successMessage);
      dispatch(fetchAllOffers({ pageNo }));
      closeModal();
    }
  }, [closeModal, dispatch, successMessage, setMessage, pageNo]);

  return (
    <ModalLayout isOpen={show} setIsOpen={closeModal}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Delete Offer</h3>
          <button type="button" onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
        <h4 className="text-center">
          Are you sure want to delete this offer ?
        </h4>
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
            disabled={isLoading}
            onClick={handleDelete}
            className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-800"
          >
            {isLoading ? <Spinner /> : "Delete"}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
