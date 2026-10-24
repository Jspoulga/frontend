import React, { useState } from 'react';

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from '@mui/material';

import {
  ArrowBackRounded,
  ArrowForwardRounded,
  CheckCircleRounded,
  LocalShippingOutlined,
  SecurityOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material';

import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import useCart from '../../hooks/useCart';

import CartItem from '../../components/cart/CartItem';
import CartSummary from '../../components/cart/CartSummary';

import formatCurrency from '../../utils/formatCurrency';

function Cart() {
  const {
    items,
    totalPrice,
  } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentPhone, setPaymentPhone] = useState('');

  /*
   * ---------------------------------------------------------
   * EMPTY CART
   * ---------------------------------------------------------
   */

  if (items.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'var(--pv-surface-alt)',
          display: 'flex',
          alignItems: 'center',
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Paper
            elevation={0}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: 6,
              p: { xs: 3, sm: 6, md: 8 },
              textAlign: 'center',
              border: '1px solid var(--pv-line)',
              bgcolor: 'var(--pv-surface)',
              boxShadow: '0 25px 70px rgba(0,0,0,.07)',
            }}
          >
            {/* Background glow */}

            <Box
              sx={{
                position: 'absolute',
                width: 300,
                height: 300,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, rgba(236,72,153,.16), transparent 70%)',
                top: -180,
                right: -100,
                pointerEvents: 'none',
              }}
            />

            <Box
              sx={{
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  width: 90,
                  height: 90,
                  mx: 'auto',
                  mb: 3,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'var(--pv-band)',
                  color: '#fff',
                  boxShadow:
                    '0 15px 40px rgba(0,0,0,.16)',
                }}
              >
                <ShoppingBagOutlined
                  sx={{
                    fontSize: 38,
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 3,
                  color: '#ec4899',
                  mb: 1.5,
                }}
              >
                VOTRE PANIER
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 32,
                    sm: 44,
                  },
                  fontWeight: 950,
                  letterSpacing: '-1.5px',
                  mb: 1.5,
                }}
              >
                Votre panier est vide.
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  maxWidth: 480,
                  mx: 'auto',
                  lineHeight: 1.7,
                  mb: 4,
                }}
              >
                Ajoutez vos pièces préférées et préparez
                votre prochaine commande Pivot Store.
              </Typography>

              <Button
                component={Link}
                to="/shop"
                variant="contained"
                endIcon={<ArrowForwardRounded />}
                sx={{
                  px: 4,
                  py: 1.6,
                  borderRadius: 3,
                  bgcolor: 'var(--pv-band)',
                  textTransform: 'none',
                  fontWeight: 900,
                  fontSize: 14,

                  '&:hover': {
                    bgcolor: '#ec4899',
                    transform: 'translateY(-2px)',
                    boxShadow:
                      '0 15px 35px rgba(236,72,153,.25)',
                  },

                  transition: 'all .25s ease',
                }}
              >
                Découvrir la collection
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  }

  /*
   * ---------------------------------------------------------
   * CART
   * ---------------------------------------------------------
   */

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'var(--pv-surface-alt)',
        pb: { xs: 7, md: 10 },
      }}
    >
      {/* =====================================================
          HERO
      ====================================================== */}

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: 'var(--pv-band)',
          color: '#fff',
          py: { xs: 5, md: 7 },
          mb: { xs: 4, md: 6 },

          '&::before': {
            content: '""',
            position: 'absolute',
            width: 450,
            height: 450,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236,72,153,.25), transparent 70%)',
            right: -120,
            top: -280,
            animation: 'cartGlow 6s ease-in-out infinite',
          },

          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
            maskImage:
              'linear-gradient(to bottom, black, transparent)',
            pointerEvents: 'none',
          },

          '@keyframes cartGlow': {
            '0%, 100%': {
              transform: 'translate(0, 0) scale(1)',
            },
            '50%': {
              transform: 'translate(-25px, 25px) scale(1.1)',
            },
          },
        }}
      >
        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Back */}

          <Button
            component={Link}
            to="/shop"
            startIcon={<ArrowBackRounded />}
            sx={{
              color: 'rgba(255,255,255,.65)',
              mb: 3,
              px: 0,
              textTransform: 'none',
              fontWeight: 700,

              '&:hover': {
                color: '#fff',
                bgcolor: 'transparent',
              },
            }}
          >
            Continuer mes achats
          </Button>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
           
           
            gap={3} sx={{ alignItems: { xs: 'flex-start', md: 'flex-end' }, justifyContent: 'space-between' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 900,
                  letterSpacing: 3,
                  color: '#f472b6',
                  mb: 1.5,
                }}
              >
                PIVOT STORE CHECKOUT
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 38,
                    sm: 48,
                    md: 58,
                  },
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: '-2px',
                }}
              >
                Mon panier
                <Box
                  component="span"
                  sx={{
                    color: '#f472b6',
                    ml: 1.5,
                  }}
                >
                  .
                </Box>
              </Typography>

              <Typography
                sx={{
                  mt: 2,
                  color: 'rgba(255,255,255,.58)',
                  fontSize: 15,
                }}
              >
                {items.length}{' '}
                {items.length > 1
                  ? 'articles sélectionnés'
                  : 'article sélectionné'}
              </Typography>
            </Box>

            {/* Cart counter */}

            <Paper
              elevation={0}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.3,
                borderRadius: 3,
                bgcolor: 'rgba(255,255,255,.07)',
                border:
                  '1px solid rgba(255,255,255,.1)',
                backdropFilter: 'blur(20px)',
                color: '#fff',
              }}
            >
              <ShoppingBagOutlined
                sx={{
                  color: '#f472b6',
                }}
              />

              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                {items.length}{' '}
                {items.length > 1
                  ? 'articles'
                  : 'article'}
              </Typography>
            </Paper>
          </Stack>
        </Container>
      </Box>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 1fr) 390px',
            },
            gap: { xs: 3, md: 4 },
            alignItems: 'start',
          }}
        >
          {/* =================================================
              PRODUCTS
          ================================================== */}

          <Box>
            {/* Section header */}

            <Stack
              direction="row"
             
             
              sx={{ alignItems: 'center', justifyContent: 'space-between', 
                mb: 2,
              }}
            >
              <Box>
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 950,
                    letterSpacing: '-.5px',
                  }}
                >
                  Vos articles
                </Typography>

                <Typography
                  sx={{
                    mt: .4,
                    fontSize: 13,
                    color: 'text.secondary',
                  }}
                >
                  Vérifiez vos choix avant de commander.
                </Typography>
              </Box>

              <Chip
                label={`${items.length} article${items.length > 1 ? 's' : ''}`}
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  fontWeight: 800,
                  bgcolor: 'var(--pv-surface)',
                  border: '1px solid var(--pv-line)',
                }}
              />
            </Stack>

            {/* Items */}

            <Stack spacing={2}>
              {/*
                `AnimatePresence` permet d'animer la sortie : un article
                retiré s'efface et laisse les suivants remonter, au lieu
                de disparaître d'un coup. `layout` s'occupe du
                repositionnement.
              */}
              <AnimatePresence initial={false}>
                {items.map((item, index) => (
                  <Box
                    key={`${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -24, height: 0, marginBottom: 0 }}
                    transition={{
                      duration: 0.34,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    sx={{ '& > *': { borderRadius: '20px' } }}
                  >
                    <CartItem item={item} />
                  </Box>
                ))}
              </AnimatePresence>
            </Stack>

            {/* Continue shopping */}

            <Paper
              elevation={0}
              sx={{
                mt: 3,
                p: 2,
                borderRadius: 4,
                border: '1px solid var(--pv-line)',
                bgcolor: 'var(--pv-surface)',
              }}
            >
              <Button
                component={Link}
                to="/shop"
                startIcon={<ArrowBackRounded />}
                sx={{
                  color: 'var(--pv-ink)',
                  textTransform: 'none',
                  fontWeight: 850,

                  '&:hover': {
                    color: '#ec4899',
                    bgcolor: 'transparent',
                  },
                }}
              >
                Continuer mes achats
              </Button>
            </Paper>

            {/* =================================================
                BENEFITS
            ================================================== */}

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(3, 1fr)',
                },
                gap: 2,
                mt: 3,
              }}
            >
              {/* Delivery */}

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 4,
                  border: '1px solid var(--pv-line)',
                  bgcolor: 'var(--pv-surface)',
                }}
              >
                <LocalShippingOutlined
                  sx={{
                    color: '#ec4899',
                    mb: 1.5,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 900,
                    mb: .5,
                  }}
                >
                  Livraison rapide
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,
                    lineHeight: 1.6,
                    color: 'text.secondary',
                  }}
                >
                  Recevez vos articles rapidement.
                </Typography>
              </Paper>

              {/* Security */}

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 4,
                  border: '1px solid var(--pv-line)',
                  bgcolor: 'var(--pv-surface)',
                }}
              >
                <SecurityOutlined
                  sx={{
                    color: '#ec4899',
                    mb: 1.5,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 900,
                    mb: .5,
                  }}
                >
                  Paiement sécurisé
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,
                    lineHeight: 1.6,
                    color: 'text.secondary',
                  }}
                >
                  Vos données restent protégées.
                </Typography>
              </Paper>

              {/* Quality */}

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 4,
                  border: '1px solid var(--pv-line)',
                  bgcolor: 'var(--pv-surface)',
                }}
              >
                <CheckCircleRounded
                  sx={{
                    color: '#ec4899',
                    mb: 1.5,
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 900,
                    mb: .5,
                  }}
                >
                  Qualité garantie
                </Typography>

                <Typography
                  sx={{
                    fontSize: 11,
                    lineHeight: 1.6,
                    color: 'text.secondary',
                  }}
                >
                  Une sélection pensée pour vous.
                </Typography>
              </Paper>
            </Box>
          </Box>

          {/* =================================================
              SUMMARY
          ================================================== */}

          <Box
            sx={{
              position: {
                lg: 'sticky',
              },
              top: {
                lg: 100,
              },
            }}
          >
            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: 5,
                border: '1px solid var(--pv-line)',
                bgcolor: 'var(--pv-surface)',
                boxShadow: '0 25px 70px rgba(0,0,0,.08)',
              }}
            >
              {/* Summary top */}

              <Box
                sx={{
                  p: { xs: 3, md: 3.5 },
                }}
              >
                <Typography
                  sx={{
                    fontSize: 22,
                    fontWeight: 950,
                    letterSpacing: '-.5px',
                    mb: .5,
                  }}
                >
                  Résumé
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color: 'text.secondary',
                    mb: 3,
                  }}
                >
                  Votre commande en un coup d'œil.
                </Typography>

                {/* Product count */}

                <Stack
                  direction="row"
                 
                  mb={2} sx={{ justifyContent: 'space-between' }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: 'text.secondary',
                    }}
                  >
                    Articles
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    {items.length}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                 
                  mb={2} sx={{ justifyContent: 'space-between' }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: 'text.secondary',
                    }}
                  >
                    Sous-total
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 850,
                    }}
                  >
                    {formatCurrency(totalPrice)}
                  </Typography>
                </Stack>

                <Stack
                  direction="row"
                 
                  mb={2.5} sx={{ justifyContent: 'space-between' }}>
                  <Typography
                    sx={{
                      fontSize: 13,
                      color: 'text.secondary',
                    }}
                  >
                    Livraison
                  </Typography>

                  <Chip
                    label="GRATUITE"
                    size="small"
                    sx={{
                      height: 23,
                      fontSize: 9,
                      fontWeight: 950,
                      bgcolor: 'var(--pv-success-soft)',
                      color: '#047857',
                    }}
                  />
                </Stack>

                <Divider sx={{ mb: 2.5 }} />

                {/* Total */}

                <Stack
                  direction="row"
                 
                 
                  mb={3} sx={{ alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: 1,
                        color: 'text.secondary',
                      }}
                    >
                      TOTAL
                    </Typography>

                    {/*
                      Le total se renouvelle à chaque changement : la clé
                      le remonte brièvement, de sorte que l'œil voie que
                      le montant a bougé.
                    */}
                    <Typography
                      key={totalPrice}
                      component={motion.div}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                      sx={{
                        fontSize: 30,
                        fontWeight: 950,
                        letterSpacing: '-1px',
                        mt: .3,
                      }}
                    >
                      {formatCurrency(totalPrice)}
                    </Typography>
                  </Box>

                  <Typography
                    sx={{
                      fontSize: 11,
                      color: 'text.secondary',
                      mb: .8,
                    }}
                  >
                    TTC
                  </Typography>
                </Stack>

                {/* Existing CartSummary */}

                <CartSummary
                  subtotal={totalPrice}
                  shipping={0}
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  phone={paymentPhone}
                  onPhoneChange={setPaymentPhone}
                />

                <Button
                  component={Link}
                  to="/checkout"
                  state={{
                    paymentMethod,
                    paymentPhone,
                  }}
                  fullWidth
                  variant="contained"
                  endIcon={<ArrowForwardRounded />}
                  sx={{
                    mt: 2.5,
                    py: 1.5,
                    borderRadius: 2.5,
                    textTransform: 'none',
                    fontWeight: 800,
                    boxShadow: 'none',
                    bgcolor: 'var(--pv-band)',
                    '&:hover': {
                      bgcolor: '#ec4899',
                      boxShadow: 'none',
                    },
                  }}
                >
                  Continuer vers la livraison
                </Button>
              </Box>

              {/* Bottom security strip */}

              <Box
                sx={{
                  px: 3.5,
                  py: 2,
                  bgcolor: 'var(--pv-canvas)',
                  borderTop: '1px solid var(--pv-line)',
                }}
              >
                <Stack
                  direction="row"
                 
                  gap={1} sx={{ alignItems: 'center' }}>
                  <SecurityOutlined
                    sx={{
                      fontSize: 17,
                      color: 'var(--pv-success)',
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 11,
                      color: 'text.secondary',
                      fontWeight: 700,
                    }}
                  >
                    Paiement 100% sécurisé
                  </Typography>
                </Stack>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Cart;
