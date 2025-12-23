import Header from "~/components/Header";
import Hero from "~/components/Hero";
import Intro from "~/components/Intro";
import Platform from "~/components/Platform";
import PainPoints from "~/components/PainPoints";
import Clients from "~/components/Clients";
import Testimonials from "~/components/Testimonials";
import Solutions from "~/components/Solutions";
import About from "~/components/About";
import CTA from "~/components/CTA";
import Footer from "~/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Platform />
        <PainPoints />
        <Clients />
        <Testimonials ids={[1, 2]} />
        <Solutions />
        <About />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
