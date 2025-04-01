# AppLoader Component Documentation

## Overview

`AppLoader` is a simple React component that displays a loading spinner. It's designed to provide visual feedback during asynchronous operations such as data fetching, form submissions, or page transitions.

## Props

The `AppLoader` component does not accept any props as it's designed to be a self-contained loading indicator.

## Basic Usage

### Simple Loading Indicator

```jsx
import React from 'react';
import { AppLoader } from 'path/to/components/AppLoader';

function LoadingExample() {
  return (
    <div className="page-container">
      <AppLoader />
    </div>
  );
}
```

### Conditional Rendering

```jsx
import React, { useState, useEffect } from 'react';
import { AppLoader } from 'path/to/components/AppLoader';

function DataFetchingExample() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      try {
        // Fetch data from API
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
        setData({ items: ['Item 1', 'Item 2', 'Item 3'] });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="data-container">
      {loading ? (
        <AppLoader />
      ) : (
        <ul>
          {data.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Inside Button During Form Submission

```jsx
import React, { useState } from 'react';
import { AppLoader } from 'path/to/components/AppLoader';

function SubmitButtonExample() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit form data
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <AppLoader /> : 'Submit'}
      </button>
    </form>
  );
}
```

### Full Page Loader

```jsx
import React from 'react';
import { AppLoader } from 'path/to/components/AppLoader';

function FullPageLoaderExample() {
  return (
    <div className="full-page-loader">
      <AppLoader />
      <p className="loading-text">Loading application...</p>
    </div>
  );
}
```

## Use with React Router

```jsx
import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLoader } from 'path/to/components/AppLoader';

// Lazy loaded components
const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Settings = React.lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

## Component Implementation

Below is the implementation of the AppLoader component:

```jsx
export const AppLoader = () => {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};
```

## CSS Classes

The component uses the following CSS classes that you can target for additional customization:

- `.loading-spinner-container` - Container for the spinner, can be used to position the spinner
- `.loading-spinner` - The actual spinner element

## Suggested CSS Styling

For the AppLoader component to work properly, you'll need to add CSS similar to the following:

```css
.loading-spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #3498db; /* Primary color */
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Optional: Full page loader */
.full-page-loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-text {
  margin-top: 10px;
  font-size: 16px;
  color: #333;
}
```

## Notes

- The component is simple by design to be flexible in different contexts
- You can customize the appearance by modifying the CSS classes
- For accessibility, consider adding appropriate ARIA attributes for screen readers
- When using as a full-page loader, ensure it has a high z-index to overlay other content
- The component can be extended to include props for customization (size, color, etc.) if needed