import Aurora from "../animations/aurora.animation.ani.jsx";
import { DashboardLayout } from "../layouts/dashboard.layout.jsx";

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "Patrick Salgueiro",

      image: "/img/paddy.jpg",
    },
    {
      name: "Patrick Kaiser",

      image: "/img/GUYcvwJWgAEIFxc.jpeg",
    },
    {
      name: "Roy Schubert",

      image: "/img/roy4.webp",
    },
    {
      name: "Çağatay Wilhelm",

      image: "/img/cagatay.jpg",
    },
  ];

  return (
    <>
      <DashboardLayout>
        <div className="min-h-screen bg-base-200 flex items-center justify-center relative overflow-hidden">
          {/* Aurora BG */}

          <div className="absolute inset-0 opacity-20">
            <Aurora
              colorStops={["#2eb872", "#ffd166", "#118ab2"]}
              blend={0.4}
              amplitude={1.2}
              speed={0.3}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4 py-16 max-w-5xl">
            {/* Titel */}
            <h1 className="text-5xl font-bold text-primary mb-6">Über uns</h1>

            {/* Teamname */}
            <h2 className="text-3xl font-semibold mb-4">Syntax-Sushi</h2>

            {/* Beschreibung */}
            <p className="text-lg text-base-content/80 mb-12 max-w-2xl mx-auto">
              Wir sind ein engagiertes Team aus vier Entwicklern, die gemeinsam
              an <span className="font-semibold text-primary">ProPerc</span>{" "}
              arbeiten – einer App, die bewusste Ernährung und Gesundheit in den
              Mittelpunkt stellt. Unser Ziel ist es, Menschen dabei zu
              unterstützen, ihre Nährstoffzufuhr besser zu verstehen, Vitamine
              und Mineralstoffe im Blick zu behalten und langfristig ein
              ausgewogenes, gesundes Leben zu führen.
            </p>

            {/* Teamcards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-items-center">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="bg-base-100 rounded-2xl shadow-lg p-6 w-60 hover:shadow-xl transition-shadow"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-primary/30"
                  />
                  <h3 className="text-xl font-semibold text-primary">
                    {member.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
