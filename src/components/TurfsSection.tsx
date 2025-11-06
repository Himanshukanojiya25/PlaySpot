import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import TurfCard from './TurfCard';
import turfsData from '../data/turfs.json';

interface TurfsSectionProps {
  onTurfClick: (turfId: string) => void;
}

export default function TurfsSection({ onTurfClick }: TurfsSectionProps) {
  return (
    <section id="turfs" className="relative py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA2YjZkNCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6"
          >
            <Sparkles size={16} className="text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium">Featured Locations</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Discover Our{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Premium Turfs
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore world-class sports facilities designed for champions. Find your perfect playing spot today.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {turfsData.map((turf, index) => (
            <TurfCard
              key={turf.id}
              turf={turf}
              onClick={() => onTurfClick(turf.id)}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
          >
            View All Turfs
          </motion.button>
        </motion.div>
      </div>

      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse delay-1000" />
    </section>
  );
}
