/**
 * SubmitButton Component für Support-Formulare
 * @param {React.ReactNode} children - Button-Inhalt
 * @param {boolean} disabled - Deaktiviert
 * @param {boolean} loading - Lade-Status
 * @param {string} type - Button-Type (default: "submit")
 */
export const SubmitButton = ({
  children,
  disabled = false,
  loading = false,
  type = "submit",
  className = "",
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn btn-primary ${loading ? "loading" : ""} ${className}`}
    >
      {loading ? (
        <>
          <span className="loading loading-spinner"></span>
          Wird gesendet...
        </>
      ) : (
        children
      )}
    </button>
  );
};
