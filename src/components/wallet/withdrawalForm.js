import { useState } from "react";
import { createAxiosInstance } from "../../config/axios";
import { FaMoneyBillWave, FaRegStickyNote, FaCalendarAlt } from "react-icons/fa";
import "../../styles/Withdrawal.css";
import Modal from "../modal/modal";

const WithdrawalFormModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [withdrawalDate, setWithdrawalDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        "/api/v1/admin/starlink_admin_withdrawals",
        {
          amount: parseFloat(amount),
          purpose,
          withdrawal_date: withdrawalDate,
        }
      );

      setMessage("✅ Withdrawal request submitted successfully!");
      setAmount("");
      setPurpose("");
      setWithdrawalDate("");

      // Close the modal after submission
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Withdrawal failed:", error);
      setError("❌ Withdrawal failed. Please check details and try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null; // Don't render modal if it's closed

  return (
    <Modal onClose={onClose}>
      <div className="withdrawal-container">
        <div className="withdrawal-header">
          <h2>Withdrawal Funds</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <p className="withdrawal-info">
          Enter details below to request a withdrawal.
        </p>
        
        <div className="withdrawal-form-container">
          <form className="withdrawal-form" onSubmit={handleWithdraw}>
            <div className="form-group">
              <label htmlFor="amount">
                <FaMoneyBillWave className="icon" /> Amount (₦)
              </label>
              <input
                id="amount"
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder="Enter amount"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="purpose">
                <FaRegStickyNote className="icon" /> Purpose
              </label>
              <input
                id="purpose"
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
                placeholder="Reason for withdrawal"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="withdrawalDate">
                <FaCalendarAlt className="icon" /> Withdrawal Date
              </label>
              <input
                id="withdrawalDate"
                type="date"
                value={withdrawalDate}
                onChange={(e) => setWithdrawalDate(e.target.value)}
                required
              />
            </div>
            
            {message && <p className="withdrawal-message success">{message}</p>}
            {error && <p className="withdrawal-message error">{error}</p>}
            
            <button type="submit" disabled={loading} className="withdraw-btn">
              {loading ? "Processing..." : "Withdraw ➔"}
            </button>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default WithdrawalFormModal;
