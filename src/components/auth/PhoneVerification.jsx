import React, { useEffect, useState } from 'react';

import { Alert, Box, Button, Stack, TextField, Typography } from '@mui/material';
import { CheckCircleRounded, SmsOutlined } from '@mui/icons-material';
import { motion } from 'framer-motion';

import authService from '../../services/authService';
import { readApiError } from '../../services/api';

/*
 * ------------------------------------------------------------------
 * Confirmation du numéro de téléphone
 * ------------------------------------------------------------------
 *
 * Six chiffres reçus par SMS. Deux précautions d'interface :
 *
 *   — quand le SMS n'est pas réellement parti (passerelle non
 *     configurée), on le dit franchement plutôt que de laisser le
 *     client attendre un message qui ne viendra jamais ;
 *   — le bouton « renvoyer » reste grisé pendant le délai imposé par
 *     le serveur, décompte visible : sans cela le client appuie en
 *     boucle et croit que rien ne fonctionne.
 */

const CODE_LENGTH = 6;

export default function PhoneVerification({ phone, initial, onVerified }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  /* Ce que le serveur a répondu au dernier envoi. */
  const [delivery, setDelivery] = useState(initial || null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) {
      return undefined;
    }

    const timer = setTimeout(() => setCooldown(current => current - 1), 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const submit = async event => {
    event.preventDefault();

    if (code.replace(/\D/g, '').length !== CODE_LENGTH) {
      setError(`Le code compte ${CODE_LENGTH} chiffres.`);

      return;
    }

    setError('');
    setLoading(true);

    try {
      const result = await authService.verifyPhoneCode(phone, code);

      setVerified(true);
      onVerified?.(result.user);
    } catch (verifyError) {
      setError(readApiError(verifyError, 'Code incorrect.'));
    }

    setLoading(false);
  };

  const resend = async () => {
    setError('');
    setLoading(true);

    try {
      const result = await authService.requestPhoneCode(phone);

      setDelivery(result);
      setCooldown(60);
    } catch (resendError) {
      const seconds = resendError?.response?.data?.retryAfterSeconds;

      if (seconds) {
        setCooldown(seconds);
      }

      setError(readApiError(resendError, 'Envoi impossible.'));
    }

    setLoading(false);
  };

  if (verified) {
    return (
      <Alert
        icon={<CheckCircleRounded fontSize="inherit" />}
        severity="success"
        sx={{ borderRadius: '14px' }}
      >
        Votre numéro {phone} est confirmé.
      </Alert>
    );
  }

  return (
    <Box
      component={motion.form}
      onSubmit={submit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={1.2} sx={{ alignItems: 'flex-start' }}>
          <SmsOutlined sx={{ color: 'var(--pv-accent)', mt: 0.3 }} />

          <Box>
            <Typography sx={{ fontWeight: 700, color: 'var(--pv-ink)' }}>
              Confirmez votre numéro
            </Typography>

            <Typography sx={{ fontSize: 13.5, color: 'var(--pv-body)' }}>
              Nous avons envoyé un code à {phone}.
            </Typography>
          </Box>
        </Stack>

        {/* Passerelle SMS absente : le code existe mais n'est pas parti. */}
        {delivery && delivery.smsDelivered === false ? (
          <Alert severity="info" sx={{ borderRadius: '14px', fontSize: '0.82rem' }}>
            L&apos;envoi de SMS n&apos;est pas encore activé sur cette boutique.
            {delivery.devCode ? (
              <>
                {' '}
                Code de test : <strong>{delivery.devCode}</strong>
              </>
            ) : (
              " Contactez l'administrateur pour obtenir votre code."
            )}
          </Alert>
        ) : null}

        {error ? (
          <Alert severity="error" sx={{ borderRadius: '14px', fontSize: '0.82rem' }}>
            {error}
          </Alert>
        ) : null}

        <TextField
          label="Code à 6 chiffres"
          value={code}
          onChange={event =>
            setCode(event.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH))
          }
          inputProps={{
            inputMode: 'numeric',
            style: { letterSpacing: '0.5em', fontSize: 20, fontWeight: 700 },
          }}
          placeholder="000000"
        />

        <Button type="submit" variant="contained" size="large" disabled={loading}>
          {loading ? 'Vérification…' : 'Confirmer mon numéro'}
        </Button>

        <Button onClick={resend} disabled={loading || cooldown > 0} size="small">
          {cooldown > 0 ? `Renvoyer le code (${cooldown} s)` : 'Renvoyer le code'}
        </Button>
      </Stack>
    </Box>
  );
}
