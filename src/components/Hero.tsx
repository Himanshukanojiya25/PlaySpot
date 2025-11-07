import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Users, MapPin, Star, Clock, Target, Trophy, Activity } from 'lucide-react';

// Floating sports elements component
const FloatingSportsElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Sports Icons */}
      <motion.div
        initial={{ x: -100, y: -100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="absolute top-20 left-10"
      >
        <motion.div
          animate={{ 
            rotate: 360,
            y: [0, -20, 0]
          }}
          transition={{ 
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-10 h-10 bg-cyan-400/60 rounded-full flex items-center justify-center">
            <Trophy size={20} className="text-white" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ x: 100, y: 100, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-40 right-20"
      >
        <motion.div
          animate={{ 
            rotate: -360,
            y: [0, 15, 0]
          }}
          transition={{ 
            rotate: { duration: 5, repeat: Infinity, ease: "linear" },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="w-8 h-8 bg-blue-400/50 rounded-full flex items-center justify-center">
            <Activity size={16} className="text-white" />
          </div>
        </motion.div>
      </motion.div>

      {/* Target Icons */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute top-40 right-16"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Target size={35} className="text-green-400/40" />
        </motion.div>
      </motion.div>

      {/* Floating Users Icons */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-20 left-20"
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Users size={25} className="text-purple-400/40" />
        </motion.div>
      </motion.div>

      {/* Animated Stars */}
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 * i }}
          className="absolute"
          style={{
            top: `${20 + i * 12}%`,
            left: `${70 + i * 4}%`,
          }}
        >
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            <Star size={16} className="text-yellow-400/30" />
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

// Animated Background Gradient
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />
      
      {/* Moving Gradient Orbs */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl"
      />
      
      <motion.div
        animate={{
          x: [0, -100, 0],
          y: [0, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl"
      />

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, 80, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 10
        }}
        className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-500/15 rounded-full filter blur-3xl"
      />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzA2YjZkNCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
    </div>
  );
};

// Particle Effect Component
const ParticleEffect = () => {
  const particles = Array.from({ length: 20 }, (_, i) => i);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          initial={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
            scale: 0,
          }}
          animate={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const scrollToTurfs = () => {
    const element = document.getElementById('turfs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <AnimatedBackground />
      <ParticleEffect />
      <FloatingSportsElements />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
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
              <span className="text-cyan-400 text-sm font-medium">Nagpur's #1 Sports Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="block text-white mb-2">Play. Book.</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Victory.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-400 mb-8 leading-relaxed"
            >
              Discover premium sports turfs across Nagpur. Book cricket, football, and multi-sport facilities instantly with real-time availability.
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
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg text-white font-bold text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center justify-center space-x-2"
              >
                <MapPin size={20} />
                <span>Explore Nagpur Turfs</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-slate-800/50 border border-cyan-500/30 rounded-lg text-white font-bold text-lg backdrop-blur-sm hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
              >
                <Clock size={20} />
                <span>Instant Booking</span>
              </motion.button>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-12 flex items-center justify-center lg:justify-start space-x-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">20+</div>
                <div className="text-gray-400 text-sm">Premium Turfs</div>
              </div>
              <div className="w-px h-12 bg-cyan-500/30" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5k+</div>
                <div className="text-gray-400 text-sm">Happy Players</div>
              </div>
              <div className="w-px h-12 bg-cyan-500/30" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-gray-400 text-sm">Support</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative h-[400px] lg:h-[500px] flex items-center justify-center"
          >
            {/* Main Visual Container */}
            <div className="relative w-full h-full max-w-md">
              {/* Central Animated Circle */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 m-auto w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 rounded-full border border-cyan-500/30"
              />

              {/* Rotating Sports Icons */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 m-auto w-80 h-80"
              >
                {[0, 90, 180, 270].map((rotation, index) => (
                  <motion.div
                    key={index}
                    className="absolute"
                    style={{
                      transform: `rotate(${rotation}deg) translateX(140px) rotate(-${rotation}deg)`,
                    }}
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5
                      }}
                    >
                      {index % 2 === 0 ? (
                        <div className="w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center">
                          <Trophy size={16} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                          <Activity size={16} className="text-white" />
                        </div>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Center Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="text-4xl font-bold text-white mb-2"
                  >
                    🏆
                  </motion.div>
                  <p className="text-cyan-400 font-semibold">Sports Arena</p>
                  <p className="text-gray-400 text-sm">Nagpur</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Button */}
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