import React from 'react';

import {
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

const customers = [
  {
    id: 1,
    name: 'Jean Mukendi',
    email: 'jean@example.com',
  },
  {
    id: 2,
    name: 'Sarah Kabeya',
    email: 'sarah@example.com',
  },
];

function Customers() {
  return (
    <>
      <Typography
        variant="h3"
        fontWeight={900}
        mb={4}
      >
        Clients
      </Typography>

      <Paper sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Nom
              </TableCell>

              <TableCell>
                Email
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {customers.map(customer => (
              <TableRow
                key={customer.id}
              >
                <TableCell>
                  {customer.name}
                </TableCell>

                <TableCell>
                  {customer.email}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
}

export default Customers;