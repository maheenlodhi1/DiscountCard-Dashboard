import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import { FileInput } from "@/components/FileInput";
import Spinner from "@/components/Loaders/Spinner";
import ModalLayout from "@/components/Modals/Layout";
import { fetchAllCategories } from "@/features/categories/categoryApi";
import useCategory from "@/features/categories/useCategory";
import { TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export default function AddCategoryModal({ show, setShow, setMessage }) {
  const dispatch = useDispatch();
  const { addCategory, reset, successMessage, error, isLoading } =
    useCategory();

  const closeModal = useCallback(() => {
    reset();
    setShow(false);
  }, [reset, setShow]);

  useEffect(() => {
    if (successMessage) {
      setMessage(successMessage);
      dispatch(fetchAllCategories());
      closeModal();
    }
  }, [closeModal, dispatch, successMessage, setMessage]);
  return (
    <ModalLayout isOpen={show} setIsOpen={setShow}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Add Business Category</h3>
          <button type="button" onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
        <Formik
          initialValues={{
            title: "",
            img: "",
          }}
          validationSchema={Yup.object({
            title: Yup.string().required("Category title is required."),
            img: Yup.string().required("Category image is required."),
          })}
          onSubmit={(values) => {
            const { title, img } = values;
            addCategory({
              title: title,
              img: img,
            });
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium"
                  >
                    Category Title
                  </label>
                  <Field
                    name="title"
                    id="title"
                    type="text"
                    className="text-field"
                  />
                  <ErrorMessage
                    component={"p"}
                    name="title"
                    className="text-sm text-red-700"
                  />
                </div>
                <div>
                  <span className="block mb-2 text-sm font-medium">
                    Category Image
                  </span>
                  {!values.img ? (
                    <Field
                      as={FileInput}
                      name="img"
                      id="img"
                      multiple={false}
                      accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                    />
                  ) : (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setFieldValue("img", "")}
                        className="absolute top-0 right-0 m-1 p-1 z-10 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <Image
                        src={values.img}
                        alt={`${values.title} Image`}
                        width={500}
                        height={300}
                        className=" h-72 mx-auto object-contain"
                      />
                    </div>
                  )}
                  <ErrorMessage
                    component={"p"}
                    name="img"
                    className="text-sm text-red-700"
                  />
                </div>

                <div className="mt-auto ml-auto text-end md:text-base text-xs font-medium">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-1  rounded-md mr-2 text-primary hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-1 rounded-md text-white bg-primary hover:bg-primary-light"
                  >
                    {isLoading ? <Spinner /> : "Add"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
}
