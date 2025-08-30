"use client";

import { Listbox, Transition } from "@headlessui/react";
import {
  CheckIcon,
  ChevronUpDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";

export default function MultiSelectBox({
  defaultIndices = [],
  items,
  disabled,
  onSelect,
  placeholder,
}) {
  const [selectedItems, setSelectedItems] = useState(
    defaultIndices.map((index) => items[index]) || []
  );

  const removeItem = (e, itemToRemove) => {
    e.preventDefault();
    e.stopPropagation();

    const newSelectedItems = selectedItems.filter(
      (item) => item?.value !== itemToRemove?.value
    );

    setSelectedItems(newSelectedItems);
    onSelect(newSelectedItems);
  };
  console.log("seelcted Items", selectedItems, items, defaultIndices);

  return (
    <div className="relative">
      <Listbox
        disabled={disabled}
        value={selectedItems}
        onChange={(items) => {
          setSelectedItems(items);
          onSelect(items);
        }}
        multiple
      >
        <Listbox.Button className="w-full border rounded-md border-gray-300 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:border-primary outline-primary  flex items-center flex-wrap gap-1">
          {selectedItems.length === 0 ? (
            <span className="text-gray-500">
              {placeholder || "Select items..."}
            </span>
          ) : (
            <>
              {selectedItems.map((item) => (
                <span
                  key={item?.value}
                  className="bg-primary-light/20 text-primary px-2 py-0.5 rounded-md flex items-center gap-1"
                >
                  {item?.label}

                  <XMarkIcon
                    tabIndex={1}
                    onClick={(e) => removeItem(e, item)}
                    className="h-4 w-4 ml-1 text-primary hover:text-primary-dark focus:outline-none"
                    aria-hidden="true"
                  />
                </span>
              ))}
            </>
          )}
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
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
          <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {items.map((item, itemIdx) => (
              <Listbox.Option
                key={itemIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active
                      ? "bg-primary-light/20 text-primary"
                      : "text-gray-900"
                  }`
                }
                value={item}
              >
                {({ selected, active }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {item.label}
                    </span>
                    {selectedItems.some(
                      (selectedItem) => selectedItem.value === item.value
                    ) ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </div>
  );
}
