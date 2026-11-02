import React, { Fragment, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { HomeContext } from "./index";
import { getAllCategory } from "../../admin/categories/FetchApi";
import { getAllProduct, productByPrice } from "../../admin/products/FetchApi";
import "./style.css";

const apiURL = process.env.REACT_APP_API_URL;

const CategoryList = () => {
  const history = useHistory();
  const { data } = useContext(HomeContext);
  const [categories, setCategories] = useState(null);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    try {
      let responseData = await getAllCategory();
      if (responseData && responseData.Categories) setCategories(responseData.Categories);
    } catch (error) { console.log(error); }
  };

  return (
    <div className={`${data.categoryListDropdown ? "" : "hidden"} my-4`}>
      <hr />
      <div className="py-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories && categories.length > 0 ? (
          categories.map((item, index) => (
            <Fragment key={index}>
              <div onClick={(e) => history.push(`/products/category/${item._id}`)} className="col-span-1 m-2 flex flex-col items-center justify-center space-y-2 cursor-pointer">
                <img src={`${apiURL}/uploads/categories/${item.cImage}`} alt="pic" />
                <div className="font-medium capitalize">{item.cName}</div>
              </div>
            </Fragment>
          ))
        ) : (
          <div className="text-xl text-center my-4">No Category</div>
        )}
      </div>
    </div>
  );
};

const FilterList = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [range, setRange] = useState(0);
  const rangeHandle = (e) => { setRange(e.target.value); fetchData(e.target.value); };
  const fetchData = async (price) => {
    if (price === "all") {
      try {
        let responseData = await getAllProduct();
        if (responseData && responseData.Products) dispatch({ type: "setProducts", payload: responseData.Products });
      } catch (error) { console.log(error); }
    } else {
      dispatch({ type: "loading", payload: true });
      try {
        setTimeout(async () => {
          let responseData = await productByPrice(price);
          if (responseData && responseData.Products) {
            dispatch({ type: "setProducts", payload: responseData.Products });
            dispatch({ type: "loading", payload: false });
          }
        }, 700);
      } catch (error) { console.log(error); }
    }
  };
  const closeFilterBar = () => {
    fetchData("all");
    dispatch({ type: "filterListDropdown", payload: !data.filterListDropdown });
    setRange(0);
  };
  return (
    <div className={`${data.filterListDropdown ? "" : "hidden"} my-4`}>
      <hr />
    </div>
  );
};

const Search = () => {
  const { data, dispatch } = useContext(HomeContext);
  const [search, setSearch] = useState("");
  const [productArray, setPa] = useState(null);

  useEffect(() => {
    getAllProduct().then((res) => {
      if (res && res.Products) setPa(res.Products);
    });
  }, []);

  const searchHandle = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (!productArray) return;
    const q = value.toLowerCase().trim();
    if (q === "") {
      dispatch({ type: "setProducts", payload: productArray });
      return;
    }
    const filtered = productArray.filter((item) => {
      return (
        item.pName?.toLowerCase().includes(q) ||
        item.pDescription?.toLowerCase().includes(q) ||
        item.pCategory?.cName?.toLowerCase().includes(q)
      );
    });
    dispatch({ type: "setProducts", payload: filtered });
  };

  const closeSearchBar = () => {
    dispatch({ type: "searchDropdown", payload: !data.searchDropdown });
    if (productArray) dispatch({ type: "setProducts", payload: productArray });
    setSearch("");
  };

  return (
    <div className={`${data.searchDropdown ? "" : "hidden"} my-4`}>
      <div className="bg-white rounded-[20px] shadow-lg border border-gray-100 p-3 md:p-4">
        <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3">
          <svg className="w-5 h-5 text-gray-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={search} onChange={(e) => searchHandle(e)} className="w-full bg-transparent outline-none text-[15px] font-medium placeholder:text-gray-400" type="text" placeholder="Search Organs..." autoFocus />
          <div onClick={(e) => closeSearchBar()} className="cursor-pointer bg-black text-white w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">✕</div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3 px-1">
          {["Kidney", "Liver", "Heart", "Eye", "Lung"].map((tag) => (
            <span key={tag} onClick={() => searchHandle({ target: { value: tag } })} className="px-3 py-1.5 bg-gray-50 hover:bg-black hover:text-white border text-xs font-bold rounded-full cursor-pointer">{tag}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductCategoryDropdown = (props) => {
  return (
    <Fragment>
      <CategoryList />
      <FilterList />
      <Search />
    </Fragment>
  );
};

export default ProductCategoryDropdown;