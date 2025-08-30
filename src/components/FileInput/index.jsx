import { useState } from "react";
import FileDropzone from "../FileDropzone";
import { useFormikContext } from "formik";

export function FileInput({ onChange, multiple, ...props }) {
  const { setFieldError } = useFormikContext();
  const [loading, setLoading] = useState(false);
  const handleChange = (urls, type = "data") => {
    if (type == "error") {
      setFieldError("images", urls);
      return;
    }
    onChange({
      target: {
        name: props.name,
        value: multiple ? urls : urls[0],
      },
    });
  };

  if (loading) return <p className="text-center">Uploading Image...</p>;

  return (
    <FileDropzone setLoading={setLoading} onChange={handleChange} {...props} />
  );
}
