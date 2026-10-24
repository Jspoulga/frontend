import React from 'react';

import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
} from '@mui/material';

const orders = [
  {
    id: 'ORD-1001',
    customer: 'Jean',
    total: '150 000 CDF',
    status: 'Confirmée',
  },
  {
    id: 'ORD-1002',
    customer: 'Patrick',
    total: '75 000 CDF',
    status: 'Livrée',
  },
];

function Orders() {
  return (
    <>
      <Typography
        variant="h3"
        fontWeight={900}
        mb={4}
      >
        Commandes
      </Typography>

      <Paper sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Statut</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.map(order => (
              <TableRow key={order.id}>
                <TableCell>
                  {order.id}
                </TableCell>

                <TableCell>
                  {order.customer}
                </TableCell>

                <TableCell>
                  {order.total}
                </TableCell>

                <TableCell>
                  <Chip
                    label={order.status}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default Orders;