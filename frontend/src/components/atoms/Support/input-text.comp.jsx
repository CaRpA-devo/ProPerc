/**
 * InputText Component für Support-Formulare
 * @param {string} label - Label-Text für das Input-Feld
 * @param {string} type - HTML Input Type (default: "text")
 * @param {string} name - Name-Attribut für das Input-Feld
 * @param {string} value - Aktueller Wert
 * @param {function} onChange - Change Handler
 * @param {string} placeholder - Placeholder-Text
 * @param {boolean} required - Pflichtfeld
 * @param {boolean} disabled - Deaktiviert
 * @param {string} error - Fehlermeldung
 * @param {string} id - ID für aria-describedby
 */
export const InputText = ({
  label = "",
  type = "text",
  name,
  value = "",
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
  id,
  className = "",
}) => {
  const inputId = id || `input-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={inputId} className="label">
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <input
        id={inputId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`input input-bordered w-full ${
          error ? "input-error" : ""
        } ${disabled ? "input-disabled" : ""} ${className}`}
      />
      {error && (
        <label className="label" id={errorId}>
          <span className="label-text-alt text-error" role="alert">
            {error}
          </span>
        </label>
      )}
    </div>
  );
};
