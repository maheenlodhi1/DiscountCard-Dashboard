import { useDispatch } from "react-redux";
import ModalLayout from "@/components/Modals/Layout";
import useCategory from "@/features/categories/useCategory";
import Spinner from "@/components/Loaders/Spinner";
import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { fetchAllCategories } from "@/features/categories/categoryApi";
export default function DeleteCategoryModal({
  categoryId,
  show,
  setShow,
  setMessage,
  setSelected,
}) {
  const dispatch = useDispatch();
  const { removeCategory, reset, successMessage, error, isLoading } =
    useCategory();

  const handleDelete = () => {
    removeCategory(categoryId);
  };

  const closeModal = () => {
    setSelected(null);
    reset();
    setShow(false);
  };

  useEffect(() => {
    if (successMessage) {
      setMessage(successMessage);
      dispatch(fetchAllCategories());
      closeModal();
    }
  }, [dispatch, successMessage, setMessage]);

  return (
    <ModalLayout isOpen={show} setIsOpen={closeModal}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Delete Business Category</h3>
          <button type="button" onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
        <h4 className="text-center">
          Are you sure want to delete this category ?
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
