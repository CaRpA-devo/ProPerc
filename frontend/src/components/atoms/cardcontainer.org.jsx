export function CardContainer({ children, className = "" }) {
  return (
    <>
      <div
        className={`max-w-md overflow-hidden rounded-xl shadow-md md:max-w-2xl ${className}`}
      >
        {children}
      </div>
    </>
  );
}
