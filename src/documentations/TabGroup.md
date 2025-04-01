# TabGroup Component Documentation

## Overview

`TabGroup` is a flexible React component for displaying and managing tabs in a user interface. It provides a clean, consistent way to implement tab navigation with active state tracking.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tabs` | string[] | [] | Array of tab names to display as buttons |
| `activeTab` | string | - | Currently selected tab (should match one of the names in the tabs array) |
| `onTabChange` | function | - | Callback function that receives the selected tab name when a tab is clicked |
| `className` | string | "" | Additional CSS classes to apply to the container |
| `tabPrefix` | string | "tab" | CSS class prefix for individual tabs for custom styling |
| `...props` | object | - | Additional props to pass to the container div |

## Installation

1. Copy the `TabGroup.jsx` file to your components directory
2. Copy the `TabGroup.css` file to the same location or your styles directory
3. Import and use the component in your project

## Basic Usage

```jsx
import React, { useState } from 'react';
import { TabGroup } from 'path/to/components/TabGroup';

function TabsExample() {
  const [activeTab, setActiveTab] = useState('Home');
  
  return (
    <div className="container">
      <TabGroup
        tabs={['Home', 'Profile', 'Settings']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      {activeTab === 'Home' && <div>Home content</div>}
      {activeTab === 'Profile' && <div>Profile content</div>}
      {activeTab === 'Settings' && <div>Settings content</div>}
    </div>
  );
}
```

## Wallet History Tabs Example

```jsx
import React, { useState, useEffect } from 'react';
import { TabGroup } from 'path/to/components/TabGroup';

function WalletHistoryPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  
  // Fetch transactions
  useEffect(() => {
    // API call to fetch transactions
    // setTransactions(data);
  }, []);
  
  // Filter transactions based on active tab
  useEffect(() => {
    if (activeTab === 'All') {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter(transaction => 
          transaction.type.toLowerCase() === activeTab.toLowerCase()
        )
      );
    }
  }, [activeTab, transactions]);
  
  return (
    <div className="wallet-history">
      <h2>Wallet History</h2>
      
      <TabGroup
        tabs={['All', 'Funding', 'Renewal', 'Withdrawal']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabPrefix="tab"
      />
      
      {/* Display transactions */}
      <div className="transactions-list">
        {filteredTransactions.map(transaction => (
          <div key={transaction.id} className="transaction-item">
            {/* Transaction details */}
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Custom Styling

```jsx
import React, { useState } from 'react';
import { TabGroup } from 'path/to/components/TabGroup';

function CustomStyledTabs() {
  const [activeTab, setActiveTab] = useState('Monthly');
  
  return (
    <div className="reports-container">
      <TabGroup
        tabs={['Daily', 'Weekly', 'Monthly', 'Yearly']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="reports-tabs"
        tabPrefix="report"
      />
      
      {/* Content based on selected tab */}
    </div>
  );
}
```

Add custom CSS for the tabs:

```css
.reports-tabs {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 5px;
  border: none;
}

.reports-tabs .tab-button {
  border-radius: 6px;
  margin: 0 3px;
}

.reports-tabs .tab-button.active {
  background-color: #e9ecef;
  border-bottom-color: transparent;
}

/* Custom colors for specific tabs */
.tab-button.report-daily.active {
  color: #6610f2;
}

.tab-button.report-monthly.active {
  color: #20c997;
}
```

## Full Width Tabs

```jsx
import React, { useState } from 'react';
import { TabGroup } from 'path/to/components/TabGroup';
import './custom-tabs.css'; // Create this file for custom styles

function FullWidthTabs() {
  const [activeTab, setActiveTab] = useState('Details');
  
  return (
    <div className="product-page">
      <TabGroup
        tabs={['Details', 'Specifications', 'Reviews']}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="full-width-tabs"
      />
      
      {/* Content based on selected tab */}
    </div>
  );
}
```

Add this to custom-tabs.css:

```css
.full-width-tabs {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background-color: #dee2e6;
  border: none;
  margin-bottom: 20px;
}

.full-width-tabs .tab-button {
  text-align: center;
  background-color: #ffffff;
  padding: 15px;
  border: none;
}

.full-width-tabs .tab-button.active {
  background-color: #f8f9fa;
  border-bottom: 3px solid #0d6efd;
}
```

## Component Implementation

### TabGroup.jsx

```jsx
import React from 'react';
import './TabGroup.css';

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
```

### TabGroup.css

```css
.tab-group {
  display: flex;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 20px;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
}

.tab-group::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
}

.tab-button {
  padding: 12px 20px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #6c757d;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.tab-button:hover {
  color: #495057;
  background-color: #f8f9fa;
}

.tab-button.active {
  color: #0d6efd;
  border-bottom-color: #0d6efd;
  font-weight: 600;
}

/* Optional: Custom tab colors */
.tab-button.tab-all.active {
  color: #0d6efd;
  border-bottom-color: #0d6efd;
}

.tab-button.tab-funding.active {
  color: #198754;
  border-bottom-color: #198754;
}

.tab-button.tab-renewal.active {
  color: #fd7e14;
  border-bottom-color: #fd7e14;
}

.tab-button.tab-withdrawal.active {
  color: #dc3545;
  border-bottom-color: #dc3545;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .tab-button {
    padding: 10px 15px;
    font-size: 13px;
  }
}
```

## Accessibility Notes

- The component uses semantic `button` elements for proper keyboard navigation and screen reader support
- Make sure to properly implement the content that corresponds to each tab for proper screen reader usage
- For complex tab interfaces, consider adding ARIA roles and attributes for enhanced accessibility:
  ```jsx
  <div className={tabGroupClasses} role="tablist" {...props}>
    {tabs.map((tab) => (
      <button
        key={tab}
        className={`tab-button ${tabPrefix}-${tab.toLowerCase()} ${
          activeTab === tab ? "active" : ""
        }`}
        onClick={() => onTabChange(tab)}
        role="tab"
        aria-selected={activeTab === tab}
        aria-controls={`${tab.toLowerCase()}-panel`}
        id={`${tab.toLowerCase()}-tab`}
        type="button"
      >
        {tab}
      </button>
    ))}
  </div>
  ```

## Notes

- The component handles horizontal scrolling for when there are many tabs on smaller screens
- Tab buttons automatically adjust their styling when in active state
- You can customize the appearance of each individual tab by using the `tabPrefix` prop
- For vertical tabs, you can add custom CSS to change the layout direction