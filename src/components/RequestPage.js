"use client"

import { useState } from "react"
import "../styles/RequestPage.css"

// Sample data for tables
const fundingRequestsData = [
  { id: 1, username: "john_doe", walletId: "W12345", amount: "$500", date: "2023-05-15", status: "pending" },
  { id: 2, username: "jane_smith", walletId: "W67890", amount: "$750", date: "2023-05-14", status: "pending" },
  { id: 3, username: "robert_johnson", walletId: "W24680", amount: "$1000", date: "2023-05-13", status: "pending" },
  { id: 4, username: "sarah_williams", walletId: "W13579", amount: "$250", date: "2023-05-12", status: "pending" },
]

const kitRequestsData = [
  {
    id: 1,
    username: "michael_brown",
    kitNumber: "K12345",
    address: "123 Main St, City",
    nin: "1234567890",
    companyName: "Tech Solutions",
    companyNumber: "C98765",
  },
  {
    id: 2,
    username: "emily_davis",
    kitNumber: "K67890",
    address: "456 Oak Ave, Town",
    nin: "0987654321",
    companyName: "Digital Innovations",
    companyNumber: "C54321",
  },
  {
    id: 3,
    username: "david_wilson",
    kitNumber: "K24680",
    address: "789 Pine Rd, Village",
    nin: "5678901234",
    companyName: "Smart Systems",
    companyNumber: "C13579",
  },
]

// User details for popup
const userDetails = {
  john_doe: { name: "John Doe", email: "john.doe@example.com", phone: "+1234567890" },
  jane_smith: { name: "Jane Smith", email: "jane.smith@example.com", phone: "+2345678901" },
  robert_johnson: { name: "Robert Johnson", email: "robert.johnson@example.com", phone: "+3456789012" },
  sarah_williams: { name: "Sarah Williams", email: "sarah.williams@example.com", phone: "+4567890123" },
  michael_brown: { name: "Michael Brown", email: "michael.brown@example.com", phone: "+5678901234" },
  emily_davis: { name: "Emily Davis", email: "emily.davis@example.com", phone: "+6789012345" },
  david_wilson: { name: "David Wilson", email: "david.wilson@example.com", phone: "+7890123456" },
}

const RequestPage = () => {
  const [activeTab, setActiveTab] = useState("funding")
  const [selectedUser, setSelectedUser] = useState(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const handleTabChange = (tab) => {
    setActiveTab(tab)
  }

  const handleUserClick = (username) => {
    setSelectedUser(userDetails[username])
    setShowUserModal(true)
  }

  const handleApprove = (id) => {
    console.log(`Approved request ${id}`)
    // Implement approval logic here
  }

  const handleDisapprove = (id) => {
    console.log(`Disapproved request ${id}`)
    // Implement disapproval logic here
  }

  return (
    <div className="request-page">
      <div className="request-header">
        <h1>Requests</h1>
      </div>

      <div className="request-tabs">
        <button
          className={`tab-button ${activeTab === "funding" ? "active" : ""}`}
          onClick={() => handleTabChange("funding")}
        >
          Funding Requests
        </button>
        <button className={`tab-button ${activeTab === "kit" ? "active" : ""}`} onClick={() => handleTabChange("kit")}>
          Kit Requests
        </button>
      </div>

      <div className="request-content">
        {activeTab === "funding" ? (
          <div className="table-container">
            <table className="request-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Wallet ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {fundingRequestsData.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <span className="username-link" onClick={() => handleUserClick(request.username)}>
                        {request.username}
                      </span>
                    </td>
                    <td>{request.walletId}</td>
                    <td>{request.amount}</td>
                    <td>{request.date}</td>
                    <td className="action-buttons">
                      <button className="approve-button" onClick={() => handleApprove(request.id)}>
                        Approve
                      </button>
                      <button className="disapprove-button" onClick={() => handleDisapprove(request.id)}>
                        Disapprove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="table-container">
            <table className="request-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Kit Number</th>
                  <th>Address</th>
                  <th>NIN</th>
                  <th>Company Name</th>
                  <th>Company Number</th>
                </tr>
              </thead>
              <tbody>
                {kitRequestsData.map((request) => (
                  <tr key={request.id}>
                    <td>
                      <span className="username-link" onClick={() => handleUserClick(request.username)}>
                        {request.username}
                      </span>
                    </td>
                    <td>{request.kitNumber}</td>
                    <td>{request.address}</td>
                    <td>{request.nin}</td>
                    <td>{request.companyName}</td>
                    <td>{request.companyNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>User Details</h2>
              <button className="close-button" onClick={() => setShowUserModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="user-detail">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{selectedUser.name}</span>
              </div>
              <div className="user-detail">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{selectedUser.email}</span>
              </div>
              <div className="user-detail">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{selectedUser.phone}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RequestPage

