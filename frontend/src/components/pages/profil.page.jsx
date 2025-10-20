import Aurora from "../animations/aurora.animation.ani.jsx";

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center relative overflow-hidden">
      {/* Aurora BG*/}
      <div className="absolute inset-0 opacity-20">
        <Aurora
          colorStops={["#2eb872", "#ffd166", "#118ab2"]}
          blend={0.4}
          amplitude={1.2}
          speed={0.3}
        />
      </div>
      {/* Content*/}
      <div className="relative z-10 text-center px-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold text-primary mb-2">Profil</h1>
          <p className="text-base text-base-content">
            Du befindest dich auf der Profil-Seite.
          </p>
        </div>
      </div>
    </div>
  );
}
