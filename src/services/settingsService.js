import api from './api';

const settingsService = {
  async get() {
    const response = await api.get('/settings');

    return response.data;
  },

  async update(changes) {
    const response = await api.put('/admin/settings', changes);

    return response.data;
  },
};

export default settingsService;
