import ContextMenu from "@/components/ContextMenu";
import DeleteCouponModal from "@/components/Coupon/Delete";
import CouponModal from "@/components/Coupon/Manage";
import SimpleNotification from "@/components/Notifications/Simple";
import Pagination from "@/components/Pagination";
import LoadingTable from "@/components/Tables/Loading";
import SimpleTable from "@/components/Tables/Simple";
import {
  fetchAllCoupons,
  getAllCoupons,
  getCouponsError,
  getCouponsLoading,
  getCouponsPagination,
} from "@/features/coupons/couponsSlice";
import useCoupon from "@/features/coupons/useCoupon";
import AppLayout from "@/layouts/AppLayout";
import { formatPage } from "@/utils/generics";
import { PlusIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const headers = [
  { label: "Coupon Name", value: "name" },
  { label: "Coupon Code", value: "code" },
  { label: "Coupon Discount", value: "discount" },
  { label: "Usage", value: "current_usage" },

  { label: "Max Availability", value: "max_availability" },
  { label: "Expires on", value: "expiryDate" },
  { label: "Status", value: "status" },
  { label: "", value: "" },
];

export default function Coupons() {
  const [openCouponModal, setOpenCouponModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const { successMessage } = useCoupon();
  const [couponData, setCouponData] = useState(null);
  const dispatch = useDispatch();
  const coupons = useSelector(getAllCoupons);
  const loading = useSelector(getCouponsLoading);
  const error = useSelector(getCouponsError);

  useEffect(() => {
    dispatch(fetchAllCoupons(1));
  }, [dispatch]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex offers-center justify-between mb-3">
          <h3>Coupons</h3>
          <div className="flex gap-x-2">
            <button
              onClick={() => setOpenCouponModal(true)}
              type="button"
              className="btn-primary__with-icon"
            >
              <PlusIcon className="w-6 h-6" />
              <span>Add Coupon</span>
            </button>
          </div>
        </div>

        {loading && <LoadingTable headers={headers} length={10} />}

        <SimpleTable
          headers={headers}
          handleSort={(key, isDescending) =>
            handleSort(key, filteredOffers, setFilteredOffers, isDescending)
          }
        >
          {!!coupons.length &&
            coupons.map((coupon, index) => (
              <CouponRow
                pageNo={1}
                coupon={coupon}
                key={coupon.id}
                index={index}
                onView={() => {
                  setCouponData({
                    ...coupon,
                    expirationDate: new Date(coupon.expirationDate)
                      .toISOString()
                      .split("T")[0],
                  });
                  setOpenCouponModal(true);
                }}
                onDelete={() => {
                  setCouponData(coupon);
                  setOpenDeleteModal(true);
                }}
              />
            ))}
        </SimpleTable>

        {!loading && !coupons.length && (
          <h4 className="text-center md:text-lg font-semibold text-gray-600">
            No Coupons Available. <br /> Start by adding a coupon.
          </h4>
        )}
        {!loading && error && <p>{error}</p>}
        <CouponModal
          initialValues={couponData}
          setShow={setOpenCouponModal}
          show={openCouponModal}
          setCouponData={setCouponData}
        />
        <DeleteCouponModal
          couponId={couponData?.id}
          show={openDeleteModal}
          setShow={setOpenDeleteModal}
          setCouponData={setCouponData}
        />
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

function CouponRow({ pageNo, coupon, index, onDelete, onView }) {
  return (
    <tr
      key={coupon.id}
      className={`${index % 2 === 0 ? undefined : "bg-gray-50"} text-center`}
    >
      <td className="whitespace-nowrap p-3 text-sm ">
        {formatPage(pageNo, index)}
      </td>

      <td className="whitespace-nowrap p-3 text-sm">{coupon.name}</td>
      <td className="whitespace-nowrap p-3 text-sm">{coupon.code}</td>

      <td className="whitespace-nowrap p-3 text-sm">{coupon.discount} %</td>
      <td className="whitespace-nowrap p-3 text-sm">
        {coupon.currentUsageCount}
      </td>

      <td className="whitespace-nowrap p-3 text-sm">{coupon.maxUsageCount}</td>
      <td className="whitespace-nowrap p-3 text-sm">
        {dayjs(coupon.expirationDate).format("MM/DD/YYYY")}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        <span
          className={`rounded-full px-4 py-1.5 inline-block capitalize ${
            coupon.status == "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
          key={coupon.status}
        >
          {coupon.status}
        </span>
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        <ContextMenu onDelete={onDelete} onView={onView} />
      </td>
    </tr>
  );
}
