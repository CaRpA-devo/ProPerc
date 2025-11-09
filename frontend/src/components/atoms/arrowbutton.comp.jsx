export function ArrowButton({ text, className = "" }) {
  return (
    <button
      className={`btn  border-0 text-emerald-800 font-semibold hover:scale-105 transition-all duration-300 shadow-lg flex items-center ${className}`}
      style={{
        backgroundColor: "#FFD166",
        color: "#1E3A34",
      }}
    >
      {text}
      <svg
        className="w-4 h-4 ml-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}
