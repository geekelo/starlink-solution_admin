import { useEffect, useState } from "react";
import { createAxiosInstance } from "../config/axios";
import Withdrawal from "../components/wallet/Withdrawal";
import WithdrawalFormModal from "../components/wallet/withdrawalForm";
import { AppLoader } from "../components/Loader/loader";
import EmptyState from "../components/EmptyState/EmptyState";
import PageHeader from "../components/PageHeader/PageHeader";
import AppButton from "../components/AppButton/Button";
import { Plus } from "lucide-react";

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
          purpose: item.purpose,
        }));
        const sortedTransactions = [...formattedWithdrawals].sort(
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
const handleModal = () => {
  setIsModalOpen(true)
  
}
  return (
    <div>
      <PageHeader
        title="Manage Withdrawal"
        rightElement={
          <AppButton
            variant="custom"
            backgroundColor="error"
            onClick={handleModal} // This triggers the modal to open
            leftIcon={<Plus />}
          >
            Create Withdrawal
          </AppButton>
        }
      />

      {/* Loading Spinner */}
      {loading && <AppLoader />}

      {/* Error Message */}
      {error && <p className="kit-error-message">{error}</p>}

      {/* Modal */}
      <WithdrawalFormModal
        isOpen={isModalOpen} // Pass the state to control modal visibility
        onClose={() => setIsModalOpen(false)} // Close the modal on action
      />

      <div className="kit-grid">
        {!loading && walletHistory.length === 0 ? (
          <EmptyState message="No withdrawals found." />
        ) : (
          walletHistory.map((transaction) => (
            <Withdrawal key={transaction.id} transaction={transaction} />
          ))
        )}
      </div>
    </div>
  );
};

export default WithdrawalsList;
