export const APP_NAME = 'Pivot Store';

export const CATEGORIES = [
  'Hommes',
  'Femmes',
  'Chaussures',
  'Accessoires',
  'Enfants',
];

export const PAYMENT_METHODS = [
  {
    id: 'card',
    name: 'Carte bancaire',
  },
  {
    id: 'mpesa',
    name: 'Vodacom M-Pesa',
  },
  {
    id: 'airtel',
    name: 'Airtel Money',
  },
  {
    id: 'orange',
    name: 'Orange Money',
  },
  {
    id: 'africell',
    name: 'Africell Money',
  },
];

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
};