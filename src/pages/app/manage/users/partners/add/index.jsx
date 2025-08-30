import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "react-phone-number-input/input";
import { fetchNationalitiesList } from "@/services/commonServices";
import { partnerValidation } from "@/schemas";
import UAEStates from "@/json/UAEStates.json";
import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import usePartner from "@/features/partners/usePartner";

import AppLayout from "@/layouts/AppLayout";
import SelectInput from "@/components/SelectInput";

export default function AddPartner() {
  const router = useRouter();
  const [nationalities, setNationalities] = useState([]);
  const { addPartner, reset, successMessage, isLoading, error } = usePartner();
  const handleAddPartner = (data) => {
    addPartner(data);
  };

  const fetchNationalities = async () => {
    const nationalities = await fetchNationalitiesList();
    if (nationalities) {
      setNationalities(nationalities);
    }
  };

  useEffect(() => {
    fetchNationalities();
  }, []);

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
        <h1 className="text-xl font-semibold">Add New Partner</h1>
        <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              phoneNo: "",
              email: "",
              businessName: "",
              nationality: { value: "", label: "" },
              state: {
                label: "",
                value: "",
              },
              password: "",
            }}
            validationSchema={partnerValidation}
            onSubmit={(values) => {
              handleAddPartner({
                ...values,
                state: values.state.value,
                nationality: values.nationality.value,
              });
            }}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <Form>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block mb-2 text-sm font-medium"
                    >
                      First Name
                    </label>
                    <Field
                      name="firstName"
                      id="firstName"
                      type="text"
                      required
                      className="text-field"
                    />
                    <ErrorMessage
                      component={"span"}
                      name="firstName"
                      className="text-sm text-red-700"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block mb-2 text-sm font-medium"
                    >
                      Last Name
                    </label>
                    <Field
                      name="lastName"
                      id="lastName"
                      type="text"
                      required
                      className="text-field"
                    />
                    <ErrorMessage
                      component={"span"}
                      name="lastName"
                      className="text-sm text-red-700"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="businessName"
                      className="block mb-2 text-sm font-medium"
                    >
                      Business Name
                    </label>
                    <Field
                      name="businessName"
                      id="businessName"
                      type="text"
                      required
                      className="text-field"
                    />
                    <ErrorMessage
                      component={"span"}
                      name="businessName"
                      className="text-sm text-red-700"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phoneNo"
                      className="block mb-2 text-sm font-medium"
                    >
                      Phone
                    </label>
                    <Input
                      className="number-field"
                      value={values.phoneNo}
                      country="GB"
                      international
                      useNationalFormatForDefaultCountryValue={true}
                      onChange={(value) => setFieldValue("phoneNo", value)}
                    />
                    <span className="text-sm text-red-700">
                      {errors.phoneNo}
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium"
                    >
                      Email
                    </label>
                    <Field
                      name="email"
                      id="email"
                      type="text"
                      required
                      className="text-field"
                    />
                    <ErrorMessage
                      component={"span"}
                      name="email"
                      className="text-sm text-red-700"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Nationality
                    </label>
                    <Field
                      name="nationality"
                      id="nationality"
                      as={SelectInput}
                      items={nationalities}
                    />
                    <span className="text-sm text-red-700">
                      {touched.nationality && errors?.nationality?.value}
                    </span>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      State
                    </label>
                    <Field
                      name="state"
                      id="state"
                      as={SelectInput}
                      items={UAEStates.states || []}
                    />
                    <span className="text-sm text-red-700">
                      {touched.state && errors?.state?.value}
                    </span>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium"
                    >
                      Password
                    </label>
                    <Field
                      name="password"
                      id="password"
                      type="password"
                      required
                      className="text-field"
                    />
                    <ErrorMessage
                      component={"span"}
                      name="password"
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
                    {isLoading ? <Spinner /> : "Add"}
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
