// import React from "react";
// import "../../styles/Wallet.css";



// const Renewal = ({ transaction, openModal }) => {
//   const kitRenewal = transaction?.kit_renewal || {}; // Ensure kitRenewal is always an object

//   return (
//     <div className="history-box renewal">
//       <div className="funding-details">
//         <p><strong>Kit Number:</strong> {transaction?.kit_number || "N/A"}</p>
//         <p><strong>Status:</strong> {transaction?.status || "N/A"}</p>
//         <p><strong>Amount:</strong> ₦{transaction.amount ? parseFloat(transaction.amount).toLocaleString() : "0"}</p>
//         <p><strong>Deadline:</strong> {transaction.deadline ? new Date(transaction.deadline).toLocaleDateString() : "N/A"}</p>
//         <p><strong>Start Date:</strong> {transaction.start_date ? new Date(transaction.start_date).toLocaleDateString() : "N/A"}</p>
//         <p><strong>End Date:</strong> {transaction.end_date ? new Date(transaction.end_date).toLocaleDateString() : "N/A"}</p>
//         <p><strong>Renewal Date:</strong> {transaction?.date_of_renewal ? new Date(transaction.date_of_renewal).toLocaleDateString() : "N/A"}</p>
//         <p><strong>Month:</strong> {transaction.month || "N/A"}</p>
//         <p><strong>Year:</strong> {transaction.year || "N/A"}</p>
//         <p><strong>Admin Credit:</strong> {transaction.credit_admin ? "Yes" : "No"}</p>
//       </div>
//       <span className="transaction-date">
//         {transaction?.created_at ? new Date(transaction.created_at).toLocaleDateString() : "N/A"}
//       </span>
//       <button className="edit-btn" onClick={() => openModal("edit", transaction)}>Edit</button>
//     </div>
//   );
// };

// export default Renewal;
import React, { useState, useRef, useEffect } from "react";
import { 
  RefreshCw, 
  CalendarDays, 
  CheckCircle, 
  FileText,
  MoreVertical,

  Eye
} from 'lucide-react';

// Renewal Component with dropdown menu for edit and view options
const Renewal = ({ transaction, openModal }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    console.log(transaction)

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  // const handleEditClick = (e) => {
  //   e.stopPropagation();
  //   setShowDropdown(false);
  //   openModal("edit", transaction);
  // };

  const handleViewClick = (e) => {
    e.stopPropagation();
    setShowDropdown(false);
    openModal("view", transaction);
  };

  return (
    <div className="kit-card renewal">
      <h3>
        Renewal
        <div 
          className="menu-dots" 
          onClick={toggleDropdown}
        >
          <MoreVertical size={20} />
        </div>
      </h3>
      
      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="dropdown-menu" ref={dropdownRef}>
          {/* <div className="dropdown-item" onClick={handleEditClick}>
            <Edit2 size={16} />
            Edit
          </div> */}
          <div className="dropdown-item" onClick={handleViewClick}>
            <Eye size={16} />
            View Details
          </div>
        </div>
      )}
      
      <div className="kit-info-grid">
        {/* Kit Number */}
        <div className="kit-info-icon">
          <FileText size={16} />
        </div>
        <div className="kit-info-text">
          <strong>Kit Number:</strong> {transaction?.kit_number || "N/A"}
        </div>
        
        {/* Status */}
        <div className="kit-info-icon">
          <CheckCircle size={16} />
        </div>
        <div className="kit-info-text">
  <strong>Status:</strong> 
  <span className={`status-badge ${transaction?.status?.toLowerCase()}`}>
    {transaction?.status || "receipt"}
  </span>
</div>

        
        {/* Amount */}
        <div className="kit-info-icon">
          <RefreshCw size={16} />
        </div>
        <div className="kit-info-text">
          <strong>Amount:</strong> ₦{transaction.amount ? parseFloat(transaction.amount).toLocaleString() : "0"}
        </div>
        
        {/* Date */}
        <div className="kit-info-icon">
          <CalendarDays size={16} />
        </div>
        <div className="kit-info-text">
          <strong>Date:</strong> {transaction?.created_at ? new Date(transaction.created_at).toLocaleDateString() : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default Renewal;
