import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, Users, MapPin, Star, Clock, Target, Trophy, Zap } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

// 3D Cubic Card Component with Cyan/Blue Theme
const CubicCard3D = ({ icon: Icon, title, description, delay }: any) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        y: -15,
        rotateY: 10,
        rotateX: -5,
        transition: { duration: 0.4 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group cursor-pointer perspective-1000"
    >
      {/* 3D Cubic Container */}
      <motion.div
        animate={{
          rotateY: isHovered ? 8 : 0,
          rotateX: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl p-6 shadow-2xl shadow-cyan-500/20 transform-style-3d"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Cubic Side Shadows */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-2xl blur-sm -z-10 transform translate-z-[-10px]" />
        
        {/* Shine Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.3 : 0,
            x: isHovered ? '100%' : '-100%',
          }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent transform -skew-x-12 rounded-2xl"
        />
        
        <div className="relative z-10 transform-style-3d">
          <motion.div
            animate={{ 
              scale: isHovered ? 1.3 : 1,
              rotate: isHovered ? 360 : 0,
              y: isHovered ? -5 : 0
            }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 mx-auto shadow-lg shadow-cyan-500/50"
          >
            <Icon size={28} className="text-white" />
          </motion.div>
          
          <motion.h3 
            animate={{ color: isHovered ? '#06b6d4' : '#ffffff' }}
            className="text-white font-bold text-lg text-center mb-2"
          >
            {title}
          </motion.h3>
          <motion.p 
            animate={{ color: isHovered ? '#67e8f9' : '#9ca3af' }}
            className="text-gray-400 text-sm text-center"
          >
            {description}
          </motion.p>
        </div>

        {/* Floating Particles on Hover */}
        {isHovered && (
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: Math.random() * 100 - 50,
                  y: Math.random() * 100 - 50
                }}
                transition={{ duration: 1, delay: i * 0.2 }}
                className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                style={{
                  left: '50%',
                  top: '50%',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Outer Glow */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-2xl -z-10"
      />
    </motion.div>
  );
};

// Floating Interactive Elements with Cyan/Blue Theme
const InteractiveElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition(prev => ({
        x: prev.x + (e.clientX - prev.x) * 0.05,
        y: prev.y + (e.clientY - prev.y) * 0.05
      }));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Slow Mouse Following Gradient */}
      <motion.div
        animate={{
          x: mousePosition.x - 200,
          y: mousePosition.y - 200,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
        className="absolute w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-600/5 rounded-full blur-3xl opacity-40"
      />

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -40, 0],
          rotateY: [0, 180, 360],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-24 left-16"
      >
        <motion.div
          whileHover={{ 
            scale: 1.4, 
            rotateY: 180,
            transition: { duration: 0.6 }
          }}
          className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyan-500/40 cursor-pointer transform-style-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Trophy size={32} className="text-white" />
        </motion.div>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 30, 0],
          rotateX: [0, 180, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute bottom-40 right-20"
      >
        <motion.div
          whileHover={{ 
            scale: 1.4, 
            rotateX: 180,
            transition: { duration: 0.6 }
          }}
          className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40 cursor-pointer transform-style-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <Target size={28} className="text-white" />
        </motion.div>
      </motion.div>

      {/* Floating Stars */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute cursor-pointer"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -25, 0],
            rotateY: [0, 90, 180, 270, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
          whileHover={{
            scale: 1.8,
            rotateY: 0,
            transition: { duration: 0.3 }
          }}
        >
          <Star size={16} className="text-cyan-400/50 hover:text-cyan-300 transition-colors" />
        </motion.div>
      ))}
    </div>
  );
};

// Advanced Particle System with Cyan/Blue Theme
const AdvancedParticles = () => {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 25 + 15,
    delay: Math.random() * 8,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-cyan-400/30 rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
          }}
          initial={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
            scale: 0,
          }}
          animate={{
            x: Math.random() * 100 + 'vw',
            y: Math.random() * 100 + 'vh',
            scale: [0, 1, 0],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

// Main 3D Structure for Right Side
const Main3DStructure = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="relative h-[500px] lg:h-[600px] flex items-center justify-center"
    >
      {/* Main 3D Container */}
      <motion.div
        animate={{
          rotateY: [0, 360],
          rotateX: [0, 15, 0],
        }}
        transition={{
          rotateY: { duration: 25, repeat: Infinity, ease: "linear" },
          rotateX: { duration: 8, repeat: Infinity, ease: "easeInOut" },
        }}
        className="relative w-96 h-96 transform-style-3d"
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Central 3D Core */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/25 via-blue-500/25 to-cyan-400/25 rounded-3xl border border-cyan-400/40 backdrop-blur-xl shadow-2xl shadow-cyan-500/30"
        >
          {/* Pattern Overlay */}
          <div className="absolute inset-4 bg-gradient-to-br from-cyan-600/10 to-blue-600/10 rounded-2xl blur-sm" />
          
          {/* 3D Elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                rotateY: 360,
                rotateX: [0, 45, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotateY: { duration: 12 + i * 3, repeat: Infinity, ease: "linear" },
                rotateX: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 },
                scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }
              }}
              className="absolute"
              style={{
                transform: `rotate(${i * 45}deg) translateX(220px) rotate(-${i * 45}deg)`,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.8, rotate: 180 }}
                className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl shadow-lg shadow-cyan-500/50 cursor-pointer transform-style-3d"
                style={{ transformStyle: 'preserve-3d' }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotateY: 180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
            className="text-center transform-style-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotateY: [0, 180, 360]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-6xl mb-6"
            >
              🏆
            </motion.div>
            <motion.p
              animate={{ opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text font-bold text-2xl mb-2"
            >
              SPORTS HUB
            </motion.p>
            <p className="text-gray-400 text-lg">Nagpur</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Badges */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          rotateZ: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 rounded-2xl shadow-2xl shadow-cyan-500/40 transform-style-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <span className="text-white text-sm font-bold">⭐ 4.9/5</span>
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotateZ: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-12 left-8 bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-3 rounded-2xl shadow-2xl shadow-green-500/40 transform-style-3d"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <span className="text-white text-sm font-bold">🚀 Trending</span>
      </motion.div>
    </motion.div>
  );
};

// Main Hero Component
export default function Hero() {
  const scrollToTurfs = () => {
    const element = document.getElementById('turfs');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickBook = () => {
    // Scroll to turfs section and open first turf directly
    scrollToTurfs();
    
    // You can add additional logic here for quick booking
    setTimeout(() => {
      const firstTurf = document.querySelector('[data-turf-card]');
      if (firstTurf) {
        (firstTurf as HTMLElement).click();
      }
    }, 1000);
  };

  const cubicCards = [
    {
      icon: Trophy,
      title: "Premium Turfs",
      description: "Professional facilities"
    },
    {
      icon: Users,
      title: "Team Booking", 
      description: "Group packages"
    },
    {
      icon: Zap,
      title: "Instant Book",
      description: "Quick reservation"
    },
    {
      icon: Target,
      title: "Multi-Sports",
      description: "Various games"
    }
  ];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        {/* Base Gradient - Original Cyan/Blue */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950" />
        
        {/* Slower Animated Gradient Orbs */}
        <motion.div
          animate={{
            x: [0, 80, 0],
            y: [0, -40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"
        />
        
        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 15
          }}
          className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full filter blur-3xl"
        />

        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, 70, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8
          }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-cyan-400/8 rounded-full filter blur-3xl"
        />
      </div>

      <AdvancedParticles />
      <InteractiveElements />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-6 backdrop-blur-sm"
            >
              <Sparkles size={16} className="text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium">Nagpur's Premier Sports Platform</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="block text-white mb-2">Elite Sports</span>
              <motion.span 
                className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0%', '100%', '0%'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%',
                }}
              >
                Experience
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-gray-300 mb-8 leading-relaxed"
            >
              Premium sports arenas in Nagpur with professional facilities, 
              instant booking, and tournament-ready turfs for passionate players.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 25px 50px rgba(6, 182, 212, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToTurfs}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl text-white font-bold text-lg shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 transition-all flex items-center justify-center space-x-3 group"
              >
                <MapPin size={20} />
                <span>Explore Turfs</span>
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="group-hover:translate-x-1 transition-transform"
                >
                  <ChevronDown size={16} className="rotate-90" />
                </motion.div>
              </motion.button>

              {/* IMPROVED QUICK BOOK BUTTON */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: 'rgba(30, 41, 59, 0.9)',
                  borderColor: 'rgba(6, 182, 212, 0.6)',
                  boxShadow: "0 20px 40px rgba(6, 182, 212, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleQuickBook}
                className="px-8 py-4 bg-slate-800/70 border border-cyan-500/40 rounded-2xl text-white font-bold text-lg backdrop-blur-sm hover:bg-slate-800/90 transition-all flex items-center justify-center space-x-3 group relative overflow-hidden"
              >
                {/* Animated Background */}
                <motion.div
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent transform -skew-x-12"
                />
                
                <Zap size={20} className="text-cyan-400 relative z-10" />
                <span className="relative z-10">Quick Book</span>
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="group-hover:scale-110 transition-transform relative z-10"
                >
                  <Sparkles size={16} className="text-cyan-400" />
                </motion.div>
              </motion.button>
            </motion.div>

            {/* Cubic Cards Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="grid grid-cols-2 gap-6"
            >
              {cubicCards.map((card, index) => (
                <CubicCard3D
                  key={card.title}
                  icon={card.icon}
                  title={card.title}
                  description={card.description}
                  delay={1.2 + index * 0.15}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right 3D Structure */}
          <Main3DStructure />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        onClick={scrollToTurfs}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-cyan-400 cursor-pointer z-20 group"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-14 h-14 bg-cyan-500/10 border border-cyan-400/30 rounded-2xl flex items-center justify-center backdrop-blur-sm transform-style-3d"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <ChevronDown size={26} className="group-hover:text-cyan-300 transition-colors" />
        </motion.div>
      </motion.button>

      {/* Add CSS for 3D transforms */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transformStyle: preserve-3d;
        }
      `}</style>
    </section>
  );
}