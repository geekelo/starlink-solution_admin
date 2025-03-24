import React from "react";
import "../../styles/Wallet.css";

const Renewal = ({ transaction, openModal }) => {
  const kitRenewal = transaction?.kit_renewal || {}; // Ensure kitRenewal is always an object

  return (
    <div className="history-box renewal">
      <div className="funding-details">
        <p><strong>Kit Number:</strong> {transaction?.kit_number || "N/A"}</p>
        <p><strong>Status:</strong> {transaction?.status || "N/A"}</p>
        <p><strong>Amount:</strong> ₦{transaction.amount ? parseFloat(transaction.amount).toLocaleString() : "0"}</p>
        <p><strong>Deadline:</strong> {transaction.deadline ? new Date(transaction.deadline).toLocaleDateString() : "N/A"}</p>
        <p><strong>Start Date:</strong> {transaction.start_date ? new Date(transaction.start_date).toLocaleDateString() : "N/A"}</p>
        <p><strong>End Date:</strong> {transaction.end_date ? new Date(transaction.end_date).toLocaleDateString() : "N/A"}</p>
        <p><strong>Renewal Date:</strong> {transaction?.date_of_renewal ? new Date(transaction.date_of_renewal).toLocaleDateString() : "N/A"}</p>
        <p><strong>Month:</strong> {transaction.month || "N/A"}</p>
        <p><strong>Year:</strong> {transaction.year || "N/A"}</p>
        <p><strong>Admin Credit:</strong> {transaction.credit_admin ? "Yes" : "No"}</p>
      </div>
      <span className="transaction-date">
        {transaction?.created_at ? new Date(transaction.created_at).toLocaleDateString() : "N/A"}
      </span>
      <button className="edit-btn" onClick={() => openModal("edit", transaction)}>Edit</button>
    </div>
  );
};

export default Renewal;
