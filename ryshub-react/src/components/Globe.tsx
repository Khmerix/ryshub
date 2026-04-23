import { useEffect, useRef, useState } from 'react';
import GlobeGl from 'react-globe.gl';

export default function Globe() {
  const globeRef = useRef<any>(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = globeRef.current;

    // Calculate sun longitude based on current UTC time
    const now = new Date();
    const utcHours = now.getUTCHours() + now.getUTCMinutes() / 60 + now.getUTCSeconds() / 3600;
    const sunLng = -(utcHours / 24) * 360;

    // Set initial point of view to face the sun (day side)
    globe.pointOfView({ lat: 20, lng: sunLng + 20, altitude: 2.2 });

    // Enable auto-rotation synced with Earth's real rotation
    // Earth rotates 360° in 24h = 1 rev per 1440 min
    const controls = globe.controls();
    if (controls) {
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5; // slow visual rotation
      controls.enableZoom = false;
      controls.enablePan = false;
    }

    setIsReady(true);

    // Update point of view every minute to keep synced with time
    const interval = setInterval(() => {
      const n = new Date();
      const h = n.getUTCHours() + n.getUTCMinutes() / 60 + n.getUTCSeconds() / 3600;
      const sl = -(h / 24) * 360;
      globe.pointOfView({ lat: 20, lng: sl + 20, altitude: 2.2 });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const size = width < 768 ? 280 : width < 1024 ? 360 : 520;

  return (
    <div
      className={`relative transition-opacity duration-1000 ${isReady ? 'opacity-100' : 'opacity-0'}`}
      style={{ width: size, height: size }}
    >
      <GlobeGl
        ref={globeRef}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)"
        atmosphereColor="#60a5fa"
        atmosphereAltitude={0.2}
        width={size}
        height={size}
        onGlobeHover={() => {
          if (globeRef.current) {
            globeRef.current.controls().autoRotate = false;
          }
        }}
        onGlobeHoverOut={() => {
          if (globeRef.current) {
            globeRef.current.controls().autoRotate = true;
          }
        }}
      />
    </div>
  );
}
