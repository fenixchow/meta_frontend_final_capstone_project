
const FormField = ({ children, label, htmlFor, hasError, errorMessage }) => {
  const errorId = `${htmlFor}-error`;
  
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>
        {label}
        {hasError && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {hasError && errorMessage ? 
        <p 
          id={errorId}
          className="form-field-error"
          data-testid="error-message"
          role="alert"
          aria-live="polite"
        >
          {errorMessage}
        </p> : null}
    </div>
  );
};

export default FormField;
