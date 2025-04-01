# MetricBox Component Documentation

## Overview

`MetricBox` is a reusable React component designed to display key metrics in a visually appealing card format. Each metric box includes an icon, title, and value, with support for loading states.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `icon` | ReactNode | - | The icon to display (typically an SVG or icon component) |
| `title` | string | - | The title/label for the metric |
| `value` | string/number | - | The value to display for the metric |
| `loading` | boolean | false | Whether the data is in a loading state |
| `loadingPlaceholder` | string | "-" | What to display when in loading state |
| `className` | string | "" | Additional CSS classes to apply |
| `style` | object | {} | Additional inline styles |
| `...props` | object | - | Additional props to pass to the container div |

## Installation

1. Copy the `MetricBox.jsx` file to your components directory
2. Copy the `MetricBox.css` file to the same location or your styles directory
3. Import and use the component in your project

## Basic Usage

```jsx
import React from 'react';
import { MetricBox } from 'path/to/components/MetricBox';
import { ArrowUpCircle } from 'lucide-react'; // or your preferred icon library

function DashboardMetrics() {
  return (
    <div className="metrics-grid">
      <MetricBox
        icon={<ArrowUpCircle size={40} color="#b6bbc1" />}
        title="Total Funding"
        value={`₦${1250000.toLocaleString()}`}
      />
    </div>
  );
}
```

## With Loading State

```jsx
import React, { useState, useEffect } from 'react';
import { MetricBox } from 'path/to/components/MetricBox';
import { Users, DollarSign, BarChart } from 'lucide-react';

function DashboardMetrics() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // Fetch data
        await new Promise(resolve => setTimeout(resolve, 2000));
        setData({
          totalUsers: 1542,
          totalRevenue: 2450000,
          activeSubscriptions: 876
        });
      } catch (error) {
        console.error('Error fetching metrics:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="metrics-container">
      <div className="metrics-grid">
        <MetricBox
          icon={<Users size={40} color="#4c6ef5" />}
          title="Total Users"
          value={data?.totalUsers.toLocaleString()}
          loading={loading}
        />
        
        <MetricBox
          icon={<DollarSign size={40} color="#40c057" />}
          title="Total Revenue"
          value={`₦${data?.totalRevenue.toLocaleString()}`}
          loading={loading}
        />
        
        <MetricBox
          icon={<BarChart size={40} color="#f76707" />}
          title="Active Subscriptions"
          value={data?.activeSubscriptions.toLocaleString()}
          loading={loading}
        />
      </div>
    </div>
  );
}
```

## Custom Styling

```jsx
import React from 'react';
import { MetricBox } from 'path/to/components/MetricBox';
import { TrendingUp } from 'lucide-react';

function CustomStyledMetric() {
  return (
    <MetricBox
      icon={<TrendingUp size={40} color="#ffffff" />}
      title="Growth Rate"
      value="24.8%"
      className="growth-metric"
      style={{ 
        backgroundColor: '#4c6ef5', 
        color: '#ffffff' 
      }}
    />
  );
}
```

To customize the component further, you can add these styles to your CSS:

```css
/* Additional custom styling */
.growth-metric .metric-title,
.growth-metric .metric-value {
  color: #ffffff;
}

.success-metric {
  background-color: #d3f9d8;
  border-left: 4px solid #40c057;
}

.warning-metric {
  background-color: #fff3bf;
  border-left: 4px solid #f59f00;
}

.danger-metric {
  background-color: #ffe3e3;
  border-left: 4px solid #fa5252;
}
```

## Grid Layout Example

For displaying multiple metrics in a grid, you can use this CSS:

```css
.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
```

## Best Practices

1. **Consistency**: Use similar styling and icons across all metric boxes for visual harmony
2. **Clarity**: Keep titles short and descriptive
3. **Accessibility**: Ensure color contrast meets WCAG standards
4. **Responsiveness**: The component is built to be responsive, but test on different screen sizes
5. **Loading State**: Always provide a loading state for metrics that fetch data asynchronously

## Component Implementation

### MetricBox.jsx

```jsx
import React from 'react';
import './MetricBox.css';

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
```

### MetricBox.css

```css
.metric-box {
  background-color: #ffffff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.metric-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.metric-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.metric-icon {
  display: flex;
  align-items: center;
  margin-right: 15px;
}

.metric-title {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #6c757d;
}

.metric-value {
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: #212529;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .metric-box {
    padding: 15px;
  }
  
  .metric-title {
    font-size: 14px;
  }
  
  .metric-value {
    font-size: 22px;
  }
}
```

## Notes

- The component uses flexbox for layout which ensures proper alignment and spacing
- The hover animation provides subtle interactivity for a better user experience
- The box shadow creates a card-like appearance that stands out from the background
- Responsive design ensures the component looks good on all device sizes