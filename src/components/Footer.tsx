
import { cn } from "@/lib/utils";
import { ArrowUp, Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSmoothScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const heroElement = document.getElementById('hero');
    
    if (heroElement) {
      heroElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };
  
  return (
    <footer className="py-12 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center space-y-6">
          {/* Copyright text centered */}
          <div className="text-center">
            <p className="font-medium text-foreground">
              © {currentYear} Madhav Sukla Baidya.
            </p>
            <p className="text-sm text-foreground/70 mt-1">
              All rights reserved.
            </p>
          </div>
          
          {/* Social links */}
          <div className="flex space-x-8">
            <a
              href="https://github.com/MadsDoodle"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform duration-200"
              aria-label="Github"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform duration-200"
              aria-label="Twitter"
            >
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/madhav-sukla-baidya-20a151285/?originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 hover:text-primary transition-colors hover:scale-110 transform duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      
      <a
        href="#hero"
        onClick={handleSmoothScrollToTop}
        className={cn(
          "fixed bottom-6 right-6 p-3 rounded-full",
          "bg-primary/10 hover:bg-primary/20",
          "transition-all duration-300 hover:shadow-lg hover:scale-110",
          "cursor-pointer z-20"
        )}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5 text-primary" />
      </a>
    </footer>
  );
};

export default Footer;
