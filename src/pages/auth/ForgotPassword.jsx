import React, { useState } from 'react';

import {
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
} from '@mui/material';

import {
  Link,
} from 'react-router-dom';

import authService from '../../services/authService';

function ForgotPassword() {
  const [email, setEmail] =
    useState('');

  const [message, setMessage] =
    useState('');

  const submit = async e => {
    e.preventDefault();

    const result =
      await authService.forgotPassword(
        email
      );

    setMessage(result.message);
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
      >
        Mot de passe oublié
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1, mb: 4 }}
      >
        Entrez votre adresse email.
      </Typography>

      {message && (
        <Alert
          severity="success"
          sx={{ mb: 2 }}
        >
          {message}
        </Alert>
      )}

      <form onSubmit={submit}>
        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={e =>
            setEmail(e.target.value)
          }
        />

        <Button
          fullWidth
          variant="contained"
          size="large"
          type="submit"
          sx={{ mt: 2 }}
        >
          Envoyer
        </Button>
      </form>

      <Button
        component={Link}
        to="/login"
        fullWidth
        sx={{ mt: 1 }}
      >
        Retour à la connexion
      </Button>
    </Paper>
  );
}

export default ForgotPassword;