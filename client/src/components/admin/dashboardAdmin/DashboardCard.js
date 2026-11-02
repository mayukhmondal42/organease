import React, { Fragment, useContext, useEffect } from "react";
import { DashboardContext } from "./";
import { GetAllData } from "./Action";

const DashboardCard = (props) => {
  const { data, dispatch } = useContext(DashboardContext);

  useEffect(() => {
    GetAllData(dispatch);
  }, []);

  const cards = [
    {
      title: "Centres Enrolled",
      value: data ? data.totalData.Users : 0,
      bg: "bg-indigo-100 text-indigo-600",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
    },
    {
      title: "Requests",
      value: data ? data.totalData.Orders : 0,
      bg: "bg-red-100 text-red-600",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
    },
    {
      title: "Organs",
      value: data ? data.totalData.Products : 0,
      bg: "bg-green-100 text-green-600",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20s-8-4.5-8-8c0-2.757 5.373-6.918 8-9 2.627 2.082 8 6.243 8 9 0 3.5-8 8-8 8z" />,
    },
    {
      title: "Categories",
      value: data ? data.totalData.Categories : 0,
      bg: "bg-orange-100 text-orange-600",
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />,
    },
  ];

  return (
    <Fragment>
      <div className="m-4 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {cards.map((card, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
            <div className={`w-11 h-11 ${card.bg} rounded-xl flex items-center justify-center mb-3`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">{card.icon}</svg>
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-900">{card.value}</div>
            <div className="text-sm font-medium text-gray-500 mt-0.5">{card.title}</div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default DashboardCard;