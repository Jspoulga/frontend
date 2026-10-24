import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',

  initialState: {
    mobileMenu: false,
    cartDrawer: false,
  },

  reducers: {
    toggleMobileMenu: (state) => {
      state.mobileMenu = !state.mobileMenu;
    },

    closeMobileMenu: (state) => {
      state.mobileMenu = false;
    },

    openCartDrawer: (state) => {
      state.cartDrawer = true;
    },

    closeCartDrawer: (state) => {
      state.cartDrawer = false;
    },
  },
});

export const {
  toggleMobileMenu,
  closeMobileMenu,
  openCartDrawer,
  closeCartDrawer,
} = uiSlice.actions;

export default uiSlice.reducer;