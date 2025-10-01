import { DashboardLayout } from "../layouts/dashboard.layout";

import { SectionWrapper } from "../atoms/sectionwrapper.comp";
import { CardWrapper } from "../atoms/cardwrapper.org";
import { Button } from "../atoms/button.comp";
import trackingImg from "../../assets/img/tracking.jpg";
import appfeaturesImg from "../../assets/img/appfeatures.jpg";
import heroFruitsImg from "../../assets/img/heroFruits.jpg";
import { BentoBox } from "../molecules/bentobox.comp";

export function DashboardPage() {
  // Beispielwerte für Statistiken
  const stats = [
    { label: "Kalorien heute", value: 1850, goal: 2200 },
    { label: "Schritte", value: 7200, goal: 10000 },
    { label: "Wasser (L)", value: 1.5, goal: 2.5 },
    { label: "Workouts", value: 2, goal: 3 },
  ];

  return (
    <DashboardLayout>
      <div className=" min-h-screen pb-12">
        {/* Header & User */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 pt-8">
          <div>
            <h1 className="text-4xl font-bold text-emerald-900 mb-1">
              Willkommen zurück!
            </h1>
            <p className="text-emerald-700 text-lg">
              Dein persönliches Gesundheits-Dashboard
            </p>
          </div>
        </div>

        <BentoBox />

        {/* Statistiken */}
        <SectionWrapper className="gap-6 mt-8 flex-wrap">
          {stats.map((stat) => (
            <CardWrapper
              key={stat.label}
              className="bg-white shadow-md p-6 flex-col items-center w-64"
            >
              <div className="text-2xl font-bold text-emerald-800 mb-2">
                {stat.value}
                <span className="text-base font-normal text-gray-500">
                  / {stat.goal}
                </span>
              </div>
              <div className="text-emerald-600 text-lg mb-2">{stat.label}</div>
              <div className="w-full bg-emerald-100 rounded-full h-2.5">
                <div
                  className="bg-emerald-400 h-2.5 rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min((stat.value / stat.goal) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </CardWrapper>
          ))}
        </SectionWrapper>
        {/* Motivierende Visuals & Schnellzugriffe */}
        <SectionWrapper className="gap-8 mt-12 flex-wrap">
          <CardWrapper className="bg-gradient-to-br from-yellow-100 to-yellow-50 shadow-lg p-6 flex-col items-center w-96">
            <img
              src={trackingImg}
              alt="Tracking"
              className="rounded-xl w-full h-40 object-cover mb-4"
            />
            <div className="text-xl font-semibold text-emerald-900 mb-2">
              Tagesübersicht
            </div>
            <div className="text-gray-700 mb-4">
              Behalte deine Kalorien, Aktivitäten und Wasseraufnahme im Blick.
            </div>
            <Button variant="primary" size="md">
              Zum Kalorienrechner
            </Button>
          </CardWrapper>

          <CardWrapper className="bg-gradient-to-br from-emerald-100 to-emerald-50 shadow-lg p-6 flex-col items-center w-96">
            <img
              src={appfeaturesImg}
              alt="Features"
              className="rounded-xl w-full h-40 object-cover mb-4"
            />
            <div className="text-xl font-semibold text-emerald-900 mb-2">
              Deine Ziele
            </div>
            <div className="text-gray-700 mb-4">
              Setze dir neue Ziele und verfolge deinen Fortschritt mit
              motivierenden Analysen.
            </div>
            <Button variant="secondary" size="md">
              Ziele anpassen
            </Button>
          </CardWrapper>

          <CardWrapper className="bg-gradient-to-br from-pink-100 to-pink-50 shadow-lg p-6 flex-col items-center w-96">
            <img
              src={heroFruitsImg}
              alt="Gesund leben"
              className="rounded-xl w-full h-40 object-cover mb-4"
            />
            <div className="text-xl font-semibold text-emerald-900 mb-2">
              Wissen & Tipps
            </div>
            <div className="text-gray-700 mb-4">
              Entdecke gesunde Rezepte, Fitness-Tipps und Expertenwissen.
            </div>
            <Button variant="accent" size="md">
              Zum Wiki
            </Button>
          </CardWrapper>
        </SectionWrapper>
      </div>
    </DashboardLayout>
  );
}
