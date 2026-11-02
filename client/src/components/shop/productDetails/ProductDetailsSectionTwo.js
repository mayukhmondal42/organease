import React, { Fragment, useContext, useEffect, useState } from "react";
import AllReviews from "./AllReviews";
import ReviewForm from "./ReviewForm";

import { ProductDetailsContext } from "./";
import { LayoutContext } from "../layout";

import { isAuthenticate } from "../auth/fetchApi";

import "./style.css";

const Menu = () => {
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row items-center justify-center">
      </div>
    </Fragment>
  );
};

const RatingReview = () => {
  return (
    <Fragment>
      <AllReviews />
      {isAuthenticate() ? (
        <ReviewForm />
      ) : (
        <div className="mb-12 md:mx-16 lg:mx-20 xl:mx-24 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-2xl mb-4 text-sm font-medium text-center">
          You need to login in for review
        </div>
      )}
    </Fragment>
  );
};

const ProductDetailsSectionTwo = (props) => {
  const { data } = useContext(ProductDetailsContext);
  const { data: layoutData } = useContext(LayoutContext);
  const [singleProduct, setSingleproduct] = useState({});

  useEffect(() => {
    setSingleproduct(
      layoutData.singleProductDetail ? layoutData.singleProductDetail : ""
    );

    
  }, []);

  return (
    <Fragment>
      <section className="m-4 md:mx-12 md:my-8">
        <Menu />
        {data.menu ? (
          <div className="mt-6 bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-5 sm:p-7">
            <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-5 bg-yellow-500 rounded-full"></span>
              Description
            </h3>
            <p className="text-gray-600 leading-7 text-[15px] whitespace-pre-line">{singleProduct.pDescription}</p>
          </div>
        ) : (
          <RatingReview />
        )}
      </section>
      <div className="m-4 md:mx-12 md:my-6 flex justify-center capitalize bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-800 px-4 py-4">
        <div className="text-sm">
          <span className="font-semibold">Category :</span>
          <span className="text-sm text-gray-600 ml-1">
            {singleProduct.pCategory ? singleProduct.pCategory.cName : ""}
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductDetailsSectionTwo;