import { motion } from 'framer-motion';
import { MapPin, Star, Users, DollarSign, ArrowRight, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Card from '../ui/Card';
import Button from '../ui/Button';

const FacilityCard = ({ facility, index = 0 }) => {
  const navigate = useNavigate();

  const {
    _id,
    name,
    type,
    location,
    pricePerPerson, // Changed from pricePerHour
    rating = 4.5,
    reviewsCount = 0,
    image,
    amenities = [],
    capacity = { min: 5, max: 20, recommended: 10 }, // Added capacity
    equipmentAvailable = false // Added equipment availability
  } = facility;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Card hoverable onClick={() => navigate(`/facility/${_id}`)} padding="none" className="overflow-hidden group">
        <div className="relative h-48 overflow-hidden">
          <motion.img
            src={image || 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800'}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Type Badge */}
          <div className="absolute top-4 right-4">
            <div className="px-3 py-1 bg-primary-500 text-white text-sm font-semibold rounded-full">
              {type}
            </div>
          </div>

          {/* Rating */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
            <span className="text-sm">({reviewsCount})</span>
          </div>

          {/* Equipment Available Badge */}
          {equipmentAvailable && (
            <div className="absolute top-4 left-4">
              <div className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                <Shield className="w-3 h-3" />
                <span>Bats & Balls</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-dark-900 dark:text-dark-50 mb-2 group-hover:text-primary-500 transition-colors">
            {name}
          </h3>

          <div className="space-y-2 mb-4">
            {/* Location */}
            <div className="flex items-center gap-2 text-dark-600 dark:text-dark-400">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{location?.address || 'Location not specified'}</span>
            </div>
            
            {/* People Capacity */}
            <div className="flex items-center gap-2 text-dark-600 dark:text-dark-400">
              <Users className="w-4 h-4" />
              <span className="text-sm">
                {capacity.min}-{capacity.max} people • Recommended: {capacity.recommended}
              </span>
            </div>

            {/* Equipment Notice */}
            {!equipmentAvailable && (
              <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded">
                  ⚠️ Bring your own equipment
                </span>
              </div>
            )}
          </div>

          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-secondary-50 dark:bg-secondary-900/20 text-secondary-700 dark:text-secondary-400 text-xs font-medium rounded-full"
                >
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="px-3 py-1 bg-dark-100 dark:bg-dark-700 text-dark-600 dark:text-dark-400 text-xs font-medium rounded-full">
                  +{amenities.length - 3} more
                </span>
              )}
            </div>
          )}

          <div className="flex items-center justify-between pt-4 border-t border-dark-100 dark:border-dark-700">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-500" />
              <span className="text-2xl font-bold text-dark-900 dark:text-dark-50">
                {pricePerPerson}
              </span>
              <span className="text-dark-500">/person</span> {/* Changed from /hour */}
            </div>
            <Button
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/facility/${_id}`);
              }}
            >
              Book Now
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default FacilityCard;