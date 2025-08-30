import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState, useEffect, useMemo } from "react";

const generateTimeOptions = () =>
  Array.from({ length: 24 }, (_, hour) => {
    const value = `${hour.toString().padStart(2, "0")}:00`;
    const displayHour = hour % 12 || 12;
    const period = hour < 12 ? "AM" : "PM";
    return { value, label: `${displayHour}:00 ${period}` };
  });

export default function TimePicker({
  defaultValues,
  onTimeChange,
  disabled = false,
}) {
  const timeOptions = useMemo(generateTimeOptions, []);
  const [startTime, setStartTime] = useState(
    timeOptions.find((option) => option.value === defaultValues.startTime) ||
      null
  );
  const [endTime, setEndTime] = useState(
    timeOptions.find((option) => option.value === defaultValues.endTime) || null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    if (startTime && endTime) {
      if (startTime.value === endTime.value) {
        setError("Start and end times cannot be the same");
      } else {
        setError("");
        onTimeChange({ startTime: startTime.value, endTime: endTime.value });
      }
    }
  }, [startTime, endTime]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: "Start Time", value: startTime, setter: setStartTime },
          { label: "End Time", value: endTime, setter: setEndTime },
        ].map(({ label, value, setter }, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <Listbox disabled={disabled} value={value} onChange={setter}>
              <div className="relative mt-1">
                <Listbox.Button
                  className={`relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border ${
                    error ? "border-red-500" : "border-gray-300"
                  } shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm`}
                >
                  <span className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="block truncate">
                      {value?.label || `Select ${label.toLowerCase()}`}
                    </span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {timeOptions.map((option, index) => (
                      <Listbox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pr-4 ${
                            active
                              ? "bg-primary-light/20 text-primary"
                              : "text-gray-900"
                          }`
                        }
                        value={option}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {option.label}
                            </span>
                            {selected && (
                              <CheckIcon className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary h-5 w-5" />
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}
