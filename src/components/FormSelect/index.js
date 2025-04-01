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