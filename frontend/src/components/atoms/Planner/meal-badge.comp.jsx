/**
 * MealBadge - Badge für Mahlzeittypen
 * @param {string} type - "breakfast" | "lunch" | "dinner" | "snack"
 */
export const MealBadge = ({ type }) => {
  const badges = {
    breakfast: { icon: "🌅", label: "Frühstück", color: "badge-warning" },
    lunch: { icon: "☀️", label: "Mittagessen", color: "badge-success" },
    dinner: { icon: "🌙", label: "Abendessen", color: "badge-info" },
    snack: { icon: "🍿", label: "Snack", color: "badge-accent" },
  };

  const badge = badges[type] || badges.snack;

  return (
    <div className={`badge ${badge.color} gap-1`}>
      <span>{badge.icon}</span>
      <span>{badge.label}</span>
    </div>
  );
};
