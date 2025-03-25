import React, { useState } from "react";
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

const AdminLayout = () => {
  return (
    <div>
      <AdminMobileNav />
      <div className="outlet-container">
        <Outlet />
      </div>
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
