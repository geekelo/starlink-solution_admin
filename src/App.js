import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./styles/App.css"
import Login from "./components/Login"
import SignUp from "./components/SignUp"
import Sidebar from "./components/Sidebar"
import RequestPage from "./components/RequestPage"
import FundWalletPage from "./components/FundWalletPage"
import WalletPage from "./components/WalletPage"
import TransactionHistoryPage from "./components/TransactionHistoryPage"

function App() {
  // Check if user is logged in (this is a placeholder, implement actual auth logic)
  const isLoggedIn = true // Set to true for development, implement actual auth check

  return (
    <Router>
      <div className="app">
        {isLoggedIn ? (
          <div className="dashboard-layout">
            <Sidebar />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<RequestPage />} />
                <Route path="/fund-wallet" element={<FundWalletPage />} />
                <Route path="/wallet" element={<WalletPage />} />
                <Route path="/transactions" element={<TransactionHistoryPage />} />
              </Routes>
            </div>
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </div>
    </Router>
  )
}

export default App

