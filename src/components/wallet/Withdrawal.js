import { useState } from "react";
import "../../styles/Withdrawal.css";
import { ArrowDownCircle, CalendarDays, FileText } from "lucide-react";
import WithdrawalFormModal from "./withdrawalForm";

const Withdrawal = ({ transaction }) => {
  console.log(transaction);
  
  return (
    <div className="kit-card withdrawal">
      <h3>Withdrawal</h3>
      
      <div className="kit-info-grid">
        {/* Amount */}
        <div className="kit-info-icon">
          <ArrowDownCircle size={16} />
        </div>
        <div className="kit-info-text">
          <strong>Amount:</strong> ₦{transaction?.amount ? parseFloat(transaction?.amount).toLocaleString() : "0"}
        </div>
        
        {/* Purpose */}
        {transaction?.purpose && (
          <>
            <div className="kit-info-icon">
              <FileText size={16} />
            </div>
            <div className="kit-info-text">
              <strong>Purpose:</strong> {transaction?.purpose}
            </div>
          </>
        )}
        
        {/* Date */}
        <div className="kit-info-icon">
          <CalendarDays size={16} />
        </div>
        <div className="kit-info-text">
          <strong>Date:</strong>{" "}
          {transaction.date
            ? new Date(transaction.date).toLocaleDateString()
            : "N/A"}
        </div>
      </div>
    </div>
  );
};

export default Withdrawal;
