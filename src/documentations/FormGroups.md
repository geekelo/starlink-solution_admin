# FormGroup Component Documentation

## Overview

`FormGroup` is a React component designed to wrap form controls and provide consistent layout, spacing, and feedback messaging. It handles error messages, success messages, and helper text in a standardized way.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | string | "" | Additional CSS classes to apply to the container |
| `children` | ReactNode | - | Child components (typically form inputs, labels, etc.) |
| `size` | string | "md" | Size variant of the form group (`'sm'`, `'md'`, `'lg'`) |
| `errorMessage` | string | - | Error message to display (if any) |
| `successMessage` | string | - | Success message to display (if any) |
| `helperText` | string | - | Helper text to provide additional information |

## Basic Usage

### Simple Form Group

```jsx
import React from 'react';
import { FormGroup } from 'path/to/components/FormGroup';

function BasicFormGroupExample() {
  return (
    <FormGroup>
      <label htmlFor="username">Username</label>
      <input 
        id="username" 
        name="username" 
        type="text" 
      />
    </FormGroup>
  );
}
```

### With Helper Text

```jsx
import React from 'react';
import { FormGroup } from 'path/to/components/FormGroup';

function FormGroupWithHelperText() {
  return (
    <FormGroup
      helperText="Your username must be 5-20 characters long"
    >
      <label htmlFor="username">Username</label>
      <input 
        id="username" 
        name="username" 
        type="text" 
      />
    </FormGroup>
  );
}
```

### With Error Message

```jsx
import React, { useState } from 'react';
import { FormGroup } from 'path/to/components/FormGroup';

function FormGroupWithValidation() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (!newValue.trim()) {
      setError('Email is required');
    } else if (!/^\S+@\S+\.\S+$/.test(newValue)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };
  
  return (
    <FormGroup
      errorMessage={error}
      helperText="We'll never share your email with anyone else"
    >
      <label htmlFor="email">Email</label>
      <input 
        id="email" 
        name="email" 
        type="email"
        value={value}
        onChange={handleChange}
      />
    </FormGroup>
  );
}
```

### With Success Message

```jsx
import React from 'react';
import { FormGroup } from 'path/to/components/FormGroup';

function FormGroupWithSuccess() {
  return (
    <FormGroup
      successMessage="Username is available!"
    >
      <label htmlFor="newUsername">Choose Username</label>
      <input 
        id="newUsername" 
        name="newUsername" 
        type="text" 
        value="user123"
      />
    </FormGroup>
  );
}
```

### Different Sizes

```jsx
import React from 'react';
import { FormGroup } from 'path/to/components/FormGroup';

function FormGroupSizesExample() {
  return (
    <>
      <FormGroup size="sm">
        <label htmlFor="small">Small Input</label>
        <input id="small" name="small" type="text" />
      </FormGroup>
      
      <FormGroup size="md">
        <label htmlFor="medium">Medium Input (Default)</label>
        <input id="medium" name="medium" type="text" />
      </FormGroup>
      
      <FormGroup size="lg">
        <label htmlFor="large">Large Input</label>
        <input id="large" name="large" type="text" />
      </FormGroup>
    </>
  );
}
```

## Integration with Form Libraries

### With React Hook Form

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from 'path/to/components/FormGroup';

function RegistrationForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    // Process form data
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        errorMessage={errors.username?.message}
        helperText="Choose a unique username between 5-20 characters"
      >
        <label htmlFor="username">Username</label>
        <input 
          id="username" 
          {...register("username", { 
            required: "Username is required",
            minLength: {
              value: 5,
              message: "Username must be at least 5 characters"
            }
          })}
        />
      </FormGroup>
      
      <FormGroup
        errorMessage={errors.email?.message}
      >
        <label htmlFor="email">Email</label>
        <input 
          id="email" 
          type="email"
          {...register("email", { 
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Please enter a valid email address"
            }
          })}
        />
      </FormGroup>
      
      <button type="submit">Register</button>
    </form>
  );
}
```


## Component Implementation

Below is the implementation of the FormGroup component:

```jsx
export const FormGroup = ({ 
  className = "", 
  children, 
  size = "md", 
  errorMessage, 
  successMessage, 
  helperText 
}) => {
  const groupClasses = [
    'form-group',
    size === 'sm' ? 'form-group-sm' : '',
    size === 'lg' ? 'form-group-lg' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={groupClasses}>
      {children}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      {helperText && <div className="form-helper">{helperText}</div>}
    </div>
  );
};
```

## CSS Classes

The component uses the following CSS classes that you can target for additional customization:

- `.form-group` - Base class for all form groups
- `.form-group-sm` - Applied when size is "sm"
- `.form-group-lg` - Applied when size is "lg"
- `.error-message` - Container for error messages
- `.success-message` - Container for success messages
- `.form-helper` - Container for helper text

## Notes

- You can provide multiple feedback types simultaneously (errorMessage, successMessage, helperText), though typically you would use either errorMessage OR successMessage
- The component uses conditional rendering to only show feedback messages when they are provided
- Custom styling can be applied through the className prop
- The component is designed to be flexible and work with any form inputs as children