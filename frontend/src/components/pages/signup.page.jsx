import { siteConfig } from "../../../../backend/config/site";
import { MetaTags } from "../atoms/metatags.comp";
import { SignUp } from "@clerk/clerk-react";
import { DefaultLayout } from "../layouts/default.layout";
import { Loader } from "../atoms/loader.comp";
import heroBg from "../../assets/img/heroFruits.jpg";
import { dark } from "@clerk/themes";
export function SignUpPage() {
  return (
    <>
      <MetaTags
        title={siteConfig.meta.signup.title}
        desc={siteConfig.meta.signup.desc}
        bots={siteConfig.meta.signup.bots}
        keywords={siteConfig.meta.signup.keywords}
      />

      <DefaultLayout>
        {" "}
        <div
          className="hero min-h-screen relative overflow-hidden  contrast-110 saturate-125 brightness-105"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        >
          {/* Hero Overlay */}
          <div className="hero-overlay bg-opacity-40 "></div>
          <section className="flex flex-col items-center justify-center h-screen">
            <SignUp
              appearance={{
                baseTheme: dark,
                elements: {
                  formButtonPrimary:
                    "bg-[#FFD166] text-[#1E3A34] hover:scale-105 transition-all duration-300 shadow-lg",
                },
              }}
              fallback={<Loader />}
              path="/signup"
              forceRedirectUrl={"/dashboard"}
              signInUrl="/signin"
            />
          </section>
        </div>
      </DefaultLayout>
    </>
  );
}
