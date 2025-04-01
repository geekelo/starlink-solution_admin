import { useEffect, useState } from "react";

import {
  ArrowUpCircle,
  RefreshCw,
  ArrowDownCircle,
  Database,

} from "lucide-react";
import "../styles/Wallet.css";
import Funding from "../components/funding/funding";
import Renewal from "../components/renewal/Renewal";
import WalletBalance from "../components/wallet/WalletBalance";

import { ViewRenewalModal } from "../components/renewal/ViewRenewal";

import Withdrawal from "../components/wallet/Withdrawal";
import { createAxiosInstance } from "../config/axios";
import { AppLoader } from "../components/Loader/loader";
import MetricBox from "../components/MetricsBox/MetricsBox";
import PageHeader from "../components/PageHeader/PageHeader";
import TabGroup from "../components/TabGroup/Tab";
import EmptyState from "../components/EmptyState/EmptyState";
import Pagination from "../components/Pagination/Pagination";
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
    <PageHeader 
        title="Wallet History" 
        rightElement={ <WalletBalance onBalanceFetched={setWalletBalance} />}
      />

      {/* Metrics Section */}
      <div className="kit-metrics">
      <MetricBox
          icon={<ArrowUpCircle size={40} color="#4c6ef5" />}
          title="Total Funding"
          value={`₦${totalFunding.toLocaleString()}`}
          loading={loading}
        />
      
      <MetricBox
          icon={<RefreshCw size={40} color="#4c6ef5" />}
          title="Total Renewal"
          value={`₦${totalRenewal.toLocaleString()}`}
          loading={loading}
        />
        <MetricBox
          icon={<ArrowDownCircle size={40} color="#4c6ef5" />}
          title="Total Withdrawal"
          value={`₦${totalWithdrawal.toLocaleString()}`}
          loading={loading}
        />
  <MetricBox
          icon={<Database size={40} color="#4c6ef5" />}
          title="Total in System"
          value={`₦${totalInSystem.toLocaleString()}`}
          loading={loading}
        />
      

       
      </div>

      {/* Tab Buttons */}
      <TabGroup
        tabs={['All', 'Funding', 'Renewal', 'Withdrawal']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabPrefix="tab"
      />
      {/* Transactions Grid */}
      <div className="kit-grid">
        {loading ? (
         <AppLoader/>
        ) : currentTransactions.length === 0 ? (
          <EmptyState message="No transactions found." />
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
            } 
          })
        )}
      </div>

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={filteredHistory.length}
        itemsPerPage={itemsPerPage}
        showPageNumbers={true}
      />
   

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
