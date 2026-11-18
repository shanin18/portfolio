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
      <Toaster
        theme="dark"
        position="bottom-right"
        closeButton
        toastOptions={{
          style: {
            background: "rgba(20,18,16,0.96)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: "#f1f5f9",
            fontFamily: "Manrope, sans-serif",
            borderRadius: "14px",
          },
        }}
      />
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
