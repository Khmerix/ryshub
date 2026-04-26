import { useEffect, useRef, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
  alpha: number;
}

interface ParticleBurstProps {
  className?: string;
  particleCount?: number;
  colors?: string[];
}

export default function ParticleBurst({
  className = '',
  particleCount = 60,
  colors = ['#3b82f6', '#8b5cf6', '#06b6d4', '#f59e0b', '#10b981'],
}: ParticleBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const triggeredRef = useRef(false);
  const animRef = useRef<number>(0);

  const createParticles = useCallback(
    (cx: number, cy: number) => {
      const particles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
        const speed = 2 + Math.random() * 6;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 40 + Math.random() * 40,
          size: 2 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
        });
      }
      return particles;
    },
    [particleCount, colors]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggeredRef.current) {
            triggeredRef.current = true;
            const rect = container.getBoundingClientRect();
            particlesRef.current = createParticles(rect.width / 2, rect.height / 2);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(container);

    const animate = () => {
      animRef.current = requestAnimationFrame(animate);
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      ctx.clearRect(0, 0, w, h);

      particlesRef.current = particlesRef.current.filter((p) => {
        p.life++;
        if (p.life > p.maxLife) return false;

        // Explode outward then settle
        const progress = p.life / p.maxLife;
        const explodePhase = progress < 0.3;
        const settlePhase = progress > 0.5;

        if (explodePhase) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.96;
          p.vy *= 0.96;
        } else if (settlePhase) {
          // Gentle drift
          p.x += Math.sin(p.life * 0.05) * 0.3;
          p.y += Math.cos(p.life * 0.05) * 0.3;
          p.alpha = 1 - (progress - 0.5) * 2;
        } else {
          p.x += p.vx * 0.3;
          p.y += p.vy * 0.3;
        }

        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 - progress * 0.5), 0, Math.PI * 2);
        ctx.fill();

        // Glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        return true;
      });
    };
    animate();

    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, [createParticles]);

  return (
    <div ref={containerRef} className={`relative pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
    </div>
  );
}
