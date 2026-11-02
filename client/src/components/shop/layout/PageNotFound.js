import React from "react";
import { useHistory } from "react-router-dom";
import Layout from "./index";

const PageNotFoundComponent = (props) => {
  const history = useHistory();
  return (
    <div className="flex flex-col items-center justify-center my-20 md:my-28 px-4 text-center">
      <div className="text-[100px] md:text-[150px] leading-none font-black text-gray-100 select-none">404</div>
      <div className="-mt-8 md:-mt-12">
        <p className="text-5xl">😔</p>
        <h1 className="text-2xl md:text-4xl font-bold tracking-tight mt-4">Page Not Found</h1>
        <p className="text-gray-500 mt-2 max-w-md mx-auto text-sm md:text-base">Sorry Mayukh, the page you're looking for doesn't exist. It may have been moved or deleted.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <button onClick={()=>history.push("/")} className="bg-black text-white px-8 py-3.5 rounded-full font-bold hover:bg-gray-800">🏠 Go Home</button>
          <button onClick={()=>history.goBack()} className="bg-white border px-8 py-3.5 rounded-full font-bold hover:bg-gray-50">← Go Back</button>
        </div>
        <p className="text-xs text-gray-400 mt-6">OrganEase • Organ Donation & Request • Need help? 81013 08803</p>
      </div>
    </div>
  );
};

const PageNotFound = (props) => {
  return <Layout children={<PageNotFoundComponent />} />;
};

export default PageNotFound;