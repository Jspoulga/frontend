import { createSlice } from '@reduxjs/toolkit';

/*
 * Les favoris vivent d'abord dans le navigateur : on peut en ajouter
 * sans compte. Dès qu'une session existe, `AppBootstrap` les fusionne
 * avec ceux du serveur, de sorte qu'ils suivent le client d'un
 * appareil à l'autre.
 */
const saved = localStorage.getItem('fashion_wishlist');

const initialState = {
  items: saved ? JSON.parse(saved) : [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',

  initialState,

  reducers: {
    /* Remplace la liste locale par celle du compte, après fusion. */
    hydrateWishlist: (state, action) => {
      state.items = Array.isArray(action.payload) ? action.payload : [];

      localStorage.setItem('fashion_wishlist', JSON.stringify(state.items));
    },

    toggleWishlist: (state, action) => {
      const exists = state.items.find(
        item => item.id === action.payload.id
      );

      if (exists) {
        state.items = state.items.filter(
          item => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem(
        'fashion_wishlist',
        JSON.stringify(state.items)
      );
    },
  },
});

export const { hydrateWishlist, toggleWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;