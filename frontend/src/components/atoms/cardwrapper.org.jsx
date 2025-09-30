export function CardWrapper({ children, className = "" }) {
  return (
    <div
      className={`flex overflow-hidden rounded-none sm:rounded-xl w-auto max-w-full md:max-w-2xl  ${className}`}
    >
      {children}
    </div>
  );
}
