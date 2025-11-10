import api from './api';

// Mock data for development when backend is not available
const mockBookings = [
  {
    id: '1',
    turfId: 'turf1',
    turfName: 'Elite Football Arena',
    location: 'Nagpur',
    date: '2024-01-15',
    timeSlot: '6:00 PM - 8:00 PM',
    duration: 2,
    totalAmount: 1600,
    status: 'completed',
    playersCount: 8,
    equipmentBooked: {
      football: 2,
      goalkeeperGloves: 1,
      cones: 0,
      waterBottles: 8
    },
    bookedAt: '2024-01-10T10:00:00Z'
  },
  {
    id: '2',
    turfId: 'turf2',
    turfName: 'Cricket Pro Ground',
    location: 'Nagpur',
    date: '2024-01-20',
    timeSlot: '4:00 PM - 6:00 PM',
    duration: 2,
    totalAmount: 2000,
    status: 'confirmed',
    playersCount: 10,
    equipmentBooked: {
      football: 0,
      goalkeeperGloves: 0,
      cones: 6,
      waterBottles: 10
    },
    bookedAt: '2024-01-12T14:30:00Z'
  }
];

export const bookingService = {
  async createBooking(bookingData) {
    try {
      // Try real API first
      const response = await api.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      console.log('API not available, using mock data');
      // Fallback to mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            booking: {
              id: Date.now().toString(),
              ...bookingData,
              status: 'confirmed',
              bookedAt: new Date().toISOString()
            }
          });
        }, 1000);
      });
    }
  },

  async getMyBookings() {
    try {
      // Try real API first
      const response = await api.get('/bookings/my-bookings');
      return response.data;
    } catch (error) {
      console.log('API not available, using mock data');
      // Fallback to mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ bookings: mockBookings });
        }, 800);
      });
    }
  },

  async getBookingById(id) {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  async cancelBooking(id) {
    try {
      const response = await api.put(`/bookings/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.log('API not available, using mock data');
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            booking: { 
              id: id, 
              status: 'cancelled' 
            } 
          });
        }, 1000);
      });
    }
  },

  async getAllBookings(params = {}) {
    const response = await api.get('/bookings', { params });
    return response.data;
  },

  async updateBookingStatus(id, status) {
    const response = await api.put(`/bookings/${id}/status`, { status });
    return response.data;
  },
};