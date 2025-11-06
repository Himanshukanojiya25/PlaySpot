import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, SlidersHorizontal } from 'lucide-react';
import SearchBar from '../../components/common/SearchBar';
import FacilityCard from '../../components/user/FacilityCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

const Explore = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: '',
    priceRange: [0, 100],
    amenities: [],
    rating: 0,
  });

  const mockFacilities = [
    {
      _id: '1',
      name: 'Elite Sports Arena',
      type: 'Basketball',
      location: { address: '123 Sports St, Downtown' },
      pricePerHour: 25,
      rating: 4.8,
      reviewsCount: 142,
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Parking', 'Showers', 'Lockers'],
    },
    {
      _id: '2',
      name: 'Grand Tennis Club',
      type: 'Tennis',
      location: { address: '456 Court Ave, Uptown' },
      pricePerHour: 35,
      rating: 4.9,
      reviewsCount: 98,
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Pro Shop', 'Coaching', 'Restaurant'],
    },
    {
      _id: '3',
      name: 'Victory Football Stadium',
      type: 'Football',
      location: { address: '789 Field Rd, Westside' },
      pricePerHour: 50,
      rating: 4.7,
      reviewsCount: 215,
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Floodlights', 'Parking', 'Changing Rooms'],
    },
    {
      _id: '4',
      name: 'AquaSports Complex',
      type: 'Swimming',
      location: { address: '321 Pool Lane, Eastside' },
      pricePerHour: 20,
      rating: 4.6,
      reviewsCount: 167,
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Heated Pool', 'Sauna', 'Gym'],
    },
    {
      _id: '5',
      name: 'Champions Basketball Court',
      type: 'Basketball',
      location: { address: '555 Hoops St, Midtown' },
      pricePerHour: 30,
      rating: 4.5,
      reviewsCount: 89,
      image: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Indoor', 'Air Conditioning', 'Water'],
    },
    {
      _id: '6',
      name: 'ProTennis Center',
      type: 'Tennis',
      location: { address: '777 Match Point Dr, Northside' },
      pricePerHour: 40,
      rating: 4.9,
      reviewsCount: 201,
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      amenities: ['Clay Courts', 'Hard Courts', 'Coaching'],
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setFacilities(mockFacilities);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSearch = (searchData) => {
    setLoading(true);
    setTimeout(() => {
      setFacilities(mockFacilities);
      setLoading(false);
    }, 800);
  };

  const facilityTypes = ['All', 'Basketball', 'Tennis', 'Football', 'Swimming', 'Badminton'];

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 pt-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold text-dark-900 dark:text-dark-50 mb-4">
            Explore Facilities
          </h1>
          <p className="text-xl text-dark-600 dark:text-dark-400">
            Find the perfect venue for your next game
          </p>
        </motion.div>

        <div className="mb-8">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <Card padding="lg" className="sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-50 flex items-center gap-2">
                  <SlidersHorizontal className="w-6 h-6" />
                  Filters
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-3">
                    Sport Type
                  </label>
                  <div className="space-y-2">
                    {facilityTypes.map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          name="type"
                          value={type}
                          checked={filters.type === type || (type === 'All' && !filters.type)}
                          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                          className="w-4 h-4 text-primary-500 focus:ring-primary-500"
                        />
                        <span className="text-dark-700 dark:text-dark-300 group-hover:text-primary-500 transition-colors">
                          {type}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-3">
                    Price Range (per hour)
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters({ ...filters, priceRange: [0, parseInt(e.target.value)] })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-dark-600 dark:text-dark-400">
                      <span>${filters.priceRange[0]}</span>
                      <span>${filters.priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-3">
                    Minimum Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => setFilters({ ...filters, rating: parseFloat(e.target.value) })}
                    className="input-field"
                  >
                    <option value="0">All Ratings</option>
                    <option value="4">4+ Stars</option>
                    <option value="4.5">4.5+ Stars</option>
                    <option value="4.8">4.8+ Stars</option>
                  </select>
                </div>

                <Button variant="primary" fullWidth onClick={() => handleSearch(filters)}>
                  Apply Filters
                </Button>
              </div>
            </Card>
          </motion.aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-dark-600 dark:text-dark-400">
                {facilities.length} facilities found
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
                icon={<Filter className="w-5 h-5" />}
              >
                Filters
              </Button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="xl" />
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {facilities.map((facility, index) => (
                  <FacilityCard key={facility._id} facility={facility} index={index} />
                ))}
              </div>
            )}

            {!loading && facilities.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <p className="text-xl text-dark-600 dark:text-dark-400">
                  No facilities found. Try adjusting your filters.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
