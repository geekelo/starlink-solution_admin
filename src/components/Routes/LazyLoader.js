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
