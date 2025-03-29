// "use client"

import { ChevronRight, CreditCard, DollarSign, FileText, History, Home, Package, RefreshCw, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
// import { useState } from "react"
// import { Link, useLocation } from "react-router-dom"
// import { Menu, X, FileText, Wallet, History, DollarSign } from "lucide-react"
// import "../../styles/Sidebar.css"
// import Wallet from "./Wallet"
// import WalletPage from "./WalletPage"

// const Sidebar = () => {
//   const [isOpen, setIsOpen] = useState(false)
//   const location = useLocation()

//   const toggleSidebar = () => {
//     setIsOpen(!isOpen)
//   }

//   const closeSidebar = () => {
//     if (window.innerWidth < 768) {
//       setIsOpen(false)
//     }
//   }

//   const navItems = [
//     { path: "/", name: "Requests", icon: <FileText size={20} /> },
//     { path: "/fund-wallet", name: "Fund Wallet", icon: <DollarSign size={20} /> },
//     { path: "/wallet", name: "Wallet", icon: <Wallet size={20} /> },
//     { path: "/walletbalance", name: "Wallet", icon: <WalletPage size={20} /> },
//     { path: "/transactions", name: "Transaction History", icon: <History size={20} /> },
//   ]

//   return (
//     <>
//       <div className="sidebar-toggle" onClick={toggleSidebar}>
//         {isOpen ? <X size={24} /> : <Menu size={24} />}
//       </div>

//       <div className={`sidebar ${isOpen ? "open" : ""}`}>
//         <div className="sidebar-header">
//           <h2>Starlink Admin</h2>
//         </div>
//         <nav className="sidebar-nav">
//           <ul>
//             {navItems.map((item) => (
//               <li key={item.path}>
//                 <Link to={item.path} className={location.pathname === item.path ? "active" : ""} onClick={closeSidebar}>
//                   {item.icon}
//                   <span>{item.name}</span>
//                 </Link>
//               </li>
//             ))}
//           </ul>
//         </nav>
//       </div>

//       {/* Overlay to close sidebar on mobile when clicked outside */}
//       {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
//     </>
//   )
// }

// export default Sidebar



export const AdminSidebar = ({ expanded, onMouseEnter, onMouseLeave }) => {
  const location = useLocation();
  
  // Menu items with icons and paths
  const menuItems = [
    { icon: <Home size={20} />, name: 'Dashboard', path: '/dashboard' },
    { icon: <FileText size={20} />, name: 'Requests', path: '/requests' },
    { icon: <CreditCard size={20} />, name: 'Wallet History', path: '/wallet-history' },
    { icon: <History size={20} />, name: 'Wallet Withdrawal', path: '/wallet-withdrawal' },
    { icon: <Package size={20} />, name: 'Kits', path: '/kits' },
    { icon: <Users size={20} />, name: 'Users', path: '/users' },
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

