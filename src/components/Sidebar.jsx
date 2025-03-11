"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, FileText, Wallet, History, DollarSign } from "lucide-react"
import "../styles/Sidebar.css"
import Wallet from "./Wallet"
import WalletPage from "./WalletPage"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const closeSidebar = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false)
    }
  }

  const navItems = [
    { path: "/", name: "Requests", icon: <FileText size={20} /> },
    { path: "/fund-wallet", name: "Fund Wallet", icon: <DollarSign size={20} /> },
    { path: "/wallet", name: "Wallet", icon: <Wallet size={20} /> },
    { path: "/walletbalance", name: "Wallet", icon: <WalletPage size={20} /> },
    { path: "/transactions", name: "Transaction History", icon: <History size={20} /> },
  ]

  return (
    <>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </div>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2>Starlink Admin</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            {navItems.map((item) => (
              <li key={item.path}>
                <Link to={item.path} className={location.pathname === item.path ? "active" : ""} onClick={closeSidebar}>
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Overlay to close sidebar on mobile when clicked outside */}
      {isOpen && <div className="sidebar-overlay" onClick={toggleSidebar}></div>}
    </>
  )
}

export default Sidebar

