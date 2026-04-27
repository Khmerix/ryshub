import { motion } from 'framer-motion';
import { LogIn, GraduationCap, Mail, Lock } from 'lucide-react';
import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import GlassPanel from '../components/GlassPanel';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <PageHeader
        title="Teacher Login"
        subtitle="Access your dashboard, student data, and teaching tools."
        icon={<LogIn size={22} />}
      />

      <section className="pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassPanel className="p-8">
              <div className="text-center mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 mx-auto mb-4">
                  <GraduationCap size={28} />
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to RysHub Studio</p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href = 'apps/login.html';
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="mam.ry@aii.edu.kh"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-white/60 dark:border-slate-600/60 backdrop-blur-sm text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/70 dark:bg-slate-800/70 border border-white/60 dark:border-slate-600/60 backdrop-blur-sm text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
                >
                  <LogIn size={16} />
                  Sign In
                </button>
              </form>

              <div className="mt-6 pt-6 border-t border-white/50 text-center">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  For demo access, use the legacy login page.
                </p>
              </div>
            </GlassPanel>
          </motion.div>
        </div>
      </section>
    </>
  );
}
