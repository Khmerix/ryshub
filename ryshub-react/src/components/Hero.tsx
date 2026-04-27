import Globe from './Globe';
import { Zap, Clock, Laptop, Bot, Boxes } from 'lucide-react';
import DecodeText from './DecodeText';
import GlassPanel from './GlassPanel';

export default function Hero() {
  return (
    <section id="home" className="relative z-10 pt-28 pb-12 px-4 sm:px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        {/* Banner */}
        <div className="relative w-full h-40 sm:h-56 lg:h-72 rounded-2xl overflow-hidden mb-8 shadow-xl shadow-slate-900/5">
          <img
            src="assets/images/page-banner.png"
            alt="Creative Minds Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left content */}
          <GlassPanel className="flex-1 p-6 sm:p-8 lg:p-10">
            <div className="text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
                  <Zap size={14} className="fill-amber-500" />
                  New: Brick Forge 3D builder now live
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/70 text-slate-700 text-xs font-semibold border border-white/50 backdrop-blur-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.5)] animate-pulse" />
                  Live Platform 2026
                </div>
              </div>

              <div className="mb-2">
                <DecodeText
                  text="DIGITAL_LEARNING_PORTAL_v2.6"
                  className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-blue-600 uppercase"
                  delay={300}
                  speed={25}
                />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight mb-5">
                ESL Teacher Ry's{' '}
                <span className="font-space text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Content Hub
                </span>
              </h1>

              <p className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 mb-7">
                Digital tools & resources crafted for modern English learners at{' '}
                <strong className="text-slate-800">ESL Learning Hub</strong>
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8">
                <a
                  href="#/toefl"
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all"
                >
                  Start TOEFL Test
                </a>
                <a
                  href="apps/book1.html"
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-slate-700 bg-white/70 border border-white/80 backdrop-blur-sm shadow-sm hover:bg-white hover:-translate-y-0.5 transition-all"
                >
                  World Class 2-1
                </a>
                <a
                  href="apps/book2b.html"
                  className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-slate-700 bg-white/70 border border-white/80 backdrop-blur-sm shadow-sm hover:bg-white hover:-translate-y-0.5 transition-all"
                >
                  World Class 2-2
                </a>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 text-slate-600 text-xs font-medium border border-white/60 backdrop-blur-sm">
                  <Clock size={14} />
                  Timed Tests
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 text-slate-600 text-xs font-medium border border-white/60 backdrop-blur-sm">
                  <Laptop size={14} />
                  Homework Portal
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 text-slate-600 text-xs font-medium border border-white/60 backdrop-blur-sm">
                  <Bot size={14} />
                  AI Grader
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 text-slate-600 text-xs font-medium border border-white/60 backdrop-blur-sm">
                  <Boxes size={14} />
                  3D Builder
                </div>
              </div>
            </div>
          </GlassPanel>

          {/* Right - Globe */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
            <Globe />
            
            {/* Floating labels around globe */}
            <div className="absolute -top-2 -right-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-xs font-semibold text-slate-700 shadow-lg border border-white/50 animate-float">
              🎓 TOEFL
            </div>
            <div className="absolute bottom-8 -left-4 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-xs font-semibold text-slate-700 shadow-lg border border-white/50 animate-float" style={{ animationDelay: '1s' }}>
              🚀 Colony
            </div>
            <div className="absolute top-1/2 -right-8 px-3 py-1 rounded-full bg-white/80 backdrop-blur text-xs font-semibold text-slate-700 shadow-lg border border-white/50 animate-float" style={{ animationDelay: '2s' }}>
              🧊 BrickForge
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex flex-col items-center mt-12 text-slate-400 text-xs font-medium">
          <span className="mb-2">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-slate-300 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-slate-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
