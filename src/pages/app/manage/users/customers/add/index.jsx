import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Input from "react-phone-number-input/input";
import UAEStates from "@/json/UAEStates.json";
import { customerValidation } from "@/schemas";
import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import useCustomer from "@/features/customers/useCustomer";
import AppLayout from "@/layouts/AppLayout";
import SelectInput from "@/components/SelectInput";
import { fetchNationalitiesList } from "@/services/commonServices";

export default function AddCustomer() {
  const router = useRouter();
  const [nationalities, setNationalities] = useState([]);
  const { addCustomer, reset, successMessage, isLoading, error } =
    useCustomer();

  const handleAddCustomer = (data) => {
    addCustomer(data);
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
        <h1 className="text-xl font-semibold">Add New Customer</h1>
        <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              phoneNo: "",
              email: "",
              password: "",
              nationality: { value: "", label: "" },
            }}
            validationSchema={customerValidation}
            onSubmit={(values) => {
              handleAddCustomer({
                ...values,
                nationality: values.nationality.value,
                state: values.state.value,
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
                    <label className="block mb-2 text-sm font-medium">
                      Phone No
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
