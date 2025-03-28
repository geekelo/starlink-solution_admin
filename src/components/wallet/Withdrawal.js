
import "../../styles/Withdrawal.css";
import { ArrowDownCircle, CalendarDays, FileText } from "lucide-react";


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
          <strong>Date:</strong> {transaction?.date ? new Date(transaction?.date).toLocaleDateString() : "N/A"}
        </div>
      </div>
    </div>
  );
};

// const WithdrawalPage = () => {
//   const [amount, setAmount] = useState("");
//   const [purpose, setPurpose] = useState("");
//   const [withdrawalDate, setWithdrawalDate] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleWithdraw = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");
//     setError("");

//     try {
//       const axiosInstance = createAxiosInstance();
//       const response = await axiosInstance.post(
//         "/api/v1/admin/starlink_admin_withdrawals",
//         {
//           amount: parseFloat(amount),
//           purpose,
//           withdrawal_date: withdrawalDate,
//         }
//       );

//       console.log("Withdrawal Response:", response.data);
//       setMessage("✅ Withdrawal request submitted successfully!");
//       setAmount("");
//       setPurpose("");
//       setWithdrawalDate("");
//     } catch (error) {
//       console.error("Withdrawal failed:", error);
//       setError("❌ Withdrawal failed. Please check details and try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="withdrawal-container">
//       <h2> Withdrawal Funds</h2>
//       <p className="withdrawal-info">
//         Enter details below to request a withdrawal.
//       </p>

//       <form className="withdrawal-form" onSubmit={handleWithdraw}>
//         <div className="form-group">
//           <label htmlFor="amount">
//             <FaMoneyBillWave className="icon" /> Amount (₦)
//           </label>
//           <input
//             id="amount"
//             type="number"
//             step="0.01"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             required
//             placeholder="Enter amount"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="purpose">
//             <FaRegStickyNote className="icon" /> Purpose
//           </label>
//           <input
//             id="purpose"
//             type="text"
//             value={purpose}
//             onChange={(e) => setPurpose(e.target.value)}
//             required
//             placeholder="Reason for withdrawal"
//           />
//         </div>

//         <div className="form-group">
//           <label htmlFor="withdrawalDate">
//             <FaCalendarAlt className="icon" /> Withdrawal Date
//           </label>
//           <input
//             id="withdrawalDate"
//             type="date"
//             value={withdrawalDate}
//             onChange={(e) => setWithdrawalDate(e.target.value)}
//             required
//           />
//         </div>

//         <button type="submit" disabled={loading} className="withdraw-btn">
//           {loading ? "Processing..." : "Withdraw Funds ➔"}
//         </button>

//         {message && <p className="withdrawal-message success">{message}</p>}
//         {error && <p className="withdrawal-message error">{error}</p>}
//       </form>
//     </div>
//   );
// };

export default Withdrawal;
