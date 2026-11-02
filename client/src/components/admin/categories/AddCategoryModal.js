import React, { Fragment, useContext, useState } from "react";
import { CategoryContext } from "./index";
import { createCategory, getAllCategory } from "./FetchApi";

const AddCategoryModal = (props) => {
  const { data, dispatch } = useContext(CategoryContext);

  const alert = (msg, type) => (
    <div className={`bg-${type}-100 text-${type}-700 border border-${type}-200 rounded-xl py-2.5 px-4 w-full text-sm font-medium`}>{msg}</div>
  );

  const [fData, setFdata] = useState({
    cName: "",
    cDescription: "",
    cImage: "",
    cStatus: "Active",
    success: false,
    error: false,
  });

  const fetchData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      dispatch({
        type: "fetchCategoryAndChangeState",
        payload: responseData.Categories,
      });
    }
  };

  if (fData.error || fData.success) {
    setTimeout(() => {
      setFdata({ ...fData, success: false, error: false });
    }, 2000);
  }

  const submitForm = async (e) => {
    dispatch({ type: "loading", payload: true });
    e.preventDefault();
    e.target.reset();

    if (!fData.cImage) {
      dispatch({ type: "loading", payload: false });
      return setFdata({ ...fData, error: "Please upload a category image" });
    }

    try {
      let responseData = await createCategory(fData);
      if (responseData.success) {
        fetchData();
        setFdata({
          ...fData,
          cName: "",
          cDescription: "",
          cImage: "",
          cStatus: "Active",
          success: responseData.success,
          error: false,
        });
        dispatch({ type: "loading", payload: false });
        setTimeout(() => {
          setFdata({
            ...fData,
            cName: "",
            cDescription: "",
            cImage: "",
            cStatus: "Active",
            success: false,
            error: false,
          });
        }, 2000);
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        dispatch({ type: "loading", payload: false });
        setTimeout(() => {
          return setFdata({ ...fData, error: false, success: false });
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      
      <div
        onClick={(e) => dispatch({ type: "addCategoryModal", payload: false })}
        className={`${
          data.addCategoryModal ? "" : "hidden"
        } fixed top-0 left-0 z-30 w-full h-full bg-black/60 backdrop-blur-sm`}
      />
      
      <div
        className={`${
          data.addCategoryModal ? "" : "hidden"
        } fixed inset-0 m-4 flex items-center z-30 justify-center`}
      >
        <div className="relative bg-white w-full md:w-3/6 max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">Add Category</span>
              <p className="text-xs text-gray-400 mt-1">Create a new category for your shop</p>
            </div>
            <button
              onClick={(e) => dispatch({ type: "addCategoryModal", payload: false })}
              className="w-9 h-9 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-full flex items-center justify-center transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-5">
            {fData.error ? alert(fData.error, "red") : ""}
            {fData.success ? alert(fData.success, "green") : ""}
            <form className="w-full space-y-4" onSubmit={(e) => submitForm(e)}>
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Category Name *</label>
                <input
                  onChange={(e) => setFdata({ ...fData, success: false, error: false, cName: e.target.value })}
                  value={fData.cName}
                  placeholder="e.g. Fruits, Vegetables"
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                  type="text"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Category Description</label>
                <textarea
                  onChange={(e) => setFdata({ ...fData, success: false, error: false, cDescription: e.target.value })}
                  value={fData.cDescription}
                  placeholder="Write a short description..."
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm"
                  name="description" rows={4}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Category Image *</label>
                <input
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setFdata({ ...fData, success: false, error: false, cImage: e.target.files[0] })}
                  className="px-4 py-3 border border-dashed border-gray-300 rounded-xl bg-gray-50 text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-black file:text-white file:text-xs"
                  type="file"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Category Status</label>
                <select
                  name="status"
                  onChange={(e) => setFdata({ ...fData, success: false, error: false, cStatus: e.target.value })}
                  className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Disabled">Disabled</option>
                </select>
              </div>
              <div className="pt-2">
                <button
                  style={{ background: "#303031" }}
                  type="submit"
                  className="w-full text-white rounded-xl text-sm font-semibold py-3.5 hover:bg-black transition-all shadow-sm"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCategoryModal;