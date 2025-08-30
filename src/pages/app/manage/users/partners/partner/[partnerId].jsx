import Spinner from "@/components/Loaders/Spinner";
import SpinnerLarge from "@/components/Loaders/Spinner/SpinnerLarge";
import SimpleNotification from "@/components/Notifications/Simple";
import SelectInput from "@/components/SelectInput";
import usePartner from "@/features/partners/usePartner";
import UAEStates from "@/json/UAEStates.json";
import AppLayout from "@/layouts/AppLayout";
import { partnerValidation } from "@/schemas";
import { fetchNationalitiesList } from "@/services/commonServices";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "react-phone-number-input/input";

export default function PartnerDetails() {
  const router = useRouter();
  const [nationalities, setNationalities] = useState([]);
  const partnerId = router?.query?.partnerId || "";
  const [edit, setEdit] = useState(false);

  const { editPartner, getPartner, partner, successMessage, isLoading, error } =
    usePartner();

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleEditPartner = (data) => {
    editPartner(partnerId, data);
  };

  useEffect(() => {
    if (partnerId) {
      getPartner(partnerId);
    }
  }, [partnerId]);

  useEffect(() => {
    if (successMessage) {
      toggleEdit();
    }
  }, [successMessage]);

  const fetchNationalities = async () => {
    const nationalities = await fetchNationalitiesList();
    if (nationalities) {
      setNationalities(nationalities);
    }
  };

  useEffect(() => {
    fetchNationalities();
  }, []);

  return (
    <AppLayout>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">
            Partner #{partner && partner?.id}
          </h1>
          {!edit && (
            <button
              type="button"
              onClick={toggleEdit}
              className="flex gap-x-2 items-center text-sm text-primary hover:text-primary-light"
            >
              <PencilSquareIcon className="w-5 h-5" />
              <span> Edit</span>
            </button>
          )}
        </div>
        <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
          {isLoading && !partner && (
            <div className="flex items-center justify-center h-96">
              <SpinnerLarge />
            </div>
          )}
          {partner && (
            <Formik
              initialValues={{
                businessName: partner?.businessName || "",
                firstName: partner?.firstName || "",
                lastName: partner?.lastName || "",
                phoneNo: partner?.phoneNo || "",
                email: partner?.email || "",
                nationality: {
                  value: partner?.nationality,
                  label: partner?.nationality,
                } || { label: "", value: "" },
                state: {
                  value: partner?.state,
                  label: partner?.state,
                } || { label: "", value: "" },

                tradeLicense: partner?.tradeLicense || "",
              }}
              validationSchema={partnerValidation.omit(["password"])}
              onSubmit={(values) => {
                handleEditPartner({
                  ...values,
                  email: undefined,
                  phoneNo: undefined,
                  nationality: values.nationality.value,
                  state: values.state.value,
                });
              }}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
                  <div>
                    <h3 className="pb-4">Personal Details</h3>

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
                          disabled={!edit}
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
                          disabled={!edit}
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
                          disabled={true}
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
                    </div>
                  </div>
                  <div>
                    <h3 className="py-4">Personal Details</h3>

                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
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
                          disabled={!edit}
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
                          htmlFor="tradeLicense"
                          className="block mb-2 text-sm font-medium"
                        >
                          Trade License
                        </label>
                        <Field
                          name="tradeLicense"
                          id="tradeLicense"
                          type="text"
                          required
                          disabled={!edit}
                          className="number-field"
                        />
                        <ErrorMessage
                          component={"span"}
                          name="tradeLicense"
                          className="text-sm text-red-700"
                        />
                      </div>
                    </div>
                  </div>
                  {edit && (
                    <div className="my-4 text-end md:text-base text-sm font-semibold">
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={toggleEdit}
                        className="px-8 py-2  rounded-lg mr-2 text-primary hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="px-8 py-2  rounded-lg text-white bg-primary hover:bg-primary-light"
                      >
                        {isLoading ? <Spinner /> : "Edit & Save"}
                      </button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          )}
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
