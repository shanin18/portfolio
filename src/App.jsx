import { Toaster } from "sonner";
import About from "./components/About";
import World from "./components/World";
import Contact from "./components/Contact";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Skills from "./components/Skills";

function App() {
  return (
    <>
      <World />
      <Toaster position="bottom-right" gap={10} offset={24} toastOptions={{ unstyled: true }} />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Process />
      <Projects />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
