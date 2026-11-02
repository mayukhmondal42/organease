import React, { Fragment } from "react";

const SearchFilter = (props) => {
  return (
    <Fragment>
      <div className="w-full flex items-center justify-end mb-4">
        <div className="flex w-full md:w-[420px] bg-white border border-gray-200 rounded-full overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-black">
          <span className="py-3 px-3 flex items-center">
            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
            </svg>
          </span>
          <input
            placeholder="Find orders..."
            className="w-full py-3 px-1 focus:outline-none text-sm bg-transparent"
            type="text"
          />
          <button className="bg-black text-white px-5 text-sm font-bold">Search</button>
        </div>
      </div>
    </Fragment>
  );
};

export default SearchFilter;