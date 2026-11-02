import React, { Fragment, useContext, useState } from "react";
import { CategoryContext } from "./index";
import { createCategory, getAllCategory } from "./FetchApi";

const AddCategoryModal = (props) => {
  const { data, dispatch } = useContext(CategoryContext);

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
      dispatch({ type: "fetchCategoryAndChangeState", payload: responseData.Categories });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    dispatch({ type: "loading", payload: true });

    if (!fData.cImage) {
      dispatch({ type: "loading", payload: false });
      setFdata({ ...fData, error: "Please upload a category image" });
      setTimeout(() => setFdata({ ...fData, error: false }), 2000);
      return;
    }

    try {
      let responseData = await createCategory(fData);
      if (responseData.success) {
        fetchData();
        setFdata({ ...fData, cName: "", cDescription: "", cImage: "", cStatus: "Active", success: responseData.success, error: false });
        dispatch({ type: "loading", payload: false });
        setTimeout(() => setFdata({ ...fData, cName: "", cDescription: "", cImage: "", cStatus: "Active", success: false, error: false }), 2000);
      } else if (responseData.error) {
        setFdata({ ...fData, success: false, error: responseData.error });
        dispatch({ type: "loading", payload: false });
        setTimeout(() => setFdata({ ...fData, error: false, success: false }), 2000);
      }
    } catch (error) { console.log(error); }
  };

  if (!data.addCategoryModal) return null;

  return (
    <Fragment>
      <div onClick={(e) => dispatch({ type: "addCategoryModal", payload: false })} className="fixed inset-0 z-30 bg-black/50" />
      <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
        <div className="relative bg-white w-full md:w-3/6 max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Add Category</h2>
              <p className="text-xs text-gray-400 mt-0.5">Create a new organ category</p>
            </div>
            <button onClick={(e) => dispatch({ type: "addCategoryModal", payload: false })} className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {fData.error && <div className="bg-red-100 text-red-700 text-sm font-medium py-2 px-4 rounded-xl mb-3">{fData.error}</div>}
          {fData.success && <div className="bg-green-100 text-green-700 text-sm font-medium py-2 px-4 rounded-xl mb-3">{fData.success}</div>}

          <form className="space-y-4" onSubmit={(e) => submitForm(e)}>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Category Name</label>
              <input onChange={(e) => setFdata({ ...fData, success: false, error: false, cName: e.target.value })} value={fData.cName} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" type="text" placeholder="e.g. Kidney" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Category Description</label>
              <textarea onChange={(e) => setFdata({ ...fData, success: false, error: false, cDescription: e.target.value })} value={fData.cDescription} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" rows={4} placeholder="Short description..." />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Category Image</label>
              <input accept=".jpg,.jpeg,.png" onChange={(e) => setFdata({ ...fData, success: false, error: false, cImage: e.target.files[0] })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl" type="file" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Category Status</label>
              <select name="status" onChange={(e) => setFdata({ ...fData, success: false, error: false, cStatus: e.target.value })} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none" id="status">
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
            <button style={{ background: "#303031" }} type="submit" className="w-full text-white rounded-xl text-sm font-semibold py-3 hover:bg-black transition-all">Create category</button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCategoryModal;