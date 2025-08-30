import { useRouter } from "next/router";
import { useEffect } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { adValidation } from "@/schemas";
import Spinner from "@/components/Loaders/Spinner";
import SimpleNotification from "@/components/Notifications/Simple";
import AppLayout from "@/layouts/AppLayout";
import useAds from "@/features/ads/useAds";
import FileDropzone from "@/components/FileDropzone";
import SpinnerLarge from "@/components/Loaders/Spinner/SpinnerLarge";
import dayjs from "dayjs";

export default function EditAd() {
  const router = useRouter();
  const adId = router?.query?.adId;
  const { editAd, getAd, reset, successMessage, isLoading, error, ad } =
    useAds();

  const handleUpdateAd = (data) => {
    editAd(adId, data);
  };

  useEffect(() => {
    if (successMessage) {
      getAd(adId);
    }
  }, [adId, successMessage]);

  useEffect(() => {
    if (adId) {
      getAd(adId);
    }
  }, [adId]);

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

  if (ad)
    return (
      <AppLayout>
        <section>
          <h1 className="text-xl font-semibold">Edit Ad</h1>
          <div className="bg-white my-4 p-6 rounded-xl shadow-custom-sm shadow-gray-300">
            <Formik
              initialValues={{
                title: ad.title,
                description: ad.description,
                imageUrl: ad.imageUrl,
                startDate: dayjs(ad.startDate).format("YYYY-MM-DD"),
                expirationDate: dayjs(ad.expirationDate).format("YYYY-MM-DD"),
              }}
              validationSchema={adValidation}
              onSubmit={(values) => {
                handleUpdateAd(values);
              }}
            >
              {({ values, setFieldValue }) => (
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
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
                      <div>
                        <label
                          htmlFor="startDate"
                          className="block mb-2 text-sm font-medium"
                        >
                          Start Date
                        </label>
                        <Field
                          name="startDate"
                          id="startDate"
                          type="date"
                          required
                          className="text-field"
                        />
                        <ErrorMessage
                          component={"span"}
                          name="startDate"
                          className="text-sm text-red-700"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="expirationDate"
                          className="block mb-2 text-sm font-medium"
                        >
                          End Date
                        </label>
                        <Field
                          name="expirationDate"
                          id="expirationDate"
                          type="date"
                          required
                          className="text-field"
                        />
                        <ErrorMessage
                          component={"span"}
                          name="expirationDate"
                          className="text-sm text-red-700"
                        />
                      </div>
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="imageUrl"
                        className="block mb-2 text-sm font-medium"
                      >
                        Upload Image
                      </label>
                      {values.imageUrl ? (
                        <div className="relative">
                          <img
                            src={values.imageUrl}
                            alt="Uploaded Preview"
                            className="w-full h-auto rounded-md border"
                          />
                          <button
                            type="button"
                            onClick={() => setFieldValue("imageUrl", "")}
                            className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <FileDropzone
                          multiple={false}
                          setLoading={() => {}}
                          onChange={(urls) => {
                            setFieldValue("imageUrl", urls[0]);
                          }}
                        />
                      )}
                      <ErrorMessage
                        component={"span"}
                        name="imageUrl"
                        className="text-sm text-red-700"
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium"
                      >
                        Description
                      </label>
                      <Field
                        name="description"
                        id="description"
                        as="textarea"
                        rows="4"
                        required
                        className="text-field resize-none"
                      />
                      <ErrorMessage
                        component={"span"}
                        name="description"
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
