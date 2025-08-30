import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { PlusIcon } from "@heroicons/react/20/solid";
import SimpleTable from "@/components/Tables/Simple";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import Image from "next/image";
import SimpleNotification from "@/components/Notifications/Simple";
import Pagination from "@/components/Pagination";
import ContextMenu from "@/components/ContextMenu";
import LoadingTable from "@/components/Tables/Loading";
import { formatPage } from "@/utils/generics";
import { fetchAllAds } from "@/features/ads/adsApi";
import {
  getAdsError,
  getAdsLoading,
  getAdsPagination,
  getAllAds,
} from "@/features/ads/adsSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import DeleteAdModal from "@/components/Ad/Delete";

const headers = [
  { label: "Image", value: "" },
  { label: "Title", value: "" },
  { label: "Description", value: "" },
  { label: "Duration", value: "" },
  { label: "Start Date", value: "" },
  { label: "End Date", value: "" },
];

export default function AdsManagement() {
  const [openDeleteAd, setOpenDeleteAd] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [selected, setSelected] = useState("");
  const ads = useSelector(getAllAds);
  const loading = useSelector(getAdsLoading);
  const error = useSelector(getAdsError);
  const router = useRouter();

  const pagination = useSelector(getAdsPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllAds({ pageNo: pageNumber, limit: 10 }));
  }, [dispatch, pageNumber]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex justify-between">
          <h3>Ads Management</h3>
          <div className="flex gap-x-2 mb-4">
            <Link
              href={"/app/ads_management/create"}
              type="button"
              className="btn-primary__with-icon"
            >
              <PlusIcon className="w-6 h-6" />
              <span>Create Ad</span>
            </Link>
          </div>
        </div>
        {loading && <LoadingTable headers={headers} length={10} />}
        {!loading && ads.length > 0 && (
          <SimpleTable headers={headers}>
            {ads.map((ad, index) => (
              <AdRow
                ad={ad}
                pageNo={pagination.pageNo}
                key={index}
                index={index}
                onView={() => {
                  router.push(`ads_management/ad/${ad.id}`);
                }}
                onDelete={() => {
                  setSelected(ad.id);
                  setOpenDeleteAd(true);
                }}
              />
            ))}
          </SimpleTable>
        )}
        {!loading && !ads.length && (
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <h4 className=" text-center md:text-lg font-semibold text-gray-600">
              No Ads Available. <br /> Start by creating a new one.
            </h4>
          </div>
        )}
        {!loading && error && <p>{error}</p>}
        <Pagination
          currentPage={pagination.pageNo}
          handleClick={setPageNumber}
          totalPages={pagination.totalPages}
        />

        {selected && (
          <DeleteAdModal
            adId={selected}
            show={openDeleteAd}
            setSelected={setSelected}
            setShow={setOpenDeleteAd}
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

function AdRow({ pageNo, ad, index, onView, onDelete }) {
  return (
    <tr
      key={ad.id}
      className={`${index % 2 === 0 ? "" : "bg-gray-50"} text-center`}
    >
      <td className="whitespace-nowrap p-3 text-sm text-left">
        {formatPage(pageNo, index)}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        <Image
          src={ad.imageUrl}
          width={400}
          height={400}
          className="w-20 h-12 object-contain mx-auto"
          alt={ad.title}
        />
      </td>
      <td className="whitespace-nowrap p-3 text-sm">{ad.title}</td>
      <td className="whitespace-nowrap p-3 text-sm">
        <p className="w-11/12 truncate">{ad.description}</p>
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        {dayjs(ad.startDate).format("MM/DD/YYYY")}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        {dayjs(ad.expirationDate).format("MM/DD/YYYY")}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        <ContextMenu onView={onView} onDelete={onDelete} />
      </td>
    </tr>
  );
}
