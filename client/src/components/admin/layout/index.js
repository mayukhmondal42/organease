import React, { Fragment, useState } from "react";
import AdminNavber from "../partials/AdminNavber";
import AdminSidebar from "../partials/AdminSidebar";
import AdminFooter from "../partials/AdminFooter";

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <Fragment>
      <AdminNavber onToggleSidebar={toggleSidebar} />
      <section className="flex bg-gray-100 min-h-screen relative">
        {isSidebarOpen && (
          <div onClick={toggleSidebar} className="md:hidden fixed inset-0 bg-black/50 z-40" />
        )}
        <AdminSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="w-full flex-1 min-w-0">
          {children}
        </div>
      </section>
      <AdminFooter />
    </Fragment>
  );
};

export default AdminLayout;