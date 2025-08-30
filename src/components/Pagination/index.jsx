import { ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import {
  ChevronDoubleLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import React from "react";

function Pagination({ currentPage, totalPages, handleClick }) {
  const pageLimit = 5;
  const halfLimit = Math.floor(pageLimit / 2);
  const startPage = Math.max(1, currentPage - halfLimit);
  const endPage = Math.min(totalPages, currentPage + halfLimit);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="flex justify-between items-center mt-4">
      <div className="ml-auto flex justify-center gap-x-1 items-center">
        {currentPage > 1 && (
          <li>
            <button
              className="py-2 px-3  border rounded-md hover:border-gray-500 leading-tight text-sm text-gray-800"
              onClick={() => {
                handleClick(1);
              }}
            >
              <ChevronDoubleLeftIcon className="w-5 h-5 stroke-2" />
            </button>
          </li>
        )}
        {currentPage > 1 && (
          <li>
            <button
              className="py-2 px-3  border rounded-md hover:border-gray-500 leading-tight text-sm text-gray-800"
              onClick={() => {
                handleClick(currentPage - 1);
              }}
            >
              <ChevronLeftIcon className="w-5 h-5 stroke-2" />
            </button>
          </li>
        )}

        {startPage > 2 && (
          <li>
            <span className="py-2 px-3  border rounded-md hover:border-gray-500 text-sm leading-tight text-gray-800">
              ...
            </span>
          </li>
        )}

        {pageNumbers.slice(startPage - 1, endPage).map((pageNumber) => (
          <li key={pageNumber}>
            <button
              className={`border rounded-md py-2 px-3 leading-tight text-sm  ${
                pageNumber === currentPage ? "text-primary " : "text-gray-800 "
              }`}
              onClick={() => {
                handleClick(pageNumber);
              }}
            >
              {pageNumber}
            </button>
          </li>
        ))}

        {endPage < totalPages - 1 && (
          <li>
            <span className="py-2 px-3  border rounded-md hover:border-gray-500 text-sm leading-tight text-gray-800">
              ...
            </span>
          </li>
        )}

        {currentPage < totalPages && (
          <li>
            <button
              className="py-2 px-3  border rounded-md hover:border-gray-500 leading-tight text-sm text-gray-800"
              onClick={() => {
                handleClick(currentPage + 1);
              }}
            >
              <ChevronRightIcon className="w-5 h-5 stroke-2" />
            </button>
          </li>
        )}

        {currentPage < totalPages && (
          <li>
            <button
              className="py-2 px-3  border rounded-md hover:border-gray-500 leading-tight text-sm text-gray-800"
              onClick={() => {
                handleClick(totalPages);
              }}
            >
              <ChevronDoubleRightIcon className="w-5 h-5 stroke-2" />
            </button>
          </li>
        )}
      </div>
    </ul>
  );
}

export default Pagination;
