import React from 'react';

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from '@mui/material';

import {
  ArrowForward,
  ShoppingBagOutlined,
  TrendingUp,
  LocalShippingOutlined,
  VerifiedOutlined,
} from '@mui/icons-material';

import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

import useProducts from '../../hooks/useProducts';
import FlashSale from '../../components/home/FlashSale';
import CategoryRail from '../../components/home/CategoryRail';
import ValueTicker from '../../components/home/ValueTicker';
import MadeToMeasure from '../../components/home/MadeToMeasure';
import NewArrivals from '../../components/home/NewArrivals';
import Testimonials from '../../components/home/Testimonials';
import ProductGrid from '../../components/product/ProductGrid';
import LoadingScreen from '../../components/common/LoadingScreen';


// ==============================
// ANIMATION VARIANTS
// ==============================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};


const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};


// ==============================
// HOME
// ==============================

function Home() {
  const {
    products,
    loading,
  } = useProducts();

  /*
   * Avis affichés en bas de page. Leur échec ne doit rien casser : la
   * section se masque d'elle-même s'il n'y en a pas.
   */
  const [reviews, setReviews] = React.useState([]);

  React.useEffect(() => {
    let cancelled = false;

    fetch('/api/reviews/latest?limit=12')
      .then(response => (response.ok ? response.json() : []))
      .then(data => {
        if (!cancelled && Array.isArray(data)) {
          setReviews(data);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box
      sx={{
        overflow: 'hidden',
        background: 'var(--pv-canvas)',
      }}
    >

      {/* =====================================================
          HERO
      ===================================================== */}

      <Box
        sx={{
          position: 'relative',
          minHeight: {
            xs: '720px',
            md: '760px',
          },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, #0A0A0A 0%, #181018 45%, #4A1231 100%)',
          color: '#fff',
        }}
      >

        {/* BACKGROUND BLOBS */}

        <Box
          component={motion.div}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236,72,153,0.35), transparent 70%)',
            top: -180,
            right: -100,
            filter: 'blur(20px)',
          }}
        />

        <Box
          component={motion.div}
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          sx={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(168,85,247,0.25), transparent 70%)',
            bottom: -200,
            left: -100,
            filter: 'blur(25px)',
          }}
        />

        {/* GRID EFFECT */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.08,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: 'relative',
            zIndex: 2,
          }}
        >

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                md: '1.05fr 0.95fr',
              },
              alignItems: 'center',
              gap: {
                xs: 5,
                md: 3,
              },
            }}
          >

            {/* HERO TEXT */}

            <Box
              component={motion.div}
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              sx={{
                maxWidth: 700,
              }}
            >

              {/* BADGE */}

              <Box
                component={motion.div}
                variants={fadeUp}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  mb: 3,
                  borderRadius: 10,
                  border:
                    '1px solid rgba(255,255,255,0.18)',
                  background:
                    'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <TrendingUp
                  sx={{
                    fontSize: 16,
                    color: '#F472B6',
                  }}
                />

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                  }}
                >
                  NOUVELLE COLLECTION 2026
                </Typography>
              </Box>


              {/* TITLE */}

              <Typography
                component={motion.h1}
                variants={fadeLeft}
                sx={{
                  fontSize: {
                    xs: '3.5rem',
                    sm: '4.5rem',
                    md: '5.5rem',
                    lg: '6.5rem',
                  },
                  lineHeight: 0.95,
                  fontWeight: 900,
                  letterSpacing: '-4px',
                  mb: 3,
                }}
              >
                Votre style.
                <br />

                <Box
                  component="span"
                  sx={{
                    background:
                      'linear-gradient(90deg, #F472B6, #C084FC)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor:
                      'transparent',
                  }}
                >
                  Votre identité.
                </Box>
              </Typography>


              {/* DESCRIPTION */}

              <Typography
                component={motion.p}
                variants={fadeUp}
                sx={{
                  maxWidth: 560,
                  color: 'var(--pv-line)',
                  fontSize: {
                    xs: 16,
                    md: 18,
                  },
                  lineHeight: 1.7,
                  mb: 4,
                }}
              >
                Découvrez une sélection de vêtements,
                chaussures et accessoires pensés pour
                ceux qui veulent se démarquer.
              </Typography>


              {/* BUTTONS */}

              <Stack
                component={motion.div}
                variants={fadeUp}
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                spacing={2}
              >

                <Button
                  component={Link}
                  to="/shop"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    minHeight: 56,
                    px: 3.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: 15,
                    fontWeight: 800,
                    /*
                     * Le héros reste sombre dans les deux modes : ce
                     * bouton garde donc des teintes fixes, sinon il
                     * devient sombre sur sombre et perd son relief.
                     */
                    color: '#111827',
                    background: 'var(--pv-surface)',

                    '&:hover': {
                      background: 'var(--pv-surface-alt)',
                      transform:
                        'translateY(-3px)',
                    },

                    transition: '0.3s',
                  }}
                >
                  Découvrir la collection
                </Button>


                <Button
                  component={Link}
                  to="/category/Femmes"
                  variant="outlined"
                  size="large"
                  sx={{
                    minHeight: 56,
                    px: 3.5,
                    borderRadius: 3,
                    textTransform: 'none',
                    fontSize: 15,
                    fontWeight: 700,
                    color: '#fff',
                    borderColor:
                      'rgba(255,255,255,0.3)',

                    '&:hover': {
                      borderColor: '#fff',
                      background:
                        'rgba(255,255,255,0.08)',
                    },
                  }}
                >
                  Explorer
                </Button>

              </Stack>


              {/* STATS */}

              <Box
                component={motion.div}
                variants={fadeUp}
                sx={{
                  display: 'flex',
                  gap: {
                    xs: 3,
                    md: 5,
                  },
                  mt: 6,
                  pt: 4,
                  borderTop:
                    '1px solid rgba(255,255,255,0.12)',
                }}
              >

                <Box>
                  <Typography
                    sx={{
                      fontSize: 26,
                      fontWeight: 900,
                    }}
                  >
                    500+
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'var(--pv-muted)',
                    }}
                  >
                    Produits
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 26,
                      fontWeight: 900,
                    }}
                  >
                    4.9/5
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'var(--pv-muted)',
                    }}
                  >
                    Satisfaction
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 26,
                      fontWeight: 900,
                    }}
                  >
                    24/7
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'var(--pv-muted)',
                    }}
                  >
                    Support
                  </Typography>
                </Box>

              </Box>

            </Box>


            {/* HERO VISUAL */}

            <Box
              component={motion.div}
              initial={{
                opacity: 0,
                scale: 0.8,
                x: 80,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
              }}
              transition={{
                duration: 1.1,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              sx={{
                display: {
                  xs: 'none',
                  md: 'flex',
                },
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                minHeight: 550,
              }}
            >

              {/* BIG CIRCLE */}

              <Box
                component={motion.div}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                sx={{
                  position: 'absolute',
                  width: 470,
                  height: 470,
                  borderRadius: '50%',
                  border:
                    '1px solid rgba(255,255,255,0.15)',
                }}
              />

              <Box
                sx={{
                  position: 'absolute',
                  width: 390,
                  height: 390,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, rgba(236,72,153,0.3), rgba(168,85,247,0.2))',
                  filter: 'blur(2px)',
                }}
              />

              {/* PRODUCT IMAGE */}

              <Box
                component={motion.div}
                animate={{
                  y: [0, -18, 0],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                sx={{
                  position: 'relative',
                  zIndex: 3,
                  width: 350,
                  height: 470,
                  borderRadius: '180px 180px 30px 30px',
                  overflow: 'hidden',
                  background:
                    'linear-gradient(145deg, var(--pv-ink), var(--pv-ink))',
                  boxShadow:
                    '0 40px 100px rgba(0,0,0,0.5)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >

                {products?.[0]?.image ? (
                  <Box
                    component="img"
                    src={products[0].image}
                    alt={
                      products[0].name ||
                      'Pivot Store'
                    }
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                ) : (
                  <ShoppingBagOutlined
                    sx={{
                      fontSize: 120,
                      color:
                        'rgba(255,255,255,0.15)',
                    }}
                  />
                )}

              </Box>


              {/* FLOATING CARD */}

              <Box
                component={motion.div}
                animate={{
                  y: [0, -12, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                sx={{
                  position: 'absolute',
                  zIndex: 5,
                  left: 10,
                  bottom: 70,
                  px: 2,
                  py: 1.5,
                  borderRadius: 3,
                  background:
                    'rgba(255,255,255,0.95)',
                  /* Carte posée sur la photo : elle reste blanche dans les deux
                     modes, son texte garde donc des teintes fixes. */
                  color: '#111827',
                  boxShadow:
                    '0 20px 50px rgba(0,0,0,0.25)',
                }}
              >

                <Typography
                  sx={{
                    fontSize: 11,
                    color: '#64748B',
                  }}
                >
                  COLLECTION
                </Typography>

                <Typography
                  sx={{
                    fontSize: 15,
                    fontWeight: 800,
                  }}
                >
                  Premium Style
                </Typography>

              </Box>


              {/* FLOATING SALE */}

              <Box
                component={motion.div}
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                sx={{
                  position: 'absolute',
                  zIndex: 5,
                  right: 0,
                  top: 90,
                  px: 2,
                  py: 1.5,
                  borderRadius: 3,
                  background:
                    'linear-gradient(135deg,#EC4899,#A855F7)',
                  color: '#fff',
                  boxShadow:
                    '0 15px 40px rgba(236,72,153,0.35)',
                }}
              >

                <Typography
                  sx={{
                    fontSize: 11,
                    opacity: 0.8,
                  }}
                >
                  OFFRE
                </Typography>

                <Typography
                  sx={{
                    fontSize: 21,
                    fontWeight: 900,
                  }}
                >
                  -30%
                </Typography>

              </Box>

            </Box>

          </Box>

        </Container>
      </Box>


      {/* =====================================================
          ENGAGEMENTS — frise défilante
      ===================================================== */}

      <ValueTicker />

      {/* =====================================================
          VENTES FLASH
      ===================================================== */}

      <FlashSale products={products} />

      {/* =====================================================
          SUR MESURE — la promesse qui nous distingue
      ===================================================== */}

      <MadeToMeasure />

      {/* =====================================================
          RAYONS
      ===================================================== */}

      <CategoryRail products={products} />

      {/* =====================================================
          NOUVEAUTÉS
      ===================================================== */}

      <NewArrivals products={products} />

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 5,
            md: 7,
          },
        }}
      >

        <Box
          component={motion.div}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          variants={staggerContainer}
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(3, 1fr)',
            },
            gap: 2,
          }}
        >

          {[
            {
              icon: <LocalShippingOutlined />,
              title: 'Livraison rapide',
              text: 'Recevez vos commandes rapidement.',
            },
            {
              icon: <VerifiedOutlined />,
              title: 'Qualité garantie',
              text: 'Des produits sélectionnés avec soin.',
            },
            {
              icon: <ShoppingBagOutlined />,
              title: 'Shopping sécurisé',
              text: 'Commandez simplement et en toute sécurité.',
            },
          ].map((item, index) => (

            <Box
              key={index}
              component={motion.div}
              variants={fadeUp}
              whileHover={{
                y: -6,
              }}
              sx={{
                p: 3,
                borderRadius: 4,
                background: 'var(--pv-surface)',
                border:
                  '1px solid var(--pv-line)',
                transition: '0.3s',
              }}
            >

              <Box
                sx={{
                  width: 46,
                  height: 46,
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mb: 2,
                  background:
                    'rgba(194,24,91,0.08)',
                  color: '#C2185B',
                }}
              >
                {item.icon}
              </Box>

              <Typography
                sx={{
                  fontWeight: 800,
                  mb: 0.5,
                }}
              >
                {item.title}
              </Typography>

              <Typography
                color="text.secondary"
                fontSize={14}
              >
                {item.text}
              </Typography>

            </Box>

          ))}

        </Box>

      </Container>


      {/* =====================================================
          POPULAR PRODUCTS
      ===================================================== */}

      <Box
        sx={{
          background: 'var(--pv-surface)',
          py: {
            xs: 7,
            md: 11,
          },
        }}
      >

        <Container maxWidth="xl">

          <Box
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.3,
            }}
            variants={fadeUp}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: {
                xs: 'flex-start',
                md: 'flex-end',
              },
              flexDirection: {
                xs: 'column',
                md: 'row',
              },
              gap: 2,
              mb: 5,
            }}
          >

            <Box>

              <Typography
                sx={{
                  color: '#C2185B',
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 2,
                  mb: 1,
                }}
              >
                NOS FAVORIS
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    xs: 32,
                    md: 44,
                  },
                  fontWeight: 900,
                  letterSpacing: '-1.5px',
                }}
              >
                Produits populaires
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                  fontSize: 16,
                }}
              >
                Les pièces que tout le monde
                s'arrache.
              </Typography>

            </Box>

            <Button
              component={Link}
              to="/shop"
              endIcon={<ArrowForward />}
              sx={{
                color: 'var(--pv-ink)',
                fontWeight: 700,
                textTransform: 'none',

                '&:hover': {
                  background: 'transparent',
                  color: '#C2185B',
                },
              }}
            >
              Voir toute la boutique
            </Button>

          </Box>


          {loading ? (
            <LoadingScreen />
          ) : (
            <Box
              component={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{
                once: true,
                amount: 0.1,
              }}
              variants={fadeUp}
            >
              <ProductGrid
                products={products.slice(0, 8)}
              />
            </Box>
          )}

        </Container>

      </Box>


      {/* =====================================================
          PROMO BANNER
      ===================================================== */}

      <Container
        maxWidth="xl"
        sx={{
          py: {
            xs: 6,
            md: 10,
          },
        }}
      >

        <Box
          component={motion.div}
          initial={{
            opacity: 0,
            scale: 0.95,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
          }}
          sx={{
            position: 'relative',
            overflow: 'hidden',
            minHeight: {
              xs: 320,
              md: 360,
            },
            borderRadius: {
              xs: 5,
              md: 7,
            },
            background:
              'linear-gradient(135deg,var(--pv-ink),#3F1027,#831843)',
            display: 'flex',
            alignItems: 'center',
            px: {
              xs: 4,
              md: 8,
            },
          }}
        >

          {/* DECORATION */}

          <Box
            sx={{
              position: 'absolute',
              width: 400,
              height: 400,
              borderRadius: '50%',
              right: -100,
              top: -150,
              background:
                'rgba(236,72,153,0.25)',
              filter: 'blur(30px)',
            }}
          />

          <Box
            sx={{
              position: 'relative',
              zIndex: 2,
              maxWidth: 650,
            }}
          >

            <Typography
              sx={{
                color: '#F9A8D4',
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: 2,
                mb: 2,
              }}
            >
              OFFRE EXCLUSIVE
            </Typography>

            <Typography
              sx={{
                color: '#fff',
                fontWeight: 900,
                fontSize: {
                  xs: 34,
                  md: 52,
                },
                lineHeight: 1,
                letterSpacing: '-2px',
              }}
            >
              Jusqu'à -30%
              <br />
              sur votre style.
            </Typography>

            <Typography
              sx={{
                color: 'var(--pv-line)',
                mt: 2,
                mb: 3,
              }}
            >
              Profitez de nos meilleures offres
              avant qu'elles ne disparaissent.
            </Typography>

            <Button
              component={Link}
              to="/shop"
              variant="contained"
              endIcon={<ArrowForward />}
              sx={{
                background: 'var(--pv-surface)',
                color: 'var(--pv-ink)',
                px: 3,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 800,
                textTransform: 'none',

                '&:hover': {
                  background: 'var(--pv-surface-alt)',
                },
              }}
            >
              Profiter de l'offre
            </Button>

          </Box>

        </Box>

      </Container>


      {/* =====================================================
          PAROLES DE CLIENTS
      ===================================================== */}

      <Testimonials reviews={reviews} />

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <Box
        sx={{
          py: {
            xs: 9,
            md: 13,
          },
          background: 'var(--pv-surface-alt)',
          textAlign: 'center',
        }}
      >

        <Container maxWidth="md">

          <Box
            component={motion.div}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
            }}
            variants={fadeUp}
          >

            <Typography
              sx={{
                fontSize: {
                  xs: 36,
                  md: 58,
                },
                fontWeight: 900,
                letterSpacing: '-2px',
                lineHeight: 1,
              }}
            >
              Prêt à changer
              <br />

              <Box
                component="span"
                sx={{
                  color: '#C2185B',
                }}
              >
                votre style ?
              </Box>
            </Typography>

            <Typography
              color="text.secondary"
              sx={{
                mt: 2,
                mb: 4,
                fontSize: 17,
              }}
            >
              Votre prochaine pièce préférée
              vous attend.
            </Typography>

            <Button
              component={Link}
              to="/shop"
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                px: 4,
                py: 1.8,
                borderRadius: 3,
                background: 'var(--pv-band)',
                color: '#fff',
                fontWeight: 800,
                textTransform: 'none',

                '&:hover': {
                  background: '#C2185B',
                  transform:
                    'translateY(-3px)',
                },

                transition: '0.3s',
              }}
            >
              Commencer le shopping
            </Button>

          </Box>

        </Container>

      </Box>

    </Box>
  );
}

export default Home;