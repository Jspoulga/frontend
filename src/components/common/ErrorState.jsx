import React from 'react';

import {
  Alert,
  Box,
  Button,
  Typography,
} from '@mui/material';

import ErrorOutlineRounded from '@mui/icons-material/ErrorOutlineRounded';
import RefreshRounded from '@mui/icons-material/RefreshRounded';

function ErrorState({
  message = 'Une erreur est survenue.',
  onRetry,
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        py: {
          xs: 6,
          sm: 8,
          md: 10,
        },
        px: {
          xs: 2,
          sm: 4,
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',

        borderRadius: {
          xs: '22px',
          md: '28px',
        },

        bgcolor: 'var(--pv-surface)',

        border:
          '1px solid rgba(239,68,68,0.10)',

        boxShadow:
          '0 14px 45px rgba(0,0,0,0.035)',

        overflow: 'hidden',

        animation:
          'errorStateEnter .45s ease both',

        '&::before': {
          content: '""',
          position: 'absolute',
          width: 280,
          height: 280,
          borderRadius: '50%',
          top: -180,
          right: -100,
          background:
            'radial-gradient(circle, rgba(239,68,68,.075), transparent 70%)',
          pointerEvents: 'none',
        },

        '&::after': {
          content: '""',
          position: 'absolute',
          width: 230,
          height: 230,
          borderRadius: '50%',
          bottom: -160,
          left: -100,
          background:
            'radial-gradient(circle, rgba(236,72,153,.045), transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,

          width: {
            xs: 68,
            sm: 76,
          },

          height: {
            xs: 68,
            sm: 76,
          },

          borderRadius: {
            xs: '21px',
            sm: '23px',
          },

          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          bgcolor: '#fff5f5',

          border:
            '1px solid rgba(239,68,68,0.10)',

          boxShadow:
            '0 12px 30px rgba(239,68,68,0.07)',

          mb: {
            xs: 2.5,
            md: 3,
          },

          '&::after': {
            content: '""',
            position: 'absolute',
            inset: -6,
            borderRadius: '27px',
            border:
              '1px solid rgba(239,68,68,0.055)',
            pointerEvents: 'none',
          },
        }}
      >
        <ErrorOutlineRounded
          sx={{
            fontSize: {
              xs: 31,
              sm: 35,
            },
            color: '#ef4444',
          }}
        />
      </Box>

      {/* Title */}
      <Typography
        component="h3"
        sx={{
          position: 'relative',
          zIndex: 1,

          fontSize: {
            xs: '1.05rem',
            sm: '1.15rem',
            md: '1.25rem',
          },

          fontWeight: 850,
          color: 'var(--pv-ink)',

          letterSpacing: '-0.025em',
          lineHeight: 1.25,

          mb: 0.8,
        }}
      >
        Impossible de charger les données
      </Typography>

      {/* Message */}
      <Typography
        component="p"
        sx={{
          position: 'relative',
          zIndex: 1,

          maxWidth: {
            xs: 330,
            sm: 460,
          },

          m: 0,

          fontSize: {
            xs: '0.78rem',
            sm: '0.84rem',
          },

          lineHeight: 1.7,
          fontWeight: 500,
          color: 'var(--pv-muted)',
        }}
      >
        {message}
      </Typography>

      {/* Alert technique */}
      <Alert
        severity="error"
        icon={
          <ErrorOutlineRounded
            sx={{
              fontSize: 18,
            }}
          />
        }
        sx={{
          position: 'relative',
          zIndex: 1,

          width: '100%',
          maxWidth: 520,

          mt: 3,

          borderRadius: '14px',

          bgcolor: '#fff7f7',

          border:
            '1px solid rgba(239,68,68,0.10)',

          color: '#991b1b',

          '& .MuiAlert-icon': {
            color: '#ef4444',
            py: 0.2,
          },

          '& .MuiAlert-message': {
            width: '100%',
            fontSize: '0.74rem',
            fontWeight: 600,
            lineHeight: 1.5,
          },
        }}
      >
        Vérifiez votre connexion puis réessayez.
      </Alert>

      {/* Retry */}
      {typeof onRetry === 'function' && (
        <Button
          variant="contained"
          onClick={onRetry}
          startIcon={
            <RefreshRounded
              sx={{
                fontSize: '18px !important',
              }}
            />
          }
          sx={{
            position: 'relative',
            zIndex: 1,

            mt: 2.5,

            minHeight: 46,
            px: 2.2,

            borderRadius: '13px',

            bgcolor: 'var(--pv-band)',
            color: '#fff',

            textTransform: 'none',

            fontSize: '0.78rem',
            fontWeight: 800,

            boxShadow:
              '0 8px 22px rgba(0,0,0,0.12)',

            transition:
              'transform .2s ease, background .2s ease, box-shadow .2s ease',

            '&:hover': {
              bgcolor: '#ec4899',
              boxShadow:
                '0 10px 26px rgba(236,72,153,.22)',
              transform: 'translateY(-1px)',
            },
          }}
        >
          Réessayer
        </Button>
      )}

      <style>
        {`
          @keyframes errorStateEnter {
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
    </Box>
  );
}

export default ErrorState;