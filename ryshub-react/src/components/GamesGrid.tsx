import GameCard from './GameCard';
import { Rocket, Zap, Brain, Globe, Boxes } from 'lucide-react';

const games = [
  {
    title: 'Last Colony',
    description: 'Real-time strategy game with base building and resource management on Mars.',
    icon: <Rocket size={22} />,
    tag: 'Strategy',
    href: 'apps/games/colony/index.html',
    gradient: 'from-slate-500 to-slate-700',
    glow: 'shadow-slate-500/20',
  },
  {
    title: 'Solar System',
    description: 'Explore planets, complete orbital missions, and unlock solar system knowledge in 3D.',
    icon: <Globe size={22} />,
    tag: 'Science',
    href: 'apps/games/solar-system/index.html',
    gradient: 'from-indigo-500 to-purple-700',
    glow: 'shadow-indigo-500/20',
  },
  {
    title: 'BrickForge',
    description: 'Build anything in a 3D voxel sandbox. Place, paint, and sculpt block by block.',
    icon: <Boxes size={22} />,
    tag: 'Creative',
    href: 'apps/brickforge.html',
    gradient: 'from-cyan-500 to-cyan-700',
    glow: 'shadow-cyan-500/20',
  },
  {
    title: 'Typing Race',
    description: 'Race against the clock and improve your typing speed.',
    icon: <Zap size={22} />,
    tag: 'Speed',
    href: 'apps/games/typing-race/index.html',
    gradient: 'from-cyan-500 to-cyan-700',
    glow: 'shadow-cyan-500/20',
  },
  {
    title: 'Memory Match',
    description: 'Match pairs and train your working memory with fun themes.',
    icon: <Brain size={22} />,
    tag: 'Memory',
    href: 'apps/games/memory-game/index.html',
    gradient: 'from-violet-500 to-violet-700',
    glow: 'shadow-violet-500/20',
  },
];

export default function GamesGrid() {
  return (
    <section id="games" className="relative z-10 py-14 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">Arcade</h2>
          <p className="text-slate-600 dark:text-slate-300">Learn while you play.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {games.map((game, i) => (
            <GameCard key={game.title} {...game} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
