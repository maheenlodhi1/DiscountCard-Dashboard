import { CheckBadgeIcon } from "@heroicons/react/20/solid";

export default function SuccessAlert({ children }) {
  return (
    <div className="border-l-4 border-green-400 bg-green-50 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <CheckBadgeIcon
            className="h-5 w-5 text-green-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3 text-sm text-green-700">{children}</div>
      </div>
    </div>
  );
}
