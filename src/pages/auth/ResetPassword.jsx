import React, { useState } from 'react';

import {
  Paper,
  Typography,
  TextField,
  Button,
} from '@mui/material';

import {
  useNavigate,
} from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] =
    useState('');

  const submit = e => {
    e.preventDefault();

    navigate('/login');
  };

  return (
    <Paper
      sx={{
        p: 5,
        width: '100%',
        maxWidth: 450,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={900}
        mb={3}
      >
        Nouveau mot de passe
      </Typography>

      <form onSubmit={submit}>
        <TextField
          fullWidth
          label="Nouveau mot de passe"
          type="password"
          value={password}
          onChange={e =>
            setPassword(e.target.value)
          }
        />

        <Button
          fullWidth
          variant="contained"
          type="submit"
          sx={{ mt: 2 }}
        >
          Modifier
        </Button>
      </form>
    </Paper>
  );
}

export default ResetPassword;