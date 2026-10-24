import api from './api';

/*
 * Carnet d'adresses du client connecté.
 *
 * Toutes les routes travaillent sur le compte porté par le jeton : un
 * client ne peut pas lire ni modifier le carnet d'un autre, même en
 * changeant un identifiant dans l'URL.
 */
const addressService = {
  async list() {
    const { data } = await api.get('/users/me/addresses');

    return Array.isArray(data) ? data : [];
  },

  async create(payload) {
    const { data } = await api.post('/users/me/addresses', payload);

    return data;
  },

  async update(id, payload) {
    const { data } = await api.patch(`/users/me/addresses/${id}`, payload);

    return data;
  },

  async remove(id) {
    await api.delete(`/users/me/addresses/${id}`);

    return true;
  },
};

export default addressService;
