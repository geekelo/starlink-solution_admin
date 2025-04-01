# FormSelect Component Documentation

## Overview

`FormSelect` is a React component that provides a styled wrapper for the HTML `<select>` element. It offers consistent styling, validation states, and integrates with other form components to create cohesive and accessible forms.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | - | HTML ID attribute for the select element |
| `name` | string | - | Name attribute for the select element |
| `value` | string/number | - | Current selected value |
| `onChange` | function | - | Event handler for value changes |
| `disabled` | boolean | false | Whether the select is disabled |
| `className` | string | "" | Additional CSS classes to apply |
| `error` | boolean | false | Whether the select has an error state |
| `valid` | boolean | false | Whether the select has a valid state |
| `required` | boolean | false | Whether the select is required |
| `children` | ReactNode | - | Child components (typically `<option>` elements) |
| `...props` | object | - | Additional props to pass to the select element |

## Basic Usage

### Simple Select Component

```jsx
import React, { useState } from 'react';
import { FormSelect } from 'path/to/components/FormSelect';

function SimpleSelectExample() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <FormSelect
      id="country"
      name="country"
      value={value}
      onChange={handleChange}
    >
      <option value="">Select a country</option>
      <option value="us">United States</option>
      <option value="ca">Canada</option>
      <option value="uk">United Kingdom</option>
      <option value="au">Australia</option>
    </FormSelect>
  );
}
```

### With Label and Form Group

```jsx
import React, { useState } from 'react';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormSelect } from 'path/to/components/FormSelect';

function LabeledSelectExample() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <FormGroup>
      <FormLabel htmlFor="state">State</FormLabel>
      <FormSelect
        id="state"
        name="state"
        value={value}
        onChange={handleChange}
        required
      >
        <option value="">Select a state</option>
        <option value="AL">Alabama</option>
        <option value="AK">Alaska</option>
        <option value="AZ">Arizona</option>
        {/* More options... */}
      </FormSelect>
    </FormGroup>
  );
}
```

### With Validation States

```jsx
import React, { useState } from 'react';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormSelect } from 'path/to/components/FormSelect';

function ValidationSelectExample() {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  
  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    
    if (!selectedValue) {
      setError('Please select an option');
    } else {
      setError('');
    }
  };
  
  return (
    <FormGroup
      errorMessage={error}
    >
      <FormLabel htmlFor="category">
        Category <span className="required-indicator">*</span>
      </FormLabel>
      <FormSelect
        id="category"
        name="category"
        value={value}
        onChange={handleChange}
        error={!!error}
        required
      >
        <option value="">Select a category</option>
        <option value="electronics">Electronics</option>
        <option value="clothing">Clothing</option>
        <option value="books">Books</option>
        <option value="home">Home & Kitchen</option>
      </FormSelect>
    </FormGroup>
  );
}
```

### Disabled Select

```jsx
import React from 'react';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormSelect } from 'path/to/components/FormSelect';

function DisabledSelectExample() {
  return (
    <FormGroup
      helperText="This option is currently unavailable"
    >
      <FormLabel htmlFor="subscription">Subscription Plan</FormLabel>
      <FormSelect
        id="subscription"
        name="subscription"
        value="basic"
        disabled
      >
        <option value="basic">Basic Plan</option>
        <option value="premium">Premium Plan</option>
        <option value="enterprise">Enterprise Plan</option>
      </FormSelect>
    </FormGroup>
  );
}
```

### Option Groups

```jsx
import React, { useState } from 'react';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormSelect } from 'path/to/components/FormSelect';

function OptionGroupsExample() {
  const [value, setValue] = useState('');
  
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  
  return (
    <FormGroup>
      <FormLabel htmlFor="vehicle">Vehicle Type</FormLabel>
      <FormSelect
        id="vehicle"
        name="vehicle"
        value={value}
        onChange={handleChange}
      >
        <option value="">Select a vehicle</option>
        <optgroup label="Cars">
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="coupe">Coupe</option>
        </optgroup>
        <optgroup label="Trucks">
          <option value="pickup">Pickup</option>
          <option value="van">Van</option>
        </optgroup>
        <optgroup label="Other">
          <option value="motorcycle">Motorcycle</option>
          <option value="scooter">Scooter</option>
        </optgroup>
      </FormSelect>
    </FormGroup>
  );
}
```

## Integration with Form Libraries

### With React Hook Form

```jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormSelect } from 'path/to/components/FormSelect';

function ProductForm() {
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
        errorMessage={errors.productType?.message}
      >
        <FormLabel htmlFor="productType">Product Type</FormLabel>
        <FormSelect
          id="productType"
          error={!!errors.productType}
          {...register("productType", { 
            required: "Please select a product type" 
          })}
        >
          <option value="">Select a product type</option>
          <option value="physical">Physical Product</option>
          <option value="digital">Digital Product</option>
          <option value="service">Service</option>
        </FormSelect>
      </FormGroup>
      
      <FormGroup
        errorMessage={errors.shippingMethod?.message}
      >
        <FormLabel htmlFor="shippingMethod">Shipping Method</FormLabel>
        <FormSelect
          id="shippingMethod"
          error={!!errors.shippingMethod}
          {...register("shippingMethod", { 
            required: "Please select a shipping method" 
          })}
        >
          <option value="">Select shipping method</option>
          <option value="standard">Standard Shipping</option>
          <option value="express">Express Shipping</option>
          <option value="overnight">Overnight Shipping</option>
        </FormSelect>
      </FormGroup>
      
      <button type="submit">Save Product</button>
    </form>
  );
}
```

### With Formik

```jsx
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { FormGroup } from 'path/to/components/FormGroup';
import { FormLabel } from 'path/to/components/FormLabel';
import { FormSelect } from 'path/to/components/FormSelect';

const validationSchema = Yup.object({
  department: Yup.string()
    .required('Department is required'),
  position: Yup.string()
    .required('Position is required')
});

function JobApplicationForm() {
  return (
    <Formik
      initialValues={{ department: '', position: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
        // Process form data
      }}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <FormGroup
            errorMessage={touched.department && errors.department}
          >
            <FormLabel htmlFor="department">Department</FormLabel>
            <FormSelect
              id="department"
              name="department"
              value={values.department}
              onChange={handleChange}
              error={touched.department && !!errors.department}
            >
              <option value="">Select a department</option>
              <option value="engineering">Engineering</option>
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="support">Customer Support</option>
            </FormSelect>
          </FormGroup>
          
          <FormGroup
            errorMessage={touched.position && errors.position}
          >
            <FormLabel htmlFor="position">Position</FormLabel>
            <FormSelect
              id="position"
              name="position"
              value={values.position}
              onChange={handleChange}
              error={touched.position && !!errors.position}
            >
              <option value="">Select a position</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid-Level</option>
              <option value="senior">Senior</option>
              <option value="lead">Team Lead</option>
            </FormSelect>
          </FormGroup>
          
          <button type="submit">Submit Application</button>
        </Form>
      )}
    </Formik>
  );
}
```

## Component Implementation

Below is the implementation of the FormSelect component:

```jsx
export const FormSelect = ({
  id,
  name,
  value,
  onChange,
  disabled = false,
  className = "",
  error = false,
  valid = false,
  required = false,
  children,
  ...props
}) => {
  return (
    <select
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      required={required}
      className={`form-select ${error ? 'has-error' : ''} ${valid ? 'is-valid' : ''} ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
```

## CSS Classes

The component uses the following CSS classes that you can target for additional customization:

- `.form-select` - Base class for all select elements
- `.has-error` - Applied when the select has an error state
- `.is-valid` - Applied when the select has a valid state
- Any additional classes provided via the className prop

## Notes

- Always provide an empty/placeholder option with a clear label (e.g., "Select an option") to guide users
- Use the `required` prop to indicate fields that must be filled out
- The component follows a similar pattern to FormInput for consistency
- You can set both `error` and `valid` states to `false` for a neutral state
- All additional props are spread to the underlying HTML select element
- For accessibility, always pair FormSelect with a FormLabel that has the matching htmlFor attribute