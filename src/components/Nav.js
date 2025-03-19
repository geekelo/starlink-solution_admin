import { useState } from "react";
import { Menu, X } from "lucide-react";
import "../styles/Nav.css";
import logo from '../assets/logo.png'

const AdminMobileNav = ({ onNavClick, activePage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (page) => {
    onNavClick(page);
    setIsOpen(false); // Close menu after clicking
  };

  return (
    <nav className="admin-mobile-nav">
      <div className="nav-header">
      <img className="logo" src={logo} alt="logo" />
        
        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li
          className={activePage === "requests" ? "active" : ""}
          onClick={() => handleNavClick("requests")}
        >
          Requests
        </li>
        <li
          className={activePage === "wallet-history" ? "active" : ""}
          onClick={() => handleNavClick("wallet-history")}
        >
          Wallet History
        </li>
        <li
          className={activePage === "wallet-balance" ? "active" : ""}
          onClick={() => handleNavClick("wallet-balance")}
        >
          Wallet balance
        </li>
        <li
          className={activePage === "wallet-withdrawal" ? "active" : ""}
          onClick={() => handleNavClick("wallet-withdrawal")}
        >
          Wallet Withdrawal
        </li>
        <li
          className={activePage === "kits" ? "active" : ""}
          onClick={() => handleNavClick("kits")}
        >
          Kits
        </li>
        <li
          className={activePage === "users" ? "active" : ""}
          onClick={() => handleNavClick("users")}
        >
          Users
        </li>
        <li
          className={activePage === "manage-funds" ? "active" : ""}
          onClick={() => handleNavClick("manage-funds")}
        >
          Manage Funding
        </li>
      </ul>
    </nav>
  );
};

export default AdminMobileNav;
