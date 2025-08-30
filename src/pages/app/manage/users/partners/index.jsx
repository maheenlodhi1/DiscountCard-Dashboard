import partnersData from "@/data/partners.json";
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createPartner, fetchPartners } from "@/features/partners/partnerApi";
import {
  fetchAllPartners,
  getAllPartners,
  getPartnersError,
  getPartnersLoading,
  getPartnersPagination,
  sort,
} from "@/features/partners/partnersSlice";
import { formatPage, handleSort, parseJSONtoCSV } from "@/utils/generics";

import ContextMenu from "@/components/ContextMenu";
import SimpleNotification from "@/components/Notifications/Simple";
import Pagination from "@/components/Pagination";
import DeletePartnerModal from "@/components/Partner/Delete";
import Searchbar from "@/components/Searchbar";
import LoadingTable from "@/components/Tables/Loading";
import SimpleTable from "@/components/Tables/Simple";
import AppLayout from "@/layouts/AppLayout";
import { useRouter } from "next/router";

const headers = [
  { label: "Business Name", value: "businessName" },
  { label: "Full Name", value: "firstName" },
  { label: "Email", value: "" },
  { label: "Phone", value: "" },
  { label: "Date Joined", value: "createdAt" },
  { label: "Status", value: "" },
  { label: "", value: "" },
];

export default function ManagePartners() {
  const dispatch = useDispatch();
  const partners = useSelector(getAllPartners);
  const loading = useSelector(getPartnersLoading);
  const error = useSelector(getPartnersError);
  const pagination = useSelector(getPartnersPagination);
  const [successMessage, setSuccessMessage] = useState("");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const router = useRouter();

  const handleCSVDownload = async () => {
    const fields = [
      "firstName",
      "lastName",
      "businessName",
      "email",
      "phoneNo",
      "createdAt",
    ];

    try {
      const partnersData = await fetchPartners({ raw: true });

      if (partnersData.length) {
        const url = parseJSONtoCSV(fields, partnersData);
        const link = document.createElement("a");
        link.href = url;
        link.download = "partners.csv";

        link.click();

        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const sortPartners = (array) => {
    dispatch(sort(array));
  };

  const handleSearch = () => {
    dispatch(
      fetchAllPartners({
        pageNo: pageNumber,
        search: JSON.stringify({ businessName: search }),
      })
    );
  };

  const uploadPartners = async () => {
    const promises = partnersData.map((partner) => {
      createPartner(partner);
    });

    const results = await Promise.all(promises);

    return results;
  };

  useEffect(() => {
    if (!search) {
      dispatch(fetchAllPartners({ pageNo: pageNumber }));
    }
  }, [dispatch, pageNumber, search]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex items-center justify-between md:flex-row flex-col">
          <h3>Partners Management</h3>
          <div className="flex gap-x-2">
            <Link href={"partners/add"} className="btn-primary__with-icon">
              <PlusIcon className="w-6 h-6" />
              <span>Add Partner</span>
            </Link>
            <button
              onClick={handleCSVDownload}
              type="button"
              className="btn-primary__with-icon"
            >
              <ArrowDownTrayIcon className="w-6 h-6" />
              <span>Download CSV</span>
            </button>

            {/* <button
              onClick={uploadPartners}
              type="button"
              className="btn-primary__with-icon"
            >
              <ArrowUpTrayIcon className="w-6 h-6" />
              <span>Upload Data</span>
            </button> */}
          </div>
        </div>
        <div className="my-4 flex justify-between items-center">
          <div>
            <Searchbar
              search={search}
              placeholder={"Search by Business Name"}
              setSearch={setSearch}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        {loading && <LoadingTable headers={headers} length={10} />}
        {!loading && partners.length > 0 && (
          <SimpleTable
            headers={headers}
            handleSort={(key, isDescending) => {
              handleSort(key, partners, sortPartners, isDescending);
            }}
          >
            {partners.map((partner, index) => (
              <PartnerRow
                partner={partner}
                pageNo={pagination.pageNo}
                index={index}
                key={index}
                onView={() => {
                  router.push(`partners/partner/${partner.id}`);
                }}
                onDelete={() => {
                  setOpenDelete(true);
                  setSelectedId(partner.id);
                }}
              />
            ))}
          </SimpleTable>
        )}
        {!loading && !error && !partners.length && (
          <h4 className="text-center md:text-lg font-semibold text-gray-600">
            No partners Available. <br /> Start by adding a partner.
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
        {selectedId && (
          <DeletePartnerModal
            pageNo={pageNumber}
            partnerId={selectedId}
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

function PartnerRow({ pageNo, partner, onView, onDelete, index }) {
  return (
    <tr
      key={partner.id}
      className={`${index % 2 === 0 ? undefined : "bg-gray-50"} text-center`}
    >
      <td className="whitespace-nowrap p-3 text-sm ">
        {formatPage(pageNo, index)}
      </td>

      <td className="whitespace-nowrap p-3 text-sm">{partner.businessName}</td>
      <td className="whitespace-nowrap p-3 text-sm">
        {`${partner.firstName} ${partner.lastName}`}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">{partner.email}</td>
      <td className="whitespace-nowrap p-3 text-sm">{partner.phoneNo}</td>
      <td className="whitespace-nowrap p-3 text-sm">
        {dayjs(partner.createdAt).format("MM/DD/YYYY")}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        <ContextMenu onDelete={onDelete} onView={onView} />
      </td>
    </tr>
  );
}
