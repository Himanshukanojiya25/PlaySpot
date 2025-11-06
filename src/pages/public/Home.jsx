import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Clock, Star, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import SearchBar from '../../components/common/SearchBar';
import Card from '../../components/ui/Card';
import { Suspense, lazy } from 'react';
import ErrorBoundary from '../../components/common/ErrorBoundary';

const SportsBall3D = lazy(() => import('../../components/ui/SportsBall3D'));

const Home = () => {
  const navigate = useNavigate();

  const handleSearch = (searchData) => {
    navigate('/explore', { state: { searchData } });
  };

  const features = [
    {
      icon: Zap,
      title: 'Instant Booking',
      description: 'Book your favorite facilities in seconds with our streamlined process',
      color: 'text-yellow-500',
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Your transactions are protected with bank-level security',
      color: 'text-green-500',
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access and book facilities anytime, anywhere',
      color: 'text-blue-500',
    },
  ];

  const stats = [
    { icon: Users, value: '50K+', label: 'Active Users' },
    { icon: Star, value: '1000+', label: 'Facilities' },
    { icon: TrendingUp, value: '100K+', label: 'Bookings' },
  ];

  const popularSports = [
    {
      name: 'Basketball',
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: '245 facilities',
    },
    {
      name: 'Tennis',
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: '189 facilities',
    },
    {
      name: 'Football',
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: '312 facilities',
    },
    {
      name: 'Swimming',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
      count: '156 facilities',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-dark">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,144,255,0.1),transparent_50%)]" />
        </div>

        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/2 h-96 hidden lg:block">
          <ErrorBoundary>
            <Suspense fallback={null}>
              <SportsBall3D />
            </Suspense>
          </ErrorBoundary>
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block px-4 py-2 bg-primary-500/20 rounded-full mb-6"
              >
                <span className="text-primary-400 font-semibold">
                  Book Your Perfect Game
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
                Find & Book
                <br />
                <span className="text-gradient">Sports Facilities</span>
              </h1>

              <p className="text-xl text-dark-300 mb-8 max-w-lg">
                Discover and book the best sports venues in your area. From basketball courts to tennis clubs, we've got you covered.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/explore')}
                  icon={<ArrowRight className="w-5 h-5" />}
                  iconPosition="right"
                >
                  Explore Facilities
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={() => navigate('/about')}
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="text-center"
                  >
                    <stat.icon className="w-8 h-8 text-primary-400 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-dark-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:block hidden"
            />
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white rounded-full" />
          </motion.div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-dark-900">
        <div className="container-custom">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      <section className="section-padding bg-dark-50 dark:bg-dark-950">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 dark:text-dark-50 mb-4">
              Why Choose SportHub?
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              Experience the easiest way to book sports facilities with our innovative platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card hoverable padding="lg" className="text-center h-full">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-dark-900 dark:text-dark-50 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-dark-600 dark:text-dark-400">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white dark:bg-dark-900">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-dark-900 dark:text-dark-50 mb-4">
              Popular Sports
            </h2>
            <p className="text-xl text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              Browse facilities by your favorite sport
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSports.map((sport, index) => (
              <motion.div
                key={sport.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/explore?sport=${sport.name.toLowerCase()}`)}
                className="cursor-pointer group"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <img
                    src={sport.image}
                    alt={sport.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{sport.name}</h3>
                    <p className="text-dark-200">{sport.count}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding gradient-primary">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of athletes and sports enthusiasts who trust SportHub for their facility bookings
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="accent"
                size="lg"
                onClick={() => navigate('/signup')}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
              >
                Create Account
              </Button>
              <Button
                variant="ghost"
                size="lg"
                onClick={() => navigate('/explore')}
                className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border-white/30"
              >
                Browse Facilities
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
