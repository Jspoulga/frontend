import React from 'react';

import {
  Box,
  Button,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import {
  CloseRounded,
  ShoppingBagOutlined,
  ArrowForwardRounded,
  LocalShippingOutlined,
  ShieldOutlined,
  ArrowBackRounded,
} from '@mui/icons-material';

import {
  Link,
} from 'react-router-dom';

import useCart from '../../hooks/useCart';
import CartItem from './CartItem';
import formatCurrency from '../../utils/formatCurrency';

function CartDrawer({
  open,
  onClose,
}) {
  const {
    items = [],
    totalPrice = 0,
  } = useCart();

  const itemCount = items.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  const hasItems = items.length > 0;

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
        {
        sx: {
          width: {
            xs: '100vw',
            sm: 440,
            md: 470,
          },

          maxWidth: '100vw',

          bgcolor: 'var(--pv-surface-alt)',

          boxShadow:
            '-18px 0 60px rgba(0,0,0,0.14)',

          overflow: 'hidden',
        },
      }
        },
        backdrop: {
          sx: {
            bgcolor: 'rgba(10,10,10,0.48)',
            backdropFilter: 'blur(5px)',
          },
        },
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',

          position: 'relative',

          animation:
            'cartDrawerEnter .35s ease both',
        }}
      >
        {/* =========================
            HEADER
        ========================== */}

        <Box
          sx={{
            position: 'relative',
            flexShrink: 0,

            px: {
              xs: 2,
              sm: 2.5,
            },

            pt: {
              xs: 2,
              sm: 2.5,
            },

            pb: 2,

            bgcolor: 'var(--pv-surface)',

            borderBottom:
              '1px solid var(--pv-line)',

            overflow: 'hidden',

            '&::before': {
              content: '""',
              position: 'absolute',

              width: 230,
              height: 230,

              borderRadius: '50%',

              top: -170,
              right: -90,

              background:
                'radial-gradient(circle, rgba(236,72,153,.09), transparent 70%)',

              pointerEvents: 'none',
            },
          }}
        >
          <Stack
            direction="row"
           
           
            spacing={2}
            sx={{ alignItems: 'center', justifyContent: 'space-between', 
              position: 'relative',
              zIndex: 1,
            }}
          >
            <Stack
              direction="row"
             
              spacing={1.2} sx={{ alignItems: 'center' }}>
              <Box
                sx={{
                  width: 43,
                  height: 43,

                  flexShrink: 0,

                  borderRadius: '14px',

                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',

                  bgcolor: 'var(--pv-band)',
                  color: '#fff',

                  boxShadow:
                    '0 8px 20px rgba(0,0,0,0.14)',
                }}
              >
                <ShoppingBagOutlined
                  sx={{ fontSize: 21 }}
                />
              </Box>

              <Box>
                <Stack
                  direction="row"
                 
                  spacing={0.8} sx={{ alignItems: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '1rem',
                        sm: '1.08rem',
                      },

                      fontWeight: 900,
                      color: 'var(--pv-ink)',

                      letterSpacing: '-0.03em',
                    }}
                  >
                    Votre panier
                  </Typography>

                  {hasItems && (
                    <Chip
                      label={itemCount}
                      size="small"
                      sx={{
                        height: 22,
                        minWidth: 22,

                        borderRadius: '999px',

                        bgcolor: 'var(--pv-accent-soft)',
                        color: '#db2777',

                        fontSize: '0.62rem',
                        fontWeight: 850,

                        '& .MuiChip-label': {
                          px: 0.7,
                        },
                      }}
                    />
                  )}
                </Stack>

                <Typography
                  sx={{
                    mt: 0.25,

                    fontSize: '0.66rem',
                    color: 'var(--pv-muted)',
                    fontWeight: 550,
                  }}
                >
                  {hasItems
                    ? `${itemCount} ${
                        itemCount === 1
                          ? 'article'
                          : 'articles'
                      } sélectionné${
                        itemCount === 1 ? '' : 's'
                      }`
                    : 'Votre sélection Pivot Store'}
                </Typography>
              </Box>
            </Stack>

            <IconButton
              onClick={onClose}
              aria-label="Fermer le panier"
              sx={{
                width: 38,
                height: 38,

                borderRadius: '12px',

                bgcolor: 'var(--pv-surface-alt)',
                color: 'var(--pv-body)',

                border:
                  '1px solid var(--pv-line)',

                transition:
                  'background .2s ease, color .2s ease, transform .2s ease',

                '&:hover': {
                  bgcolor: 'var(--pv-band)',
                  color: '#fff',
                  transform: 'rotate(4deg)',
                },
              }}
            >
              <CloseRounded
                sx={{ fontSize: 19 }}
              />
            </IconButton>
          </Stack>
        </Box>

        {/* =========================
            CONTENT
        ========================== */}

        <Box
          sx={{
            flex: 1,
            minHeight: 0,

            overflowY: 'auto',
            overflowX: 'hidden',

            px: {
              xs: 1.5,
              sm: 2,
            },

            py: {
              xs: 1.5,
              sm: 2,
            },

            scrollbarWidth: 'thin',

            '&::-webkit-scrollbar': {
              width: 5,
            },

            '&::-webkit-scrollbar-thumb': {
              bgcolor: 'rgba(0,0,0,0.12)',
              borderRadius: 999,
            },
          }}
        >
          {!hasItems ? (
            /* =========================
               EMPTY CART
            ========================== */

            <Box
              sx={{
                minHeight: '100%',

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                py: 5,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 350,

                  p: {
                    xs: 2.5,
                    sm: 3,
                  },

                  borderRadius: '24px',

                  bgcolor: 'var(--pv-surface)',

                  border:
                    '1px solid var(--pv-line)',

                  boxShadow:
                    '0 15px 45px rgba(0,0,0,0.045)',

                  textAlign: 'center',

                  position: 'relative',
                  overflow: 'hidden',

                  animation:
                    'emptyCartEnter .4s ease both',

                  '&::before': {
                    content: '""',
                    position: 'absolute',

                    width: 220,
                    height: 220,

                    borderRadius: '50%',

                    top: -150,
                    right: -100,

                    background:
                      'radial-gradient(circle, rgba(236,72,153,.09), transparent 70%)',

                    pointerEvents: 'none',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    zIndex: 1,

                    width: 74,
                    height: 74,

                    mx: 'auto',
                    mb: 2.5,

                    borderRadius: '23px',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    bgcolor: 'var(--pv-surface-alt)',

                    border:
                      '1px solid var(--pv-line)',

                    boxShadow:
                      '0 12px 30px rgba(0,0,0,0.055)',

                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      inset: -6,

                      borderRadius: '28px',

                      border:
                        '1px solid rgba(236,72,153,.07)',
                    },
                  }}
                >
                  <ShoppingBagOutlined
                    sx={{
                      fontSize: 32,
                      color: '#ec4899',
                    }}
                  />
                </Box>

                <Typography
                  sx={{
                    position: 'relative',
                    zIndex: 1,

                    fontSize: '1.1rem',
                    fontWeight: 900,

                    color: 'var(--pv-ink)',

                    letterSpacing: '-0.025em',
                  }}
                >
                  Votre panier est vide
                </Typography>

                <Typography
                  sx={{
                    position: 'relative',
                    zIndex: 1,

                    mt: 0.8,

                    fontSize: '0.76rem',
                    lineHeight: 1.65,

                    color: '#8d8d8d',
                    fontWeight: 500,
                  }}
                >
                  Découvrez notre collection et ajoutez
                  vos pièces préférées à votre panier.
                </Typography>

                <Button
                  component={Link}
                  to="/shop"
                  onClick={onClose}
                  variant="contained"
                  endIcon={
                    <ArrowForwardRounded
                      sx={{
                        fontSize:
                          '18px !important',
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

                    fontSize: '0.77rem',
                    fontWeight: 800,

                    boxShadow:
                      '0 9px 24px rgba(0,0,0,0.13)',

                    '&:hover': {
                      bgcolor: '#ec4899',

                      boxShadow:
                        '0 11px 28px rgba(236,72,153,.22)',

                      transform:
                        'translateY(-1px)',
                    },

                    transition:
                      'transform .2s ease, background .2s ease, box-shadow .2s ease',
                  }}
                >
                  Découvrir la collection
                </Button>
              </Box>
            </Box>
          ) : (
            /* =========================
               CART ITEMS
            ========================== */

            <Stack spacing={1.2}>
              {items.map((item, index) => (
                <Box
                  key={item.id}
                  sx={{
                    p: {
                      xs: 0.8,
                      sm: 1,
                    },

                    borderRadius: '17px',

                    bgcolor: 'var(--pv-surface)',

                    border:
                      '1px solid var(--pv-line)',

                    boxShadow:
                      '0 5px 18px rgba(0,0,0,0.025)',

                    animation:
                      'cartItemEnter .4s ease both',

                    animationDelay: `${Math.min(
                      index * 60,
                      300
                    )}ms`,

                    transition:
                      'border-color .2s ease, box-shadow .2s ease',

                    '&:hover': {
                      borderColor:
                        'rgba(236,72,153,.13)',

                      boxShadow:
                        '0 8px 24px rgba(0,0,0,0.045)',
                    },
                  }}
                >
                  <CartItem item={item} />
                </Box>
              ))}

              {/* Continue shopping */}
              <Button
                component={Link}
                to="/shop"
                onClick={onClose}
                startIcon={
                  <ArrowBackRounded
                    sx={{
                      fontSize:
                        '17px !important',
                    }}
                  />
                }
                sx={{
                  alignSelf: 'flex-start',

                  mt: 0.5,

                  minHeight: 38,
                  px: 1.2,

                  borderRadius: '11px',

                  color: 'var(--pv-muted)',
                  bgcolor: 'transparent',

                  textTransform: 'none',

                  fontSize: '0.7rem',
                  fontWeight: 700,

                  '&:hover': {
                    bgcolor: 'var(--pv-surface)',
                    color: '#ec4899',
                  },
                }}
              >
                Continuer mes achats
              </Button>
            </Stack>
          )}
        </Box>

        {/* =========================
            BOTTOM SUMMARY
        ========================== */}

        {hasItems && (
          <Box
            sx={{
              position: 'relative',
              flexShrink: 0,

              bgcolor: 'var(--pv-surface)',

              borderTop:
                '1px solid var(--pv-line)',

              px: {
                xs: 2,
                sm: 2.5,
              },

              pt: 2,

              pb: {
                xs: 2,
                sm: 2.5,
              },

              boxShadow:
                '0 -12px 35px rgba(0,0,0,0.055)',

              '&::before': {
                content: '""',
                position: 'absolute',

                width: 180,
                height: 180,

                borderRadius: '50%',

                right: -100,
                bottom: -140,

                background:
                  'radial-gradient(circle, rgba(236,72,153,.06), transparent 70%)',

                pointerEvents: 'none',
              },
            }}
          >
            {/* Delivery */}
            <Stack
              direction="row"
             
             
              sx={{ alignItems: 'center', justifyContent: 'space-between', 
                position: 'relative',
                zIndex: 1,

                mb: 1.5,

                p: 1.2,

                borderRadius: '13px',

                bgcolor: '#f8faf9',

                border:
                  '1px solid rgba(34,197,94,.08)',
              }}
            >
              <Stack
                direction="row"
               
                spacing={0.9} sx={{ alignItems: 'center' }}>
                <LocalShippingOutlined
                  sx={{
                    fontSize: 17,
                    color: 'var(--pv-success)',
                  }}
                />

                <Typography
                  sx={{
                    fontSize: '0.68rem',
                    fontWeight: 650,
                    color: 'var(--pv-body)',
                  }}
                >
                  Livraison
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: '0.67rem',
                  fontWeight: 850,
                  color: 'var(--pv-success)',
                }}
              >
                GRATUITE
              </Typography>
            </Stack>

            <Divider
              sx={{
                position: 'relative',
                zIndex: 1,

                mb: 1.7,

                borderColor:
                  'rgba(0,0,0,0.055)',
              }}
            />

            {/* Total */}
            <Stack
              direction="row"
             
             
              spacing={2}
              sx={{ alignItems: 'flex-end', justifyContent: 'space-between', 
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    color: 'var(--pv-muted)',
                  }}
                >
                  Total
                </Typography>

                <Typography
                  sx={{
                    mt: 0.2,

                    fontSize: {
                      xs: '1rem',
                      sm: '1.05rem',
                    },

                    fontWeight: 900,
                    color: 'var(--pv-ink)',

                    letterSpacing: '-0.025em',
                  }}
                >
                  {itemCount}{' '}
                  {itemCount === 1
                    ? 'article'
                    : 'articles'}
                </Typography>
              </Box>

              <Typography
                sx={{
                  fontSize: {
                    xs: '1.25rem',
                    sm: '1.4rem',
                  },

                  fontWeight: 950,

                  color: '#ec4899',

                  letterSpacing: '-0.04em',

                  whiteSpace: 'nowrap',
                }}
              >
                {formatCurrency(totalPrice)}
              </Typography>
            </Stack>

            {/* CTA */}
            <Button
              component={Link}
              to="/cart"
              onClick={onClose}
              variant="contained"
              fullWidth
              endIcon={
                <ArrowForwardRounded
                  sx={{
                    fontSize:
                      '19px !important',
                  }}
                />
              }
              sx={{
                position: 'relative',
                zIndex: 1,

                mt: 1.8,

                minHeight: 52,

                borderRadius: '15px',

                bgcolor: 'var(--pv-band)',
                color: '#fff',

                textTransform: 'none',

                fontSize: '0.8rem',
                fontWeight: 850,

                boxShadow:
                  '0 10px 26px rgba(0,0,0,0.14)',

                transition:
                  'transform .2s ease, background .2s ease, box-shadow .2s ease',

                '&:hover': {
                  bgcolor: '#ec4899',

                  boxShadow:
                    '0 13px 30px rgba(236,72,153,.23)',

                  transform:
                    'translateY(-1px)',
                },
              }}
            >
              Voir mon panier
            </Button>

            {/* Security */}
            <Stack
              direction="row"
             
             
              spacing={0.7}
              sx={{ alignItems: 'center', justifyContent: 'center', 
                position: 'relative',
                zIndex: 1,

                mt: 1.3,
              }}
            >
              <ShieldOutlined
                sx={{
                  fontSize: 14,
                  color: '#22c55e',
                }}
              />

              <Typography
                sx={{
                  fontSize: '0.61rem',
                  fontWeight: 600,
                  color: 'var(--pv-muted)',
                }}
              >
                Paiement sécurisé · Pivot Store
              </Typography>
            </Stack>
          </Box>
        )}

        <style>
          {`
            @keyframes cartDrawerEnter {
              from {
                opacity: 0;
                transform: translateX(12px);
              }

              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes cartItemEnter {
              from {
                opacity: 0;
                transform: translateX(10px);
              }

              to {
                opacity: 1;
                transform: translateX(0);
              }
            }

            @keyframes emptyCartEnter {
              from {
                opacity: 0;
                transform: translateY(12px) scale(.98);
              }

              to {
                opacity: 1;
                transform: translateY(0) scale(1);
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
    </Drawer>
  );
}

export default CartDrawer;