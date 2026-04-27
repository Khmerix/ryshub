import { motion } from 'framer-motion';
import { BookOpen, BookMarked, Ghost, Mountain, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import GlassPanel from '../components/GlassPanel';

const books = [
  {
    title: 'World Class 2-1',
    description: 'Interactive digital textbook with audio, vocabulary drills, and homework portal.',
    icon: <BookOpen size={22} />,
    color: 'from-blue-500 to-indigo-600',
    href: 'apps/book1.html',
    tag: 'Textbook',
  },
  {
    title: 'World Class 2-2',
    description: 'Second semester interactive book with grammar, reading, and writing modules.',
    icon: <BookMarked size={22} />,
    color: 'from-emerald-500 to-teal-600',
    href: 'apps/book2b.html',
    tag: 'Textbook',
  },
  {
    title: 'Blackwood Manor',
    description: 'An interactive murder-mystery reading experience. Investigate clues and choose your ending.',
    icon: <Ghost size={22} />,
    color: 'from-purple-500 to-violet-600',
    href: 'apps/books/blackwood-manor/index.html',
    tag: 'Interactive Story',
  },
  {
    title: 'The Secret Cave',
    description: 'Choose-your-own-adventure story with branching paths and vocabulary challenges.',
    icon: <Mountain size={22} />,
    color: 'from-amber-500 to-orange-600',
    href: 'apps/books/the-secret-cave/index.html',
    tag: 'Interactive Story',
  },
];

export default function BooksPage() {
  return (
    <>
      <PageHeader
        title="Story Library"
        subtitle="Interactive books and digital textbooks for ESL learners."
        icon={<BookOpen size={22} />}
      />

      <section className="pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            {books.map((book, i) => (
              <motion.a
                key={book.title}
                href={book.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <GlassPanel className="p-6 h-full group cursor-pointer hover:scale-[1.01] transition-transform">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${book.color} flex items-center justify-center text-white shadow-lg`}>
                      {book.icon}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/70 text-xs font-semibold text-slate-600 border border-white/50 backdrop-blur-sm">
                      {book.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{book.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{book.description}</p>
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
                  <h3 className="text-lg font-bold text-slate-900 mb-1">Full Library</h3>
                  <p className="text-sm text-slate-600">Browse the complete story library with all titles and reading levels.</p>
                </div>
                <a
                  href="apps/books/library.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
                >
                  Browse Library
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
