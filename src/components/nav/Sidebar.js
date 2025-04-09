// "use client"

import { ChevronRight, CreditCard, DollarSign, FileText, History, Home, Package, RefreshCw, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaFileInvoice } from "react-icons/fa";




export const AdminSidebar = ({ expanded, onMouseEnter, onMouseLeave }) => {
  const location = useLocation();
  
  // Menu items with icons and paths
  const menuItems = [
    { icon: <Home size={20} />, name: 'Dashboard', path: '/dashboard' },
    { icon: <FileText size={20} />, name: 'Requests', path: '/requests' },
    { icon: <CreditCard size={20} />, name: 'Wallet History', path: '/wallet-history' },
    { icon: <Package size={20} />, name: 'Kits', path: '/kits' },
    { icon: <Users size={20} />, name: 'Users', path: '/users' },
    { icon: <FaFileInvoice size={20} />, name: 'Invoices', path: '/invoices' },
    { icon: <DollarSign size={20} />, name: 'Manage Funding', path: '/manage-funds' },
    { icon: <RefreshCw size={20} />, name: 'Manage Renewals', path: '/monthly-renewals' },
  ];
  
  return (
    <aside 
      className={`admin-sidebar ${expanded ? 'expanded' : 'collapsed'}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="sidebar-header">
        {expanded ? (
          <img className="logo-full" src={logo} alt="Logo" />
        ) : (
          <div className="logo-icon">
            <img className="logo-small" src={logo} alt="Logo" />
          </div>
        )}
      </div>
      
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li 
            key={item.path} 
            className={`sidebar-menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <Link to={item.path}>
              <span className="menu-icon">{item.icon}</span>
              {expanded && (
                <span className="menu-text">{item.name}</span>
              )}
              {expanded && location.pathname === item.path && (
                <span className="active-indicator">
                  <ChevronRight size={16} />
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

