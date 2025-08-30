import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import AppLayout from "@/layouts/AppLayout";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";

import SpinnerLarge from "@/components/Loaders/Spinner/SpinnerLarge";
import SelectInput from "@/components/SelectInput";
import useNotifications from "@/features/notifications/useNotifications";
import { notificationValidation } from "@/schemas";
import { states } from "../create";

const targetUsers = [
  { label: "All", value: "all" },
  { label: "Partners", value: "partners" },
  { label: "Customers", value: "customers" },
];

export default function EditNotification() {
  const router = useRouter();
  const id = router?.query?.id;
  const {
    notification,
    editNotification,
    getNotification,
    successMessage,
    isLoading,
    error,
  } = useNotifications();

  const handleUpdateAd = (data) => {
    editNotification(id, data);
  };

  useEffect(() => {
    if (id || successMessage) {
      getNotification(id);
    }
  }, [id, successMessage]);

  if (isLoading)
    return (
      <AppLayout>
        <div className="h-screen flex items-center justify-center">
          <SpinnerLarge />
        </div>
      </AppLayout>
    );
  if (error)
    return (
      <AppLayout>
        <div className="h-screen flex items-center justify-center">{error}</div>
      </AppLayout>
    );

  if (notification)
    return (
      <AppLayout>
        <section>
          <h1 className="text-xl font-semibold">Edit Notification</h1>
          <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
            <Formik
              initialValues={{
                title: notification.title,
                message: notification.message,
                additionalData: notification.additionalData,
                targetUsers: targetUsers.find(
                  (item) => item.value === notification.targetUsers
                ),
              }}
              validationSchema={notificationValidation}
              onSubmit={(values) => {
                handleUpdateAd(values);
              }}
            >
              {() => (
                <Form>
                  <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                    <div>
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium"
                      >
                        Title
                      </label>
                      <Field
                        name="title"
                        id="title"
                        type="text"
                        required
                        className="text-field"
                      />
                      <ErrorMessage
                        component={"span"}
                        name="title"
                        className="text-sm text-red-700"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="targetUsers"
                        className="block mb-2 text-sm font-medium"
                      >
                        Target Users
                      </label>
                      <Field
                        name="targetUsers"
                        id="targetUsers"
                        as={SelectInput}
                        items={targetUsers}
                        required
                        className="text-field "
                      />
                      <ErrorMessage
                        component={"span"}
                        name="targetUsers"
                        className="text-sm text-red-700"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="location"
                        className="block mb-2 text-sm font-medium"
                      >
                        States
                      </label>
                      <Field
                        name="additionalData.location"
                        id="location"
                        as={SelectInput}
                        items={states}
                        required
                        className="text-field "
                      />
                      <ErrorMessage
                        component={"span"}
                        name="additionalData.location"
                        className="text-sm text-red-700"
                      />
                    </div>

                    <div className="col-span-2">
                      <label
                        htmlFor="message"
                        className="block mb-2 text-sm font-medium"
                      >
                        Message
                      </label>
                      <Field
                        name="message"
                        id="message"
                        as="textarea"
                        rows="4"
                        required
                        className="text-field resize-none"
                      />
                      <ErrorMessage
                        component={"span"}
                        name="message"
                        className="text-sm text-red-700"
                      />
                    </div>
                  </div>
                  <div className="my-4 text-end md:text-base text-sm font-semibold">
                    <button
                      type="reset"
                      disabled={isLoading}
                      className="px-8 py-2  rounded-lg mr-2 text-primary hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="px-8 py-2  rounded-lg text-white bg-primary hover:bg-primary-light"
                    >
                      {isLoading ? <Spinner /> : "Update"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </section>
        {successMessage && (
          <SimpleNotification
            type={"success"}
            heading={"Success"}
            message={successMessage}
            setMessage={() => {}}
          />
        )}
        {error && (
          <SimpleNotification
            type={"error"}
            heading={"Error"}
            message={error}
            setMessage={() => {}}
          />
        )}
      </AppLayout>
    );
}
