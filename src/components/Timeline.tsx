import { cn } from "@/lib/utils";
import { Calendar, Building2, GraduationCap, ChevronRight, Zap, Brain, Beaker, BookOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useRef, useEffect } from "react";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  type: "work" | "education";
  index: number;
  isVisible: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  subtitle,
  date,
  description,
  type,
  index,
  isVisible,
}) => {
  const isLeft = index % 2 === 0;
  const getIcon = () => {
    if (type === "work") {
      return index === 0 ? <Brain className="w-5 h-5 md:w-6 md:h-6" /> : 
             index === 1 ? <Zap className="w-5 h-5 md:w-6 md:h-6" /> :
             index === 2 ? <Building2 className="w-5 h-5 md:w-6 md:h-6" /> :
             <Beaker className="w-5 h-5 md:w-6 md:h-6" />;
    }
    return index === 0 ? <GraduationCap className="w-5 h-5 md:w-6 md:h-6" /> : <BookOpen className="w-5 h-5 md:w-6 md:h-6" />;
  };

  return (
    <div className="relative flex items-start w-full mb-6 md:mb-3">
      {/* Mobile Layout - Vertical */}
      <div className="md:hidden w-full pl-12">
        {/* Mobile Timeline Node */}
        <div className="absolute -left-4 top-0 z-20 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 border-4 border-black flex items-center justify-center text-white transition-all duration-500 shadow-[0_0_20px_rgba(139,69,219,0.6)]">
          {getIcon()}
        </div>

        {/* Mobile Card */}
        <div className={cn(
          "w-full transition-all duration-700 transform",
          isVisible ? "translate-x-0 opacity-100 animate-fade-in" : "translate-x-10 opacity-0"
        )}>
          <div className="bg-gray-900/90 backdrop-blur-sm border-2 border-purple-500/30 rounded-xl p-6 hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(139,69,219,0.4)] hover:scale-105 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute top-0 left-0 h-2 w-0 bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500 group-hover:w-full" />
            
            <div className="flex items-center gap-2 text-sm text-purple-300 mb-3">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{date}</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 font-inter">{title}</h3>
            <p className="text-purple-200 font-semibold mb-4 text-base">{subtitle}</p>
            
            <div className="space-y-3">
              {description.split('\n\n').map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <ChevronRight className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout - Horizontal */}
      <div className="hidden md:flex items-start w-full">
        {/* Timeline Node */}
        <div className="absolute z-20 w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 border-4 border-black flex items-center justify-center text-white transition-all duration-500 shadow-[0_0_30px_rgba(139,69,219,0.6)] hover:shadow-[0_0_40px_rgba(139,69,219,0.9)] hover:scale-110 left-1/2 transform -translate-x-1/2 top-2">
          {getIcon()}
        </div>

        {/* Card */}
        <div className={cn(
          "w-[47%] transition-all duration-700 transform",
          isLeft ? "mr-auto pr-12" : "ml-auto pl-12",
          isVisible 
            ? `translate-x-0 opacity-100 ${isLeft ? 'animate-slide-in-left' : 'animate-slide-in-right'}` 
            : `${isLeft ? '-translate-x-20' : 'translate-x-20'} opacity-0`
        )}>
          <div className="bg-gray-900/90 backdrop-blur-sm border-2 border-purple-500/30 rounded-xl p-6 hover:border-purple-400/60 hover:shadow-[0_0_30px_rgba(139,69,219,0.4)] hover:scale-105 transition-all duration-300 relative overflow-hidden group">
            <div className={cn(
              "absolute top-0 h-2 bg-gradient-to-r from-purple-600 to-purple-400 transition-all duration-500",
              isLeft ? "left-0 w-0 group-hover:w-full" : "right-0 w-0 group-hover:w-full"
            )} />
            
            <div className="flex items-center gap-2 text-sm text-purple-300 mb-2">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{date}</span>
            </div>
            
            <h3 className="text-xl font-bold text-white mb-1.5 font-inter">{title}</h3>
            <p className="text-purple-200 font-semibold mb-3 text-base">{subtitle}</p>
            
            <div className="space-y-2">
              {description.split('\n\n').map((bullet, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <ChevronRight className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">{bullet}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Timeline = () => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState("work");
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const workExperience = [

    {
      title: "Independent AI Researcher",
      subtitle: "University of Illinois, Chicago",
      date: "Nov 2025 - Present",
      description: "Built an AI-powered multimodal knowledge extraction pipeline to process text, images, and tables from unstructured documents (PDF, DOCX, TXT), using SpaCy for rule-based NER and OpenAI LLMs for cross-modal entity and relation extraction.\n\nImplemented an RDF-based knowledge graph layer with RDFlib, encoding extracted entities and relationships as triples for SPARQL querying, semantic search, and cross-document entity resolution with schema-aligned graph-level deduplication.\n\nDesigned a planner–executor multi-stage retrieval pipeline for long-document multi-hop and cross-modal question answering using vector stores for semantic routing.",
      type: "work" as const,
    },

    {
      title: "AI Automation Engineer",
      subtitle: "21 Spheres",
      date: "July - Aug 2025",
      description: "Developed a fully automated insurance workflow integrating TATA AIG and Bimakart portals, dynamically consuming client-side JSON to orchestrate multi-step form filling, policy generation, downloads, and verification using Selenium-based browser automation.\n\nImplemented intelligent OTP and email automation using Microsoft Graph API for secure mailbox access and real-time OTP extraction, enabling complete hands-free execution across authentication checkpoints.\n\nOptimized the pipeline from 10 minutes manual to ~4 minutes automated through multithreading, task scheduling, and LLM-driven multimodal DOM element detection, ensuring robust operation under highly dynamic web layouts.",
      type: "work" as const,
    },


    {
      title: "GenAI Intern (Freelance)",
      subtitle: "Fenmo.ai",
      date: "Aug - Sept 2025",
      description: "Built an agentic RAG decision-flow for offer letter synthesis using PDF → chunk → embed pipelines stored in Qdrant, with metadata-scoped vector retrieval and a deterministic Jinja2 fallback path to guarantee output reliability under LLM failure or latency.\n\nDeveloped SQLPilot, a natural language → SQL semantic compiler with schema introspection, query safety validation, and execution across MySQL backends and a sandboxed SQLite playground supporting table creation, mutation, and structured result exports.\n\nDeployed a FastAPI backend with Streamlit UI integration, containerized for reproducibility, and published model artifacts to Hugging Face Hub for remote inference and versioned distribution.",
      type: "work" as const,
    },
    
    {
      title: "Research Intern",
      subtitle: "Indian Institute of Technology (BHU)",
      date: "Dec 2024",
      description: "Applied canonical correlation analysis to study links between gender classification and lexical semantics of Hindi nouns.\n\nExplored contextual embeddings using bidirectional deep learning models to enhance gender-aware text representations.\n\nDeveloped low-resource language translation models combining SMT and DL to improve gender prediction accuracy.",
      type: "work" as const,
    },

    {
      title: "AI Development Intern",
      subtitle: "21 Spheres",
      date: "Dec 2024",
      description: "Built a personalized recommendation system using FAISS/Qdrant for scalable real-time vector search.\n\nDeveloped RESTful APIs to serve AI recommendations and integrated into a modular backend.\n\nConducted EDA and Time Series Forecasting using Pandas & NumPy for seasonal trend analysis.",
      type: "work" as const,
    },
    
  ];

  const education = [
    {
      title: "Indian Institute of Technology (BHU)",
      subtitle: "IDD (BTech+MTech) Industrial Chemistry",
      date: "2022 - Present",
      description: "Current CPI: 8.3/10\n\nFocus on Chemical Engineering with specialization in AI/ML applications in industrial processes.\n\nActive in research projects combining chemical engineering principles with machine learning algorithms.",
      type: "education" as const,
    },
    {
      title: "CBSE Class XII",
      subtitle: "Maharishi Vidya Mandir-4",
      date: "2022",
      description: "93.60%\n\nCompleted higher secondary education with distinction in Science stream.\n\nFocused on Mathematics, Physics, Chemistry, and Computer Science.",
      type: "education" as const,
    },
    {
      title: "CBSE Class X",
      subtitle: "Maharishi Vidya Mandir-4", 
      date: "2020",
      description: "93.40%\n\nCompleted secondary education with excellent academic performance.\n\nBuilt strong foundation in core subjects including Mathematics and Science.",
      type: "education" as const,
    },
  ];

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.getAttribute('data-index') || '0');
        if (entry.isIntersecting) {
          setVisibleItems(prev => new Set([...prev, index]));
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });

    const timelineItems = document.querySelectorAll('[data-timeline-item]');
    timelineItems.forEach(item => observer.observe(item));

    return () => observer.disconnect();
  }, [activeTab]);

  const currentData = activeTab === "work" ? workExperience : education;

  return (
    <section ref={sectionRef} id="experience" className="min-h-screen bg-black py-12 md:py-16 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #4B0082 0%, transparent 50%), radial-gradient(circle at 75% 75%, #4B0082 0%, transparent 50%)`,
        }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 font-inter">
            Experience & Education
          </h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-purple-600 to-purple-400 mx-auto mb-4 md:mb-6"></div>
          <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto px-4">
            Journey through AI/ML development, research, and academic excellence
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 bg-gray-900/50 border border-gray-700/50 mb-6 md:mb-10">
            <TabsTrigger 
              value="work" 
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 font-medium transition-all duration-300 text-sm md:text-base"
            >
              <Building2 className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Work Experience</span>
              <span className="sm:hidden">Work</span>
            </TabsTrigger>
            <TabsTrigger 
              value="education"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white text-gray-300 font-medium transition-all duration-300 text-sm md:text-base"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Education</span>
              <span className="sm:hidden">Education</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="work" className="focus-visible:outline-none">
            <div ref={timelineRef} className="relative max-w-6xl mx-auto">
              {/* Animated Central Timeline Line - Desktop */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 via-purple-400/50 to-purple-600/30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400 to-transparent h-32 animate-flow-down"></div>
              </div>
              
              {/* Mobile Vertical Timeline Line */}
              <div className="md:hidden absolute left-5 top-0 w-1 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 via-purple-400/50 to-purple-600/30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400 to-transparent h-20 animate-flow-down"></div>
              </div>
              
              {workExperience.map((item, index) => (
                <div key={index} data-timeline-item data-index={index}>
                  <TimelineItem
                    {...item}
                    index={index}
                    isVisible={visibleItems.has(index)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="education" className="focus-visible:outline-none">
            <div className="relative max-w-6xl mx-auto">
              {/* Animated Central Timeline Line - Desktop */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 via-purple-400/50 to-purple-600/30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400 to-transparent h-32 animate-flow-down"></div>
              </div>
              
              {/* Mobile Vertical Timeline Line */}
              <div className="md:hidden absolute left-5 top-0 w-1 h-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/30 via-purple-400/50 to-purple-600/30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-400 to-transparent h-20 animate-flow-down"></div>
              </div>
              
              {education.map((item, index) => (
                <div key={index} data-timeline-item data-index={index}>
                  <TimelineItem
                    {...item}
                    index={index}
                    isVisible={visibleItems.has(index)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Scroll Indicator */}
        <div className="text-center mt-8 md:mt-12">
          <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
            <div className="w-1 h-4 md:h-8 bg-gradient-to-b from-purple-600 to-transparent animate-pulse"></div>
            <span className="text-xs md:text-sm">Scroll to explore timeline</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;