import { useState } from "react";
import "../../styles/Withdrawal.css";
import { ArrowDownCircle, CalendarDays, FileText } from "lucide-react";
import WithdrawalFormModal from "./withdrawalForm";

const Withdrawal = ({ transaction = {} }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button
        className="create-withdrawal-btn"
        onClick={() => setIsModalOpen(true)}
      >
        Create Withdrawal
      </button>
      <div className="kit-card withdrawal">
        <h3>Withdrawal</h3>

        {/* Withdrawal Modal */}
        <WithdrawalFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <div className="kit-info-grid">
          {/* Amount */}
          <div className="kit-info-icon">
            <ArrowDownCircle size={16} />
          </div>
          <div className="kit-info-text">
            <strong>Amount:</strong> ₦
            {transaction.amount
              ? parseFloat(transaction.amount).toLocaleString()
              : "0"}
          </div>

          {/* Purpose (only if available) */}
          {transaction.purpose && (
            <>
              <div className="kit-info-icon">
                <FileText size={16} />
              </div>
              <div className="kit-info-text">
                <strong>Purpose:</strong> {transaction.purpose}
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
    </div>
  );
};

export default Withdrawal;
