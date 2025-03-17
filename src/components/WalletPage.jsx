import "../styles/WalletPage.css";
import { GoArrowSwitch, GoArrowDownLeft, GoArrowUpRight } from "react-icons/go";
import { RiHome3Line } from "react-icons/ri";
import { GrPowerCycle } from "react-icons/gr";
import { FaCreditCard } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";
import { CiUser } from "react-icons/ci";

const WalletPage = () => {
  return (
    <div className="page-container">



      <div >
        <h1 className="wallet-page-header">Wallet balance</h1>
        <p className="sub-text-header">$500.<span className="sub-text-header-gray">00</span></p>
      </div>
      <div>
        <h2 className="wallet-page-header">Wallet History</h2>
        <div className="wallet-history-wrapper">

          <div className="wallet-history-card">
            <div className="icon-wrapper">
              <GoArrowDownLeft color="#00ADEF" />

            </div>

            <div className="bottom-history-div">

              <span>
                Total Funding
              </span>
              <p>
                $220,000
              </p>
            </div>


          </div>

          <div className="wallet-history-card">
            <div className="icon-wrapper">
              <GrPowerCycle color="#00ADEF" />
            </div>

            <div className="bottom-history-div">

              <span>
                Total Renewal
              </span>
              <p>
                $65,000
              </p>
            </div>


          </div>
          <div className="wallet-history-card">
            <div className="icon-wrapper">
              <GoArrowUpRight color="#00ADEF" />
            </div>

            <div className="bottom-history-div">

              <span>
                Total Withdrawal
              </span>
              <p>
                $85,000
              </p>
            </div>


          </div>
          <div className="wallet-history-card">
            <div className="icon-wrapper">
              <GoArrowSwitch color="#00ADEF" />
            </div>

            <div className="bottom-history-div">

              <span>
                Total in System
              </span>
              <p>
                $185,000
              </p>
            </div>


          </div>
        </div>


      </div>

      <div >

        <p className="details-header">Transaction Details</p>
        <div className="transaction-div">
          <div  className="transaction-card">
            <div className="icon-text-wrapper">
              <div className="icon-wrapper">

                <GoArrowDownLeft color="#446608" />
              </div>
              <p className="sub-text-header-gray">31/1/2025</p>



            </div>
              <p className="text-color">$100,000</p>
          </div>

          <div  className="transaction-card">
            <div className="icon-text-wrapper">
              <div className="icon-wrapper">

                <GoArrowDownLeft color="#BF0317" />
              </div>
              <p className="sub-text-header-gray">31/1/2025</p>



            </div>
              <p className="text-color">$100,000</p>
          </div>

          <div  className="transaction-card">
            <div className="icon-text-wrapper">
              <div className="icon-wrapper">

                <GoArrowDownLeft color="#446608" />
              </div>
              <p className="sub-text-header-gray">31/1/2025</p>



            </div>
              <p className="text-color">$100,000</p>
          </div>

          <div  className="transaction-card">
            <div className="icon-text-wrapper">
              <div className="icon-wrapper">

                <GoArrowSwitch color="#E29946" />
              </div>
              <p className="sub-text-header-gray">31/1/2025</p>



            </div>
              <p className="text-color">$100,000</p>
          </div>
        </div>
      </div>

      <div className="footer-icons-div">
      <div className="footer-icons">

      <RiHome3Line color="#5E5E5E" />
      <FaCreditCard  color="#5E5E5E" />
      <IoNotificationsOutline color="#5E5E5E" />
      <CiUser color="#5E5E5E" />
      </div>
    </div>
    </div>
  )
}

export default WalletPage

