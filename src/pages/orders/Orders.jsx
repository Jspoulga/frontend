import React, { useEffect } from 'react';

import {
  Container,
  Typography,
  Paper,
  Stack,
  Button,
  Chip,
  Box,
  Divider,
} from '@mui/material';

import {
  ShoppingBagOutlined,
  ArrowForwardRounded,
  ReceiptLongOutlined,
  LocalShippingOutlined,
  CheckCircleRounded,
  ScheduleOutlined,
  Inventory2Outlined,
  AutoAwesomeRounded,
} from '@mui/icons-material';

import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import formatCurrency from '../../utils/formatCurrency';
import { AnimatePresence, motion } from 'framer-motion';

import orderService from '../../services/orderService';
import { setOrders } from '../../store/slices/orderSlice';

function Orders() {
  const dispatch = useDispatch();

  const orders = useSelector(
    state => state.orders.orders
  );

  /*
   * Les commandes du compte viennent du serveur. On y ajoute celles passées
   * sans être connecté sur cet appareil, pour ne pas les faire disparaître.
   */
  useEffect(() => {
    let cancelled = false;

    orderService
      .getOrders()
      .then(remote => {
        if (cancelled || !Array.isArray(remote)) {
          return;
        }

        const knownIds = new Set(remote.map(order => order.id));
        const localOnly = orders.filter(order => !knownIds.has(order.id));

        dispatch(setOrders([...remote, ...localOnly]));
      })
      .catch(() => {
        /* Hors ligne : on garde la liste locale. */
      });

    return () => {
      cancelled = true;
    };
    /* Une seule synchronisation au montage : `orders` ne doit pas relancer
       l'effet, il change justement à cause de lui. */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const totalSpent = orders.reduce(
    (total, order) =>
      total + Number(order.total || 0),
    0
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'var(--pv-canvas)',
        pb: {
          xs: 8,
          md: 12,
        },
      }}
    >
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: '#0b0b0b',
          color: '#fff',
        }}
      >
        {/* Pink glow */}
        <Box
          sx={{
            position: 'absolute',
            width: {
              xs: 300,
              md: 520,
            },
            height: {
              xs: 300,
              md: 520,
            },
            borderRadius: '50%',
            right: {
              xs: -160,
              md: -180,
            },
            top: {
              xs: -170,
              md: -290,
            },
            background:
              'radial-gradient(circle, rgba(255,45,130,.3), transparent 68%)',
            filter: 'blur(18px)',
            animation:
              'ordersGlow 7s ease-in-out infinite',

            '@keyframes ordersGlow': {
              '0%, 100%': {
                transform: 'translate(0,0)',
              },
              '50%': {
                transform:
                  'translate(-25px,25px)',
              },
            },
          }}
        />

        {/* Purple glow */}
        <Box
          sx={{
            position: 'absolute',
            width: 280,
            height: 280,
            borderRadius: '50%',
            left: '10%',
            bottom: -220,
            background:
              'radial-gradient(circle, rgba(120,40,220,.16), transparent 70%)',
            filter: 'blur(20px)',
          }}
        />

        {/* Grid */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.035,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)',
            backgroundSize: '55px 55px',
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            py: {
              xs: 5,
              md: 7,
            },
          }}
        >
          <Box
            sx={{
              animation:
                'ordersHero .7s ease forwards',

              '@keyframes ordersHero': {
                from: {
                  opacity: 0,
                  transform:
                    'translateY(20px)',
                },
                to: {
                  opacity: 1,
                  transform:
                    'translateY(0)',
                },
              },
            }}
          >
            {/* Label */}
            <Stack
              direction="row"
              spacing={1}
             
              sx={{ alignItems: 'center',  mb: 2 }}
            >
              <ReceiptLongOutlined
                sx={{
                  fontSize: 18,
                  color: '#ff4f9a',
                }}
              />

              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 3,
                  color:
                    'rgba(255,255,255,.55)',
                }}
              >
                PIVOT STORE ACCOUNT
              </Typography>
            </Stack>

            {/* Title */}
            <Typography
              sx={{
                fontSize: {
                  xs: '2.7rem',
                  sm: '3.6rem',
                  md: '4.5rem',
                },
                lineHeight: 0.95,
                fontWeight: 950,
                letterSpacing: '-.055em',
              }}
            >
              Mes commandes
              <Box
                component="span"
                sx={{
                  display: 'block',
                  background:
                    'linear-gradient(90deg, #ff4f9a, #ff9ac4)',
                  WebkitBackgroundClip:
                    'text',
                  WebkitTextFillColor:
                    'transparent',
                }}
              >
                Tout, au même endroit.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 2.5,
                maxWidth: 570,
                color:
                  'rgba(255,255,255,.62)',
                fontSize: {
                  xs: 14,
                  md: 16,
                },
                lineHeight: 1.7,
              }}
            >
              Retrouvez votre historique de
              commandes, consultez les détails et
              suivez facilement vos achats.
            </Typography>

            {/* Stats */}
            {orders.length > 0 && (
              <Stack
                direction="row"
                spacing={{
                  xs: 3,
                  md: 5,
                }}
                sx={{ mt: 4 }}
              >
                <Stat
                  value={orders.length}
                  label={
                    orders.length > 1
                      ? 'Commandes'
                      : 'Commande'
                  }
                />

                <Stat
                  value={formatCurrency(
                    totalSpent
                  )}
                  label="Total dépensé"
                />

                <Stat
                  value="24/7"
                  label="Suivi"
                />
              </Stack>
            )}
          </Box>
        </Container>
      </Box>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <Container
        maxWidth="lg"
        sx={{
          mt: {
            xs: 4,
            md: 6,
          },
        }}
      >
        {orders.length === 0 ? (
          <EmptyOrders />
        ) : (
          <>
            {/* Section heading */}
            <Box
              sx={{
                mb: 3,
                animation:
                  'sectionIn .6s ease',

                '@keyframes sectionIn': {
                  from: {
                    opacity: 0,
                    transform:
                      'translateY(15px)',
                  },
                  to: {
                    opacity: 1,
                    transform:
                      'translateY(0)',
                  },
                },
              }}
            >
              <Stack
                direction="row"
                spacing={1}
               
                sx={{ alignItems: 'center',  mb: 0.7 }}
              >
                <AutoAwesomeRounded
                  sx={{
                    fontSize: 16,
                    color: '#e91e73',
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 11,
                    fontWeight: 900,
                    letterSpacing: 2,
                    color: '#e91e73',
                  }}
                >
                  HISTORIQUE
                </Typography>
              </Stack>

              <Typography
                sx={{
                  fontSize: {
                    xs: 26,
                    md: 34,
                  },
                  fontWeight: 950,
                  letterSpacing: '-.04em',
                  color: 'var(--pv-ink)',
                }}
              >
                Vos achats
              </Typography>

              <Typography
                sx={{
                  mt: 0.5,
                  color: 'var(--pv-muted)',
                  fontSize: 14,
                }}
              >
                Retrouvez toutes vos commandes
                précédentes.
              </Typography>
            </Box>

            {/* Orders */}
            <Stack spacing={2}>
              {/* `AnimatePresence` prépare le filtrage : une commande qui
                  sort de la liste s'efface au lieu de disparaître. */}
              <AnimatePresence initial={false}>
              {orders.map((order, index) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  index={index}
                />
              ))}
              </AnimatePresence>
            </Stack>

            {/* Bottom */}
            <Box
              sx={{
                mt: 6,
                textAlign: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 22,
                  fontWeight: 950,
                  letterSpacing: '-.03em',
                  color: 'var(--pv-ink)',
                }}
              >
                Envie de nouvelles pièces ?
              </Typography>

              <Typography
                sx={{
                  mt: 0.7,
                  fontSize: 14,
                  color: 'var(--pv-muted)',
                }}
              >
                Découvrez notre nouvelle collection.
              </Typography>

              <Button
                component={Link}
                to="/shop"
                startIcon={
                  <ShoppingBagOutlined />
                }
                endIcon={
                  <ArrowForwardRounded />
                }
                sx={{
                  mt: 2.5,
                  height: 50,
                  px: 3,
                  borderRadius: 999,
                  bgcolor: 'var(--pv-band)',
                  color: '#fff',
                  fontWeight: 900,
                  textTransform: 'none',
                  '&:hover': {
                    bgcolor: 'var(--pv-band)',
                    transform:
                      'translateY(-2px)',
                  },
                  transition:
                    'all .25s ease',
                }}
              >
                Continuer mes achats
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}

/* ================================================= */
/* STAT */
/* ================================================= */

function Stat({ value, label }) {
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 950,
          fontSize: {
            xs: 20,
            md: 25,
          },
          lineHeight: 1,
        }}
      >
        {value}
      </Typography>

      <Typography
        sx={{
          mt: 0.5,
          fontSize: 11,
          color:
            'rgba(255,255,255,.48)',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
}

/* ================================================= */
/* ORDER CARD */
/* ================================================= */

function OrderCard({ order, index }) {
  const status = order.status || 'pending';

  return (
    <Paper
      elevation={0}
      component={motion.div}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12, height: 0, marginBottom: 0 }}
      whileHover={{ y: -4 }}
      transition={{
        duration: 0.45,
        delay: Math.min(index, 6) * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      sx={{
        p: {
          xs: 2,
          sm: 2.5,
          md: 3,
        },
        borderRadius: {
          xs: 4,
          md: 5,
        },
        border:
          '1px solid var(--pv-line)',
        bgcolor: 'var(--pv-surface)',
        overflow: 'hidden',
        position: 'relative',

        transition:
          'transform .3s ease, box-shadow .3s ease, border-color .3s ease',

        '&:hover': {
          transform:
            'translateY(-4px)',
          borderColor: 'var(--pv-line)',
          boxShadow:
            '0 20px 50px rgba(0,0,0,.08)',
        },
      }}
    >
      {/* Top row */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: {
            xs: 'flex-start',
            sm: 'center',
          },
          gap: 2,
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1.5} sx={{ alignItems: 'center' }}>
          {/* Order icon */}
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: 3,
              bgcolor: '#f6f6f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <ShoppingBagOutlined
              sx={{
                color: 'var(--pv-ink)',
                fontSize: 22,
              }}
            />
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: 1.5,
                color: 'var(--pv-muted)',
              }}
            >
              COMMANDE
            </Typography>

            <Typography
              sx={{
                mt: 0.3,
                fontWeight: 950,
                fontSize: {
                  xs: 14,
                  md: 16,
                },
                color: 'var(--pv-ink)',
                wordBreak: 'break-all',
              }}
            >
              #{order.id}
            </Typography>
          </Box>
        </Stack>

        <StatusChip status={status} />
      </Box>

      <Divider sx={{ my: 2.5 }} />

      {/* Bottom */}
      <Box
        sx={{
          display: 'flex',
          alignItems: {
            xs: 'stretch',
            sm: 'center',
          },
          justifyContent:
            'space-between',
          gap: 2,
          flexDirection: {
            xs: 'column',
            sm: 'row',
          },
        }}
      >
        {/* Total */}
        <Box>
          <Typography
            sx={{
              fontSize: 10,
              fontWeight: 800,
              color: 'var(--pv-muted)',
              letterSpacing: 1,
            }}
          >
            TOTAL
          </Typography>

          <Typography
            sx={{
              mt: 0.3,
              fontSize: 23,
              fontWeight: 950,
              letterSpacing: '-.03em',
              color: 'var(--pv-ink)',
            }}
          >
            {formatCurrency(order.total)}
          </Typography>
        </Box>

        {/* View button */}
        <Button
          component={Link}
          to={`/orders/${order.id}`}
          endIcon={
            <ArrowForwardRounded />
          }
          sx={{
            minWidth: {
              xs: '100%',
              sm: 130,
            },
            height: 46,
            px: 2.5,
            borderRadius: 999,
            bgcolor: 'var(--pv-band)',
            color: '#fff',
            fontWeight: 900,
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'var(--pv-band)',
              transform:
                'translateX(2px)',
            },
            transition:
              'all .25s ease',
          }}
        >
          Voir la commande
        </Button>
      </Box>
    </Paper>
  );
}

/* ================================================= */
/* STATUS CHIP */
/* ================================================= */

function StatusChip({ status }) {
  const config = {
    pending: {
      label: 'En attente',
      color: '#a16207',
      bg: '#fff8e7',
      border: '#f5df9f',
      icon: <ScheduleOutlined />,
    },

    processing: {
      label: 'En préparation',
      color: '#6d28d9',
      bg: '#f4efff',
      border: '#dfd1ff',
      icon: <Inventory2Outlined />,
    },

    shipped: {
      label: 'Expédiée',
      color: '#2563eb',
      bg: '#eff6ff',
      border: '#cfe1ff',
      icon: <LocalShippingOutlined />,
    },

    delivered: {
      label: 'Livrée',
      color: 'var(--pv-success)',
      bg: '#eafaf1',
      border: '#c9efd9',
      icon: <CheckCircleRounded />,
    },

    completed: {
      label: 'Terminée',
      color: 'var(--pv-success)',
      bg: '#eafaf1',
      border: '#c9efd9',
      icon: <CheckCircleRounded />,
    },

    cancelled: {
      label: 'Annulée',
      color: 'var(--pv-error)',
      bg: '#fff1f1',
      border: '#ffd3d3',
      icon: <ScheduleOutlined />,
    },
  };

  const current =
    config[status] || config.pending;

  return (
    <Chip
      icon={React.cloneElement(
        current.icon,
        {
          sx: {
            fontSize: 17,
          },
        }
      )}
      label={current.label}
      sx={{
        height: 36,
        borderRadius: 999,
        bgcolor: current.bg,
        color: current.color,
        border: `1px solid ${current.border}`,
        fontWeight: 900,
        fontSize: 11,
        '& .MuiChip-icon': {
          color: current.color,
        },
      }}
    />
  );
}

/* ================================================= */
/* EMPTY ORDERS */
/* ================================================= */

function EmptyOrders() {
  return (
    <Box
      sx={{
        minHeight: 540,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 550,
          animation:
            'emptyOrders .7s ease',

          '@keyframes emptyOrders': {
            from: {
              opacity: 0,
              transform:
                'translateY(20px)',
            },
            to: {
              opacity: 1,
              transform:
                'translateY(0)',
            },
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            position: 'relative',
            width: 110,
            height: 110,
            mx: 'auto',
            mb: 4,
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border:
                '1px solid var(--pv-line)',
            }}
          />

          <Box
            sx={{
              position: 'absolute',
              inset: 10,
              borderRadius: '50%',
              bgcolor: 'var(--pv-surface-alt)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ReceiptLongOutlined
              sx={{
                fontSize: 40,
                color: 'var(--pv-ink)',
              }}
            />
          </Box>
        </Box>

        <Typography
          sx={{
            fontSize: {
              xs: 28,
              md: 36,
            },
            fontWeight: 950,
            letterSpacing: '-.04em',
            color: 'var(--pv-ink)',
          }}
        >
          Aucune commande
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            color: 'var(--pv-muted)',
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 450,
            mx: 'auto',
          }}
        >
          Vous n'avez pas encore passé de
          commande. Votre prochaine aventure
          shopping commence ici.
        </Typography>

        <Button
          component={Link}
          to="/shop"
          startIcon={
            <ShoppingBagOutlined />
          }
          endIcon={
            <ArrowForwardRounded />
          }
          sx={{
            mt: 3.5,
            height: 52,
            px: 3,
            borderRadius: 999,
            bgcolor: 'var(--pv-band)',
            color: '#fff',
            fontWeight: 900,
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'var(--pv-band)',
              transform:
                'translateY(-3px)',
              boxShadow:
                '0 15px 30px rgba(0,0,0,.15)',
            },
            transition:
              'all .25s ease',
          }}
        >
          Découvrir la collection
        </Button>
      </Box>
    </Box>
  );
}

export default Orders;