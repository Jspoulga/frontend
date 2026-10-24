import React from 'react';

import {
  Typography,
  Paper,
  Button,
  Stack,
} from '@mui/material';

function Coupons() {
  return (
    <>
      <Stack
        direction="row"
       
        mb={4} sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h3"
          fontWeight={900}
        >
          Coupons
        </Typography>

        <Button variant="contained">
          Nouveau coupon
        </Button>
      </Stack>

      <Paper sx={{ p: 4 }}>
        <Typography fontWeight={700}>
          Aucun coupon créé.
        </Typography>
      </Paper>
    </>
  );
}

export default Coupons;