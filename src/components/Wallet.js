import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpCircle, RefreshCw, ArrowDownCircle, Database } from "lucide-react";
import "../styles/Wallet.css";

const WalletPage = () => {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("All");
  const itemsPerPage = 5;

  const walletBalance = 500000;

  const walletHistory = [
    { type: "Funding", amount: 100000, date: "2025-03-01" },
    { type: "Renewal", amount: 20000, date: "2025-03-02" },
    { type: "Withdrawal", amount: 50000, date: "2025-02-28" },
    { type: "Funding", amount: 50000, date: "2025-02-20" },
    { type: "Renewal", amount: 15000, date: "2025-02-18" },
    { type: "Withdrawal", amount: 35000, date: "2025-02-15" },
    { type: "Funding", amount: 70000, date: "2025-02-10" },
  ];

   // Calculate Metrics
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


  const filteredHistory = walletHistory.filter((item) => {
    const date = new Date(item.date);
    const monthMatches = selectedMonth ? date.getMonth() + 1 === parseInt(selectedMonth) : true;
    const yearMatches = selectedYear ? date.getFullYear() === parseInt(selectedYear) : true;
    const tabMatches = activeTab === "All" || item.type === activeTab;
    return monthMatches && yearMatches && tabMatches;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentHistory = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="wallet-container">
      <div>
        <div className="wallet-nav">
      <h2 className="wallet-header">  Wallet History</h2>
      <div className="wallet-balance">Wallet Balance: ₦{walletBalance.toLocaleString()}</div>
      </div>

<div className="metrics">
<div className="metric-box">
  <div  className="metric-icon"> 
   <ArrowUpCircle size={32} color="#b6bbc1" />
   <h4>Total Funding</h4></div>
         
          <p>₦{totalFunding.toLocaleString()}</p>
        </div>
        <div className="metric-box">
          <div  className="metric-icon"> 
          <RefreshCw size={32} color="#b6bbc1" />
          <h4>Total Renewal</h4></div>
         
          <p>₦{totalRenewal.toLocaleString()}</p>
        </div>
        <div className="metric-box">
          <div  className="metric-icon"> 
          <ArrowDownCircle size={32} color="#b6bbc1" />
          <h4>Total Withdrawal</h4></div>
         
          <p>₦{totalWithdrawal.toLocaleString()}</p>
        </div>
        <div className="metric-box">
          <div className="metric-icon">  
          <Database size={32} color="#b6bbc1" />
          <h4>Total in System</h4></div>
        
          <p>₦{totalInSystem.toLocaleString()}</p>
        </div>
        </div>
        
      
        <div className="wallettabs">
  {["All", "Funding", "Renewal", "Withdrawal"].map((tab) => (
    <button
      key={tab}
      className={`wallettab-button tab-${tab.toLowerCase()} ${activeTab === tab ? "active" : ""}`}
      onClick={() => setActiveTab(tab)}
    >
      {tab}
    </button>
  ))}
</div>


      <div className="wallet-history">
        {currentHistory.length > 0 ? (
          currentHistory.map((item, index) => (
            <div key={index} className={`history-box ${item.type.toLowerCase()}`}>
             
              <p>₦{item.amount.toLocaleString()}</p>
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
          ))
        ) : (
          <p>No history found.</p>
        )}
      </div>

      <div className="pagination">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          <ChevronLeft size={18} />
        </button>
        <button onClick={() => setCurrentPage((prev) => (indexOfLastItem < filteredHistory.length ? prev + 1 : prev))} disabled={indexOfLastItem >= filteredHistory.length}>
          <ChevronRight size={18} />
        </button>
      </div>
      </div>
    </div>
  );
};

export default WalletPage;
