# Lazy Loading Components

## Overview

This module implements React's lazy loading technique for code splitting, which improves application performance by only loading components when they're needed.

## Implementation

```jsx
import { lazy } from "react";

// Lazy load components
export const Login = lazy(() => import("../../pages/Login"));
export const SignUp = lazy(() => import("../../pages/SignUp"));
export const AdminLayout = lazy(() => import("../AppLayout/layout"));
export const Dashboard = lazy(() => import("../../pages/dashboard"));
export const Requests = lazy(() => import("../../pages/Request"));
export const UserDetails = lazy(() => import("../../pages/Userdetail"));
export const FundingPage = lazy(() => import("../../pages/ManageFunding"));
export const RenewalPage = lazy(() => import("../../pages/ManageRenewal"));
export const Wallet = lazy(() => import("../../pages/WalletPage"));
export const WalletHistory = lazy(() => import("../../pages/WalletHistory"));
export const WithdrawalsList = lazy(() => import("../../pages/walletWithdrawal"));
export const KitPage = lazy(() => import("../../pages/Kit"));
export const Users = lazy(() => import("../../pages/User"));
```

## Purpose

The `lazy` function enables dynamic imports and code splitting. This approach:

- Reduces initial bundle size by splitting the code into smaller chunks
- Improves initial load time by only loading essential components
- Defers loading of components until they are actually needed
- Creates separate JavaScript chunks that are loaded on demand

## Usage

To use these lazy-loaded components, wrap them in a `Suspense` component:

```jsx
import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLoader } from "../components/AppLoader";
import { 
  Login, 
  Dashboard, 
  SignUp, 
  AdminLayout,
  // other components as needed
} from "./lazyComponents";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            {/* Additional nested routes */}
          </Route>
          {/* Other routes */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
```

## Benefits

- **Improved Performance**: Reduces initial load time by only downloading necessary code
- **Better User Experience**: Faster initial page rendering
- **Optimized Resource Usage**: Conserves bandwidth by loading components on demand
- **Reduced Memory Usage**: Only loads components into memory when needed

## Notes

- Always use `Suspense` with a fallback UI when working with lazy-loaded components
- For optimal performance, group related components that are likely to be used together
- Component paths are relative to the location of this file