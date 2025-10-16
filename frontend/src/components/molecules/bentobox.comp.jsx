import { useCalories } from "../../hooks/useCaloriens";
import "../molecules/bentobox.style.css";
import CalorieChart from "./cloriendiagramm.comp";
import NutritionChart from "./diagramm.comp";

export function BentoBox() {
  const { data, updateCalories } = useCalories([
    { day: "Mo", calories: 2000 },
    { day: "Di", calories: 1800 },
    { day: "Mi", calories: 2200 },
    { day: "Do", calories: 1900 },
    { day: "Fr", calories: 2100 },
  ]);
  return (
    <>
      <section className="p-8 hero-section bg-base-300 border border-primary/20">
        <div className="col-left col">
          <a href="about.html" className="row box-1">
            <div>
              <NutritionChart />
            </div>
          </a>
        </div>

        <div className="col-middle col">
          <a href="#" className="row box-6">
            <div>
              <CalorieChart data={data} />
              <button
                onClick={updateCalories}
                style={{ marginTop: "20px", padding: "10px 20px" }}
              >
                Werte aktualisieren
              </button>
            </div>
          </a>
        </div>
        <div
          className="col-right col 
 
"
        >
          <a href="#" className="row box-4">
            <div>
              <h2>GNARZ</h2>
            </div>
          </a>

          <a href="#" className="row box-5">
            <div>
              <h2>JUNNNGE</h2>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
