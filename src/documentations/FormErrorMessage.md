# FormErrorMessage Component Documentation

## Overview

`FormErrorMessage` is a simple React component designed to display error messages in forms. It conditionally renders an error message paragraph with appropriate styling.

## Installation

Ensure that you have the necessary style file imported:

```jsx
import { FormErrorMessage } from 'path/to/components/FormErrorMessage';
// The component will automatically import the required CSS
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `message` | string | - | The error message to display. If empty or null, nothing will be rendered. |

## Basic Usage

### Simple Error Display

```jsx
import React from 'react';
import { FormErrorMessage } from 'path/to/components/FormErrorMessage';

function FormFieldExample() {
  return (
    <div className="form-field">
      <label htmlFor="username">Username</label>
      <input 
        id="username" 
        name="username" 
        type="text" 
      />
      <FormErrorMessage message="Username is required" />
    </div>
  );
}
```

### Conditional Error Display

```jsx
import React, { useState } from 'react';
import { FormErrorMessage } from 'path/to/components/FormErrorMessage';

function ValidatedFormField() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // Validate on change
    if (!newValue.trim()) {
      setError('This field is required');
    } else {
      setError('');
    }
  };
  
  return (
    <div className="form-field">
      <label htmlFor="email">Email</label>
      <input 
        id="email" 
        name="email" 
        type="email" 
        value={value}
        onChange={handleChange}
        className={error ? 'input-error' : ''}
      />
      <FormErrorMessage message={error} />
    </div>
  );
}
```

### With Form Library (Example with React Hook Form)

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormErrorMessage } from 'path/to/components/FormErrorMessage';

function LoginForm() {
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
      <div className="form-field">
        <label htmlFor="username">Username</label>
        <input 
          id="username" 
          {...register("username", { required: "Username is required" })}
          className={errors.username ? 'input-error' : ''}
        />
        <FormErrorMessage message={errors.username?.message} />
      </div>
      
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <input 
          id="password" 
          type="password"
          {...register("password", { 
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters"
            }
          })}
          className={errors.password ? 'input-error' : ''}
        />
        <FormErrorMessage message={errors.password?.message} />
      </div>
      
      <button type="submit">Login</button>
    </form>
  );
}
```

## Component Implementation

Below is the implementation of the FormErrorMessage component:

```jsx
import '../../styles/error.css'

const FormErrorMessage = ({ message }) => {
  if (!message) return null;
  
  return <p className="error">{message}</p>;
};

export default FormErrorMessage;
```

Note: There appears to be a small typo in the class name in the original code. It uses `.error` (with a dot prefix) instead of just `error`. The correct implementation should use `className="error"` without the dot.

## CSS Classes

The component uses the following CSS class that you can target for additional customization:

- `.error` - Applied to the paragraph element displaying the error message

## Notes

- The component renders nothing (`null`) when the `message` prop is empty, undefined, or null
- For proper styling, ensure that the `error.css` stylesheet is correctly imported and contains styles for the `.error` class
- This component is designed to work with any form validation approach, including manual validation and form libraries like Formik or React Hook Form