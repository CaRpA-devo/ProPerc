export function SectionWrapper({
  children,
  className = "",
  position = "start",
}) {
  const positionClassMap = {
    start: "sm:justify-start",
    end: "sm:justify-end",
    center: "sm:justify-center",
  };

  return (
    <section
      className={`flex flex-col  items-center justify-center sm:flex-row 
      ${positionClassMap[position] || ""} min-h-content ${className} `}
    >
      {children}
    </section>
  );
}
