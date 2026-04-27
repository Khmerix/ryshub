import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  backTo?: string;
}

export default function PageHeader({ title, subtitle, icon, backTo = '/' }: PageHeaderProps) {
  return (
    <section className="pt-28 pb-8 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Blue banner bar */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="origin-left w-full h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-400 mb-6 shadow-sm shadow-blue-500/20"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to={backTo}
            className="inline-flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="flex items-center gap-3 mb-2">
            {icon && (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                {icon}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
          </div>

          {subtitle && (
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mt-2">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
