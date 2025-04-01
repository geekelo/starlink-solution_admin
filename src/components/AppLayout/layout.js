import { useEffect, useState } from "react";
import MobileDrawer from "../nav/MobileDrawer";
import { AdminSidebar } from "../nav/Sidebar";
import { Outlet } from "react-router-dom";
import { MobileHeader } from "../nav/MobileHeader";


const AdminLayout = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [sidebarExpanded, setSidebarExpanded] = useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
    
    // Handle window resize to toggle between mobile and desktop views
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
        if (window.innerWidth >= 768) {
          setMobileDrawerOpen(false);
        }
      };
      
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (
      <div className="admin-layout">
        {isMobile && (
          <MobileHeader 
            isDrawerOpen={mobileDrawerOpen}
            toggleDrawer={() => setMobileDrawerOpen(!mobileDrawerOpen)}
          />
        )}
        
        {isMobile ? (
          <MobileDrawer 
            isOpen={mobileDrawerOpen} 
            onClose={() => setMobileDrawerOpen(false)} 
          />
        ) : (
          <AdminSidebar 
            expanded={sidebarExpanded} 
            onMouseEnter={() => setSidebarExpanded(true)}
            onMouseLeave={() => setSidebarExpanded(false)}
          />
        )}
        
        <div className={`admin-content 
          ${!isMobile && 'with-sidebar'} 
          ${!isMobile && !sidebarExpanded && 'sidebar-collapsed'}
          ${isMobile && 'mobile-content'}
          ${isMobile && mobileDrawerOpen && 'drawer-open'}`
        }>
          <div className="outlet-container">
            <Outlet />
          </div>
        </div>
        
        {/* Overlay for mobile drawer */}
        {isMobile && mobileDrawerOpen && (
          <div 
            className="mobile-overlay" 
            onClick={() => setMobileDrawerOpen(false)}
          />
        )}
      </div>
    );
  };

  export default AdminLayout