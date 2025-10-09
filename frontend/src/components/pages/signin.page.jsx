import { siteConfig } from "../../../../backend/config/site";
import { MetaTags } from "../atoms/metatags.comp";
import { SignIn } from "@clerk/clerk-react";
import { DefaultLayout } from "../layouts/default.layout";
import heroBg from "../../assets/img/heroFruits.jpg";
import { Loader } from "../atoms/loader.comp";

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
                elements: {
                  formButtonPrimary:
                    "bg-[#FFD166] text-[#1E3A34] hover:scale-105 transition-all duration-300 shadow-lg",
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
