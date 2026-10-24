import { createSlice } from '@reduxjs/toolkit';

const savedUser = localStorage.getItem('fashion_user');

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: localStorage.getItem('fashion_token'),
  isAuthenticated: !!localStorage.getItem('fashion_token'),
};

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      const { user, token } = action.payload;

      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      localStorage.setItem('fashion_user', JSON.stringify(user));
      localStorage.setItem('fashion_token', token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      localStorage.removeItem('fashion_user');
      localStorage.removeItem('fashion_token');
    },

    /* Session rétablie au démarrage à partir du jeton : l'API fait foi. */
    sessionRestored: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;

      localStorage.setItem('fashion_user', JSON.stringify(action.payload));
    },

    updateUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };

      localStorage.setItem(
        'fashion_user',
        JSON.stringify(state.user)
      );
    },
  },
});

export const {
  loginSuccess,
  logout,
  sessionRestored,
  updateUser,
} = authSlice.actions;

export default authSlice.reducer;