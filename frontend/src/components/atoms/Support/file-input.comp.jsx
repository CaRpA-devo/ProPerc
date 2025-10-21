/**
 * FileInput Component für Support-Formulare
 * @param {string} label - Label-Text für das File-Input
 * @param {string} name - Name-Attribut
 * @param {function} onChange - Change Handler
 * @param {string} accept - Akzeptierte Dateitypen
 * @param {number} maxSize - Maximale Dateigröße in MB
 * @param {boolean} disabled - Deaktiviert
 * @param {string} error - Fehlermeldung
 * @param {boolean} multiple - Mehrere Dateien erlauben
 */
export const FileInput = ({
  label = "",
  name,
  onChange,
  accept = "image/*,.pdf,.txt,.log",
  maxSize = 5,
  disabled = false,
  error = "",
  multiple = false,
  id,
  className = "",
}) => {
  const inputId = id || `file-${name}`;
  const errorId = `${inputId}-error`;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    
    // Validiere Dateigröße
    const oversizedFiles = files.filter(
      (file) => file.size > maxSize * 1024 * 1024
    );
    
    if (oversizedFiles.length > 0) {
      const errorMsg = `Datei(en) zu groß. Maximale Größe: ${maxSize}MB`;
      onChange({ target: { name, files: [], error: errorMsg } });
      return;
    }
    
    onChange({ target: { name, files, error: "" } });
  };

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={inputId} className="label">
          <span className="label-text font-medium">{label}</span>
        </label>
      )}
      <input
        id={inputId}
        type="file"
        name={name}
        onChange={handleFileChange}
        accept={accept}
        disabled={disabled}
        multiple={multiple}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`file-input file-input-bordered w-full ${
          error ? "file-input-error" : ""
        } ${disabled ? "file-input-disabled" : ""} ${className}`}
      />
      <label className="label">
        <span className="label-text-alt">
          Max. {maxSize}MB pro Datei ({accept})
        </span>
      </label>
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
