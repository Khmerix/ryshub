import { motion } from 'framer-motion';
import { Timer, Play, Pause, RotateCcw, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import GlassPanel from '../components/GlassPanel';

export default function TimerPage() {
  const [timeLeft, setTimeLeft] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [initialTime, setInitialTime] = useState(300);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const presets = [60, 180, 300, 600, 900, 1800];

  return (
    <>
      <PageHeader
        title="Class Timer"
        subtitle="Simple, visual countdown timer for classroom activities and tests."
        icon={<Timer size={22} />}
      />

      <section className="pb-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GlassPanel className="p-8 sm:p-12 text-center">
              <div className="text-7xl sm:text-8xl font-mono font-bold text-slate-900 tracking-tight mb-8">
                {formatTime(timeLeft)}
              </div>

              <div className="flex items-center justify-center gap-3 mb-8">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 ${
                    isRunning
                      ? 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/30 hover:shadow-blue-500/40'
                  }`}
                >
                  {isRunning ? <Pause size={18} /> : <Play size={18} />}
                  {isRunning ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={() => {
                    setIsRunning(false);
                    setTimeLeft(initialTime);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-slate-700 bg-white/70 border border-white/80 backdrop-blur-sm shadow-sm hover:bg-white transition-all"
                >
                  <RotateCcw size={18} />
                  Reset
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => {
                      setIsRunning(false);
                      setInitialTime(preset);
                      setTimeLeft(preset);
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                      initialTime === preset
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'bg-white/50 text-slate-600 border border-white/60 hover:bg-white/80'
                    }`}
                  >
                    {preset < 60 ? `${preset}s` : `${preset / 60}m`}
                  </button>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8"
          >
            <GlassPanel className="p-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">Advanced Timer</h3>
                  <p className="text-sm text-slate-600">Need more options? Use the full-featured timer with sound alerts and custom intervals.</p>
                </div>
                <a
                  href="apps/timer.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
                >
                  Open Advanced Timer
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
