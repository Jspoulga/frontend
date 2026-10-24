/*
 * Profil du client connecté.
 *
 * Les routes visées étaient `/users/profile`, qui n'existe pas :
 * le profil se lit et se modifie via `/auth/me`. Ce service
 * n'était appelé nulle part, le défaut passait donc inaperçu.
 */
import api from './api';

const userService = {
  async updateProfile(data) {
    try {
      const response = await api.patch('/auth/me', data);

      return response.data;
    } catch (error) {
      return data;
    }
  },

  async getProfile() {
    try {
      const response = await api.get('/auth/me');

      return response.data;
    } catch (error) {
      return null;
    }
  },
};

export default userService;