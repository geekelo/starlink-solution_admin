import React from 'react';
import '../../styles/tab.css';

/**
 * TabGroup - A component to display and manage a group of tabs
 * 
 * @param {Object} props
 * @param {string[]} props.tabs - Array of tab names to display
 * @param {string} props.activeTab - Currently active tab
 * @param {Function} props.onTabChange - Function called when a tab is clicked
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.tabPrefix - CSS class prefix for individual tabs (default: "tab")
 */
export const TabGroup = ({
  tabs = [],
  activeTab,
  onTabChange,
  className = "",
  tabPrefix = "tab",
  ...props
}) => {
  const tabGroupClasses = `tab-group ${className}`.trim();
  
  return (
    <div className={tabGroupClasses} {...props}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`tab-button ${tabPrefix}-${tab.toLowerCase()} ${
            activeTab === tab ? "active" : ""
          }`}
          onClick={() => onTabChange(tab)}
          type="button"
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabGroup;