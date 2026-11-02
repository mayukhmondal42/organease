import React, { Fragment, useContext, useState, useEffect } from "react";
import { CategoryContext } from "./index";
import { editCategory, getAllCategory } from "./FetchApi";

const EditCategoryModal = (props) => {
  const { data, dispatch } = useContext(CategoryContext);

  const [des, setDes] = useState("");
  const [status, setStatus] = useState("");
  const [cId, setCid] = useState("");

  useEffect(() => {
    setDes(data.editCategoryModal.des);
    setStatus(data.editCategoryModal.status);
    setCid(data.editCategoryModal.cId);
  }, [data.editCategoryModal.modal]);

  const fetchData = async () => {
    let responseData = await getAllCategory();
    if (responseData.Categories) {
      dispatch({
        type: "fetchCategoryAndChangeState",
        payload: responseData.Categories,
      });
    }
  };

  const submitForm = async () => {
    dispatch({ type: "loading", payload: true });
    let edit = await editCategory(cId, des, status);
    if (edit.error) {
      console.log(edit.error);
      dispatch({ type: "loading", payload: false });
    } else if (edit.success) {
      console.log(edit.success);
      dispatch({ type: "editCategoryModalClose" });
      setTimeout(() => {
        fetchData();
        dispatch({ type: "loading", payload: false });
      }, 1000);
    }
  };

  return (
    <Fragment>
      <div
        onClick={(e) => dispatch({ type: "editCategoryModalClose" })}
        className={`${data.editCategoryModal.modal ? "" : "hidden"} fixed top-0 left-0 z-30 w-full h-full bg-black/60 backdrop-blur-sm`}
      />
      <div className={`${data.editCategoryModal.modal ? "" : "hidden"} fixed inset-0 m-4 flex items-center z-30 justify-center`}>
        <div className="relative bg-white w-full md:w-3/6 max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100">
            <div>
              <span className="font-bold text-2xl tracking-tight text-gray-900">Edit Category</span>
              <p className="text-xs text-gray-400 mt-1">Update description & status</p>
            </div>
            <button onClick={(e) => dispatch({ type: "editCategoryModalClose" })} className="w-9 h-9 bg-gray-100 hover:bg-gray-900 hover:text-white rounded-full flex items-center justify-center transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          <div className="overflow-y-auto px-6 py-5 space-y-4">
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Category Description</label>
              <textarea value={des} onChange={(e) => setDes(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-sm" rows={5} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label className="text-sm font-semibold text-gray-700">Category Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm bg-white">
                <option value="Active">Active</option>
                <option value="Disabled">Disabled</option>
              </select>
            </div>
            <div className="pt-1">
              <button style={{ background: "#303031" }} onClick={(e) => submitForm()} className="w-full text-white rounded-xl text-sm font-semibold py-3.5 hover:bg-black transition-all shadow-sm">
                Update Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditCategoryModal;