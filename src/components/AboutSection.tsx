import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To make premium sports facilities accessible to everyone and build a vibrant sports community.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Connect with fellow sports enthusiasts and grow together through shared passion for the game.',
    },
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'Every turf is vetted for quality, safety, and world-class amenities before listing.',
    },
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book your spot in seconds with our seamless WhatsApp integration and instant confirmation.',
    },
  ];

  return (
    <section id="about" className="relative py-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA2YjZkNCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Why Choose{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              PlaySpot
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We're revolutionizing how people discover and book sports facilities. Join thousands of happy players.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="relative group"
            >
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-500/20 rounded-2xl p-6 h-full shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/30 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center mb-4 border border-cyan-500/30"
                  >
                    <feature.icon size={32} className="text-cyan-400" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>

                <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/50 rounded-2xl transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/30 rounded-2xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              Ready to Elevate Your Game?
            </h3>
            <p className="text-gray-400 text-lg mb-6">
              Join thousands of players who trust PlaySpot for their sports needs.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                const element = document.getElementById('turfs');
                if (element) element.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all"
            >
              Explore Turfs Now
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500 rounded-full filter blur-3xl opacity-10 animate-pulse" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse delay-1000" />
    </section>
  );
}
