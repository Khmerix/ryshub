import { Rocket, Zap, Brain } from 'lucide-react';
import CardFan from './CardFan';
import ParticleBurst from './ParticleBurst';
import DecodeText from './DecodeText';

const fanCards = [
  {
    id: 'toefl',
    title: 'TOEFL',
    description: 'Full mock tests with AI grading',
    color: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    icon: <span className="text-2xl">🎓</span>,
    href: '#/toefl',
  },
  {
    id: 'colony',
    title: 'Colony',
    description: 'Real-time strategy base builder',
    color: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
    icon: <span className="text-2xl">🚀</span>,
    href: 'apps/games/colony/index.html',
  },
  {
    id: 'solar',
    title: 'Solar',
    description: '3D planetary exploration',
    color: 'linear-gradient(135deg, #0891b2, #0e7490)',
    icon: <span className="text-2xl">🪐</span>,
    href: 'apps/games/solar-system/index.html',
  },
  {
    id: 'brickforge',
    title: 'BrickForge',
    description: '3D block building game',
    color: 'linear-gradient(135deg, #ea580c, #c2410c)',
    icon: <span className="text-2xl">🧊</span>,
    href: 'apps/brickforge.html',
  },
  {
    id: 'typing',
    title: 'Typing Race',
    description: 'Speed typing challenges',
    color: 'linear-gradient(135deg, #059669, #047857)',
    icon: <span className="text-2xl">⌨️</span>,
    href: 'apps/games/typing-race/index.html',
  },
];

export default function EffectsShowcase() {
  return (
    <section id="showcase" className="relative z-10 py-14 px-4 sm:px-6 lg:px-10">
      <ParticleBurst className="absolute inset-0" particleCount={80} />
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-6">
          <DecodeText
            text="FEATURED_EXPERIENCES"
            className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase mb-2"
            delay={0}
            speed={30}
          />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Quick Access Deck</h2>
          <p className="text-slate-600">Hover to explore. Click to focus.</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1 w-full max-w-lg mx-auto">
            <CardFan cards={fanCards} />
          </div>

          <div className="flex-1 space-y-4">
            <div className="p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-white/60 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Interactive Learning</h3>
              <p className="text-sm text-slate-600 mb-4">
                Every tool is designed with engagement in mind. From 3D simulations to AI-powered grading,
                students learn faster when they're having fun.
              </p>
              <div className="flex flex-wrap gap-2">
                {['TOEFL', 'Strategy', 'Science', 'Vocabulary', 'Speed', 'Memory'].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Games', value: '5+', icon: <Rocket size={16} /> },
                { label: 'Tools', value: '12+', icon: <Zap size={16} /> },
                { label: 'Students', value: '1K+', icon: <Brain size={16} /> },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-white/60 backdrop-blur-md border border-white/60 text-center"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
