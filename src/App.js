import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./styles/App.css";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import FundingPage from "./components/funding/ManageFunding";
import UserDetails from "./components/user/Userdetail";
import RenewalPage from "./components/renewal/ManageRenewal";
import AdminMobileNav from "./components/nav/Nav";
import Requests from "./components/request/Request";
import Wallet from "./components/wallet/Wallet";
import WalletPage from "./components/wallet/WalletPage";
import KitPage from "./components/kits/Kit";
import Users from "./components/user/User";
import WithdrawalPage from "./components/wallet/Withdrawal";
import Renewal from "./components/renewal/Renewal";
import { AdminSidebar } from "./components/nav/Sidebar";
import { MobileHeader } from "./components/nav/header";
import MobileDrawer from "./components/nav/Nav";

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

function App() {
  const token = localStorage.getItem("candra"); // Check if user is logged in

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          <>
            {/* Redirect logged-in users away from auth pages */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/signup" element={<Navigate to="/" replace />} />

            {/* Protected Routes with AdminMobileNav */}
            <Route element={<AdminLayout />}>
              <Route path="/" element={<Requests /> } />
              <Route path="/user/:id" element={<UserDetails />} />
              <Route path="/funding" element={<FundingPage />} />
              <Route path="/renewals" element={<RenewalPage />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="wallet-history" element={<Wallet />} />
              <Route path="wallet-withdrawal" element={<WithdrawalPage />} />
              <Route path="kits" element={<KitPage />} />
              <Route path="users" element={<Users />} />
              <Route path="manage-funds" element={<FundingPage />} />
              <Route path="manage-renewal" element={<RenewalPage />} />

            </Route>

            {/* Redirect unknown routes to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
