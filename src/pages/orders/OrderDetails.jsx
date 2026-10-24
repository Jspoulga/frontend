import React from 'react';

import {
  Container,
  Paper,
  Typography,
  Stack,
  Button,
  Box,
  Divider,
  Chip,
} from '@mui/material';

import {
  CheckCircleRounded,
  LocalShippingOutlined,
  Inventory2Outlined,
  ShoppingBagOutlined,
  ArrowForwardRounded,
  ReceiptLongOutlined,
  SupportAgentOutlined,
  AutoAwesomeRounded,
} from '@mui/icons-material';

import {
  useParams,
  Link,
} from 'react-router-dom';

function OrderDetails() {
  const { id } = useParams();

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
            width: 500,
            height: 500,
            borderRadius: '50%',
            right: -180,
            top: -280,
            background:
              'radial-gradient(circle, rgba(255,45,130,.3), transparent 68%)',
            filter: 'blur(15px)',
            animation:
              'successGlow 7s ease-in-out infinite',

            '@keyframes successGlow': {
              '0%, 100%': {
                transform: 'translate(0, 0)',
              },
              '50%': {
                transform:
                  'translate(-25px, 25px)',
              },
            },
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
          maxWidth="md"
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
              textAlign: 'center',
              animation:
                'orderHero .7s ease forwards',

              '@keyframes orderHero': {
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
            {/* Success icon */}
            <Box
              sx={{
                position: 'relative',
                width: 92,
                height: 92,
                mx: 'auto',
                mb: 3,
              }}
            >
              {/* Pulse ring */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: -8,
                  borderRadius: '50%',
                  border:
                    '1px solid rgba(255,255,255,.15)',
                  animation:
                    'successPulse 2.2s ease-out infinite',

                  '@keyframes successPulse': {
                    '0%': {
                      transform: 'scale(.85)',
                      opacity: 0,
                    },
                    '35%': {
                      opacity: 1,
                    },
                    '100%': {
                      transform: 'scale(1.2)',
                      opacity: 0,
                    },
                  },
                }}
              />

              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  bgcolor: 'var(--pv-accent-soft)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow:
                    '0 0 45px rgba(255,45,130,.25)',
                }}
              >
                <CheckCircleRounded
                  sx={{
                    fontSize: 56,
                    color: '#e91e73',
                  }}
                />
              </Box>
            </Box>

            {/* Label */}
            <Stack
              direction="row"
              spacing={1}
             
             
              sx={{ alignItems: 'center', justifyContent: 'center',  mb: 1.5 }}
            >
              <AutoAwesomeRounded
                sx={{
                  fontSize: 16,
                  color: '#ff65a5',
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
                PIVOT STORE
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: {
                  xs: '2.2rem',
                  md: '3.3rem',
                },
                lineHeight: 1,
                fontWeight: 950,
                letterSpacing: '-.05em',
              }}
            >
              Commande confirmée !
            </Typography>

            <Typography
              sx={{
                mt: 2,
                color:
                  'rgba(255,255,255,.62)',
                fontSize: {
                  xs: 14,
                  md: 16,
                },
                lineHeight: 1.7,
                maxWidth: 540,
                mx: 'auto',
              }}
            >
              Merci pour votre confiance.
              Votre commande a bien été
              enregistrée et sera préparée avec
              soin.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <Container
        maxWidth="md"
        sx={{
          mt: {
            xs: -2,
            md: -3,
          },
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* ================================================= */}
        {/* ORDER NUMBER CARD */}
        {/* ================================================= */}

        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2.5,
              md: 3.5,
            },
            borderRadius: {
              xs: 4,
              md: 5,
            },
            border:
              '1px solid var(--pv-line)',
            bgcolor: 'var(--pv-surface)',
            boxShadow:
              '0 20px 60px rgba(0,0,0,.08)',
            animation:
              'cardAppear .8s ease forwards',

            '@keyframes cardAppear': {
              from: {
                opacity: 0,
                transform:
                  'translateY(25px)',
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
            direction={{
              xs: 'column',
              sm: 'row',
            }}
           
           
            gap={2} sx={{ alignItems: {
              xs: 'flex-start',
              sm: 'center',
            }, justifyContent: 'space-between' }}>
            <Box>
              <Typography
                sx={{
                  fontSize: 11,
                  fontWeight: 900,
                  letterSpacing: 2,
                  color: 'var(--pv-muted)',
                  mb: 0.8,
                }}
              >
                NUMÉRO DE COMMANDE
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 20,
                    md: 24,
                  },
                  fontWeight: 950,
                  color: 'var(--pv-ink)',
                  letterSpacing: '-.02em',
                  wordBreak: 'break-all',
                }}
              >
                #{id}
              </Typography>
            </Box>

            <Chip
              icon={
                <CheckCircleRounded
                  sx={{
                    fontSize: 17,
                  }}
                />
              }
              label="Confirmée"
              sx={{
                height: 38,
                borderRadius: 999,
                bgcolor: '#eafaf1',
                color: 'var(--pv-success)',
                fontWeight: 900,
                border:
                  '1px solid #c9efd9',
                '& .MuiChip-icon': {
                  color: 'var(--pv-success)',
                },
              }}
            />
          </Stack>

          <Divider
            sx={{
              my: 3,
            }}
          />

          {/* Buttons */}
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            spacing={1.5}
          >
            <Button
              component={Link}
              to={`/track-order/${id}`}
              fullWidth
              variant="contained"
              endIcon={
                <ArrowForwardRounded />
              }
              sx={{
                height: 52,
                borderRadius: 999,
                bgcolor: 'var(--pv-band)',
                color: '#fff',
                fontWeight: 900,
                textTransform: 'none',
                boxShadow:
                  '0 10px 25px rgba(0,0,0,.12)',
                '&:hover': {
                  bgcolor: 'var(--pv-band)',
                  transform:
                    'translateY(-2px)',
                  boxShadow:
                    '0 15px 30px rgba(0,0,0,.16)',
                },
                transition:
                  'all .25s ease',
              }}
            >
              Suivre ma commande
            </Button>

            <Button
              component={Link}
              to="/orders"
              fullWidth
              startIcon={
                <ReceiptLongOutlined />
              }
              sx={{
                height: 52,
                borderRadius: 999,
                border:
                  '1px solid #dedede',
                color: 'var(--pv-ink)',
                fontWeight: 800,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: 'var(--pv-surface-alt)',
                  borderColor: '#ccc',
                },
              }}
            >
              Mes commandes
            </Button>
          </Stack>
        </Paper>

        {/* ================================================= */}
        {/* DELIVERY STATUS */}
        {/* ================================================= */}

        <Box
          sx={{
            mt: 5,
            animation:
              'sectionAppear .8s ease .15s both',

            '@keyframes sectionAppear': {
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
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: 2,
              color: '#e91e73',
              mb: 1,
            }}
          >
            VOTRE COMMANDE
          </Typography>

          <Typography
            sx={{
              fontSize: {
                xs: 25,
                md: 30,
              },
              fontWeight: 950,
              letterSpacing: '-.04em',
              color: 'var(--pv-ink)',
            }}
          >
            Elle est entre de bonnes mains.
          </Typography>

          <Typography
            sx={{
              mt: 0.7,
              color: 'var(--pv-muted)',
              fontSize: 14,
            }}
          >
            Voici les prochaines étapes.
          </Typography>
        </Box>

        {/* ================================================= */}
        {/* TIMELINE */}
        {/* ================================================= */}

        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: {
              xs: 2.5,
              md: 4,
            },
            borderRadius: 5,
            border:
              '1px solid var(--pv-line)',
            bgcolor: 'var(--pv-surface)',
          }}
        >
          <OrderStep
            icon={<CheckCircleRounded />}
            title="Commande confirmée"
            description="Votre commande a été enregistrée avec succès."
            active
            last={false}
          />

          <OrderStep
            icon={<Inventory2Outlined />}
            title="Préparation"
            description="Notre équipe prépare soigneusement vos articles."
            last={false}
          />

          <OrderStep
            icon={<LocalShippingOutlined />}
            title="Expédition"
            description="Votre colis sera remis au transporteur."
            last={false}
          />

          <OrderStep
            icon={<ShoppingBagOutlined />}
            title="Livraison"
            description="Votre commande arrivera à destination."
            last
          />
        </Paper>

        {/* ================================================= */}
        {/* INFO CARDS */}
        {/* ================================================= */}

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
            },
            gap: 2,
            mt: 3,
          }}
        >
          <InfoCard
            icon={<SupportAgentOutlined />}
            title="Besoin d'aide ?"
            text="Notre équipe est là pour vous accompagner."
          />

          <InfoCard
            icon={<VerifiedIcon />}
            title="Paiement sécurisé"
            text="Vos informations sont protégées."
          />
        </Box>

        {/* ================================================= */}
        {/* BOTTOM CTA */}
        {/* ================================================= */}

        <Box
          sx={{
            textAlign: 'center',
            mt: 7,
          }}
        >
          <Typography
            sx={{
              fontSize: 23,
              fontWeight: 950,
              letterSpacing: '-.03em',
              color: 'var(--pv-ink)',
            }}
          >
            Envie de continuer ?
          </Typography>

          <Typography
            sx={{
              mt: 0.8,
              color: 'var(--pv-muted)',
              fontSize: 14,
            }}
          >
            Découvrez encore plus de pièces
            sélectionnées pour vous.
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
      </Container>
    </Box>
  );
}

/* ================================================= */
/* ORDER STEP */
/* ================================================= */

function OrderStep({
  icon,
  title,
  description,
  active = false,
  last = false,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        position: 'relative',
        pb: last ? 0 : 4,
      }}
    >
      {/* Vertical line */}
      {!last && (
        <Box
          sx={{
            position: 'absolute',
            left: 20,
            top: 42,
            bottom: 0,
            width: 1,
            bgcolor: active
              ? '#ffd2e3'
              : '#e9e9e9',
          }}
        />
      )}

      {/* Icon */}
      <Box
        sx={{
          width: 42,
          height: 42,
          flexShrink: 0,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: active
            ? 'var(--pv-accent-soft)'
            : 'var(--pv-surface-alt)',
          color: active
            ? '#e91e73'
            : 'var(--pv-muted)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {React.cloneElement(icon, {
          sx: {
            fontSize: 21,
          },
        })}
      </Box>

      {/* Content */}
      <Box sx={{ pt: 0.4 }}>
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: 15,
            color: active
              ? 'var(--pv-ink)'
              : 'var(--pv-body)',
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.4,
            color: 'var(--pv-muted)',
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          {description}
        </Typography>

        {active && (
          <Chip
            label="Terminé"
            size="small"
            sx={{
              mt: 1,
              height: 25,
              borderRadius: 999,
              bgcolor: '#eafaf1',
              color: 'var(--pv-success)',
              fontWeight: 800,
              fontSize: 10,
            }}
          />
        )}
      </Box>
    </Box>
  );
}

/* ================================================= */
/* INFO CARD */
/* ================================================= */

function InfoCard({ icon, title, text }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 4,
        border:
          '1px solid var(--pv-line)',
        bgcolor: 'var(--pv-surface)',
        display: 'flex',
        gap: 1.7,
        transition:
          'all .25s ease',
        '&:hover': {
          transform:
            'translateY(-3px)',
          boxShadow:
            '0 15px 35px rgba(0,0,0,.06)',
        },
      }}
    >
      <Box
        sx={{
          width: 45,
          height: 45,
          flexShrink: 0,
          borderRadius: 3,
          bgcolor: 'var(--pv-accent-soft)',
          color: '#e91e73',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            fontWeight: 900,
            fontSize: 14,
            color: 'var(--pv-ink)',
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            mt: 0.4,
            fontSize: 12,
            color: 'var(--pv-muted)',
            lineHeight: 1.6,
          }}
        >
          {text}
        </Typography>
      </Box>
    </Paper>
  );
}

/* ================================================= */
/* VERIFIED ICON */
/* ================================================= */

function VerifiedIcon() {
  return (
    <CheckCircleRounded
      sx={{
        fontSize: 23,
      }}
    />
  );
}

export default OrderDetails;