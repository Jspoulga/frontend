import React from 'react';

import {
  Container,
  Typography,
  Box,
  Stack,
  Paper,
  Button,
  Divider,
} from '@mui/material';

import {
  FavoriteRounded,
  AutoAwesomeRounded,
  ShoppingBagOutlined,
  ArrowForwardRounded,
} from '@mui/icons-material';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ProductGrid from '../../components/product/ProductGrid';

function Wishlist() {
  const navigate = useNavigate();

  const products = useSelector(
    state => state.wishlist.items
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
              xs: 280,
              md: 500,
            },
            height: {
              xs: 280,
              md: 500,
            },
            borderRadius: '50%',
            right: {
              xs: -150,
              md: -120,
            },
            top: {
              xs: -160,
              md: -250,
            },
            background:
              'radial-gradient(circle, rgba(255,45,130,.28), transparent 68%)',
            filter: 'blur(15px)',
            animation:
              'wishlistGlow 7s ease-in-out infinite',
            '@keyframes wishlistGlow': {
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

        {/* Purple glow */}
        <Box
          sx={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            left: '15%',
            bottom: -250,
            background:
              'radial-gradient(circle, rgba(130,50,220,.18), transparent 70%)',
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
          maxWidth="xl"
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
                'wishlistHero .7s ease forwards',
              '@keyframes wishlistHero': {
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
              <FavoriteRounded
                sx={{
                  fontSize: 17,
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
                VOTRE SÉLECTION
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
              Mes favoris
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
                Mes coups de cœur.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 2.5,
                maxWidth: 560,
                color:
                  'rgba(255,255,255,.62)',
                fontSize: {
                  xs: 14,
                  md: 16,
                },
                lineHeight: 1.7,
              }}
            >
              Retrouvez ici toutes les pièces
              que vous avez aimées et gardez
              vos coups de cœur à portée de main.
            </Typography>

            {/* Counter */}
            <Box
              sx={{
                mt: 3.5,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1.5,
                px: 2,
                py: 1.2,
                borderRadius: 999,
                border:
                  '1px solid rgba(255,255,255,.12)',
                bgcolor:
                  'rgba(255,255,255,.05)',
                backdropFilter:
                  'blur(10px)',
              }}
            >
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '50%',
                  bgcolor:
                    'rgba(255,45,130,.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <FavoriteRounded
                  sx={{
                    fontSize: 16,
                    color: '#ff4f9a',
                  }}
                />
              </Box>

              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                {products.length}{' '}
                {products.length > 1
                  ? 'articles sauvegardés'
                  : 'article sauvegardé'}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <Container maxWidth="xl">
        {products.length === 0 ? (
          <EmptyWishlist
            onExplore={() =>
              navigate('/shop')
            }
          />
        ) : (
          <>
            {/* Section header */}
            <Box
              sx={{
                mt: {
                  xs: 4,
                  md: 6,
                },
                mb: 3,
                display: 'flex',
                alignItems: {
                  xs: 'flex-start',
                  md: 'center',
                },
                justifyContent:
                  'space-between',
                gap: 2,
                flexDirection: {
                  xs: 'column',
                  md: 'row',
                },
              }}
            >
              <Box>
                <Stack
                  direction="row"
                  spacing={1}
                 
                  sx={{ alignItems: 'center',  mb: 0.7 }}
                >
                  <AutoAwesomeRounded
                    sx={{
                      fontSize: 17,
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
                    VOTRE COLLECTION
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
                  Vos pièces préférées
                </Typography>

                <Typography
                  sx={{
                    mt: 0.5,
                    color: 'var(--pv-muted)',
                    fontSize: 14,
                  }}
                >
                  Une sélection rien que pour vous.
                </Typography>
              </Box>

              {/* Continue shopping */}
              <Button
                onClick={() =>
                  navigate('/shop')
                }
                endIcon={
                  <ArrowForwardRounded />
                }
                sx={{
                  height: 46,
                  px: 2.5,
                  borderRadius: 999,
                  bgcolor: 'var(--pv-band)',
                  color: '#fff',
                  fontWeight: 800,
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

            <Divider sx={{ mb: 4 }} />

            {/* Product grid */}
            <Box
              sx={{
                animation:
                  'wishlistProducts .55s ease',
                '@keyframes wishlistProducts':
                  {
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
              <ProductGrid
                products={products}
              />
            </Box>

            {/* ================================================= */}
            {/* BOTTOM INFO */}
            {/* ================================================= */}

            <Paper
              elevation={0}
              sx={{
                mt: 8,
                p: {
                  xs: 3,
                  md: 4,
                },
                borderRadius: {
                  xs: 4,
                  md: 5,
                },
                border:
                  '1px solid var(--pv-line)',
                bgcolor: 'var(--pv-surface)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Decorative glow */}
              <Box
                sx={{
                  position: 'absolute',
                  width: 220,
                  height: 220,
                  borderRadius: '50%',
                  right: -100,
                  top: -130,
                  background:
                    'radial-gradient(circle, rgba(255,45,130,.12), transparent 70%)',
                }}
              />

              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: {
                    xs: 'flex-start',
                    md: 'center',
                  },
                  gap: 2,
                  flexDirection: {
                    xs: 'column',
                    md: 'row',
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    flexShrink: 0,
                    borderRadius: 3,
                    bgcolor: 'var(--pv-accent-soft)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FavoriteRounded
                    sx={{
                      color: '#e91e73',
                    }}
                  />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontWeight: 900,
                      fontSize: 16,
                      color: 'var(--pv-ink)',
                    }}
                  >
                    Gardez vos favoris près de vous
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.5,
                      color: 'var(--pv-muted)',
                      fontSize: 13,
                      lineHeight: 1.6,
                      maxWidth: 650,
                    }}
                  >
                    Vos produits favoris sont
                    sauvegardés ici pour vous
                    permettre de les retrouver
                    facilement lorsque vous êtes
                    prêt à commander.
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </>
        )}
      </Container>
    </Box>
  );
}

/* ================================================= */
/* EMPTY WISHLIST */
/* ================================================= */

function EmptyWishlist({ onExplore }) {
  return (
    <Box
      sx={{
        minHeight: {
          xs: 520,
          md: 600,
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 560,
          animation:
            'emptyWishlist .7s ease',
          '@keyframes emptyWishlist': {
            from: {
              opacity: 0,
              transform:
                'translateY(20px) scale(.98)',
            },
            to: {
              opacity: 1,
              transform:
                'translateY(0) scale(1)',
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
          {/* Outer ring */}
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border:
                '1px solid #f3d8e5',
            }}
          />

          {/* Inner */}
          <Box
            sx={{
              position: 'absolute',
              inset: 10,
              borderRadius: '50%',
              bgcolor: 'var(--pv-accent-soft)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FavoriteRounded
              sx={{
                fontSize: 40,
                color: '#e91e73',
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
          Votre wishlist est vide
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            color: 'var(--pv-muted)',
            fontSize: 15,
            lineHeight: 1.7,
            maxWidth: 460,
            mx: 'auto',
          }}
        >
          Vous n'avez encore enregistré aucun
          produit. Explorez notre collection et
          ajoutez vos coups de cœur ici.
        </Typography>

        <Button
          onClick={onExplore}
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

export default Wishlist;