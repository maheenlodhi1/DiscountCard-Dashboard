import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";
import Dropzone from "react-dropzone";

import { convertImageToBase64, uploadImage } from "@/utils/imageUpload";

export default function FileDropzoneMultiple({
  images,
  setImages,
  multiple = true,
}) {
  const [localFiles, setLocalFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const uploadBulkFiles = async (files) => {
    try {
      const promises = files.map(async (image) => {
        const result = await convertImageToBase64(image);
        const cloudinaryResponse = await uploadImage(result, setProgress);
        return cloudinaryResponse;
      });
      const responses = await Promise.all(promises);
      return responses;
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  const handleOnDrop = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;
    const cloudinaryResponses = await uploadBulkFiles(acceptedFiles);
    if (cloudinaryResponses) {
      const imageUrls = cloudinaryResponses.map((res) => res.secure_url);
      setImages([...images, ...imageUrls]);
    } else return;
    setLocalFiles([
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);
  };

  const deleteImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const uploadedImages = images?.map((file, index) => (
    <div
      key={file.name}
      className="group-hover:text-neutral-700 bg-neutral-200 m-2 rounded-md inline-flex items-center p-1  text-xs relative"
    >
      <div className="rounded-md relative">
        <Image
          src={file.secure_url}
          width={400}
          height={400}
          className="w-20 h-20 rounded-md object-contain"
          alt={"gjk "}
        />
      </div>
      <button
        type="button"
        onClick={() => deleteImage(index)}
        className="absolute top-0 right-0 m-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        <TrashIcon className="w-4 h-4" />
      </button>
    </div>
  ));

  return (
    <Dropzone
      accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
      onDrop={handleOnDrop}
      multiple={multiple}
    >
      {({ getRootProps, getInputProps }) => (
        <>
          <div
            {...getRootProps()}
            className="border border-gray-400 group border-dashed rounded-md cursor-pointer py-5 hover:bg-primary-50 text-sm text-center"
          >
            <input {...getInputProps()} />
            <span className="p-4 rounded-md inline-block bg-gray-100">
              <ArrowUpTrayIcon className="w-6 h-6" />
            </span>
            <h4 className="text-base font-bold">
              Drag & drop or click to select multiple files
            </h4>
            <p>Max. file size 10MB</p>
            <p>
              Supported Files <b>jpeg, PNG</b>
            </p>
          </div>
        </>
      )}
    </Dropzone>
  );
}
