
import { useEffect, useRef } from 'react';

const FlowingWaveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;
    const waves = [
      { amplitude: 60, frequency: 0.008, speed: 0.01, offset: 0, opacity: 0.1 },
      { amplitude: 40, frequency: 0.012, speed: 0.015, offset: Math.PI / 3, opacity: 0.08 },
      { amplitude: 80, frequency: 0.006, speed: 0.008, offset: Math.PI / 2, opacity: 0.06 },
      { amplitude: 30, frequency: 0.015, speed: 0.02, offset: Math.PI, opacity: 0.12 },
    ];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create flowing wave effect
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        
        // Generate wave path
        for (let x = 0; x <= canvas.width; x += 2) {
          const baseY = canvas.height * 0.3; // Position waves in upper portion
          const y = baseY + 
            Math.sin((x * wave.frequency) + (time * wave.speed) + wave.offset) * wave.amplitude +
            Math.sin((x * wave.frequency * 0.5) + (time * wave.speed * 1.5)) * (wave.amplitude * 0.3);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        
        // Close the path to create filled area
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        
        // Apply gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${wave.opacity})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${wave.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Add subtle glow effect
        ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
      style={{ 
        background: 'transparent',
        mixBlendMode: 'screen',
        zIndex: 1
      }}
    />
  );
};

export default FlowingWaveBackground;
