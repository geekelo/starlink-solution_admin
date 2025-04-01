# SearchInput Component Documentation

## Overview

`SearchInput` is a flexible React component that provides a styled input field with an embedded icon. It's perfect for search inputs, email fields, or any input that benefits from a visual indicator of its purpose.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | string/number | - | Current input value |
| `onChange` | function | - | Function called when input value changes |
| `placeholder` | string | "Search..." | Placeholder text for the input |
| `icon` | ReactNode | `<Search size={24} />` | Custom icon to display |
| `iconColor` | string | "#b6bbc1" | Color for the icon |
| `type` | string | "text" | Input type (text, email, etc.) |
| `className` | string | "" | Additional CSS classes |
| `style` | object | {} | Additional inline styles |
| `disabled` | boolean | false | Whether the input is disabled |
| `...props` | object | - | Additional props to pass to input element |

## Installation

1. Copy the `SearchInput.jsx` file to your components directory
2. Copy the `SearchInput.css` file to the same location or your styles directory
3. Import and use the component in your project

## Basic Usage

### Simple Search Input

```jsx
import React, { useState } from 'react';
import { SearchInput } from 'path/to/components/SearchInput';

function SearchExample() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="search-container">
      <SearchInput
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search items..."
      />
      
      {/* Display search results */}
    </div>
  );
}
```

### Email Input

```jsx
import React, { useState } from 'react';
import { SearchInput } from 'path/to/components/SearchInput';
import { Mail } from 'lucide-react';

function EmailInputExample() {
  const [email, setEmail] = useState('');
  
  return (
    <div className="form-field">
      <label htmlFor="email">Email Address</label>
      <SearchInput
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        icon={<Mail size={24} />}
        iconColor="#6c757d"
      />
    </div>
  );
}
```

### Custom Width

```jsx
import React, { useState } from 'react';
import { SearchInput } from 'path/to/components/SearchInput';

function CustomWidthExample() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="header-search">
      <SearchInput
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search users..."
        style={{ maxWidth: '600px' }}
      />
    </div>
  );
}
```

### With Different Styles

```jsx
import React, { useState } from 'react';
import { SearchInput } from 'path/to/components/SearchInput';
import { Search, Filter } from 'lucide-react';

function StyleVariationsExample() {
  const [searchTerms, setSearchTerms] = useState({
    default: '',
    compact: '',
    rounded: '',
    dark: '',
    minimal: ''
  });
  
  const handleChange = (field) => (e) => {
    setSearchTerms({
      ...searchTerms,
      [field]: e.target.value
    });
  };
  
  return (
    <div className="search-examples">
      <h3>Default</h3>
      <SearchInput
        value={searchTerms.default}
        onChange={handleChange('default')}
        placeholder="Default search"
      />
      
      <h3>Compact</h3>
      <SearchInput
        value={searchTerms.compact}
        onChange={handleChange('compact')}
        placeholder="Compact search"
        className="compact"
        icon={<Search size={18} />}
      />
      
      <h3>Rounded</h3>
      <SearchInput
        value={searchTerms.rounded}
        onChange={handleChange('rounded')}
        placeholder="Rounded search"
        className="rounded"
      />
      
      <h3>Dark Background</h3>
      <SearchInput
        value={searchTerms.dark}
        onChange={handleChange('dark')}
        placeholder="Dark search"
        className="dark"
        iconColor="#495057"
      />
      
      <h3>Minimal</h3>
      <SearchInput
        value={searchTerms.minimal}
        onChange={handleChange('minimal')}
        placeholder="Minimal search"
        className="minimal"
        icon={<Filter size={20} />}
      />
    </div>
  );
}
```

### With User Email Search

```jsx
import React, { useState, useEffect } from 'react';
import { SearchInput } from 'path/to/components/SearchInput';
import { Mail } from 'lucide-react';

function UserEmailSearch() {
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  
  // Simulate fetching users
  useEffect(() => {
    // In a real app, fetch from API
    setUsers([
      { id: 1, email: 'user1@example.com', name: 'User One' },
      { id: 2, email: 'user2@example.com', name: 'User Two' },
      // More users...
    ]);
  }, []);
  
  // Filter users based on email input
  useEffect(() => {
    if (email.trim() === '') {
      setFilteredUsers([]);
    } else {
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(email.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [email, users]);
  
  return (
    <div className="user-search">
      <SearchInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter user email"
        icon={<Mail size={24} />}
        iconColor="#b6bbc1"
      />
      
      {/* Display filtered users */}
      {email.trim() !== '' && (
        <div className="user-results">
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
              <div key={user.id} className="user-item">
                {user.name} ({user.email})
              </div>
            ))
          ) : (
            <div className="no-results">No users found</div>
          )}
        </div>
      )}
    </div>
  );
}
```

## Integrating with Your Code

To replace your current search input with this component:

```jsx
import React, { useState } from 'react';
import { SearchInput } from './components/SearchInput';

function YourComponent() {
  const [email, setEmail] = useState('');
  
  return (
    <div className="your-container">
      <SearchInput
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter user email"
        style={{ maxWidth: '500px' }} // Set your desired width
      />
      
      {/* Rest of your component */}
    </div>
  );
}
```

## Component Implementation

### SearchInput.jsx

```jsx
import React from 'react';
import { Search } from 'lucide-react';
import './SearchInput.css';

export const SearchInput = ({
  value,
  onChange,
  placeholder = "Search...",
  icon = <Search size={24} />,
  iconColor = "#b6bbc1",
  type = "text",
  className = "",
  style = {},
  disabled = false,
  ...props
}) => {
  const containerClasses = `search-input-container ${className}`.trim();
  
  return (
    <div className={containerClasses} style={style}>
      <div className="search-icon" style={{ color: iconColor }}>
        {icon}
      </div>
      <input
        type={type}
        className="search-input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};

export default SearchInput;
```

## CSS Class Variations

The component comes with several built-in style variations that you can apply using the `className` prop:

- `compact`: Smaller height and font size
- `rounded`: Pills-like shape with rounded corners
- `dark`: Gray background instead of white
- `minimal`: No border or background, just the icon and input

You can combine these classes or create your own custom classes.

## Customizing Width

The component's width can be customized in several ways:

1. **Using the style prop**:
   ```jsx
   <SearchInput style={{ maxWidth: '300px' }} />
   ```

2. **Using a custom class**:
   ```jsx
   <SearchInput className="full-width" />
   ```
   
   ```css
   .full-width {
     max-width: 100%;
   }
   ```

3. **Using the parent container**:
   ```jsx
   <div style={{ width: '50%' }}>
     <SearchInput style={{ maxWidth: '100%' }} />
   </div>
   ```

## Accessibility Notes

- The component uses semantic HTML elements
- Input receives focus properly and responds to keyboard interaction
- For better accessibility, consider adding a label with a proper for/id relationship

## Notes

- The component is designed to be flexible and work in different contexts
- The icon is positioned inside the input field for a cleaner look
- The container uses flexbox for proper alignment
- Focus styles are applied to the entire container for better UX
- The component automatically responds to disabled state