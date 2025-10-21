/**
 * TextArea Component für Support-Formulare
 * @param {string} label - Label-Text für das Textarea-Feld
 * @param {string} name - Name-Attribut für das Textarea-Feld
 * @param {string} value - Aktueller Wert
 * @param {function} onChange - Change Handler
 * @param {string} placeholder - Placeholder-Text
 * @param {boolean} required - Pflichtfeld
 * @param {boolean} disabled - Deaktiviert
 * @param {string} error - Fehlermeldung
 * @param {number} minLength - Minimale Zeichenanzahl
 * @param {number} rows - Anzahl der Zeilen
 * @param {string} id - ID für aria-describedby
 */
export const TextArea = ({
  label = "",
  name,
  value = "",
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  error = "",
  minLength,
  rows = 5,
  id,
  className = "",
}) => {
  const textareaId = id || `textarea-${name}`;
  const errorId = `${textareaId}-error`;
  const charCountId = `${textareaId}-charcount`;
  const currentLength = value.length;

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={textareaId} className="label">
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <textarea
        id={textareaId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        minLength={minLength}
        rows={rows}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={
          error ? errorId : minLength ? charCountId : undefined
        }
        className={`textarea textarea-bordered w-full ${
          error ? "textarea-error" : ""
        } ${disabled ? "textarea-disabled" : ""} ${className}`}
      />
      <div className="label">
        {error && (
          <span
            id={errorId}
            className="label-text-alt text-error"
            role="alert"
          >
            {error}
          </span>
        )}
        {!error && minLength && (
          <span
            id={charCountId}
            className={`label-text-alt ml-auto ${
              currentLength < minLength ? "text-warning" : "text-success"
            }`}
          >
            {currentLength}/{minLength} Zeichen
          </span>
        )}
      </div>
    </div>
  );
};
