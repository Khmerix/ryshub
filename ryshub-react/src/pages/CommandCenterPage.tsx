import { motion } from 'framer-motion';
import { LayoutDashboard, PenSquare, BookOpen, Clock, BarChart3, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassPanel from '../components/GlassPanel';

const tools = [
  {
    title: 'Writing Trainer',
    description: 'AI-assisted writing practice with instant feedback on grammar, vocabulary, and structure.',
    icon: <PenSquare size={22} />,
    color: 'from-blue-500 to-indigo-600',
    href: 'apps/writing-trainer/index.html',
  },
  {
    title: 'Student Tracker',
    description: 'Track student progress, attendance, and assignment completion across all classes.',
    icon: <BarChart3 size={22} />,
    color: 'from-emerald-500 to-teal-600',
    href: 'apps/student-tracker.html',
  },
  {
    title: 'Homework Portal',
    description: 'Assign and collect homework with automated grading and progress analytics.',
    icon: <BookOpen size={22} />,
    color: 'from-amber-500 to-orange-600',
    href: 'apps/files%20seperate/homework/homework_portal.html',
  },
  {
    title: 'Class Timer',
    description: 'Visual countdown timer for classroom activities, tests, and breaks.',
    icon: <Clock size={22} />,
    color: 'from-rose-500 to-pink-600',
    href: 'apps/timer.html',
  },
];

export default function CommandCenterPage() {
  return (
    <>
      <PageHeader
        title="Command Center"
        subtitle="Teacher tools for managing classes, tracking progress, and assigning work."
        icon={<LayoutDashboard size={22} />}
      />

      <section className="pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            {tools.map((tool, i) => (
              <motion.a
                key={tool.title}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <GlassPanel className="p-6 h-full group cursor-pointer hover:scale-[1.01] transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center text-white shadow-lg`}>
                      {tool.icon}
                    </div>
                    <ExternalLink size={16} className="text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{tool.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{tool.description}</p>
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
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Legacy Command Center</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">Access the original full-featured teacher dashboard.</p>
                </div>
                <a
                  href="apps/command-center.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
                >
                  Open Dashboard
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
