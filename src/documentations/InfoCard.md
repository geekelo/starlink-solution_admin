# InfoCard Component Documentation

## Overview

`InfoCard` is a flexible React component designed to display structured information in a card layout with icons and labels. It's ideal for displaying transaction details, user information, product specifications, or any data that benefits from a labeled grid layout.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | - | The title of the card |
| `items` | array | [] | Array of objects with information to display |
| `className` | string | "" | Additional CSS classes |
| `active` | boolean | false | Whether the card is in active state |
| `style` | object | {} | Additional inline styles |
| `...props` | object | - | Additional props to pass to the container div |

### Item Object Structure

Each object in the `items` array should have the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `icon` | ReactNode | Icon component to display |
| `label` | string | Label for the information (will be displayed in bold) |
| `value` | string/ReactNode | The value or content to display |
| `className` | string | (Optional) CSS class to apply to the value |

## Installation

1. Copy the `InfoCard.jsx` file to your components directory
2. Copy the `InfoCard.css` file to the same location or your styles directory
3. Import and use the component in your project

## Basic Usage

### Transaction Card Example

```jsx
import React from 'react';
import { InfoCard } from 'path/to/components/InfoCard';
import { ArrowUpCircle, User, CheckCircle, CreditCard, CalendarDays } from 'lucide-react';

function TransactionCard({ transaction }) {
  return (
    <InfoCard
      title="Funding"
      active={true}
      className="funding"
      items={[
        {
          icon: <ArrowUpCircle size={16} />,
          label: "Amount",
          value: `₦${transaction.amount ? parseFloat(transaction.amount).toLocaleString() : "0"}`
        },
        {
          icon: <User size={16} />,
          label: "Email",
          value: transaction.email || "N/A"
        },
        {
          icon: <CheckCircle size={16} />,
          label: "Status",
          value: transaction.status || "Pending",
          className: `status-badge ${transaction.status}`
        },
        {
          icon: <CreditCard size={16} />,
          label: "Reference",
          value: transaction.reference || "N/A"
        },
        {
          icon: <CalendarDays size={16} />,
          label: "Date",
          value: transaction.date ? new Date(transaction.date).toLocaleDateString() : "N/A"
        }
      ]}
    />
  );
}
```

### User Information Card

```jsx
import React from 'react';
import { InfoCard } from 'path/to/components/InfoCard';
import { User, Mail, Phone, MapPin, Briefcase } from 'lucide-react';

function UserInfoCard({ user }) {
  return (
    <InfoCard
      title="User Information"
      className="user-card"
      items={[
        {
          icon: <User size={16} />,
          label: "Name",
          value: user.name
        },
        {
          icon: <Mail size={16} />,
          label: "Email",
          value: user.email
        },
        {
          icon: <Phone size={16} />,
          label: "Phone",
          value: user.phone || "N/A"
        },
        {
          icon: <MapPin size={16} />,
          label: "Location",
          value: user.location || "N/A"
        },
        {
          icon: <Briefcase size={16} />,
          label: "Account Type",
          value: user.accountType || "Standard",
          className: `account-type ${user.accountType?.toLowerCase()}`
        }
      ]}
    />
  );
}
```

### Product Details Card

```jsx
import React from 'react';
import { InfoCard } from 'path/to/components/InfoCard';
import { Package, Tag, BarChart, Clock, Star } from 'lucide-react';

function ProductCard({ product }) {
  return (
    <InfoCard
      title={product.name}
      className="product-card"
      items={[
        {
          icon: <Package size={16} />,
          label: "SKU",
          value: product.sku
        },
        {
          icon: <Tag size={16} />,
          label: "Price",
          value: `$${product.price.toFixed(2)}`
        },
        {
          icon: <BarChart size={16} />,
          label: "Stock",
          value: product.inStock ? "In Stock" : "Out of Stock",
          className: product.inStock ? "in-stock" : "out-of-stock"
        },
        {
          icon: <Clock size={16} />,
          label: "Added",
          value: new Date(product.dateAdded).toLocaleDateString()
        },
        {
          icon: <Star size={16} />,
          label: "Rating",
          value: `${product.rating}/5 (${product.reviewCount} reviews)`
        }
      ]}
    />
  );
}
```

## Transaction List

```jsx
import React from 'react';
import { InfoCard } from 'path/to/components/InfoCard';
import { ArrowUpCircle, ArrowDownCircle, RefreshCw } from 'lucide-react';
import { CheckCircle, AlertCircle, CreditCard, CalendarDays } from 'lucide-react';

function TransactionsList({ transactions }) {
  // Helper function to get the right icon based on transaction type
  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'funding':
        return <ArrowUpCircle size={16} />;
      case 'withdrawal':
        return <ArrowDownCircle size={16} />;
      case 'renewal':
        return <RefreshCw size={16} />;
      default:
        return <CreditCard size={16} />;
    }
  };
  
  return (
    <div className="transactions-list">
      {transactions.map((transaction) => (
        <InfoCard
          key={transaction.id}
          title={transaction.type}
          className={transaction.type.toLowerCase()}
          items={[
            {
              icon: getTypeIcon(transaction.type),
              label: "Amount",
              value: `₦${parseFloat(transaction.amount).toLocaleString()}`
            },
            {
              icon: <CheckCircle size={16} />,
              label: "Status",
              value: transaction.status,
              className: `status-badge ${transaction.status.toLowerCase()}`
            },
            {
              icon: <CreditCard size={16} />,
              label: "Reference",
              value: transaction.reference
            },
            {
              icon: <CalendarDays size={16} />,
              label: "Date",
              value: new Date(transaction.date).toLocaleDateString()
            }
          ]}
        />
      ))}
    </div>
  );
}
```

## Custom Styling

You can customize the appearance of InfoCard components by:

1. Using the `className` prop to apply custom classes
2. Using the `style` prop for inline styles
3. Extending the CSS for specific card types

### Example of Custom CSS Extensions

```css
/* Custom card theme */
.info-card.premium {
  background-color: #f8f9fa;
  border-left-color: #ffc107;
  border-width: 6px;
}

.info-card.premium .info-card-title {
  color: #ffc107;
  font-size: 20px;
}

.info-card.premium .info-icon {
  color: #ffc107;
}

/* Custom grid layout for specific card */
.wide-card .info-grid {
  grid-template-columns: auto 1fr auto 1fr;
}

/* Custom badge styles */
.verification-status.verified {
  background-color: #d1e7dd;
  color: #0f5132;
  padding: 4px 8px;
  border-radius: 4px;
}

.verification-status.unverified {
  background-color: #f8d7da;
  color: #721c24;
  padding: 4px 8px;
  border-radius: 4px;
}
```

## Responsive Design

The component is built with responsive design in mind:

- The grid layout adapts to smaller screens
- Padding and spacing automatically adjust for mobile devices
- You can further customize responsiveness by adding media queries in your CSS

## Component Implementation

### InfoCard.jsx

```jsx
import React from 'react';
import './InfoCard.css';

export const InfoCard = ({
  title,
  items = [],
  className = "",
  active = false,
  style = {},
  ...props
}) => {
  const cardClasses = `info-card ${active ? 'active' : ''} ${className}`.trim();
  
  return (
    <div className={cardClasses} style={style} {...props}>
      {title && <h3 className="info-card-title">{title}</h3>}
      
      <div className="info-grid">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="info-icon">
              {item.icon}
            </div>
            <div className="info-text">
              <strong>{item.label}:</strong>{' '}
              {item.className ? (
                <span className={item.className}>
                  {item.value}
                </span>
              ) : (
                item.value
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
```

### InfoCard.css

The CSS file includes styles for:

- Card layout and appearance
- Grid layout for information items
- Icon styling
- Status badges with various states
- Card variations based on transaction types
- Hover effects
- Responsive adjustments

## Notes

- The component uses CSS Grid for layout, which provides consistent spacing and alignment
- Each information row consists of an icon and a text item with a label and value
- You can use the `active` prop to highlight a specific card
- The component includes predefined styles for status badges (success, pending, failed, etc.)
- Different card types (funding, withdrawal, renewal) have distinct color schemes
- The hover effect adds a subtle animation for better user interaction