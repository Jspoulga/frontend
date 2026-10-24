import React from 'react';

import {
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
} from '@mui/material';

function Settings() {
  return (
    <>
      <Typography
        variant="h3"
        fontWeight={900}
        mb={4}
      >
        Paramètres
      </Typography>

      <Paper
        sx={{
          p: 4,
          maxWidth: 700,
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="Nom de la boutique"
            defaultValue="Pivot Store"
          />

          <TextField
            label="Email"
            defaultValue="contact@kinstyle.com"
          />

          <TextField
            label="Téléphone"
            defaultValue="+243"
          />

          <Button variant="contained">
            Enregistrer
          </Button>
        </Stack>
      </Paper>
    </>
  );
}

export default Settings;