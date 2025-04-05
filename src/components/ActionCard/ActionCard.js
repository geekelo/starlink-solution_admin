import '../../styles/action-card.css'
export const ActionCard = ({ number, title, description, icon, buttonText, onClick, loading }) => {
    return (
      <div className="dashboard-card">
        <div className="icon-container">
          <div className="icon-card">
            {icon}
          </div>
        </div>
        
        <div className="card-title">
          {number && `${number}. `}{title}
        </div>
        
        <p className="card-description">
          {description}
        </p>
        
        <button className="action-button" onClick={onClick} disabled={loading}>
          {loading ? "Processing..." : buttonText}
        </button>
      </div>
    );
  };