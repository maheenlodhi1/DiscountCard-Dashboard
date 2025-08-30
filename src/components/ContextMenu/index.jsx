import { Menu, Transition } from "@headlessui/react";
import {
  EllipsisVerticalIcon,
  EyeIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import React, { Fragment } from "react";

export default function ContextMenu({ onView, onDelete, showDelete = true }) {
  return (
    <Menu as="div" className="relative inline-block">
      <Menu.Button type="button" className="p-2 rounded-full hover:bg-gray-100">
        <EllipsisVerticalIcon className="w-5 h-5" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          as="ul"
          className="p-1 m-0 w-28 origin-left right-0 bg-white z-50 absolute text-xs rounded-md shadow-custom-md shadow-gray-300"
        >
          <Menu.Item as={"li"} className="p-0 ">
            <button
              type="button"
              onClick={onView}
              className="w-full text-left flex gap-x-2 items-center px-4 py-1.5 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded"
            >
              <EyeIcon className="w-4 h-4" />
              <span>View</span>
            </button>
          </Menu.Item>
          {showDelete && (
            <Menu.Item as={"li"} className="p-0 ">
              <button
                type="button"
                onClick={onDelete}
                className="w-full flex gap-x-2 items-center px-4 py-1.5 text-red-700 hover:text-red-800 hover:bg-red-100 rounded"
              >
                <TrashIcon className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
