# FormRow Component Documentation

## Overview

`FormRow` is a layout component designed to arrange form elements horizontally in a row. It provides consistent spacing and alignment for form controls, allowing multiple fields to be placed on the same line.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Content to display within the row (typically form fields) |
| `className` | string | "" | Additional CSS classes to apply to the container |

## Basic Usage

### Simple Form Row

```jsx
import React from 'react';
import { FormRow } from 'path/to/components/FormRow';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function SimpleFormRowExample() {
  return (
    <FormRow>
      <FormGroup>
        <FormLabel htmlFor="firstName">First Name</FormLabel>
        <FormInput id="firstName" name="firstName" />
      </FormGroup>
      
      <FormGroup>
        <FormLabel htmlFor="lastName">Last Name</FormLabel>
        <FormInput id="lastName" name="lastName" />
      </FormGroup>
    </FormRow>
  );
}
```

### Uneven Column Widths

```jsx
import React from 'react';
import { FormRow } from 'path/to/components/FormRow';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function UnevenColumnsExample() {
  return (
    <FormRow>
      <FormGroup className="form-col-8">
        <FormLabel htmlFor="city">City</FormLabel>
        <FormInput id="city" name="city" />
      </FormGroup>
      
      <FormGroup className="form-col-4">
        <FormLabel htmlFor="zipCode">ZIP Code</FormLabel>
        <FormInput id="zipCode" name="zipCode" />
      </FormGroup>
    </FormRow>
  );
}
```

### With Custom Styling

```jsx
import React from 'react';
import { FormRow } from 'path/to/components/FormRow';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function StyledRowExample() {
  return (
    <FormRow className="highlighted-section">
      <FormGroup>
        <FormLabel htmlFor="creditCard">Credit Card Number</FormLabel>
        <FormInput id="creditCard" name="creditCard" />
      </FormGroup>
      
      <FormGroup>
        <FormLabel htmlFor="expiry">Expiry Date</FormLabel>
        <FormInput id="expiry" name="expiry" placeholder="MM/YY" />
      </FormGroup>
      
      <FormGroup>
        <FormLabel htmlFor="cvv">CVV</FormLabel>
        <FormInput id="cvv" name="cvv" />
      </FormGroup>
    </FormRow>
  );
}
```

### Multiple Rows in a Form

```jsx
import React from 'react';
import { FormRow } from 'path/to/components/FormRow';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function MultiRowFormExample() {
  return (
    <form>
      <FormRow>
        <FormGroup>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <FormInput id="firstName" name="firstName" />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <FormInput id="lastName" name="lastName" />
        </FormGroup>
      </FormRow>
      
      <FormRow>
        <FormGroup>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput id="email" name="email" type="email" />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="phone">Phone</FormLabel>
          <FormInput id="phone" name="phone" type="tel" />
        </FormGroup>
      </FormRow>
      
      <FormRow>
        <FormGroup className="form-full-width">
          <FormLabel htmlFor="address">Address</FormLabel>
          <FormInput id="address" name="address" />
        </FormGroup>
      </FormRow>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

## Integration with Form Libraries

### With React Hook Form

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormRow } from 'path/to/components/FormRow';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function CheckoutForm() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    // Process checkout
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <FormGroup 
          className="form-col-6"
          errorMessage={errors.firstName?.message}
        >
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <FormInput
            id="firstName"
            error={!!errors.firstName}
            {...register("firstName", { required: "First name is required" })}
          />
        </FormGroup>
        
        <FormGroup 
          className="form-col-6"
          errorMessage={errors.lastName?.message}
        >
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <FormInput
            id="lastName"
            error={!!errors.lastName}
            {...register("lastName", { required: "Last name is required" })}
          />
        </FormGroup>
      </FormRow>
      
      <FormRow>
        <FormGroup
          errorMessage={errors.cardNumber?.message}
        >
          <FormLabel htmlFor="cardNumber">Card Number</FormLabel>
          <FormInput
            id="cardNumber"
            error={!!errors.cardNumber}
            {...register("cardNumber", { 
              required: "Card number is required",
              pattern: {
                value: /^[0-9]{16}$/,
                message: "Please enter a valid 16-digit card number"
              }
            })}
          />
        </FormGroup>
        
        <FormGroup
          errorMessage={errors.expiry?.message}
        >
          <FormLabel htmlFor="expiry">Expiry Date</FormLabel>
          <FormInput
            id="expiry"
            placeholder="MM/YY"
            error={!!errors.expiry}
            {...register("expiry", { 
              required: "Expiry date is required",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/[0-9]{2}$/,
                message: "Please use MM/YY format"
              }
            })}
          />
        </FormGroup>
        
        <FormGroup
          errorMessage={errors.cvv?.message}
        >
          <FormLabel htmlFor="cvv">CVV</FormLabel>
          <FormInput
            id="cvv"
            error={!!errors.cvv}
            {...register("cvv", { 
              required: "CVV is required",
              pattern: {
                value: /^[0-9]{3,4}$/,
                message: "CVV must be 3 or 4 digits"
              }
            })}
          />
        </FormGroup>
      </FormRow>
      
      <button type="submit">Complete Purchase</button>
    </form>
  );
}
```

## Responsive Design

```jsx
import React from 'react';
import { FormRow } from 'path/to/components/FormRow';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormInput } from 'path/to/components/FormInput';

function ResponsiveFormExample() {
  return (
    <form>
      {/* 
        Assuming CSS like:
        @media (max-width: 768px) {
          .form-row { flex-direction: column; }
        }
      */}
      <FormRow className="responsive-row">
        <FormGroup>
          <FormLabel htmlFor="email">Email</FormLabel>
          <FormInput id="email" name="email" type="email" />
        </FormGroup>
        
        <FormGroup>
          <FormLabel htmlFor="password">Password</FormLabel>
          <FormInput id="password" name="password" type="password" />
        </FormGroup>
      </FormRow>
      
      <button type="submit">Sign In</button>
    </form>
  );
}
```

## Component Implementation

Below is the implementation of the FormRow component:

```jsx
export const FormRow = ({ children, className = "" }) => {
  return (
    <div className={`form-row ${className}`}>
      {children}
    </div>
  );
};
```

## CSS Classes

The component uses the following CSS classes that you can target for additional customization:

- `.form-row` - Base class for the row container
- Any additional classes provided via the className prop

## Styling Tips

For the FormRow component to work effectively, you should add CSS similar to the following:

```css
.form-row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px; /* Negative margin to counteract padding on columns */
}

.form-row > * {
  flex: 1;
  padding: 0 10px;
  min-width: 0; /* Prevents flex items from overflowing */
}

/* Optional: Column width classes */
.form-col-4 {
  flex: 0 0 33.333333%;
}

.form-col-6 {
  flex: 0 0 50%;
}

.form-col-8 {
  flex: 0 0 66.666667%;
}

.form-full-width {
  flex: 0 0 100%;
}

/* Responsive behavior */
@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }
  
  .form-row > *,
  .form-col-4,
  .form-col-6,
  .form-col-8 {
    flex: 0 0 100%;
    margin-bottom: 15px;
  }
}
```

## Notes

- The FormRow component works best when used with FormGroup components as children
- For responsive forms, consider adding media queries to switch to a vertical layout on smaller screens
- You can create column width classes (as shown in the CSS example) to control the relative width of form fields within a row
- When multiple FormRow components are used in a form, they will stack vertically
- To create a full-width field, you can either use a single FormGroup in a FormRow or apply a full-width class to a FormGroup