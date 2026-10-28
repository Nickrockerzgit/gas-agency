import { useEffect } from "react";
import { MotionConfig } from "motion/react";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Faq } from "./components/Faq";
import { Footer } from "./components/Footer";
import { Header, TopStrip } from "./components/Header";
import { Hero } from "./components/Hero";
import { Pricing } from "./components/Pricing";
import { Customers, Steps } from "./components/Process";
import { Products } from "./components/Products";
import { Safety } from "./components/Safety";
import { TruckDelivery } from "./components/TruckDelivery";
import { initSmoothScroll } from "./lib/smoothScroll";

export default function App() {
  useEffect(() => initSmoothScroll(), []);
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:font-bold focus:text-primary"
      >
        Skip to main content
      </a>
      <TopStrip />
      <Header />
      <div className="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
        <main id="main">
          <Hero />
          <About />
          <Products />
          <TruckDelivery />
          <Pricing />
          <Customers />
          <Steps />
          <Safety />
          <Faq />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
