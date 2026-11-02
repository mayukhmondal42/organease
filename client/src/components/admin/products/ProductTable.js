import React, { Fragment, useContext, useEffect, useState } from "react";
import { getAllProduct, deleteProduct } from "./FetchApi";
import moment from "moment";
import { ProductContext } from "./index";

const apiURL = process.env.REACT_APP_API_URL;

const AllProduct = (props) => {
  const { data, dispatch } = useContext(ProductContext);
  const { products } = data;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await getAllProduct();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        dispatch({
          type: "fetchProductsAndChangeState",
          payload: responseData.Products,
        });
        setLoading(false);
      }
    }, 1000);
  };

  const deleteProductReq = async (pId) => {
    let deleteC = await deleteProduct(pId);
    if (deleteC.error) {
      console.log(deleteC.error);
    } else if (deleteC.success) {
      console.log(deleteC.success);
      fetchData();
    }
  };

  const editProduct = (pId, product, type) => {
    if (type) {
      dispatch({
        type: "editProductModalOpen",
        product: { ...product, pId: pId },
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <svg
          className="w-12 h-12 animate-spin text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="col-span-1 w-full max-w-full space-y-4">
        <div className="text-sm text-gray-600 px-1">
          Total {products && products.length} organ found
        </div>
        {products && products.length > 0 ? (
          products.map((item, key) => {
            return (
              <ProductTable
                product={item}
                editProduct={(pId, product, type) =>
                  editProduct(pId, product, type)
                }
                deleteProduct={(pId) => deleteProductReq(pId)}
                key={key}
              />
            );
          })
        ) : (
          <div className="text-xl text-center font-semibold py-8 bg-white shadow-lg">
            No organ found
          </div>
        )}
      </div>
    </Fragment>
  );
};


const ProductTable = ({ product, deleteProduct, editProduct }) => {
  const createdAt = new Date(product.createdAt);
  const expirationDate = moment(createdAt).add(product.pName, 'hours');
  const expirationTimeString = moment(expirationDate).format('LLL');
  const currentTime = moment();
  if (expirationDate.isBefore(currentTime)) {
    console.log('Organ Expired');
    product.pStatus = "Disabled";
  } else {
    const expirationTimeString2 = moment(expirationDate).format('YYYY-MM-DD HH:mm:ss');
    console.log(`Your order will expire on ${expirationTimeString2}.`);
  }

  return (
    <Fragment>
      <div className="bg-white shadow-lg p-4 flex gap-4 w-full max-w-full overflow-hidden">
        
        <img
          className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg shrink-0"
          src={`${apiURL}/uploads/products/${product.pImages?.[0]}`}
          alt="pic"
        />
        
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-base sm:text-lg truncate">
            {product.pCategory?.cName || "No Category"}
          </div>
          <div className="text-sm text-gray-500 truncate">
            {product.pDescription?.slice(0, 15)}... - {product.pDescription}
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-1">
            {product.pStatus === "Active" ? (
              <span className="bg-green-200 rounded-full text-center text-xs px-2 py-0.5 font-semibold">
                {product.pStatus}
              </span>
            ) : (
              <span className="bg-red-200 rounded-full text-center text-xs px-2 py-0.5 font-semibold">
                {product.pStatus}
              </span>
            )}
            <span className="text-xs text-gray-500">
              Available: {product.pQuantity} • PIN: {product.pOffer}
            </span>
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Expiration Deadline: {expirationTimeString}
          </div>
          <div className="text-xs text-gray-400">
            Created: {moment(product.createdAt).format("lll")} | Updated: {moment(product.updatedAt).format("lll")}
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-3 shrink-0">
          <span
            onClick={(e) => editProduct(product._id, product, true)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2"
          >
            <svg
              className="w-6 h-6 fill-current text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span
            onClick={(e) => deleteProduct(product._id)}
            className="cursor-pointer hover:bg-gray-200 rounded-lg p-2"
          >
            <svg
              className="w-6 h-6 fill-current text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>
      </div>
    </Fragment>
  );
};

export default AllProduct;