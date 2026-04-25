import { GraduationCap, BookOpen, Rocket, Box, Brain, Puzzle, Zap, Gamepad2 } from 'lucide-react';

const strip1 = [
  { icon: <GraduationCap size={16} />, label: 'TOEFL iBT', color: 'bg-blue-500' },
  { icon: <BookOpen size={16} />, label: 'World Class 2-1', color: 'bg-sky-500' },
  { icon: <BookOpen size={16} />, label: 'World Class 2-2', color: 'bg-emerald-500' },
  { icon: <Box size={16} />, label: 'Brick Forge', color: 'bg-purple-500' },
  { icon: <Brain size={16} />, label: 'EduGrade Pro', color: 'bg-indigo-500' },
  { icon: <Zap size={16} />, label: 'Word Practice', color: 'bg-amber-500' },
  { icon: <Rocket size={16} />, label: 'Last Colony', color: 'bg-slate-600' },
  { icon: <Puzzle size={16} />, label: 'Word Scramble', color: 'bg-blue-600' },
];

const strip2 = [
  { icon: <Gamepad2 size={16} />, label: 'Typing Race', color: 'bg-cyan-500' },
  { icon: <Brain size={16} />, label: 'Memory Match', color: 'bg-violet-500' },
  { icon: <GraduationCap size={16} />, label: 'TOEFL iBT', color: 'bg-blue-500' },
  { icon: <BookOpen size={16} />, label: 'World Class 2-1', color: 'bg-sky-500' },
  { icon: <Box size={16} />, label: 'Brick Forge', color: 'bg-purple-500' },
  { icon: <Rocket size={16} />, label: 'Last Colony', color: 'bg-slate-600' },
  { icon: <Zap size={16} />, label: 'Word Practice', color: 'bg-amber-500' },
  { icon: <Puzzle size={16} />, label: 'Word Scramble', color: 'bg-blue-600' },
];

function FlashCard({ item }: { item: typeof strip1[0] }) {
  return (
    <div className="flex-shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/60 backdrop-blur-sm border border-white/50 shadow-sm text-sm font-medium text-slate-700 hover:bg-white/90 transition-colors cursor-default">
      <span className={`w-6 h-6 rounded-full ${item.color} flex items-center justify-center text-white`}>
        {item.icon}
      </span>
      {item.label}
    </div>
  );
}

export default function FlashStrips() {
  return (
    <div className="relative z-10 py-8 overflow-hidden">
      <div className="flex gap-4 mb-4 animate-scroll-x hover:[animation-play-state:paused]">
        {[...strip1, ...strip1].map((item, i) => (
          <FlashCard key={`s1-${i}`} item={item} />
        ))}
      </div>
      <div className="flex gap-4 animate-scroll-x hover:[animation-play-state:paused]" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
        {[...strip2, ...strip2].map((item, i) => (
          <FlashCard key={`s2-${i}`} item={item} />
        ))}
      </div>
    </div>
  );
}
