import Spinner from "@/components/Loaders/Spinner";
import ModalLayout from "@/components/Modals/Layout";
import { fetchAllCoupons } from "@/features/coupons/couponsSlice";
import useCoupon from "@/features/coupons/useCoupon";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const defaultValues = {
  name: "",
  discount: "",
  maxUsageCount: "",
  expirationDate: "",
};

export default function CouponModal({
  show,
  setShow,
  initialValues,
  setCouponData,
}) {
  const { addCoupon, editCoupon, isLoading, successMessage } = useCoupon();
  const dispatch = useDispatch();

  const closeModal = () => {
    if (initialValues) setCouponData(null);
    dispatch(fetchAllCoupons());
    setShow(false);
  };

  const handleButtonClick = (values) => {
    if (initialValues) {
      const { expirationDate, name, discount, maxUsageCount } = values;
      editCoupon(initialValues.id, {
        expirationDate,
        name,
        discount,
        maxUsageCount,
      });
    } else {
      addCoupon(values);
    }
  };

  useEffect(() => {
    if (successMessage) {
      closeModal();
    }
  }, [successMessage]);
  return (
    <ModalLayout isOpen={show} setIsOpen={setShow}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">
            {initialValues ? "Edit Coupon" : "Create New Coupon"}
          </h3>

          <button type="button" onClick={closeModal}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        <Formik
          initialValues={initialValues || defaultValues}
          enableReinitialize
          onSubmit={(values) => {
            handleButtonClick(values);
          }}
        >
          {() => (
            <Form>
              <CouponField
                label="Coupon Name"
                id="name"
                name="name"
                type="text"
              />
              <CouponField
                label="Coupon Discount"
                id="discount"
                name="discount"
                type="number"
                min={1}
                max={100}
              />
              <CouponField
                label="Max Availability"
                id="maxUsageCount"
                name="maxUsageCount"
                type="number"
              />
              <CouponField
                label="Expiry Date"
                id="expirationDate"
                name="expirationDate"
                type="date"
              />
              <div className="space-y-4">
                <div className="mt-4 ml-auto text-end md:text-base text-xs font-medium">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-1  rounded-md mr-2 text-primary hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1 rounded-md text-white bg-primary hover:bg-primary-light"
                  >
                    {isLoading ? (
                      <Spinner />
                    ) : initialValues ? (
                      "Edit & Save"
                    ) : (
                      "Create Coupon"
                    )}
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

function CouponField({ label, id, name, type, ...rest }) {
  return (
    <div className="my-2">
      <label htmlFor={id} className="block mb-2 text-sm font-medium">
        {label}
      </label>
      <Field name={name} id={id} type={type} className="text-field" {...rest} />
      <ErrorMessage
        component={"p"}
        name={name}
        className="text-sm text-red-700"
      />
    </div>
  );
}
