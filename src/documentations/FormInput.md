# FormInput Component Documentation

## Overview

`FormInput` is a versatile React component for rendering form input fields with enhanced features like validation states, icons, and consistent styling. It provides a standardized way to create text inputs with various configurations.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | - | HTML ID attribute for the input |
| `name` | string | - | Name attribute for the input |
| `type` | string | "text" | Input type attribute (e.g., "text", "email", "password") |
| `placeholder` | string | - | Placeholder text for the input |
| `value` | string/number | - | Current value of the input |
| `onChange` | function | - | Event handler for value changes |
| `disabled` | boolean | false | Whether the input is disabled |
| `className` | string | "" | Additional CSS classes to apply |
| `error` | boolean | false | Whether the input has an error state |
| `valid` | boolean | false | Whether the input has a valid state |
| `required` | boolean | false | Whether the input is required |
| `icon` | ReactNode | null | Icon element to display with the input |
| `iconPosition` | string | "left" | Position of the icon ("left" or "right") |
| `...props` | object | - | Additional props to pass to the input element |

## Basic Usage

### Simple Text Input

```jsx
import React, { useState } from 'react';
import { FormInput } from 'path/to/components/FormInput';

function SimpleInputExample() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <FormInput
      id="username"
      name="username"
      placeholder="Enter your username"
      value={value}
      onChange={handleChange}
    />
  );
}
```

### Different Input Types

```jsx
import React from 'react';
import { FormInput } from 'path/to/components/FormInput';

function InputTypesExample() {
  return (
    <div className="form-container">
      <FormInput
        id="name"
        name="name"
        placeholder="Enter your name"
      />
      
      <FormInput
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
      />
      
      <FormInput
        id="password"
        name="password"
        type="password"
        placeholder="Choose a password"
      />
      
      <FormInput
        id="dob"
        name="dob"
        type="date"
      />
      
      <FormInput
        id="quantity"
        name="quantity"
        type="number"
        min="1"
        max="10"
      />
    </div>
  );
}
```

### With Validation States

```jsx
import React, { useState } from 'react';
import { FormInput } from 'path/to/components/FormInput';

function ValidationExample() {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setEmail(newValue);
    
    if (newValue === '') {
      setIsValid(false);
      setHasError(false);
    } else if (validateEmail(newValue)) {
      setIsValid(true);
      setHasError(false);
    } else {
      setIsValid(false);
      setHasError(true);
    }
  };
  
  return (
    <div>
      <FormInput
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={handleChange}
        error={hasError}
        valid={isValid}
        required
      />
      {hasError && <div className="error-text">Please enter a valid email address</div>}
    </div>
  );
}
```

### With Icons

```jsx
import React from 'react';
import { FormInput } from 'path/to/components/FormInput';
import { EmailIcon, SearchIcon, LockIcon } from 'path/to/icons';

function IconsExample() {
  return (
    <div className="form-container">
      <FormInput
        id="search"
        name="search"
        placeholder="Search..."
        icon={<SearchIcon />}
        iconPosition="left"
      />
      
      <FormInput
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        icon={<EmailIcon />}
        iconPosition="left"
      />
      
      <FormInput
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        icon={<LockIcon />}
        iconPosition="right"
      />
    </div>
  );
}
```

### Disabled Input

```jsx
import React from 'react';
import { FormInput } from 'path/to/components/FormInput';

function DisabledInputExample() {
  return (
    <FormInput
      id="readonlyField"
      name="readonlyField"
      value="This field cannot be modified"
      disabled
    />
  );
}
```

## Integration with Form Libraries

### With React Hook Form

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormInput } from 'path/to/components/FormInput';
import { UserIcon, EmailIcon, LockIcon } from 'path/to/icons';

function LoginForm() {
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
      <div className="form-field">
        <label htmlFor="username">Username</label>
        <FormInput
          id="username"
          error={!!errors.username}
          icon={<UserIcon />}
          {...register("username", { required: true })}
        />
        {errors.username && <span className="error">Username is required</span>}
      </div>
      
      <div className="form-field">
        <label htmlFor="email">Email</label>
        <FormInput
          id="email"
          type="email"
          error={!!errors.email}
          icon={<EmailIcon />}
          {...register("email", { 
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          })}
        />
        {errors.email && <span className="error">Valid email is required</span>}
      </div>
      
      <div className="form-field">
        <label htmlFor="password">Password</label>
        <FormInput
          id="password"
          type="password"
          error={!!errors.password}
          icon={<LockIcon />}
          iconPosition="right"
          {...register("password", { required: true, minLength: 8 })}
        />
        {errors.password && (
          <span className="error">
            Password must be at least 8 characters
          </span>
        )}
      </div>
      
      <button type="submit">Login</button>
    </form>
  );
}
```

### With Formik

```jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormInput } from 'path/to/components/FormInput';
import { UserIcon, EmailIcon } from 'path/to/icons';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('Username is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
});

function SignupForm() {
  return (
    <Formik
      initialValues={{ username: '', email: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        // Handle form submission
      }}
    >
      {({ values, handleChange, handleBlur, errors, touched }) => (
        <Form>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <FormInput
              id="username"
              name="username"
              placeholder="Choose a username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.username && !!errors.username}
              icon={<UserIcon />}
            />
            {touched.username && errors.username && (
              <div className="error">{errors.username}</div>
            )}
          </div>
          
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <FormInput
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && !!errors.email}
              icon={<EmailIcon />}
            />
            {touched.email && errors.email && (
              <div className="error">{errors.email}</div>
            )}
          </div>
          
          <button type="submit">Sign Up</button>
        </Form>
      )}
    </Formik>
  );
}
```

## Component Implementation

Below is the implementation of the FormInput component:

```jsx
export const FormInput = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  disabled = false,
  className = "",
  error = false,
  valid = false,
  required = false,
  icon = null,
  iconPosition = "left",
  ...props
}) => {
  const inputClasses = [
    'form-input',
    error ? 'has-error' : '',
    valid ? 'is-valid' : '',
    icon && iconPosition === 'left' ? 'form-input-with-icon-left' : '',
    icon && iconPosition === 'right' ? 'form-input-with-icon-right' : '',
    className
  ].filter(Boolean).join(' ');
  
  if (icon) {
    return (
      <div className="input-icon-wrapper">
        {iconPosition === 'left' && <span className="input-icon-left">{icon}</span>}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          required={required}
          className={inputClasses}
          {...props}
        />
        {iconPosition === 'right' && <span className="input-icon-right">{icon}</span>}
      </div>
    );
  }
  
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={inputClasses}
      {...props}
    />
  );
};
```

## CSS Classes

The component uses the following CSS classes that you can target for additional customization:

- `.form-input` - Base class for all input elements
- `.has-error` - Applied when the input has an error state
- `.is-valid` - Applied when the input has a valid state
- `.form-input-with-icon-left` - Applied when input has left-positioned icon
- `.form-input-with-icon-right` - Applied when input has right-positioned icon
- `.input-icon-wrapper` - Container for input with icon
- `.input-icon-left` - Container for left-positioned icon
- `.input-icon-right` - Container for right-positioned icon

## Notes

- The component conditionally renders a wrapper `div` only when an icon is present
- You can set both `error` and `valid` states to `false` for a neutral state
- All additional props are spread to the underlying HTML input element
- For inputs with icons, the component adds appropriate classes to ensure proper spacing and alignment
- The component is designed to be integrated with form libraries like React Hook Form and Formik