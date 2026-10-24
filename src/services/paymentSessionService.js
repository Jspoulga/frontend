/*
 * Simulation des sessions de paiement QR Pivot Store.
 *
 * Aucun backend nécessaire.
 *
 * Fonctionnement :
 *
 * PC
 *  ↓
 * create()
 *  ↓
 * QR
 *  ↓
 * téléphone
 *  ↓
 * confirm()
 *  ↓
 * PAID
 *  ↓
 * PC détecte le paiement
 *
 * IMPORTANT :
 * localStorage fonctionne entre plusieurs onglets/fenêtres
 * du même navigateur.
 *
 * Il ne fonctionne PAS entre un ordinateur et un vrai téléphone.
 *
 * Lorsque le backend sera disponible, on remplacera simplement
 * les fonctions locales par les appels API.
 */

import api from './api';

const STORAGE_KEY = 'fashion_pay_sessions';

export const SESSION_TTL_MS = 10 * 60 * 1000;

export const SESSION_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  FAILED: 'failed',
};

function readAll() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {};
    }

    const parsed = JSON.parse(raw);

    return parsed && typeof parsed === 'object'
      ? parsed
      : {};
  } catch (error) {
    return {};
  }
}

function writeAll(sessions) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(sessions),
    );

    /*
     * Événement personnalisé pour permettre au même onglet
     * de réagir immédiatement.
     */
    window.dispatchEvent(
      new CustomEvent('kinstyle-payment-session-updated'),
    );
  } catch (error) {
    // Rien à faire si le stockage est indisponible.
  }
}

function makeId() {
  const random = Math.random()
    .toString(36)
    .slice(2, 8)
    .toUpperCase();

  return `PS-${Date.now().toString(36).toUpperCase()}-${random}`;
}

function makeTransactionId(provider) {
  const prefix = {
    mpesa: 'MPESA',
    airtel: 'AIRTEL',
    orange: 'ORANGE',
  }[provider] || 'PAY';

  const random = Math.random()
    .toString(36)
    .slice(2, 8)
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

function withExpiry(session) {
  if (!session) {
    return null;
  }

  if (
    session.status === SESSION_STATUS.PENDING &&
    Date.now() > session.expiresAt
  ) {
    const expired = {
      ...session,
      status: SESSION_STATUS.EXPIRED,
    };

    const sessions = readAll();

    if (sessions[session.id]) {
      sessions[session.id] = expired;
      writeAll(sessions);
    }

    return expired;
  }

  return session;
}

const paymentSessionService = {
  /**
   * Création d'une session QR.
   */
  async create({
    amount,
    provider,
    itemCount,
    customerName,
  }) {
    if (!amount || Number(amount) <= 0) {
      throw new Error('INVALID_PAYMENT_AMOUNT');
    }

    if (!provider) {
      throw new Error('PAYMENT_PROVIDER_REQUIRED');
    }

    try {
      const response = await api.post('/payments/sessions', {
        amount: Number(amount),
        provider,
        itemCount: Number(itemCount || 0),
        customerName: customerName || '',
      });
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
    }

    const now = Date.now();

    const session = {
      id: makeId(),

      amount: Number(amount),

      provider,

      itemCount: Number(itemCount || 0),

      customerName: customerName || '',

      status: SESSION_STATUS.PENDING,

      createdAt: now,

      expiresAt: now + SESSION_TTL_MS,

      transactionId: null,

      phone: null,

      paidAt: null,
    };

    const sessions = readAll();

    sessions[session.id] = session;

    writeAll(sessions);

    return session;
  },

  /**
   * Récupération d'une session.
   */
  async get(id) {
    if (!id) {
      return null;
    }

    try {
      const response = await api.get(`/payments/sessions/${id}`);
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
    }

    const sessions = readAll();

    return withExpiry(sessions[id] || null);
  },

  /**
   * Confirmation du paiement depuis le téléphone.
   */
  async confirm(id, {
    phone,
    provider,
  } = {}) {
    try {
      const response = await api.post(
        `/payments/sessions/${id}/confirm`,
        { phone, provider },
      );
      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
    }

    const sessions = readAll();

    const session = withExpiry(sessions[id]);

    if (!session) {
      throw new Error('SESSION_NOT_FOUND');
    }

    if (session.status === SESSION_STATUS.EXPIRED) {
      throw new Error('SESSION_EXPIRED');
    }

    if (session.status === SESSION_STATUS.CANCELLED) {
      throw new Error('SESSION_CANCELLED');
    }

    if (session.status === SESSION_STATUS.PAID) {
      return session;
    }

    const cleanedPhone = normalizePhone(phone);

    if (!isValidPhone(cleanedPhone)) {
      throw new Error('INVALID_PAYMENT_PHONE');
    }

    /*
     * Numéro spécial pour tester un paiement refusé :
     *
     * 081 000 0000
     *
     * ou
     *
     * +243 810 000 000
     */
    if (cleanedPhone.includes('000000000')) {
      const failed = {
        ...session,
        status: SESSION_STATUS.FAILED,
        provider: provider || session.provider,
        phone: cleanedPhone,
        failedAt: Date.now(),
        errorCode: 'PAYMENT_DECLINED',
      };

      sessions[id] = failed;

      writeAll(sessions);

      throw new Error('PAYMENT_DECLINED');
    }

    /*
     * Petite simulation du traitement.
     */
    await new Promise(resolve => {
      setTimeout(resolve, 1500);
    });

    const paid = {
      ...session,

      status: SESSION_STATUS.PAID,

      provider: provider || session.provider,

      phone: cleanedPhone,

      transactionId: makeTransactionId(
        provider || session.provider,
      ),

      paidAt: Date.now(),
    };

    sessions[id] = paid;

    writeAll(sessions);

    return paid;
  },

  /**
   * Annulation d'une session.
   */
  async cancel(id) {
    const sessions = readAll();

    const session = sessions[id];

    if (!session) {
      return null;
    }

    if (session.status === SESSION_STATUS.PAID) {
      return session;
    }

    const cancelled = {
      ...session,
      status: SESSION_STATUS.CANCELLED,
      cancelledAt: Date.now(),
    };

    sessions[id] = cancelled;

    writeAll(sessions);

    return cancelled;
  },

  /**
   * Permet au PC d'écouter les changements.
   */
  storageKey: STORAGE_KEY,

  eventName: 'kinstyle-payment-session-updated',
};

export default paymentSessionService;
