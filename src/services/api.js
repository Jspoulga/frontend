import axios from 'axios';

export const TOKEN_KEY = 'fashion_token';
export const USER_KEY = 'fashion_user';

const api = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || 'http://localhost:5050/api',

  headers: {
    'Content-Type': 'application/json',
  },

  timeout: 15000,
});

api.interceptors.request.use(
  config => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  error => Promise.reject(error),
);

/* Messages lisibles : l'API renvoie des codes, l'interface affiche du français. */
const MESSAGES = {
  ADMIN_ONLY: "Cette action est réservée à l'administrateur.",
  AUTHENTICATION_REQUIRED: 'Veuillez vous connecter pour continuer.',
  CSV_FILE_REQUIRED: 'Choisissez un fichier CSV.',
  CSV_NO_VALID_ROW: "Aucune ligne valide n'a été trouvée dans ce fichier.",
  EMAIL_ALREADY_EXISTS: 'Un compte existe déjà avec cette adresse email.',
  PHONE_ALREADY_EXISTS: 'Un compte existe déjà avec ce numéro de téléphone.',
  EMAIL_OR_PHONE_REQUIRED:
    'Indiquez une adresse email ou un numéro de téléphone.',
  INVALID_PHONE: 'Ce numéro de téléphone ne semble pas valide.',
  PHONE_REQUIRED: 'Le numéro de téléphone est obligatoire.',
  IDENTIFIER_REQUIRED: 'Indiquez votre email ou votre numéro de téléphone.',
  OTP_INVALID: 'Code incorrect.',
  OTP_EXPIRED: 'Ce code a expiré. Demandez-en un nouveau.',
  OTP_NOT_FOUND: 'Aucun code en attente. Demandez-en un nouveau.',
  OTP_TOO_MANY_ATTEMPTS:
    'Trop de tentatives. Demandez un nouveau code.',
  OTP_COOLDOWN: 'Patientez un instant avant de redemander un code.',
  EMAIL_REQUIRED: 'Veuillez saisir votre adresse email.',
  INVALID_CREDENTIALS: 'Identifiant ou mot de passe incorrect.',
  INVALID_EMAIL: 'Adresse email invalide.',
  INVALID_PAYMENT_AMOUNT: 'Montant de paiement invalide.',
  INVALID_PAYMENT_PHONE: 'Numéro de téléphone invalide. Ex. +243 812 345 678',
  NAME_TOO_SHORT: 'Le nom doit contenir au moins 2 caractères.',
  ORDER_ADDRESS_REQUIRED: 'Adresse de livraison incomplète.',
  ORDER_ITEMS_REQUIRED: 'Votre panier est vide.',
  ORDER_TOTAL_INVALID: 'Montant de commande invalide.',
  PASSWORD_TOO_SHORT: 'Le mot de passe doit contenir au moins 8 caractères.',
  PAYMENT_DECLINED: "Le paiement a été refusé par l'opérateur.",
  PRODUCT_NOT_FOUND: 'Produit introuvable.',
  SESSION_EXPIRED: 'Ce lien de paiement a expiré.',
  SESSION_NOT_FOUND: 'Session de paiement introuvable.',
  TOO_MANY_REQUESTS: 'Trop de tentatives. Réessayez dans quelques minutes.',
};

export function readApiError(error, fallback = 'Une erreur est survenue.') {
  const code = error?.response?.data?.message;

  if (code && MESSAGES[code]) {
    return MESSAGES[code];
  }

  if (error?.response?.status === 404) {
    return 'Ressource introuvable.';
  }

  if (!error?.response) {
    return "Le serveur ne répond pas. Vérifiez que l'API est démarrée.";
  }

  return code || fallback;
}

/* Une session expirée ou révoquée ne doit pas laisser l'interface croire que
   l'utilisateur est connecté. */
api.interceptors.response.use(
  response => response,

  error => {
    const status = error?.response?.status;
    const onAuthRoute = String(error?.config?.url || '').includes('/auth/');

    if (status === 401 && !onAuthRoute) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }

    return Promise.reject(error);
  },
);

export default api;
