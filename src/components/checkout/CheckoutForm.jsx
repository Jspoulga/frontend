import React from 'react';

import {
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import VerifiedUserOutlined from '@mui/icons-material/VerifiedUserOutlined';

import AddressForm from './AddressForm';

function CheckoutForm({
  address,
  setAddress,
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        width: '100%',

        p: {
          xs: 2,
          sm: 2.5,
          md: 3.5,
        },

        borderRadius: {
          xs: '22px',
          md: '26px',
        },

        bgcolor: 'var(--pv-surface)',

        border:
          '1px solid var(--pv-line)',

        boxShadow:
          '0 14px 45px rgba(0,0,0,0.045)',

        overflow: 'hidden',

        animation:
          'checkoutFormEnter .45s ease both',

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 3,

          background:
            'linear-gradient(90deg, var(--pv-ink) 0%, #ec4899 55%, #a855f7 100%)',
        },

        '&::after': {
          content: '""',
          position: 'absolute',

          width: 260,
          height: 260,

          borderRadius: '50%',

          top: -190,
          right: -110,

          background:
            'radial-gradient(circle, rgba(236,72,153,.07), transparent 70%)',

          pointerEvents: 'none',
        },
      }}
    >
      {/* =========================
          HEADER
      ========================== */}

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          mb: {
            xs: 2.5,
            md: 3,
          },
        }}
      >
        <Stack
          direction="row"
         
         
          spacing={2} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Stack
            direction="row"
           
            spacing={1.4} sx={{ alignItems: 'center' }}>
            {/* Step */}
            <Box
              sx={{
                width: {
                  xs: 42,
                  sm: 46,
                },

                height: {
                  xs: 42,
                  sm: 46,
                },

                flexShrink: 0,

                borderRadius: '14px',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                bgcolor: 'var(--pv-band)',
                color: '#fff',

                boxShadow:
                  '0 9px 22px rgba(0,0,0,0.13)',
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.72rem',
                  fontWeight: 900,
                  letterSpacing: '0.04em',
                }}
              >
                01
              </Typography>
            </Box>

            <Box>
              <Stack
                direction="row"
               
                spacing={0.8}
                sx={{ alignItems: 'center',  mb: 0.45 }}
              >
                <LocalShippingOutlined
                  sx={{
                    fontSize: 17,
                    color: '#ec4899',
                  }}
                />

                <Typography
                  sx={{
                    fontSize: {
                      xs: '0.98rem',
                      sm: '1.08rem',
                    },

                    fontWeight: 850,
                    color: 'var(--pv-ink)',

                    letterSpacing: '-0.025em',
                    lineHeight: 1.2,
                  }}
                >
                  Informations de livraison
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: {
                    xs: '0.7rem',
                    sm: '0.74rem',
                  },

                  fontWeight: 500,
                  color: '#969696',

                  lineHeight: 1.55,
                }}
              >
                Indiquez où nous devons livrer votre commande.
              </Typography>
            </Box>
          </Stack>

          {/* Status */}
          <Chip
            icon={
              <CheckCircleRounded
                sx={{
                  fontSize: '14px !important',
                }}
              />
            }
            label="Étape 1"
            size="small"
            sx={{
              display: {
                xs: 'none',
                sm: 'flex',
              },

              height: 27,

              borderRadius: '999px',

              bgcolor: 'var(--pv-success-soft)',
              color: 'var(--pv-success)',

              border:
                '1px solid rgba(21,128,61,.08)',

              fontSize: '0.65rem',
              fontWeight: 800,

              '& .MuiChip-icon': {
                color: '#22c55e',
              },

              '& .MuiChip-label': {
                px: 1,
              },
            }}
          />
        </Stack>
      </Box>

      <Divider
        sx={{
          position: 'relative',
          zIndex: 1,
          mb: {
            xs: 2.5,
            md: 3,
          },
          borderColor:
            'rgba(0,0,0,0.055)',
        }}
      />

      {/* =========================
          ADDRESS FORM
      ========================== */}

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <AddressForm
          data={address}
          setData={setAddress}
        />
      </Box>

      {/* =========================
          FOOTER INFO
      ========================== */}

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,

          mt: {
            xs: 2.5,
            md: 3,
          },

          p: {
            xs: 1.4,
            sm: 1.6,
          },

          borderRadius: '15px',

          display: 'flex',
          alignItems: 'flex-start',
          gap: 1.2,

          bgcolor: 'var(--pv-canvas)',

          border:
            '1px solid var(--pv-line)',
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 30,
            flexShrink: 0,

            borderRadius: '9px',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            bgcolor: 'var(--pv-accent-soft)',
            color: '#db2777',
          }}
        >
          <VerifiedUserOutlined
            sx={{ fontSize: 16 }}
          />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 800,
              color: 'var(--pv-body)',
              lineHeight: 1.4,
            }}
          >
            Vos informations sont protégées
          </Typography>

          <Typography
            sx={{
              mt: 0.25,
              fontSize: '0.65rem',
              fontWeight: 500,
              color: 'var(--pv-muted)',
              lineHeight: 1.55,
            }}
          >
            Vos informations de livraison sont utilisées
            uniquement pour traiter et livrer votre commande.
          </Typography>
        </Box>
      </Box>

      <style>
        {`
          @keyframes checkoutFormEnter {
            from {
              opacity: 0;
              transform: translateY(10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}
      </style>
    </Paper>
  );
}

export default CheckoutForm;