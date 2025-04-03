import { useState } from "react";
import { createAxiosInstance } from "../../config/axios";
import { FaMoneyBillWave, FaRegStickyNote, FaCalendarAlt } from "react-icons/fa";
import "../../styles/Withdrawal.css";
import Modal from "../modal/modal";
import { FormLabel } from "../FormLabel/Label";
import { FormInput } from "../FormInput/Input";
import AppButton from "../AppButton/Button";
import { ChevronRight } from "lucide-react";

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

  if (!isOpen) return null; 
  const modalFooter = (
    <button 
      type="submit" 
      disabled={loading} 
      className="withdraw-btn"
      onClick={handleWithdraw}
    >
      {loading ? "Processing..." : "Withdraw Funds"}
    </button>
  );


  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Withdraw Funds"
      size="md"
      className="withdrawal-modal"
    >
      <div className="withdrawal-content">
        <p className="withdrawal-info">
          Enter details below to request a withdrawal.
        </p>
        
        <form className="withdrawal-form" onSubmit={handleWithdraw}>
          <div className="form-group">
            <FormLabel htmlFor="amount">
              Amount (₦)
            </FormLabel>
            <FormInput
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              placeholder="Enter amount"
              icon={<FaMoneyBillWave />}
              iconPosition="left"
            />
          </div>
          
          <div className="form-group">
            <FormLabel htmlFor="purpose">
              Purpose
            </FormLabel>
            <FormInput
              id="purpose"
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              required
              placeholder="Reason for withdrawal"
              icon={<FaRegStickyNote />}
              iconPosition="left"
            />
          </div>
          
          <div className="form-group">
            <FormLabel htmlFor="withdrawalDate">
               Withdrawal Date
            </FormLabel>
            <FormInput
              id="withdrawalDate"
              type="date"
              value={withdrawalDate}
              onChange={(e) => setWithdrawalDate(e.target.value)}
              required
              icon={<FaCalendarAlt />}
              iconPosition="left"
            />
          </div>
          
          {message && <p className="withdrawal-message success">{message}</p>}
          {error && <p className="withdrawal-message error">{error}</p>}
          
          <div className="form-actions">
            <AppButton
              type="submit"
              variant="custom"
              size="md"
              loading={loading}
              loadingText="Processing..."
              rightIcon={<ChevronRight />}
              backgroundColor="#e53e3e"
              textColor="#ffffff"
              hoverColor="#c53030"
              fullWidth={false}
            >
              Withdraw
            </AppButton>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default WithdrawalFormModal;
