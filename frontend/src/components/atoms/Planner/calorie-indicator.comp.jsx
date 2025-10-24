/**
 * CalorieIndicator - Zeigt Kalorien mit Fortschrittsbalken
 * @param {number} current - Aktuelle Kalorien
 * @param {number} target - Ziel-Kalorien
 * @param {string} size - "sm" | "md" | "lg"
 */
export const CalorieIndicator = ({ current = 0, target = 2000, size = "md" }) => {
  const progress = Math.min((current / target) * 100, 100);
  const remaining = Math.max(target - current, 0);
  
  const getColor = () => {
    if (progress >= 90 && progress <= 110) return "progress-success";
    if (progress > 110) return "progress-error";
    return "progress-warning";
  };

  const sizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="space-y-1">
      <div className={`flex justify-between ${sizes[size]}`}>
        <span className="font-semibold">{Math.round(current)} kcal</span>
        <span className="text-base-content/60">Ziel: {target} kcal</span>
      </div>
      <progress
        className={`progress ${getColor()} w-full`}
        value={progress}
        max="100"
      />
      <div className={`text-right ${sizes[size]} text-base-content/60`}>
        {remaining > 0 ? `${Math.round(remaining)} kcal übrig` : "Ziel erreicht!"}
      </div>
    </div>
  );
};
