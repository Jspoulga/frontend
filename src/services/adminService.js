import api from './api';

const adminService = {
  async stats() {
    const response = await api.get('/admin/stats');

    return response.data;
  },

  /* mode : 'replace' (le CSV devient le catalogue) ou 'merge' (ajout). */
  async importProducts(file, mode = 'replace') {
    const form = new FormData();

    form.append('file', file);
    form.append('mode', mode);

    const response = await api.post('/admin/products/import', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    return response.data;
  },

  exportUrl() {
    const base = api.defaults.baseURL.replace(/\/$/, '');

    return `${base}/admin/products/export.csv`;
  },

  async exportProducts() {
    const response = await api.get('/admin/products/export.csv', {
      responseType: 'blob',
    });

    return response.data;
  },
};

export default adminService;
