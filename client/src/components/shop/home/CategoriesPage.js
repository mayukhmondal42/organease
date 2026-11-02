import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { getAllCategory } from "../../admin/categories/FetchApi";

const apiURL = process.env.REACT_APP_API_URL;

const CategoriesPage = () => {
  const history = useHistory();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      let responseData = await getAllCategory();
      if (responseData && responseData.Categories) setCategories(responseData.Categories);
      setLoading(false);
    } catch (error) { console.log(error); setLoading(false); }
  };

  if (loading) return <div className="pt-4 text-center font-bold text-xl">Loading Categories...</div>;

  return (
    <Fragment>
      <section className="mx-4 pt-4 md:mx-12 md:pt-6">
        <button
          onClick={() => history.push("/")}
          className="mb-3 px-4 py-2 bg-white border border-gray-300 rounded-full text-sm font-bold text-gray-700 shadow hover:bg-gray-100"
        >
          ← Back to Home
        </button>

        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">Select Your Category</h1>
        <p className="text-center text-gray-500 mt-2">Choose an organ category to see available organs</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6 mb-16">
          {categories.map((item) => (
            <div key={item._id} onClick={() => history.push(`/products/category/${item._id}`)} className="bg-white rounded-3xl overflow-hidden shadow-lg border cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="h-48 md:h-56 bg-teal-50 overflow-hidden">
                {item.cImage ? <img src={`${apiURL}/uploads/categories/${item.cImage}`} alt={item.cName} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-6xl">🫀</div>}
              </div>
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold text-gray-800 capitalize">{item.cName}</h2>
                <p className="text-sm text-gray-500 mt-1">{item.cDescription || "View available organs"}</p>
                <span className="inline-block mt-3 px-5 py-2 rounded-full bg-black text-white text-xs font-bold">View Organs →</span>
              </div>
            </div>
          ))}
        </div>
        {categories.length === 0 && <p className="text-center text-gray-400">No Categories Found</p>}
      </section>
    </Fragment>
  );
};

export default CategoriesPage;