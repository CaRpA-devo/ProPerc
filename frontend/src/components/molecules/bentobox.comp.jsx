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
      <section class="p-8 hero-section bg-base-300 border border-primary/20">
        <div class="col-left col">
          <a href="about.html" class="row box-1">
            <div>
              <NutritionChart />
            </div>
          </a>
        </div>

        <div class="col-middle col">
          <a href="#" class="row box-6">
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
          class="col-right col 
 
"
        >
          <a href="#" class="row box-4">
            <div>
              <h2>GNARZ</h2>
            </div>
          </a>

          <a href="#" class="row box-5">
            <div>
              <h2>JUNNNGE</h2>
            </div>
          </a>
        </div>
      </section>
    </>
  );
}
