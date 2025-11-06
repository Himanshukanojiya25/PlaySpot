import api from './api';

export const bookingService = {
  async createBooking(bookingData) {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  async getMyBookings() {
    const response = await api.get('/bookings/my-bookings');
    return response.data;
  },

  async getBookingById(id) {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  async cancelBooking(id) {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
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
