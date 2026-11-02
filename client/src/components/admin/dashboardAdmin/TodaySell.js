import React, { Fragment, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { DashboardContext } from "./";
import { todayAllOrders } from "./Action";

const apiURL = process.env.REACT_APP_API_URL;

const statusStyle = {
  "Not processed": "bg-red-100 text-red-700",
  "Under Scutiny": "bg-yellow-100 text-yellow-700",
  "Request Accepted": "bg-blue-100 text-blue-700",
  "Expired": "bg-green-100 text-green-700",
  "Cancelled": "bg-red-100 text-red-700",
};

const SellTable = () => {
  const history = useHistory();
  const { data, dispatch } = useContext(DashboardContext);

  useEffect(() => {
    todayAllOrders(dispatch);
  }, []);

  const ordersList = () => {
    let newList = [];
    if (data.totalOrders.Orders !== undefined) {
      data.totalOrders.Orders.forEach(function (elem) {
        if (moment(elem.createdAt).format("LL") === moment().format("LL")) {
          newList = [...newList, elem];
        }
      });
    }
    return newList;
  };

  return (
    <Fragment>
      <div className="overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Today's Requests <span className="ml-1 bg-gray-900 text-white text-xs px-2 py-0.5 rounded-full">{data.totalOrders.Orders !== undefined ? ordersList().length : 0}</span></h2>
            <p className="text-xs text-gray-400 mt-0.5">Requests received today</p>
          </div>
          <button onClick={(e) => history.push("/admin/dashboard/orders")} style={{ background: "#303031" }} className="px-4 py-2 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all">View All</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
                <th className="px-5 py-3 font-semibold">PIN Code</th>
                <th className="px-5 py-3 font-semibold">Image</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Request Address</th>
                <th className="px-5 py-3 font-semibold">Requested at</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.totalOrders.Orders !== undefined && ordersList().length > 0 ? (
                ordersList().map((item, key) => <TodayOrderTable order={item} key={key} />)
              ) : (
                <tr><td colSpan="5" className="text-center py-10 text-gray-400 font-medium">No Requests found today</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 text-xs text-gray-500 border-t border-gray-100">
          Total {data.totalOrders.Orders !== undefined ? ordersList().length : 0} Requests found
        </div>
      </div>
    </Fragment>
  );
};

const TodayOrderTable = ({ order }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-5 py-3 font-medium">
        {order.allProduct.map((item, index) => <div key={index}>{item.id.pPrice}</div>)}
      </td>
      <td className="px-5 py-3">
        <div className="flex -space-x-2">
          {order.allProduct.map((item, index) => (
            <img key={index} className="w-10 h-10 rounded-lg object-cover border-2 border-white shadow-sm" src={`${apiURL}/uploads/products/${item.id.pImages[0]}`} alt="Pic" />
          ))}
        </div>
      </td>
      <td className="px-5 py-3">
        <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${statusStyle[order.status] || "bg-gray-100 text-gray-600"}`}>{order.status}</span>
      </td>
      <td className="px-5 py-3 text-gray-600 max-w-[200px] truncate">{order.address}</td>
      <td className="px-5 py-3 text-gray-500 whitespace-nowrap">{moment(order.createdAt).format("lll")}</td>
    </tr>
  );
};

const TodaySell = (props) => {
  return <div className="m-4"><SellTable /></div>;
};

export default TodaySell;