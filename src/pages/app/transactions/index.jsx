import { useDispatch, useSelector } from "react-redux";
import { ArrowDownTrayIcon, EyeIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Link from "next/link";

import {
  fetchAllTransactions,
  getAllTransactions,
  getTransactionsError,
  getTransactionsLoading,
  getTransactionsPagination,
  sort,
} from "@/features/transactions/transactionSlice";
import { formatPage, handleSort, parseJSONtoCSV } from "@/utils/generics";

import Pagination from "@/components/Pagination";
import AppLayout from "@/layouts/AppLayout";
import Searchbar from "@/components/Searchbar";
import SimpleTable from "@/components/Tables/Simple";
import LoadingTable from "@/components/Tables/Loading";
import { fetchTransactions } from "@/features/transactions/transactionApi";

const headers = [
  { label: "Transaction ID", value: "" },
  { label: "Customer ID", value: "" },
  { label: "Promotion", value: "" },
  { label: "Total Bill", value: "totalBill" },
  { label: "Discount Price", value: "discountPrice" },
  { label: "Savings", value: "totalSavings" },
  { label: "Date", value: "date" },
  { label: "", value: "" },
];
export default function Transactions() {
  const dispatch = useDispatch();

  const transactions = useSelector(getAllTransactions);
  const loading = useSelector(getTransactionsLoading);
  const error = useSelector(getTransactionsError);
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const pagination = useSelector(getTransactionsPagination);

  const handleCSVDownload = async () => {
    const fields = [
      "id",
      "customer",
      "promotionId.id",
      "totalBill",
      "discountPrice",
      "totalSavings",
      "date",
    ];

    try {
      const transactionsData = await fetchTransactions({ raw: true });

      if (transactionsData.length) {
        const url = parseJSONtoCSV(fields, transactions);
        const link = document.createElement("a");
        link.href = url;
        link.download = "transactions.csv";

        link.click();

        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sortTransactions = (array) => {
    dispatch(sort(array));
  };

  const handleSearch = () => {
    dispatch(
      fetchAllTransactions({
        pageNo: pageNumber,
        search: JSON.stringify({ _id: search }),
      })
    );
  };

  useEffect(() => {
    if (!search) {
      dispatch(fetchAllTransactions({ pageNo: pageNumber }));
    }
  }, [dispatch, pageNumber, search]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex items-center justify-between">
          <h3>Transactions Management</h3>
          <div className="flex gap-x-2">
            <button
              onClick={handleCSVDownload}
              type="button"
              className="btn-primary__with-icon"
            >
              <ArrowDownTrayIcon className="w-6 h-6" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
        <div className="my-4 flex justify-between items-center">
          <div className="w-1/3">
            <Searchbar
              search={search}
              setSearch={setSearch}
              placeholder={"Search by Transaction ID"}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        {loading && <LoadingTable headers={headers} length={10} />}
        {!loading && transactions.length > 0 && (
          <SimpleTable
            headers={headers}
            handleSort={(key, isDescending) => {
              handleSort(key, transactions, sortTransactions, isDescending);
            }}
          >
            {transactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={`${
                  index % 2 === 0 ? undefined : "bg-gray-50"
                } text-center`}
              >
                <td className="whitespace-nowrap p-3 text-sm ">
                  {formatPage(pagination.pageNo, index)}
                </td>
                <td className="whitespace-nowrap p-3 text-sm">
                  {transaction.id?.slice(-4)}
                </td>
                <td className="whitespace-nowrap p-3 text-sm">
                  {transaction.customer?.slice(-4)}
                </td>
                <td className="whitespace-nowrap p-3 text-sm">
                  {transaction.promotionId?.locale.en.title}
                </td>
                <td className="whitespace-nowrap p-3 text-sm">
                  {transaction.totalBill}
                </td>
                <td className="whitespace-nowrap p-3 text-sm">
                  {Number(transaction.discountPrice).toFixed(2)}
                </td>
                <td className="whitespace-nowrap p-3 text-sm">
                  {Number(transaction.totalSavings).toFixed(2)}
                </td>
                <td className="whitespace-nowrap p-3 text-sm">
                  {dayjs(transaction.date).format("MM/DD/YYYY")}
                </td>
                <td className="whitespace-nowrap p-3 text-sm">
                  <Link
                    href={`transactions/transaction/${transaction.id}`}
                    className="flex gap-x-2 items-center px-4 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
                  >
                    <EyeIcon className="w-4 h-4" />
                  </Link>
                </td>
              </tr>
            ))}
          </SimpleTable>
        )}
        {!loading && !error && !transactions.length && (
          <h4 className="text-center md:text-lg font-semibold text-gray-600">
            No transactions data available.
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
