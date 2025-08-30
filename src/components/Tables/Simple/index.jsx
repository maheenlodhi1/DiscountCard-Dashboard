import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function SimpleTable({ headers, children, handleSort }) {
  const [isDescending, setIsDescending] = useState(false);
  return (
    <div className=" flow-root">
      <div className="-mx-2 sm:-mx-4 lg:-mx-6 table-height min-h-96 table-scrollbar overflow-auto border rounded-md">
        <table className="min-w-full divide-gray-300">
          <thead className="sticky top-0 shadow-sm shadow-gray-300 font-medium bg-primary text-white">
            <tr className="py-2">
              <th
                scope="col"
                className="whitespace-nowrap py-3.5 px-3 text-center "
              >
                #
              </th>
              {headers.map((header, index) => (
                <th
                  key={index}
                  scope="col"
                  className="whitespace-nowrap py-3.5 px-3"
                >
                  <span>{header.label}</span>
                  {header.value && (
                    <button
                      onClick={() => {
                        handleSort(header.value, isDescending);
                        setIsDescending(!isDescending);
                      }}
                      type="button"
                      className="hover:text-primary-light"
                    >
                      <ChevronUpDownIcon className="w-4 h-4 inline ml-2" />
                    </button>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
