import heroBg from "../../assets/img/herobg.jpg";
import { SignInPage } from "../molecules/signin.page";

export function Hero() {
  return (
    <>
      {/* TODO BG noch bearbeiten Unser Logo einfügen und schrift rausschneiden !!! */}
      <div
        className="hero min-h-screen bg-cover bg-center contrast-110 saturate-125 brightness-105"
        style={{
          backgroundImage: `url(${heroBg} )`,
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        <div className="hero-overlay   ">
          <div
            className=" flex
          justify-between pl-16 pr-16
          "
          >
            <div
              className="max-w-md pt-50
          "
            >
              <h1 className="mb-5 text-5xl font-bold">
                Deine Balance schon gefunden?
              </h1>
              <p className="mb-5">
                Plane hier dein gesundes Leben! Fit & Vital bleiben! Mit{" "}
                <strong>ProPerc</strong> Ernährung, Sport und Gesundheit auf
                einen Blick.
              </p>
            </div>
            {/* TODO hier anpassen das er automatisch rendert ob login oder regestrieren */}
            <SignInPage />
          </div>
        </div>
      </div>
    </>
  );
}
