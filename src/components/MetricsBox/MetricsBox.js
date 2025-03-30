import React from 'react';
import '../../styles/metrics.css';

/**
 * MetricBox - A component to display metric information with an icon
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.icon - The icon to display
 * @param {string} props.title - The title of the metric
 * @param {string|number} props.value - The value to display
 * @param {boolean} props.loading - Whether the data is loading
 * @param {string} props.loadingPlaceholder - Placeholder to show during loading
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 */
export const MetricBox = ({
  icon,
  title,
  value,
  loading = false,
  loadingPlaceholder = "-",
  className = "",
  style = {},
  ...props
}) => {
  const boxClasses = `metric-box ${className}`.trim();
  
  return (
    <div className={boxClasses} style={style} {...props}>
      <div className="metric-header">
        <div className="metric-icon">
          {icon}
        </div>
        <h4 className="metric-title">{title}</h4>
      </div>
      <p className="metric-value">
        {loading ? loadingPlaceholder : value}
      </p>
    </div>
  );
};

export default MetricBox;