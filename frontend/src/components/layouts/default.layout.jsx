import { Footer } from "../organisms/footer.org";
import { Hero } from "../organisms/hero.org";
import { Navbar } from "../organisms/navbar.org";

export function DefaultLayout ({children,withHero}) {
    return (
      <>
        <Navbar />
        {withHero && <Hero/>}
        {children}
        <Footer />
      </>
    );
}