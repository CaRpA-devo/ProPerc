export function CardWrapper({ children, className = "" }) {
  return (
    <div className={`flex rounded-none sm:rounded-xl w-auto    ${className}`}>
      {children}
    </div>
  );
}
