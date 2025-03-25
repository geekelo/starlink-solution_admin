import { Menu, X } from "lucide-react";
import logo from "../../assets/logo.png";
export const MobileHeader = ({ isDrawerOpen, toggleDrawer }) => {
    return (
      <header className="mobile-header">
          <img className="logo" src={logo} alt="logo" />
          
        <button className="menu-toggle" onClick={toggleDrawer}>
          {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      
      </header>
    );
  };
  