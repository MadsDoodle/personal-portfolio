
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ConstellationBackground from "@/components/ConstellationBackground";
import FloatingSocialBubble from "@/components/FloatingSocialBubble";

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
        <ConstellationBackground />
        <Navbar />
        <main>
          <Hero />
          <Timeline />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <FloatingSocialBubble />
      </div>
    </ThemeProvider>
  );
};

export default Index;
