export const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  onClick,
  type = "button",
  className = "",
}) => {
  const variants = {
    primary: "btn-primary", // Cyan/Blue
    secondary: "btn-secondary", // Grün/Teal
    accent: "btn-accent", // Akzent
    success: "btn-success", // Grün
    warning: "btn-warning", // Orange
    error: "btn-error", // Rot
    ghost: "btn-ghost", // Transparent
    outline: "btn-outline",
  };

  const sizes = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-primary ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};
