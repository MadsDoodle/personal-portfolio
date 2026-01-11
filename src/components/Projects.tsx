
import { useState, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";
import {
  Bot,
  Database,
  Layers,
  Camera,
  Terminal,
  Cpu,
  FileCode,
  Code2,
  BarChart3,
  MessageSquareText,
  Users,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from "lucide-react";


interface ProjectData {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  imageUrl: string;
  githubUrl?: string;
  liveUrl?: string;
}

const Projects = () => {
  const [isInView, setIsInView] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const projects: ProjectData[] = [
    {
      id: "multi-agent-research",
      title: "Multi-Agent Research Automation System",
      description:
        "LangGraph + LangChain based multi-agent research system enabling academic search, document retrieval, metadata extraction, literature synthesis, and LaTeX paper generation with persistent conversational state.",
      technologies: [
        "LangGraph",
        "LangChain",
        "GPT-4",
        "arXiv API",
        "Semantic Scholar",
        "LaTeX"
      ],
      icon: <Bot className="h-5 w-5" />,
      imageUrl: "/images/research-agent.png",
      githubUrl: "https://github.com/MadsDoodle/BACKEND-LangGraph-research-agent.git"
    },
    {
      id: "tabular-rag",
      title: "Tabular-RAG: Multimodal Retrieval-Augmented Generation",
      description:
        "From-scratch multimodal RAG system with PDF parsing, OCR, table/chart understanding, FAISS indexing, and source-grounded GPT-4 responses without orchestration frameworks.",
      technologies: [
        "FAISS",
        "OCR",
        "PDF Parsing",
        "GPT-4",
        "Multimodal RAG"
      ],
      icon: <Database className="h-5 w-5" />,
      imageUrl: "images/TabRAG.png",
      githubUrl: "https://github.com/MadsDoodle/Tabular-RAG-from-scratch.git"
    },
    {
      id: "langgraph-web-synthesis",
      title: "LangGraph Automated No-Code Web Synthesis System",
      description:
        "Planner–Architect–Coder–Reviewer multi-agent pipeline that synthesizes complete web projects from a single prompt using structured specifications and iterative validation loops.",
      technologies: [
        "LangGraph",
        "LLM Agents",
        "GPT-4",
        "Code Generation",
        "Web Automation"
      ],
      icon: <Layers className="h-5 w-5" />,
      imageUrl: "/images/web-synthesis.png",
      githubUrl: "https://github.com/MadsDoodle/Gen-Sites-No-code-website-builder-using-LangGraph.git"
    },
    {
      id: "vision-pipelines",
      title: "End-to-End Vision Pipelines",
      description:
        "Comprehensive vision systems including image captioning (VGG16 + LSTM), sign language detection with SSD MobileNetV2, and one-shot face recognition using Siamese networks.",
      technologies: [
        "Computer Vision",
        "TensorFlow",
        "VGG16",
        "Siamese Networks",
        "OpenCV"
      ],
      icon: <Camera className="h-5 w-5" />,
      imageUrl: "images/vision.png",
      githubUrl: "https://github.com/username/vision-pipelines"
    },
    {
      id: "sqlpilot",
      title: "SQLPilot – AI-powered MySQL Chatbot",
      description:
        "Natural language to SQL system enabling conversational querying, auto-generated SQL execution, result explanations, and interactive SQL playground with tabular outputs.",
      technologies: [
        "MySQL",
        "LLMs",
        "SQL",
        "NLP",
        "Python"
      ],
      icon: <Terminal className="h-5 w-5" />,
      imageUrl: "/images/sql-pilot.png",
      githubUrl: "https://github.com/MadsDoodle/SQLPilot"
    },
    {
      id: "llama-finetuning",
      title: "Fine-Tuning LLaMA-3.2 with R1-Distill via PEFT",
      description:
        "SFT fine-tuning of LLaMA-3.2-3B using LoRA/QLoRA with Unsloth optimizations, preserving reasoning behavior and exporting deployable GGUF checkpoints.",
      technologies: [
        "LLaMA",
        "PEFT",
        "LoRA",
        "QLoRA",
        "Unsloth"
      ],
      icon: <Cpu className="h-5 w-5" />,
      imageUrl: "images/fine-tune.png",
      githubUrl: "https://github.com/MadsDoodle/LLM-finetuning-Stages.git"
    },

    
    {
      id: "monte-carlo",
      title: "Monte Carlo Particle Simulation",
      description: "N-body simulation with Lennard-Jones potential and periodic boundary conditions, featuring Matplotlib visualization and interactive UI.",
      technologies: ["Python", "Matplotlib", "NumPy", "Monte Carlo"],
      icon: <BarChart3 className="h-5 w-5" />,
      imageUrl: "images/monte-carlo.png",
      githubUrl: "https://github.com/MadsDoodle/Monte-Carlo-simulation"
    },
    
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      container.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="relative min-h-screen py-20 bg-black overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5CF6' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-5xl font-bold text-white mb-6 font-inter">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Explore my AI/ML projects showcasing expertise in deep learning, computer vision, and natural language processing
          </p>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <button
            onClick={scrollLeft}
            className="p-3 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 hover:border-purple-400/60 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-purple-300" />
          </button>
          
          <div className="text-purple-300 text-sm font-medium">
            Scroll to explore projects
          </div>
          
          <button
            onClick={scrollRight}
            className="p-3 bg-purple-600/20 hover:bg-purple-600/40 border border-purple-500/30 hover:border-purple-400/60 rounded-full transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-purple-300" />
          </button>
        </div>

        {/* Horizontal Scrolling Projects */}
        <div className="relative">
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-8 overflow-x-auto pb-4 scrollbar-hide scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={cn(
                  "flex-shrink-0 w-80 md:w-96 group relative overflow-hidden rounded-xl transition-all duration-500",
                  "bg-gray-900/90 backdrop-blur-sm border border-purple-500/30",
                  "hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(139,69,219,0.4)]",
                  "hover:scale-105 animate-fade-in"
                )}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  scrollSnapAlign: 'start'
                }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Icon */}
                  <div className="absolute top-4 right-4 p-3 bg-purple-600/20 backdrop-blur-sm rounded-lg border border-purple-500/30">
                    {project.icon}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 font-inter">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span 
                        key={tech} 
                        className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-purple-400 text-xs px-2 py-1">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex gap-3">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all hover:scale-105 text-sm font-medium"
                      >
                        <Github className="h-4 w-4" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all hover:scale-105 text-sm font-medium"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
