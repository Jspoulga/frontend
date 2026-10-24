import React, { useState } from 'react';

import {
  Alert,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';

import {
  Link,
  useNavigate,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import authService from '../../services/authService';
import { readApiError } from '../../services/api';
import { loginSuccess } from '../../store/slices/authSlice';
import PhoneVerification from '../../components/auth/PhoneVerification';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      name: '',
      email: '',
      phone: '',
      password: '',
    });

  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  /*
   * Renseigné quand l'inscription s'est faite avec un numéro : l'écran
   * passe alors à la saisie du code reçu par SMS.
   */
  const [verification, setVerification] = useState(null);

  const update = field => e => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const submit = async e => {
    e.preventDefault();

    setError('');

    /*
     * Un compte a besoin d'au moins un moyen de se reconnecter. Le
     * serveur le revérifie, mais autant le dire avant l'aller-retour.
     */
    if (!form.email.trim() && !form.phone.trim()) {
      setError('Indiquez une adresse email ou un numéro de téléphone.');

      return;
    }

    setLoading(true);

    try {
      /* L'API renvoie un jeton : on connecte directement après l'inscription. */
      const result = await authService.register(form);

      if (result?.token) {
        dispatch(loginSuccess(result));

        /*
         * Le compte est créé et déjà connecté ; on propose la
         * confirmation du numéro sans la rendre obligatoire — bloquer
         * l'accès sur un SMS qui peut ne pas partir enfermerait le
         * client dehors.
         */
        if (result.verification?.sent) {
          setVerification({
            phone: result.user.phone,
            delivery: result.verification,
          });

          setLoading(false);

          return;
        }

        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (submitError) {
      setError(readApiError(submitError, 'Inscription impossible.'));
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
        Créer un compte
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1, mb: 4 }}
      >
        Rejoignez Pivot Store.
      </Typography>

      {error && (
        <Alert
          severity="error"
          sx={{ mb: 2, borderRadius: '12px', fontSize: '0.85rem' }}
        >
          {error}
        </Alert>
      )}

      {verification ? (
        <Stack spacing={2}>
          <PhoneVerification
            phone={verification.phone}
            initial={verification.delivery}
            onVerified={() => navigate('/')}
          />

          <Button onClick={() => navigate('/')} size="small">
            Plus tard
          </Button>
        </Stack>
      ) : (
        <Stack
          component="form"
          spacing={2}
          onSubmit={submit}
        >
        <TextField
          label="Nom complet"
          value={form.name}
          onChange={update('name')}
        />

        <TextField
          label="Téléphone"
          type="tel"
          placeholder="0812345678"
          value={form.phone}
          onChange={update('phone')}
          helperText="Le numéro qui recevra vos paiements Mobile Money."
        />

        <TextField
          label="Email (facultatif)"
          type="email"
          value={form.email}
          onChange={update('email')}
          helperText="Un numéro de téléphone suffit pour ouvrir un compte."
        />

        <TextField
          label="Mot de passe"
          type="password"
          value={form.password}
          onChange={update('password')}
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
        >
          {loading ? 'Création…' : 'Créer mon compte'}
        </Button>
        </Stack>
      )}

      {/* Le lien de connexion n'a pas de sens pendant la confirmation. */}
      {verification ? null : (
        <Button
          component={Link}
          to="/login"
          sx={{ mt: 2 }}
          fullWidth
        >
          Déjà un compte ? Se connecter
        </Button>
      )}
    </Paper>
  );
}

export default Register;