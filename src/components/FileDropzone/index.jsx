import { uploadImage } from "@/services/api/imageUploadApi";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import React from "react";
import Dropzone from "react-dropzone";

export default function FileDropzone({
  setLoading,
  onChange,
  maxSize = 50 * 1024 * 1024, // 50MB default
  maxFiles = 20,
  accept = ["image/jpeg", "image/png"],
  multiple = true,
  ...props
}) {
  const handleOnDrop = async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      const { errors } = rejectedFiles[0];
      let { message, code } = errors[0];
      if (code === "file-too-large") {
        message = `File size exceeds ${maxSize / (1024 * 1024)} MB`;
      }
      onChange(message, "error");
      return;
    }

    const files = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setLoading(true);
      const urls = await uploadImage(formData);
      onChange(urls);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // const acceptedFileTypes = accept.join("");

  return (
    <Dropzone
      maxFiles={maxFiles}
      maxSize={maxSize}
      accept={accept}
      multiple={multiple}
      onDrop={handleOnDrop}
      {...props}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className="border border-gray-400 group border-dashed rounded-md cursor-pointer py-5 hover:bg-primary-50 text-sm text-center"
        >
          <input {...getInputProps()} />
          <span className="p-4 rounded-md inline-block bg-gray-100">
            <ArrowUpTrayIcon className="w-6 h-6" />
          </span>
          <h4 className="text-base font-bold">
            {multiple
              ? "Drag & drop or click to select multiple files"
              : "Drag & drop or click to select a file"}
          </h4>
          <p>Max. file size: {maxSize / (1024 * 1024)} MB</p>
          <p>
            Supported file types:
            {/* <b>{acceptedFileTypes}</b> */}
          </p>
        </div>
      )}
    </Dropzone>
  );
}
