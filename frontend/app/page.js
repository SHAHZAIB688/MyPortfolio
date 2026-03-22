import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Services from "../components/Services";
import HireMe from "../components/HireMe";
import Contact from "../components/Contact";
import GitHub from "../components/GitHub";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Services />
      <HireMe />
      <Contact />
      <GitHub />
      <Testimonials />
    </main>
  );
}
