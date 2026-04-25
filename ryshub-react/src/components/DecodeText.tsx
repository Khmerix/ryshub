import { useEffect, useState, useRef } from 'react';

interface DecodeTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  trigger?: 'mount' | 'hover' | 'in-view';
  tag?: keyof JSX.IntrinsicElements;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export default function DecodeText({
  text,
  className = '',
  delay = 0,
  speed = 30,
  trigger = 'mount',
  tag: Tag = 'span',
}: DecodeTextProps) {
  const [display, setDisplay] = useState(trigger === 'mount' ? scramble(text) : text);
  const [hasTriggered, setHasTriggered] = useState(trigger === 'mount');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const frameRef = useRef<number>(0);

  function scramble(target: string, progress = 0): string {
    return target
      .split('')
      .map((char, i) => {
        if (char === ' ') return ' ';
        if (progress > i) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      })
      .join('');
  }

  const startDecode = () => {
    if (frameRef.current > 0) return;
    setHasTriggered(true);

    let iteration = 0;
    const totalFrames = text.length * 3 + 10;

    intervalRef.current = setInterval(() => {
      iteration++;
      const progress = Math.floor((iteration / totalFrames) * text.length);
      setDisplay(scramble(text, progress));

      if (iteration >= totalFrames) {
        setDisplay(text);
        if (intervalRef.current) clearInterval(intervalRef.current);
        frameRef.current = 0;
      }
    }, speed);
    frameRef.current = 1;
  };

  useEffect(() => {
    if (trigger === 'mount') {
      const timer = setTimeout(startDecode, delay);
      return () => {
        clearTimeout(timer);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      setDisplay(scramble(text));
      startDecode();
    }
  };

  const Component = Tag as any;

  return (
    <Component
      className={`font-mono ${className} ${hasTriggered ? 'decode-active' : ''}`}
      onMouseEnter={handleMouseEnter}
    >
      {display}
    </Component>
  );
}
