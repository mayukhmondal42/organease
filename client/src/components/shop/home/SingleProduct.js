import React, { Fragment, useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { getAllProduct } from "../../admin/products/FetchApi";
import { HomeContext } from "./index";

const apiURL = process.env.REACT_APP_API_URL;

const SingleProduct = () => {
  const { data, dispatch } = useContext(HomeContext);
  const { products } = data;
  const history = useHistory();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    dispatch({ type: "loading", payload: true });
    try {
      let responseData = await getAllProduct();
      setTimeout(() => {
        if (responseData && responseData.Products) {
          dispatch({ type: "setProducts", payload: responseData.Products });
          dispatch({ type: "loading", payload: false });
        }
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  if (data.loading) {
    return <div className="col-span-4 flex justify-center py-24 text-2xl">Loading...</div>;
  }

  return (
    <Fragment>
      {products && products.length > 0 ? (
        products.map((item, index) => (
          <Fragment key={index}>
            <div className="relative col-span-1 m-2">
              <img
                onClick={() => history.push(`/products/${item._id}`)}
                className="w-full h-[160px] md:h-[220px] object-cover cursor-pointer rounded-[12px]"
                src={`${apiURL}/uploads/products/${item.pImages[0]}`}
                alt=""
              />
              <div className="mt-2 px-1">
                
                <div className="text-[16px] md:text-[17px] font-bold capitalize leading-tight truncate">
                  {item.pName}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                  PIN Code: {item.pPrice}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {item.pDescription}
                </div>
              </div>
            </div>
          </Fragment>
        ))
      ) : (
        <div className="col-span-4 flex justify-center py-24 text-2xl">
          No Organ found
        </div>
      )}
    </Fragment>
  );
};

export default SingleProduct;