import { Parser } from "@json2csv/plainjs";
import { addMonths } from "date-fns";
import { PAGE_SIZE } from "./constants";
import { stringExcel as stringExcelFormatter } from "@json2csv/formatters";

const durationMap = {
  1: addMonths,
  3: addMonths,
  6: addMonths,
  12: addMonths,
};

const calculateExpiryDate = (selectedDuration) => {
  const currentDate = new Date();
  const interval = parseInt(selectedDuration.split(" ")[0], 10);
  const durationFunction = durationMap[interval];
  if (durationFunction) {
    const newExpiryDate = durationFunction(currentDate, interval);
    return newExpiryDate;
  }
};

function parseJSONtoCSV(fields, jsonArray) {
  const json2csvParser = new Parser({
    fields,
    formatters: { string: stringExcelFormatter },
  });

  const csv = json2csvParser.parse(jsonArray);
  const bom = "\uFEFF";
  const csvWithBom = bom + csv;
  const blob = new Blob([csvWithBom], { type: "data:text/csv;charset=utf-8" });

  const url = window.URL.createObjectURL(blob);
  return url;
}

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function isValidDate(dateString) {
  // Attempt to create a Date object from the string
  const dateObject = new Date(dateString);

  // Check if the created Date object is valid
  return !isNaN(dateObject.getTime());
}

const formatPage = (pageNo, index) => (pageNo - 1) * PAGE_SIZE + index + 1;

const handleSort = (key, array, setSortedArray, isDescending = false) => {
  const tempArray = [...array];
  const keyType = typeof tempArray[0][key];
  switch (keyType) {
    case "string":
      tempArray.sort((a, b) => {
        if (isValidDate(a[key]) && isValidDate(b[key])) {
          if (isDescending) return new Date(b[key]) - new Date(a[key]);
          else return new Date(a[key]) - new Date(b[key]);
        } else {
          const prev = a[key].toLowerCase();
          const next = b[key].toLowerCase();
          if (isDescending) {
            if (prev > next) return -1;
            if (prev < next) return 1;
          } else {
            if (prev > next) return 1;
            if (prev < next) return -1;
          }
          return 0;
        }
      });

    case "number":
      tempArray.sort((a, b) => {
        if (isDescending) return b[key] - a[key];
        else return a[key] - b[key];
      });

    default:
      tempArray;
  }
  setSortedArray(tempArray);
};

export {
  classNames,
  formatPage,
  calculateExpiryDate,
  isEmptyObject,
  parseJSONtoCSV,
  isValidDate,
  handleSort,
};
