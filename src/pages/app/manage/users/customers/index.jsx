import { useEffect, useState } from "react";
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import customersData from "@/data/customers.json";

import {
  fetchAllCustomers,
  getAllCustomers,
  getCustomersError,
  getCustomersLoading,
  getCustomersPagination,
  sort,
} from "@/features/customers/customersSlice";
import {
  createCustomer,
  fetchCustomers,
} from "@/features/customers/customerApi";
import dayjs from "dayjs";
import { formatPage, handleSort, parseJSONtoCSV } from "@/utils/generics";
import Searchbar from "@/components/Searchbar";
import SimpleTable from "@/components/Tables/Simple";
import DeleteCustomerModal from "@/components/Customer/Delete";
import SimpleNotification from "@/components/Notifications/Simple";
import Pagination from "@/components/Pagination";
import AppLayout from "@/layouts/AppLayout";
import ContextMenu from "@/components/ContextMenu";
import LoadingTable from "@/components/Tables/Loading";

const headers = [
  { label: "First Name", value: "firstName" },
  { label: "Last Name", value: "lastName" },
  { label: "Email", value: "" },
  { label: "Phone", value: "" },
  { label: "Date Joined", value: "createdAt" },
  { label: "Status", value: "" },
  { label: "Referals Count", value: "" },

  { label: "", value: "" },
];

export default function ManageCustomers() {
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const customers = useSelector(getAllCustomers);
  const loading = useSelector(getCustomersLoading);
  const error = useSelector(getCustomersError);
  const pagination = useSelector(getCustomersPagination);
  const router = useRouter();

  const handleCSVDownload = async () => {
    const fields = ["firstName", "lastName", "email", "phoneNo", "createdAt"];
    try {
      const customersData = await fetchCustomers({ raw: true });
      if (customersData.length) {
        const url = parseJSONtoCSV(fields, customersData);
        const link = document.createElement("a");
        link.href = url;
        link.download = "customers.csv";

        link.click();

        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sortCustomers = (array) => {
    dispatch(sort(array));
  };

  const handleSearch = () => {
    dispatch(
      fetchAllCustomers({
        pageNo: pageNumber,
        search: JSON.stringify({ firstName: search }),
      })
    );
  };

  const uploadCustomers = async () => {
    const promises = customersData.map((customer) => {
      return createCustomer(customer);
    });
    try {
      const results = await Promise.all(promises);
      console.log(results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!search) {
      dispatch(fetchAllCustomers({ pageNo: pageNumber }));
    }
  }, [dispatch, pageNumber, search]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex md:items-center justify-between items-start md:flex-row flex-col">
          <h3>Customers Management</h3>
          <div className="flex gap-x-2">
            <Link href="customers/add" className="btn-primary__with-icon">
              <PlusIcon className="w-6 h-6" />
              <span>Add Customer</span>
            </Link>
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
          <div>
            <Searchbar
              search={search}
              setSearch={setSearch}
              placeholder={"Search by First Name"}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        {loading && <LoadingTable headers={headers} length={10} />}
        {!loading && customers.length > 0 && (
          <SimpleTable
            headers={headers}
            handleSort={(key, isDescending) => {
              handleSort(key, customers, sortCustomers, isDescending);
            }}
          >
            {customers.map((customer, index) => (
              <CustomerRow
                customer={customer}
                index={index}
                pageNo={pagination.pageNo}
                key={index}
                onView={() => router.push(`customers/customer/${customer.id}`)}
                onDelete={() => {
                  setOpenDelete(true);
                  setSelectedId(customer.id);
                }}
              />
            ))}
          </SimpleTable>
        )}
        {!loading && !error && !customers.length && (
          <h4 className="text-center md:text-lg font-semibold text-gray-600">
            No customers Available. <br /> Start by adding a customer.
          </h4>
        )}
        {!loading && error && (
          <h4 className="text-center md:text-lg font-semibold text-gray-600">
            {error}
          </h4>
        )}
        <Pagination
          currentPage={pagination.pageNo}
          handleClick={setPageNumber}
          totalPages={pagination.totalPages}
        />
        {selectedId && (
          <DeleteCustomerModal
            pageNo={pageNumber}
            customerId={selectedId}
            show={openDelete}
            setShow={setOpenDelete}
            setMessage={setSuccessMessage}
          />
        )}
        {successMessage && (
          <div className="mt-10">
            <SimpleNotification
              type={"success"}
              heading={"Success"}
              setMessage={setSuccessMessage}
              message={successMessage}
            />
          </div>
        )}
      </section>
    </AppLayout>
  );
}

function CustomerRow({ pageNo, customer, index, onView, onDelete }) {
  return (
    <tr
      key={customer.id}
      className={`${index % 2 === 0 ? undefined : "bg-gray-50"} text-center`}
    >
      <td className="whitespace-nowrap p-3 text-sm ">
        {formatPage(pageNo, index)}
      </td>

      <td className="whitespace-nowrap p-3 text-sm">{customer.firstName}</td>
      <td className="whitespace-nowrap p-3 text-sm">{customer.lastName}</td>
      <td className="whitespace-nowrap p-3 text-sm">{customer.email}</td>
      <td className="whitespace-nowrap p-3 text-sm">{customer.phoneNo}</td>
      <td className="whitespace-nowrap p-3 text-sm">
        {dayjs(customer.createdAt).format("MM/DD/YYYY")}
      </td>
      <td className="whitespace-nowrap p-3 text-sm capitalize">
        {customer.subscription ? "Member" : "Not Member"}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        {customer?.referalHistory?.usageCount || 0}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        <ContextMenu onView={onView} onDelete={onDelete} />
      </td>
    </tr>
  );
}
