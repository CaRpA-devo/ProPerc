import { SignUp } from "@clerk/clerk-react";
import { DefaultLayout } from "../layouts/default.layout.jsx";
import { Loader } from "../atoms/loader.comp.jsx";

export function SignUpPage() {
  return (
    <>
      <section className="flex flex-col items-center justify-center h-screen">
        <SignUp
          fallback={<Loader />}
          path="/signup"
          forceRedirectUrl={"/dashboard"}
          signInUrl="/signin"
        />
      </section>
    </>
  );
}
