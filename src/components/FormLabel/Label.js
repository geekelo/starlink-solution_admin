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