import { useEffect, useState } from "react";
import { createAxiosInstance } from "../config/axios";
import Withdrawal from "../components/wallet/Withdrawal";
import WithdrawalFormModal from "../components/wallet/withdrawalForm";
import { AppLoader } from "../components/Loader/loader";

const WithdrawalsList = () => {
  const [walletHistory, setWalletHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchWalletHistory = async () => {
      setLoading(true);
      setError("");
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get("/api/v1/admin/wallet_histories");
    
        const { withdrawals } = response.data;

        if (!withdrawals) {
          throw new Error("Missing withdrawal data");
        }

        const formattedWithdrawals = withdrawals.map((item) => ({
          id: item.id,
          status: item.status,
          amount: parseFloat(item.amount),
          date: item.created_at ? new Date(item.created_at) : null,
          email: item.user_email || item.email,
          reference: item.kit_number || item.reference,
          purpose: item.purpose
        }));
        const sortedTransactions = [ ...formattedWithdrawals].sort(
          (a, b) => b.date - a.date
        );
  
        setWalletHistory(sortedTransactions);
      } catch (err) {
        console.error("Failed to fetch wallet history:", err);
        setError("Failed to load wallet history.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletHistory();
  }, []);

  return (
    <div>
        <div className="kit-header-wrapper">
    <h2 className="kit-header-title">Manage Withdrawal </h2>
  </div>

      <button
        className="create-withdrawal-btn"
        onClick={() => setIsModalOpen(true)}
      >
        Create Withdrawal
      </button>
      
      {/* Loading Spinner */}
      {loading && (
     <AppLoader/>
      )}
      
      {/* Error Message */}
      {error && <p className="kit-error-message">{error}</p>}
      
      {/* Withdrawal Modal */}
      <WithdrawalFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      
      <div className="kit-grid">
        {!loading && walletHistory.length === 0 ? (
          <p>No withdrawals found.</p>
        ) : (
          walletHistory.map((transaction) => (
            <Withdrawal key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
}

export default WithdrawalsList;
