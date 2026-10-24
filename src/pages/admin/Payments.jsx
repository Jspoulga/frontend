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

const payments = [
  {
    id: 'TX-1001',
    provider: 'M-Pesa',
    amount: '150 000 CDF',
    status: 'Payé',
  },
  {
    id: 'TX-1002',
    provider: 'Airtel Money',
    amount: '75 000 CDF',
    status: 'En attente',
  },
];

function Payments() {
  return (
    <>
      <Typography
        variant="h3"
        fontWeight={900}
        mb={4}
      >
        Paiements
      </Typography>

      <Paper sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Transaction
              </TableCell>

              <TableCell>
                Méthode
              </TableCell>

              <TableCell>
                Montant
              </TableCell>

              <TableCell>
                Statut
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {payments.map(payment => (
              <TableRow
                key={payment.id}
              >
                <TableCell>
                  {payment.id}
                </TableCell>

                <TableCell>
                  {payment.provider}
                </TableCell>

                <TableCell>
                  {payment.amount}
                </TableCell>

                <TableCell>
                  <Chip
                    label={payment.status}
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

export default Payments;