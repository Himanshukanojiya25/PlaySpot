import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, Users, DollarSign, Wifi, Car, Coffee, Shield, AlertCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import SlotSelector from '../../components/user/SlotSelector';
import Modal from '../../components/ui/Modal';
import { useBooking } from '../../hooks/useBooking';

const FacilityDetails = () => {
  const { id } = useParams();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { createBooking } = useBooking();

  const facility = {
    _id: id,
    name: 'Elite Sports Arena',
    type: 'Basketball',
    description: 'A state-of-the-art indoor basketball facility featuring premium hardwood courts, professional-grade equipment, and excellent lighting. Perfect for competitive games, training sessions, and casual play.',
    location: {
      address: '123 Sports Street, Downtown',
      city: 'New York',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    pricePerPerson: 200, // Changed from pricePerHour
    capacity: { // Added capacity
      min: 5,
      max: 20,
      recommended: 10
    },
    equipmentAvailable: true, // Added equipment availability
    rating: 4.8,
    reviewsCount: 142,
    images: [
      'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    amenities: [
      { icon: Wifi, name: 'Free WiFi' },
      { icon: Car, name: 'Parking' },
      { icon: Coffee, name: 'Refreshments' },
      { icon: Users, name: 'Lockers' },
      { icon: Shield, name: 'Equipment Provided' }, // Added equipment amenity
    ],
    rules: [
      'Proper sports attire required',
      'No outside food or drinks',
      `Maximum ${capacity.max} players per session`, // Updated with dynamic capacity
      'Respect other users and facility staff',
      'Equipment provided must be returned in good condition', // Added equipment rule
    ],
    reviews: [
      {
        id: 1,
        user: 'John Doe',
        rating: 5,
        comment: 'Excellent facility with great amenities. Highly recommended!',
        date: '2024-01-15',
      },
      {
        id: 2,
        user: 'Jane Smith',
        rating: 4,
        comment: 'Good courts and well maintained. Could use more parking space.',
        date: '2024-01-10',
      },
    ],
  };

  const handleBooking = async (bookingData) => {
    const result = await createBooking({
      facilityId: facility._id,
      date: selectedDate,
      peopleCount: bookingData.peopleCount,
      totalPrice: bookingData.totalPrice,
    });

    if (result.success) {
      setIsBookingModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-950 pt-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="grid lg:grid-cols-3 gap-2 mb-6 rounded-2xl overflow-hidden">
            <div className="lg:col-span-2 h-96">
              <img
                src={facility.images[0]}
                alt={facility.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-rows-2 gap-2">
              {facility.images.slice(1, 3).map((image, index) => (
                <div key={index} className="h-full">
                  <img
                    src={image}
                    alt={`${facility.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-block px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-semibold mb-3">
                      {facility.type}
                    </div>
                    <h1 className="text-4xl font-display font-bold text-dark-900 dark:text-dark-50 mb-2">
                      {facility.name}
                    </h1>
                    <div className="flex items-center gap-4 text-dark-600 dark:text-dark-400">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{facility.rating}</span>
                        <span>({facility.reviewsCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{facility.location.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-lg text-dark-700 dark:text-dark-300 leading-relaxed">
                  {facility.description}
                </p>

                {/* Capacity and Equipment Info */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-dark-50 dark:bg-dark-900 rounded-xl">
                    <Users className="w-6 h-6 text-primary-500" />
                    <div>
                      <div className="font-semibold text-dark-900 dark:text-dark-50">
                        {facility.capacity.min}-{facility.capacity.max} People
                      </div>
                      <div className="text-sm text-dark-600 dark:text-dark-400">
                        Recommended: {facility.capacity.recommended}
                      </div>
                    </div>
                  </div>
                  
                  <div className={`flex items-center gap-3 p-4 rounded-xl ${
                    facility.equipmentAvailable 
                      ? 'bg-green-50 dark:bg-green-900/20' 
                      : 'bg-orange-50 dark:bg-orange-900/20'
                  }`}>
                    {facility.equipmentAvailable ? (
                      <>
                        <Shield className="w-6 h-6 text-green-500" />
                        <div>
                          <div className="font-semibold text-green-700 dark:text-green-400">
                            Equipment Provided
                          </div>
                          <div className="text-sm text-green-600 dark:text-green-500">
                            Bats & balls included
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-6 h-6 text-orange-500" />
                        <div>
                          <div className="font-semibold text-orange-700 dark:text-orange-400">
                            Bring Your Equipment
                          </div>
                          <div className="text-sm text-orange-600 dark:text-orange-500">
                            Bats & balls not provided
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Card padding="lg">
                <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-50 mb-6">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {facility.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-2 p-4 bg-dark-50 dark:bg-dark-900 rounded-xl"
                    >
                      <amenity.icon className="w-6 h-6 text-primary-500" />
                      <span className="text-sm font-medium text-dark-700 dark:text-dark-300">
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card padding="lg">
                <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-50 mb-4">
                  Facility Rules
                </h2>
                <ul className="space-y-3">
                  {facility.rules.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                      <span className="text-dark-700 dark:text-dark-300">{rule}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card padding="lg">
                <h2 className="text-2xl font-bold text-dark-900 dark:text-dark-50 mb-6">
                  Reviews
                </h2>
                <div className="space-y-6">
                  {facility.reviews.map((review) => (
                    <div key={review.id} className="border-b border-dark-100 dark:border-dark-800 last:border-0 pb-6 last:pb-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-dark-900 dark:text-dark-50">
                            {review.user}
                          </h4>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-dark-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-dark-500">
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-dark-700 dark:text-dark-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card padding="lg" className="sticky top-24">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-6 h-6 text-primary-500" />
                    <span className="text-4xl font-bold text-dark-900 dark:text-dark-50">
                      {facility.pricePerPerson}
                    </span>
                    <span className="text-dark-500">/person</span> {/* Changed from /hour */}
                  </div>
                  <div className="flex items-center gap-2 text-dark-600 dark:text-dark-400 mb-3">
                    <Users className="w-5 h-5" />
                    <span>Capacity: {facility.capacity.min}-{facility.capacity.max}</span>
                  </div>
                  {facility.equipmentAvailable ? (
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Equipment provided</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">Bring your equipment</span>
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-dark-700 dark:text-dark-300 mb-2">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="input-field"
                  />
                </div>

                <Button 
                  variant="primary" 
                  size="lg" 
                  fullWidth 
                  onClick={() => setIsBookingModalOpen(true)}
                >
                  Book Your Session
                </Button>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>

      <Modal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        title="Select Group Size"
        size="lg"
      >
        <SlotSelector
          turf={facility} // Pass full facility data
          selectedDate={selectedDate}
          onPeopleSelect={(peopleCount) => console.log('Selected people:', peopleCount)}
          onBooking={handleBooking}
        />
      </Modal>
    </div>
  );
};

export default FacilityDetails;