import React from 'react';

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
  CheckCircleRounded,
  LocalShippingRounded,
  Inventory2Rounded,
  ShoppingBagRounded,
  HomeRounded,
  SupportAgentRounded,
  ShieldRounded,
  AccessTimeRounded,
  ArrowForwardRounded,
} from '@mui/icons-material';

import { Link, useParams } from 'react-router-dom';

function TrackOrder() {
  const { id } = useParams();

  // Tu peux modifier cette valeur selon le vrai statut
  // 0 = reçue
  // 1 = confirmée
  // 2 = expédiée
  // 3 = livrée
  const activeStep = 1;

  const steps = [
    {
      title: 'Commande reçue',
      description: 'Votre commande a bien été enregistrée.',
      date: 'Aujourd’hui',
      icon: <ShoppingBagRounded />,
    },
    {
      title: 'Commande confirmée',
      description: 'Votre commande est confirmée et va être préparée.',
      date: 'En cours',
      icon: <Inventory2Rounded />,
    },
    {
      title: 'Expédition',
      description: 'Votre colis sera remis au transporteur.',
      date: 'À venir',
      icon: <LocalShippingRounded />,
    },
    {
      title: 'Livraison',
      description: 'Votre colis arrivera à l’adresse indiquée.',
      date: 'À venir',
      icon: <HomeRounded />,
    },
  ];

  const progress = Math.round(((activeStep + 1) / steps.length) * 100);

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
          py: { xs: 7, md: 10 },
          mb: { xs: 4, md: 6 },

          '&::before': {
            content: '""',
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236,72,153,.32), transparent 65%)',
            top: -250,
            right: -100,
            filter: 'blur(10px)',
            animation: 'floatGlow 7s ease-in-out infinite',
          },

          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
            maskImage:
              'linear-gradient(to bottom, black, transparent 90%)',
            pointerEvents: 'none',
          },

          '@keyframes floatGlow': {
            '0%, 100%': {
              transform: 'translate(0, 0) scale(1)',
            },
            '50%': {
              transform: 'translate(-35px, 30px) scale(1.08)',
            },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Button
            component={Link}
            to={`/orders/${id}`}
            startIcon={<ArrowBackRounded />}
            sx={{
              color: 'rgba(255,255,255,.7)',
              mb: 4,
              px: 0,

              '&:hover': {
                color: '#fff',
                bgcolor: 'transparent',
              },
            }}
          >
            Retour à la commande
          </Button>

          <Stack
            direction={{ xs: 'column', md: 'row' }}
           
           
            gap={4} sx={{ alignItems: { xs: 'flex-start', md: 'flex-end' }, justifyContent: 'space-between' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: 3,
                  color: '#f472b6',
                  mb: 2,
                }}
              >
                PIVOT STORE DELIVERY
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 38,
                    sm: 48,
                    md: 64,
                  },
                  lineHeight: 1,
                  fontWeight: 950,
                  letterSpacing: '-2px',
                  mb: 2,
                }}
              >
                Suivez votre
                <Box
                  component="span"
                  sx={{
                    display: { xs: 'block', md: 'inline' },
                    ml: { xs: 0, md: 2 },
                    background:
                      'linear-gradient(90deg, #fff, #f472b6)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  commande.
                </Box>
              </Typography>

              <Typography
                sx={{
                  color: 'rgba(255,255,255,.62)',
                  fontSize: { xs: 15, md: 17 },
                  maxWidth: 580,
                  lineHeight: 1.7,
                }}
              >
                Retrouvez en temps réel l’évolution de votre
                commande et découvrez exactement où elle en est.
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                minWidth: { xs: '100%', md: 260 },
                p: 2.5,
                borderRadius: 4,
                bgcolor: 'rgba(255,255,255,.07)',
                border: '1px solid rgba(255,255,255,.1)',
                backdropFilter: 'blur(20px)',
                color: '#fff',
              }}
            >
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 1.5,
                  color: 'rgba(255,255,255,.45)',
                  mb: 1,
                }}
              >
                NUMÉRO DE COMMANDE
              </Typography>

              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 900,
                  wordBreak: 'break-word',
                }}
              >
                #{id}
              </Typography>
            </Paper>
          </Stack>
        </Container>
      </Box>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              lg: 'minmax(0, 1.5fr) minmax(300px, .7fr)',
            },
            gap: 3,
            alignItems: 'start',
          }}
        >
          {/* =================================================
              TRACKING CARD
          ================================================== */}

          <Paper
            elevation={0}
            sx={{
              p: { xs: 2.5, sm: 4, md: 5 },
              borderRadius: 5,
              border: '1px solid var(--pv-line)',
              bgcolor: 'var(--pv-surface)',
              boxShadow: '0 20px 60px rgba(0,0,0,.06)',
              animation: 'cardEnter .7s ease both',

              '@keyframes cardEnter': {
                from: {
                  opacity: 0,
                  transform: 'translateY(20px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            {/* HEADER */}

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
             
             
              gap={2}
              mb={4} sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between' }}>
              <Box>
                <Typography
                  sx={{
                    fontSize: 25,
                    fontWeight: 950,
                    letterSpacing: '-.6px',
                  }}
                >
                  État de la commande
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: .5,
                    fontSize: 14,
                  }}
                >
                  Voici l’avancement de votre commande.
                </Typography>
              </Box>

              <Chip
                icon={<CheckCircleRounded />}
                label="En cours"
                sx={{
                  fontWeight: 800,
                  bgcolor: 'var(--pv-success-soft)',
                  color: '#047857',
                  border: '1px solid #a7f3d0',

                  '& .MuiChip-icon': {
                    color: 'var(--pv-success)',
                  },
                }}
              />
            </Stack>

            {/* PROGRESS */}

            <Box
              sx={{
                mb: 5,
                p: 2.5,
                borderRadius: 4,
                bgcolor: 'var(--pv-canvas)',
                border: '1px solid var(--pv-line)',
              }}
            >
              <Stack
                direction="row"
               
               
                mb={1.5} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 800,
                  }}
                >
                  Progression
                </Typography>

                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 950,
                    color: '#ec4899',
                  }}
                >
                  {progress}%
                </Typography>
              </Stack>

              <Box
                sx={{
                  height: 8,
                  borderRadius: 99,
                  bgcolor: 'var(--pv-line)',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    width: `${progress}%`,
                    height: '100%',
                    borderRadius: 99,
                    background:
                      'linear-gradient(90deg, var(--pv-ink), #ec4899)',
                    transition: 'width .8s ease',
                  }}
                />
              </Box>

              <Typography
                sx={{
                  mt: 1.5,
                  fontSize: 12,
                  color: 'text.secondary',
                }}
              >
                Étape {activeStep + 1} sur {steps.length}
              </Typography>
            </Box>

            {/* TIMELINE */}

            <Box>
              {steps.map((step, index) => {
                const completed = index < activeStep;
                const active = index === activeStep;
                const last = index === steps.length - 1;

                return (
                  <Box
                    key={step.title}
                    sx={{
                      display: 'flex',
                      position: 'relative',
                      minHeight: last ? 95 : 125,
                    }}
                  >
                    {/* CONNECTOR */}

                    {!last && (
                      <Box
                        sx={{
                          position: 'absolute',
                          left: 27,
                          top: 58,
                          width: 2,
                          height: 67,
                          bgcolor:
                            index < activeStep
                              ? '#ec4899'
                              : 'var(--pv-line)',
                          transition: 'background .4s ease',
                        }}
                      />
                    )}

                    {/* ICON */}

                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        minWidth: 56,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 2,

                        bgcolor:
                          completed || active
                            ? 'var(--pv-band)'
                            : 'var(--pv-surface-alt)',

                        color:
                          completed || active
                            ? '#fff'
                            : 'var(--pv-muted)',

                        border: active
                          ? '3px solid #f9a8d4'
                          : '3px solid transparent',

                        boxShadow: active
                          ? '0 0 0 6px rgba(236,72,153,.1), 0 12px 30px rgba(236,72,153,.2)'
                          : 'none',

                        transition: 'all .3s ease',

                        animation: active
                          ? 'activePulse 2s infinite'
                          : 'none',

                        '@keyframes activePulse': {
                          '0%, 100%': {
                            boxShadow:
                              '0 0 0 6px rgba(236,72,153,.1)',
                          },
                          '50%': {
                            boxShadow:
                              '0 0 0 10px rgba(236,72,153,.04)',
                          },
                        },
                      }}
                    >
                      {completed ? (
                        <CheckCircleRounded fontSize="small" />
                      ) : (
                        step.icon
                      )}
                    </Box>

                    {/* CONTENT */}

                    <Box
                      sx={{
                        ml: 2.5,
                        pt: .5,
                        flex: 1,
                        pb: 3,
                      }}
                    >
                      <Stack
                        direction="row"
                       
                       
                        gap={2} sx={{ alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography
                            sx={{
                              fontSize: 17,
                              fontWeight: active ? 950 : 800,
                              color: active
                                ? 'var(--pv-ink)'
                                : completed
                                ? 'var(--pv-ink)'
                                : 'var(--pv-muted)',
                              mb: .5,
                            }}
                          >
                            {step.title}
                          </Typography>

                          <Typography
                            sx={{
                              fontSize: 13,
                              lineHeight: 1.6,
                              color: active
                                ? 'var(--pv-body)'
                                : 'var(--pv-muted)',
                              maxWidth: 480,
                            }}
                          >
                            {step.description}
                          </Typography>
                        </Box>

                        <Typography
                          sx={{
                            flexShrink: 0,
                            fontSize: 11,
                            fontWeight: 800,
                            color: active
                              ? '#ec4899'
                              : 'var(--pv-muted)',
                          }}
                        >
                          {step.date}
                        </Typography>
                      </Stack>

                      {active && (
                        <Chip
                          label="Étape actuelle"
                          size="small"
                          sx={{
                            mt: 1.5,
                            height: 25,
                            fontSize: 10,
                            fontWeight: 900,
                            bgcolor: 'var(--pv-accent-soft)',
                            color: '#db2777',
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Paper>

          {/* =================================================
              SIDE PANEL
          ================================================== */}

          <Stack spacing={3}>
            {/* DELIVERY */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 5,
                color: '#fff',
                background:
                  'linear-gradient(145deg, var(--pv-ink) 0%, #1f1f23 100%)',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 20px 50px rgba(0,0,0,.14)',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(236,72,153,.3), transparent 70%)',
                  right: -80,
                  top: -70,
                }}
              />

              <Box sx={{ position: 'relative' }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'rgba(236,72,153,.12)',
                    color: '#f472b6',
                    mb: 2.5,
                  }}
                >
                  <LocalShippingRounded />
                </Box>

                <Typography
                  sx={{
                    fontSize: 11,
                    letterSpacing: 2,
                    fontWeight: 900,
                    color: '#f472b6',
                    mb: 1,
                  }}
                >
                  LIVRAISON ESTIMÉE
                </Typography>

                <Typography
                  sx={{
                    fontSize: 27,
                    fontWeight: 950,
                    mb: 1,
                  }}
                >
                  2–4 jours
                </Typography>

                <Typography
                  sx={{
                    fontSize: 13,
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,.55)',
                  }}
                >
                  Nous vous tiendrons informé dès que votre
                  colis sera expédié.
                </Typography>
              </Box>
            </Paper>

            {/* INFO CARD */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 5,
                border: '1px solid var(--pv-line)',
                bgcolor: 'var(--pv-surface)',
              }}
            >
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 950,
                  mb: 2.5,
                }}
              >
                Besoin d’aide ?
              </Typography>

              <Stack spacing={2}>
                <Stack direction="row" gap={1.5}>
                  <SupportAgentRounded
                    sx={{
                      color: '#ec4899',
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 800,
                      }}
                    >
                      Support Pivot Store
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: 'text.secondary',
                        mt: .3,
                      }}
                    >
                      Notre équipe est disponible 24/7.
                    </Typography>
                  </Box>
                </Stack>

                <Divider />

                <Stack direction="row" gap={1.5}>
                  <ShieldRounded
                    sx={{
                      color: '#ec4899',
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 800,
                      }}
                    >
                      Commande sécurisée
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: 'text.secondary',
                        mt: .3,
                      }}
                    >
                      Vos informations sont protégées.
                    </Typography>
                  </Box>
                </Stack>

                <Divider />

                <Stack direction="row" gap={1.5}>
                  <AccessTimeRounded
                    sx={{
                      color: '#ec4899',
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: 13,
                        fontWeight: 800,
                      }}
                    >
                      Suivi actualisé
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 12,
                        color: 'text.secondary',
                        mt: .3,
                      }}
                    >
                      Le statut évolue automatiquement.
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            </Paper>

            {/* CTA */}

            <Button
              component={Link}
              to="/shop"
              fullWidth
              variant="contained"
              endIcon={<ArrowForwardRounded />}
              sx={{
                py: 1.8,
                borderRadius: 3,
                bgcolor: 'var(--pv-band)',
                fontWeight: 900,
                textTransform: 'none',
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
              Continuer mes achats
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default TrackOrder;