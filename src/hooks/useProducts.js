import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import productService from '../services/productService';
import {
  setProducts,
  setLoading,
  setError,
} from '../store/slices/productSlice';

const useProducts = () => {
  const dispatch = useDispatch();

  const {
    items,
    loading,
    error,
  } = useSelector(state => state.products);

  const loadProducts = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const data =
        await productService.getProducts();

      dispatch(setProducts(data));
    } catch (error) {
      dispatch(
        setError('Impossible de charger les produits')
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (items.length === 0) {
      loadProducts();
    }
  }, [items.length, loadProducts]);

  return {
    products: items,
    loading,
    error,
    reload: loadProducts,
  };
};

export default useProducts;