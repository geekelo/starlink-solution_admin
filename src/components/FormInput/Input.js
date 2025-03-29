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