/**
 * FormRow Component - Wrapper für Formular-Zeilen
 * @param {React.ReactNode} children - Formularfelder
 * @param {string} className - Zusätzliche CSS-Klassen
 */
export const FormRow = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {children}
    </div>
  );
};
