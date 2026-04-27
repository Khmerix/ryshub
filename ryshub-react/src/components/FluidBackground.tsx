import { useEffect, useRef } from 'react';

interface Neuron {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  pulsePhase: number;
  pulseSpeed: number;
}

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const neuronsRef = useRef<Neuron[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize neurons
    const neuronCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 18000));
    const neurons: Neuron[] = [];
    for (let i = 0; i < neuronCount; i++) {
      neurons.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2.5 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
      });
    }
    neuronsRef.current = neurons;

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouseRef.current.x = -1000;
      mouseRef.current.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    let animationId: number;
    const isDark = () => document.documentElement.classList.contains('dark');

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const time = Date.now() * 0.001;
      const dark = isDark();

      // Update neuron positions
      for (const n of neurons) {
        n.x += n.vx;
        n.y += n.vy;

        // Wrap around edges
        if (n.x < -20) n.x = canvas.width + 20;
        if (n.x > canvas.width + 20) n.x = -20;
        if (n.y < -20) n.y = canvas.height + 20;
        if (n.y > canvas.height + 20) n.y = -20;

        // Mouse attraction (subtle)
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 250 && dist > 0) {
          const force = (250 - dist) / 250 * 0.015;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }

        // Damping
        n.vx *= 0.995;
        n.vy *= 0.995;

        // Keep minimum movement
        const speed = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (speed < 0.05) {
          n.vx += (Math.random() - 0.5) * 0.02;
          n.vy += (Math.random() - 0.5) * 0.02;
        }
      }

      // Colors based on theme
      const lineColor = dark ? '100, 149, 237' : '100, 149, 237';
      const glowColor = dark ? '120, 160, 255' : '100, 180, 255';
      const coreColor = dark ? '160, 200, 255' : '150, 200, 255';
      const brightColor = dark ? '220, 240, 255' : '220, 240, 255';

      // Draw connections
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const a = neurons[i];
          const b = neurons[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            const opacity = (1 - dist / 180) * (dark ? 0.35 : 0.25) * Math.min(a.opacity, b.opacity);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${lineColor}, ${opacity})`;
            ctx.lineWidth = dark ? 1.0 : 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw neurons
      for (const n of neurons) {
        const pulse = Math.sin(time * n.pulseSpeed * 5 + n.pulsePhase) * 0.3 + 0.7;
        const currentRadius = n.radius * pulse;

        // Glow
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, currentRadius * 4);
        glow.addColorStop(0, `rgba(${glowColor}, ${n.opacity * (dark ? 0.5 : 0.4)})`);
        glow.addColorStop(1, `rgba(${glowColor}, 0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${coreColor}, ${n.opacity})`;
        ctx.fill();

        // Bright center
        ctx.beginPath();
        ctx.arc(n.x, n.y, currentRadius * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${brightColor}, ${n.opacity * 0.9})`;
        ctx.fill();
      }

      // Draw mouse glow
      if (mouse.x > 0) {
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        glow.addColorStop(0, `rgba(${glowColor}, ${dark ? 0.18 : 0.12})`);
        glow.addColorStop(1, `rgba(${glowColor}, 0)`);
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 120, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
      }}
    >
      {/* AI background image */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(AI.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
          filter: 'blur(1px) saturate(0.8)',
        }}
      />
      {/* Theme overlay for readability */}
      <div
        id="bg-overlay"
        className="absolute inset-0 transition-colors duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(248,250,252,0.7) 0%, rgba(226,232,240,0.5) 50%, rgba(248,250,252,0.7) 100%)',
        }}
      />
      {/* Neuron canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
