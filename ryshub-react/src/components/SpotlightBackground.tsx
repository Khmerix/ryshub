import { useEffect, useState } from 'react';

export default function SpotlightBackground() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [smoothMouse, setSmoothMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth interpolation
  useEffect(() => {
    let raf: number;
    const animate = () => {
      setSmoothMouse((prev) => ({
        x: prev.x + (mouse.x - prev.x) * 0.08,
        y: prev.y + (mouse.y - prev.y) * 0.08,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [mouse]);

  return (
    <>
      {/* Main spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(800px circle at ${smoothMouse.x}% ${smoothMouse.y}%, rgba(59,130,246,0.12), transparent 50%)`,
        }}
      />
      {/* Secondary warm spotlight */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(600px circle at ${100 - smoothMouse.x}% ${100 - smoothMouse.y}%, rgba(139,92,246,0.08), transparent 50%)`,
        }}
      />
      {/* Sharp inner cone */}
      <div
        className="fixed inset-0 pointer-events-none z-[1]"
        style={{
          background: `radial-gradient(300px circle at ${smoothMouse.x}% ${smoothMouse.y}%, rgba(255,255,255,0.06), transparent 40%)`,
        }}
      />
    </>
  );
}
