import api from './api';

export const facilityService = {
  async getAllFacilities(params = {}) {
    const response = await api.get('/facilities', { params });
    return response.data;
  },

  async getFacilityById(id) {
    const response = await api.get(`/facilities/${id}`);
    return response.data;
  },

  async createFacility(facilityData) {
    const response = await api.post('/facilities', facilityData);
    return response.data;
  },

  async updateFacility(id, facilityData) {
    const response = await api.put(`/facilities/${id}`, facilityData);
    return response.data;
  },

  async deleteFacility(id) {
    const response = await api.delete(`/facilities/${id}`);
    return response.data;
  },

  async getMyFacilities() {
    const response = await api.get('/facilities/owner/my-facilities');
    return response.data;
  },

  async searchFacilities(searchParams) {
    const response = await api.get('/facilities/search', { params: searchParams });
    return response.data;
  },

  async getAvailableSlots(facilityId, date) {
    const response = await api.get(`/facilities/${facilityId}/slots`, { params: { date } });
    return response.data;
  },
};
