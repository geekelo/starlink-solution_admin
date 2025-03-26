// import React from "react";
// import '../../styles/Wallet.css'
// const Funding = ({ transaction }) => {
//   return (
//     <div className="history-box funding">
     
//       <div className="funding-details">
//         <p>Email: {transaction.email}</p>
//         <p>Status: {transaction.status}</p>
//         <p>Reference: {transaction.reference}</p>
//       </div>
//       <p>₦{transaction.amount.toLocaleString()}</p>
//       <span>{new Date(transaction.date).toLocaleDateString()}</span>
//     </div>
//   );
// };

// export default Funding;

import React from "react";
import {  ArrowUpCircle, CalendarDays, CheckCircle, User, CreditCard } from 'lucide-react';

// Funding Component with Kit Card styling
const Funding = ({ transaction }) => {
  return (
    <div className="kit-card active">
      <h3>Funding</h3>
      
      <div className="kit-info-grid">
        {/* Amount */}
        <div className="kit-info-icon">
          <ArrowUpCircle size={16} />
        </div>
        <div className="kit-info-text">
          <strong>Amount:</strong> ₦{transaction.amount ? parseFloat(transaction.amount).toLocaleString() : "0"}
        </div>
        
        {/* Email */}
        <div className="kit-info-icon">
          <User size={16} />
        </div>
        <div className="kit-info-text">
          <strong>Email:</strong> {transaction.email || "N/A"}
        </div>
        
        {/* Status */}
        <div className="kit-info-icon">
          <CheckCircle size={16} />
        </div>
        <div className="kit-info-text">
          <strong>Status:</strong> 
          <span className="status-badge active">
            {transaction.status || "Pending"}
          </span>
        </div>
        
        {/* Reference */}
        <div className="kit-info-icon">
          <CreditCard size={16} />
        </div>
        <div className="kit-info-text">
          <strong>Reference:</strong> {transaction.reference || "N/A"}
        </div>
        
        {/* Date */}
        <div className="kit-info-icon">
          <CalendarDays size={16} />
        </div>
        <div className="kit-info-text">
          <strong>Date:</strong> {transaction.date ? new Date(transaction.date).toLocaleDateString() : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default Funding;