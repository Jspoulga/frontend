import api from './api';

/* Repli local lorsque l'API est momentanément indisponible. */

const PAYMENT_DELAY = 1800;

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

function makeTransactionId(provider) {
  const prefix = {
    mpesa: 'MPESA',
    airtel: 'AIRTEL',
    orange: 'ORANGE',
  }[provider] || 'PAY';

  const random = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();

  return `${prefix}-${Date.now()}-${random}`;
}

function normalizePhone(phone) {
  return String(phone || '')
    .replace(/[\s().-]/g, '')
    .trim();
}

function isValidPhone(phone) {
  return /^(\+243|0)\d{9}$/.test(phone);
}

function getCardLast4(card) {
  const digits = String(card?.cardNumber || '').replace(/\D/g, '');
  return digits.slice(-4);
}

const paymentService = {
  /**
   * Simulation d'un paiement direct depuis le Checkout.
   */
  async initiatePayment(data = {}) {
    const {
      orderId,
      amount,
      provider,
      phone,
    } = data;

    if (!['card', 'mpesa', 'airtel', 'orange'].includes(provider)) {
      throw new Error('PAYMENT_PROVIDER_REQUIRED');
    }

    if (!amount || Number(amount) <= 0) {
      throw new Error('INVALID_PAYMENT_AMOUNT');
    }

    const cleanedPhone = normalizePhone(phone);
    const isMobilePayment = provider !== 'card';

    if (isMobilePayment && !isValidPhone(cleanedPhone)) {
      throw new Error('INVALID_PAYMENT_PHONE');
    }

    const cardLast4 = getCardLast4(data.card);
    if (provider === 'card' && !/^\d{4}$/.test(cardLast4)) {
      throw new Error('INVALID_CARD_DETAILS');
    }

    const payload = {
      orderId: orderId || null,
      amount: Number(amount),
      provider,
      phone: isMobilePayment ? cleanedPhone : undefined,
      // Ne jamais transmettre le numéro de carte ni le CVV à notre API.
      cardLast4: provider === 'card' ? cardLast4 : undefined,
    };

    try {
      const response = await api.post('/payments', payload);
      return response.data;
    } catch (error) {
      // Une erreur de paiement renvoyée par le serveur ne doit pas être
      // transformée en succès par le mode de démonstration.
      if (error?.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
    }

    /*
     * Simulation du temps de traitement du paiement.
     */
    await new Promise(resolve => {
      setTimeout(resolve, PAYMENT_DELAY);
    });

    /*
     * Pour tester facilement les erreurs :
     *
     * Si le numéro contient "000000000",
     * on simule un paiement refusé.
     */
    if (cleanedPhone.includes('000000000')) {
      throw new Error('PAYMENT_DECLINED');
    }

    const transaction = {
      success: true,
      status: PAYMENT_STATUS.PAID,
      transactionId: makeTransactionId(provider),
      provider,
      orderId: orderId || null,
      amount: Number(amount),
      phone: cleanedPhone,
      cardLast4: provider === 'card' ? cardLast4 : null,
      paidAt: Date.now(),
    };

    return transaction;
  },

  /**
   * Permet de simuler un échec volontaire.
   * Utile pendant les tests.
   */
  async simulateFailure(data = {}) {
    await new Promise(resolve => {
      setTimeout(resolve, PAYMENT_DELAY);
    });

    return {
      success: false,
      status: PAYMENT_STATUS.FAILED,
      transactionId: null,
      provider: data.provider || null,
      orderId: data.orderId || null,
      amount: Number(data.amount || 0),
      errorCode: 'PAYMENT_DECLINED',
      message: 'Le paiement a été refusé.',
    };
  },

  /**
   * Vérifie le format du numéro de téléphone.
   */
  validatePhone(phone) {
    const cleanedPhone = normalizePhone(phone);

    return {
      valid: isValidPhone(cleanedPhone),
      phone: cleanedPhone,
    };
  },
};

export default paymentService;
