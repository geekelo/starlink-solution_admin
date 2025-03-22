import { useState } from "react";
import "../styles/Admin.css";
import AdminMobileNav from "./nav/Nav";
import Requests from "./request/Request";
import Wallet from "./wallet/Wallet";
import WalletPage from "./wallet/WalletPage";
import KitPage from "./kits/Kit";
import Users from "./user/User";
import WithdrawalPage from "./wallet/Withdrawal";
import FundingPage from "./funding/ManageFunding";
import RenewalPage from "./renewal/ManageRenewal";

const AdminPanel = () => {
  const [activePage, setActivePage] = useState("requests"); 

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
        {activePage === "manage-renewal" && <RenewalPage />}
      </div>
    </div>
  );
};

export default AdminPanel;
