/**
 * Label Component für Support-Formulare
 * @param {string} htmlFor - ID des zugehörigen Input-Elements
 * @param {boolean} required - Zeigt Pflichtfeld-Kennzeichnung
 * @param {React.ReactNode} children - Label-Inhalt
 */
export const Label = ({
  htmlFor,
  required = false,
  children,
  className = "",
}) => {
  return (
    <label htmlFor={htmlFor} className={`label ${className}`}>
      <span className="label-text font-medium">
        {children}
        {required && <span className="text-error ml-1">*</span>}
      </span>
    </label>
  );
};
