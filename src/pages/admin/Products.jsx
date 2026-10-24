import React from 'react';

import {
  Typography,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Stack,
} from '@mui/material';

import {
  Link,
} from 'react-router-dom';

import useProducts from '../../hooks/useProducts';

import formatCurrency from '../../utils/formatCurrency';

function Products() {
  const { products } =
    useProducts();

  return (
    <>
      <Stack
        direction="row"
       
        mb={4} sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h3"
          fontWeight={900}
        >
          Produits
        </Typography>

        <Button
          component={Link}
          to="/admin/products/add"
          variant="contained"
        >
          Ajouter
        </Button>
      </Stack>

      <Paper sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Produit
              </TableCell>

              <TableCell>
                Catégorie
              </TableCell>

              <TableCell>
                Prix
              </TableCell>

              <TableCell>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map(product => (
              <TableRow key={product.id}>
                <TableCell>
                  {product.name}
                </TableCell>

                <TableCell>
                  {product.category}
                </TableCell>

                <TableCell>
                  {formatCurrency(
                    product.price
                  )}
                </TableCell>

                <TableCell>
                  <Button
                    component={Link}
                    to={`/admin/products/edit/${product.id}`}
                    size="small"
                  >
                    Modifier
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default Products;