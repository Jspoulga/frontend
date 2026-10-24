import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { QRCodeSVG } from 'qrcode.react';

import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Stack,
  Typography,
} from '@mui/material';

import QrCode2Rounded from '@mui/icons-material/QrCode2Rounded';
import RefreshRounded from '@mui/icons-material/RefreshRounded';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import ContentCopyRounded from '@mui/icons-material/ContentCopyRounded';
import PaymentRounded from '@mui/icons-material/PaymentRounded';

import paymentSessionService, {
  SESSION_STATUS,
} from '../../services/paymentSessionService';

const POLL_INTERVAL_MS = 2000;

function formatRemaining(ms) {
  const total = Math.max(
    0,
    Math.floor(ms / 1000),
  );

  return `${Math.floor(total / 60)}:${String(
    total % 60,
  ).padStart(2, '0')}`;
}

function normalizePhone(phone) {
  return String(phone || '')
    .replace(/[\s().-]/g, '')
    .trim();
}

function isValidPhone(phone) {
  return /^(\+243|0)\d{9}$/.test(phone);
}

function QrPayment({
  amount,
  itemCount,
  customerName,
  provider,
  mobilePhone,
  onPaid,
}) {
  const [session, setSession] = useState(null);
  const [creating, setCreating] = useState(false);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState('');
  const [remaining, setRemaining] = useState(0);
  const [copied, setCopied] = useState(false);

  const paidHandled = useRef(false);
  const copyTimer = useRef(null);

  const payUrl = session
    ? `${window.location.origin}/pay/${session.id}`
    : '';

  useEffect(() => {
    return () => {
      clearTimeout(copyTimer.current);
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * GÉNÉRER QR
   * ---------------------------------------------------------
   */

  const start = async () => {
    setError('');

    const cleanedPhone = normalizePhone(mobilePhone);

    if (!isValidPhone(cleanedPhone)) {
      setError(
        'Veuillez saisir un numéro de téléphone congolais valide avant de générer le QR code.',
      );
      return;
    }

    if (!provider) {
      setError(
        'Veuillez sélectionner un mode de paiement.',
      );
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError(
        'Le montant du paiement est invalide.',
      );
      return;
    }

    setCreating(true);
    paidHandled.current = false;

    try {
      const created =
        await paymentSessionService.create({
          amount,
          provider,
          itemCount,
          customerName,
        });

      setSession(created);
    } catch (err) {
      console.error(
        'Erreur création QR :',
        err,
      );

      setError(
        'Impossible de générer le QR code. Réessayez.',
      );
    } finally {
      setCreating(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * PAYER DIRECTEMENT
   * ---------------------------------------------------------
   */

  const payNow = async () => {
    if (!session) {
      return;
    }

    setError('');

    const cleanedPhone = normalizePhone(mobilePhone);

    if (!isValidPhone(cleanedPhone)) {
      setError(
        'Veuillez saisir un numéro de téléphone congolais valide.',
      );
      return;
    }

    setPaying(true);

    try {
      const paid =
        await paymentSessionService.confirm(
          session.id,
          {
            phone: cleanedPhone,
            provider,
          },
        );

      setSession(paid);

      if (
        paid.status === SESSION_STATUS.PAID &&
        !paidHandled.current
      ) {
        paidHandled.current = true;

        if (onPaid) {
          await onPaid(paid);
        }
      }
    } catch (err) {
      console.error(
        'Erreur paiement QR :',
        err,
      );

      if (
        err?.message ===
        'PAYMENT_DECLINED'
      ) {
        setError(
          'Le paiement a été refusé. Vérifiez votre numéro et réessayez.',
        );
      } else if (
        err?.message ===
        'INVALID_PAYMENT_PHONE'
      ) {
        setError(
          'Le numéro de téléphone est invalide.',
        );
      } else if (
        err?.message ===
        'SESSION_EXPIRED'
      ) {
        setError(
          'Le QR code a expiré. Générez un nouveau code.',
        );

        setSession(previous =>
          previous
            ? {
                ...previous,
                status:
                  SESSION_STATUS.EXPIRED,
              }
            : previous,
        );
      } else {
        setError(
          'Impossible de confirmer le paiement.',
        );
      }
    } finally {
      setPaying(false);
    }
  };

  /*
   * ---------------------------------------------------------
   * VÉRIFIER LE PAIEMENT
   * ---------------------------------------------------------
   */

  const refresh = useCallback(async () => {
    if (!session) {
      return;
    }

    try {
      const latest =
        await paymentSessionService.get(
          session.id,
        );

      if (!latest) {
        return;
      }

      setSession(latest);

      if (
        latest.status ===
          SESSION_STATUS.PAID &&
        !paidHandled.current
      ) {
        paidHandled.current = true;

        if (onPaid) {
          await onPaid(latest);
        }
      }
    } catch (err) {
      console.error(
        'Erreur vérification QR :',
        err,
      );
    }
  }, [session, onPaid]);

  /*
   * ---------------------------------------------------------
   * POLLING
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (
      !session ||
      session.status !==
        SESSION_STATUS.PENDING
    ) {
      return undefined;
    }

    const id = setInterval(
      refresh,
      POLL_INTERVAL_MS,
    );

    const onStorage = event => {
      if (
        event.key ===
        paymentSessionService.storageKey
      ) {
        refresh();
      }
    };

    const onCustomStorage = () => {
      refresh();
    };

    window.addEventListener(
      'storage',
      onStorage,
    );

    window.addEventListener(
      paymentSessionService.eventName,
      onCustomStorage,
    );

    return () => {
      clearInterval(id);

      window.removeEventListener(
        'storage',
        onStorage,
      );

      window.removeEventListener(
        paymentSessionService.eventName,
        onCustomStorage,
      );
    };
  }, [session, refresh]);

  /*
   * ---------------------------------------------------------
   * EXPIRATION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (
      !session ||
      session.status !==
        SESSION_STATUS.PENDING
    ) {
      return undefined;
    }

    const tick = () => {
      const left =
        session.expiresAt -
        Date.now();

      setRemaining(left);

      if (left <= 0) {
        setSession(previous =>
          previous
            ? {
                ...previous,
                status:
                  SESSION_STATUS.EXPIRED,
              }
            : previous,
        );
      }
    };

    tick();

    const id = setInterval(
      tick,
      1000,
    );

    return () =>
      clearInterval(id);
  }, [session]);

  /*
   * ---------------------------------------------------------
   * COPIER LIEN
   * ---------------------------------------------------------
   */

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        payUrl,
      );

      setCopied(true);

      clearTimeout(
        copyTimer.current,
      );

      copyTimer.current =
        setTimeout(
          () => setCopied(false),
          2500,
        );
    } catch (err) {
      setError(
        'Copie impossible. Sélectionnez le lien manuellement.',
      );
    }
  };

  const expired =
    session?.status ===
    SESSION_STATUS.EXPIRED;

  const paid =
    session?.status ===
    SESSION_STATUS.PAID;

  return (
    <Box
      sx={{
        mt: 2,
        p: {
          xs: 2,
          sm: 2.5,
        },
        borderRadius: '18px',
        bgcolor: 'var(--pv-canvas)',
        border:
          '1px solid var(--pv-line)',
      }}
    >
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 42,
            height: 42,
            flexShrink: 0,
            borderRadius: '13px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'var(--pv-band)',
            color: '#f472b6',
          }}
        >
          <QrCode2Rounded />
        </Box>

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.88rem',
              fontWeight: 800,
              color: 'var(--pv-ink)',
            }}
          >
            Payer avec mon téléphone
          </Typography>

          <Typography
            sx={{
              mt: 0.3,
              fontSize: '0.7rem',
              color: 'var(--pv-muted)',
            }}
          >
            Générez un QR code ou payez directement avec
            votre numéro.
          </Typography>
        </Box>
      </Stack>

      {!session && (
        <Button
          fullWidth
          onClick={start}
          disabled={creating}
          startIcon={
            creating ? (
              <CircularProgress
                size={16}
                sx={{ color: 'inherit' }}
              />
            ) : (
              <QrCode2Rounded />
            )
          }
          sx={{
            mt: 2,
            minHeight: 48,
            borderRadius: '13px',
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '0.82rem',
            color: '#be185d',
            border:
              '1px solid rgba(236,72,153,0.35)',
            '&:hover': {
              bgcolor: '#fff1f7',
            },
          }}
        >
          {creating
            ? 'Génération…'
            : 'Générer le QR code'}
        </Button>
      )}

      {session && (
        <Box sx={{ mt: 2.5 }}>
          {paid ? (
            <Stack
              spacing={1}
              sx={{
                alignItems: 'center',
                textAlign: 'center',
                py: 2,
              }}
            >
              <CheckCircleRounded
                sx={{
                  fontSize: 42,
                  color: 'var(--pv-success)',
                }}
              />

              <Typography
                sx={{
                  fontSize: '0.95rem',
                  fontWeight: 800,
                }}
              >
                Paiement confirmé
              </Typography>

              <Typography
                sx={{
                  fontSize: '0.74rem',
                  color: 'var(--pv-muted)',
                }}
              >
                Finalisation de votre commande…
              </Typography>
            </Stack>
          ) : (
            <>
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                spacing={2.5}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: '16px',
                    bgcolor: 'var(--pv-surface)',
                    border:
                      '1px solid var(--pv-line)',
                    lineHeight: 0,
                    opacity: expired ? 0.35 : 1,
                  }}
                >
                  <QRCodeSVG
                    value={payUrl}
                    size={148}
                    level="M"
                    marginSize={0}
                    title="QR code de paiement Pivot Store"
                  />
                </Box>

                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    width: '100%',
                  }}
                >
                  {expired ? (
                    <Typography
                      sx={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: 'var(--pv-warning)',
                      }}
                    >
                      QR code expiré
                    </Typography>
                  ) : (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        alignItems: 'center',
                      }}
                    >
                      <CircularProgress
                        size={14}
                        sx={{
                          color: '#ec4899',
                        }}
                      />

                      <Typography
                        sx={{
                          fontSize: '0.78rem',
                          fontWeight: 700,
                          color: 'var(--pv-ink)',
                        }}
                      >
                        En attente du paiement…
                      </Typography>
                    </Stack>
                  )}

                  <Typography
                    sx={{
                      mt: 0.8,
                      fontSize: '0.7rem',
                      color: 'var(--pv-muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    {expired
                      ? 'Générez un nouveau code pour reprendre le paiement.'
                      : `Valable encore ${formatRemaining(
                          remaining,
                        )}.`}
                  </Typography>
                </Box>
              </Stack>

              {!expired && (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={payNow}
                  disabled={paying}
                  startIcon={
                    paying ? (
                      <CircularProgress
                        size={18}
                        sx={{
                          color: 'inherit',
                        }}
                      />
                    ) : (
                      <PaymentRounded />
                    )
                  }
                  sx={{
                    mt: 2.5,
                    minHeight: 50,
                    borderRadius: '13px',
                    textTransform: 'none',
                    fontWeight: 800,
                    fontSize: '0.84rem',
                    boxShadow: 'none',
                    color: '#fff',
                    background:
                      'linear-gradient(135deg, var(--pv-ink), #4C1D95)',
                    '&:hover': {
                      boxShadow: 'none',
                      background:
                        'linear-gradient(135deg, var(--pv-ink), #3b0764)',
                    },
                  }}
                >
                  {paying
                    ? 'Confirmation du paiement…'
                    : 'Payer maintenant'}
                </Button>
              )}

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  mt: 1.2,
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  onClick={start}
                  disabled={creating || paying}
                  startIcon={
                    <RefreshRounded
                      sx={{
                        fontSize:
                          '16px !important',
                      }}
                    />
                  }
                  sx={{
                    px: 1.5,
                    minHeight: 38,
                    borderRadius: '11px',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.72rem',
                    color: '#be185d',
                  }}
                >
                  Nouveau code
                </Button>

                {!expired && (
                  <Button
                    onClick={copyLink}
                    startIcon={
                      copied ? (
                        <CheckCircleRounded
                          sx={{
                            fontSize:
                              '16px !important',
                          }}
                        />
                      ) : (
                        <ContentCopyRounded
                          sx={{
                            fontSize:
                              '16px !important',
                          }}
                        />
                      )
                    }
                    sx={{
                      px: 1.5,
                      minHeight: 38,
                      borderRadius: '11px',
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      color: copied
                        ? 'var(--pv-success)'
                        : 'var(--pv-body)',
                    }}
                  >
                    {copied
                      ? 'Lien copié'
                      : 'Copier le lien'}
                  </Button>
                )}
              </Stack>
            </>
          )}
        </Box>
      )}

      <Collapse
        in={Boolean(error)}
        unmountOnExit
      >
        <Alert
          severity="error"
          sx={{
            mt: 2,
            borderRadius: '13px',
            fontSize: '0.78rem',
          }}
        >
          {error}
        </Alert>
      </Collapse>
    </Box>
  );
}

export default QrPayment;
