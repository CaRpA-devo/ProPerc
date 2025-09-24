export function CardWrapper({ children, className = "" }) {
  return (
    <>
      <div
        className={`max-w-md overflow-hidden p-0 rounded-none sm:rounded-xl md:max-w-2xl ${className}`}
      >
        {children}
      </div>
    </>
  );
}
