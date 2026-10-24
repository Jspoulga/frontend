import React from 'react';

import {
  Box,
  Stack,
  Typography,
} from '@mui/material';

import AutoAwesomeRounded from '@mui/icons-material/AutoAwesomeRounded';

function PageHeader({
  title,
  subtitle,
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        mb: {
          xs: 3,
          sm: 3.5,
          md: 4.5,
        },

        animation:
          'pageHeaderEnter .45s ease both',
      }}
    >
      {/* Decorative glow */}
      <Box
        sx={{
          position: 'absolute',
          width: {
            xs: 150,
            md: 220,
          },
          height: {
            xs: 150,
            md: 220,
          },
          borderRadius: '50%',

          top: -90,
          right: {
            xs: -80,
            md: 20,
          },

          background:
            'radial-gradient(circle, rgba(236,72,153,.075), transparent 70%)',

          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Eyebrow */}
        <Stack
          direction="row"
         
          spacing={0.8}
          sx={{ alignItems: 'center', 
            mb: 1.1,
          }}
        >
          <Box
            sx={{
              width: 27,
              height: 27,
              borderRadius: '9px',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              bgcolor: 'var(--pv-accent-soft)',
              color: '#db2777',

              border:
                '1px solid rgba(236,72,153,.10)',
            }}
          >
            <AutoAwesomeRounded
              sx={{
                fontSize: 14,
              }}
            />
          </Box>

          <Typography
            component="span"
            sx={{
              fontSize: {
                xs: '0.62rem',
                sm: '0.66rem',
              },

              fontWeight: 850,
              color: '#db2777',

              textTransform: 'uppercase',
              letterSpacing: '0.11em',
              lineHeight: 1,
            }}
          >
            PIVOT STORE
          </Typography>

          <Box
            sx={{
              width: 22,
              height: 1,
              bgcolor: 'rgba(236,72,153,.25)',
            }}
          />
        </Stack>

        {/* Title */}
        <Typography
          component="h1"
          sx={{
            m: 0,

            fontSize: {
              xs: '1.7rem',
              sm: '2rem',
              md: '2.45rem',
              lg: '2.7rem',
            },

            fontWeight: 900,
            color: 'var(--pv-ink)',

            letterSpacing: '-0.045em',
            lineHeight: 1.08,

            maxWidth: {
              xs: '100%',
              md: 850,
            },
          }}
        >
          {title}
        </Typography>

        {/* Subtitle */}
        {subtitle && (
          <Typography
            component="p"
            sx={{
              m: 0,
              mt: {
                xs: 1,
                sm: 1.2,
              },

              maxWidth: {
                xs: '100%',
                sm: 620,
                md: 720,
              },

              fontSize: {
                xs: '0.8rem',
                sm: '0.86rem',
                md: '0.92rem',
              },

              lineHeight: 1.7,
              fontWeight: 500,

              color: 'var(--pv-muted)',
            }}
          >
            {subtitle}
          </Typography>
        )}

        {/* Accent line */}
        <Box
          sx={{
            mt: {
              xs: 2.2,
              md: 2.8,
            },

            width: {
              xs: 42,
              sm: 52,
            },

            height: 3,
            borderRadius: '999px',

            background:
              'linear-gradient(90deg, #ec4899, #a855f7)',

            boxShadow:
              '0 4px 14px rgba(236,72,153,.16)',
          }}
        />
      </Box>

      <style>
        {`
          @keyframes pageHeaderEnter {
            from {
              opacity: 0;
              transform: translateY(8px);
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

export default PageHeader;