import Aurora from "../animations/aurora.animation.ani.jsx";
import { Link } from "react-router-dom";
import { Button } from "../atoms/button.comp.jsx"; // beibehalten wie bei dir
import { DashboardLayout } from "../layouts/dashboard.layout.jsx";
import { UserAvatar } from "../atoms/user.avatar.com.jsx";
import { UserProfileCard } from "../molecules/user-profile-card.comp.jsx";
import { useProfileText } from "../../hooks/useProfileText.js";

export default function ProfilePage() {
  const { values, loaded } = useProfileText();

  return (
    <>
      <DashboardLayout>
        <section className="p-6 flex justify-center ">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-primary mb-6">
              Dein Profil
            </h1>
          </div>
        </section>

        <section className="p-6 flex justify-center border border-base-300 rounded-lg bg-base-200 max-w-5xl mx-auto">
          {!loaded ? (
            <p>Lade Profil…</p>
          ) : (
            <>
              <section className="flex w-full items-center flex-col align-center gap-4">
                <h2 className="text-xl font-semibold">Beschreibung</h2>
                <p className="whitespace-pre-wrap text-base-content/80 bg-base-100 rounded-lg p-4 w-full min-h-24">
                  {values.bio || "Noch keine Bio hinterlegt."}
                </p>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-base-100 rounded-lg p-4">
                    <span className="block text-sm text-base-content/60">
                      Wohnort
                    </span>
                    <span className="text-lg">{values.location || "—"}</span>
                  </div>
                  <div className="bg-base-100 rounded-lg p-4">
                    <span className="block text-sm text-base-content/60">
                      Beruf
                    </span>
                    <span className="text-lg">{values.job || "—"}</span>
                  </div>
                  <div className="bg-base-100 rounded-lg p-4 md:col-span-2">
                    <span className="block text-sm text-base-content/60">
                      Hobbys
                    </span>
                    <span className="text-lg">{values.hobbies || "—"}</span>
                  </div>
                </div>
              </section>

              <section className="flex w-full items-center flex-col align-center gap-4">
                <UserAvatar />
                <UserProfileCard />
                {/* Email etc. */}
              </section>
            </>
          )}
        </section>

        <div className="p-6 flex flex-row justify-center items-center gap-4">
          <Link to="/profile-settings">
            <Button>Bearbeiten</Button>
          </Link>
        </div>
      </DashboardLayout>
    </>
  );
}
