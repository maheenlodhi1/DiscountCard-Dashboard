import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import SelectInput from "@/components/SelectInput";
import useNotifications from "@/features/notifications/useNotifications";
import AppLayout from "@/layouts/AppLayout";
import { notificationValidation } from "@/schemas";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";

const targetUsers = [
  { label: "All", value: "all" },
  { label: "Partners", value: "partners" },
  { label: "Customers", value: "customers" },
];

export const states = [
  {
    value: "abu_dhabi",
    label: "Abu Dhabi",
  },
  {
    value: "dubai",
    label: "Dubai",
  },
  {
    value: "sharjah",
    label: "Sharjah",
  },
  {
    value: "ajman",
    label: "Ajman",
  },
  {
    value: "umm_al_quwain",
    label: "Umm Al-Quwain",
  },
  {
    value: "ras_al_khaimah",
    label: "Ras Al Khaimah",
  },
  {
    value: "fujairah",
    label: "Fujairah",
  },
];

export default function CreateAd() {
  const router = useRouter();
  const { createNotification, reset, successMessage, isLoading, error } =
    useNotifications();

  const handleCreateNotification = (data) => {
    createNotification({ ...data, targetUsers: data.targetUsers.value });
  };

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        reset();
        router.replace(".");
      }, 1000);
    }
  }, [successMessage, router, reset]);

  return (
    <AppLayout>
      <section>
        <h1 className="text-xl font-semibold">Create Notification</h1>
        <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
          <Formik
            initialValues={{
              title: "",
              message: "",
              additionalData: { location: "" },
              targetUsers: targetUsers[0],
            }}
            validationSchema={notificationValidation}
            onSubmit={(values) => {
              handleCreateNotification(values);
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
                  <div className="">
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
                    {isLoading ? <Spinner /> : "Create"}
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
