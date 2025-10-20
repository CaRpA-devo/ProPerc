import { DashboardLayout } from "../layouts/dashboard.layout.jsx";
import { SectionWrapper } from "../atoms/sectionwrapper.comp.jsx";
import { Button } from "../atoms/button.comp.jsx";
import { useProfileText } from "../../hooks/useProfileText.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileSettingsPage() {
  const { values, handleChange, save, reset, loaded } = useProfileText();
  const [savedAt, setSavedAt] = useState(null);
  const navigate = useNavigate();

  if (!loaded) return <p className="p-6">Lade Profileinstellungen…</p>;

  const onSave = () => {
    save();
    setSavedAt(new Date());
  };

  return (
    <DashboardLayout>
      <SectionWrapper className="py-12 px-4">
        <div className="w-full max-w-3xl mx-auto bg-base-200 rounded-xl p-8 shadow-md">
          <h1 className="text-3xl font-bold mb-10 text-center text-primary">
            Profil-Einstellungen
          </h1>

          <div className="space-y-8">
            {/* Beschreibung */}
            <div className="flex flex-col gap-3">
              <label className="text-left text-base font-medium text-base-content">
                Beschreibung / Bio
              </label>
              <textarea
                className="textarea textarea-bordered w-full"
                rows={5}
                placeholder="Schreibe etwas über dich…"
                value={values.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
              />
            </div>

            {/* Wohnort */}
            <div className="flex flex-col gap-3">
              <label className="text-left text-base font-medium text-base-content">
                Wohnort
              </label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="z. B. Berlin"
                value={values.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>

            {/* Beruf */}
            <div className="flex flex-col gap-3">
              <label className="text-left text-base font-medium text-base-content">
                Beruf
              </label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="z. B. Webentwickler:in"
                value={values.job}
                onChange={(e) => handleChange("job", e.target.value)}
              />
            </div>

            {/* Hobbys */}
            <div className="flex flex-col gap-3">
              <label className="text-left text-base font-medium text-base-content">
                Hobbys
              </label>
              <input
                className="input input-bordered w-full"
                type="text"
                placeholder="z. B. Calisthenics, Gaming, Musik…"
                value={values.hobbies}
                onChange={(e) => handleChange("hobbies", e.target.value)}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-10 justify-between items-center">
            <div className="flex gap-3">
              <Button onClick={onSave}>Speichern</Button>
              <Button variant="outline" onClick={reset}>
                Zurücksetzen
              </Button>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={() => navigate(-1)}>
                Abbrechen
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  onSave();
                  navigate("/profile");
                }}
              >
                Speichern & zurück
              </Button>
            </div>
          </div>

          {savedAt && (
            <p className="text-sm text-base-content/70 mt-6 text-right">
              Gespeichert: {savedAt.toLocaleTimeString()}
            </p>
          )}
        </div>
      </SectionWrapper>
    </DashboardLayout>
  );
}
