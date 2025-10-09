import { siteConfig } from "../../../../backend/config/site";
import { MetaTags } from "../atoms/metatags.comp";
import { SignIn } from "@clerk/clerk-react";
import { DefaultLayout } from "../layouts/default.layout";
import heroBg from "../../assets/img/heroFruits.jpg";
import { Loader } from "../atoms/loader.comp";
import { dark } from "@clerk/themes";

export function SignInPage() {
  return (
    <>
      <MetaTags
        title={siteConfig.meta.signin.title}
        desc={siteConfig.meta.signin.desc}
        bots={siteConfig.meta.signin.bots}
        keywords={siteConfig.meta.signin.keywords}
      />
      <DefaultLayout>
        <div
          className="hero min-h-screen relative overflow-hidden  contrast-110 saturate-125 brightness-105"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          {/* Hero Overlay */}
          <div className="hero-overlay bg-opacity-40 "></div>
          <section className="flex flex-col items-center justify-center h-screen">
            <SignIn
              appearance={{
                // Basis-Theme, optional: 'light' oder 'dark'
                baseTheme: dark,
                // Globale Variablen für Farben, Schriftarten, Größen
                variables: {
                  colorPrimary: " #67b957", // Hauptfarbe für Buttons, Links etc.
                  colorBackground: "  ", // Hintergrundfarbe des SignIn/SignUp-Cards
                  fontFamily: "Arial, sans-serif", // Schriftart der gesamten UI
                  fontSize: "16px", // Standardgröße des Texts
                  borderRadius: "8px", // Rundung von Inputs, Buttons etc.
                  spacingUnit: "8px",
                  colorText: "  #171717",
                  /** Textfarbe in Input-Feldern */
                  colorInputText: "#dfe8e4",

                  /** Sekundäre Textfarbe (Labels, Placeholder) */
                  colorTextSecondary: "#dfe8e4",
                  /** Hintergrundfarbe der Input-Felder */
                  colorInputBackground: "rgba(0, 0, 0, 0.3)",
                  // #67b957
                },

                // Spezifische Elemente individuell stylen
                elements: {
                  // Äußere Card
                  card: "card bg-base-100/10 backdrop-blur-md  p-8 text-center  shadow-lg",

                  // Footer Links
                  footer: "text-center  bg-base-100/10 backdrop-blur-md  ",
                },
              }}
              fallback={<Loader />}
              path="/signin"
              forceRedirectUrl={"/dashboard"}
              signUpUrl="/signup"
            />
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}
