import {
  CameraIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Input from "react-phone-number-input/input";

import { customerValidation } from "@/schemas";
import { convertImageToBase64, uploadImage } from "@/utils/imageUpload";
import UAEStates from "@/json/UAEStates.json";

import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import SelectInput from "@/components/SelectInput";
import useCustomer from "@/features/customers/useCustomer";
import AppLayout from "@/layouts/AppLayout";
import SpinnerLarge from "@/components/Loaders/Spinner/SpinnerLarge";
import { format } from "date-fns";
import SimpleTable from "@/components/Tables/Simple";
import { fetchNationalitiesList } from "@/services/commonServices";

export default function CustomerDetails() {
  const router = useRouter();
  const [nationalities, setNationalities] = useState([]);
  const customerId = router?.query?.customerId || "";
  const {
    getCustomer,
    editCustomer,
    customer,
    successMessage,
    isLoading,
    error,
  } = useCustomer();
  const [edit, setEdit] = useState(false);

  const toggleEdit = () => {
    setEdit(!edit);
  };

  const handleEditCustomer = (data) => {
    editCustomer(customerId, data);
  };

  useEffect(() => {
    if (customerId) {
      getCustomer(customerId);
    }
  }, [customerId]);

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
            Customer #{customer && customer?.id}
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
          {isLoading && !customer && (
            <div className="flex items-center justify-center h-96">
              <SpinnerLarge />
            </div>
          )}
          {customer && (
            <Formik
              initialValues={{
                firstName: customer?.firstName || "",
                lastName: customer?.lastName || "",
                phoneNo: customer?.phoneNo || "",
                email: customer?.email || "",
                photoUrl: customer?.photoUrl || "",
                nationality: {
                  label: customer?.nationality,
                  value: customer?.nationality,
                } || {
                  label: "",
                  value: "",
                },
                state: {
                  label: customer?.state,
                  value: customer?.state,
                } || {
                  label: "",
                  value: "",
                },
                subscription: {
                  id: customer?.subscription?.id || "",
                  expiryDate:
                    customer?.subscription?.expiryDate &&
                    dayjs(customer?.subscription?.expiryDate).format(
                      "MM/DD/YYYY"
                    ),
                },
              }}
              validationSchema={customerValidation.omit(["password"])}
              onSubmit={(values) => {
                handleEditCustomer({
                  ...values,
                  email: undefined,
                  subscription: undefined,
                  nationality: values.nationality.value,
                  state: values.state.value,
                });
              }}
            >
              {({ values, errors, touched, setFieldValue }) => (
                <Form>
                  <div className="text-center mb-10">
                    <CustomerImage edit={edit} />
                  </div>
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
                          disabled={true}
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
                          disabled={!edit}
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
                          disabled={!edit}
                          items={UAEStates.states || []}
                        />
                        <span className="text-sm text-red-700">
                          {touched.state && errors?.state?.value}
                        </span>
                      </div>
                    </div>
                  </div>
                  {values.subscription?.id && (
                    <div>
                      <h3 className="py-4">Membership Details</h3>
                      <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                        <div>
                          <label
                            htmlFor="membershipId"
                            className="block mb-2 text-sm font-medium"
                          >
                            Membership ID
                          </label>
                          <Field
                            name="subscription.id"
                            id="membershipId"
                            type="text"
                            required
                            disabled={true}
                            className="text-field"
                          />
                          <ErrorMessage
                            component={"span"}
                            name="subscription.id"
                            className="text-sm text-red-700"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="subscription.expiryDate"
                            className="block mb-2 text-sm font-medium"
                          >
                            Expiry Date
                          </label>
                          <Field
                            name="subscription.expiryDate"
                            id="subscription.expiryDate"
                            type="text"
                            required
                            disabled={true}
                            className="text-field"
                          />
                          <ErrorMessage
                            component={"span"}
                            name="subscription.id"
                            className="text-sm text-red-700"
                          />
                        </div>
                      </div>
                    </div>
                  )}
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
      {customer?.referalHistory?.useHistory?.length && (
        <section>
          <div className="px-6">
            <div className="w-full flex justify-between items-center my-6">
              <h1 className="md:text-2xl text-lg font-bold">Referal History</h1>
            </div>
            <SimpleTable
              headers={[
                { label: "ID" },
                { label: "User Email" },
                { label: "Created Data" },
              ]}
            >
              {customer?.referalHistory?.useHistory.length > 0 &&
                customer?.referalHistory.useHistory.map((referal, i) => (
                  <tr
                    key={i}
                    className={`${
                      i % 2 === 0 ? undefined : "bg-gray-50"
                    } text-center`}
                  >
                    <td className="whitespace-nowrap p-3 text-sm font-medium ">
                      {i + 1}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm font-medium ">
                      {referal?.id?.slice(-6)}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm font-medium ">
                      {referal?.email}
                    </td>
                    <td className="whitespace-nowrap p-3 text-sm font-medium ">
                      {format(referal?.createdAt, "yyyy/MM/dd")}
                    </td>
                  </tr>
                ))}
            </SimpleTable>
          </div>
        </section>
      )}
    </AppLayout>
  );
}

function CustomerImage({ edit }) {
  const { values, setFieldValue } = useFormikContext();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    try {
      const result = await convertImageToBase64(file);
      const response = await uploadImage(result, () => {});
      setFieldValue("photoUrl", response.secure_url);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <span className="relative inline-block cursor-pointer mx-auto">
      <span className="inline-block rounded-full text-gray-700">
        {values.photoUrl ? (
          <Image
            src={values.photoUrl}
            height={600}
            width={600}
            alt="User Image"
            className="lg:w-40 lg:h-40 w-28 h-28 object-cover rounded-full"
          />
        ) : (
          <UserCircleIcon className="lg:w-40 lg:h-40 w-28 h-28 " />
        )}
      </span>
      {edit && (
        <label
          htmlFor="profile_photo"
          className={`inline-block cursor-pointer absolute lg:bottom-5 lg:right-5 bottom-3 right-3 rounded-full p-1.5 bg-primary hover:bg-primary-light text-white`}
        >
          <CameraIcon className="w-6 h-6 " />
        </label>
      )}
      <input
        disabled={!edit}
        type="file"
        name="photoUrl"
        id="profile_photo"
        className="hidden"
        onChange={handleChange}
      />
    </span>
  );
}
