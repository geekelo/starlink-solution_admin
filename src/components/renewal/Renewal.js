import React from "react";
import "../../styles/Wallet.css";

const Renewal = ({ transaction }) => {
  return (
    <div className="history-box renewal">
      <div className="funding-details">
        <p><strong>Kit Number:</strong> {transaction?.kit_number}</p>
        <p><strong>Status:</strong> {transaction?.status}</p>
        <p><strong>Amount:</strong> ₦{parseFloat(transaction?.amount).toLocaleString()}</p>
        <p><strong>Deadline:</strong> {new Date(transaction?.deadline).toLocaleDateString()}</p>
        <p><strong>Start Date:</strong> {new Date(transaction?.start_date).toLocaleDateString()}</p>
        <p><strong>End Date:</strong> {new Date(transaction?.end_date).toLocaleDateString()}</p>
        <p><strong>Renewal Date:</strong> {new Date(transaction?.date_of_renewal).toLocaleDateString()}</p>
        <p><strong>Month:</strong> {transaction?.month}</p>
        <p><strong>Year:</strong> {transaction?.year}</p>
        <p><strong>Admin Credit:</strong> {transaction?.credit_admin ? "Yes" : "No"}</p>
      </div>
      <span className="transaction-date">
        {new Date(transaction?.created_at).toLocaleDateString()}
      </span>
      <button className="edit-btn">Edit</button>
    </div>
  );
};

export default Renewal;
