
import { Link, useLocation } from "react-router-dom";
import { CreditCard, DollarSign, FileText, History, Home, Package, RefreshCw, Users, X } from "lucide-react";
import "../../styles/Nav.css";
import logo from "../../assets/logo.png";

 const MobileDrawer = ({ isOpen, onClose }) => {
  const location = useLocation();
  
  // Menu items with icons and paths
  const menuItems = [
    { icon: <Home size={20} />, name: 'Dashboard', path: '/' },
    { icon: <FileText size={20} />, name: 'Requests', path: '/requests' },
    { icon: <CreditCard size={20} />, name: 'Wallet History', path: '/wallet-history' },
    { icon: <History size={20} />, name: 'Wallet Withdrawal', path: '/wallet-withdrawal' },
    { icon: <Package size={20} />, name: 'Kits', path: '/kits' },
    { icon: <Users size={20} />, name: 'Users', path: '/users' },
    { icon: <DollarSign size={20} />, name: 'Manage Funding', path: '/manage-funds' },
    { icon: <RefreshCw size={20} />, name: 'Manage Renewals', path: '/renewal' },
  ];
  
  return (
    <aside className={`mobile-drawer ${isOpen ? 'open' : ''}`}>
      <div className="drawer-header">
        <img className="logo-full" src={logo} alt="Logo" />

      </div>
      
      <ul className="drawer-menu">
        {menuItems.map((item) => (
          <li 
            key={item.path} 
            className={`drawer-menu-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <Link to={item.path} onClick={onClose}>
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};
// const AdminMobileNav = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation(); // Get current route

//   return (
//     <nav className="admin-mobile-nav">
//       <div className="nav-header">
//         <img className="logo" src={logo} alt="logo" />

//         <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       <ul className={`nav-links ${isOpen ? "open" : ""}`}>
//         <li className={location.pathname === "/requests" ? "active" : ""}>
//           <Link to="/requests" onClick={() => setIsOpen(false)}>Requests</Link>
//         </li>
//         <li className={location.pathname === "/wallet-history" ? "active" : ""}>
//           <Link to="/wallet-history" onClick={() => setIsOpen(false)}>Wallet History</Link>
//         </li>
//         <li className={location.pathname === "/wallet-withdrawal" ? "active" : ""}>
//           <Link to="/wallet-withdrawal" onClick={() => setIsOpen(false)}>Wallet Withdrawal</Link>
//         </li>
//         <li className={location.pathname === "/kits" ? "active" : ""}>
//           <Link to="/kits" onClick={() => setIsOpen(false)}>Kits</Link>
//         </li>
//         <li className={location.pathname === "/users" ? "active" : ""}>
//           <Link to="/users" onClick={() => setIsOpen(false)}>Users</Link>
//         </li>
//         <li className={location.pathname === "/manage-funds" ? "active" : ""}>
//           <Link to="/manage-funds" onClick={() => setIsOpen(false)}>Manage Funding</Link>
//         </li>
//         <li className={location.pathname === "/manage-renewal" ? "active" : ""}>
//           <Link to="/manage-renewal" onClick={() => setIsOpen(false)}>Manage Renewals</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };

export default MobileDrawer;
