import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../index";
import { cartListProduct } from "./FetchApi";
import { isAuthenticate } from "../auth/fetchApi";
import { cartList } from "../productDetails/Mixins";
import { subTotal, quantity, totalCost } from "./Mixins";

const apiURL = process.env.REACT_APP_API_URL;

const CartModal = () => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);
  const products = data.cartProduct;
  const cartModalOpen = () => dispatch({ type: "cartModalToggle", payload: !data.cartModal });

  useEffect(() => { fetchData(); }, []);
  const fetchData = async () => {
    try {
      let responseData = await cartListProduct();
      if (responseData?.Products) {
        dispatch({ type: "cartProduct", payload: responseData.Products });
        dispatch({ type: "cartTotalCost", payload: totalCost() });
      }
    } catch (e) { console.log(e); }
  };

  const removeCartProduct = (id) => {
    let cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    dispatch({ type: "inCart", payload: cartList() });
    dispatch({ type: "cartTotalCost", payload: totalCost() });
    if (cart.length === 0) dispatch({ type: "cartProduct", payload: null });
    else fetchData();
  };

  return (
    <Fragment>
      <div className={`${!data.cartModal ? "hidden" : ""} fixed top-0 z-30 w-full h-full bg-black/50 backdrop-blur-sm`} onClick={cartModalOpen} />
      <section className={`${!data.cartModal ? "hidden" : ""} fixed z-40 inset-0 flex items-start justify-end`}>
        <div className="w-full md:w-5/12 lg:w-4/12 h-full bg-white flex flex-col justify-between shadow-2xl">
          <div className="overflow-y-auto">
            <div className="border-b flex justify-between items-center sticky top-0 bg-white">
              <div className="p-5 font-bold text-lg">🫀 Organs List <span className="text-xs font-normal text-gray-400">OrganEase • Mayukh Mondal</span></div>
              <button onClick={cartModalOpen} className="p-5 text-xl">✕</button>
            </div>
            <div className="p-4 space-y-3">
              {products && products.length !== 0 ? products.map((item, index) => (
                <div key={index} className="flex gap-3 bg-gray-50 border rounded-2xl p-3 relative">
                  <img className="w-16 h-16 rounded-xl object-cover" src={`${apiURL}/uploads/products/${item.pImages[0]}`} alt={item.pName} />
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm truncate">{item.pName || item.pDescription}</div>
                    <div className="text-xs text-gray-500">Qty: {quantity(item._id)} • PIN: {subTotal(item._id, item.pPrice)}</div>
                  </div>
                  <button onClick={()=>removeCartProduct(item._id)} className="absolute top-2 right-2 w-6 h-6 bg-red-50 text-red-500 rounded-full text-xs">✕</button>
                </div>
              )) : <div className="text-center py-16"><p className="text-4xl">🫀</p><p className="text-gray-500 mt-2">No Organ requested</p></div>}
            </div>
          </div>
          <div className="p-4 space-y-3 border-t">
            <div className="flex justify-between font-bold"><span>Total Organs</span><span>{data.cartTotalCost || 0}</span></div>
            {data.cartTotalCost ? (
              isAuthenticate() ? <div onClick={()=>{history.push("/checkout"); cartModalOpen();}} className="px-4 py-3.5 bg-black text-white text-center cursor-pointer rounded-full font-bold">Proceed →</div>
              : <div onClick={()=>{history.push("/"); cartModalOpen(); dispatch({type:"loginSignupError", payload:!data.loginSignupError}); dispatch({type:"loginSignupModalToggle", payload:!data.loginSignupModal});}} className="px-4 py-3.5 bg-black text-white text-center cursor-pointer rounded-full font-bold">Login to Proceed</div>
            ) : <div className="px-4 py-3.5 bg-gray-200 text-gray-400 text-center rounded-full cursor-not-allowed font-bold">Proceed</div>}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default CartModal;