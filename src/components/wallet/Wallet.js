import { useEffect, useState } from "react";

import {
  ChevronLeft,
  ChevronRight,
  ArrowUpCircle,
  RefreshCw,
  ArrowDownCircle,
  Database,
  CalendarDays,
} from "lucide-react";
import "../../styles/Wallet.css";
import Funding from "../funding/funding";
import Renewal from "../renewal/Renewal";
import WalletBalance from "./WalletBalance";

import { ViewRenewalModal } from "../renewal/ViewRenewal";

import Withdrawal from "./Withdrawal";
import { createAxiosInstance } from "../../config/axios";
const WalletPage = () => {
  const [walletHistory, setWalletHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [walletBalance, setWalletBalance] = useState(0);

  // Modal states
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchWalletHistory = async () => {
      setLoading(true);
      setError("");
      setError("");
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(
          "/api/v1/admin/wallet_histories"
        );
        const { fundings, renewals, withdrawals } = response.data;

        if (!fundings || !renewals || !withdrawals) {
          throw new Error("Missing fundings or renewals data");
        }

        const formatTransactions = (items, type) =>
          items.map((item) => ({
            id: item.id,
            type,
            status: item.status,
            amount: parseFloat(item.amount),
            date: new Date(item.created_at), // Store as Date object for sorting
            email: item.user_email || item.email,
            reference: item.kit_number || item.reference,
            purpose: item.purpose,
          }));

        const formattedFundings = formatTransactions(fundings, "Funding");
        const formattedRenewals = formatTransactions(renewals, "Renewal");
        const formattedWithdrawals = formatTransactions(
          withdrawals,
          "Withdrawal"
        );

        // Merge and sort transactions by date (recent first)
        const sortedTransactions = [
          ...formattedFundings,
          ...formattedRenewals,
          ...formattedWithdrawals,
        ].sort((a, b) => b.date - a.date);

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

  // Calculate totals
  const totalFunding = walletHistory
    .filter((item) => item.type === "Funding")
    .reduce((sum, item) => sum + parseFloat(item.amount), 0);

  const totalRenewal = walletHistory
    .filter((item) => item.type === "Renewal")
    .reduce((sum, item) => sum + parseFloat(item.amount), 0);

  const totalWithdrawal = walletHistory
    .filter((item) => item.type === "Withdrawal")
    .reduce((sum, item) => sum + parseFloat(item.amount), 0);

  const totalInSystem = totalFunding - totalRenewal;

  // Filter history based on active tab
  const filteredHistory = walletHistory.filter((item) => {
    return activeTab === "All" || item.type === activeTab;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredHistory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Handle modal actions
  const handleOpenModal = (type, transaction) => {
    setSelectedTransaction(transaction);

    if (type === "view") {
      setViewModalOpen(true);
    } else if (type === "edit") {
      setEditModalOpen(true);
    }
  };

  return (
    <div className="kit-container">
      <div className="kit-nav">
        <h2 className="kit-header">Wallet History</h2>
        <WalletBalance onBalanceFetched={setWalletBalance} />
      </div>

      {/* Metrics Section */}
      <div className="kit-metrics">
        <div className="kitmetric-box">
          <div className="metric-icon">
            <ArrowUpCircle size={40} color="#b6bbc1" />
            <h4>Total Funding</h4>
          </div>
          <p>{loading ? "-" : `₦${totalFunding.toLocaleString()}`}</p>
        </div>

        <div className="kitmetric-box">
          <div className="metric-icon">
            <RefreshCw size={40} color="#b6bbc1" />
            <h4>Total Renewal</h4>
          </div>
          <p>{loading ? "-" : `₦${totalRenewal.toLocaleString()}`}</p>
        </div>

        <div className="kitmetric-box">
          <div className="metric-icon">
            <ArrowDownCircle size={40} color="#ff1500b8" />
            <h4>Total Withdrawal</h4>
          </div>
          <p>{loading ? "-" : `₦${totalWithdrawal.toLocaleString()}`}</p>
        </div>

        <div className="kitmetric-box">
          <div className="metric-icon">
            <Database size={40} color="green" />
            <h4>Total in System</h4>
          </div>
          <p>{loading ? "-" : `₦${totalInSystem.toLocaleString()}`}</p>
        </div>
      </div>

      {/* Tab Buttons */}
      <div className="wallettabs">
        {["All", "Funding", "Renewal", "Withdrawal"].map((tab) => (
          <button
            key={tab}
            className={`wallettab-button tab-${tab.toLowerCase()} ${
              activeTab === tab ? "active" : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {/* Transactions Grid */}
      <div className="kit-grid">
        {loading ? (
          <div className="loading-spinner-container">
            <div className="loading-spinner"></div>
          </div>
        ) : currentTransactions.length === 0 ? (
          <div className="no-transactions">
            <p>No transactions found.</p>
          </div>
        ) : (
          currentTransactions.map((transaction) => {
            if (transaction.type === "Funding") {
              return <Funding key={transaction.id} transaction={transaction} />;
            } else if (transaction.type === "Renewal") {
              return (
                <Renewal
                  key={transaction.id}
                  transaction={transaction}
                  openModal={handleOpenModal}
                />
              );
            } else if (transaction.type === "Withdrawal") {
              return (
                <Withdrawal key={transaction.id} transaction={transaction} />
              );
            } else {
              return (
                <div key={transaction.id} className="kit-card inactive">
                  <h3>{transaction.type}</h3>
                  <div className="kit-info-grid">
                    <div className="kit-info-icon">
                      <ArrowDownCircle size={16} />
                    </div>
                    <div className="kit-info-text">
                      <strong>Amount:</strong> ₦
                      {transaction.amount.toLocaleString()}
                    </div>
                    <div className="kit-info-icon">
                      <CalendarDays size={16} />
                    </div>
                    <div className="kit-info-text">
                      <strong>Date:</strong>{" "}
                      {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            }
          })
        )}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() =>
            setCurrentPage((prev) =>
              indexOfLastItem < filteredHistory.length ? prev + 1 : prev
            )
          }
          disabled={indexOfLastItem >= filteredHistory.length}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* View Transaction Modal */}
      {viewModalOpen && selectedTransaction && (
        <ViewRenewalModal
          isOpen={viewModalOpen}
          closeModal={() => setViewModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default WalletPage;
