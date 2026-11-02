import React, { Fragment, useContext } from "react";
import { useHistory } from "react-router-dom";
import ProductCategoryDropdown from "./ProductCategoryDropdown";
import { HomeContext } from "./index";

const ProductCategory = (props) => {
  const { data, dispatch } = useContext(HomeContext);
  const history = useHistory();

  return (
    <Fragment>
      <div className="flex justify-end font-medium">
        <div className="flex space-x-2">
          <div
            onClick={(e) =>
              dispatch({
                type: "filterListDropdown",
                payload: !data.filterListDropdown,
              })
            }
            className={`flex items-center space-x-1 cursor-pointer ${
              data.filterListDropdown ? "text-yellow-700" : ""
            }`}
          >
            <span></span>
          </div>

          <div
            onClick={(e) =>
              dispatch({
                type: "searchDropdown",
                payload: !data.searchDropdown,
              })
            }
            className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full border-2 shadow-sm transition-all ${
              data.searchDropdown ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-200 hover:border-black"
            }`}
          >
            <span className="text-md md:text-[15px] font-semibold">Search organs...</span>
            <span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </span>
          </div>
        </div>
      </div>
      <ProductCategoryDropdown />
    </Fragment>
  );
};

export default ProductCategory;