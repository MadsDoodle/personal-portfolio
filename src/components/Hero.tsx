
import TypewriterText from "./TypewriterText";
import { ArrowDown, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import FlowingWaveBackground from "./FlowingWaveBackground";
import { toast } from "@/hooks/use-toast";

const Hero = () => {
  const handleResumeDownload = () => {
    try {
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = "https://drive.google.com/uc?export=download&id=14E9gDjEztnFnp-qP2drPIxOsHaQvku_E";
      link.download = "Madhav Resume.pdf";
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Show success toast
      toast({
        title: "✅ Resume download started",
        description: "Your download should begin shortly.",
      });
    } catch (error) {
      console.error('Download failed:', error);
      toast({
        title: "Download failed",
        description: "Please try again or contact me directly.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center items-center pt-16 pb-8 md:pt-12 md:pb-10 relative overflow-hidden bg-black">
      {/* Flowing wave background */}
      <FlowingWaveBackground />
      
      <div className="container mx-auto px-4 md:px-6 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-4 md:space-y-6 animate-fade-in text-center lg:text-left relative z-20 order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Madhav Sukla Baidya
            </h1>
            
            <div className="h-10 md:h-12">
              <TypewriterText
                strings={[
                  "Innovating with Machine Learning",
                  "Developing AI Powered Applications"
                ]}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-primary font-medium"
              />
            </div>
            
            <p className="max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base md:text-lg text-white/80 leading-relaxed px-2 sm:px-0">
              I'm a passionate AI/ML engineer with experience in leveraging cutting-edge 
              machine learning libraries to build innovative solutions. I enjoy turning 
              ideas into impactful projects and startups, solving real-world problems with 
              intelligent systems.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 justify-center lg:justify-start px-2 sm:px-0">
              <a
                href="#contact"
                className={cn(
                  "btn-primary group",
                  "flex items-center justify-center gap-2 text-sm md:text-base"
                )}
                style={{ scrollBehavior: 'smooth' }}
              >
                Contact Me
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </a>
              <button
                onClick={handleResumeDownload}
                className={cn(
                  "btn-primary bg-transparent border-2 border-primary text-white",
                  "flex items-center justify-center gap-2 hover:bg-primary hover:text-white text-sm md:text-base font-semibold transition-all duration-300 hover:scale-105"
                )}
              >
                Download Resume
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Right side - AI Robot Image */}
          <div className="flex justify-center items-center relative z-10 order-1 lg:order-2">
            <div className="relative w-full max-w-md h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] flex items-center justify-center">
              {/* Animated glow rings */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full border-2 border-purple-500/20 animate-ping opacity-75"></div>
                <div className="absolute w-64 h-64 rounded-full border-2 border-blue-500/20 animate-ping animation-delay-1000 opacity-50"></div>
                <div className="absolute w-96 h-96 rounded-full border border-purple-400/10 animate-pulse"></div>
              </div>
              
              {/* Main robot image with glow effect */}
              <div className="relative z-10 transform hover:scale-105 transition-all duration-500 animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-blue-600/30 rounded-full blur-xl animate-pulse"></div>
                <img 
                  src="/lovable-uploads/ab41af33-0500-479d-8acf-c122817d0ac2.png" 
                  alt="AI Robot Assistant" 
                  className="relative z-10 w-full h-auto max-w-xs md:max-w-sm lg:max-w-md drop-shadow-2xl"
                />
              </div>
              
              {/* Floating particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
                <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse opacity-50"></div>
                <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-bounce opacity-30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <a href="#experience" className="text-white/50 hover:text-primary transition-colors" style={{ scrollBehavior: 'smooth' }}>
          <ArrowDown className="h-5 w-5 md:h-6 md:w-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
