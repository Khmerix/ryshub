import { useRef, useState } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export default function GlitchText({
  text,
  className = '',
  as: Tag = 'span',
}: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  const Component = Tag as any;

  return (
    <Component
      ref={ref}
      className={`glitch-text relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-text={text}
    >
      <span className={`glitch-primary ${isHovered ? 'glitch-active' : ''}`}>{text}</span>
      {isHovered && (
        <>
          <span className="glitch-layer glitch-red" aria-hidden="true">{text}</span>
          <span className="glitch-layer glitch-blue" aria-hidden="true">{text}</span>
          <span className="glitch-layer glitch-green" aria-hidden="true">{text}</span>
        </>
      )}
    </Component>
  );
}
