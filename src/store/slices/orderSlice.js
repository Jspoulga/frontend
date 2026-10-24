import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'fashion_orders';

/*
 * Sans backend disponible, les commandes payées disparaissaient au
 * rechargement : on les conserve localement, comme le panier et la session.
 */
function readStoredOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function persist(orders) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch (error) {
    /* Stockage plein ou navigation privée : on ignore silencieusement. */
  }
}

const initialState = {
  orders: readStoredOrders(),
  loading: false,
};

const orderSlice = createSlice({
  name: 'orders',

  initialState,

  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload);
      persist(state.orders);
    },

    setOrders: (state, action) => {
      state.orders = action.payload;
      persist(state.orders);
    },

    updateOrderStatus: (state, action) => {
      const { id, status } = action.payload;

      const order = state.orders.find(
        order => order.id === id
      );

      if (order) {
        order.status = status;
        persist(state.orders);
      }
    },
  },
});

export const {
  addOrder,
  setOrders,
  updateOrderStatus,
} = orderSlice.actions;

export default orderSlice.reducer;
