import SpinnerLarge from "@/components/Loaders/Spinner/SpinnerLarge";
import useTransaction from "@/features/transactions/useTransaction";
import AppLayout from "@/layouts/AppLayout";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import { useRouter } from "next/router";
import { useEffect } from "react";

dayjs.extend(LocalizedFormat);
dayjs().format("L LTS");

export default function TransactionDetails() {
  const router = useRouter();
  const { getTransactionDetails, transactionDetails, isLoading } =
    useTransaction();
  const transactionId = router?.query?.transactionId || "";

  useEffect(() => {
    if (transactionId) {
      getTransactionDetails(transactionId);
    }
  }, [transactionId]);

  return (
    <AppLayout>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Transaction #{transactionId}
          </h1>
        </div>
        {isLoading && !transactionDetails && (
          <div className="flex items-center justify-center h-96">
            <SpinnerLarge />
          </div>
        )}
        {transactionDetails && (
          <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300 space-y-8">
            <div className="grid grid-cols-2">
              <div>
                <h5>Customer Details</h5>
                <div>
                  <dt className="font-medium">Name:</dt>
                  <dd>{`${transactionDetails?.customer?.firstName}  ${transactionDetails?.customer?.lastName}`}</dd>
                </div>
                <div>
                  <dt className="font-medium">Email:</dt>
                  <dd>{`${transactionDetails?.customer?.email}`}</dd>
                </div>
                <div>
                  <dt className="font-medium">Membership ID:</dt>
                  <dd>{`${transactionDetails?.customer?.subscription}`}</dd>
                </div>
              </div>
              <div>
                <h5>Partner Details</h5>
                <div>
                  <dt className="font-medium">Business Name:</dt>
                  <dd>{`${transactionDetails?.partner?.businessName}`}</dd>
                </div>
                <div>
                  <dt className="font-medium">Partner Name:</dt>
                  <dd>{`${transactionDetails?.partner?.firstName}  ${transactionDetails?.partner?.lastName}`}</dd>
                </div>
                <div>
                  <dt className="font-medium">Email:</dt>
                  <dd>{`${transactionDetails?.partner?.email}`}</dd>
                </div>
                <div>
                  <dt className="font-medium">Trade License:</dt>
                  <dd>{`${transactionDetails?.partner?.tradeLicense}`}</dd>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div>
                <h5>Offer Details</h5>
                <div>
                  <dt className="font-medium">Offer Title:</dt>
                  <dd>{`${transactionDetails?.promotion?.title} `}</dd>
                </div>
                <div>
                  <dt className="font-medium">Category:</dt>
                  <dd>{`${transactionDetails?.promotion?.categoryName}`}</dd>
                </div>
                <div>
                  <dt className="font-medium">Discount:</dt>
                  <dd>{`${transactionDetails?.promotion?.discount} %`}</dd>
                </div>
                <div>
                  <dt className="font-medium">Duration:</dt>
                  <dd>{`${transactionDetails?.promotion?.duration}`}</dd>
                </div>
              </div>
              <div>
                <h5>Transaction Details</h5>
                <div>
                  <dt className="font-medium">Total Bill:</dt>
                  <dd>{`${transactionDetails?.totalBill} `}</dd>
                </div>
                <div>
                  <dt className="font-medium">Discounted Price:</dt>
                  <dd>{`${transactionDetails?.discountPrice}`}</dd>
                </div>
                <div>
                  <dt className="font-medium">Saved Amount:</dt>
                  <dd>{`${transactionDetails?.totalSavings}`}</dd>
                </div>
                <div>
                  <dt className="font-medium">Date:</dt>
                  <dd>{`${dayjs(transactionDetails?.date).format(
                    "MM/DD/YYYY h:mm:ss A"
                  )}`}</dd>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </AppLayout>
  );
}
