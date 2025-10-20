import { useState } from "react";
import { Sidebar } from "../organisms/sidebar.org.jsx";
import { Footer } from "../organisms/footer.org.jsx";

export function DashboardLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-base-100">
      {/* Sidebar */}
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />

      {/* Main Content Area */}
      <div
        className={`
        transition-all duration-300 ease-in-out min-h-screen flex flex-col
        ${sidebarCollapsed ? "ml-16" : "ml-64"}
      `}
      >
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
