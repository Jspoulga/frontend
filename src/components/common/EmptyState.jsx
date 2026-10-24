import React from 'react';

import {
  Box,
  Typography,
} from '@mui/material';

import InboxOutlined from '@mui/icons-material/InboxOutlined';

function EmptyState({
  title = 'Aucun élément',
  description = 'Il n’y a rien à afficher.',
  icon,
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        py: {
          xs: 7,
          sm: 9,
          md: 11,
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
          '1px solid var(--pv-line)',

        boxShadow:
          '0 14px 45px rgba(0,0,0,0.035)',

        overflow: 'hidden',

        animation:
          'emptyStateEnter .45s ease both',

        '&::before': {
          content: '""',
          position: 'absolute',
          width: 280,
          height: 280,
          borderRadius: '50%',
          top: -180,
          right: -100,
          background:
            'radial-gradient(circle, rgba(236,72,153,.09), transparent 70%)',
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
            'radial-gradient(circle, rgba(168,85,247,.065), transparent 70%)',
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

          bgcolor: 'var(--pv-surface-alt)',

          border:
            '1px solid var(--pv-line)',

          boxShadow:
            '0 12px 30px rgba(0,0,0,0.05)',

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
              '1px solid rgba(236,72,153,0.08)',
            pointerEvents: 'none',
          },
        }}
      >
        {icon || (
          <InboxOutlined
            sx={{
              fontSize: {
                xs: 30,
                sm: 34,
              },
              color: '#ec4899',
            }}
          />
        )}
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
        {title}
      </Typography>

      {/* Description */}
      <Typography
        component="p"
        sx={{
          position: 'relative',
          zIndex: 1,

          maxWidth: {
            xs: 320,
            sm: 430,
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
        {description}
      </Typography>

      <style>
        {`
          @keyframes emptyStateEnter {
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

export default EmptyState;