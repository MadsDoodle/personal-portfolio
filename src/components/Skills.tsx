import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
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

interface SkillCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  skills: string[];
  color: string;
}

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const nodesRef = useRef<THREE.Mesh[]>([]);
  const animationFrameRef = useRef<number>();
  const [activeCategory, setActiveCategory] = useState<SkillCategory | null>(null);
  const [tooltip, setTooltip] = useState<{ show: boolean; x: number; y: number; text: string }>({
    show: false,
    x: 0,
    y: 0,
    text: ''
  });

  const skillCategories: SkillCategory[] = [
    {
      id: "programming",
      title: "Programming Languages",
      icon: Code2,
      skills: ["Python", "C++", "SQL"],
      color: "#8B5CF6"
    },
    {
      id: "ml-dl",
      title: "ML/DL Frameworks",
      icon: BrainCircuit,
      skills: ["TensorFlow", "Keras", "PyTorch (basic)", "Scikit-learn", "Transformers (Hugging Face)"],
      color: "#EC4899"
    },
    {
      id: "data-science",
      title: "Data Science Libraries",
      icon: BarChart3,
      skills: ["OpenCV", "NLP", "NumPy", "Pandas", "Matplotlib"],
      color: "#3B82F6"
    },
    {
      id: "databases",
      title: "Databases & Vector Stores",
      icon: Database,
      skills: ["ChromaDB", "Qdrant", "Supabase"],
      color: "#10B981"
    },
    {
      id: "deployment",
      title: "Deployment & Tools",
      icon: Zap,
      skills: ["Streamlit", "Git", "AWS (basic)"],
      color: "#F59E0B"
    },
    {
      id: "design",
      title: "Design Tools",
      icon: Palette,
      skills: ["Canva", "Figma"],
      color: "#EF4444"
    },
    {
      id: "visualization",
      title: "Visualization Tools",
      icon: Eye,
      skills: ["Power BI", "Excel", "Tableau"],
      color: "#06B6D4"
    },
    {
      id: "automation",
      title: "Automation & Low-code",
      icon: Bot,
      skills: ["Gradio", "Make.com", "n8n"],
      color: "#A855F7"
    },
  ];

  const skillLabels: { [key: string]: string } = {
    "programming": "CODE",
    "ml-dl": "ML/DL",
    "data-science": "DATA",
    "databases": "DB",
    "deployment": "DEPLOY",
    "design": "DESIGN",
    "visualization": "VIZ",
    "automation": "AUTO"
  };

  const fibonacciSphere = (samples: number): THREE.Vector3[] => {
    const points: THREE.Vector3[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));
    
    for (let i = 0; i < samples; i++) {
      const y = 1 - (i / (samples - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      points.push(new THREE.Vector3(x * 2.2, y * 2.2, z * 2.2));
    }
    return points;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting - More vibrant
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xA78BFA, 2, 100);
    pointLight1.position.set(10, 10, 10);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xEC4899, 1.5, 100);
    pointLight2.position.set(-10, -10, -10);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x3B82F6, 1, 100);
    pointLight3.position.set(0, 10, -10);
    scene.add(pointLight3);

    // Globe group
    const globeGroup = new THREE.Group();
    globeGroupRef.current = globeGroup;
    scene.add(globeGroup);

    // Wireframe sphere - Less dense
    const sphereGeometry = new THREE.SphereGeometry(2, 20, 20);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0xA78BFA,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });
    const wireframeSphere = new THREE.Mesh(sphereGeometry, wireframeMaterial);
    globeGroup.add(wireframeSphere);

    // Glass sphere - More vibrant
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x8B5CF6,
      transparent: true,
      opacity: 0.2,
      metalness: 0.3,
      roughness: 0.1
    });
    const glassSphere = new THREE.Mesh(sphereGeometry, glassMaterial);
    globeGroup.add(glassSphere);

    // Latitude rings - Less dense
    const latitudes = [-1.2, 0, 1.2];
    latitudes.forEach(y => {
      const radius = Math.sqrt(4 - y * y);
      const ringGeometry = new THREE.RingGeometry(radius - 0.01, radius + 0.01, 48);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xA78BFA,
        transparent: true,
        opacity: 0.4,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = y;
      globeGroup.add(ring);
    });

    // Create skill nodes - Larger and more vibrant
    const positions = fibonacciSphere(skillCategories.length);
    const nodes: THREE.Mesh[] = [];

    positions.forEach((pos, i) => {
      const category = skillCategories[i];
      
      // Glow - Larger and brighter
      const glowGeometry = new THREE.SphereGeometry(0.25, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color(category.color),
        transparent: true,
        opacity: 0.5
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      glow.position.copy(pos);
      globeGroup.add(glow);

      // Main node - Larger
      const nodeGeometry = new THREE.SphereGeometry(0.12, 16, 16);
      const nodeMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(category.color),
        emissive: new THREE.Color(category.color),
        emissiveIntensity: 0.8,
        transparent: true,
        opacity: 1,
        metalness: 0.5,
        roughness: 0.2
      });
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
      node.position.copy(pos);
      node.userData = { category, glow, originalScale: 1, targetScale: 1 };
      globeGroup.add(node);
      nodes.push(node);

      // Create text label using canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = 256;
        canvas.height = 128;
        
        context.fillStyle = 'rgba(0, 0, 0, 0)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        
        context.font = 'bold 40px Arial';
        context.fillStyle = '#FFFFFF';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(skillLabels[category.id], canvas.width / 2, canvas.height / 2);
        
        const texture = new THREE.CanvasTexture(canvas);
        const spriteMaterial = new THREE.SpriteMaterial({ 
          map: texture,
          transparent: true,
          opacity: 0.9
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.scale.set(0.8, 0.4, 1);
        
        // Position text slightly offset from node
        const offset = pos.clone().normalize().multiplyScalar(0.35);
        sprite.position.copy(pos.clone().add(offset));
        
        globeGroup.add(sprite);
        node.userData.label = sprite;
      }
    });

    nodesRef.current = nodes;

    // Mouse interaction variables
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let hoveredNode: THREE.Mesh | null = null;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let isAutoRotating = true;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes);

      if (intersects.length > 0) {
        const node = intersects[0].object as THREE.Mesh;
        if (hoveredNode !== node) {
          if (hoveredNode) {
            hoveredNode.userData.targetScale = 1;
            hoveredNode.userData.glow.material.opacity = 0.5;
          }
          hoveredNode = node;
          node.userData.targetScale = 1.5;
          node.userData.glow.material.opacity = 0.8;
          
          setTooltip({
            show: true,
            x: e.clientX + 15,
            y: e.clientY + 15,
            text: node.userData.category.title
          });
        } else {
          setTooltip(prev => ({ ...prev, x: e.clientX + 15, y: e.clientY + 15 }));
        }
      } else {
        if (hoveredNode) {
          hoveredNode.userData.targetScale = 1;
          hoveredNode.userData.glow.material.opacity = 0.5;
          hoveredNode = null;
        }
        setTooltip(prev => ({ ...prev, show: false }));
      }

      // Drag rotation
      if (isDragging && !activeCategory) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;
        
        if (globeGroup) {
          globeGroup.rotation.y += deltaX * 0.005;
          globeGroup.rotation.x += deltaY * 0.005;
        }
        
        previousMousePosition = { x: e.clientX, y: e.clientY };
        isAutoRotating = false;
        setTimeout(() => { isAutoRotating = true; }, 2000);
      }
    };

    const onClick = (e: MouseEvent) => {
      if (isDragging || !containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodes);

      if (intersects.length > 0) {
        const category = (intersects[0].object as THREE.Mesh).userData.category;
        setActiveCategory(category);
        isAutoRotating = false;
        
        nodes.forEach(n => {
          if (n !== intersects[0].object) {
            n.material.opacity = 0.3;
          }
        });
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.005;
      camera.position.z = Math.max(3, Math.min(8, camera.position.z));
    };

    // Add event listeners
    containerRef.current.addEventListener('mousemove', onMouseMove);
    containerRef.current.addEventListener('click', onClick);
    containerRef.current.addEventListener('mousedown', onMouseDown);
    containerRef.current.addEventListener('wheel', onWheel);
    window.addEventListener('mouseup', onMouseUp);

    // Animation loop
    const animate = () => {
      if (isAutoRotating && !activeCategory && globeGroup) {
        globeGroup.rotation.y += 0.002;
      }

      nodes.forEach(node => {
        const scale = THREE.MathUtils.lerp(
          node.scale.x,
          node.userData.targetScale,
          0.1
        );
        node.scale.set(scale, scale, scale);
        
        // Pulsing effect
        const time = Date.now() * 0.001;
        node.userData.glow.scale.set(
          1 + Math.sin(time * 2 + node.position.x) * 0.1,
          1 + Math.sin(time * 2 + node.position.y) * 0.1,
          1 + Math.sin(time * 2 + node.position.z) * 0.1
        );

        // Make labels face camera
        if (node.userData.label) {
          node.userData.label.quaternion.copy(camera.quaternion);
        }
      });

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mouseup', onMouseUp);
      renderer.dispose();
    };
  }, []);

  // Close panel effect
  useEffect(() => {
    if (!activeCategory) {
      nodesRef.current.forEach(n => {
        n.material.opacity = 1;
      });
    }
  }, [activeCategory]);

  return (
    <section id="skills" className="min-h-screen bg-[#0B0F1A] relative overflow-hidden py-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-blue-900/30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.2),transparent_50%)]" />
      
      <div className="relative z-10 max-w-[1600px] mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Technical Skills
          </h2>
          <p className="text-white/60 text-lg">
            Explore the skill nodes • Click to dive deeper
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Side - Skill Cards */}
          <div className="w-full lg:w-[45%] space-y-4 max-h-[700px] overflow-y-auto pr-2 pl-1 sm:pl-3 lg:pl-5 custom-scrollbar">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory?.id === category.id;
              
              return (
                <div
                  key={category.id}
                  onClick={() => setActiveCategory(category)}
                  className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
                    isActive 
                      ? 'border-white/40 shadow-2xl' 
                      : 'border-white/20 hover:border-white/30'
                  }`}
                  style={{
                    boxShadow: isActive ? `0 0 30px ${category.color}40` : undefined
                  }}
                >
                  {/* Gradient overlay */}
                  <div 
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${category.color}20 0%, transparent 100%)`
                    }}
                  />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div 
                        className="p-3 rounded-xl"
                        style={{ backgroundColor: `${category.color}30` }}
                      >
                        <Icon className="w-8 h-8" style={{ color: category.color }} />
                      </div>
                      <h3 className="text-2xl font-bold text-white flex-1">
                        {category.title}
                      </h3>
                      <div 
                        className="w-3 h-3 rounded-full animate-pulse"
                        style={{ backgroundColor: category.color }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      {category.skills.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 bg-white/5 rounded-lg"
                        >
                          <div 
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-white font-semibold text-base">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side - Globe */}
          <div className="w-full lg:w-[55%] relative">
            <div 
              ref={containerRef} 
              className="w-full h-[500px] lg:h-[700px] cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden"
              style={{
                background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'
              }}
            />
            
            <div className="text-center mt-4">
              <p className="text-white/40 text-sm">
                Drag to rotate • Scroll to zoom • Click nodes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.show && (
        <div 
          className="fixed z-50 bg-purple-900/95 backdrop-blur-md border border-purple-400/50 px-4 py-2 rounded-lg text-sm font-bold text-white pointer-events-none whitespace-nowrap shadow-xl"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #8B5CF6 0%, #EC4899 100%);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #A78BFA 0%, #F472B6 100%);
        }
      `}</style>
    </section>
  );
};

export default Skills;