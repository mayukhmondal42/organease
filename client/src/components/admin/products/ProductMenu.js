import React, { Fragment, useContext } from "react";
import { ProductContext } from "./index";
import AddProductModal from "./AddProductModal";
import EditProductModal from "./EditProductModal";

const ProductMenu = (props) => {
  const { dispatch } = useContext(ProductContext);
  return (
    <Fragment>
      <div className="col-span-1 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 w-full max-w-full">
        <div className="flex items-center w-full sm:w-auto">
          <span
            style={{ background: "#303031" }}
            onClick={(e) =>
              dispatch({ type: "addProductModal", payload: true })
            }
            className="rounded-full cursor-pointer p-2 bg-gray-800 flex items-center justify-center text-gray-100 text-xs sm:text-sm font-semibold uppercase w-full sm:w-auto"
          >
            <svg
              className="w-6 h-6 text-gray-100 mr-2 shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Add Organ
          </span>
        </div>
        <AddProductModal />
        <EditProductModal />
      </div>
    </Fragment>
  );
};

export default ProductMenu;