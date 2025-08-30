import DeleteNotificationModal from "@/components/Ad/Delete";
import ContextMenu from "@/components/ContextMenu";
import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import Pagination from "@/components/Pagination";
import LoadingTable from "@/components/Tables/Loading";
import SimpleTable from "@/components/Tables/Simple";
import {
  broadcastNotification,
  fetchAllNotifications,
} from "@/features/notifications/notificationsApi";
import {
  getAllNotifications,
  getNotificationsError,
  getNotificationsLoading,
  getNotificationsPagination,
} from "@/features/notifications/notificationsSlice";
import AppLayout from "@/layouts/AppLayout";
import { formatPage } from "@/utils/generics";
import { PlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const headers = [
  { label: "Title", value: "" },
  { label: "Message", value: "" },
  { label: "State", value: "" },
  { label: "Target Users", value: "" },
  { label: "Action", value: "" },
  { label: "", value: "" },
];

export default function NotificationsManagement() {
  const [openDeleteNotification, setOpenDeleteNotification] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [selected, setSelected] = useState("");
  const notifications = useSelector(getAllNotifications);
  const loading = useSelector(getNotificationsLoading);
  const error = useSelector(getNotificationsError);
  const router = useRouter();

  const pagination = useSelector(getNotificationsPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllNotifications({ pageNo: pageNumber, limit: 10 }));
  }, [dispatch, pageNumber]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex justify-between">
          <h3>Notifications Management</h3>
          <div className="flex gap-x-2 mb-4">
            <Link
              href={"/app/notifications_management/create"}
              type="button"
              className="btn-primary__with-icon"
            >
              <PlusIcon className="w-6 h-6" />
              <span>Create Notification</span>
            </Link>
          </div>
        </div>
        {loading && <LoadingTable headers={headers} length={10} />}
        {!loading && notifications.length > 0 && (
          <SimpleTable headers={headers}>
            {notifications.map((notification, index) => (
              <NotificationRow
                notification={notification}
                pageNo={pagination.pageNo}
                key={index}
                index={index}
                onView={() => {
                  router.push(
                    `notifications_management/notification/${notification.id}`
                  );
                }}
                onDelete={() => {
                  setSelected(notification.id);
                  setOpenDeleteNotification(true);
                }}
              />
            ))}
          </SimpleTable>
        )}
        {!loading && !notifications.length && (
          <div className="flex items-center justify-center h-[calc(100vh-200px)]">
            <h4 className=" text-center md:text-lg font-semibold text-gray-600">
              No Notifications Available. <br /> Start by creating a new one.
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
          <DeleteNotificationModal
            notificationId={selected}
            show={openDeleteNotification}
            setSelected={setSelected}
            setShow={setOpenDeleteNotification}
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

function NotificationRow({ pageNo, notification, index, onView, onDelete }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBroadcastNotification = async () => {
    try {
      setIsLoading(true);
      setError("");
      await broadcastNotification(notification.id);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <tr
        key={notification.id}
        className={`${index % 2 === 0 ? "" : "bg-gray-50"} text-center`}
      >
        <td className="whitespace-nowrap p-3 text-sm text-left">
          {formatPage(pageNo, index)}
        </td>

        <td className="whitespace-nowrap p-3 text-sm">{notification.title}</td>
        <td className="whitespace-nowrap p-3 text-sm">
          <p className="w-11/12 truncate">{notification.message}</p>
        </td>
        <td className="whitespace-nowrap p-3 text-sm capitalize">
          {notification.additionalData?.location?.value || "--"}
        </td>
        <td className="whitespace-nowrap p-3 text-sm">
          {notification.targetUsers}
        </td>
        <td className="whitespace-nowrap p-3 text-sm">
          <button
            onClick={handleBroadcastNotification}
            className="px-8 py-2 rounded-lg text-white bg-primary hover:bg-primary-light"
          >
            {isLoading ? <Spinner /> : "Send"}
          </button>
        </td>
        <td className="whitespace-nowrap p-3 text-sm">
          <ContextMenu onView={onView} onDelete={onDelete} />
        </td>
      </tr>
      {error && (
        <SimpleNotification
          type={"error"}
          heading={"Error"}
          message={error.message}
          setMessage={() => {}}
        />
      )}
    </>
  );
}
