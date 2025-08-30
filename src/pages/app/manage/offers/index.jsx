import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ArrowDownTrayIcon, PlusIcon } from "@heroicons/react/20/solid";
import dayjs from "dayjs";
import Link from "next/link";

import {
  fetchAllOffers,
  getAllOffers,
  getOffersError,
  getOffersLoading,
  getOffersPagination,
} from "@/features/offers/offersSlice";
import { formatPage, handleSort, parseJSONtoCSV } from "@/utils/generics";

import Tabs from "@/components/Tabs";
import AppLayout from "@/layouts/AppLayout";
import Searchbar from "@/components/Searchbar";
import SimpleTable from "@/components/Tables/Simple";
import DeleteOfferModal from "@/components/Offer/Delete";
import SimpleNotification from "@/components/Notifications/Simple";
import Pagination from "@/components/Pagination";
import ContextMenu from "@/components/ContextMenu";
import LoadingTable from "@/components/Tables/Loading";
import { fetchOffers } from "@/features/offers/offerApi";

const headers = [
  { label: "Offer Title", value: "title" },
  { label: "Offer Category", value: "categoryName" },
  { label: "Duration", value: "" },
  { label: "Discount", value: "discount" },
  { label: "Expires on", value: "expiryDate" },
  { label: "Status", value: "" },
  { label: "", value: "" },
];
const tabs = [
  { label: "All", value: "", colorClass: "bg-transparent" },
  {
    label: "Active",
    value: "active",
    colorClass: "bg-green-100 text-green-600",
  },
  {
    label: "Pending",
    value: "pending",
    colorClass: "bg-yellow-100 text-yellow-600",
  },
  {
    label: "Approved",
    value: "approved",
    colorClass: "bg-green-100 text-green-600",
  },
  {
    label: "Rejected",
    value: "rejected",
    colorClass: "bg-red-100 text-red-600",
  },
];

export default function ManageOffers() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [selectedId, setSelectedId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [search, setSearch] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const offers = useSelector(getAllOffers);
  const loading = useSelector(getOffersLoading);
  const error = useSelector(getOffersError);
  const pagination = useSelector(getOffersPagination);
  const [filteredOffers, setFilteredOffers] = useState([]);
  const router = useRouter();

  const handleCSVDownload = async () => {
    const fields = [
      "title",
      "categoryName",
      "duration",
      "discount",
      "expiryDate",
      "promotionStatus",
    ];

    try {
      const offersData = await fetchOffers({ raw: true });

      if (offersData.length) {
        const url = parseJSONtoCSV(fields, offersData);
        const link = document.createElement("a");
        link.href = url;
        link.download = "offers.csv";
        link.click();
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    dispatch(
      fetchAllOffers({
        pageNo: pageNumber,
        search: JSON.stringify({ title: search }),
      })
    );
  };

  useEffect(() => {
    if (offers.length > 0) {
      setFilteredOffers(offers);
    }
  }, [offers]);

  useEffect(() => {
    if (!search) {
      dispatch(
        fetchAllOffers({ pageNo: pageNumber, status: selectedTab.value })
      );
    }
  }, [dispatch, pageNumber, search, selectedTab]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex offers-center justify-between">
          <h3>Offers Management</h3>
          <div className="flex gap-x-2">
            <Link
              href={"offers/add"}
              type="button"
              className="btn-primary__with-icon"
            >
              <PlusIcon className="w-6 h-6" />
              <span>Add Offer</span>
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
        <div className="my-4 flex justify-between offers-center">
          <Tabs tabs={tabs} onSelect={setSelectedTab} />
          <div className="flex offers-center gap-x-3">
            <Searchbar
              search={search}
              setSearch={setSearch}
              placeholder={"Search Offer by Title"}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        {loading && <LoadingTable headers={headers} length={10} />}
        {!loading && offers.length > 0 && (
          <SimpleTable
            headers={headers}
            handleSort={(key, isDescending) =>
              handleSort(key, filteredOffers, setFilteredOffers, isDescending)
            }
          >
            {filteredOffers.length > 0
              ? filteredOffers.map((offer, index) => (
                  <OfferRow
                    offer={offer}
                    pageNo={pagination.pageNo}
                    key={index}
                    index={index}
                    onView={() => router.push(`offers/offer/${offer.id}`)}
                    onDelete={() => {
                      setOpenDelete(true);
                      setSelectedId(offer.id);
                    }}
                  />
                ))
              : null}
          </SimpleTable>
        )}
        {!loading && !error && !offers.length && (
          <h4 className="text-center md:text-lg font-semibold text-gray-600">
            No Offers Available. <br /> Start by adding an offer.
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
          <DeleteOfferModal
            offerId={selectedId}
            pageNo={pageNumber}
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

function OfferRow({ pageNo, offer, index, onDelete, onView }) {
  return (
    <tr
      key={offer.id}
      className={`${index % 2 === 0 ? undefined : "bg-gray-50"} text-center`}
    >
      <td className="whitespace-nowrap p-3 text-sm ">
        {formatPage(pageNo, index)}
      </td>

      <td className="whitespace-nowrap p-3 text-sm">{offer.title}</td>
      <td className="whitespace-nowrap p-3 text-sm">{offer.categoryName}</td>
      <td className="whitespace-nowrap p-3 text-sm">{offer.duration}</td>
      <td className="whitespace-nowrap p-3 text-sm">{offer.discount} %</td>
      <td className="whitespace-nowrap p-3 text-sm">
        {dayjs(offer.expiryDate).format("MM/DD/YYYY")}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        {tabs.map((tab) =>
          offer.promotionStatus.toLowerCase() === tab.value ? (
            <span
              className={`${tab.colorClass} rounded-full px-4 py-1.5 inline-block capitalize`}
              key={offer.promotionStatus}
            >
              {offer.promotionStatus}
            </span>
          ) : null
        )}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        <ContextMenu onDelete={onDelete} onView={onView} />
      </td>
    </tr>
  );
}
