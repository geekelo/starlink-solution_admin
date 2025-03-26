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
      const token = localStorage.getItem("candra");
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

  // Calculate totals
  const totalFunding = walletHistory
    .filter((item) => item.type === "Funding")
    .reduce((sum, item) => sum + parseFloat(item.amount), 0);
    
  const totalRenewal = walletHistory
    .filter((item) => item.type === "Renewal")
    .reduce((sum, item) => sum + parseFloat(item.amount), 0);
    
  const totalWithdrawal = 0; // No withdrawal transactions in this example
    
  const totalInSystem = totalFunding - totalRenewal;

  // Filter history based on active tab
  const filteredHistory = walletHistory.filter((item) => {
    return activeTab === "All" || item.type === activeTab;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

  // Handle modal actions
  const handleOpenModal = (type, transaction) => {
    setSelectedTransaction(transaction);
    
    if (type === "view") {
      setViewModalOpen(true);
    } else if (type === "edit") {
      setEditModalOpen(true);
    }
  };

  // const handleSaveRenewal = (updatedTransaction) => {
  //   // Update the transaction in the history
  //   const updatedHistory = walletHistory.map(item => 
  //     item.id === updatedTransaction.id ? updatedTransaction : item
  //   );
    
  //   setWalletHistory(updatedHistory);
  //   setEditModalOpen(false);
    
  //   // In a real app, you would also send this update to your API
  //   // For example:
  //   /*
  //   const updateRenewal = async () => {
  //     try {
  //       const axiosInstance = createAxiosInstance();
  //       await axiosInstance.patch(
  //         `/api/v1/admin/renewals/${updatedTransaction.id}`, 
  //         updatedTransaction
  //       );
  //       // Success handling
  //     } catch (err) {
  //       console.error("Failed to update renewal:", err);
  //       setError("Failed to update renewal.");
  //     }
  //   };
    
  //   updateRenewal();
  //   */
  // };

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
          <p>{loading ? '-' : `₦${totalFunding.toLocaleString()}`}</p>
        </div>

        <div className="kitmetric-box">
          <div className="metric-icon">
            <RefreshCw size={40} color="#b6bbc1" />
            <h4>Total Renewal</h4>
          </div>
          <p>{loading ? '-' : `₦${totalRenewal.toLocaleString()}`}</p>
         
        </div>

        <div className="kitmetric-box">
          <div className="metric-icon">
            <ArrowDownCircle size={40} color="#ff1500b8" />
            <h4>Total Withdrawal</h4>
          </div>
          <p>{loading ? '-' : `₦${totalWithdrawal.toLocaleString()}`}</p>
        
        </div>
        
        <div className="kitmetric-box">
          <div className="metric-icon">
            <Database size={40} color="green" />
            <h4>Total in System</h4>
          </div>
          <p>{loading ? '-' : `₦${totalInSystem.toLocaleString()}`}</p>
      
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
            if (transaction.type === 'Funding') {
              return <Funding key={transaction.id} transaction={transaction} />;
            } else if (transaction.type === 'Renewal') {
              return (
                <Renewal 
                  key={transaction.id} 
                  transaction={transaction} 
                  openModal={handleOpenModal} 
                />
              );
            } else if (transaction.type === 'Withdrawal') {
              return <Withdrawal key={transaction.id} transaction={transaction} />;
            } else {
              return (
                <div key={transaction.id} className="kit-card inactive">
                  <h3>{transaction.type}</h3>
                  <div className="kit-info-grid">
                    <div className="kit-info-icon">
                      <ArrowDownCircle size={16} />
                    </div>
                    <div className="kit-info-text">
                      <strong>Amount:</strong> ₦{transaction.amount.toLocaleString()}
                    </div>
                    <div className="kit-info-icon">
                      <CalendarDays size={16} />
                    </div>
                    <div className="kit-info-text">
                      <strong>Date:</strong> {new Date(transaction.date).toLocaleDateString()}
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

      {/* Edit Renewal Modal */}
      {/* {editModalOpen && selectedTransaction && (
        <EditRenewalModal
          isOpen={editModalOpen}
          closeModal={() => setEditModalOpen(false)}
          transaction={selectedTransaction}
          onSave={handleSaveRenewal}
        />
      )} */}

   
    </div>
  );
};
// const WalletPage = () => {
//   const [walletHistory, setWalletHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [selectedMonth, setSelectedMonth] = useState("");
//   const [selectedYear, setSelectedYear] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [activeTab, setActiveTab] = useState("All");
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedTransaction, setSelectedTransaction] = useState(null);
//   const itemsPerPage = 6;

//   useEffect(() => {
//     const fetchWalletHistory = async () => {
//       setLoading(true);
//       setError("");
//       const token = localStorage.getItem("candra");
// console.log(token)
//       try {
//         const axiosInstance = createAxiosInstance();
//         const response = await axiosInstance.get(
//           "/api/v1/admin/wallet_histories"
//         );

//         console.log("API Response:", response.data); // ✅ Log API response to debug

//         const { fundings, renewals } = response.data;

//         if (!fundings || !renewals) {
//           throw new Error("Missing fundings or renewals data");
//         }

//         const formatTransactions = (items, type) =>
//           items.map((item) => ({
//             id: item.id,
//             type,
//             amount: parseFloat(item.amount),
//             date: new Date(item.created_at).toISOString().split("T")[0], // Format date
//             email: item.user_email || item.email, // Ensure email is included
//             reference: item.kit_number || item.reference, // Handle missing reference
//           }));

//         const formattedFundings = formatTransactions(fundings, "Funding");
//         const formattedRenewals = formatTransactions(renewals, "Renewal");

//         setWalletHistory([...formattedFundings, ...formattedRenewals]);
//       } catch (err) {
//         console.error("Failed to fetch wallet history:", err);
//         setError("Failed to load wallet history.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWalletHistory();
//   }, []);
//   const totalFunding = walletHistory
//     .filter((item) => item.type === "Funding")
//     .reduce((sum, item) => sum + item.amount, 0);
//   const totalRenewal = walletHistory
//     .filter((item) => item.type === "Renewal")
//     .reduce((sum, item) => sum + item.amount, 0);
//   const totalWithdrawal = walletHistory
//     .filter((item) => item.type === "Withdrawal")
//     .reduce((sum, item) => sum + item.amount, 0);
//   const totalInSystem = totalFunding - totalRenewal;
//   const sumMinusWithdrawal = totalFunding - totalWithdrawal;

//   // Filter history
//   const filteredHistory = walletHistory.filter((item) => {
//     const date = new Date(item.date);
//     const monthMatches = selectedMonth
//       ? date.getMonth() + 1 === parseInt(selectedMonth)
//       : true;
//     const yearMatches = selectedYear
//       ? date.getFullYear() === parseInt(selectedYear)
//       : true;
//     const tabMatches = activeTab === "All" || item.type === activeTab;
//     return monthMatches && yearMatches && tabMatches;
//   });

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentHistory = filteredHistory.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const dropdownRef = useRef(null);

//   // Handle dropdown toggle
//   const toggleDropdown = (id, e) => {
//     e.stopPropagation();
//     setActiveDropdown(activeDropdown === id ? null : id);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setActiveDropdown(null);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, [dropdownRef]);

//   // Modal handlers
//   const openModal = (transaction) => {
//     setSelectedTransaction(transaction);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedTransaction(null);
//   };




//   const currentTransactions = filteredHistory.slice(indexOfFirstItem, indexOfLastItem);

//   // Function to get the appropriate status class
//   const getStatusClass = (type) => {
//     switch (type) {
//       case 'Funding':
//         return 'active';
//       case 'Withdrawal':
//         return 'inactive';
//       case 'Renewal':
//         return 'renewal';
//       default:
//         return '';
//     }
//   };

//   return (
//     <div className="kit-container">
//       <div className="kit-nav">
//         <h2 className="kit-header">Wallet History</h2>
//         <WalletBalance onBalanceFetched={setWalletBalance} />
//       </div>
      
//       {/* Tab Buttons */}
//       <div className="wallettabs">
//         {["All", "Funding", "Renewal", "Withdrawal"].map((tab) => (
//           <button
//             key={tab}
//             className={`wallettab-button tab-${tab.toLowerCase()} ${
//               activeTab === tab ? "active" : ""
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Metrics Section */}
//       <div className="kit-metrics">
//         <div className="kitmetric-box">
//           <div className="metric-icon">
//             <ArrowUpCircle size={40} color="#b6bbc1" />
//             <h4>Total Funding</h4>
//           </div>
//           <p>₦{loading ? '-' : totalFunding.toLocaleString()}</p>
//         </div>

//         <div className="kitmetric-box">
//           <div className="metric-icon">
//             <RefreshCw size={40} color="#b6bbc1" />
//             <h4>Total Renewal</h4>
//           </div>
//           <p>₦{loading ? '-' : totalRenewal.toLocaleString()}</p>
//         </div>

//         <div className="kitmetric-box">
//           <div className="metric-icon">
//             <ArrowDownCircle size={40} color="#ff1500b8" />
//             <h4>Total Withdrawal</h4>
//           </div>
//           <p>₦{loading ? '-' : totalWithdrawal.toLocaleString()}</p>
//         </div>
        
//         <div className="kitmetric-box">
//           <div className="metric-icon">
//             <Database size={40} color="green" />
//             <h4>Total in System</h4>
//           </div>
//           <p>₦{loading ? '-' : totalInSystem.toLocaleString()}</p>
//         </div>
//       </div>

//       <div className="kit-grid">
//         {loading ? (
//           <div className="loading-spinner-container">
//             <div className="loading-spinner"></div>
//           </div>
//         ) : currentTransactions.length === 0 ? (
//           <div className="no-transactions">
//             <p>No transactions found.</p>
//           </div>
//         ) : (
//           currentTransactions.map((transaction) => {
//             switch (transaction.type) {
//               case 'Funding':
//                 return <Funding key={transaction.id} transaction={transaction} openModal={openModal} />;
//               case 'Renewal':
//                 return <Renewal key={transaction.id} transaction={transaction} openModal={openModal} />;
//               case 'Withdrawal':
//                 return <Withdrawal key={transaction.id} transaction={transaction} openModal={openModal} />;
//               default:
//                 return null;
//             }
//           })
//         )}
//       </div>

//       <div className="pagination">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//         >
//           <ChevronLeft size={18} />
//         </button>
//         <button
//           onClick={() =>
//             setCurrentPage((prev) =>
//               indexOfLastItem < filteredHistory.length ? prev + 1 : prev
//             )
//           }
//           disabled={indexOfLastItem >= filteredHistory.length}
//         >
//           <ChevronRight size={18} />
//         </button>
//       </div>

//       {/* Transaction Details Modal */}
//       <TransactionModal
//         isOpen={isModalOpen}
//         closeModal={closeModal}
//         transaction={selectedTransaction}
//         type={modalType}
//         error={error}
//         handleSave={handleSaveTransaction}
//       />
//     </div>
//   );
//   // return (
//   //   <div className="wallet-container">
//   //     <div>
//   //       <div className="wallet-nav">
//   //         <h2 className="wallet-header">Wallet History</h2>
//   //         <WalletBalance onBalanceFetched={setWalletBalance} />
//   //       </div>
//   //       <div className="metrics">
//   //         {" "}
//   //         <div className="metric-box">
//   //           {" "}
//   //           <div className="metric-icon">
//   //             {" "}
//   //             <ArrowUpCircle size={32} color="#b6bbc1" /> <h4>Total Funding</h4>
//   //           </div>{" "}
//   //           <p>₦{totalFunding.toLocaleString()}</p>{" "}
//   //         </div>{" "}
//   //         <div className="metric-box">
//   //           {" "}
//   //           <div className="metric-icon">
//   //             {" "}
//   //             <RefreshCw size={32} color="#b6bbc1" /> <h4>Total Renewal</h4>
//   //           </div>{" "}
//   //           <p>₦{totalRenewal.toLocaleString()}</p>{" "}
//   //         </div>{" "}
//   //         <div className="metric-box">
//   //           {" "}
//   //           <div className="metric-icon">
//   //             {" "}
//   //             <ArrowDownCircle size={32} color="#b6bbc1" />{" "}
//   //             <h4>Total Withdrawal</h4>
//   //           </div>{" "}
//   //           <p>₦{totalWithdrawal.toLocaleString()}</p>{" "}
//   //         </div>{" "}
//   //         <div className="metric-box">
//   //           {" "}
//   //           <div className="metric-icon">
//   //             {" "}
//   //             <Database size={32} color="#b6bbc1" /> <h4>Total in System</h4>
//   //           </div>{" "}
//   //           <p>₦{totalInSystem.toLocaleString()}</p>{" "}
//   //         </div>{" "}
//   //       </div>
//   //       <div className="wallettabs">
//   //         {["All", "Funding", "Renewal", "Withdrawal"].map((tab) => (
//   //           <button
//   //             key={tab}
//   //             className={`wallettab-button tab-${tab.toLowerCase()} ${
//   //               activeTab === tab ? "active" : ""
//   //             }`}
//   //             onClick={() => setActiveTab(tab)}
//   //           >
//   //             {tab}
//   //           </button>
//   //         ))}
//   //       </div>

//   //       {loading ? (
//   //         <p>Loading wallet history...</p>
//   //       ) : error ? (
//   //         <p className="error-message">{error}</p>
//   //       ) : (
//   //         <div className="wallet-history">
//   //           {currentHistory.length > 0 ? (
//   //             currentHistory.map((item) =>
//   //               item.type === "Funding" ? (
//   //                 <Funding key={item.id} transaction={item} />
//   //               ) : item.type === "Renewal" ? (
//   //                 <Renewal key={item.id} transaction={item} />
//   //               ) : (
//   //                 <div
//   //                   key={item.id}
//   //                   className={`history-box ${item.type.toLowerCase()}`}
//   //                 >
//   //                   <p>₦{item.amount.toLocaleString()}</p>
//   //                   <span>{new Date(item.date).toLocaleDateString()}</span>
//   //                 </div>
//   //               )
//   //             )
//   //           ) : (
//   //             <p>No history found.</p>
//   //           )}
//   //         </div>
//   //       )}

//   //       <div className="pagination">
//   //         <button
//   //           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//   //           disabled={currentPage === 1}
//   //         >
//   //           <ChevronLeft size={18} />
//   //         </button>
//   //         <button
//   //           onClick={() =>
//   //             setCurrentPage((prev) =>
//   //               indexOfLastItem < filteredHistory.length ? prev + 1 : prev
//   //             )
//   //           }
//   //           disabled={indexOfLastItem >= filteredHistory.length}
//   //         >
//   //           <ChevronRight size={18} />
//   //         </button>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );
// };

export default WalletPage;
