import Aurora from "../animations/aurora.animation.ani.jsx";
import { DashboardLayout } from "../layouts/dashboard.layout.jsx";
import {
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiDaisyui,
  SiVite,
  SiGithub,
} from "react-icons/si";

export default function AboutUsPage() {
  const teamMembers = [
    {
      name: "Patrick Salgueiro",
      image: "/img/paddy.jpg",
      github: "https://github.com/CaRpA-devo",
    },
    {
      name: "Patrick Kaiser",
      image: "/img/GUYcvwJWgAEIFxc.jpeg",
      github: "https://github.com/PatKaiUI",
    },
    {
      name: "Roy Schubert",
      image: "/img/roy4.webp",
      github: "https://github.com/OuzoPator",
    },
    {
      name: "Çağatay Wilhelm",
      image: "/img/cagatay.jpg",
      github: "https://github.com/CagatayWT",
    },
  ];

  const techStack = [
    { name: "React", icon: <SiReact />, color: "text-sky-400" },
    { name: "Vite", icon: <SiVite />, color: "text-yellow-400" },
    { name: "Node.js", icon: <SiNodedotjs />, color: "text-green-500" },
    { name: "Express", icon: <SiExpress />, color: "text-gray-300" },
    { name: "MongoDB", icon: <SiMongodb />, color: "text-green-600" },
    { name: "TailwindCSS", icon: <SiTailwindcss />, color: "text-cyan-400" },
    { name: "DaisyUI", icon: <SiDaisyui />, color: "text-pink-400" },
    { name: "GitHub", icon: <SiGithub />, color: "text-white" },
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
                <a
                  key={index}
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-base-100 rounded-2xl shadow-lg p-6 w-60 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover mb-4 border-4 border-primary/30 group-hover:border-primary transition-colors"
                  />
                  <h3 className="text-xl font-semibold text-primary group-hover:underline">
                    {member.name}
                  </h3>
                </a>
              ))}
            </div>
            {/* Technologien Section */}
            <section className="mt-16">
              <h2 className="text-3xl font-bold mb-6 text-primary">
                Verwendete Technologien
              </h2>
              <p className="text-base text-base-content/80 mb-10 max-w-xl mx-auto">
                Für die Entwicklung von{" "}
                <span className="font-semibold text-primary">ProPerc</span>{" "}
                setzen wir auf moderne Web-Technologien, um Performance,
                Skalierbarkeit und ein sauberes Design sicherzustellen.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 justify-items-center">
                {techStack.map((tech, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center gap-2 bg-base-100 rounded-xl p-5 w-32 h-32 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <div className={`${tech.color} text-4xl`}>{tech.icon}</div>
                    <span className="text-sm font-medium text-base-content/90">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
