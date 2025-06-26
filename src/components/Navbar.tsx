
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    
    // Close mobile menu if open
    setIsOpen(false);
  };
  
  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];
  
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-4xl">
      <nav className={cn(
        "relative rounded-full transition-all duration-300 px-6 py-3",
        "bg-white/10 dark:bg-black/20 backdrop-blur-lg",
        "border border-white/20 dark:border-white/10",
        "shadow-lg shadow-black/5 dark:shadow-white/5",
        scrolled 
          ? "bg-white/20 dark:bg-black/30 shadow-xl" 
          : "bg-white/10 dark:bg-black/20"
      )}>
        <div className="flex justify-between items-center">
          <a 
            href="#hero" 
            className="text-lg font-semibold text-foreground"
            onClick={(e) => handleSmoothScroll(e, "#hero")}
          >
            Madhav Portfolio<span className="text-primary">.</span>
          </a>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-sm font-medium text-foreground/80 hover:text-foreground transition-all hover:text-primary relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          
          {/* Contact Button */}
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, "#contact")}
            className="hidden md:block px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm font-medium transition-all hover:scale-105 backdrop-blur-sm border border-primary/20"
          >
            Contact Us
          </a>
          
          {/* Mobile Nav Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        
        {/* Mobile Nav Menu */}
        <div className={cn(
          "md:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl transition-all duration-300 overflow-hidden",
          "bg-white/10 dark:bg-black/20 backdrop-blur-lg border border-white/20 dark:border-white/10",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        )}>
          <div className="flex flex-col p-4 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className="text-foreground hover:text-primary transition-colors py-2 px-3 rounded-lg hover:bg-white/10"
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "#contact")}
              className="mt-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-center font-medium transition-all"
            >
              Contact Me
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
