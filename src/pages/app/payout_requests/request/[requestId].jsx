import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import usePayoutRequest from "@/features/payoutRequests/usePayoutRequests";
import { FileInput } from "@/components/FileInput";
import { TrashIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

export default function OfferDetails() {
  const [edit, setEdit] = useState(false);

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const {
    getPayoutRequest,
    editPayoutRequest,
    reset,
    PayoutRequest,
    isLoading,
    error,
    successMessage,
  } = usePayoutRequest();
  const router = useRouter();
  const requestId = router?.query?.requestId;

  const toggleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    if (requestId) {
      getPayoutRequest(requestId);
    }
  }, [requestId]);
  return (
    <AppLayout>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Request #{requestId?.slice(-4)}
          </h1>{" "}
          <div className="text-end md:text-base text-sm font-semibold">
            <button
              disabled={PayoutRequest?.status == "rejected"}
              type="button"
              onClick={() => setShowRejectModal(true)}
              className="px-8 py-2 rounded-lg mr-2 border-primary border text-primary hover:bg-gray-100"
            >
              Reject
            </button>
            <button
              disabled={PayoutRequest?.status === "approved"}
              type="button"
              onClick={() => setShowApproveModal(true)}
              className="px-8 py-2 rounded-lg text-white bg-primary hover:bg-primary-light"
            >
              Approve
            </button>
          </div>
        </div>
        <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
          <div className="flex justify-between mb-4">
            <h1 className="text-lg font-semibold">Request Details</h1>
            <button
              type="button"
              onClick={toggleEdit}
              className="flex gap-x-2 items-center text-sm text-primary hover:text-primary-light"
            >
              <PencilSquareIcon className="w-5 h-5" />
              <span>Edit</span>
            </button>
          </div>
          {isLoading && !PayoutRequest && (
            <div className="flex items-center justify-center h-96">
              <SpinnerLarge />
            </div>
          )}
          {PayoutRequest ? (
            <Formik
              initialValues={{
                userEmail: PayoutRequest?.userEmail,
                amount: PayoutRequest?.amount,
                phoneNo: PayoutRequest?.accountDetails?.phoneNo,
                bankName: PayoutRequest?.accountDetails?.bankName,
                beneficiaryName: PayoutRequest?.accountDetails?.beneficiaryName,
                accountNumber: PayoutRequest?.accountDetails?.accountNumber,
                iban: PayoutRequest?.accountDetails?.iban,
                name: PayoutRequest?.accountDetails?.name,
              }}
              onSubmit={(values) => {
                handleEditOffer(data);
              }}
            >
              {({}) => (
                <Form>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium"
                      >
                        User email
                      </label>
                      <Field
                        name="userEmail"
                        id="userEmail"
                        type="text"
                        disabled={true}
                        className="text-field"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="amount"
                        className="block mb-2 text-sm font-medium"
                      >
                        Amount
                      </label>
                      <Field
                        name="amount"
                        id="amount"
                        type="number"
                        min={10}
                        max={100}
                        disabled={true}
                        className="number-field"
                      />
                    </div>
                    <div className="col-span-2">
                      <h6 className="text-lg">Account Detail</h6>
                    </div>
                    <div>
                      <label
                        htmlFor="phoneNo"
                        className="block mb-2 text-sm font-medium"
                      >
                        Phone Number
                      </label>
                      <Field
                        name="phoneNo"
                        id="phoneNo"
                        type="text"
                        disabled={true}
                        className="text-field"
                      />
                    </div>
                    {PayoutRequest?.accountDetails?.type === "bank" && (
                      <>
                        <div>
                          <label
                            htmlFor="bankName"
                            className="block mb-2 text-sm font-medium"
                          >
                            Bank Name
                          </label>
                          <Field
                            name="bankName"
                            id="bankName"
                            type="text"
                            disabled={true}
                            className="text-field"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="accountNumber"
                            className="block mb-2 text-sm font-medium"
                          >
                            Account Number
                          </label>
                          <Field
                            name="accountNumber"
                            id="accountNumber"
                            type="text"
                            disabled={true}
                            className="text-field"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="beneficiaryName"
                            className="block mb-2 text-sm font-medium"
                          >
                            Beneficiary Name
                          </label>
                          <Field
                            name="beneficiaryName"
                            id="beneficiaryName"
                            type="text"
                            disabled={true}
                            className="text-field"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="beneficiaryName"
                            className="block mb-2 text-sm font-medium"
                          >
                            IBAN
                          </label>
                          <Field
                            name="iban"
                            id="iban"
                            type="text"
                            disabled={true}
                            className="text-field"
                          />
                        </div>
                      </>
                    )}
                    {PayoutRequest?.accountDetails?.type === "alansari" && (
                      <div>
                        <label
                          htmlFor="name"
                          className="block mb-2 text-sm font-medium"
                        >
                          Name
                        </label>
                        <Field
                          name="name"
                          id="name"
                          type="text"
                          disabled={true}
                          className="text-field"
                        />
                      </div>
                    )}
                  </div>
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
      {((PayoutRequest && PayoutRequest?.status === "pending") ||
        PayoutRequest?.status == "rejected") && (
        <>
          <ApproveModal
            requestId={requestId}
            show={showApproveModal}
            setShow={setShowApproveModal}
          />
          <RejectionModal
            requestId={requestId}
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

function ApproveModal({ requestId, show, setShow }) {
  const {
    editPayoutRequest,
    getPayoutRequest,
    successMessage,
    isLoading,
    error,
  } = usePayoutRequest();

  const handleApprove = (receiptUrl) => {
    editPayoutRequest(requestId, { receiptUrl, status: "paid" });
  };

  useEffect(() => {
    if (successMessage) {
      getPayoutRequest(requestId);
      setShow(false);
    }
  }, [successMessage]);

  return (
    <ModalLayout isOpen={show} setIsOpen={setShow}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-auto p-6">
        <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
          <h3 className="md:text-lg font-semibold">Approve Request</h3>
          <button type="button" onClick={() => setShow(false)}>
            <XMarkIcon className="w-6 h-6 stroke-2" />
          </button>
        </div>
        {error && <ErrorAlert>{error}</ErrorAlert>}
        {successMessage && <SuccessAlert>{successMessage}</SuccessAlert>}
        <Formik
          initialValues={{ receiptUrl: "" }}
          onSubmit={(values) => {
            const { receiptUrl } = values;
            handleApprove(receiptUrl);
          }}
        >
          {({ values }) => (
            <Form>
              <div className="my-5">
                <div>
                  <span className="block mb-2 text-sm font-medium">
                    Receipt Image
                  </span>
                  {!values.receiptUrl ? (
                    <Field
                      as={FileInput}
                      name="receiptUrl"
                      id="receiptUrl"
                      multiple={false}
                      accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                    />
                  ) : (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setFieldValue("receiptUrl", "")}
                        className="absolute top-0 right-0 m-1 p-1 z-10 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                      <Image
                        src={values.receiptUrl}
                        alt={`Image`}
                        width={500}
                        height={300}
                        className=" h-72 mx-auto object-contain"
                      />
                    </div>
                  )}
                  <ErrorMessage
                    component={"p"}
                    name="receiptUrl"
                    className="text-sm text-red-700"
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
                  {isLoading ? <Spinner /> : "Approve"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </ModalLayout>
  );
}

function RejectionModal({ requestId, show, setShow }) {
  const {
    editPayoutRequest,
    getPayoutRequest,
    successMessage,
    isLoading,
    error,
  } = usePayoutRequest();

  const handleReject = (rejectionReason) => {
    editPayoutRequest(requestId, {
      rejectionReason: rejectionReason,
      status: "rejected",
    });
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        getPayoutRequest(requestId);
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
