import React from 'react';

import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined';
import VerifiedOutlined from '@mui/icons-material/VerifiedOutlined';

import formatCurrency from '../../utils/formatCurrency';

function OrderSummary({
  items = [],
  /* `subtotal` est accepté comme alias : un appelant qui se trompe de nom
     doit afficher le bon montant plutôt qu'un silencieux 0. */
  subtotal,
  total = 0,
}) {
  const amount = Number(total) > 0 ? Number(total) : Number(subtotal || 0);


  return (
    <Paper
      elevation={0}
      sx={{
        position: 'relative',
        width: '100%',

        borderRadius: {
          xs: '22px',
          md: '26px',
        },

        bgcolor: 'var(--pv-surface)',

        border:
          '1px solid var(--pv-line)',

        boxShadow:
          '0 16px 50px rgba(0,0,0,0.055)',

        overflow: 'hidden',

        animation:
          'orderSummaryEnter .45s ease both',

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
      }}
    >
      {/* En-tete rendu par la page Checkout : pas de doublon ici. */}

      <Divider
        sx={{
          borderColor:
            'rgba(0,0,0,0.055)',
        }}
      />

      {/* =========================
          PRODUCTS
      ========================== */}

      <Box
        sx={{
          p: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },

          pt: {
            xs: 1.5,
            md: 2,
          },
        }}
      >
        <Stack
          spacing={{
            xs: 1.3,
            sm: 1.5,
          }}
        >
          {items.map((item, index) => {
            const itemTotal =
              Number(item.price || 0) *
              Number(item.quantity || 0);

            const image =
              item.image ||
              item.images?.[0];

            return (
              <Box
                key={item.id || index}
                sx={{
                  p: {
                    xs: 1,
                    sm: 1.2,
                  },

                  borderRadius: '15px',

                  bgcolor: 'var(--pv-canvas)',

                  border:
                    '1px solid var(--pv-line)',

                  transition:
                    'transform .2s ease, border-color .2s ease, background .2s ease',

                  '&:hover': {
                    transform: 'translateY(-1px)',
                    bgcolor: 'var(--pv-surface)',
                    borderColor:
                      'rgba(236,72,153,0.12)',
                  },

                  animation:
                    'orderItemEnter .4s ease both',

                  animationDelay: `${Math.min(
                    index * 70,
                    350
                  )}ms`,
                }}
              >
                <Stack
                  direction="row"
                 
                  spacing={{
                    xs: 1.1,
                    sm: 1.4,
                  }} sx={{ alignItems: 'center' }}>
                  {/* Product image */}
                  <Box
                    sx={{
                      width: {
                        xs: 58,
                        sm: 64,
                      },

                      height: {
                        xs: 68,
                        sm: 76,
                      },

                      flexShrink: 0,

                      borderRadius: '12px',

                      overflow: 'hidden',

                      bgcolor: 'var(--pv-line)',

                      border:
                        '1px solid var(--pv-line)',
                    }}
                  >
                    {image ? (
                      <Box
                        component="img"
                        src={image}
                        alt={item.name || 'Produit'}
                        loading="lazy"
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'block',
                          objectFit: 'cover',

                          transition:
                            'transform .4s ease',

                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                    ) : (
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',

                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',

                          color: 'var(--pv-muted)',
                        }}
                      >
                        <ShoppingBagOutlined
                          sx={{ fontSize: 22 }}
                        />
                      </Box>
                    )}
                  </Box>

                  {/* Product info */}
                  <Box
                    sx={{
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: '0.76rem',
                          sm: '0.8rem',
                        },

                        fontWeight: 750,
                        color: '#252525',

                        lineHeight: 1.35,

                        display:
                          '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient:
                          'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {item.name || 'Produit'}
                    </Typography>

                    <Stack
                      direction="row"
                     
                      spacing={0.8}
                      sx={{ alignItems: 'center', 
                        mt: 0.65,
                      }}
                    >
                      <Box
                        sx={{
                          px: 0.75,
                          py: 0.35,

                          borderRadius: '6px',

                          bgcolor: 'var(--pv-surface)',

                          border:
                            '1px solid var(--pv-line)',

                          fontSize: '0.6rem',
                          fontWeight: 750,
                          color: 'var(--pv-muted)',
                        }}
                      >
                        × {item.quantity}
                      </Box>

                      <Typography
                        sx={{
                          fontSize: '0.64rem',
                          color: 'var(--pv-muted)',
                          fontWeight: 550,
                        }}
                      >
                        {formatCurrency(
                          Number(item.price || 0)
                        )} / unité
                      </Typography>
                    </Stack>
                  </Box>

                  {/* Item price */}
                  <Typography
                    sx={{
                      flexShrink: 0,

                      fontSize: {
                        xs: '0.76rem',
                        sm: '0.82rem',
                      },

                      fontWeight: 850,
                      color: 'var(--pv-ink)',

                      whiteSpace: 'nowrap',
                    }}
                  >
                    {formatCurrency(itemTotal)}
                  </Typography>
                </Stack>
              </Box>
            );
          })}
        </Stack>
      </Box>

      {/* =========================
          TOTALS
      ========================== */}

      <Box
        sx={{
          px: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },

          pb: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },
        }}
      >
        <Box
          sx={{
            p: {
              xs: 1.5,
              sm: 1.8,
            },

            borderRadius: '16px',

            bgcolor: 'var(--pv-canvas)',

            border:
              '1px solid var(--pv-line)',
          }}
        >
          {/* Subtotal */}
          <Stack
            direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography
              sx={{
                fontSize: '0.76rem',
                color: 'var(--pv-muted)',
                fontWeight: 600,
              }}
            >
              Sous-total
            </Typography>

            <Typography
              sx={{
                fontSize: '0.78rem',
                color: 'var(--pv-body)',
                fontWeight: 700,
              }}
            >
              {formatCurrency(amount)}
            </Typography>
          </Stack>

          {/* Shipping */}
          <Stack
            direction="row"
           
           
            sx={{ alignItems: 'center', justifyContent: 'space-between', 
              mt: 1.2,
            }}
          >
            <Stack
              direction="row"
             
              spacing={0.7} sx={{ alignItems: 'center' }}>
              <LocalShippingOutlined
                sx={{
                  fontSize: 16,
                  color: 'var(--pv-muted)',
                }}
              />

              <Typography
                sx={{
                  fontSize: '0.76rem',
                  color: 'var(--pv-muted)',
                  fontWeight: 600,
                }}
              >
                Livraison
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: '0.72rem',
                color: 'var(--pv-success)',
                fontWeight: 850,
              }}
            >
              GRATUITE
            </Typography>
          </Stack>

          <Divider
            sx={{
              my: 1.6,
              borderColor:
                'rgba(0,0,0,0.055)',
            }}
          />

          {/* Total */}
          <Stack
            direction="row"
           
           
            spacing={2} sx={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: '0.88rem',
                    sm: '0.92rem',
                  },

                  fontWeight: 850,
                  color: 'var(--pv-ink)',

                  letterSpacing: '-0.02em',
                }}
              >
                Total à payer
              </Typography>

              <Typography
                sx={{
                  mt: 0.3,

                  fontSize: '0.62rem',
                  color: 'var(--pv-muted)',
                  fontWeight: 550,
                }}
              >
                Taxes et livraison incluses
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: {
                  xs: '1.25rem',
                  sm: '1.4rem',
                  md: '1.5rem',
                },

                fontWeight: 950,

                color: '#ec4899',

                letterSpacing: '-0.04em',

                whiteSpace: 'nowrap',
              }}
            >
              {formatCurrency(amount)}
            </Typography>
          </Stack>
        </Box>

        {/* Secure payment */}
        <Stack
          direction="row"
         
         
          spacing={0.8}
          sx={{ alignItems: 'center', justifyContent: 'center', 
            mt: 1.8,
          }}
        >
          <VerifiedOutlined
            sx={{
              fontSize: 15,
              color: '#22c55e',
            }}
          />

          <Typography
            sx={{
              fontSize: '0.65rem',
              fontWeight: 650,
              color: 'var(--pv-muted)',
            }}
          >
            Paiement sécurisé avec Pivot Store
          </Typography>
        </Stack>
      </Box>

      <style>
        {`
          @keyframes orderSummaryEnter {
            from {
              opacity: 0;
              transform: translateY(10px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes orderItemEnter {
            from {
              opacity: 0;
              transform: translateX(8px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
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

export default OrderSummary;