import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../store/slices/cartSlice';

/**
 * Centralise toute la logique liée au panier Pivot Store.
 *
 * @returns {{
 *   items: Array,
 *   totalItems: number,
 *   totalPrice: number,
 *   addToCart: Function,
 *   removeFromCart: Function,
 *   increaseQuantity: Function,
 *   decreaseQuantity: Function,
 *   clearCart: Function
 * }}
 */
const useCart = () => {
  const dispatch = useDispatch();

  const items = useSelector(
    state => state.cart?.items ?? []
  );

  const totalItems = items.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const totalPrice = items.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const handleAddToCart = useCallback(
    product => {
      if (!product) return;

      dispatch(addToCart(product));
    },
    [dispatch]
  );

  const handleRemoveFromCart = useCallback(
    id => {
      if (!id) return;

      dispatch(removeFromCart(id));
    },
    [dispatch]
  );

  const handleIncreaseQuantity = useCallback(
    id => {
      if (!id) return;

      dispatch(increaseQuantity(id));
    },
    [dispatch]
  );

  const handleDecreaseQuantity = useCallback(
    id => {
      if (!id) return;

      dispatch(decreaseQuantity(id));
    },
    [dispatch]
  );

  const handleClearCart = useCallback(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return {
    items,
    totalItems,
    totalPrice,

    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    increaseQuantity: handleIncreaseQuantity,
    decreaseQuantity: handleDecreaseQuantity,
    clearCart: handleClearCart,
  };
};

export default useCart;