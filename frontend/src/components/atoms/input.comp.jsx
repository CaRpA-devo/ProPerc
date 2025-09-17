export const Input = ({
  label = "",
  type = "text",
  placeholder = "",
  value = "",
  onChange,
  disabled = false,
  error = false,
  className = "",
}) => {
  const errorClass = error ? "input-error" : "";

  return (
    <div className="form-control w-full">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`input input-bordered w-full ${errorClass} ${className}`}
      />
    </div>
  );
};
