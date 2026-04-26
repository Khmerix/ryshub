import ToolCard from './ToolCard';
import { GraduationCap, BookOpen, Brain, Zap, Timer, Library } from 'lucide-react';

const tools = [
  {
    title: 'TOEFL iBT',
    description: 'Full practice test — Reading, Listening, Speaking, and Writing sections.',
    icon: <GraduationCap size={22} />,
    badge: 'Mock Test',
    meta: '4 Sections',
    dots: { active: 3, total: 5, color: '#2563eb' },
    href: 'apps/toefl/index.html',
    gradient: 'from-blue-500 to-blue-700',
    glow: 'shadow-blue-500/20',
  },
  {
    title: 'World Class 2-1',
    description: 'Teacher\'s Edition with audio, answer keys, and homework portals.',
    icon: <BookOpen size={22} />,
    badge: 'Teacher\'s Edition',
    meta: '12 Units',
    dots: { active: 4, total: 5, color: '#0ea5e9' },
    href: 'apps/book1.html',
    gradient: 'from-sky-400 to-sky-600',
    glow: 'shadow-sky-500/20',
  },
  {
    title: 'World Class 2-2',
    description: 'Teacher\'s Edition with audio, answer keys, and homework portals.',
    icon: <BookOpen size={22} />,
    badge: 'Teacher\'s Edition',
    meta: '12 Units',
    dots: { active: 4, total: 5, color: '#10b981' },
    href: 'apps/book2b.html',
    gradient: 'from-emerald-400 to-emerald-600',
    glow: 'shadow-emerald-500/20',
  },
  {
    title: 'EduGrade Pro',
    description: 'AI-powered grading assistant for essays and speaking responses.',
    icon: <Brain size={22} />,
    badge: 'AI Tool',
    meta: 'Smart Feedback',
    dots: { active: 4, total: 5, color: '#6366f1' },
    href: '#',
    gradient: 'from-indigo-500 to-indigo-700',
    glow: 'shadow-indigo-500/20',
  },
  {
    title: 'Word Practice',
    description: 'Vocabulary drills, spelling tests, and flashcard collections.',
    icon: <Zap size={22} />,
    badge: 'Vocabulary',
    meta: 'Daily Drills',
    dots: { active: 3, total: 5, color: '#f59e0b' },
    href: '#',
    gradient: 'from-amber-400 to-amber-600',
    glow: 'shadow-amber-500/20',
  },
  {
    title: 'Class Timer',
    description: 'Countdown and stopwatch tool for timed activities and classroom sessions.',
    icon: <Timer size={22} />,
    badge: 'Classroom',
    meta: 'Live Timer',
    dots: { active: 4, total: 5, color: '#ef4444' },
    href: 'apps/timer.html',
    gradient: 'from-rose-400 to-rose-600',
    glow: 'shadow-rose-500/20',
  },
  {
    title: 'Story Library',
    description: 'Interactive reading stories — Blackwood Manor, The Secret Cave, and more.',
    icon: <Library size={22} />,
    badge: 'Interactive Fiction',
    meta: '6 Stories',
    dots: { active: 2, total: 6, color: '#a855f7' },
    href: 'apps/books/library.html',
    gradient: 'from-purple-400 to-purple-600',
    glow: 'shadow-purple-500/20',
  },
];

export default function ToolsGrid() {
  return (
    <section id="tools" className="relative z-10 py-14 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Learning Tools</h2>
          <p className="text-slate-600">Everything you need to prepare, practice, and improve.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {tools.map((tool, i) => (
            <ToolCard key={tool.title} {...tool} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
