import React, { Fragment, useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LayoutContext } from "../layout";
import { subTotal, quantity, totalCost } from "../partials/Mixins";
import { cartListProduct } from "../partials/FetchApi";
import { getBrainTreeToken, getPaymentProcess } from "./FetchApi";
import { fetchData, fetchbrainTree, pay } from "./Action";
import DropIn from "braintree-web-drop-in-react";

const apiURL = process.env.REACT_APP_API_URL;

export const CheckoutComponent = (props) => {
  const history = useHistory();
  const { data, dispatch } = useContext(LayoutContext);
  const [state, setState] = useState({ address: "", phone: "", error: false, success: false, clientToken: null, instance: {} });

  useEffect(() => { fetchData(cartListProduct, dispatch); fetchbrainTree(getBrainTreeToken, setState); }, []);

  if (data.loading) return <div className="flex flex-col items-center justify-center h-screen gap-3"><div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div><p className="text-sm text-gray-500">Please wait...</p></div>;

  return (
    <Fragment>
      <section className="max-w-6xl mx-auto px-4 mt-24 md:mt-32">
        <h2 className="text-2xl font-bold">Checkout • Organ Request</h2>
        <p className="text-sm text-gray-500">OrganEase - Mayukh Mondal • 81013 08803</p>
        <div className="flex flex-col md:flex-row md:space-x-6 mt-6">
          <div className="md:w-1/2"><CheckoutProducts products={data.cartProduct} /></div>
          <div className="w-full md:w-1/2">
            {state.clientToken ? (
              <div className="bg-white border rounded-[24px] p-6 shadow-sm">
                {state.error && <div className="bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-xl mb-4 text-sm">{state.error}</div>}
                <div className="flex flex-col space-y-1.5 mb-4">
                  <label className="text-sm font-medium text-gray-600">Hospital Address for Delivery</label>
                  <input value={state.address} onChange={(e)=>setState({...state, address:e.target.value, error:false})} type="text" className="border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none px-4 py-3.5 w-full rounded-xl" placeholder="Hospital Address..." />
                </div>
                <div className="flex flex-col space-y-1.5 mb-4">
                  <label className="text-sm font-medium text-gray-600">Phone</label>
                  <input value={state.phone} onChange={(e)=>setState({...state, phone:e.target.value, error:false})} type="number" className="border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black outline-none px-4 py-3.5 w-full rounded-xl" placeholder="+91 81013 08803" />
                </div>
                <DropIn options={{ authorization: state.clientToken }} onInstance={(instance)=>(state.instance=instance)} />
                <div className="mt-4 bg-gray-50 border rounded-xl p-4 flex justify-between font-bold"><span>Total</span><span>₹ {totalCost()}</span></div>
                <div onClick={()=>pay(data,dispatch,state,setState,getPaymentProcess,totalCost,history)} className="w-full px-4 py-4 mt-4 text-center text-white font-bold cursor-pointer bg-black rounded-full hover:bg-gray-800">Request Now →</div>
              </div>
            ) : <div className="flex items-center justify-center py-16"><div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div></div>}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const CheckoutProducts = ({ products }) => {
  const history = useHistory();
  return (
    <Fragment>
      <div className="space-y-3">
        {products && products.length > 0 ? products.map((product, index) => (
          <div key={index} className="bg-white border rounded-2xl p-3 flex items-center gap-4">
            <img onClick={()=>history.push(`/products/${product._id}`)} className="cursor-pointer h-20 w-20 rounded-xl object-cover" src={`${apiURL}/uploads/products/${product.pImages[0]}`} alt={product.pName} />
            <div className="flex-1 min-w-0">
              <div className="font-bold truncate">{product.pName || product.pDescription}</div>
              <div className="text-xs text-gray-500 truncate">{product.pDescription}</div>
              <div className="text-sm mt-1">Units: <b>{quantity(product._id)}</b> • PIN: <b>{subTotal(product._id, product.pPrice)}</b></div>
            </div>
          </div>
        )) : <div className="bg-white border rounded-2xl p-8 text-center text-gray-500">No Request found</div>}
      </div>
    </Fragment>
  );
};

export default CheckoutProducts;