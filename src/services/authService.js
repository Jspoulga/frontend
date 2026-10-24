import api, { TOKEN_KEY, USER_KEY } from './api';

/*
 * Plus aucun repli « mode démo » ici : une mauvaise réponse du serveur doit
 * remonter jusqu'à l'écran. L'ancienne version connectait l'utilisateur même
 * quand l'API refusait le mot de passe.
 */
const authService = {
  /*
   * `identifier` reçoit indifféremment une adresse e-mail ou un numéro
   * de téléphone : à Kinshasa, beaucoup de clients n'ont que le second.
   * Le paramètre garde son nom d'origine pour les appels existants.
   */
  async login(identifier, password) {
    const response = await api.post('/auth/login', { identifier, password });

    return response.data;
  },

  async register({ name, email, phone, password }) {
    const response = await api.post('/auth/register', {
      name,
      email,
      phone,
      password,
    });

    return response.data;
  },

  /*
   * Confirmation du numéro. `requestPhoneCode` sert aussi au renvoi :
   * c'est le serveur qui impose le délai entre deux demandes.
   */
  async requestPhoneCode(phone) {
    const response = await api.post('/auth/phone/request-code', { phone });

    return response.data;
  },

  async verifyPhoneCode(phone, code) {
    const response = await api.post('/auth/phone/verify', { phone, code });

    return response.data;
  },

  async me() {
    const response = await api.get('/auth/me');

    return response.data.user;
  },

  async updateProfile(changes) {
    const response = await api.patch('/auth/me', changes);

    return response.data.user;
  },

  async changePassword(currentPassword, newPassword) {
    const response = await api.post('/auth/change-password', {
      currentPassword,
      newPassword,
    });

    return response.data;
  },

  async forgotPassword(email) {
    const response = await api.post('/auth/forgot-password', { email });

    return response.data;
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      /* La déconnexion locale doit aboutir même si l'API est injoignable. */
    }

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export default authService;
