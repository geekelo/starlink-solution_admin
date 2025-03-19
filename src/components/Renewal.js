import React from "react";
import '../styles/Wallet.css'
const Renewal = ({ transaction }) => {
  return (
    <div className="history-box renewal">
     
      <div className="funding-details">
        <p>Email: {transaction.email}</p>
        <p>Status: {transaction.status}</p>
        <p>Reference: {transaction.reference}</p>
      </div>
      <p>₦{transaction.amount.toLocaleString()}</p>
      <span>{new Date(transaction.date).toLocaleDateString()}</span>
    </div>
  );
};

export default Renewal;
