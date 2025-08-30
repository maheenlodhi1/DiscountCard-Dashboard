export default function LoadingTable({ headers, length }) {
  return (
    <div className=" flow-root">
      <div className="-mx-2 sm:-mx-4 lg:-mx-6 table-height min-h-96 table-scrollbar overflow-auto border rounded-md">
        <table className="min-w-full divide-gray-300">
          <thead className="sticky top-0 shadow-sm shadow-gray-300 font-medium bg-primary text-white">
            <tr className="py-2">
              <th
                scope="col"
                className="whitespace-nowrap py-3.5 px-3 text-left "
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
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {Array.from({ length: length || 10 }, (_, i) => (
              <tr key={i} className="w-full bg-gray-100 border-b">
                <td className="whitespace-nowrap py-3.5 px-3 text-left ">
                  <span className="w-full p-2 px-4 inline-block rounded bg-gray-400 animate-pulse" />
                </td>
                {headers.map((_, i) => (
                  <td
                    key={i}
                    className="text-center whitespace-nowrap p-3 text-sm "
                  >
                    <span className="w-full p-2 px-4 inline-block rounded bg-gray-400 animate-pulse" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
