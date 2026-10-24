import React, { useState } from 'react';

import {
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Stack,
} from '@mui/material';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import authService from '../../services/authService';
import { readApiError } from '../../services/api';

import {
  loginSuccess,
} from '../../store/slices/authSlice';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /*
   * Un seul champ pour les deux identités : une adresse e-mail ou un
   * numéro de téléphone. Le serveur reconnaît l'un ou l'autre.
   */
  const [identifier, setIdentifier] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [error, setError] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const submit = async e => {
    e.preventDefault();

    if (!identifier || !password) {
      setError(
        'Veuillez remplir tous les champs.'
      );

      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await authService.login(identifier, password);

      dispatch(loginSuccess(result));

      navigate(result.user.role === 'admin' ? '/admin' : '/');
    } catch (submitError) {
      /* L'ancienne version connectait l'utilisateur même quand l'API
         refusait : l'erreur doit désormais s'afficher. */
      setError(readApiError(submitError, 'Connexion impossible.'));
    }

    setLoading(false);
  };

  return (
    <Paper
      sx={{
        p: {
          xs: 3,
          sm: 5,
        },
        width: '100%',
        maxWidth: 450,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={900}
      >
        Connexion
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1, mb: 4 }}
      >
        Connectez-vous à votre compte.
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2 }}
        >
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={submit}
      >
        <Stack spacing={2}>
          <TextField
            fullWidth
            label="Email ou téléphone"
            value={identifier}
            onChange={e =>
              setIdentifier(e.target.value)
            }
            helperText="Par exemple 0812345678"
          />

          <TextField
            fullWidth
            label="Mot de passe"
            type="password"
            value={password}
            onChange={e =>
              setPassword(e.target.value)
            }
          />

          <Button
            component={Link}
            to="/forgot-password"
            size="small"
            sx={{
              alignSelf: 'flex-end',
            }}
          >
            Mot de passe oublié ?
          </Button>

          <Button
            type="submit"
            variant="contained"
            size="large"
          disabled={loading}
        >
            {loading ? 'Connexion…' : 'Se connecter'}
          </Button>

          <Typography
            textAlign="center"
            color="text.secondary"
          >
            Vous n'avez pas de compte ?
          </Typography>

          <Button
            component={Link}
            to="/register"
            variant="outlined"
          >
            Créer un compte
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default Login;