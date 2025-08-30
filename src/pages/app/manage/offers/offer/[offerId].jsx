import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "@/features/categories/categoriesSlice";
import { fetchAllCategories } from "@/features/categories/categoryApi";
import {
  fetchAllPartners,
  getAllPartners,
} from "@/features/partners/partnersSlice";
import { offerValidation } from "@/schemas";
import useOffer from "@/features/offers/useOffer";
import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import Spinner from "@/components/Loaders/Spinner";
import ModalLayout from "@/components/Modals/Layout";
import SimpleNotification from "@/components/Notifications/Simple";
import AppLayout from "@/layouts/AppLayout";
import SelectInput from "@/components/SelectInput";
import SpinnerLarge from "@/components/Loaders/Spinner/SpinnerLarge";
import { OfferImages } from "@/components/OfferImages";
import { GoogleMapsInput } from "@/components/GoogleMapsInput";
import ToggleButton from "@/components/Switch";
import TimePicker from "@/components/TimePicker";
import MultiSelectBox from "@/components/MultiSelectBox";
import { days } from "../add";

const durations = [
  { value: "3 Months", label: "3 Months" },
  { value: "6 Months", label: "6 Months" },
  { value: "12 Months", label: "12 Months" },
];

export default function OfferDetails() {
  const [edit, setEdit] = useState(false);

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const {
    getOffer,
    editOffer,
    reset,
    offer,
    isLoading,
    error,
    successMessage,
  } = useOffer();
  const categories = useSelector(getAllCategories);
  const partners = useSelector(getAllPartners);
  const dispatch = useDispatch();
  const router = useRouter();
  const offerId = router?.query?.offerId;

  const categoriesList = categories?.map((category) => {
    return { value: category.title, label: category.title };
  });

  const partnersList = partners?.map((partner) => {
    return { value: partner.id, label: partner.businessName };
  });

  const handleEditOffer = (data) => {
    editOffer(offerId, data);
    toggleEdit();
  };

  const handleToggleFeatured = (val) => {
    editOffer(offerId, { isFeatured: val });
  };

  const toggleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    reset();
    dispatch(fetchAllCategories());
    dispatch(fetchAllPartners({ pageNo: 1, pageSize: 10000 }));
  }, []);

  useEffect(() => {
    if (offerId) {
      getOffer(offerId);
    }
  }, [offerId]);
  console.log("offer days", offer?.days);

  return (
    <AppLayout>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Offer #{offerId?.slice(-4)}</h1>
          {offer && offer.promotionStatus === "active" && (
            <div className="flex items-center gap-2">
              <span>Feature Offer</span>
              <ToggleButton
                value={offer.isFeatured}
                onToggle={handleToggleFeatured}
              />
            </div>
          )}
          {((offer && offer.promotionStatus === "pending") ||
            (offer && offer.promotionStatus === "rejected")) && (
            <div className="text-end md:text-base text-sm font-semibold">
              <button
                disabled={offer?.promotionStatus == "rejected"}
                type="button"
                onClick={() => setShowRejectModal(true)}
                className="px-8 py-2 rounded-lg mr-2 border-primary border text-primary hover:bg-gray-100"
              >
                Reject
              </button>
              <button
                disabled={offer?.promotionStatus === "approved"}
                type="button"
                onClick={() => setShowApproveModal(true)}
                className="px-8 py-2 rounded-lg text-white bg-primary hover:bg-primary-light"
              >
                Approve
              </button>
            </div>
          )}
        </div>
        <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
          <div className="flex justify-between mb-4">
            <h1 className="text-lg font-semibold">Offer Details</h1>
            <button
              type="button"
              onClick={toggleEdit}
              className="flex gap-x-2 items-center text-sm text-primary hover:text-primary-light"
            >
              <PencilSquareIcon className="w-5 h-5" />
              <span>Edit</span>
            </button>
          </div>
          {isLoading && !offer && (
            <div className="flex items-center justify-center h-96">
              <SpinnerLarge />
            </div>
          )}
          {offer ? (
            <Formik
              initialValues={{
                partner: {
                  value: offer?.partner.id || "",
                  label: "",
                },
                title: offer.title || "",
                discount: offer?.discount || 0,
                description: offer?.description || "",
                isFeatured: offer?.isFeatured || false,
                images: offer?.images || [],
                locations: offer?.locations || [],
                days: offer?.days || [],
                offerAvailTime: offer?.offerAvailTime || [],
                categoryName: {
                  value: offer?.categoryName || "",
                  label: offer?.categoryName || "",
                },
                duration: {
                  value: offer?.duration || "",
                  label: offer?.duration || "",
                },
              }}
              validationSchema={offerValidation}
              onSubmit={(values) => {
                const data = {
                  ...values,
                  partner: values.partner.value,
                  categoryName: values.categoryName.value,
                  discount: undefined,
                  duration: undefined,
                };
                handleEditOffer(data);
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                    <div className="col-span-2">
                      <label className="block mb-2 text-sm font-medium">
                        Partner
                      </label>
                      <Field
                        name="partner"
                        id="partner"
                        as={SelectInput}
                        disabled={!edit}
                        items={partnersList}
                        className="text-field"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium"
                      >
                        Offer Title
                      </label>
                      <Field
                        name="title"
                        id="title"
                        type="text"
                        disabled={!edit}
                        className="text-field"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        Offer Category
                      </label>
                      <Field
                        name="categoryName"
                        id="categoryName"
                        as={SelectInput}
                        disabled={!edit}
                        items={categoriesList}
                      />
                    </div>
                    <div className="relative">
                      <label className="block mb-2 text-sm font-medium">
                        Offer Days
                      </label>
                      <MultiSelectBox
                        disabled={!edit}
                        placeholder={"Select Days"}
                        defaultIndices={values?.days?.map((item) =>
                          days.findIndex((i) => i.value === item.toLowerCase())
                        )}
                        onSelect={(items) => {
                          setFieldValue(
                            "days",
                            items.map((item) => item.value)
                          );
                        }}
                        items={days || []}
                      />
                    </div>
                    <div>
                      <TimePicker
                        defaultValues={values.offerAvailTime}
                        onTimeChange={({ endTime, startTime }) => {
                          setFieldValue("offerAvailTime", {
                            startTime,
                            endTime,
                          });
                        }}
                        disabled={!edit}
                      />
                      <div className="flex justify-between">
                        <ErrorMessage
                          component={"p"}
                          name="offerAvailTime.startTime"
                          className="text-red-600 text-sm"
                        />
                        <ErrorMessage
                          component={"p"}
                          name="offerAvailTime.endTime"
                          className="text-red-600 text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="discount"
                        className="block mb-2 text-sm font-medium"
                      >
                        Discount %
                      </label>
                      <Field
                        name="discount"
                        id="discount"
                        type="number"
                        min={10}
                        max={100}
                        disabled={true}
                        className="number-field"
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium">
                        Duration
                      </label>
                      <Field
                        name="duration"
                        id="duration"
                        as={SelectInput}
                        disabled={true}
                        items={durations}
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium"
                      >
                        Offer Description
                      </label>
                      <Field
                        name="description"
                        id="description"
                        as="textarea"
                        rows="5"
                        disabled={!edit}
                        className="textarea-field"
                      />
                    </div>
                    <div className="col-span-2 relative">
                      <label className="block mb-2 text-sm font-medium">
                        Locations
                      </label>
                      <Field
                        name="locations"
                        id="locations"
                        disabled={!edit}
                        as={GoogleMapsInput}
                      />
                    </div>
                  </div>
                  <OfferImages disabled={!edit} />
                  {edit && (
                    <div className="my-4 text-end md:text-base text-sm font-semibold">
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={toggleEdit}
                        className="px-8 py-2  rounded-lg mr-2 text-primary hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-2  rounded-lg text-white bg-primary hover:bg-primary-light"
                      >
                        {isLoading ? <Spinner /> : "Edit & Save"}
                      </button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          ) : null}
        </div>
      </section>
      {((offer && offer.promotionStatus === "pending") ||
        offer?.promotionStatus == "rejected") && (
        <>
          <ApproveModal
            offerId={offerId}
            show={showApproveModal}
            setShow={setShowApproveModal}
          />
          <RejectionModal
            offerId={offerId}
            show={showRejectModal}
            setShow={setShowRejectModal}
          />
        </>
      )}
      {successMessage && (
        <SimpleNotification
          type={"success"}
          heading={"Success"}
          message={successMessage}
          setMessage={() => {}}
        />
      )}
      {error && (
        <SimpleNotification
          type={"error"}
          heading={"Error"}
          message={error}
          setMessage={() => {}}
        />
      )}
    </AppLayout>
  );
}

function ApproveModal({ offerId, show, setShow }) {
  const { getOffer, editOffer, successMessage, isLoading, error } = useOffer();

  const handleApprove = () => {
    editOffer(offerId, {
      isActive: true,
    });
  };

  useEffect(() => {
    if (successMessage) {
      getOffer(offerId);
      setShow(false);
    }
  }, [successMessage]);

  return (
    <ModalLayout isOpen={show} setIsOpen={setShow}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Approve Offer</h3>
          <button type="button" onClick={() => setShow(false)}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
        <p className="text-center my-8">Are you sure you want to approve?</p>
        <div className=" text-center md:text-base text-sm font-semibold">
          <button
            type="button"
            onClick={() => setShow(false)}
            disabled={isLoading}
            className="px-8 py-2  rounded-lg mr-2 text-primary hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleApprove}
            disabled={isLoading}
            className="px-8 py-2  rounded-lg text-white bg-primary hover:bg-primary-light"
          >
            {isLoading ? <Spinner /> : "Approve"}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}

function RejectionModal({ offerId, show, setShow }) {
  const { editOffer, getOffer, successMessage, isLoading, error } = useOffer();

  const handleReject = (rejectionReason) => {
    editOffer(offerId, {
      rejectionReason: rejectionReason,
      promotionStatus: "rejected",
    });
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        getOffer(offerId);
        setShow(false);
      }, 500);
    }
  }, [successMessage]);

  return (
    <ModalLayout isOpen={show} setIsOpen={setShow}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Reject Offer</h3>
          <button type="button" onClick={() => setShow(false)}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
        <Formik
          initialValues={{ rejectionReason: "" }}
          onSubmit={(values) => {
            const { rejectionReason } = values;
            handleReject(rejectionReason);
          }}
        >
          <Form>
            <div className="my-5">
              <div>
                <label
                  htmlFor="rejectionReason"
                  className="block mb-2 text-sm font-medium"
                >
                  Reason for Rejection
                </label>
                <Field
                  name="rejectionReason"
                  id="rejectionReason"
                  as="textarea"
                  className="text-field"
                />
              </div>
            </div>
            <div className=" text-center md:text-base text-sm font-semibold">
              <button
                type="button"
                onClick={() => setShow(false)}
                disabled={isLoading}
                className="px-8 py-2  rounded-lg mr-2 text-primary hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-2  rounded-lg text-white bg-primary hover:bg-primary-light"
              >
                {isLoading ? <Spinner /> : "Reject"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </ModalLayout>
  );
}
