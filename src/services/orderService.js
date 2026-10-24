import api from './api';

const STORAGE_KEY = 'fashion_orders';

/* Repli local utilisé tant que l'API n'est pas joignable. */
function readStoredOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveStoredOrder(order) {
  try {
    const orders = readStoredOrders();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([order, ...orders]),
    );
  } catch (error) {
    // Le paiement peut continuer même si le stockage local est indisponible.
  }
}

const orderService = {
  async createOrder(order) {
    try {
      const response = await api.post('/orders', order);

      return response.data;
    } catch (error) {
      const createdOrder = {
        id: `ORD-${Date.now()}`,
        ...order,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      saveStoredOrder(createdOrder);
      return createdOrder;
    }
  },

  /* Enregistre la référence de paiement une fois l'opérateur confirmé. */
  async attachPayment(orderId, { transactionId, paymentMethod, paidFrom }) {
    try {
      const response = await api.post(`/orders/${orderId}/payment`, {
        transactionId,
        paymentMethod,
        paidFrom,
      });

      return response.data;
    } catch (error) {
      return null;
    }
  },

  async getOrders() {
    try {
      const response = await api.get('/orders');

      return response.data;
    } catch (error) {
      return readStoredOrders();
    }
  },

  async getOrder(id) {
    try {
      const response = await api.get(`/orders/${id}`);

      return response.data;
    } catch (error) {
      return (
        readStoredOrders().find(order => order.id === id) || null
      );
    }
  },
};

export default orderService;
