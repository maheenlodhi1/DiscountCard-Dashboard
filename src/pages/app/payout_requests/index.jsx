import ContextMenu from "@/components/ContextMenu";
import SimpleNotification from "@/components/Notifications/Simple";
import Pagination from "@/components/Pagination";
import PayoutRequestsModal from "@/components/PayoutRequests/Manage";
import LoadingTable from "@/components/Tables/Loading";
import SimpleTable from "@/components/Tables/Simple";
import {
  fetchAllPayoutRequests,
  getAllPayoutRequests,
  getPayoutRequestsError,
  getPayoutRequestsLoading,
} from "@/features/payoutRequests/PayoutRequestsSlice";
import usePayoutRequest from "@/features/payoutRequests/usePayoutRequests";
import AppLayout from "@/layouts/AppLayout";
import { formatPage } from "@/utils/generics";
import { PlusIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const headers = [
  { label: "ID", value: "name" },
  { label: "User Email", value: "User Email" },
  { label: "Created Date", value: "createdAt" },
  { label: "Amount", value: "amount" },
  { label: "Status", value: "status" },
  { label: "", value: "" },
];

export default function PayoutRequests() {
  const { successMessage } = usePayoutRequest();
  const router = useRouter();
  const [payoutRequestData, setPayoutRequestData] = useState(null);
  const dispatch = useDispatch();
  const payoutRequests = useSelector(getAllPayoutRequests);
  const loading = useSelector(getPayoutRequestsLoading);
  const error = useSelector(getPayoutRequestsError);

  useEffect(() => {
    dispatch(fetchAllPayoutRequests(1));
  }, [dispatch]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex offers-center justify-between mb-3">
          <h3>Payout Requests</h3>
        </div>

        {loading && <LoadingTable headers={headers} length={10} />}

        <SimpleTable
          headers={headers}
          handleSort={(key, isDescending) =>
            handleSort(key, filteredOffers, setFilteredOffers, isDescending)
          }
        >
          {!!payoutRequests.length &&
            payoutRequests.map((payoutRequest, index) => (
              <PayoutRequestRow
                pageNo={1}
                payoutRequest={payoutRequest}
                key={payoutRequest.id}
                index={index}
                onView={() =>
                  router.push(`payout_requests/request/${payoutRequest.id}`)
                }
                onDelete={() => {
                  setPayoutRequestData(payoutRequest);
                  setOpenDeleteModal(true);
                }}
              />
            ))}
        </SimpleTable>

        {!loading && !payoutRequests.length && (
          <h4 className="text-center md:text-lg font-semibold text-gray-600">
            No Payout Requests
          </h4>
        )}
        {!loading && error && <p>{error}</p>}

        {successMessage && (
          <div className="mt-10">
            <SimpleNotification
              type={"success"}
              heading={"Success"}
              setMessage={() => {}}
              message={successMessage}
            />
          </div>
        )}
      </section>
    </AppLayout>
  );
}

function PayoutRequestRow({ pageNo, payoutRequest, index, onDelete, onView }) {
  return (
    <tr
      key={payoutRequest.id}
      className={`${index % 2 === 0 ? undefined : "bg-gray-50"} text-center`}
    >
      <td className="whitespace-nowrap p-3 text-sm ">
        {formatPage(pageNo, index)}
      </td>
      <td className="whitespace-nowrap p-3 text-sm ">
        {payoutRequest.id?.slice(-6)}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        {payoutRequest.userEmail}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        {dayjs(payoutRequest.createdAt).format("MM/DD/YYYY")}
      </td>

      <td className="whitespace-nowrap p-3 text-sm">
        {payoutRequest.amount} AED
      </td>
      <td className="whitespace-nowrap p-3 text-sm">{payoutRequest.status}</td>

      <td className="whitespace-nowrap p-3 text-sm">
        <ContextMenu onDelete={onDelete} onView={onView} showDelete={false} />
      </td>
    </tr>
  );
}
