import ErrorAlert from "@/components/Alerts/ErrorAlert";
import SuccessAlert from "@/components/Alerts/SuccessAlert";
import Spinner from "@/components/Loaders/Spinner";
import SpinnerLarge from "@/components/Loaders/Spinner/SpinnerLarge";
import ModalLayout from "@/components/Modals/Layout";
import useSubscriptions from "@/features/subscriptionRequests/useSubscriptions";
import AppLayout from "@/layouts/AppLayout";
import { XMarkIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

dayjs.extend(LocalizedFormat);
dayjs().format("L LTS");

export default function RequestDetails() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { getRequestDetails, requestDetails, isLoading } = useSubscriptions();
  const requestId = router?.query?.requestId || "";

  useEffect(() => {
    if (requestId) {
      getRequestDetails(requestId);
    }
  }, [requestId]);

  return (
    <AppLayout>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Request #{requestId}</h1>
          <button onClick={() => setOpen(true)} className="btn-primary">
            Send Invoice
          </button>
        </div>
        {isLoading && !requestDetails && (
          <div className="flex items-center justify-center h-96">
            <SpinnerLarge />
          </div>
        )}
        {requestDetails && (
          <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300 space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="font-semibold">User Details</h5>
                <div>
                  <dt className="font-medium">Full Name:</dt>
                  <dd>{requestDetails.fullName}</dd>
                </div>
                <div>
                  <dt className="font-medium">Email:</dt>
                  <dd>{requestDetails.email}</dd>
                </div>
                <div>
                  <dt className="font-medium">Phone Number:</dt>
                  <dd>{requestDetails.phoneNo}</dd>
                </div>
              </div>
              <div>
                <h5 className="font-semibold">Request Details</h5>
                <div>
                  <dt className="font-medium">Subject:</dt>
                  <dd>{requestDetails.subject}</dd>
                </div>
                <div>
                  <dt className="font-medium">Type:</dt>
                  <dd>{requestDetails.type}</dd>
                </div>
                <div>
                  <dt className="font-medium">Date:</dt>
                  <dd>
                    {dayjs(requestDetails.createdAt).format(
                      "MM/DD/YYYY h:mm:ss A"
                    )}
                  </dd>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold">Message</h5>
              <p className="whitespace-pre-wrap">{requestDetails.details}</p>
            </div>
          </div>
        )}
      </section>
      <SendInvoice
        requestId={requestId}
        show={open}
        setShow={setOpen}
        user={requestDetails?.user}
      />
    </AppLayout>
  );
}

function SendInvoice({ user, show, setShow, requestId }) {
  const { sendInvoice, successMessage, isLoading, error } = useSubscriptions();
  const [amount, setAmount] = useState("");
  const handleSendInvoice = () => {
    sendInvoice(
      {
        user,
        amount,
      },
      requestId
    );
  };

  useEffect(() => {
    if (successMessage) {
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
        <div>
          <label htmlFor="amount" className="block mb-2 text-sm font-medium">
            Amount
          </label>
          <input
            name="amount"
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-field"
            required
          />
        </div>
        <div className=" text-center md:text-base text-sm font-semibold mt-5">
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
            onClick={handleSendInvoice}
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? <Spinner /> : "Send Invoice"}
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
