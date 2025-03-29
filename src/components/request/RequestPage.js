// "use client";

// import { useState } from "react";
// import "../../styles/RequestPage.css";

// const RequestPage = () => {
//   const [activeTab, setActiveTab] = useState("funding");
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [showUserModal, setShowUserModal] = useState(false);

//   const handleTabChange = (tab) => {
//     setActiveTab(tab);
//   };

//   const handleUserClick = (username) => {
//     setSelectedUser(userDetails[username]);
//     setShowUserModal(true);
//   };

//   const handleApprove = (id) => {};

//   const handleDisapprove = (id) => {};

//   return (
//     <div className="request-page">
//       <div className="request-header">
//         <h1>Requests</h1>
//       </div>

//       <div className="request-tabs">
//         <button
//           className={`tab-button ${activeTab === "funding" ? "active" : ""}`}
//           onClick={() => handleTabChange("funding")}
//         >
//           Funding Requests
//         </button>
//         <button
//           className={`tab-button ${activeTab === "kit" ? "active" : ""}`}
//           onClick={() => handleTabChange("kit")}
//         >
//           Kit Requests
//         </button>
//       </div>

//       <div className="request-content">
//         {activeTab === "funding" ? (
//           <div className="table-container">
//             <table className="request-table">
//               <thead>
//                 <tr>
//                   <th>Username</th>
//                   <th>Wallet ID</th>
//                   <th>Amount</th>
//                   <th>Date</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {fundingRequestsData.map((request) => (
//                   <tr key={request.id}>
//                     <td>
//                       <span
//                         className="username-link"
//                         onClick={() => handleUserClick(request.username)}
//                       >
//                         {request.username}
//                       </span>
//                     </td>
//                     <td>{request.walletId}</td>
//                     <td>{request.amount}</td>
//                     <td>{request.date}</td>
//                     <td className="action-buttons">
//                       <button
//                         className="approve-button"
//                         onClick={() => handleApprove(request.id)}
//                       >
//                         Approve
//                       </button>
//                       <button
//                         className="disapprove-button"
//                         onClick={() => handleDisapprove(request.id)}
//                       >
//                         Disapprove
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="table-container">
//             <table className="request-table">
//               <thead>
//                 <tr>
//                   <th>Username</th>
//                   <th>Kit Number</th>
//                   <th>Address</th>
//                   <th>NIN</th>
//                   <th>Company Name</th>
//                   <th>Company Number</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {kitRequestsData.map((request) => (
//                   <tr key={request.id}>
//                     <td>
//                       <span
//                         className="username-link"
//                         onClick={() => handleUserClick(request.username)}
//                       >
//                         {request.username}
//                       </span>
//                     </td>
//                     <td>{request.kitNumber}</td>
//                     <td>{request.address}</td>
//                     <td>{request.nin}</td>
//                     <td>{request.companyName}</td>
//                     <td>{request.companyNumber}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* User Details Modal */}
//       {showUserModal && selectedUser && (
//         <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <div className="modal-header">
//               <h2>User Details</h2>
//               <button
//                 className="close-button"
//                 onClick={() => setShowUserModal(false)}
//               >
//                 ×
//               </button>
//             </div>
//             <div className="modal-body">
//               <div className="user-detail">
//                 <span className="detail-label">Name:</span>
//                 <span className="detail-value">{selectedUser.name}</span>
//               </div>
//               <div className="user-detail">
//                 <span className="detail-label">Email:</span>
//                 <span className="detail-value">{selectedUser.email}</span>
//               </div>
//               <div className="user-detail">
//                 <span className="detail-label">Phone:</span>
//                 <span className="detail-value">{selectedUser.phone}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RequestPage;
