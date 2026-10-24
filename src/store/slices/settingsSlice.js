import { createSlice } from '@reduxjs/toolkit';

import { AVAILABLE_LANGUAGE_CODES } from '../../i18n/translations';

const STORAGE_KEY = 'fashion_preferences';

/* Devises de secours : utilisées tant que l'API n'a pas répondu. */
export const FALLBACK_CURRENCIES = [
  { code: 'CDF', label: 'Franc congolais', symbol: 'FC', perUnit: 1 },
  { code: 'USD', label: 'Dollar américain', symbol: '$', perUnit: 2800 },
  { code: 'EUR', label: 'Euro', symbol: '€', perUnit: 3050 },
];

function readPreferences() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : {};

    return {
      /*
       * Une langue retirée du sélecteur ne doit pas rester imposée à
       * qui l'avait choisie : on retombe sur le français.
       */
      language: AVAILABLE_LANGUAGE_CODES.includes(parsed.language)
        ? parsed.language
        : 'fr',
      currency: parsed.currency || 'CDF',
      /* 'system' suit le réglage du système d'exploitation. */
      themeMode: parsed.themeMode || 'system',
    };
  } catch (error) {
    return { language: 'fr', currency: 'CDF', themeMode: 'system' };
  }
}

function persist(state) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        language: state.language,
        currency: state.currency,
        themeMode: state.themeMode,
      }),
    );
  } catch (error) {
    /* Navigation privée : la préférence vaudra pour la session seulement. */
  }
}

const preferences = readPreferences();

const initialState = {
  language: preferences.language,
  currency: preferences.currency,
  themeMode: preferences.themeMode,
  currencies: FALLBACK_CURRENCIES,
  shop: null,
  loaded: false,
  offline: false,
};

const settingsSlice = createSlice({
  name: 'settings',

  initialState,

  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      persist(state);
    },

    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
      persist(state);
    },

    setCurrency: (state, action) => {
      state.currency = action.payload;
      persist(state);
    },

    /* Paramètres renvoyés par l'API (taux de change, infos boutique). */
    setRemoteSettings: (state, action) => {
      const { currencies, shop } = action.payload || {};

      if (Array.isArray(currencies) && currencies.length > 0) {
        state.currencies = currencies;

        /* La devise choisie a pu disparaître de la configuration. */
        if (!currencies.some(item => item.code === state.currency)) {
          state.currency = currencies[0].code;
          persist(state);
        }
      }

      if (shop) {
        state.shop = shop;
      }

      state.loaded = true;
      state.offline = false;
    },

    setOffline: (state, action) => {
      state.offline = Boolean(action.payload);
      state.loaded = true;
    },

    resetPreferences: state => {
      state.language = 'fr';
      state.currency = 'CDF';
      persist(state);
    },
  },
});

export const {
  resetPreferences,
  setCurrency,
  setLanguage,
  setOffline,
  setRemoteSettings,
  setThemeMode,
} = settingsSlice.actions;

export const selectCurrency = state =>
  state.settings.currencies.find(item => item.code === state.settings.currency) ||
  state.settings.currencies[0];

export default settingsSlice.reducer;
