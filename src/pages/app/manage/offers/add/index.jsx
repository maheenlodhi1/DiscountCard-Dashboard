import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllPartners,
  getAllPartners,
} from "@/features/partners/partnersSlice";
import { getAllCategories } from "@/features/categories/categoriesSlice";
import { fetchAllCategories } from "@/features/categories/categoryApi";
import { offerValidation } from "@/schemas";
import { calculateExpiryDate } from "@/utils/generics";
import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import ToggleButton from "@/components/Switch";
import useOffer from "@/features/offers/useOffer";
import AppLayout from "@/layouts/AppLayout";
import SelectInput from "@/components/SelectInput";
import { OfferImages } from "@/components/OfferImages";
import { GoogleMapsInput } from "@/components/GoogleMapsInput";
import MultiSelectBox from "@/components/MultiSelectBox";
import TimePicker from "@/components/TimePicker";

const durations = [
  { value: "1 Month", label: "1 Month" },
  { value: "2 Months", label: "2 Months" },
  { value: "3 Months", label: "3 Months" },
  { value: "6 Months", label: "6 Months" },
  { value: "12 Months", label: "12 Months" },
];

export const days = [
  { value: "mon", label: "Monday" },
  { value: "tue", label: "Tuesday" },
  { value: "wed", label: "Wednesday" },
  { value: "thu", label: "Thursday" },
  { value: "fri", label: "Friday" },
  { value: "sat", label: "Saturday" },
  { value: "sun", label: "Sunday" },
];

const initialValues = {
  partner: { value: "", label: "" },
  title: "",
  discount: 0,
  images: [],
  categoryName: {
    value: "",
    label: "",
  },
  duration: {
    value: "",
    label: "",
  },
  days: [],
  offerAvailTime: {
    startTime: "",
    endTime: "",
  },
  locations: [],
  description: "",
  isFeatured: false,
};

export default function AddOffer() {
  const { addOffer, reset, isLoading, successMessage, error } = useOffer();
  const categories = useSelector(getAllCategories);
  const partners = useSelector(getAllPartners);
  const dispatch = useDispatch();
  const router = useRouter();

  const categoriesList = categories?.map((category) => {
    return { value: category.title, label: category.title };
  });

  const partnersList = partners?.map((partner) => {
    return { value: partner.id, label: partner.businessName };
  });

  const handleAddOffer = (data) => {
    addOffer(data);
  };

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    dispatch(fetchAllCategories(1, 1000));
    dispatch(fetchAllPartners({ pageSize: 1000 }));
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setTimeout(() => {
        router.replace(".");
      }, 1000);
    }
  }, [dispatch, router, successMessage]);

  return (
    <AppLayout>
      <section>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Add Offer</h1>
        </div>
        <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
          <div className="flex justify-between mb-4">
            <h1 className="text-lg font-semibold">Offer Details</h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={offerValidation}
            onSubmit={(values) => {
              const data = {
                ...values,
                partner: values.partner.value,
                categoryName: values.categoryName.value,
                duration: values.duration.value,
                expiryDate: calculateExpiryDate(values.duration.label),
              };

              handleAddOffer(data);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <div className="flex justify-end">
                  <div className="flex gap-x-4 justify-between">
                    <label className="block mb-2 text-sm font-medium">
                      Featured Offer
                    </label>
                    <Field
                      name="isFeatured"
                      id="isFeatured"
                      as={FeaturedToggle}
                    />
                    <ErrorMessage
                      component={"p"}
                      name="isFeatured"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
                  <div className="col-span-2">
                    <label className="block mb-2 text-sm font-medium">
                      Partner
                    </label>
                    <Field
                      name="partner"
                      id="partner"
                      as={SelectInput}
                      items={partnersList}
                      className="text-field"
                    />
                    <ErrorMessage
                      component={"p"}
                      name="partner.value"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="title"
                      className="block mb-2 text-sm font-medium"
                    >
                      Offer Title
                    </label>
                    <Field
                      name="title"
                      id="title"
                      type="text"
                      className="text-field"
                    />
                    <ErrorMessage
                      component={"p"}
                      name="title"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Offer Category
                    </label>
                    <Field
                      name="categoryName"
                      id="categoryName"
                      as={SelectInput}
                      items={categoriesList}
                    />
                    <ErrorMessage
                      component={"p"}
                      name="categoryName.value"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="relative">
                    <label className="block mb-2 text-sm font-medium">
                      Offer Days
                    </label>
                    <MultiSelectBox
                      placeholder={"Select Days"}
                      defaultIndices={values.days.map((item) =>
                        days.indexOf(days.find((i) => i.value === item))
                      )}
                      onSelect={(items) => {
                        setFieldValue(
                          "days",
                          items.map((item) => item.value)
                        );
                      }}
                      items={days}
                    />
                  </div>
                  <div>
                    <TimePicker
                      defaultValues={{ startTime: "09:00", endTime: "05:00" }}
                      onTimeChange={({ endTime, startTime }) => {
                        setFieldValue("offerAvailTime", {
                          startTime,
                          endTime,
                        });
                      }}
                    />
                    <div className="flex justify-between">
                      <ErrorMessage
                        component={"p"}
                        name="offerAvailTime.startTime"
                        className="text-red-600 text-sm"
                      />
                      <ErrorMessage
                        component={"p"}
                        name="offerAvailTime.endTime"
                        className="text-red-600 text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="discount"
                      className="block mb-2 text-sm font-medium"
                    >
                      Discount %
                    </label>
                    <Field
                      name="discount"
                      id="discount"
                      type="number"
                      min={10}
                      max={100}
                      className="number-field"
                    />
                    <ErrorMessage
                      component={"p"}
                      name="discount"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Duration
                    </label>
                    <Field
                      name="duration"
                      id="duration"
                      as={SelectInput}
                      items={durations}
                    />
                    <ErrorMessage
                      component={"p"}
                      name="duration.value"
                      className="text-red-600 text-sm"
                    />
                  </div>

                  <div className="col-span-2">
                    <label
                      htmlFor="description"
                      className="block mb-2 text-sm font-medium"
                    >
                      Offer Description
                    </label>
                    <Field
                      name="description"
                      id="description"
                      as="textarea"
                      rows="5"
                      className="textarea-field"
                    />
                    <ErrorMessage
                      component={"p"}
                      name="description"
                      className="text-red-600 text-sm"
                    />
                  </div>
                  <div className="col-span-2 relative">
                    <label className="block mb-2 text-sm font-medium">
                      Locations
                    </label>
                    <Field
                      name="locations"
                      id="locations"
                      as={GoogleMapsInput}
                    />
                    <ErrorMessage
                      component={"p"}
                      name="locations"
                      className="text-red-600 text-sm"
                    />
                  </div>
                </div>
                <OfferImages disabled={false} />
                <div className="mt-auto ml-auto text-end md:text-base text-sm font-semibold">
                  <button
                    type="submit"
                    className="px-8 py-2 rounded-lg text-white bg-primary hover:bg-primary-light"
                  >
                    {isLoading ? <Spinner /> : "Add Offer"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
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

function FeaturedToggle({ value, disabled, name, onChange }) {
  return (
    <ToggleButton
      value={value}
      disabled={disabled}
      onToggle={(value) => onChange({ target: { name: name, value: value } })}
    />
  );
}
