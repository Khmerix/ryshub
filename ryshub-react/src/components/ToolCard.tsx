import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
  meta?: string;
  dots?: { active: number; total: number; color: string };
  href: string;
  gradient?: string;
  glow?: string;
  delay?: number;
}

export default function ToolCard({
  title,
  description,
  icon,
  badge,
  meta,
  dots,
  href,
  gradient = 'from-blue-500 to-blue-700',
  glow = 'shadow-blue-500/20',
  delay = 0,
}: ToolCardProps) {
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
      className={`group relative block rounded-2xl bg-white/70 dark:bg-slate-800/60 backdrop-blur-md border border-white/60 dark:border-slate-600/40 p-5 shadow-lg ${glow} hover:shadow-xl transition-shadow`}
    >
      {/* Shine overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/40 dark:from-slate-700/40 via-white/10 dark:via-slate-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      {/* Arrow */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 group-hover:bg-blue-500 group-hover:text-white transition-colors">
        <ArrowRight size={14} />
      </div>

      {/* Icon */}
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-md mb-4`}>
        {icon}
      </div>

      {/* Badge */}
      {badge && (
        <div className="inline-block px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[10px] font-bold uppercase tracking-wide mb-2">
          {badge}
        </div>
      )}

      {/* Title */}
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">{title}</h3>

      {/* Description */}
      <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">{description}</p>

      {/* Meta row */}
      <div className="flex items-center justify-between mb-4">
        {meta && <span className="text-xs text-slate-500 dark:text-slate-400">{meta}</span>}
        {dots && (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: dots.total }).map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i < dots.active ? '' : 'bg-slate-200 dark:bg-slate-600'
                }`}
                style={{ backgroundColor: i < dots.active ? dots.color : undefined }}
              />
            ))}
          </div>
        )}
      </div>

      {/* Button */}
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-slate-900 dark:bg-blue-600 group-hover:bg-slate-800 dark:group-hover:bg-blue-500 transition-colors">
        <Play size={14} className="fill-white" />
        Start
      </div>
    </motion.a>
  );
}
