import { createContext, useState, useCallback } from 'react';
import { bookingService } from '../services/bookingService';

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedFacility, setSelectedFacility] = useState(null);

  const fetchMyBookings = useCallback(async () => {
    setLoading(true);
    try {
      const data = await bookingService.getMyBookings();
      setBookings(data.bookings || []);
      return { success: true, bookings: data.bookings };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to fetch bookings'
      };
    } finally {
      setLoading(false);
    }
  }, []);

  const createBooking = async (bookingData) => {
    setLoading(true);
    try {
      const data = await bookingService.createBooking(bookingData);
      setBookings(prev => [data.booking, ...prev]);
      setSelectedSlot(null);
      setSelectedFacility(null);
      return { success: true, booking: data.booking };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create booking'
      };
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    setLoading(true);
    try {
      const data = await bookingService.cancelBooking(bookingId);
      setBookings(prev =>
        prev.map(b => b._id === bookingId ? { ...b, status: 'cancelled' } : b)
      );
      return { success: true, booking: data.booking };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to cancel booking'
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    bookings,
    loading,
    selectedSlot,
    selectedFacility,
    setSelectedSlot,
    setSelectedFacility,
    fetchMyBookings,
    createBooking,
    cancelBooking,
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};
