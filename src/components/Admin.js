import { useState } from "react";
import "../styles/Admin.css";
import AdminMobileNav from "./Nav";
import Requests from "./Request";
import Wallet from "./Wallet";
import WalletPage from "./WalletPage";
import KitPage from "./Kit";
import Users from "./User";
import WithdrawalPage from "./Withdrawal";
import FundingPage from "./ManageFunding";

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
        {activePage === "wallet-history" && <Wallet />}
        {activePage === "wallet-balance" && <WalletPage />}
        {activePage === "kits" && <KitPage />}
        {activePage === "users" && <Users />}
        {activePage === "wallet-withdrawal" && <WithdrawalPage />}
        {activePage === "manage-funds" && <FundingPage />}
      </div>
    </div>
  );
};

export default AdminPanel;
