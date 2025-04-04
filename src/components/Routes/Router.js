import { Suspense, } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SuspenseLoader } from "./Suspense";
import { AdminLayout, Dashboard, FundingPage, KitPage, Login, MonthlyRenewalPage, RenewalPage, Requests, SignUp, UserDetails, Users, Wallet, WalletHistory, WithdrawalsList } from "./LazyLoader";
import InvoicesPage from "../../pages/Invoice";




const AppRouter = () => {

  const token = localStorage.getItem("candra");

  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseLoader />}>
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
              
              {/* Protected Routes with AdminLayout */}
              <Route element={<AdminLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/requests" element={<Requests />} />
                <Route path="/user/:id" element={<UserDetails />} />
                <Route path="/funding" element={<FundingPage />} />
                <Route path="/renewals" element={<RenewalPage />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/wallet-history" element={<WalletHistory />} />
                <Route path="/wallet-withdrawal" element={<WithdrawalsList />} />
                <Route path="/kits" element={<KitPage />} />
                <Route path="/users" element={<Users />} />
                <Route path="/invoices" element={<InvoicesPage />} />
                <Route path="manage-funds" element={<FundingPage />} />
               
                <Route path="/monthly-renewals" element={<MonthlyRenewalPage />} />
              </Route>
              
              {/* Redirect unknown routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRouter;