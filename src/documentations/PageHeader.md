# PageHeader Component Documentation

## Overview

`PageHeader` is a flexible React component that creates a consistent page header layout with a title on the left and an optional action element on the right. This component is ideal for page headers that need a balance between a clear title and functional elements.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | The page title to display |
| `rightElement` | ReactNode | - | Component to display on the right side (optional) |
| `className` | string | "" | Additional CSS classes |
| `style` | object | {} | Additional inline styles |
| `...props` | object | - | Additional props to pass to the container div |

## Installation

1. Copy the `PageHeader.jsx` file to your components directory
2. Copy the `PageHeader.css` file to the same location or your styles directory
3. Import and use the component in your project

## Basic Usage

### Simple Page Header

```jsx
import React from 'react';
import { PageHeader } from 'path/to/components/PageHeader';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <PageHeader title="Dashboard" />
      
      {/* Page content */}
    </div>
  );
}
```

### With Action Component

```jsx
import React from 'react';
import { PageHeader } from 'path/to/components/PageHeader';
import { AddNewButton } from 'path/to/components/AddNewButton';

function UsersPage() {
  return (
    <div className="users-container">
      <PageHeader 
        title="Users" 
        rightElement={<AddNewButton onClick={() => console.log('Add user')} />}
      />
      
      {/* Users list */}
    </div>
  );
}
```

### With Complex Right Element

```jsx
import React from 'react';
import { PageHeader } from 'path/to/components/PageHeader';
import { SearchInput } from 'path/to/components/SearchInput';
import { FilterDropdown } from 'path/to/components/FilterDropdown';

function ProductsPage() {
  return (
    <div className="products-container">
      <PageHeader 
        title="Products" 
        rightElement={
          <div className="header-controls">
            <SearchInput placeholder="Search products..." />
            <FilterDropdown options={[
              { label: 'All', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'Archived', value: 'archived' }
            ]} />
          </div>
        }
      />
      
      {/* Products list */}
    </div>
  );
}
```

### Wallet History Example

```jsx
import React, { useState } from 'react';
import { PageHeader } from 'path/to/components/PageHeader';
import { WalletBalance } from 'path/to/components/WalletBalance';

function WalletHistoryPage() {
  const [walletBalance, setWalletBalance] = useState(0);
  
  return (
    <div className="wallet-container">
      <PageHeader 
        title="Wallet History" 
        rightElement={<WalletBalance onBalanceFetched={setWalletBalance} />}
      />
      
      {/* Wallet transactions list */}
    </div>
  );
}
```

## Custom Styling

```jsx
import React from 'react';
import { PageHeader } from 'path/to/components/PageHeader';
import { ExportButton } from 'path/to/components/ExportButton';

function ReportsPage() {
  return (
    <div className="reports-container">
      <PageHeader 
        title="Financial Reports" 
        rightElement={<ExportButton />}
        className="reports-header"
        style={{ 
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          padding: '16px 20px',
          borderBottom: 'none'
        }}
      />
      
      {/* Reports data */}
    </div>
  );
}
```

## Responsive Behavior

The component is designed to be responsive:
- On larger screens, the title appears on the left and the action element on the right
- On smaller screens (below 768px), the layout changes to a vertical stack with the title on top and the action element below

## Component Implementation

### PageHeader.jsx

```jsx
import React from 'react';
import './PageHeader.css';

export const PageHeader = ({
  title,
  rightElement,
  className = "",
  style = {},
  ...props
}) => {
  const headerClasses = `page-header ${className}`.trim();
  
  return (
    <div className={headerClasses} style={style} {...props}>
      <h2 className="page-title">{title}</h2>
      {rightElement && (
        <div className="header-action">
          {rightElement}
        </div>
      )}
    </div>
  );
};

export default PageHeader;
```

### PageHeader.css

```css
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  margin-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
}

.page-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #212529;
}

.header-action {
  display: flex;
  align-items: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    padding-bottom: 16px;
  }
  
  .header-action {
    width: 100%;
    justify-content: flex-start;
  }
}
```

## Notes

- The component uses flexbox for layout to ensure proper alignment and spacing
- The responsive design ensures usability on mobile devices
- You can pass any React component as the `rightElement` prop
- The component is styled with a subtle bottom border by default, which can be overridden
- Additional CSS can be applied for custom styling through the `className` and `style` props