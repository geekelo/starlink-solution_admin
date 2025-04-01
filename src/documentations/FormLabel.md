# FormLabel Component Documentation

## Overview

`FormLabel` is a simple React component that provides consistent styling for form labels. It serves as a standardized way to label form controls throughout an application.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `htmlFor` | string | - | Value of the HTML "for" attribute that links the label to a form control |
| `children` | ReactNode | - | Content of the label (text or elements) |
| `className` | string | "" | Additional CSS classes to apply to the label |

## Basic Usage

### Simple Label

```jsx
import React from 'react';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function BasicLabelExample() {
  return (
    <div className="form-field">
      <FormLabel htmlFor="username">Username</FormLabel>
      <FormInput
        id="username"
        name="username"
      />
    </div>
  );
}
```

### With Required Field

```jsx
import React from 'react';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function RequiredFieldExample() {
  return (
    <div className="form-field">
      <FormLabel htmlFor="email">
        Email <span className="required-indicator">*</span>
      </FormLabel>
      <FormInput
        id="email"
        name="email"
        type="email"
        required
      />
    </div>
  );
}
```

### With Additional Styling

```jsx
import React from 'react';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function StyledLabelExample() {
  return (
    <div className="form-field">
      <FormLabel 
        htmlFor="password"
        className="bold-label"
      >
        Password
      </FormLabel>
      <FormInput
        id="password"
        name="password"
        type="password"
      />
    </div>
  );
}
```

### With Tooltip or Help Text

```jsx
import React from 'react';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';
import { InfoIcon } from 'path/to/icons';

function LabelWithTooltipExample() {
  return (
    <div className="form-field">
      <FormLabel htmlFor="username">
        Username 
        <span className="tooltip-icon" title="Choose a unique username that is 5-20 characters long">
          <InfoIcon size={16} />
        </span>
      </FormLabel>
      <FormInput
        id="username"
        name="username"
      />
    </div>
  );
}
```

## Integration with Form Components

### With FormGroup

```jsx
import React from 'react';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function IntegratedFormExample() {
  return (
    <FormGroup
      helperText="Enter your full name as it appears on your ID"
    >
      <FormLabel htmlFor="fullName">Full Name</FormLabel>
      <FormInput
        id="fullName"
        name="fullName"
        placeholder="John Doe"
      />
    </FormGroup>
  );
}
```

### With Form Validation

```jsx
import React, { useState } from 'react';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function ValidatedFormExample() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (!newValue.trim()) {
      setError('This field is required');
    } else {
      setError('');
    }
  };
  
  return (
    <FormGroup
      errorMessage={error}
    >
      <FormLabel htmlFor="firstName">
        First Name <span className="required-indicator">*</span>
      </FormLabel>
      <FormInput
        id="firstName"
        name="firstName"
        value={value}
        onChange={handleChange}
        error={!!error}
        required
      />
    </FormGroup>
  );
}
```

### With Form Libraries (React Hook Form)

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function ReactHookFormExample() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        errorMessage={errors.username?.message}
      >
        <FormLabel htmlFor="username">Username</FormLabel>
        <FormInput
          id="username"
          error={!!errors.username}
          {...register("username", { 
            required: "Username is required" 
          })}
        />
      </FormGroup>
      
      <FormGroup
        errorMessage={errors.email?.message}
      >
        <FormLabel htmlFor="email">Email Address</FormLabel>
        <FormInput
          id="email"
          type="email"
          error={!!errors.email}
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address"
            }
          })}
        />
      </FormGroup>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Component Implementation

Below is the implementation of the FormLabel component:

```jsx
export const FormLabel = ({ htmlFor, children, className = "" }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`form-label ${className}`}
    >
      {children}
    </label>
  );
};
```

## CSS Classes

The component uses the following CSS classes that you can target for additional customization:

- `.form-label` - Base class for all form labels
- Any additional classes provided via the className prop

## Notes

- Always use the `htmlFor` attribute to associate the label with a form control by matching it to the control's ID
- The component accepts any valid JSX as children, allowing you to add required indicators, icons, or other elements inside the label
- For accessibility reasons, it's important to have labels for all form controls
- When used with FormGroup and FormInput components, ensure consistent naming conventions for IDs and htmlFor attributes