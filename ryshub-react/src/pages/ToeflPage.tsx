import { motion } from 'framer-motion';
import { GraduationCap, Headphones, Mic, BookOpen, PenLine, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassPanel from '../components/GlassPanel';

const sections = [
  {
    title: 'Reading',
    description: 'Academic passages with comprehension questions. Practice skimming, scanning, and inference skills.',
    icon: <BookOpen size={22} />,
    color: 'from-blue-500 to-indigo-600',
    href: 'apps/toefl/toeflreading-MIGRATED.html',
  },
  {
    title: 'Listening',
    description: 'Conversations, lectures, and announcements. Train your ear for academic English.',
    icon: <Headphones size={22} />,
    color: 'from-emerald-500 to-teal-600',
    href: 'apps/toefl/listening/toefllistening-MIGRATED.html',
  },
  {
    title: 'Speaking',
    description: 'Independent and integrated speaking tasks with timed responses and sample answers.',
    icon: <Mic size={22} />,
    color: 'from-amber-500 to-orange-600',
    href: 'apps/toefl/Speaking/toeflspeaking-MIGRATED.html',
  },
  {
    title: 'Writing',
    description: 'Integrated and independent writing prompts with rubrics and model essays.',
    icon: <PenLine size={22} />,
    color: 'from-rose-500 to-pink-600',
    href: 'apps/toefl/toeflwriting-MIGRATED.html',
  },
];

export default function ToeflPage() {
  return (
    <>
      <PageHeader
        title="TOEFL iBT"
        subtitle="Comprehensive practice materials for all four sections of the Test of English as a Foreign Language."
        icon={<GraduationCap size={22} />}
      />

      <section className="pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            {sections.map((section, i) => (
              <motion.a
                key={section.title}
                href={section.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <GlassPanel className="p-6 h-full group cursor-pointer hover:scale-[1.01] transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-lg`}>
                      {section.icon}
                    </div>
                    <ExternalLink size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{section.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{section.description}</p>
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
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Full TOEFL Portal</h3>
                  <p className="text-sm text-slate-600">Access the complete migrated TOEFL interface with all sections in one place.</p>
                </div>
                <a
                  href="apps/toefl/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
                >
                  Open Portal
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
