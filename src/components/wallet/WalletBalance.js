import { useState, useEffect } from "react";
import { createAxiosInstance } from "../../config/axios";
import '../../styles/Wallet.css'
const WalletBalance = ({ onBalanceFetched }) => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWalletBalance = async () => {
      setLoading(true);
      setError("");

      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get("/api/v1/admin/wallet_histories/admin_balance");
console.log(response)
        const balance = parseFloat(response.data.admin_balance) || 0; // Ensure it's a valid number
        setWalletBalance(balance);
        onBalanceFetched(balance); // Pass balance to parent component
       
      } catch (err) {
        console.error("Failed to fetch wallet balance:", err);
        setError("Failed to load wallet balance.");
      } finally {
        setLoading(false);
      }
    };

    fetchWalletBalance();
  }, [onBalanceFetched]);

  return (
    <div className="wallet-balance">
      {loading ? "Loading balance..." : error ? <span className="error-message">{error}</span> : `Wallet Balance: ₦${walletBalance.toLocaleString()}`}
    </div>
  );
};

export default WalletBalance;
