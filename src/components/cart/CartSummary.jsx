import React, { useState } from 'react';

import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  IconButton,
  Chip,
} from '@mui/material';

import {
  AccountBalanceWalletRounded,
  CreditCardRounded,
  LockRounded,
  PhoneAndroidRounded,
  CheckCircleRounded,
  VisibilityRounded,
  VisibilityOffRounded,
} from '@mui/icons-material';

/* =========================================================
   LOGOS
========================================================= */

const PAYMENT_LOGOS = {
  visa:
    'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',

  mastercard:
    'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',

  amex:
    'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg',

  mpesa:
    'https://upload.wikimedia.org/wikipedia/commons/1/1b/M-PESA_LOGO-01.svg',

  airtel:
    'https://upload.wikimedia.org/wikipedia/commons/5/55/Airtel_logo.svg',

  orange:
    'https://upload.wikimedia.org/wikipedia/commons/c/c8/Orange_logo.svg',
};

/* =========================================================
   NOMS
========================================================= */

const PAYMENT_NAMES = {
  card: 'Carte bancaire',
  mpesa: 'M-Pesa',
  airtel: 'Airtel Money',
  orange: 'Orange Money',
};

/* =========================================================
   COMPONENT
========================================================= */

function PaymentMethod({
  value = 'card',
  onChange,
  phone = '',
  onPhoneChange,
}) {
  const [cardNumber, setCardNumber] =
    useState('');

  const [cardName, setCardName] =
    useState('');

  const [expiry, setExpiry] =
    useState('');

  const [cvv, setCvv] =
    useState('');

  const [showCvv, setShowCvv] =
    useState(false);

  /* =======================================================
     CHANGEMENT DU DROPDOWN
  ======================================================= */

  const handlePaymentChange = event => {
    const newPayment =
      event.target.value;

    if (typeof onChange === 'function') {
      onChange(newPayment);
    }

    /*
     * On ne modifie PAS ici la valeur
     * en "card".
     */
  };

  /* =======================================================
     TELEPHONE
  ======================================================= */

  const handlePhoneChange = event => {
    const newPhone =
      event.target.value;

    if (
      typeof onPhoneChange ===
      'function'
    ) {
      onPhoneChange(newPhone);
    }
  };

  const cleanPhone =
    phone.replace(/\D/g, '');

  const phoneInvalid =
    phone.length > 0 &&
    cleanPhone.length < 9;

  /* =======================================================
     CARTE
  ======================================================= */

  const handleCardNumberChange =
    event => {
      const value =
        event.target.value
          .replace(/\D/g, '')
          .slice(0, 16);

      const formatted =
        value.replace(
          /(.{4})/g,
          '$1 '
        );

      setCardNumber(
        formatted.trim()
      );
    };

  const handleExpiryChange =
    event => {
      const value =
        event.target.value
          .replace(/\D/g, '')
          .slice(0, 4);

      let formatted = value;

      if (value.length > 2) {
        formatted =
          `${value.slice(
            0,
            2
          )}/${value.slice(2)}`;
      }

      setExpiry(formatted);
    };

  /* =======================================================
     NOM DU PAIEMENT
  ======================================================= */

  const paymentName =
    PAYMENT_NAMES[value] ||
    'Carte bancaire';

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      {/* ===================================================
          TITRE
      =================================================== */}

      <Stack
        direction="row"
       
        spacing={1.3}
        sx={{ alignItems: 'center',  mb: 2.5 }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '13px',
            bgcolor: 'var(--pv-band)',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AccountBalanceWalletRounded />
        </Box>

        <Box sx={{ flex: 1 }}>
          <Typography
            sx={{
              fontWeight: 900,
              fontSize: '1.05rem',
              color: 'var(--pv-ink)',
            }}
          >
            Mode de paiement
          </Typography>

          <Typography
            sx={{
              mt: 0.3,
              fontSize: '0.68rem',
              color: 'var(--pv-muted)',
            }}
          >
            Sélectionnez votre moyen de
            paiement.
          </Typography>
        </Box>

        <Chip
          icon={
            <LockRounded
              sx={{
                fontSize:
                  '14px !important',
              }}
            />
          }
          label="Sécurisé"
          size="small"
          sx={{
            bgcolor: 'var(--pv-success-soft)',
            color: 'var(--pv-success)',
            fontWeight: 800,
            fontSize: '0.6rem',
          }}
        />
      </Stack>

      {/* ===================================================
          DROPDOWN
      =================================================== */}

      <FormControl
        fullWidth
        sx={{
          mb: 2,
        }}
      >
        <InputLabel
          id="payment-method-label"
          sx={{
            fontSize: '0.8rem',

            '&.Mui-focused': {
              color: '#ec4899',
            },
          }}
        >
          Mode de paiement
        </InputLabel>

        <Select
          labelId="payment-method-label"
          value={value || 'card'}
          label="Mode de paiement"
          onChange={
            handlePaymentChange
          }
          sx={{
            borderRadius: '15px',
            bgcolor: 'var(--pv-surface)',
            fontSize: '0.8rem',
            fontWeight: 700,

            '& .MuiOutlinedInput-notchedOutline':
              {
                borderColor:
                  'rgba(0,0,0,.09)',
              },

            '&:hover .MuiOutlinedInput-notchedOutline':
              {
                borderColor:
                  'rgba(236,72,153,.35)',
              },

            '&.Mui-focused .MuiOutlinedInput-notchedOutline':
              {
                borderColor: '#ec4899',
              },
          }}
        >
          {/* CARTE */}

          <MenuItem
            value="card"
            sx={{
              py: 1.4,
              borderRadius: '10px',
              mx: 0.5,
            }}
          >
            <Stack
              direction="row"
             
              spacing={1.5} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '11px',
                  bgcolor: 'var(--pv-surface-alt)',
                  display: 'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                }}
              >
                <CreditCardRounded
                  sx={{
                    color: 'var(--pv-ink)',
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: '.75rem',
                    fontWeight: 850,
                  }}
                >
                  Carte bancaire
                </Typography>

                <Typography
                  sx={{
                    fontSize: '.6rem',
                    color: 'var(--pv-muted)',
                  }}
                >
                  Visa, Mastercard,
                  American Express
                </Typography>
              </Box>
            </Stack>
          </MenuItem>

          {/* M-PESA */}

          <MenuItem
            value="mpesa"
            sx={{
              py: 1.4,
              borderRadius: '10px',
              mx: 0.5,
            }}
          >
            <Stack
              direction="row"
             
              spacing={1.5} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '11px',
                  bgcolor: 'var(--pv-surface-alt)',
                  display: 'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                }}
              >
                <Box
                  component="img"
                  src={
                    PAYMENT_LOGOS.mpesa
                  }
                  alt="M-Pesa"
                  sx={{
                    width: 31,
                    maxHeight: 25,
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: '.75rem',
                    fontWeight: 850,
                  }}
                >
                  M-Pesa
                </Typography>

                <Typography
                  sx={{
                    fontSize: '.6rem',
                    color: 'var(--pv-muted)',
                  }}
                >
                  Paiement mobile
                </Typography>
              </Box>
            </Stack>
          </MenuItem>

          {/* AIRTEL */}

          <MenuItem
            value="airtel"
            sx={{
              py: 1.4,
              borderRadius: '10px',
              mx: 0.5,
            }}
          >
            <Stack
              direction="row"
             
              spacing={1.5} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '11px',
                  bgcolor: 'var(--pv-surface-alt)',
                  display: 'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                }}
              >
                <Box
                  component="img"
                  src={
                    PAYMENT_LOGOS.airtel
                  }
                  alt="Airtel Money"
                  sx={{
                    width: 31,
                    maxHeight: 25,
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: '.75rem',
                    fontWeight: 850,
                  }}
                >
                  Airtel Money
                </Typography>

                <Typography
                  sx={{
                    fontSize: '.6rem',
                    color: 'var(--pv-muted)',
                  }}
                >
                  Paiement mobile
                </Typography>
              </Box>
            </Stack>
          </MenuItem>

          {/* ORANGE */}

          <MenuItem
            value="orange"
            sx={{
              py: 1.4,
              borderRadius: '10px',
              mx: 0.5,
            }}
          >
            <Stack
              direction="row"
             
              spacing={1.5} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '11px',
                  bgcolor: 'var(--pv-surface-alt)',
                  display: 'flex',
                  alignItems:
                    'center',
                  justifyContent:
                    'center',
                }}
              >
                <Box
                  component="img"
                  src={
                    PAYMENT_LOGOS.orange
                  }
                  alt="Orange Money"
                  sx={{
                    width: 31,
                    maxHeight: 25,
                    objectFit: 'contain',
                  }}
                />
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontSize: '.75rem',
                    fontWeight: 850,
                  }}
                >
                  Orange Money
                </Typography>

                <Typography
                  sx={{
                    fontSize: '.6rem',
                    color: 'var(--pv-muted)',
                  }}
                >
                  Paiement mobile
                </Typography>
              </Box>
            </Stack>
          </MenuItem>
        </Select>
      </FormControl>

      {/* ===================================================
          PAIEMENT ACTUEL
      =================================================== */}

      <Paper
        elevation={0}
        sx={{
          p: 1.4,
          mb: 2,
          borderRadius: '13px',
          bgcolor: 'var(--pv-accent-soft)',
          border:
            '1px solid rgba(236,72,153,.10)',
        }}
      >
        <Stack
          direction="row"
         
          spacing={1} sx={{ alignItems: 'center' }}>
          <CheckCircleRounded
            sx={{
              fontSize: 18,
              color: '#ec4899',
            }}
          />

          <Typography
            sx={{
              fontSize: '.68rem',
              fontWeight: 800,
              color: '#be185d',
            }}
          >
            Paiement sélectionné :
          </Typography>

          <Typography
            sx={{
              fontSize: '.68rem',
              fontWeight: 900,
              color: 'var(--pv-ink)',
            }}
          >
            {paymentName}
          </Typography>
        </Stack>
      </Paper>

      {/* ===================================================
          SI CARTE
      =================================================== */}

      {value === 'card' && (
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 1.7,
              sm: 2,
            },
            borderRadius: '17px',
            bgcolor: 'var(--pv-surface)',
            border:
              '1px solid var(--pv-line)',
            animation:
              'paymentForm .25s ease',
          }}
        >
          <Typography
            sx={{
              mb: 1.7,
              fontSize: '.75rem',
              fontWeight: 850,
              color: 'var(--pv-ink)',
            }}
          >
            Informations de votre carte
          </Typography>

          <Stack spacing={1.5}>
            {/* NUMERO CARTE */}

            <TextField
              fullWidth
              label="Numéro de carte"
              value={cardNumber}
              onChange={
                handleCardNumberChange
              }
              placeholder="1234 5678 9012 3456"
             
              sx={fieldStyles}
          slotProps={{
            htmlInput: {
                inputMode: 'numeric',
                maxLength: 19,
              },
          }}
        />

            {/* NOM */}

            <TextField
              fullWidth
              label="Nom sur la carte"
              value={cardName}
              onChange={event =>
                setCardName(
                  event.target.value
                )
              }
              placeholder="JOHN DOE"
              sx={fieldStyles}
            />

            {/* EXPIRATION + CVV */}

            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={1.5}
            >
              <TextField
                fullWidth
                label="Expiration"
                value={expiry}
                onChange={
                  handleExpiryChange
                }
                placeholder="MM/AA"
               
                sx={fieldStyles}
          slotProps={{
            htmlInput: {
                  inputMode: 'numeric',
                  maxLength: 5,
                },
          }}
        />

              <TextField
                fullWidth
                label="CVV"
                value={cvv}
                onChange={event =>
                  setCvv(
                    event.target.value
                      .replace(
                        /\D/g,
                        ''
                      )
                      .slice(
                        0,
                        4
                      )
                  )
                }
                type={
                  showCvv
                    ? 'text'
                    : 'password'
                }
                placeholder="•••"
               
               
                sx={fieldStyles}
          slotProps={{
            input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() =>
                          setShowCvv(
                            previous =>
                              !previous
                          )
                        }
                      >
                        {showCvv ? (
                          <VisibilityOffRounded
                            sx={{
                              fontSize: 18,
                            }}
                          />
                        ) : (
                          <VisibilityRounded
                            sx={{
                              fontSize: 18,
                            }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
            htmlInput: {
                  inputMode: 'numeric',
                  maxLength: 4,
                },
          }}
        />
            </Stack>
          </Stack>

          <SecurityMessage />
        </Paper>
      )}

      {/* ===================================================
          SI MOBILE MONEY
      =================================================== */}

      {value !== 'card' && (
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 1.7,
              sm: 2,
            },
            borderRadius: '17px',
            bgcolor: 'var(--pv-surface)',
            border:
              '1px solid rgba(236,72,153,.10)',
            animation:
              'paymentForm .25s ease',
          }}
        >
          <Stack
            direction="row"
           
            spacing={1}
            sx={{ alignItems: 'center',  mb: 1.8 }}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                bgcolor: 'var(--pv-accent-soft)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <PhoneAndroidRounded
                sx={{
                  color: '#ec4899',
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: '.76rem',
                  fontWeight: 850,
                }}
              >
                Numéro {paymentName}
              </Typography>

              <Typography
                sx={{
                  mt: .2,
                  fontSize: '.6rem',
                  color: 'var(--pv-muted)',
                }}
              >
                Entrez le numéro de téléphone
                utilisé pour effectuer le
                paiement.
              </Typography>
            </Box>
          </Stack>

          <TextField
            fullWidth
            required
            label={`Numéro ${paymentName}`}
            value={phone}
            onChange={
              handlePhoneChange
            }
            placeholder="+243 812 345 678"
            error={phoneInvalid}
            helperText={
              phoneInvalid
                ? 'Veuillez entrer un numéro valide.'
                : 'Exemple : +243 812 345 678'
            }
           
           
            sx={fieldStyles}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneAndroidRounded
                    sx={{
                      fontSize: 19,
                      color: '#ec4899',
                    }}
                  />
                </InputAdornment>
              ),
            },
            htmlInput: {
              inputMode: 'tel',
            },
          }}
        />

          <SecurityMessage />
        </Paper>
      )}

      <style>
        {`
          @keyframes paymentForm {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
}

/* =========================================================
   SECURITY
========================================================= */

function SecurityMessage() {
  return (
    <Stack
      direction="row"
     
      spacing={0.8}
      sx={{ alignItems: 'center', 
        mt: 1.7,
        p: 1.1,
        borderRadius: '11px',
        bgcolor: 'var(--pv-success-soft)',
      }}
    >
      <LockRounded
        sx={{
          fontSize: 15,
          color: 'var(--pv-success)',
        }}
      />

      <Typography
        sx={{
          fontSize: '.59rem',
          color: 'var(--pv-body)',
          fontWeight: 600,
        }}
      >
        Paiement sécurisé. Vos
        informations sont protégées.
      </Typography>
    </Stack>
  );
}

/* =========================================================
   STYLES
========================================================= */

const fieldStyles = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '13px',
    bgcolor: 'var(--pv-canvas)',
    fontSize: '.78rem',

    '& fieldset': {
      borderColor:
        'rgba(0,0,0,.08)',
    },

    '&:hover fieldset': {
      borderColor:
        'rgba(236,72,153,.3)',
    },

    '&.Mui-focused': {
      bgcolor: 'var(--pv-surface)',

      '& fieldset': {
        borderColor: '#ec4899',
      },
    },
  },

  '& .MuiInputLabel-root': {
    fontSize: '.76rem',
  },

  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ec4899',
  },

  '& .MuiFormHelperText-root': {
    fontSize: '.58rem',
  },
};

export default PaymentMethod;
