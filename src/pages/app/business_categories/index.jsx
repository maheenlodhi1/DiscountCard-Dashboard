import { useEffect, useState } from "react";
import AppLayout from "@/layouts/AppLayout";
import { PlusIcon } from "@heroicons/react/20/solid";
import SimpleTable from "@/components/Tables/Simple";
import { useSelector } from "react-redux";
import {
  getAllCategories,
  getCategoriesError,
  getCategoriesLoading,
  getCategoriesPagination,
} from "@/features/categories/categoriesSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import Image from "next/image";
import SimpleNotification from "@/components/Notifications/Simple";
import Pagination from "@/components/Pagination";
import ContextMenu from "@/components/ContextMenu";
import LoadingTable from "@/components/Tables/Loading";
import AddCategoryModal from "@/components/Category/Add";
import EditCategoryModal from "@/components/Category/Edit";
import DeleteCategoryModal from "@/components/Category/Delete";
import { formatPage } from "@/utils/generics";
import { fetchAllCategories } from "@/features/categories/categoryApi";

const headers = [
  { label: "Image", value: "" },
  { label: "Category Name", value: "" },
  { label: "Date", value: "" },
  { label: "", value: "" },
];

export default function BusinessCategories() {
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [openEditCategory, setOpenEditCategory] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [successMessage, setSuccessMessage] = useState("");
  const [selected, setSelected] = useState("");
  const categories = useSelector(getAllCategories);
  const loading = useSelector(getCategoriesLoading);
  const error = useSelector(getCategoriesError);

  const pagination = useSelector(getCategoriesPagination);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategories(pageNumber));
  }, [dispatch, pageNumber]);

  return (
    <AppLayout>
      <section className="">
        <div className="flex justify-between">
          <h3>Business Categories</h3>
          <div className="flex gap-x-2 mb-4">
            <button
              onClick={() => setOpenAddCategory(true)}
              type="button"
              className="btn-primary__with-icon"
            >
              <PlusIcon className="w-6 h-6" />
              <span>Add Category</span>
            </button>
          </div>
        </div>
        {loading && <LoadingTable headers={headers} length={10} />}
        {!loading && categories.length > 0 && (
          <SimpleTable headers={headers}>
            {categories.map((category, index) => (
              <CategoryRow
                category={category}
                pageNo={pagination.pageNo}
                key={index}
                index={index}
                onView={() => {
                  setSelected(category.id);
                  setOpenEditCategory(true);
                }}
                onDelete={() => {
                  setSelected(category.id);
                  setOpenDeleteCategory(true);
                }}
              />
            ))}
          </SimpleTable>
        )}
        {!loading && !categories.length && (
          <h4 className="text-center md:text-lg font-semibold text-gray-600">
            No categories Available. <br /> Start by adding a category.
          </h4>
        )}
        {!loading && error && <p>{error}</p>}
        <Pagination
          currentPage={pagination.pageNo}
          handleClick={setPageNumber}
          totalPages={pagination.totalPages}
        />
        <AddCategoryModal
          show={openAddCategory}
          setShow={setOpenAddCategory}
          setMessage={setSuccessMessage}
        />
        {selected && (
          <EditCategoryModal
            categoryId={selected}
            show={openEditCategory}
            setSelected={setSelected}
            setShow={setOpenEditCategory}
          />
        )}
        {selected && (
          <DeleteCategoryModal
            categoryId={selected}
            show={openDeleteCategory}
            setSelected={setSelected}
            setShow={setOpenDeleteCategory}
            setMessage={setSuccessMessage}
          />
        )}
        {successMessage && (
          <div className="mt-10">
            <SimpleNotification
              type={"success"}
              heading={"Success"}
              setMessage={setSuccessMessage}
              message={successMessage}
            />
          </div>
        )}
      </section>
    </AppLayout>
  );
}

function CategoryRow({ pageNo, category, index, onView, onDelete }) {
  return (
    <tr
      key={category.id}
      className={`${index % 2 === 0 ? undefined : "bg-gray-50"} text-center`}
    >
      <td className="whitespace-nowrap p-3 text-sm text-left">
        {formatPage(pageNo, index)}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        <Image
          src={category.img}
          width={400}
          height={400}
          className="w-20 h-12 object-contain mx-auto"
          alt={category.title}
        />
      </td>
      <td className="whitespace-nowrap p-3 text-sm">{category.title}</td>
      <td className="whitespace-nowrap p-3 text-sm">
        {dayjs(category.createdAt).format("MM/DD/YYYY")}
      </td>
      <td className="whitespace-nowrap p-3 text-sm">
        <ContextMenu onView={onView} onDelete={onDelete} />
      </td>
    </tr>
  );
}
