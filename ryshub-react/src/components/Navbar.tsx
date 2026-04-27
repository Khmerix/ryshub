import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home',            href: '/' },
    { label: 'TOEFL',           href: '/toefl' },
    { label: 'Books',           href: '/books' },
    { label: 'Arcade',          href: '/#games' },
    { label: 'Game Arcade',     href: '/games' },
    { label: 'Command Center',  href: '/command-center' },
    { label: 'Story Library',   href: '/books' },
    { label: 'Timer',           href: '/timer' },
  ];

  const mobileLinks = [
    { label: '🏠 Home',            href: '/',                              onClick: () => setIsOpen(false) },
    { label: '🎓 TOEFL Test',       href: '/toefl',                        onClick: () => setIsOpen(false) },
    { label: '📖 World Class 2-1',  href: 'apps/book1.html',               onClick: () => setIsOpen(false) },
    { label: '📗 World Class 2-2',  href: 'apps/book2b.html',              onClick: () => setIsOpen(false) },
    { label: '🧊 BrickForge',       href: 'apps/brickforge.html',          onClick: () => setIsOpen(false) },
    { label: '🚀 Last Colony',      href: 'apps/games/colony/index.html',  onClick: () => setIsOpen(false) },
    { label: '🌌 Solar System',     href: 'apps/games/solar-system/index.html', onClick: () => setIsOpen(false) },
  ];

  const isActive = (href: string) => {
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.slice(1);
    return location.pathname === href;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-slate-800 font-semibold text-lg">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
              <GraduationCap size={20} />
            </div>
            <span className="font-space">Ryshub</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 bg-white/60 backdrop-blur-md border border-white/50 rounded-full px-2 py-1.5 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  isActive(link.href)
                    ? 'text-slate-900 bg-white/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-slate-900 rounded-full hover:bg-slate-800 transition-colors"
            >
              Login
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-white/70 backdrop-blur text-slate-700 border border-white/50"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide menu */}
      <div
        className={`fixed inset-y-0 right-0 z-[60] w-72 bg-white/95 backdrop-blur-xl shadow-2xl transform transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6 pt-20 flex flex-col gap-2">
          {mobileLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={link.onClick}
              className="px-4 py-3 text-base font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-6 pt-6 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Contact</div>
            <div className="text-sm text-slate-700 mb-1">Created by ESL Teacher Ry Mam</div>
            <a href="mailto:mam.ry@aii.edu.kh" className="text-sm text-slate-600 hover:text-blue-600 block mb-1">📧 mam.ry@aii.edu.kh</a>
            <a href="tel:+85512617940" className="text-sm text-slate-600 hover:text-blue-600 block">📱 (855) 012 617 940</a>
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-[55] bg-slate-900/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
