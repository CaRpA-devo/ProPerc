import { SignIn } from "@clerk/clerk-react";
import { dark } from "@clerk/themes";
import { Loader } from "../atoms/loader.comp.jsx";

export function SignInPage() {
  return (
    <>
      {/* TODO Styling anpassen!!!! */}
      <section className="flex flex-col items-center justify-center h-screen ">
        <SignIn
          appearance={{
            // Basis-Theme, optional: 'light' oder 'dark'
            baseTheme: dark,

            // Globale Variablen für Farben, Schriftarten, Größen
            variables: {
              colorPrimary: "#121212", // Hauptfarbe für Buttons, Links etc.
              colorBackground: "#f4f4f4", // Hintergrundfarbe des SignIn/SignUp-Cards
              fontFamily: "Arial, sans-serif", // Schriftart der gesamten UI
              fontSize: "16px", // Standardgröße des Texts
              borderRadius: "8px", // Rundung von Inputs, Buttons etc.
              spacingUnit: "8px",
              colorText: "#121212",
              card: "min-w-[400px] min-h-[300px] p-8 shadow-2xl opacity-120  rounded-lg ", // Abstand zwischen Elementen
            },

            // Spezifische Elemente individuell stylen
            elements: {
              card: "min-w-[400px] min-h-[300px] p-8 shadow-2xl opacity-120  rounded-lg ",

              // Card-Hintergrund, Padding, Schatten
              formButtonPrimary:
                "bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-md",
              formInput:
                "bg-gray-800 text-white py-2 px-4 rounded-md border border-gray-700",

              formFieldLabel: "  text-sm text-gray-400 mb-1",
            },
          }}
          fallback={<Loader />}
          path="/"
          forceRedirectUrl={"/dashboard"}
          signUpUrl="/"
        />
      </section>
    </>
  );
}
