import { useState } from "react";
import "../styles/Admin.css";
import AdminMobileNav from "./Nav";
import Requests from "./Request";
import WalletPage from "./Wallet";

const AdminPanel = () => {
  const [activePage, setActivePage] = useState("requests"); // Default to Requests

  // Function to handle navigation click
  const handleNavClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className="admin-container">
      {/* Top Navigation */}
      <nav className="admin-top-nav">
        <h2>Admin Panel</h2>
      </nav>

      {/* Mobile Navigation */}
      <AdminMobileNav onNavClick={handleNavClick} activePage={activePage} />

      {/* Content Section */}
      <div className="admin-content">
        {activePage === "requests" && <Requests />}
        {activePage === "wallet-history" && <WalletPage />}
        {activePage === "kits" && <p>Kits Section</p>}
        {activePage === "users" && <p>Users Section</p>}
      </div>
    </div>
  );
};

export default AdminPanel;
