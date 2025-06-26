
import { useState } from "react";
import { Github, Linkedin, Mail, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const FloatingSocialBubble = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEmailClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsExpanded(false);
  };

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      label: "GitHub",
      href: "https://github.com/MadsDoodle",
      color: "hover:bg-gray-600",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      label: "LinkedIn", 
      href: "https://www.linkedin.com/in/madhav-sukla-baidya-20a151285/?originalSubdomain=in",
      color: "hover:bg-blue-600",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      label: "Contact",
      onClick: handleEmailClick,
      color: "hover:bg-purple-600",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Social Links */}
      <div
        className={cn(
          "flex flex-col-reverse gap-3 mb-3 transition-all duration-300 transform",
          isExpanded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        {socialLinks.map((link, index) => (
          <div
            key={index}
            className={cn(
              "group relative transition-all duration-300",
              isExpanded ? "animate-fade-in" : ""
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {link.label}
            </div>
            
            {/* Social Button */}
            <button
              onClick={link.onClick}
              className={cn(
                "w-12 h-12 rounded-full backdrop-blur-md border transition-all duration-300",
                "bg-white/10 border-white/20 text-white",
                "hover:scale-110 hover:shadow-lg",
                link.color,
                "flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              )}
            >
              {link.href ? (
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full h-full"
                >
                  {link.icon}
                </a>
              ) : (
                link.icon
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-14 h-14 rounded-full backdrop-blur-md border transition-all duration-300",
          "bg-white/10 border-white/20 text-white",
          "hover:scale-110 hover:shadow-lg hover:bg-white/20",
          "flex items-center justify-center",
          "shadow-[0_0_30px_rgba(139,92,246,0.3)]",
          "animate-pulse-slow hover:animate-none",
          isExpanded && "rotate-45 bg-primary/20 border-primary/30"
        )}
      >
        {isExpanded ? (
          <X className="h-6 w-6" />
        ) : (
          <Plus className="h-6 w-6" />
        )}
      </button>
    </div>
  );
};

export default FloatingSocialBubble;
