# AppButton Component Documentation

## Overview

The `AppButton` is a versatile and customizable button component designed for React applications. It supports various styles, sizes, states, and customization options to meet a wide range of UI requirements.

## Installation

Ensure that you have the necessary style file and utility functions imported:

```jsx
import { AppButton } from 'path/to/components/AppButton';
// The component will automatically import the required CSS
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `type` | string | 'button' | HTML button type (`'button'`, `'submit'`, `'reset'`) |
| `variant` | string | 'primary' | Button style variant (`'primary'`, `'secondary'`, `'tertiary'`, `'danger'`, `'success'`, `'custom'`) |
| `size` | string | 'md' | Button size (`'sm'`, `'md'`, `'lg'`) |
| `loading` | boolean | false | Whether the button is in a loading state |
| `disabled` | boolean | false | Whether the button is disabled |
| `fullWidth` | boolean | false | Whether the button should take up full width of its container |
| `leftIcon` | ReactNode | null | Icon to display on the left side of the button text |
| `rightIcon` | ReactNode | null | Icon to display on the right side of the button text |
| `onClick` | function | - | Function to call when the button is clicked |
| `className` | string | '' | Additional CSS classes to apply to the button |
| `backgroundColor` | string | '' | Custom background color (only used with `variant="custom"`) |
| `textColor` | string | '' | Custom text color (only used with `variant="custom"`) |
| `hoverColor` | string | '' | Custom hover background color (only used with `variant="custom"`) |
| `loadingText` | string | 'Loading...' | Text to display when the button is in loading state |

## Basic Usage

### Standard Variants

```jsx
import React from 'react';
import { AppButton } from 'path/to/components/AppButton';

function ButtonExample() {
  return (
    <div>
      <AppButton variant="primary">Primary Button</AppButton>
      <AppButton variant="secondary">Secondary Button</AppButton>
      <AppButton variant="tertiary">Tertiary Button</AppButton>
      <AppButton variant="danger">Danger Button</AppButton>
      <AppButton variant="success">Success Button</AppButton>
    </div>
  );
}
```

### Different Sizes

```jsx
import React from 'react';
import { AppButton } from 'path/to/components/AppButton';

function ButtonSizesExample() {
  return (
    <div>
      <AppButton size="sm">Small Button</AppButton>
      <AppButton size="md">Medium Button</AppButton>
      <AppButton size="lg">Large Button</AppButton>
    </div>
  );
}
```

### With Icons

```jsx
import React from 'react';
import { AppButton } from 'path/to/components/AppButton';
import { PlusIcon, ArrowRightIcon } from 'path/to/icons';

function ButtonWithIconsExample() {
  return (
    <div>
      <AppButton leftIcon={<PlusIcon />}>Add Item</AppButton>
      <AppButton rightIcon={<ArrowRightIcon />}>Next Step</AppButton>
      <AppButton 
        leftIcon={<PlusIcon />} 
        rightIcon={<ArrowRightIcon />}
      >
        Add and Proceed
      </AppButton>
    </div>
  );
}
```

### Loading State

```jsx
import React, { useState } from 'react';
import { AppButton } from 'path/to/components/AppButton';

function LoadingButtonExample() {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = () => {
    setIsLoading(true);
    // Simulate an async operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  
  return (
    <AppButton 
      loading={isLoading} 
      onClick={handleClick}
      loadingText="Processing..."
    >
      Submit Form
    </AppButton>
  );
}
```

### Custom Styling

```jsx
import React from 'react';
import { AppButton } from 'path/to/components/AppButton';

function CustomButtonExample() {
  return (
    <div>
      <AppButton 
        variant="custom"
        backgroundColor="#6a0dad"
        textColor="#ffffff"
        hoverColor="#8a2be2"
      >
        Custom Purple Button
      </AppButton>
      
      <AppButton 
        variant="custom"
        backgroundColor="#f5a742"
        textColor="#333333"
        // If hoverColor is not provided, it will auto-generate a darker shade
      >
        Custom Orange Button
      </AppButton>
    </div>
  );
}
```

### Form Submit Button

```jsx
import React from 'react';
import { AppButton } from 'path/to/components/AppButton';

function FormExample() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <AppButton 
        type="submit"
        variant="primary"
        fullWidth
      >
        Submit Form
      </AppButton>
    </form>
  );
}
```

### Disabled State

```jsx
import React from 'react';
import { AppButton } from 'path/to/components/AppButton';

function DisabledButtonExample() {
  return (
    <AppButton disabled>
      This Button is Disabled
    </AppButton>
  );
}
```

## Advanced Usage

### With Event Handlers

```jsx
import React from 'react';
import { AppButton } from 'path/to/components/AppButton';

function EventHandlerExample() {
  const handleClick = () => {
    console.log('Button was clicked!');
    // Perform some action
  };
  
  return (
    <AppButton 
      onClick={handleClick}
      variant="primary"
    >
      Click Me
    </AppButton>
  );
}
```

### Combining Multiple Props

```jsx
import React, { useState } from 'react';
import { AppButton } from 'path/to/components/AppButton';
import { SaveIcon } from 'path/to/icons';

function ComplexButtonExample() {
  const [isSaving, setIsSaving] = useState(false);
  
  const handleSave = () => {
    setIsSaving(true);
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false);
      // Show success message or handle completion
    }, 2000);
  };
  
  return (
    <AppButton 
      variant="success"
      size="lg"
      leftIcon={<SaveIcon />}
      loading={isSaving}
      loadingText="Saving..."
      onClick={handleSave}
      fullWidth
      className="my-custom-save-button"
    >
      Save Changes
    </AppButton>
  );
}
```

## Color Adjustment Utility

The component uses the `adjustColor` utility function to automatically generate hover and active states for custom buttons. This function adjusts a hex color by a percentage:

```javascript
// Example: Darkening a color by 10%
const darkerColor = adjustColor('#3498db', -10); // Results in a 10% darker shade of blue
```

The utility handles:
- Darkening colors (negative percentage)
- Lightening colors (positive percentage)
- Only works with 6-digit hex colors (e.g., #RRGGBB)

## CSS Classes

The component generates the following CSS classes that you can target for additional customization:

- `.app-button` - Base class for all buttons
- `.app-button-{variant}` - Variant-specific styling (e.g., `.app-button-primary`)
- `.app-button-{size}` - Size-specific styling (e.g., `.app-button-md`)
- `.app-button-loading` - Applied when the button is in loading state
- `.app-button-full-width` - Applied when the button should take full width
- `.app-button-spinner` - The loading spinner element
- `.app-button-content` - Wrapper for button content
- `.app-button-text` - The button text
- `.app-button-icon` - Base class for icons
- `.app-button-icon-left` - Left icon container
- `.app-button-icon-right` - Right icon container

## Notes

- When using the `custom` variant, make sure to provide at least the `backgroundColor` prop
- The component automatically calculates hover and active states if not provided
- When in loading state, the button is automatically disabled
- The component spreads any additional props to the underlying HTML button element