import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";

const Submenu = (props) => {
  const { categoryId, category, product } = props.value;
  const history = useHistory();
  return (
    <Fragment>
      {/* Submenu Section */}
      <section className="mx-4 mt-24 md:mx-12 md:mt-32 lg:mt-24">
        <div className="flex justify-between items-center bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3">
          <div className="text-sm flex items-center gap-2 overflow-hidden">
            <span
              className="text-gray-500 hover:text-yellow-700 cursor-pointer font-medium whitespace-nowrap transition-colors"
              onClick={(e) => history.push("/")}
            >
              Organs
            </span>
            <span className="text-gray-300">/</span>
            <span
              className="text-gray-500 hover:text-yellow-700 cursor-pointer font-medium whitespace-nowrap transition-colors"
              onClick={(e) => history.push(`/products/category/${categoryId}`)}
            >
              {category}
            </span>
            <span className="text-gray-300">/</span>
            <span className="text-yellow-700 font-semibold truncate cursor-default">{product}</span>
          </div>
          <div className="hidden sm:block shrink-0 ml-3">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </section>
      {/* Submenu Section */}
    </Fragment>
  );
};

export default Submenu;