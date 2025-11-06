import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Filter } from 'lucide-react';
import Button from '../ui/Button';

const SearchBar = ({ onSearch, className = '' }) => {
  const [searchData, setSearchData] = useState({
    query: '',
    location: '',
    date: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchData);
    }
  };

  const handleChange = (field, value) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      onSubmit={handleSubmit}
      className={`glass-strong rounded-2xl p-4 shadow-2xl ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="text"
            placeholder="Search facilities..."
            value={searchData.query}
            onChange={(e) => handleChange('query', e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/20 dark:bg-dark-900/20 border border-white/30 dark:border-dark-700/30 rounded-xl text-dark-900 dark:text-dark-50 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="relative">
          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="text"
            placeholder="Location"
            value={searchData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/20 dark:bg-dark-900/20 border border-white/30 dark:border-dark-700/30 rounded-xl text-dark-900 dark:text-dark-50 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
          <input
            type="date"
            value={searchData.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/20 dark:bg-dark-900/20 border border-white/30 dark:border-dark-700/30 rounded-xl text-dark-900 dark:text-dark-50 placeholder:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          icon={<Filter className="w-5 h-5" />}
        >
          Search
        </Button>
      </div>
    </motion.form>
  );
};

export default SearchBar;
