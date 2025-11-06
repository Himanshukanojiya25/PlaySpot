import { motion } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import React, { useState } from 'react';

function Client3DLoader() {
  const [Loaded, setLoaded] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const mod = await import('./Hero3D');
      // store the component itself, not a function that returns it
      setLoaded(mod.default ?? null);
    } catch (err: any) {
      const msg = String(err?.message ?? err);
      // surface the error for easier debugging in devtools
      // and keep a user-visible error message
      // eslint-disable-next-line no-console
      console.error('Error loading 3D scene:', err);
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // Auto-load the 3D scene on mount so users see it without an extra click.
  // Keep the manual button as a fallback (and in case auto-load fails).
  React.useEffect(() => {
    // call without awaiting so UI remains responsive
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (Loaded) {
    const Comp = Loaded as React.ComponentType;
    return <Comp />;
  }

  return (
    <div className="text-center">
      {error ? <p className="text-red-400 mb-2">Failed to load 3D scene.</p> : null}
      <button
        onClick={load}
        className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600"
        disabled={loading}
      >
        {loading ? 'Loading 3D...' : 'Load 3D Scene'}
      </button>
    </div>
  );
}

export default function Hero() {
  const scrollToTurfs = () => {
    const element = document.getElementById('turfs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA2YjZkNCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6"
            >
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Premium Sports Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="block text-white mb-2">Find. Play.</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Connect.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-400 mb-8 leading-relaxed"
            >
              Discover premium sports turfs and clubs near you. Book your perfect playing spot in seconds and elevate your game.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTurfs}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
              >
                Explore Turfs
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white font-bold text-lg backdrop-blur-sm hover:bg-slate-800 transition-all"
              >
                Learn More
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center justify-center lg:justify-start space-x-8"
            >
              <div>
                <div className="text-3xl font-bold text-white">50+</div>
                <div className="text-gray-400 text-sm">Premium Turfs</div>
              </div>
              <div className="w-px h-12 bg-cyan-500/30" />
              <div>
                <div className="text-3xl font-bold text-white">10k+</div>
                <div className="text-gray-400 text-sm">Happy Players</div>
              </div>
              <div className="w-px h-12 bg-cyan-500/30" />
              <div>
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-gray-400 text-sm">Availability</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[400px] lg:h-[600px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-full filter blur-3xl" />
            {/* Render a lightweight placeholder and allow the user to load the 3D scene on demand.
                This avoids runtime crashes caused by incompatible react/@react-three versions. */}
            <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Client3DLoader />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.button
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={scrollToTurfs}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-cyan-400 cursor-pointer z-20"
      >
        <ChevronDown size={40} />
      </motion.button>
    </section>
  );
}
