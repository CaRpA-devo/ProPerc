/**
 * CategorySelect Component für Support-Formulare
 * @param {string} label - Label-Text
 * @param {string} name - Name-Attribut
 * @param {string} value - Aktueller Wert
 * @param {function} onChange - Change Handler
 * @param {boolean} required - Pflichtfeld
 * @param {string} error - Fehlermeldung
 */
export const CategorySelect = ({
  label = "Kategorie",
  name = "category",
  value = "",
  onChange,
  required = true,
  error = "",
  id,
  className = "",
}) => {
  const selectId = id || `select-${name}`;
  const errorId = `${selectId}-error`;

  const categories = [
    { value: "", label: "Bitte auswählen" },
    { value: "account", label: "Account & Anmeldung" },
    { value: "tracking", label: "Tracking & Daten" },
    { value: "billing", label: "Abrechnung & Zahlung" },
    { value: "technical", label: "Technische Probleme" },
    { value: "feature", label: "Feature-Anfrage" },
    { value: "other", label: "Sonstiges" },
  ];

  return (
    <div className="form-control w-full">
      {label && (
        <label htmlFor={selectId} className="label">
          <span className="label-text font-medium">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </span>
        </label>
      )}
      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`select select-bordered w-full ${
          error ? "select-error" : ""
        } ${className}`}
      >
        {categories.map((cat) => (
          <option
            key={cat.value}
            value={cat.value}
            disabled={cat.value === ""}
          >
            {cat.label}
          </option>
        ))}
      </select>
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
