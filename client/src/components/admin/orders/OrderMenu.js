import React, { Fragment, useState, useContext } from "react";
import { OrderContext } from "./index";
import UpdateOrderModal from "./UpdateOrderModal";
import SearchFilter from "./SearchFilter";
import { filterOrder } from "./Actions";

const filters = [
  { label: "All", value: "All" },
  { label: "Not processed", value: "Not processed" },
  { label: "Under Scrutiny", value: "Under Scrutiny" },
  { label: "Request Accepted", value: "Request Accepted" },
  { label: "Expired Organs", value: "Expired" },
  { label: "Organ Request Cancelled", value: "Cancelled" },
];

const OrderMenu = (props) => {
  const { data, dispatch } = useContext(OrderContext);
  const [dropdown, setDropdown] = useState(false);
  return (
    <Fragment>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div className="relative">
          <button onClick={() => setDropdown(!dropdown)} style={{ background: "#303031" }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white text-sm font-semibold hover:bg-black transition-all">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a1 1 0 00-2 0v7.268a2 2 0 000 3.464V16a1 1 0 102 0v-1.268a2 2 0 000-3.464V4zM11 4a1 1 0 10-2 0v1.268a2 2 0 000 3.464V16a1 1 0 102 0V8.732a2 2 0 000-3.464V4zM16 3a1 1 0 011 1v7.268a2 2 0 010 3.464V16a1 1 0 11-2 0v-1.268a2 2 0 010-3.464V4a1 1 0 011-1z" /></svg>
            Filter
            <svg className={`w-3 h-3 transition-transform ${dropdown ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {dropdown && (
            <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20 py-1">
              {filters.map(f => (
                <button key={f.value} onClick={() => filterOrder(f.value, data, dispatch, dropdown, setDropdown)} className="w-full text-left px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">{f.label}</button>
              ))}
            </div>
          )}
        </div>
        <SearchFilter />
        <UpdateOrderModal />
      </div>
    </Fragment>
  );
};

export default OrderMenu;