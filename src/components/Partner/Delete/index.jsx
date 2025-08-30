import { useDispatch } from "react-redux";
import ModalLayout from "@/components/Modals/Layout";
import Spinner from "@/components/Loaders/Spinner";
import ErrorAlert from "@/components/Alerts/ErrorAlert";
import { XMarkIcon } from "@heroicons/react/24/outline";
import usePartner from "@/features/partners/usePartner";
import { useEffect } from "react";
import { fetchAllPartners } from "@/features/partners/partnersSlice";
export default function DeletePartnerModal({
  pageNo,
  partnerId,
  show,
  setShow,
  setMessage,
}) {
  const dispatch = useDispatch();
  const { removePartner, reset, successMessage, error, isLoading } =
    usePartner();

  const handleDelete = () => {
    removePartner(partnerId);
  };

  const closeModal = () => {
    reset();
    setShow(false);
  };

  useEffect(() => {
    if (successMessage) {
      setMessage(successMessage);
      dispatch(fetchAllPartners({ pageNo }));
      closeModal();
    }
  }, [dispatch, successMessage, setMessage]);

  return (
    <ModalLayout isOpen={show} setIsOpen={closeModal}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Delete Partner</h3>
          <button type="button" onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        <h4 className="text-center">
          Are you sure want to delete this partner ?
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
