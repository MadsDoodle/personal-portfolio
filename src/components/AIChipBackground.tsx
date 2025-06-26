import { useEffect, useRef, useState } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  pulse: number;
  pulseSpeed: number;
}

const AIChipBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0 });
  const [nodes, setNodes] = useState<Node[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  // Check if component should be visible (in hero section)
  useEffect(() => {
    const checkVisibility = () => {
      const heroSection = document.getElementById('hero');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const isInView = rect.bottom > 0 && rect.top < window.innerHeight;
        setIsVisible(isInView);
      }
    };

    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
    return () => window.removeEventListener('scroll', checkVisibility);
  }, []);

  // Initialize nodes
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const nodeCount = 25;
    const newNodes: Node[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const node: Node = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        connections: [],
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.01,
      };
      newNodes.push(node);
    }

    // Create connections between nearby nodes
    newNodes.forEach((node, i) => {
      newNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 120 && node.connections.length < 3) {
            node.connections.push(j);
          }
        }
      });
    });

    setNodes(newNodes);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvasRef.current || !isVisible) return;
      const rect = canvasRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || !isVisible || nodes.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      if (!isVisible) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw connections first (behind nodes)
      nodes.forEach((node, i) => {
        // Update node position (very slow drift)
        node.x += node.vx;
        node.y += node.vy;
        
        // Bounce off edges
        if (node.x <= 0 || node.x >= canvas.width) node.vx *= -1;
        if (node.y <= 0 || node.y >= canvas.height) node.vy *= -1;
        
        // Keep nodes in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x));
        node.y = Math.max(0, Math.min(canvas.height, node.y));

        // Update pulse
        node.pulse += node.pulseSpeed;

        // Mouse interaction - subtle line enhancement
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - node.x, 2) + Math.pow(mouseRef.current.y - node.y, 2)
        );
        const mouseInfluence = Math.max(0, 1 - mouseDistance / 150);

        // Draw connections
        node.connections.forEach(connectionIndex => {
          const target = nodes[connectionIndex];
          if (target) {
            const distance = Math.sqrt(
              Math.pow(node.x - target.x, 2) + Math.pow(node.y - target.y, 2)
            );
            
            // Pulsing connection strength
            const pulseValue = (Math.sin(node.pulse) + 1) / 2;
            const opacity = 0.1 + pulseValue * 0.2 + mouseInfluence * 0.3;
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(target.x, target.y);
            
            // Gradient line based on distance and pulse
            const gradient = ctx.createLinearGradient(node.x, node.y, target.x, target.y);
            gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(59, 130, 246, ${opacity * 0.8})`);
            gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5 + mouseInfluence;
            ctx.stroke();
            
            // Add subtle glow for mouse interaction
            if (mouseInfluence > 0.1) {
              ctx.shadowColor = 'rgba(139, 92, 246, 0.5)';
              ctx.shadowBlur = 3;
              ctx.stroke();
              ctx.shadowBlur = 0;
            }
          }
        });
      });

      // Draw nodes on top
      nodes.forEach(node => {
        const pulseValue = (Math.sin(node.pulse) + 1) / 2;
        const mouseDistance = Math.sqrt(
          Math.pow(mouseRef.current.x - node.x, 2) + Math.pow(mouseRef.current.y - node.y, 2)
        );
        const mouseInfluence = Math.max(0, 1 - mouseDistance / 100);
        
        const radius = 2 + pulseValue * 1.5 + mouseInfluence * 2;
        const opacity = 0.4 + pulseValue * 0.4 + mouseInfluence * 0.3;
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 2, 0, Math.PI * 2);
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, radius + 2
        );
        glowGradient.addColorStop(0, `rgba(139, 92, 246, ${opacity * 0.8})`);
        glowGradient.addColorStop(1, 'rgba(139, 92, 246, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fill();
        
        // Core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        const coreGradient = ctx.createRadialGradient(
          node.x - radius * 0.3, node.y - radius * 0.3, 0,
          node.x, node.y, radius
        );
        coreGradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`);
        coreGradient.addColorStop(0.7, `rgba(139, 92, 246, ${opacity})`);
        coreGradient.addColorStop(1, `rgba(59, 130, 246, ${opacity * 0.5})`);
        ctx.fillStyle = coreGradient;
        ctx.fill();
      });

      if (isVisible) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, isVisible]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-60"
      style={{ background: 'transparent' }}
    />
  );
};

export default AIChipBackground;
