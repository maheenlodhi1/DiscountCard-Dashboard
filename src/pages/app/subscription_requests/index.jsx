import { sort } from "@/features/transactions/transactionSlice";
import { formatPage, handleSort } from "@/utils/generics";
import { EyeIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "@/components/Pagination";
import Searchbar from "@/components/Searchbar";
import LoadingTable from "@/components/Tables/Loading";
import SimpleTable from "@/components/Tables/Simple";

import {
  fetchAllSubscriptions,
  getSubscriptionRequests,
  getSubscriptionsError,
  getSubscriptionsLoading,
  getSubscriptionsPagination,
} from "@/features/subscriptionRequests/subscriptionsSlice";
import AppLayout from "@/layouts/AppLayout";
import dayjs from "dayjs";

const headers = [
  { label: "Full Name", value: "" },
  { label: "Email", value: "" },
  { label: "Phone", value: "" },
  { label: "Subject", value: "" },
  { label: "Date", value: "" },
  { label: "", value: "" },
];
export default function SubscriptionRequests() {
  const dispatch = useDispatch();

  const subscriptions = useSelector(getSubscriptionRequests);
  const loading = useSelector(getSubscriptionsLoading);
  const error = useSelector(getSubscriptionsError);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const pagination = useSelector(getSubscriptionsPagination);

  const sortRequests = (array) => {
    dispatch(sort(array));
  };

  const handleSearch = () => {
    dispatch(
      fetchAllSubscriptions({
        pageNo: pageNumber,
        search: JSON.stringify({ _id: search }),
      })
    );
  };

  useEffect(() => {
    if (!search) {
      dispatch(fetchAllSubscriptions({ pageNo: pageNumber }));
    }
  }, [dispatch, pageNumber, search]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex items-center justify-between">
          <h3>Subscription Requests</h3>
          <div className="flex gap-x-2"></div>
        </div>
        <div className="my-4 flex justify-between items-center">
          <div className="w-1/3">
            <Searchbar
              search={search}
              setSearch={setSearch}
              placeholder={"Search ..."}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        {loading && <LoadingTable headers={headers} length={10} />}
        {!loading && subscriptions.length > 0 && (
          <SimpleTable
            headers={headers}
            handleSort={(key, isDescending) => {
              handleSort(key, subscriptions, sortRequests, isDescending);
            }}
          >
            {subscriptions.map((subscription, index) => (
              <tr
                key={subscription.id}
                className={`${
                  index % 2 === 0 ? undefined : "bg-gray-50"
                } text-center`}
              >
                <td className="whitespace-nowrap p-3 text-sm ">
                  {formatPage(pagination.pageNo, index)}
                </td>
                <td className="whitespace-nowrap p-3 text-sm">
                  {subscription.fullName}
                </td>
                <td className="whitespace-nowrap p-3 text-sm">
                  {subscription.email}
                </td>
                <td className="whitespace-nowrap p-3 text-sm">
                  {subscription.phoneNo}
                </td>
                <td className="whitespace-nowrap p-3  text-wrap max-w-40 text-sm">
                  {subscription.subject}
                </td>
                <td className="whitespace-nowrap p-3  text-wrap max-w-40 text-sm">
                  {dayjs(subscription.createAt).format("MM/DD/YYYY")}
                </td>

                <td className="whitespace-nowrap p-3 text-sm">
                  <Link
                    href={`subscription_requests/request/${subscription.id}`}
                    className=" px-4 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                  >
                    <EyeIcon className="w-4 h-4 inline" />
                  </Link>
                </td>
              </tr>
            ))}
          </SimpleTable>
        )}
        {!loading && !error && !subscriptions.length && (
          <h4 className="text-center md:text-lg font-semibold text-gray-600">
            No subscriptions requests available.
          </h4>
        )}
        {!loading && error && (
          <p className="text-center md:text-lg font-semibold text-gray-600">
            {error}
          </p>
        )}
        <Pagination
          currentPage={pagination.pageNo}
          handleClick={setPageNumber}
          totalPages={pagination.totalPages}
        />
      </section>
    </AppLayout>
  );
}
