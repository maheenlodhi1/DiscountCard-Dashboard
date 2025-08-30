import { ErrorMessage, Field, useFormikContext } from "formik";
import SlickSlider from "../SlickSlider";
import Image from "next/image";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FileInput } from "../FileInput";

export function OfferImages({ disabled }) {
  const { values, errors, setFieldValue } = useFormikContext();

  const deleteImage = (index) => {
    const updatedImages = [...values.images];
    updatedImages.splice(index, 1);
    setFieldValue("images", updatedImages);
  };

  return (
    <div className="my-4">
      <h1 className="text-lg font-semibold">Offer Images</h1>
      {errors.images && (
        <ErrorMessage
          component={"p"}
          name="images"
          className="text-red-600 text-sm"
        />
      )}
      <div className="my-2 text-nowrap overflow-auto">
        {values.images.length > 0 &&
          values.images.map((image, index) => (
            <div
              key={index}
              className="mx-2 group relative inline-block rounded-md"
            >
              <Image
                src={image}
                height={400}
                width={400}
                className="m-0 rounded-md h-28 w-40 object-cover border aspect-square "
                alt={`Image ${index}`}
              />
              {!disabled && (
                <div className="h-full w-full rounded-md absolute left-0 top-0 group-hover:visible invisible flex items-center justify-center  bg-gray-950/20 transition">
                  <button
                    type="button"
                    onClick={() => deleteImage(index)}
                    className="group-hover:inline-block hidden m-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>

      <Field
        as={FileInput}
        name="images"
        id="images"
        multiple={true}
        accept={{
          "image/*": [".png", ".jpg", ".jpeg"],
        }}
      />
    </div>
  );
}
