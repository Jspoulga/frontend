import React, { useCallback, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
import LockOutlined from '@mui/icons-material/LockOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import TimerOutlined from '@mui/icons-material/TimerOutlined';

import paymentSessionService, {
  SESSION_STATUS,
} from '../../services/paymentSessionService';

import formatCurrency from '../../utils/formatCurrency';

const PROVIDERS = [
  { id: 'mpesa', label: 'M-PESA', name: 'Vodacom M-Pesa', bg: '#e60000' },
  { id: 'airtel', label: 'airtel', name: 'Airtel Money', bg: '#e40000' },
  { id: 'orange', label: 'Orange', name: 'Orange Money', bg: '#ff7900' },
];

const PHONE_PATTERN = /^(\+243|0)\d{9}$/;

function formatRemaining(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function PayOnPhone() {
  const { sessionId } = useParams();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState('mpesa');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [remaining, setRemaining] = useState(0);

  const load = useCallback(async () => {
    const found = await paymentSessionService.get(sessionId);

    setSession(found);

    if (found?.provider) {
      setProvider(found.provider);
    }

    setLoading(false);
  }, [sessionId]);

  useEffect(() => {
    load();
  }, [load]);

  /* Compte à rebours : le lien n'est valable que quelques minutes. */
  useEffect(() => {
    if (!session || session.status !== SESSION_STATUS.PENDING) {
      return undefined;
    }

    const tick = () => {
      const left = session.expiresAt - Date.now();

      setRemaining(left);

      if (left <= 0) {
        setSession(previous =>
          previous ? { ...previous, status: SESSION_STATUS.EXPIRED } : previous,
        );
      }
    };

    tick();

    const id = setInterval(tick, 1000);

    return () => clearInterval(id);
  }, [session]);

  const confirm = async () => {
    const cleaned = phone.replace(/[\s.-]/g, '');

    if (!PHONE_PATTERN.test(cleaned)) {
      setPhoneError('Numéro invalide. Ex. +243 812 345 678');
      return;
    }

    setPhoneError('');
    setError('');
    setSubmitting(true);

    try {
      const paid = await paymentSessionService.confirm(sessionId, {
        phone: cleaned,
        provider,
      });

      setSession(paid);
    } catch (err) {
      setError(
        err.message === 'SESSION_EXPIRED'
          ? 'Ce lien de paiement a expiré. Relancez le paiement depuis votre ordinateur.'
          : "Le paiement n'a pas pu être confirmé. Réessayez.",
      );
    }

    setSubmitting(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'var(--pv-canvas)',
        pb: 6,
      }}
    >
      {/* En-tête marque */}
      <Box
        sx={{
          background:
            'linear-gradient(130deg, #121016 0%, #1b141c 55%, #2a1526 100%)',
          color: '#fff',
          pt: 4,
          pb: 7,
          px: 2,
          textAlign: 'center',
        }}
      >
        <Typography
          component="span"
          sx={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.045em' }}
        >
          Pivot
          <Box component="span" sx={{ color: '#f472b6' }}>
            Store
          </Box>
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#f472b6',
          }}
        >
          Paiement mobile
        </Typography>
      </Box>

      <Container maxWidth="sm" sx={{ mt: -5 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, sm: 3 },
            borderRadius: '22px',
            bgcolor: 'var(--pv-surface)',
            border: '1px solid var(--pv-line)',
            boxShadow: '0 18px 50px rgba(17,16,22,0.08)',
          }}
        >
          {loading && (
            <Stack
              spacing={2}
              sx={{ alignItems: 'center', py: 5 }}
            >
              <CircularProgress size={26} sx={{ color: '#ec4899' }} />

              <Typography sx={{ fontSize: '0.82rem', color: 'var(--pv-body)' }}>
                Chargement du paiement…
              </Typography>
            </Stack>
          )}

          {!loading && !session && (
            <StatusBlock
              icon={<ErrorOutlineRounded sx={{ fontSize: 30 }} />}
              tone="var(--pv-error)"
              title="Lien introuvable"
              text="Ce lien de paiement n'existe pas ou a déjà été utilisé. Relancez le paiement depuis votre ordinateur."
            />
          )}

          {!loading && session?.status === SESSION_STATUS.EXPIRED && (
            <StatusBlock
              icon={<TimerOutlined sx={{ fontSize: 30 }} />}
              tone="var(--pv-warning)"
              title="Lien expiré"
              text="Par sécurité, ce lien n'est valable que quelques minutes. Affichez un nouveau QR code depuis votre ordinateur."
            />
          )}

          {!loading && session?.status === SESSION_STATUS.CANCELLED && (
            <StatusBlock
              icon={<ErrorOutlineRounded sx={{ fontSize: 30 }} />}
              tone="var(--pv-error)"
              title="Paiement annulé"
              text="Ce paiement a été annulé depuis l'ordinateur."
            />
          )}

          {!loading && session?.status === SESSION_STATUS.PAID && (
            <StatusBlock
              icon={<CheckCircleRounded sx={{ fontSize: 30 }} />}
              tone="var(--pv-success)"
              title="Paiement confirmé"
              text="Merci ! Vous pouvez retourner à votre ordinateur : la commande s'y termine automatiquement."
              extra={
                <Stack spacing={0.5} sx={{ alignItems: 'center', mt: 1.5 }}>
                  <Typography sx={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--pv-ink)' }}>
                    {formatCurrency(session.amount)}
                  </Typography>

                  {session.transactionId && (
                    <Typography sx={{ fontSize: '0.7rem', color: 'var(--pv-muted)' }}>
                      Référence {session.transactionId}
                    </Typography>
                  )}
                </Stack>
              }
            />
          )}

          {!loading && session?.status === SESSION_STATUS.PENDING && (
            <>
              <Stack spacing={0.5} sx={{ alignItems: 'center', textAlign: 'center' }}>
                <Typography sx={{ fontSize: '0.72rem', color: 'var(--pv-muted)' }}>
                  Montant à payer
                </Typography>

                <Typography
                  sx={{
                    fontSize: '2rem',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: 'var(--pv-ink)',
                  }}
                >
                  {formatCurrency(session.amount)}
                </Typography>

                <Typography sx={{ fontSize: '0.78rem', color: 'var(--pv-body)' }}>
                  {session.itemCount}{' '}
                  {session.itemCount > 1 ? 'articles' : 'article'} · Pivot Store
                </Typography>

                <Stack
                  direction="row"
                  spacing={0.7}
                  sx={{ alignItems: 'center', mt: 1 }}
                >
                  <TimerOutlined sx={{ fontSize: 15, color: 'var(--pv-muted)' }} />

                  <Typography sx={{ fontSize: '0.72rem', color: 'var(--pv-muted)' }}>
                    Lien valable encore {formatRemaining(remaining)}
                  </Typography>
                </Stack>
              </Stack>

              <Divider sx={{ my: 3 }} />

              <Typography
                sx={{
                  mb: 1.5,
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: 'var(--pv-ink)',
                }}
              >
                Choisissez votre opérateur
              </Typography>

              <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                {PROVIDERS.map(item => {
                  const selected = provider === item.id;

                  return (
                    <Box
                      key={item.id}
                      component="button"
                      type="button"
                      onClick={() => setProvider(item.id)}
                      aria-pressed={selected}
                      sx={{
                        flex: 1,
                        minWidth: 0,
                        p: 1.25,
                        cursor: 'pointer',
                        borderRadius: '14px',
                        bgcolor: selected ? '#fff7fb' : 'var(--pv-surface)',
                        border: selected
                          ? '1.5px solid rgba(236,72,153,0.5)'
                          : '1px solid var(--pv-line)',
                        transition: 'border-color .2s ease, background-color .2s ease',
                      }}
                    >
                      <Box
                        sx={{
                          height: 28,
                          borderRadius: '7px',
                          bgcolor: item.bg,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '0.58rem',
                            fontWeight: 800,
                            color: '#fff',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.label}
                        </Typography>
                      </Box>

                      <Typography
                        sx={{
                          mt: 0.8,
                          fontSize: '0.62rem',
                          fontWeight: 600,
                          color: selected ? '#be185d' : 'var(--pv-body)',
                          lineHeight: 1.3,
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>

              <TextField
                fullWidth
                label="Numéro de téléphone"
                placeholder="+243 812 345 678"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={event => {
                  setPhone(event.target.value);
                  setPhoneError('');
                }}
                error={Boolean(phoneError)}
                helperText={
                  phoneError || 'Le numéro qui recevra la demande de paiement.'
                }
                slotProps={{
                  input: {
                    startAdornment: (
                      <PhoneOutlined sx={{ mr: 1.2, color: 'var(--pv-muted)' }} />
                    ),
                  },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    minHeight: 56,
                    borderRadius: '14px',
                    fontSize: '0.9rem',
                  },
                  '& .MuiInputLabel-root.Mui-focused': { color: '#be185d' },
                  '& .MuiOutlinedInput-root.Mui-focused fieldset': {
                    borderColor: '#ec4899',
                  },
                }}
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2, borderRadius: '14px' }}>
                  {error}
                </Alert>
              )}

              <Button
                fullWidth
                variant="contained"
                disableElevation
                onClick={confirm}
                disabled={submitting}
                sx={{
                  mt: 2.5,
                  minHeight: 54,
                  borderRadius: '14px',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  bgcolor: '#be185d',
                  '&:hover': { bgcolor: '#9d174d' },
                }}
              >
                {submitting
                  ? 'Confirmation…'
                  : `Payer ${formatCurrency(session.amount)}`}
              </Button>

              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: 'center', mt: 2 }}
              >
                <LockOutlined sx={{ fontSize: 16, color: 'var(--pv-success)' }} />

                <Typography sx={{ fontSize: '0.68rem', color: 'var(--pv-muted)', lineHeight: 1.5 }}>
                  Paiement sécurisé. Pivot Store ne conserve pas votre code secret
                  opérateur.
                </Typography>
              </Stack>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

function StatusBlock({ icon, tone, title, text, extra }) {
  return (
    <Stack spacing={1.5} sx={{ alignItems: 'center', textAlign: 'center', py: 3 }}>
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: tone,
          bgcolor: `${tone}14`,
        }}
      >
        {icon}
      </Box>

      <Typography sx={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--pv-ink)' }}>
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: '0.82rem',
          color: 'var(--pv-body)',
          lineHeight: 1.6,
          maxWidth: 340,
        }}
      >
        {text}
      </Typography>

      {extra}
    </Stack>
  );
}

export default PayOnPhone;
