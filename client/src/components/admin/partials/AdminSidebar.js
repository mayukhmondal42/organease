import React, { Fragment, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

const AdminSidebar = (props) => {
  const location = useLocation();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const toggle = () => setIsOpen((prev) => !prev);
    window.addEventListener("toggleAdminSidebar", toggle);
    return () => window.removeEventListener("toggleAdminSidebar", toggle);
  }, []);

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const menuStyle = (path) => `${location.pathname === path ? "border-r-4 border-gray-800 bg-gray-100" : ""} hover:bg-gray-200 cursor-pointer flex flex-col items-center justify-center py-6`;

  return (
    <Fragment>
      
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}
      <div
        style={{ boxShadow: "1px 1px 8px 0.2px #aaaaaa" }}
        id="sidebar"
        className={`${isOpen ? "block fixed z-50 w-64" : "hidden"} lg:block lg:sticky lg:top-0 lg:left-0 lg:h-screen lg:w-2/12 bg-white text-gray-700 h-screen`}
      >
        <div onClick={() => { history.push("/admin/dashboard"); closeSidebarOnMobile(); }} className={menuStyle("/admin/dashboard")}>
          <span style={{ fontSize: "30px" }}>📊</span>
          <span className="font-medium">Dashboard</span>
        </div>
        <hr />
        <div onClick={() => { history.push("/admin/dashboard/categories"); closeSidebarOnMobile(); }} className={menuStyle("/admin/dashboard/categories")}>
          <span style={{ fontSize: "30px" }}>📁</span>
          <span className="font-medium">Categories</span>
        </div>
        <hr />
        <div onClick={() => { history.push("/admin/dashboard/products"); closeSidebarOnMobile(); }} className={menuStyle("/admin/dashboard/products")}>
          <span style={{ fontSize: "30px" }}>🫀</span>
          <span className="font-medium">Organ</span>
        </div>
        <hr />
        <div onClick={() => { history.push("/admin/dashboard/orders"); closeSidebarOnMobile(); }} className={menuStyle("/admin/dashboard/orders")}>
          <span style={{ fontSize: "30px" }}>📋</span>
          <span className="font-medium">Request</span>
        </div>
        <hr />
      </div>
    </Fragment>
  );
};

export default AdminSidebar;