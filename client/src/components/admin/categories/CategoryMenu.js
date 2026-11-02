import React, { Fragment, useContext } from "react";
import { CategoryContext } from "./index";
import AddCategoryModal from "./AddCategoryModal";
import EditCategoryModal from "./EditCategoryModal";

const CategoryMenu = (props) => {
  const { dispatch } = useContext(CategoryContext);

  return (
    <Fragment>
      <div className="col-span-1 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">Categories</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage all product categories</p>
        </div>
        <button
          style={{ background: "#303031" }}
          onClick={(e) => dispatch({ type: "addCategoryModal", payload: true })}
          className="cursor-pointer rounded-xl px-4 py-2.5 flex items-center gap-2 text-white text-sm font-semibold hover:bg-black hover:shadow-md transition-all shrink-0"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" /></svg>
          Add Category
        </button>
        <AddCategoryModal />
        <EditCategoryModal />
      </div>
    </Fragment>
  );
};

export default CategoryMenu;