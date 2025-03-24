import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import "../../styles/Nav.css";
import logo from "../../assets/logo.png";

const AdminMobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get current route

  return (
    <nav className="admin-mobile-nav">
      <div className="nav-header">
        <img className="logo" src={logo} alt="logo" />

        <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li className={location.pathname === "/requests" ? "active" : ""}>
          <Link to="/requests" onClick={() => setIsOpen(false)}>Requests</Link>
        </li>
        <li className={location.pathname === "/wallet-history" ? "active" : ""}>
          <Link to="/wallet-history" onClick={() => setIsOpen(false)}>Wallet History</Link>
        </li>
        <li className={location.pathname === "/wallet-withdrawal" ? "active" : ""}>
          <Link to="/wallet-withdrawal" onClick={() => setIsOpen(false)}>Wallet Withdrawal</Link>
        </li>
        <li className={location.pathname === "/kits" ? "active" : ""}>
          <Link to="/kits" onClick={() => setIsOpen(false)}>Kits</Link>
        </li>
        <li className={location.pathname === "/users" ? "active" : ""}>
          <Link to="/users" onClick={() => setIsOpen(false)}>Users</Link>
        </li>
        <li className={location.pathname === "/manage-funds" ? "active" : ""}>
          <Link to="/manage-funds" onClick={() => setIsOpen(false)}>Manage Funding</Link>
        </li>
        <li className={location.pathname === "/manage-renewal" ? "active" : ""}>
          <Link to="/manage-renewal" onClick={() => setIsOpen(false)}>Manage Renewals</Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminMobileNav;
