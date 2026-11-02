import React, { Fragment, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductDetailsContext } from "./index";
import { LayoutContext } from "../layout";
import Submenu from "./Submenu";
import ProductDetailsSectionTwo from "./ProductDetailsSectionTwo";

import { getSingleProduct } from "./FetchApi";
import { cartListProduct } from "../partials/FetchApi";

import { isWishReq, unWishReq, isWish } from "../home/Mixins";
import { updateQuantity, slideImage, addToCart, cartList } from "./Mixins";
import { totalCost } from "../partials/Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const ProductDetailsSection = (props) => {
  let { id } = useParams();

  const { data, dispatch } = useContext(ProductDetailsContext);
  const { data: layoutData, dispatch: layoutDispatch } =
    useContext(LayoutContext);

  const sProduct = layoutData.singleProductDetail;
  const [pImages, setPimages] = useState(null);
  const [count, setCount] = useState(0);

  const [quantitiy, setQuantitiy] = useState(1);
  const [, setAlertq] = useState(false);

  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  useEffect(() => {
    fetchData();
    
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getSingleProduct(id);
      setTimeout(() => {
        if (responseData.Product) {
          layoutDispatch({
            type: "singleProductDetail",
            payload: responseData.Product,
          });
          setPimages(responseData.Product.pImages);
          dispatch({ type: "loading", payload: false });
          layoutDispatch({ type: "inCart", payload: cartList() });
        }
        if (responseData.error) {
          console.log(responseData.error);
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
    fetchCartProduct();
  };

  const fetchCartProduct = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData && responseData.Products) {
        layoutDispatch({ type: "cartProduct", payload: responseData.Products });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-3">
          <svg className="w-12 h-12 animate-spin text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <p className="text-sm text-gray-500">Loading...</p>
        </div>
      </div>
    );
  } else if (!sProduct) {
    return <div>No Organs</div>;
  }
  return (
    <Fragment>
      <Submenu
        value={{
          categoryId: sProduct.pCategory._id,
          product: sProduct.pName,
          category: sProduct.pCategory.cName,
        }}
      />
      <section className="m-4 md:mx-12 md:my-6">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6">
          
          <div className="hidden md:block md:col-span-1 md:flex md:flex-col md:space-y-3">
            <img
              onClick={(e) => slideImage("increase", 0, count, setCount, pImages)}
              className={`${count === 0 ? "ring-2 ring-yellow-500 opacity-100" : "opacity-40 hover:opacity-80"} cursor-pointer w-20 h-20 object-cover object-center rounded-xl transition-all`}
              src={`${apiURL}/uploads/products/${sProduct.pImages[0]}`}
              alt="pic"
            />
            <img
              onClick={(e) => slideImage("increase", 1, count, setCount, pImages)}
              className={`${count === 1 ? "ring-2 ring-yellow-500 opacity-100" : "opacity-40 hover:opacity-80"} cursor-pointer w-20 h-20 object-cover object-center rounded-xl transition-all`}
              src={`${apiURL}/uploads/products/${sProduct.pImages[1]}`}
              alt="pic"
            />
          </div>

          
          <div className="col-span-2 md:col-span-7">
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.07)] border border-gray-100">
              <img
                className="w-full aspect-[4/3] object-cover"
                src={`${apiURL}/uploads/products/${sProduct.pImages[count]}`}
                alt="Pic"
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-sm">
                {sProduct.pCategory.cName}
              </span>
              <div className="absolute inset-0 flex justify-between items-center px-3">
                <button
                  onClick={(e) => slideImage("increase", null, count, setCount, pImages)}
                  className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md text-gray-700 hover:bg-yellow-500 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button
                  onClick={(e) => slideImage("increase", null, count, setCount, pImages)}
                  className="w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md text-gray-700 hover:bg-yellow-500 hover:text-white transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          </div>

          
          <div className="col-span-2 mt-2 md:mt-0 md:col-span-4 md:ml-2 lg:ml-4">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.07)]">
              <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold leading-tight text-gray-900 tracking-tight">{sProduct.pDescription}</h1>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold bg-green-100 text-green-700 px-2 py-1 rounded-full uppercase tracking-wide">
                    {sProduct.pQuantity !== 0 ? "Available" : "Out of Stock"}
                  </span>
                  <span className="text-[11px] font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {sProduct.pCategory.cName}
                  </span>
                </div>
                <div className="text-xl font-semibold text-gray-900 mt-1">
                  PIN Code: <span className="text-yellow-700">{sProduct.pPrice}</span>
                </div>
              </div>

              <div className="my-5">
                {+quantitiy === +sProduct.pQuantity ? (
                  <span className="text-xs text-red-500 font-medium">limited Organs</span>
                ) : ""}
                <div className={`flex justify-between items-center px-4 py-3 rounded-2xl border bg-gray-50 ${+quantitiy === +sProduct.pQuantity && "border-red-300 bg-red-50"}`}>
                  <div className="text-sm font-medium text-gray-700">Quantity</div>
                  {sProduct.pQuantity !== 0 ? (
                    <Fragment>
                      {layoutData.inCart == null ||
                      (layoutData.inCart !== null &&
                        layoutData.inCart.includes(sProduct._id) === false) ? (
                        <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-sm border">
                          <button onClick={(e) => updateQuantity("decrease", sProduct.pQuantity, quantitiy, setQuantitiy, setAlertq)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-yellow-500 hover:text-white flex items-center justify-center transition-all">-</button>
                          <span className="font-bold w-8 text-center">{quantitiy}</span>
                          <button onClick={(e) => updateQuantity("increase", sProduct.pQuantity, quantitiy, setQuantitiy, setAlertq)} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-yellow-500 hover:text-white flex items-center justify-center transition-all">+</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-sm border opacity-50">
                          <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">-</span>
                          <span className="font-bold w-8 text-center">{quantitiy}</span>
                          <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">+</span>
                        </div>
                      )}
                    </Fragment>
                  ) : (
                    <div className="flex items-center gap-1 bg-white rounded-full p-1 shadow-sm border opacity-50">
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">-</span>
                      <span className="font-bold w-8 text-center">{quantitiy}</span>
                      <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">+</span>
                    </div>
                  )}
                </div>

                
                {sProduct.pQuantity !== 0 ? (
                  <Fragment>
                    {layoutData.inCart !== null &&
                    layoutData.inCart.includes(sProduct._id) === true ? (
                      <div style={{ background: "#303031" }} className="mt-4 px-4 py-3.5 text-white text-center cursor-not-allowed uppercase text-sm font-semibold tracking-wider rounded-2xl opacity-75">
                        Requests
                      </div>
                    ) : (
                      <div
                        onClick={(e) => addToCart(sProduct._id, quantitiy, sProduct.pPrice, layoutDispatch, setQuantitiy, setAlertq, fetchData, totalCost)}
                        style={{ background: "#303031" }}
                        className="mt-4 px-4 py-3.5 text-white text-center cursor-pointer uppercase text-sm font-semibold tracking-wider rounded-2xl hover:bg-black transition-all hover:shadow-lg active:scale-[0.98]"
                      >
                        Request
                      </div>
                    )}
                  </Fragment>
                ) : (
                  <Fragment>
                    {layoutData.inCart !== null &&
                    layoutData.inCart.includes(sProduct._id) === true ? (
                      <div style={{ background: "#303031" }} className="mt-4 px-4 py-3.5 text-white text-center cursor-not-allowed uppercase text-sm font-semibold tracking-wider rounded-2xl opacity-75">
                        In organ list
                      </div>
                    ) : (
                      <div style={{ background: "#303031" }} className="mt-4 px-4 py-3.5 text-white opacity-50 cursor-not-allowed text-center uppercase text-sm font-semibold tracking-wider rounded-2xl">
                        Currently Available
                      </div>
                    )}
                  </Fragment>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProductDetailsSectionTwo />
    </Fragment>
  );
};

export default ProductDetailsSection;