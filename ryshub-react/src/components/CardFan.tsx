import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface FanCard {
  id: string;
  title: string;
  description?: string;
  image?: string;
  color?: string;
  icon?: React.ReactNode;
  href?: string;
}

interface CardFanProps {
  cards: FanCard[];
  className?: string;
}

export default function CardFan({ cards, className = '' }: CardFanProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getCardStyle = (index: number, total: number) => {
    const center = (total - 1) / 2;
    const offset = index - center;
    
    if (!isHovered && selectedIndex === null) {
      return {
        rotate: offset * 3,
        x: offset * 12,
        y: Math.abs(offset) * 4,
        scale: 1,
        zIndex: index,
      };
    }

    if (selectedIndex !== null) {
      const isSelected = index === selectedIndex;
      return {
        rotate: isSelected ? 0 : offset * 8,
        x: isSelected ? 0 : offset * 60,
        y: isSelected ? -20 : Math.abs(offset) * 10,
        scale: isSelected ? 1.15 : 0.95,
        zIndex: isSelected ? total + 1 : total - Math.abs(index - selectedIndex),
      };
    }

    return {
      rotate: offset * 12,
      x: offset * 40,
      y: Math.abs(offset) * 6,
      scale: 1,
      zIndex: index,
    };
  };

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center h-80 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setSelectedIndex(null);
      }}
    >
      {cards.map((card, index) => {
        const style = getCardStyle(index, cards.length);
        return (
          <motion.div
            key={card.id}
            className="absolute w-48 h-64 rounded-2xl cursor-pointer select-none"
            initial={false}
            animate={{
              rotate: style.rotate,
              x: style.x,
              y: style.y,
              scale: style.scale,
              zIndex: style.zIndex,
            }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 25,
            }}
            onClick={() => {
              if (card.href) {
                window.open(card.href, '_blank');
              } else {
                setSelectedIndex(selectedIndex === index ? null : index);
              }
            }}
            style={{
              transformOrigin: 'bottom center',
              background: card.color || 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              boxShadow: '0 10px 40px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.1)',
            }}
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden p-4 flex flex-col items-center justify-center text-white border border-white/20">
              {card.image && (
                <img
                  src={card.image}
                  alt={card.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
              )}
              <div className="relative z-10 flex flex-col items-center text-center">
                {card.icon && <div className="mb-3 text-3xl">{card.icon}</div>}
                <h3 className="text-lg font-bold mb-1 drop-shadow-lg">{card.title}</h3>
                {card.description && (
                  <p className="text-xs text-white/80 line-clamp-2">{card.description}</p>
                )}
                {card.href && (
                  <span className="mt-2 text-[10px] uppercase tracking-wider text-white/60 font-semibold">
                    Click to open →
                  </span>
                )}
              </div>
              {/* Glass reflection */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
