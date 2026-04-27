import { motion } from 'framer-motion';
import { Gamepad2, Rocket, Zap, Globe, Boxes, Puzzle, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassPanel from '../components/GlassPanel';

const games = [
  {
    title: 'Last Colony',
    description: 'Survive and build your colony on Mars. Resource management with English vocabulary integration.',
    icon: <Rocket size={22} />,
    color: 'from-blue-500 to-indigo-600',
    href: 'apps/games/colony/index.html',
    tag: 'Strategy',
  },
  {
    title: 'Solar System',
    description: 'Explore the planets and learn space-related English terms in this interactive 3D tour.',
    icon: <Globe size={22} />,
    color: 'from-emerald-500 to-teal-600',
    href: 'apps/games/solar-system/index.html',
    tag: 'Exploration',
  },
  {
    title: 'Typing Race',
    description: 'Race against the clock to type English sentences. Improves speed and accuracy.',
    icon: <Zap size={22} />,
    color: 'from-amber-500 to-orange-600',
    href: 'apps/games/typing-race/index.html',
    tag: 'Speed',
  },
  {
    title: 'BrickForge',
    description: '3D block builder with creative mode. Build structures while learning descriptive vocabulary.',
    icon: <Boxes size={22} />,
    color: 'from-purple-500 to-violet-600',
    href: 'apps/brickforge.html',
    tag: '3D Builder',
  },
  {
    title: 'Memory Match',
    description: 'Classic memory card game with vocabulary pairs. Match words to their definitions.',
    icon: <Puzzle size={22} />,
    color: 'from-rose-500 to-pink-600',
    href: 'apps/games/memory-game/index.html',
    tag: 'Memory',
  },
];

export default function GamesPage() {
  return (
    <>
      <PageHeader
        title="Game Arcade"
        subtitle="Learn English through play. Interactive games designed for ESL students."
        icon={<Gamepad2 size={22} />}
      />

      <section className="pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {games.map((game, i) => (
              <motion.a
                key={game.title}
                href={game.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <GlassPanel className="p-6 h-full group cursor-pointer hover:scale-[1.01] transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-white shadow-lg`}>
                      {game.icon}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/70 text-xs font-semibold text-slate-600 border border-white/50 backdrop-blur-sm">
                      {game.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{game.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{game.description}</p>
                </GlassPanel>
              </motion.a>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10"
          >
            <GlassPanel className="p-6 sm:p-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">All Games</h3>
                  <p className="text-sm text-slate-600">View the complete games directory with instructions and leaderboards.</p>
                </div>
                <a
                  href="apps/games/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
                >
                  Game Directory
                  <ExternalLink size={14} />
                </a>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </section>
    </>
  );
}
