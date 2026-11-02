import React, { Fragment, useEffect, useContext } from "react";
import moment from "moment";
import { fetchOrderByUser } from "./Action";
import Layout, { DashboardUserContext } from "./Layout";

const apiURL = process.env.REACT_APP_API_URL;

const getStatusStyle = (status) => {
  if (status === "Not processed") return "bg-red-50 text-red-600 border-red-100";
  if (status === "Under Scrutiny") return "bg-yellow-50 text-yellow-700 border-yellow-100";
  if (status === "Request Accepted") return "bg-blue-50 text-blue-600 border-blue-100";
  if (status === "Expired") return "bg-green-50 text-green-600 border-green-100";
  return "bg-red-50 text-red-600 border-red-100";
};

const OrdersComponent = () => {
  const { data, dispatch } = useContext(DashboardUserContext);
  const { OrderByUser: orders } = data;

  useEffect(() => { fetchOrderByUser(dispatch); }, []);

  if (data.loading) {
    return <div className="w-full flex items-center justify-center py-16"><div className="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div></div>;
  }

  return (
    <Fragment>
      <div className="flex flex-col w-full my-4 md:my-0 md:w-9/12 md:px-8">
        <div className="bg-white shadow-sm border rounded-[24px] overflow-hidden">
          <div className="flex justify-between items-center py-5 px-6 border-b">
            <div><h3 className="text-lg font-bold">My Requests</h3><p className="text-xs text-gray-500">OrganEase - Organ Donation & Request</p></div>
            <span className="bg-black text-white text-xs font-bold px-3 py-1.5 rounded-full">{orders ? orders.length : 0} Orders</span>
          </div>
          <div className="overflow-auto hidden md:block">
            <table className="w-full text-sm">
              <thead><tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                <th className="px-4 py-3 text-left">Organ</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Amount</th><th className="px-4 py-3">Phone</th><th className="px-4 py-3">Created</th>
              </tr></thead>
              <tbody>
                {orders && orders.length > 0 ? orders.map((order, i) => (
                  <tr key={i} className="border-t hover:bg-gray-50">
                    <td className="p-4"><div className="flex flex-col gap-2">{order.allProduct.map((product, j) => (
                      <span key={j} className="flex items-center gap-2"><img className="w-9 h-9 rounded-lg object-cover" src={`${apiURL}/uploads/products/${product.id.pImages[0]}`} alt="" /><span className="font-medium">{product.id.pName}</span></span>
                    ))}</div></td>
                    <td className="p-4 text-center"><span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${getStatusStyle(order.status)}`}>{order.status}</span></td>
                    <td className="p-4 text-center font-bold">₹{order.amount}</td>
                    <td className="p-4 text-center">{order.phone}</td>
                    <td className="p-4 text-center text-xs text-gray-500">{moment(order.createdAt).format("ll")}</td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" className="text-center py-12"><p className="text-4xl">📦</p><p className="font-bold mt-2">No order found</p><p className="text-sm text-gray-500">You haven't requested any organ yet.</p></td></tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="md:hidden p-4 space-y-3">
            {orders && orders.length > 0 ? orders.map((order, i) => (
              <div key={i} className="border rounded-2xl p-4 bg-gray-50">
                <div className="flex justify-between"><b>{order.allProduct[0]?.id?.pName}</b><span className={`text-xs font-bold px-2 py-1 rounded-full border ${getStatusStyle(order.status)}`}>{order.status}</span></div>
                <p className="text-sm text-gray-500 mt-2">Amount: ₹{order.amount} • {moment(order.createdAt).format("ll")}</p>
                <p className="text-xs text-gray-400 break-all mt-1">Txn: {order.transactionId}</p>
              </div>
            )) : <p className="text-center py-8 font-bold">No order found</p>}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const UserOrders = () => {
  return <Fragment><Layout children={<OrdersComponent />} /></Fragment>;
};

export default UserOrders;