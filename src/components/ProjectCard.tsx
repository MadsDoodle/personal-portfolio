
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  githubUrl?: string;
  isActive: boolean;
  index: number;
  totalCards: number;
}

const ProjectCard = ({ 
  title, 
  description, 
  technologies, 
  imageUrl, 
  githubUrl, 
  isActive,
  index,
  totalCards
}: ProjectCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  
  const depthOffset = index * 8;
  const scaleReduction = index * 0.05;
  
  return (
    <div className="relative w-full">
      <div 
        className={cn(
          "relative mx-auto transition-all duration-700 ease-out cursor-pointer",
          "max-w-2xl rounded-2xl overflow-hidden",
          isActive 
            ? "transform scale-100 z-30 shadow-[0_0_60px_rgba(139,69,219,0.6)]" 
            : `transform scale-${Math.max(75, 100 - scaleReduction * 100)} z-${Math.max(10, 30 - index * 5)}`
        )}
        style={{
          transform: isActive 
            ? 'translateY(0px) scale(1)' 
            : `translateY(-${depthOffset}px) scale(${1 - scaleReduction})`,
          filter: isActive ? 'blur(0px)' : `blur(${Math.min(index * 2, 8)}px)`,
          opacity: isActive ? 1 : Math.max(0.3, 1 - index * 0.2)
        }}
        onClick={() => setShowDetails(!showDetails)}
      >
        {/* Card Background */}
        <div className="relative h-96 overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-purple-500/30">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          
          {/* Glowing border animation */}
          <div className={cn(
            "absolute inset-0 rounded-2xl",
            isActive && "animate-pulse bg-gradient-to-r from-purple-500/20 via-transparent to-purple-500/20"
          )} />
          
          {/* Content */}
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <h3 className="text-3xl font-bold text-white mb-4 font-inter">
              {title}
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed line-clamp-3">
              {description}
            </p>
            
            {/* Tech badges preview */}
            <div className="flex flex-wrap gap-2 mt-6">
              {technologies.slice(0, 3).map((tech) => (
                <span 
                  key={tech} 
                  className="bg-purple-600/20 text-purple-300 text-sm px-3 py-1 rounded-full border border-purple-500/30"
                >
                  {tech}
                </span>
              ))}
              {technologies.length > 3 && (
                <span className="text-purple-400 text-sm px-3 py-1">
                  +{technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Expanded Details Panel */}
      {showDetails && isActive && (
        <div className="mt-8 mx-auto max-w-2xl animate-fade-in">
          <div className="bg-gray-900/80 backdrop-blur-lg border border-purple-500/30 rounded-xl p-8">
            <div className="space-y-6">
              {/* Full tech stack */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="bg-purple-600/10 text-purple-300 text-sm font-medium px-3 py-2 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="flex gap-4">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all hover:scale-105 font-medium shadow-lg hover:shadow-purple-500/25"
                  >
                    <Github className="h-5 w-5" />
                    View Code
                  </a>
                )}
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all font-medium"
                >
                  Close Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
