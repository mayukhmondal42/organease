import React, { Fragment, useContext, useState, useEffect } from "react";
import { OrderContext } from "./index";
import { getAllOrder, editCategory } from "./FetchApi";

// Ekhon label ar value dutoi same - kono confusion nei
const statusOptions = [
  { label: "Not Processed", value: "Not processed" },
  { label: "Under Scrutiny", value: "Processing" },
  { label: "Shipped", value: "Shipped" },
  { label: "Delivered", value: "Delivered" },
  { label: "Cancelled", value: "Cancelled" },
];

const UpdateOrderModal = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const [status, setStatus] = useState("");
  const [oId, setOid] = useState("");

  useEffect(() => {
    setOid(data.updateOrderModal.oId);
    setStatus(data.updateOrderModal.status);
  }, [data.updateOrderModal.modal]);

  const fetchData = async () => {
    let responseData = await getAllOrder();
    if (responseData.Orders) dispatch({ type: "fetchOrderAndChangeState", payload: responseData.Orders });
  };

  const submitForm = async () => {
    dispatch({ type: "loading", payload: true });
    let responseData = await editCategory(oId, status);
    if (responseData.error) {
      dispatch({ type: "loading", payload: false });
    } else if (responseData.success) {
      dispatch({ type: "updateOrderModalClose" });
      fetchData();
      dispatch({ type: "loading", payload: false });
    }
  };

  if (!data.updateOrderModal.modal) return null;

  return (
    <Fragment>
      <div onClick={() => dispatch({ type: "updateOrderModalClose" })} className="fixed inset-0 z-30 bg-black/50" />
      <div className="fixed inset-0 z-30 flex items-center justify-center p-4">
        <div className="bg-white w-full md:w-3/6 max-w-md rounded-2xl shadow-xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Update Order</h2>
              <p className="text-xs text-gray-400 mt-0.5">Change request status</p>
            </div>
            <button onClick={() => dispatch({ type: "updateOrderModalClose" })} className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Order Status</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black" id="status">
                {statusOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            <button style={{ background: "#303031" }} onClick={() => submitForm()} className="w-full text-white rounded-xl text-sm font-semibold py-3 hover:bg-black transition-all">Update Order</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateOrderModal;