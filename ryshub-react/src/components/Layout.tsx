import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import SpotlightBackground from './SpotlightBackground';
import FluidBackground from './FluidBackground';

export default function Layout() {
  return (
    <>
      <FluidBackground />
      <SpotlightBackground />
      <Navbar />
      <main className="relative z-10 min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
