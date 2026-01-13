import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Renewal from "../components/renewal/Renewal";
import { ViewRenewalModal } from "../components/renewal/ViewRenewal";
import EditRenewalModal from "../components/renewal/EditKitRenewal";
import { AppLoader } from "../components/Loader/loader";
import PageHeader from "../components/PageHeader/PageHeader";
import { FormSelect } from "../components/FormSelect";
import Pagination from "../components/Pagination/Pagination";
import EmptyState from "../components/EmptyState/EmptyState";
import { Package, Search } from "lucide-react";
import SearchWithButton from "../components/SearchInput/SearchInput";
import MetricBox from "../components/MetricsBox/MetricsBox";
import "../styles/Wallet.css";
import { fetchKitRenewals } from "../redux/slice/renewalSlice";

const MonthlyRenewalPage = () => {
  const dispatch = useDispatch();
  const { data: renewalData, loading, error } = useSelector((state) => state.kitRenewals);

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const currentDate = new Date();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const currentYear = currentDate.getFullYear().toString();

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [kitNumber, setKitNumber] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;

  const handleOpenViewModal = (transaction) => {
    setSelectedTransaction(transaction);
    setViewModalOpen(true);
  };

  // Fetch all renewals on mount
  useEffect(() => {
    dispatch(fetchKitRenewals())
      .unwrap()
      .then(() => toast.success("Renewals fetched successfully."))
      .catch(() => toast.error("Failed to fetch renewal records."));
  }, [dispatch]);

  // Filter data based on selected month/year and kitNumber
  const filterRenewals = (data) => {
    const filteredByDate = data.filter((item) => {
      if (!item.date_of_renewal) return false;
      const itemDate = new Date(item.date_of_renewal);
      const itemMonth = (itemDate.getMonth() + 1).toString().padStart(2, "0");
      const itemYear = itemDate.getFullYear().toString();

      return selectedMonth === "All"
        ? itemYear === selectedYear
        : itemMonth === selectedMonth && itemYear === selectedYear;
    });

    const filteredByKit = kitNumber
      ? filteredByDate.filter((item) =>
          item.kit_number.toLowerCase().includes(kitNumber.toLowerCase())
        )
      : filteredByDate;

    return filteredByKit.sort(
      (a, b) => new Date(b.date_of_renewal) - new Date(a.date_of_renewal)
    );
  };

  const filteredRenewals = filterRenewals(renewalData || []);

  const totalPages = Math.ceil(filteredRenewals.length / recordsPerPage) || 1;
  const currentRecords = filteredRenewals.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  // Reset to page 1 whenever filter criteria changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedMonth, selectedYear, kitNumber]);

  return (
    <div className="kit-container-renewal">
      <PageHeader
        title="Monthly Renewals"
        rightElement={
          <div className="kit-select">
            <FormSelect value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              <option value="All">All</option>
              {Array.from({ length: 12 }, (_, index) => {
                const monthValue = (index + 1).toString().padStart(2, "0");
                return (
                  <option key={index} value={monthValue}>
                    {new Date(2025, index).toLocaleString("default", { month: "long" })}
                  </option>
                );
              })}
            </FormSelect>
            <FormSelect value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
              {Array.from({ length: 5 }, (_, index) => {
                const yearValue = (currentDate.getFullYear() - 2 + index).toString();
                return <option key={yearValue} value={yearValue}>{yearValue}</option>;
              })}
            </FormSelect>
          </div>
        }
      />

      <div className="kit-actions-bar">
        <SearchWithButton
          type="text"
          value={kitNumber}
          onChange={(e) => setKitNumber(e.target.value)}
          placeholder="Search by Kit Number"
          icon={<Search size={24} />}
          withButton={false}
          style={{ maxWidth: "600px" }}
        />
      </div>

      <div className="kit-grid-box kit-box">
        <MetricBox
          icon={<Package size={40} color="#b6bbc1" />}
          title="Total Renewals"
          value={filteredRenewals.length}
          loading={loading}
        />
      </div>

      <div className="kit-content-area">
        {loading && <AppLoader />}

        {!loading && filteredRenewals.length > 0 && (
          <div className="kit-grid">
            {currentRecords.map((item) => (
              <div key={item.id} className="kit-renewal-item">
                <Renewal transaction={item} openModal={handleOpenViewModal} />
              </div>
            ))}
          </div>
        )}

        {!loading && filteredRenewals.length === 0 && (
          <EmptyState
            icon={<Search />}
            message={error || "No renewals found for selected month, year, or kit number."}
          />
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        totalItems={filteredRenewals.length}
        itemsPerPage={recordsPerPage}
        showPageNumbers={true}
      />

      {viewModalOpen && selectedTransaction && (
        <ViewRenewalModal
          isOpen={viewModalOpen}
          closeModal={() => setViewModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}

      {editModalOpen && selectedTransaction && (
        <EditRenewalModal
          isOpen={editModalOpen}
          closeModal={() => setEditModalOpen(false)}
          transaction={selectedTransaction}
        />
      )}
    </div>

  );
};

export default MonthlyRenewalPage;
