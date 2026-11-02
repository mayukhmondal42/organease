import React, { Fragment, useContext, useEffect } from "react";
import moment from "moment";
import { OrderContext } from "./index";
import { fetchData, editOrderReq, deleteOrderReq } from "./Actions";

const apiURL = process.env.REACT_APP_API_URL;

const statusStyle = {
  "Not processed": "bg-red-100 text-red-700",
  "Processing": "bg-yellow-100 text-yellow-700",
  "Shipped": "bg-blue-100 text-blue-700",
  "Delivered": "bg-green-100 text-green-700",
  "Cancelled": "bg-red-100 text-red-700",
  // Purono status er jonno backup - jate ager order gulo teo color ase
  "Under Scrutiny": "bg-yellow-100 text-yellow-700",
  "Request Accepted": "bg-blue-100 text-blue-700",
  "Expired": "bg-green-100 text-green-700",
};

const AllCategory = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const { orders, loading } = data;

  useEffect(() => { fetchData(dispatch); }, []);

  if (loading) {
    return <div className="flex items-center justify-center p-12"><div className="w-10 h-10 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <Fragment>
      {/* DESKTOP TABLE - tomar ager code 100% same, sudhu hidden md:block add */}
      <div className="hidden md:block overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm w-full max-w-full">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3 font-semibold">PIN Code</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Organ ID</th>
                <th className="px-5 py-3 font-semibold">Hospital</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">Address</th>
                <th className="px-5 py-3 font-semibold">Created at</th>
                <th className="px-5 py-3 font-semibold">Updated at</th>
                <th className="px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders && orders.length > 0 ? (
                orders.map((item, i) => <CategoryTable key={i} order={item} editOrder={(oId, type, status) => editOrderReq(oId, type, status, dispatch)} />)
              ) : (
                <tr><td colSpan="10" className="text-center py-10 text-gray-400 font-medium">No Requests found</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 text-xs text-gray-500 border-t border-gray-100">Total {orders && orders.length} Requests found</div>
      </div>

      {/* MOBILE CARD - sudhu mobile e dekhabe, same data */}
      <div className="md:hidden w-full space-y-3">
        <div className="text-xs text-gray-500 px-1">Total {orders && orders.length} Requests found</div>
        {orders && orders.length > 0 ? (
          orders.map((item, i) => <MobileCard key={i} order={item} editOrder={(oId, type, status) => editOrderReq(oId, type, status, dispatch)} />)
        ) : (
          <div className="text-center py-10 text-gray-400 font-medium bg-white rounded-2xl">No Requests found</div>
        )}
      </div>
    </Fragment>
  );
};

const CategoryTable = ({ order, editOrder }) => {
  const { dispatch } = useContext(OrderContext);
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-5 py-3">
        {order.allProduct.map((product, i) => (
          <span className="flex items-center gap-2 mb-1" key={i}>
            <img className="w-8 h-8 rounded-lg object-cover" src={`${apiURL}/uploads/products/${product.id.pImages[0]}`} alt="productImage" />
            <span className="font-medium">{product.id.pPrice}</span>
          </span>
        ))}
      </td>
      <td className="px-5 py-3"><span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${statusStyle[order.status] || "bg-gray-100 text-gray-600"}`}>{order.status}</span></td>
      <td className="px-5 py-3 text-gray-600">{order.transactionId}</td>
      <td className="px-5 py-3 font-medium">{order.user.name}</td>
      <td className="px-5 py-3 text-gray-600">{order.user.email}</td>
      <td className="px-5 py-3 whitespace-nowrap">{order.phone}</td>
      <td className="px-5 py-3 text-gray-600 max-w-[180px] truncate">{order.address}</td>
      <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{moment(order.createdAt).format("lll")}</td>
      <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{moment(order.updatedAt).format("lll")}</td>
      <td className="px-5 py-3">
        <div className="flex gap-1">
          <button onClick={(e) => editOrder(order._id, true, order.status)} className="p-2 hover:bg-green-100 rounded-lg transition-all">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
          </button>
          <button onClick={(e) => deleteOrderReq(order._id, dispatch)} className="p-2 hover:bg-red-100 rounded-lg transition-all">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>
        </div>
      </td>
    </tr>
  );
};

const MobileCard = ({ order, editOrder }) => {
  const { dispatch } = useContext(OrderContext);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 w-full">
      <div className="flex items-start gap-3">
        {order.allProduct.map((product, i) => (
          <div key={i} className="flex items-center gap-3">
            <img className="w-14 h-14 rounded-xl object-cover shrink-0" src={`${apiURL}/uploads/products/${product.id.pImages[0]}`} alt="productImage" />
            <div><div className="font-bold">PIN: {product.id.pPrice}</div><div className="text-xs text-gray-400 truncate">ID: {order.transactionId}</div></div>
          </div>
        ))}
        <span className={`ml-auto shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[order.status] || "bg-gray-100 text-gray-600"}`}>{order.status}</span>
      </div>
      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <div><span className="text-gray-400 text-xs">Hospital: </span><span className="font-medium text-black">{order.user.name}</span></div>
        <div className="truncate">Email: {order.user.email}</div>
        <div>Phone: {order.phone}</div>
        <div>Address: {order.address}</div>
        <div className="text-xs text-gray-400">Created: {moment(order.createdAt).format("lll")}</div>
        <div className="text-xs text-gray-400">Updated: {moment(order.updatedAt).format("lll")}</div>
      </div>
      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
        <button onClick={(e) => editOrder(order._id, true, order.status)} className="flex-1 py-2 bg-green-50 text-green-600 text-sm font-semibold rounded-xl">Edit</button>
        <button onClick={(e) => deleteOrderReq(order._id, dispatch)} className="flex-1 py-2 bg-red-50 text-red-500 text-sm font-semibold rounded-xl">Delete</button>
      </div>
    </div>
  );
};

export default AllCategory;