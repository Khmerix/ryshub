import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function GlassPanel({
  children,
  className = '',
  intensity = 15,
}: GlassPanelProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const sheenRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [intensity, -intensity]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [0, 1], [-intensity, intensity]), {
    stiffness: 300,
    damping: 30,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);

    if (sheenRef.current) {
      sheenRef.current.style.background = `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(255,255,255,0.25) 0%, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    setIsHovered(false);
    if (sheenRef.current) {
      sheenRef.current.style.background = 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)';
    }
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative rounded-2xl overflow-hidden ${className}`}
    >
      {/* Glass background */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl" />

      {/* Moving reflective sheen */}
      <div
        ref={sheenRef}
        className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Edge highlight */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none border border-white/10" />
    </motion.div>
  );
}
