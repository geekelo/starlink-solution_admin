import { useState, useEffect } from "react";
import { createAxiosInstance } from "../config/axios";
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpCircle,
  RefreshCw,
  ArrowDownCircle,
  Database,
} from "lucide-react";
import "../styles/Wallet.css";
import Funding from "./funding";
import Renewal from "./Renewal";
import WalletBalance from "./WalletBalance";

const WalletPage = () => {
  const [walletHistory, setWalletHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const [walletBalance, setWalletBalance] = useState(0);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchWalletHistory = async () => {
      setLoading(true);
      setError("");
      const token = localStorage.getItem("token");
console.log(token)
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(
          "/api/v1/admin/wallet_histories"
        );

        console.log("API Response:", response.data); // ✅ Log API response to debug

        const { fundings, renewals } = response.data;

        if (!fundings || !renewals) {
          throw new Error("Missing fundings or renewals data");
        }

        const formatTransactions = (items, type) =>
          items.map((item) => ({
            id: item.id,
            type,
            amount: parseFloat(item.amount),
            date: new Date(item.created_at).toISOString().split("T")[0], // Format date
            email: item.user_email || item.email, // Ensure email is included
            reference: item.kit_number || item.reference, // Handle missing reference
          }));

        const formattedFundings = formatTransactions(fundings, "Funding");
        const formattedRenewals = formatTransactions(renewals, "Renewal");

        setWalletHistory([...formattedFundings, ...formattedRenewals]);
      } catch (err) {
        console.error("Failed to fetch wallet history:", err);
        setError("Failed to load wallet history.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletHistory();
  }, []);
  const totalFunding = walletHistory
    .filter((item) => item.type === "Funding")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalRenewal = walletHistory
    .filter((item) => item.type === "Renewal")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalWithdrawal = walletHistory
    .filter((item) => item.type === "Withdrawal")
    .reduce((sum, item) => sum + item.amount, 0);
  const totalInSystem = totalFunding - totalRenewal;
  const sumMinusWithdrawal = totalFunding - totalWithdrawal;

  // Filter history
  const filteredHistory = walletHistory.filter((item) => {
    const date = new Date(item.date);
    const monthMatches = selectedMonth
      ? date.getMonth() + 1 === parseInt(selectedMonth)
      : true;
    const yearMatches = selectedYear
      ? date.getFullYear() === parseInt(selectedYear)
      : true;
    const tabMatches = activeTab === "All" || item.type === activeTab;
    return monthMatches && yearMatches && tabMatches;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = filteredHistory.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="wallet-container">
      <div>
        <div className="wallet-nav">
          <h2 className="wallet-header">Wallet History</h2>
          <WalletBalance onBalanceFetched={setWalletBalance} />
        </div>
        <div className="metrics">
          {" "}
          <div className="metric-box">
            {" "}
            <div className="metric-icon">
              {" "}
              <ArrowUpCircle size={32} color="#b6bbc1" /> <h4>Total Funding</h4>
            </div>{" "}
            <p>₦{totalFunding.toLocaleString()}</p>{" "}
          </div>{" "}
          <div className="metric-box">
            {" "}
            <div className="metric-icon">
              {" "}
              <RefreshCw size={32} color="#b6bbc1" /> <h4>Total Renewal</h4>
            </div>{" "}
            <p>₦{totalRenewal.toLocaleString()}</p>{" "}
          </div>{" "}
          <div className="metric-box">
            {" "}
            <div className="metric-icon">
              {" "}
              <ArrowDownCircle size={32} color="#b6bbc1" />{" "}
              <h4>Total Withdrawal</h4>
            </div>{" "}
            <p>₦{totalWithdrawal.toLocaleString()}</p>{" "}
          </div>{" "}
          <div className="metric-box">
            {" "}
            <div className="metric-icon">
              {" "}
              <Database size={32} color="#b6bbc1" /> <h4>Total in System</h4>
            </div>{" "}
            <p>₦{totalInSystem.toLocaleString()}</p>{" "}
          </div>{" "}
        </div>
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

        {loading ? (
          <p>Loading wallet history...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="wallet-history">
            {currentHistory.length > 0 ? (
              currentHistory.map((item) =>
                item.type === "Funding" ? (
                  <Funding key={item.id} transaction={item} />
                ) : item.type === "Renewal" ? (
                  <Renewal key={item.id} transaction={item} />
                ) : (
                  <div
                    key={item.id}
                    className={`history-box ${item.type.toLowerCase()}`}
                  >
                    <p>₦{item.amount.toLocaleString()}</p>
                    <span>{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                )
              )
            ) : (
              <p>No history found.</p>
            )}
          </div>
        )}

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
      </div>
    </div>
  );
};

export default WalletPage;
