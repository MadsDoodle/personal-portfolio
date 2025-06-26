
import { cn } from "@/lib/utils";
import {
  BrainCircuit,
  Code2,
  Bot,
  Database,
  BarChart3,
  Eye,
  Palette,
  Zap,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  skills: string[];
}

const Skills = () => {
  const skillCategories: SkillCategory[] = [
    {
      id: "programming",
      title: "Programming Languages",
      icon: <Code2 className="h-6 w-6" />,
      skills: ["Python", "C++", "SQL"]
    },
    {
      id: "ml-dl",
      title: "ML/DL Frameworks",
      icon: <BrainCircuit className="h-6 w-6" />,
      skills: ["TensorFlow", "Keras", "PyTorch (basic)", "Scikit-learn", "Transformers (Hugging Face)"]
    },
    {
      id: "data-science",
      title: "Data Science Libraries",
      icon: <BarChart3 className="h-6 w-6" />,
      skills: ["OpenCV", "NLP", "NumPy", "Pandas", "Matplotlib"]
    },
    {
      id: "databases",
      title: "Databases & Vector Stores",
      icon: <Database className="h-6 w-6" />,
      skills: ["ChromaDB", "Qdrant", "Supabase"]
    },
    {
      id: "deployment",
      title: "Deployment & Tools",
      icon: <Zap className="h-6 w-6" />,
      skills: ["Streamlit", "Git", "AWS (basic)"]
    },
    {
      id: "design",
      title: "Design Tools",
      icon: <Palette className="h-6 w-6" />,
      skills: ["Canva", "Figma"]
    },
    {
      id: "visualization",
      title: "Visualization Tools",
      icon: <Eye className="h-6 w-6" />,
      skills: ["Power BI", "Excel", "Tableau"]
    },
    {
      id: "automation",
      title: "Automation & Low-code",
      icon: <Bot className="h-6 w-6" />,
      skills: ["Gradio", "Make.com", "n8n"]
    },
  ];

  const SkillCard = ({ category }: { category: SkillCategory }) => (
    <div className="skill-card group relative h-48">
      <div className="skill-card-inner">
        {/* Front of card */}
        <div className="skill-card-front bg-white/20 backdrop-blur-md border border-white/30 rounded-lg p-4 transition-all duration-500 group-hover:opacity-0 group-hover:rotate-y-180">
          <div className="flex items-center mb-3">
            <div className="mr-3 text-primary">{category.icon}</div>
            <h3 className="text-base font-semibold">{category.title}</h3>
          </div>
          <p className="text-sm text-foreground/80">
            {category.skills.slice(0, 2).join(", ")}
            {category.skills.length > 2 && "..."}
          </p>
        </div>
        
        {/* Back of card with scroll */}
        <div className="skill-card-back absolute inset-0 bg-white/25 backdrop-blur-md border border-white/40 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-y-0">
          <div className="h-full flex flex-col">
            <h4 className="text-base font-semibold flex items-center mb-3 flex-shrink-0">
              <span className="mr-2 text-primary">{category.icon}</span>
              {category.title}
            </h4>
            <ScrollArea className="flex-1">
              <ul className="space-y-2 pr-2">
                {category.skills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center text-sm"
                  >
                    <span className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0"></span>
                    <span className="text-foreground/90">{skill}</span>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 relative px-4 sm:px-6 lg:px-8">
      <div className="section-container max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">Technical Skills</h2>
        
        <Tabs defaultValue="all" className="w-full">
          {/* Desktop TabsList - Hidden on mobile */}
          <TabsList className="hidden lg:grid w-full grid-cols-5 mb-8 bg-white/20 backdrop-blur-md border border-white/30 mx-auto max-w-4xl gap-1 p-1">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary/40 data-[state=active]:text-white text-sm px-2 py-2">All Skills</TabsTrigger>
            <TabsTrigger value="technical" className="data-[state=active]:bg-primary/40 data-[state=active]:text-white text-sm px-2 py-2">Technical</TabsTrigger>
            <TabsTrigger value="ml-ai" className="data-[state=active]:bg-primary/40 data-[state=active]:text-white text-sm px-2 py-2">ML/AI</TabsTrigger>
            <TabsTrigger value="tools" className="data-[state=active]:bg-primary/40 data-[state=active]:text-white text-sm px-2 py-2">Tools</TabsTrigger>
            <TabsTrigger value="design" className="data-[state=active]:bg-primary/40 data-[state=active]:text-white text-sm px-2 py-2">Design</TabsTrigger>
          </TabsList>

          {/* Mobile Scrollable TabsList - Fixed width and scrolling */}
          <div className="lg:hidden mb-8 mx-4">
            <ScrollArea className="w-full whitespace-nowrap pb-2">
              <TabsList className="inline-flex h-12 items-center justify-start bg-white/20 backdrop-blur-md border border-white/30 gap-1 p-1 w-max">
                <TabsTrigger value="all" className="data-[state=active]:bg-primary/40 data-[state=active]:text-white text-sm px-4 py-2 flex-shrink-0 whitespace-nowrap">All Skills</TabsTrigger>
                <TabsTrigger value="technical" className="data-[state=active]:bg-primary/40 data-[state=active]:text-white text-sm px-4 py-2 flex-shrink-0 whitespace-nowrap">Technical</TabsTrigger>
                <TabsTrigger value="ml-ai" className="data-[state=active]:bg-primary/40 data-[state=active]:text-white text-sm px-4 py-2 flex-shrink-0 whitespace-nowrap">ML/AI</TabsTrigger>
                <TabsTrigger value="tools" className="data-[state=active]:bg-primary/40 data-[state=active]:text-white text-sm px-4 py-2 flex-shrink-0 whitespace-nowrap">Tools</TabsTrigger>
                <TabsTrigger value="design" className="data-[state=active]:bg-primary/40 data-[state=active]:text-white text-sm px-4 py-2 flex-shrink-0 whitespace-nowrap">Design</TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>

          <TabsContent value="all" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-2 sm:px-0">
            {skillCategories.map((category) => (
              <SkillCard key={category.id} category={category} />
            ))}
          </TabsContent>

          <TabsContent value="technical" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0">
            {skillCategories.filter(cat => ["programming", "databases", "deployment"].includes(cat.id)).map((category) => (
              <SkillCard key={category.id} category={category} />
            ))}
          </TabsContent>

          <TabsContent value="ml-ai" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0">
            {skillCategories.filter(cat => ["ml-dl", "data-science"].includes(cat.id)).map((category) => (
              <SkillCard key={category.id} category={category} />
            ))}
          </TabsContent>

          <TabsContent value="tools" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2 sm:px-0">
            {skillCategories.filter(cat => ["visualization", "automation"].includes(cat.id)).map((category) => (
              <SkillCard key={category.id} category={category} />
            ))}
          </TabsContent>

          <TabsContent value="design" className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-2 sm:px-0">
            {skillCategories.filter(cat => cat.id === "design").map((category) => (
              <SkillCard key={category.id} category={category} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;
