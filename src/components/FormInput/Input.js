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
  label,
  ...props
}) => {
  const inputId = id || name;

  const inputElement = (
    <>
      {icon && iconPosition === 'left' && <span className="input-icon-left">{icon}</span>}
      <input
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={[
          'form-input',
          error ? 'has-error' : '',
          valid ? 'is-valid' : '',
          icon && iconPosition === 'left' ? 'form-input-with-icon-left' : '',
          icon && iconPosition === 'right' ? 'form-input-with-icon-right' : '',
          className
        ].filter(Boolean).join(' ')}
        {...props}
      />
      {icon && iconPosition === 'right' && <span className="input-icon-right">{icon}</span>}
    </>
  );

  return (
    <div className="form-group">
      {label && <label htmlFor={inputId} className="form-label">{label}</label>}
      {icon ? (
        <div className="input-icon-wrapper">
          {inputElement}
        </div>
      ) : inputElement}
    </div>
  );
};
