import React, { Fragment, useContext, useEffect } from "react";
import { getAllCategory, deleteCategory } from "./FetchApi";
import { CategoryContext } from "./index";
import moment from "moment";
const apiURL = process.env.REACT_APP_API_URL;

const AllCategory = () => {
  const { data, dispatch } = useContext(CategoryContext);
  const { categories, loading } = data;

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    let responseData = await getAllCategory();
    setTimeout(() => {
      if (responseData?.Categories) {
        dispatch({ type: "fetchCategoryAndChangeState", payload: responseData.Categories });
        dispatch({ type: "loading", payload: false });
      }
    }, 1000);
  };

  const deleteCategoryReq = async (cId) => {
    let d = await deleteCategory(cId);
    if (d.success) fetchData();
  };

  const editCategory = (cId, type, des, status) => {
    if (type) dispatch({ type: "editCategoryModalOpen", cId, des, status });
  };

  if (loading) return <div className="flex justify-center p-8"><span className="animate-spin text-3xl">↻</span></div>;

  return (
    <Fragment>
      
      <div className="hidden md:block w-full overflow-x-auto bg-white shadow-lg rounded-xl p-4">
        <table className="table-auto border w-full my-2 text-sm min-w-[700px]">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Image</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Created at</th>
              <th className="px-4 py-2 border">Updated at</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories?.length > 0 ? categories.map((item, key) => (
              <CategoryTable key={key} category={item} editCat={editCategory} deleteCat={deleteCategoryReq} />
            )) : (
              <tr><td colSpan="7" className="text-center font-semibold py-8">No category found</td></tr>
            )}
          </tbody>
        </table>
        <div className="text-sm text-gray-600 mt-2">Total {categories?.length || 0} category found</div>
      </div>

      
      <div className="md:hidden space-y-3">
        {categories?.length > 0 ? categories.map((item) => (
          <div key={item._id} className="bg-white rounded-xl shadow p-3 flex gap-3">
            <img className="w-16 h-16 object-cover rounded-lg shrink-0" src={`${apiURL}/uploads/categories/${item.cImage}`} alt="" />
            <div className="flex-1 min-w-0">
              <p className="font-bold truncate">{item.cName}</p>
              <p className="text-xs text-gray-500 line-clamp-2">{item.cDescription}</p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className={`${item.cStatus === "Active" ? "bg-green-200" : "bg-red-200"} text-xs px-2 py-0.5 rounded-full font-semibold`}>{item.cStatus}</span>
                <span className="text-[11px] text-gray-400">{moment(item.createdAt).format("lll")}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 shrink-0">
              <button onClick={() => editCategory(item._id, true, item.cDescription, item.cStatus)} className="p-2 bg-green-50 rounded-lg text-green-600">✏️</button>
              <button onClick={() => deleteCategoryReq(item._id)} className="p-2 bg-red-50 rounded-lg text-red-600">🗑️</button>
            </div>
          </div>
        )) : <p className="text-center py-8 font-semibold">No category found</p>}
        <p className="text-xs text-gray-500 text-center">Total {categories?.length || 0} category found</p>
      </div>
    </Fragment>
  );
};

const CategoryTable = ({ category, deleteCat, editCat }) => (
  <tr className="border-b">
    <td className="p-2">{category.cName.length > 20 ? category.cName.slice(0, 20) + "..." : category.cName}</td>
    <td className="p-2">{category.cDescription.length > 30 ? category.cDescription.slice(0, 30) + "..." : category.cDescription}</td>
    <td className="p-2 text-center"><img className="w-12 h-12 object-cover rounded-lg mx-auto" src={`${apiURL}/uploads/categories/${category.cImage}`} alt="" /></td>
    <td className="p-2 text-center"><span className={`${category.cStatus === "Active" ? "bg-green-200" : "bg-red-200"} rounded-full text-xs px-2 py-1 font-semibold`}>{category.cStatus}</span></td>
    <td className="p-2 text-center whitespace-nowrap">{moment(category.createdAt).format("lll")}</td>
    <td className="p-2 text-center whitespace-nowrap">{moment(category.updatedAt).format("lll")}</td>
    <td className="p-2 flex justify-center gap-1">
      <button onClick={() => editCat(category._id, true, category.cDescription, category.cStatus)} className="p-2 hover:bg-gray-100 rounded-lg text-green-600">✏️</button>
      <button onClick={() => deleteCat(category._id)} className="p-2 hover:bg-gray-100 rounded-lg text-red-600">🗑️</button>
    </td>
  </tr>
);

export default AllCategory;