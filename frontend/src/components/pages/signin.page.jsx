import { SignIn } from "@clerk/clerk-react";
import { DefaultLayout } from "../layouts/default.layout.jsx";
import { Loader } from "../atoms/loader.comp.jsx";

export function SignInPage() {
  return (
    <>
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center h-screen">
          <SignIn
            fallback={<Loader />}
            path="/signin"
            forceRedirectUrl={"/dashboard"}
            signUpUrl="/signup"
          />
        </section>
      </DefaultLayout>
    </>
  );
}
