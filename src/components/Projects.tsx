import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Database,
  Layers,
  Camera,
  Terminal,
  Cpu,
  BarChart3,
  FolderKanban,
  Compass,
  X,
  Github,
  ExternalLink
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
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const rotationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [timerProgress, setTimerProgress] = useState(0);

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
    {
      id: "acadia-fms",
      title: "ACADIA — Academic Workspace (EasyFMS)",
      description:
        "A personal-first academic workspace for managing learning materials, projects, tasks, and documents. Built with Vite, React, and TypeScript, ACADIA offers structured learning workflows and an AI copilot for navigating and querying academic content — designed as a beginner-friendly alternative to GitHub for students.",
      technologies: [
        "Vite",
        "React",
        "TypeScript",
        "AI Copilot",
        "Workspace UI"
      ],
      icon: <FolderKanban className="h-5 w-5" />,
      imageUrl: "images/acadia.png",
      githubUrl: "https://github.com/MadsDoodle/AcadIA-EasyFMS"
    },
    {
      id: "ai-career-navigator",
      title: "AI Career Navigator",
      description:
        "An AI-powered career navigation platform that guides users through their entire career lifecycle — from resume analysis and skill gap detection to learning paths, career simulation, job matching, and application support. Acts as a personalized AI career mentor that adapts to each user's profile.",
      technologies: [
        "LLMs",
        "Career Intelligence",
        "Skill Gap Analysis",
        "Recommendation Systems",
        "AI Agents"
      ],
      icon: <Compass className="h-5 w-5" />,
      imageUrl: "images/career-nav.png",
      githubUrl: "https://github.com/MadsDoodle/Career-Navigator"
    },

  ];

  const startRotation = () => {
  if (rotationTimeoutRef.current) {
    clearTimeout(rotationTimeoutRef.current);
  }
  
  setTimerProgress(0);
  const startTime = Date.now();
  const duration = 8000;
  
  const updateProgress = () => {
    const elapsed = Date.now() - startTime;
    const progress = (elapsed / duration) * 100;
    
    if (progress < 100) {
      setTimerProgress(progress);
      requestAnimationFrame(updateProgress);
    }
  };
  
  requestAnimationFrame(updateProgress);
  
  rotationTimeoutRef.current = setTimeout(() => {
    if (expandedIndex === null) {
      setFeaturedIndex((prev) => (prev + 1) % projects.length);
      startRotation();
    }
  }, duration);
};

  useEffect(() => {
    startRotation();
    return () => {
      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current);
      }
    };
  }, [expandedIndex]);

  const handleCardClick = (index: number) => {
  if (expandedIndex === index) {
    setExpandedIndex(null);
    startRotation();
  } else {
    setExpandedIndex(index);
    setTimerProgress(0); // Add this line
    if (rotationTimeoutRef.current) {
      clearTimeout(rotationTimeoutRef.current);
    }
  }
};

  const getGridClass = (index: number) => {
    const currentFeatured = expandedIndex !== null ? expandedIndex : featuredIndex;
    
    if (index === currentFeatured) {
      return "col-span-2 row-span-2";
    }
    return "col-span-1 row-span-1";
  };

  return (
    <section className="relative min-h-screen py-20 bg-black overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-blue-900/10"></div>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238B5CF6' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-6 font-inter">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto mb-8"></div>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Explore my AI/ML projects showcasing expertise in deep learning, computer vision, and natural language processing
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div 
          className="grid grid-cols-4 auto-rows-[240px] gap-4"
          layout
        >
          {projects.map((project, index) => {
            const currentFeatured = expandedIndex !== null ? expandedIndex : featuredIndex;
            const isFeatured = index === currentFeatured;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={project.id}
                layout
                transition={{
                  layout: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
                }}
                className={getGridClass(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleCardClick(index)}
              >
                <div className="relative h-full w-full group cursor-pointer overflow-hidden rounded-2xl">
                  {/* Hover Gradient Glow */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 rounded-2xl blur-xl opacity-75 z-0"
                      />
                    )}
                  </AnimatePresence>

                  <div className="relative h-full w-full bg-gray-900/90 backdrop-blur-sm border border-purple-500/30 rounded-2xl overflow-hidden z-10">
                    {/* Image Background */}
                    <div className="absolute inset-0">
                      <img 
                        src={project.imageUrl} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    </div>

                    {/* Icon */}
                    <div className="absolute top-4 right-4 p-3 bg-purple-600/20 backdrop-blur-sm rounded-lg border border-purple-500/30 text-purple-300">
                      {project.icon}
                    </div>

                    {/* Timer Progress Bar - only show on featured card during auto-rotation */}
                    {isFeatured && expandedIndex === null && (
                      <div className="absolute top-4 left-4 right-16 h-0.5 bg-gray-800/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${timerProgress}%` }}
                          transition={{ duration: 0.1 }}
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end">
                      <h3 className={`font-bold text-white mb-2 font-inter transition-all duration-500 ${
                        isFeatured ? 'text-2xl' : 'text-lg'
                      }`}>
                        {project.title}
                      </h3>
                      
                      {/* Description - show only when featured */}
                      <motion.div
                        animate={{
                          opacity: isFeatured ? 1 : 0,
                          height: isFeatured ? "auto" : 0
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-300 text-sm leading-relaxed mb-4">
                          {project.description}
                        </p>
                      </motion.div>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.technologies.slice(0, isFeatured ? 6 : 3).map((tech) => (
                          <span 
                            key={tech} 
                            className="bg-purple-600/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                        {!isFeatured && project.technologies.length > 3 && (
                          <span className="text-purple-400 text-xs px-2 py-1">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action buttons - show only when featured */}
                      <motion.div
                        animate={{
                          opacity: isFeatured ? 1 : 0,
                          height: isFeatured ? "auto" : 0
                        }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex gap-3 overflow-hidden"
                      >
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
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
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all hover:scale-105 text-sm font-medium"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Demo
                          </a>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Hint Text */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            {expandedIndex !== null 
              ? "Click the card again to return to automatic rotation"
              : "Cards rotate automatically • Hover for glow • Click to expand"}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;