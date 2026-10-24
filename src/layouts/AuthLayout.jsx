import React from 'react';

import {
  Box,
  Container,
  Typography,
} from '@mui/material';

import {
  CheckCircleRounded,
  LocalShippingRounded,
  SecurityRounded,
  ShoppingBagRounded,
} from '@mui/icons-material';

import { Outlet } from 'react-router-dom';


function AuthLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'var(--pv-surface-alt)',
        display: 'flex',
        overflow: 'hidden',
      }}
    >

      {/* =====================================================
          LEFT — BRANDING
      ====================================================== */}

      <Box
        sx={{
          display: {
            xs: 'none',
            lg: 'flex',
          },
          width: '45%',
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
          background:
            'linear-gradient(145deg, #050505 0%, #120c11 55%, #251020 100%)',
          flexDirection: 'column',
          justifyContent: 'space-between',
          p: {
            lg: 6,
            xl: 8,
          },
        }}
      >

        {/* Pink glow */}

        <Box
          sx={{
            position: 'absolute',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236,72,153,.28), transparent 68%)',
            top: -300,
            right: -250,
            animation:
              'authGlow 9s ease-in-out infinite',
          }}
        />

        {/* Purple glow */}

        <Box
          sx={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(168,85,247,.18), transparent 68%)',
            bottom: -250,
            left: -250,
            animation:
              'authGlow 11s ease-in-out infinite reverse',
          }}
        />

        {/* Grid */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.055,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
            maskImage:
              'linear-gradient(to bottom, black 0%, transparent 90%)',
          }}
        />

        {/* Content */}

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
        >

          {/* Logo */}

          <Typography
            component="div"
            sx={{
              fontSize: {
                lg: 30,
                xl: 34,
              },
              fontWeight: 950,
              letterSpacing: '-.06em',
              lineHeight: 1,
              mb: 10,
            }}
          >
            Pivot
            <Box
              component="span"
              sx={{
                color: '#ec4899',
              }}
            >
              Store
            </Box>
          </Typography>


          {/* Label */}

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: '.25em',
              color: '#f472b6',
              mb: 2,
            }}
          >
            BIENVENUE CHEZ PIVOT STORE
          </Typography>


          {/* Title */}

          <Typography
            sx={{
              fontSize: {
                lg: '3.6rem',
                xl: '4.8rem',
              },
              lineHeight: .95,
              fontWeight: 950,
              letterSpacing: '-.06em',
              maxWidth: 620,
              mb: 3,
            }}
          >
            Votre style.
            <br />
            Votre
            <Box
              component="span"
              sx={{
                color: '#ec4899',
              }}
            >
              {' '}signature.
            </Box>
          </Typography>


          <Typography
            sx={{
              maxWidth: 500,
              color: 'rgba(255,255,255,.62)',
              fontSize: {
                lg: 16,
                xl: 18,
              },
              lineHeight: 1.7,
            }}
          >
            Retrouvez vos pièces préférées, gérez vos
            commandes et profitez d'une expérience
            shopping pensée pour vous.
          </Typography>


          {/* Benefits */}

          <Box
            sx={{
              mt: 6,
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
              maxWidth: 540,
            }}
          >

            <AuthBenefit
              icon={<ShoppingBagRounded />}
              title="Collection exclusive"
              text="Des pièces pensées pour votre style."
            />

            <AuthBenefit
              icon={<LocalShippingRounded />}
              title="Livraison rapide"
              text="Recevez vos commandes simplement."
            />

            <AuthBenefit
              icon={<SecurityRounded />}
              title="Paiement sécurisé"
              text="Vos données restent protégées."
            />

            <AuthBenefit
              icon={<CheckCircleRounded />}
              title="Qualité garantie"
              text="Une expérience Pivot Store premium."
            />

          </Box>

        </Box>


        {/* Footer */}

        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
        >

          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255,255,255,.38)',
            }}
          >
            © {new Date().getFullYear()} Pivot Store.
            Tous droits réservés.
          </Typography>

        </Box>

      </Box>


      {/* =====================================================
          RIGHT — AUTH CONTENT
      ====================================================== */}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflowY: 'auto',
          py: {
            xs: 3,
            sm: 5,
            lg: 6,
          },
          px: {
            xs: 2,
            sm: 4,
            md: 6,
            lg: 7,
            xl: 10,
          },
        }}
      >

        {/* Mobile background glow */}

        <Box
          sx={{
            display: {
              xs: 'block',
              lg: 'none',
            },
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236,72,153,.12), transparent 70%)',
            top: -200,
            right: -180,
            pointerEvents: 'none',
          }}
        />


        <Container
          maxWidth="sm"
          sx={{
            position: 'relative',
            zIndex: 2,
            p: '0 !important',
          }}
        >

          {/* Mobile logo */}

          <Box
            sx={{
              display: {
                xs: 'flex',
                lg: 'none',
              },
              alignItems: 'center',
              justifyContent: 'center',
              mb: 4,
            }}
          >

            <Typography
              sx={{
                fontSize: 30,
                fontWeight: 950,
                letterSpacing: '-.06em',
              }}
            >
              Pivot
              <Box
                component="span"
                sx={{
                  color: '#ec4899',
                }}
              >
                Store
              </Box>
            </Typography>

          </Box>


          {/* Outlet */}

          <Box
            sx={{
              animation:
                'authEnter .55s ease both',

              /*
                Les pages Login/Register/Forgot Password
                peuvent garder leur propre Paper.
              */

              '& > *': {
                width: '100%',
              },
            }}
          >
            <Outlet />
          </Box>


          {/* Mobile footer */}

          <Typography
            variant="caption"
            sx={{
              display: {
                xs: 'block',
                lg: 'none',
              },
              textAlign: 'center',
              color: 'text.secondary',
              mt: 4,
            }}
          >
            © {new Date().getFullYear()} Pivot Store
          </Typography>

        </Container>

      </Box>


      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style>
        {`
          @keyframes authEnter {
            from {
              opacity: 0;
              transform: translateY(20px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes authGlow {
            0%, 100% {
              transform:
                translate3d(0, 0, 0)
                scale(1);
            }

            50% {
              transform:
                translate3d(25px, 20px, 0)
                scale(1.08);
            }
          }
        `}
      </style>

    </Box>
  );
}


/* =========================================================
   BENEFIT COMPONENT
========================================================= */

function AuthBenefit({
  icon,
  title,
  text,
}) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        background:
          'rgba(255,255,255,.045)',
        border:
          '1px solid rgba(255,255,255,.07)',
        backdropFilter: 'blur(10px)',
        transition: '.25s ease',

        '&:hover': {
          background:
            'rgba(255,255,255,.07)',
          transform: 'translateY(-3px)',
          borderColor:
            'rgba(236,72,153,.25)',
        },
      }}
    >

      <Box
        sx={{
          width: 38,
          height: 38,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor:
            'rgba(236,72,153,.12)',
          color: '#f472b6',
          mb: 1.5,
        }}
      >
        {React.cloneElement(icon, {
          sx: {
            fontSize: 19,
          },
        })}
      </Box>

      <Typography
        fontWeight={900}
        fontSize={14}
        mb={.4}
      >
        {title}
      </Typography>

      <Typography
        variant="caption"
        sx={{
          color:
            'rgba(255,255,255,.48)',
          lineHeight: 1.5,
        }}
      >
        {text}
      </Typography>

    </Box>
  );
}


export default AuthLayout;