import React, { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { wishListProducts } from "./FetchApi";
const apiURL = process.env.REACT_APP_API_URL;

const Product = () => {
  const history = useHistory();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    let responseData = await wishListProducts();
    setTimeout(() => {
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
        setLoading(false);
      }
    }, 50);
  };

  const removeFromWishList = (id) => {
    let list = localStorage.getItem("wishList")
      ? JSON.parse(localStorage.getItem("wishList"))
      : [];
    if (list.length > 0) {
      if (list.includes(id) === true) {
        list.splice(list.indexOf(id), 1);
        localStorage.setItem("wishList", JSON.stringify(list));
        fetchData();
      }
    }
  };
  if (loading) {
    return (
      <div className="my-32 text-center">
        <div className="w-10 h-10 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-gray-500 text-sm">Loading wishlist...</p>
      </div>
    );
  }
  return (
    <Fragment>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-3 md:gap-0">
        {products.length > 0 ? (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="relative bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden md:flex md:items-center md:justify-between md:p-4 md:mb-4 p-3"
              >
                <div className="md:w-1/2 md:flex md:items-center">
                  <div className="relative overflow-hidden rounded-xl md:w-20 md:h-20 w-full aspect-square">
                    <img
                      onClick={(e) => history.push(`/products/${product._id}`)}
                      className="cursor-pointer w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                      src={`${apiURL}/uploads/products/${product.pImages[0]}`}
                      alt="wishListproduct"
                    />
                  </div>
                  <div className="mt-3 md:mt-0 md:ml-4">
                    <div className="font-semibold text-gray-900 truncate">{product.pName}</div>
                    <div className="text-xs text-gray-400 mt-0.5 md:hidden">${product.pPrice}.00</div>
                  </div>
                </div>
                <div className="md:w-1/2 md:flex md:items-center md:justify-around mt-3 md:mt-0">
                  <div className="hidden md:block font-bold text-gray-900">
                    ${product.pPrice}.00
                  </div>
                  {product.pQuantity > 0 ? (
                    <div className="text-xs font-semibold bg-green-100 text-green-700 px-2.5 py-1 rounded-full inline-block">Available</div>
                  ) : (
                    <div className="text-xs font-semibold bg-red-100 text-red-600 px-2.5 py-1 rounded-full inline-block">Unavailable</div>
                  )}

                  <div
                    style={{ background: "#303031" }}
                    onClick={(e) => history.push(`/products/${product._id}`)}
                    className="mt-3 md:mt-0 block md:inline-block px-4 py-2.5 text-white text-xs md:text-sm font-semibold text-center cursor-pointer rounded-xl hover:bg-black transition-all"
                  >
                    View
                  </div>
                </div>
                <button
                  onClick={(e) => removeFromWishList(product._id)}
                  className="absolute top-2 right-2 md:relative md:top-auto md:right-auto md:ml-4 w-8 h-8 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center transition-all"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                </button>
              </div>
            );
          })
        ) : (
          <div className="col-span-2 text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-4xl mb-3">🤍</p>
            <p className="font-semibold text-gray-800">No Organ found in wishList</p>
            <p className="text-sm text-gray-400 mt-1">Add products to your wishlist to see them here</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

const SingleWishProduct = (props) => {
  return (
    <Fragment>
      <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24 pb-10">
        <div className="text-2xl font-bold tracking-tight mx-1 mb-6 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-yellow-500 rounded-full"></span> Wishlist
        </div>
        <Product />
      </section>
    </Fragment>
  );
};

export default SingleWishProduct;