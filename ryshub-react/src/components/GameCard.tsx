import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Gamepad2 } from 'lucide-react';
import GlitchText from './GlitchText';

interface GameCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  tag?: string;
  href: string;
  gradient?: string;
  glow?: string;
  delay?: number;
}

export default function GameCard({
  title,
  description,
  icon,
  tag,
  href,
  gradient = 'from-slate-500 to-slate-700',
  glow = 'shadow-slate-500/20',
  delay = 0,
}: GameCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(y, [0, 1], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [0, 1], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative block rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 p-5 shadow-lg ${glow} hover:shadow-xl transition-shadow`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-800 group-hover:text-white transition-colors">
        <ArrowRight size={14} />
      </div>

      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md mb-4`}>
        {icon}
      </div>

      {tag && (
        <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide mb-2">
          {tag}
        </div>
      )}

      <h3 className="text-lg font-bold text-slate-900 mb-1">
        <GlitchText text={title} tag="span" />
      </h3>

      <p className="text-sm text-slate-600 mb-4 line-clamp-2">{description}</p>

      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 bg-slate-100 group-hover:bg-slate-800 group-hover:text-white transition-colors">
        <Gamepad2 size={14} />
        Play
      </div>
    </motion.a>
  );
}
