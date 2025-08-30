import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export default function WarningAlert({ children }) {
  return (
    <div className="max-w-screen-2xl mx-auto border-l-4 border-warning-400 bg-warning-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-warning-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 text-sm text-warning-700">{children}</div>
      </div>
    </div>
  );
}
