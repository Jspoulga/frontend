import React from 'react';

import {
  Container,
  Typography,
} from '@mui/material';

import { useParams } from 'react-router-dom';

import useProducts from '../../hooks/useProducts';
import ProductGrid from '../../components/product/ProductGrid';

function Category() {
  const { category } = useParams();

  const { products } =
    useProducts();

  const filtered = products.filter(
    product =>
      product.category.toLowerCase() ===
      category.toLowerCase()
  );

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 6 }}
    >
      <Typography variant="h3">
        {category}
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1, mb: 4 }}
      >
        Découvrez notre collection {category}.
      </Typography>

      <ProductGrid products={filtered} />
    </Container>
  );
}

export default Category;