import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import useReferral from "@/features/referral/useReferral";
import AppLayout from "@/layouts/AppLayout";
import { PencilSquareIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function RefferalCommission() {
  const {
    getCommission,
    editCommission,
    addCommission,
    reset,
    commission,
    successMessage,
    isLoading,
    error,
  } = useReferral();
  const [edit, setEdit] = useState(false);

  const id = commission?.id || "";

  const toggleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    reset();
    getCommission();
  }, []);

  useEffect(() => {
    if (successMessage) {
      toggleEdit();
      getCommission();
    }
  }, [successMessage]);

  return (
    <AppLayout>
      <section className="h-screen">
        <div className="flex justify-between">
          <h3 className="font-bold text-lg">Referral Commission</h3>
          {!isLoading && !commission && (
            <button onClick={toggleEdit} className="btn-primary__with-icon">
              <PlusIcon className="w-6 h-6" />
              <span>Add Referral Commission</span>
            </button>
          )}
          {!edit && !isLoading && commission && (
            <button
              type="button"
              onClick={toggleEdit}
              className="flex gap-x-2 items-center text-sm text-primary hover:text-primary-light"
            >
              <PencilSquareIcon className="w-5 h-5" />
              <span>Edit</span>
            </button>
          )}
        </div>

        <div className="text-center">
          {edit ? (
            <Formik
              initialValues={{
                referralCommission: commission?.data?.referralCommission,
              }}
              enableReinitialize
              validationSchema={Yup.object({
                referralCommission: Yup.number().min(10).max(60).required(),
              })}
              onSubmit={(values) => {
                if (id) {
                  editCommission(id, values);
                } else addCommission(values);
              }}
            >
              {() => (
                <Form className="text-5xl">
                  <Field
                    name="referralCommission"
                    type="number"
                    min="10"
                    max="60"
                    id="referralCommission"
                    className="no-arrows text-5xl pl-10 inline-block w-32 border border-primary rounded-xl font-bold appearance-none outline-primary "
                  />
                  <span className="font-bold text-5xl"> %</span>
                  <div className="my-4 text-end md:text-base text-sm font-semibold">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={toggleEdit}
                      className=" p-2  rounded-lg mr-2 text-primary hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className=" p-2  rounded-lg text-white bg-primary hover:bg-primary-light"
                    >
                      {isLoading ? <Spinner /> : "Update"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          ) : (
            <div className="text-5xl font-bold mt-8">
              {isLoading && !commission && (
                <span className="inline-block bg-gray-300 px-12 py-8 rounded animate-pulse"></span>
              )}
              {!isLoading &&
                commission &&
                `${commission?.data?.referralCommission} %`}
            </div>
          )}
        </div>
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
      </section>
    </AppLayout>
  );
}
