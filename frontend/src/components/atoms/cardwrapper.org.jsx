export function CardWrapper({ children, className = "" }) {
  return (
    <>
      <div
        className={`max-w-md overflow-hidden rounded-none sm:rounded-xl md:max-w-2xl ${className}`}
      >
        {children}
      </div>
    </>
  );
}
