import React, { useMemo, useState } from 'react';

import {
  Container,
  Typography,
  Box,
  MenuItem,
  Button,
  Chip,
  Stack,
  Divider,
  IconButton,
  Paper,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';

import {
  TuneRounded,
  KeyboardArrowDownRounded,
  CloseRounded,
  GridViewRounded,
  ViewListRounded,
  AutoAwesomeRounded,
  LocalShippingOutlined,
  ReplayRounded,
  VerifiedOutlined,
} from '@mui/icons-material';

import useProducts from '../../hooks/useProducts';
import ProductGrid from '../../components/product/ProductGrid';
import ProductGridSkeleton from '../../components/product/ProductGridSkeleton';

import { CATEGORIES } from '../../utils/constants';

function Shop() {
  const { products, loading } = useProducts();

  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('default');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  /* Source unique : ajouter une catégorie dans constants suffit. */
  const categories = CATEGORIES;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category) {
      result = result.filter(
        product => product.category === category
      );
    }

    if (sort === 'price-low') {
      result.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    }

    if (sort === 'price-high') {
      result.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }

    if (sort === 'rating') {
      result.sort(
        (a, b) =>
          Number(b.rating || 0) -
          Number(a.rating || 0)
      );
    }

    return result;
  }, [products, category, sort]);

  const resetFilters = () => {
    setCategory('');
    setSort('default');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'var(--pv-canvas)',
        pb: { xs: 8, md: 12 },
      }}
    >
      {/* ================================================= */}
      {/* HERO */}
      {/* ================================================= */}

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, #080808 0%, #151515 45%, #260d1b 100%)',
          color: '#fff',
          mb: { xs: 4, md: 7 },
        }}
      >
        {/* Glow 1 */}
        <Box
          sx={{
            position: 'absolute',
            width: 420,
            height: 420,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(255,45,130,.28), transparent 68%)',
            top: -220,
            right: -80,
            filter: 'blur(20px)',
            animation: 'floatGlow 7s ease-in-out infinite',
            '@keyframes floatGlow': {
              '0%, 100%': {
                transform: 'translate(0, 0)',
              },
              '50%': {
                transform: 'translate(-30px, 30px)',
              },
            },
          }}
        />

        {/* Glow 2 */}
        <Box
          sx={{
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(126,34,206,.20), transparent 70%)',
            bottom: -180,
            left: '20%',
            filter: 'blur(25px)',
          }}
        />

        {/* Grid pattern */}
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
              xs: 6,
              sm: 7,
              md: 9,
            },
          }}
        >
          <Box
            sx={{
              maxWidth: 850,
              animation:
                'heroAppear .8s ease forwards',
              '@keyframes heroAppear': {
                from: {
                  opacity: 0,
                  transform: 'translateY(25px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            {/* Small label */}
            <Stack
              direction="row"
              spacing={1}
             
              sx={{ alignItems: 'center',  mb: 2 }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: '#ff2d82',
                  boxShadow:
                    '0 0 15px rgba(255,45,130,.8)',
                }}
              />

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: 3,
                  color: 'rgba(255,255,255,.65)',
                }}
              >
                PIVOT STORE COLLECTION
              </Typography>
            </Stack>

            {/* Title */}
            <Typography
              sx={{
                fontSize: {
                  xs: '2.7rem',
                  sm: '3.8rem',
                  md: '5.2rem',
                },
                lineHeight: 0.95,
                fontWeight: 950,
                letterSpacing: '-.055em',
                maxWidth: 800,
              }}
            >
              Votre style.
              <br />
              <Box
                component="span"
                sx={{
                  background:
                    'linear-gradient(90deg, #ff4f9a, #ff9ac4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Votre signature.
              </Box>
            </Typography>

            <Typography
              sx={{
                mt: 3,
                maxWidth: 580,
                color: 'rgba(255,255,255,.68)',
                fontSize: {
                  xs: 15,
                  md: 18,
                },
                lineHeight: 1.7,
              }}
            >
              Découvrez notre sélection de pièces
              soigneusement choisies pour créer des
              looks qui vous ressemblent.
            </Typography>

            {/* Stats */}
            <Stack
              direction="row"
              spacing={{ xs: 3, md: 5 }}
              sx={{ mt: 4 }}
            >
              <Box>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: 25,
                  }}
                >
                  {products.length}+
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color:
                      'rgba(255,255,255,.5)',
                  }}
                >
                  Produits
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: 25,
                  }}
                >
                  24/7
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color:
                      'rgba(255,255,255,.5)',
                  }}
                >
                  Disponibilité
                </Typography>
              </Box>

              <Box>
                <Typography
                  sx={{
                    fontWeight: 900,
                    fontSize: 25,
                  }}
                >
                  100%
                </Typography>

                <Typography
                  sx={{
                    fontSize: 12,
                    color:
                      'rgba(255,255,255,.5)',
                  }}
                >
                  Style
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* ================================================= */}
      {/* CONTENT */}
      {/* ================================================= */}

      <Container maxWidth="xl">
        {/* TOP HEADER */}
        <Box
          sx={{
            display: 'flex',
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
            justifyContent: 'space-between',
            gap: 3,
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            mb: 3,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 27,
                  md: 36,
                },
                fontWeight: 950,
                letterSpacing: '-.04em',
                color: 'var(--pv-ink)',
              }}
            >
              La collection
            </Typography>

            <Typography
              sx={{
                mt: 0.5,
                color: 'var(--pv-muted)',
                fontSize: 14,
              }}
            >
              {loading
                ? 'Chargement de la collection...'
                : `${filteredProducts.length} produit${
                    filteredProducts.length > 1
                      ? 's'
                      : ''
                  } disponible${
                    filteredProducts.length > 1
                      ? 's'
                      : ''
                  }`}
            </Typography>
          </Box>

          {/* View mode */}
          <Paper
            elevation={0}
            sx={{
              display: 'flex',
              p: 0.5,
              borderRadius: 3,
              border: '1px solid var(--pv-line)',
              bgcolor: 'var(--pv-surface)',
            }}
          >
            <IconButton
              size="small"
              onClick={() =>
                setViewMode('grid')
              }
              sx={{
                borderRadius: 2,
                bgcolor:
                  viewMode === 'grid'
                    ? 'var(--pv-band)'
                    : 'transparent',
                color:
                  viewMode === 'grid'
                    ? '#fff'
                    : 'var(--pv-muted)',
                '&:hover': {
                  bgcolor:
                    viewMode === 'grid'
                      ? 'var(--pv-band)'
                      : 'var(--pv-surface-alt)',
                },
              }}
            >
              <GridViewRounded fontSize="small" />
            </IconButton>

            <IconButton
              size="small"
              onClick={() =>
                setViewMode('list')
              }
              sx={{
                borderRadius: 2,
                bgcolor:
                  viewMode === 'list'
                    ? 'var(--pv-band)'
                    : 'transparent',
                color:
                  viewMode === 'list'
                    ? '#fff'
                    : 'var(--pv-muted)',
                '&:hover': {
                  bgcolor:
                    viewMode === 'list'
                      ? 'var(--pv-band)'
                      : 'var(--pv-surface-alt)',
                },
              }}
            >
              <ViewListRounded fontSize="small" />
            </IconButton>
          </Paper>
        </Box>

        {/* ================================================= */}
        {/* CATEGORY CHIPS */}
        {/* ================================================= */}

        <Box
          sx={{
            display: 'flex',
            gap: 1.2,
            overflowX: 'auto',
            pb: 1.5,
            mb: 2,
            scrollbarWidth: 'none',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          <Chip
            label="Tout"
            clickable
            onClick={() => setCategory('')}
            sx={{
              height: 43,
              px: 1,
              borderRadius: 999,
              fontWeight: 800,
              bgcolor:
                category === ''
                  ? 'var(--pv-band)'
                  : 'var(--pv-surface)',
              color:
                category === ''
                  ? '#fff'
                  : 'var(--pv-body)',
              border:
                category === ''
                  ? '1px solid var(--pv-ink)'
                  : '1px solid var(--pv-line)',
              '&:hover': {
                bgcolor:
                  category === ''
                    ? 'var(--pv-band)'
                    : 'var(--pv-surface-alt)',
              },
            }}
          />

          {categories.map(item => (
            <Chip
              key={item}
              label={item}
              clickable
              onClick={() =>
                setCategory(item)
              }
              sx={{
                height: 43,
                px: 1,
                borderRadius: 999,
                fontWeight: 800,
                bgcolor:
                  category === item
                    ? 'var(--pv-band)'
                    : 'var(--pv-surface)',
                color:
                  category === item
                    ? '#fff'
                    : 'var(--pv-body)',
                border:
                  category === item
                    ? '1px solid var(--pv-ink)'
                    : '1px solid var(--pv-line)',
                '&:hover': {
                  bgcolor:
                    category === item
                      ? 'var(--pv-band)'
                      : 'var(--pv-surface-alt)',
                },
              }}
            />
          ))}
        </Box>

        {/* ================================================= */}
        {/* FILTER BAR */}
        {/* ================================================= */}

        <Paper
          elevation={0}
          sx={{
            mb: 4,
            p: {
              xs: 1.5,
              md: 2,
            },
            borderRadius: 4,
            border: '1px solid var(--pv-line)',
            bgcolor: 'var(--pv-surface)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              flexWrap: 'wrap',
            }}
          >
            {/* Mobile filter */}
            <Button
              variant="outlined"
              startIcon={<TuneRounded />}
              onClick={() =>
                setShowFilters(!showFilters)
              }
              sx={{
                display: {
                  xs: 'flex',
                  md: 'none',
                },
                height: 46,
                borderRadius: 3,
                borderColor: 'var(--pv-line)',
                color: 'var(--pv-ink)',
                fontWeight: 800,
                textTransform: 'none',
              }}
            >
              Filtres
            </Button>

            {/* Desktop category */}
            <FormControl
              size="small"
              sx={{
                minWidth: 180,
                display: {
                  xs: showFilters
                    ? 'flex'
                    : 'none',
                  md: 'flex',
                },
              }}
            >
              <InputLabel>
                Catégorie
              </InputLabel>

              <Select
                value={category}
                label="Catégorie"
                onChange={e =>
                  setCategory(e.target.value)
                }
                sx={{
                  borderRadius: 3,
                  '& .MuiOutlinedInput-notchedOutline':
                    {
                      borderColor: '#e2e2e2',
                    },
                }}
                IconComponent={
                  KeyboardArrowDownRounded
                }
              >
                <MenuItem value="">
                  Toutes les catégories
                </MenuItem>

                {categories.map(item => (
                  <MenuItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Sort */}
            <FormControl
              size="small"
              sx={{
                minWidth: 210,
                display: {
                  xs: showFilters
                    ? 'flex'
                    : 'none',
                  md: 'flex',
                },
              }}
            >
              <InputLabel>
                Trier par
              </InputLabel>

              <Select
                value={sort}
                label="Trier par"
                onChange={e =>
                  setSort(e.target.value)
                }
                sx={{
                  borderRadius: 3,
                  '& .MuiOutlinedInput-notchedOutline':
                    {
                      borderColor: '#e2e2e2',
                    },
                }}
                IconComponent={
                  KeyboardArrowDownRounded
                }
              >
                <MenuItem value="default">
                  Pertinence
                </MenuItem>

                <MenuItem value="price-low">
                  Prix : croissant
                </MenuItem>

                <MenuItem value="price-high">
                  Prix : décroissant
                </MenuItem>

                <MenuItem value="rating">
                  Meilleures notes
                </MenuItem>
              </Select>
            </FormControl>

            {/* Active filter */}
            {category && (
              <Chip
                label={category}
                onDelete={() =>
                  setCategory('')
                }
                deleteIcon={
                  <CloseRounded />
                }
                sx={{
                  height: 42,
                  borderRadius: 3,
                  bgcolor: 'var(--pv-accent-soft)',
                  color: '#e91e73',
                  fontWeight: 800,
                  border:
                    '1px solid #ffd0e2',
                }}
              />
            )}

            {/* Reset */}
            {(category ||
              sort !== 'default') && (
              <Button
                onClick={resetFilters}
                sx={{
                  color: 'var(--pv-muted)',
                  textTransform: 'none',
                  fontWeight: 700,
                  ml: {
                    xs: 0,
                    md: 'auto',
                  },
                }}
              >
                Réinitialiser
              </Button>
            )}
          </Box>
        </Paper>

        {/* ================================================= */}
        {/* BENEFITS */}
        {/* ================================================= */}

        <Box
          sx={{
            display: {
              xs: 'none',
              md: 'grid',
            },
            gridTemplateColumns:
              'repeat(3, 1fr)',
            gap: 2,
            mb: 5,
          }}
        >
          <Benefit
            icon={<LocalShippingOutlined />}
            title="Livraison rapide"
            text="Recevez vos commandes rapidement."
          />

          <Benefit
            icon={<ReplayRounded />}
            title="Retours faciles"
            text="Une expérience simple et sans stress."
          />

          <Benefit
            icon={<VerifiedOutlined />}
            title="Qualité garantie"
            text="Des produits sélectionnés avec soin."
          />
        </Box>

        {/* Divider */}
        <Divider sx={{ mb: 4 }} />

        {/* ================================================= */}
        {/* PRODUCTS */}
        {/* ================================================= */}

        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : filteredProducts.length === 0 ? (
          <EmptyState
            resetFilters={resetFilters}
          />
        ) : (
          <Box
            sx={{
              animation:
                'productsAppear .5s ease',
              '@keyframes productsAppear': {
                from: {
                  opacity: 0,
                  transform: 'translateY(15px)',
                },
                to: {
                  opacity: 1,
                  transform: 'translateY(0)',
                },
              },
            }}
          >
            <ProductGrid
              products={filteredProducts}
            />
          </Box>
        )}

        {/* ================================================= */}
        {/* BOTTOM PROMO */}
        {/* ================================================= */}

        {!loading &&
          filteredProducts.length > 0 && (
            <Box
              sx={{
                mt: 8,
                position: 'relative',
                overflow: 'hidden',
                borderRadius: {
                  xs: 4,
                  md: 6,
                },
                background:
                  'linear-gradient(120deg, var(--pv-ink) 0%, #21121a 100%)',
                color: '#fff',
                p: {
                  xs: 4,
                  md: 6,
                },
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  width: 280,
                  height: 280,
                  borderRadius: '50%',
                  background:
                    'rgba(255,45,130,.18)',
                  filter: 'blur(60px)',
                  right: -70,
                  top: -100,
                }}
              />

              <Box
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  maxWidth: 700,
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                 
                  sx={{ alignItems: 'center',  mb: 2 }}
                >
                  <AutoAwesomeRounded
                    sx={{
                      color: '#ff4f9a',
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 900,
                      letterSpacing: 2,
                      color: '#ff82b4',
                    }}
                  >
                    PIVOT STORE EXCLUSIVE
                  </Typography>
                </Stack>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 28,
                      md: 40,
                    },
                    fontWeight: 950,
                    letterSpacing: '-.04em',
                  }}
                >
                  Le style n'attend pas.
                </Typography>

                <Typography
                  sx={{
                    mt: 1.5,
                    color:
                      'rgba(255,255,255,.6)',
                    lineHeight: 1.7,
                    maxWidth: 550,
                  }}
                >
                  Explorez nos dernières pièces et
                  trouvez celles qui correspondent à
                  votre personnalité.
                </Typography>

                <Button
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    })
                  }
                  sx={{
                    mt: 3,
                    px: 3,
                    height: 48,
                    borderRadius: 999,
                    bgcolor: 'var(--pv-surface)',
                    color: 'var(--pv-ink)',
                    fontWeight: 900,
                    textTransform: 'none',
                    '&:hover': {
                      bgcolor: 'var(--pv-surface-alt)',
                      transform:
                        'translateY(-2px)',
                    },
                    transition:
                      'all .25s ease',
                  }}
                >
                  Explorer la collection
                </Button>
              </Box>
            </Box>
          )}
      </Container>
    </Box>
  );
}

/* ================================================= */
/* BENEFIT COMPONENT */
/* ================================================= */

function Benefit({ icon, title, text }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.2,
        borderRadius: 4,
        border: '1px solid var(--pv-line)',
        bgcolor: 'var(--pv-surface)',
        display: 'flex',
        alignItems: 'center',
        gap: 1.8,
        transition:
          'transform .25s ease, box-shadow .25s ease',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow:
            '0 15px 35px rgba(0,0,0,.07)',
        },
      }}
    >
      <Box
        sx={{
          width: 46,
          height: 46,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'var(--pv-accent-soft)',
          color: '#e91e73',
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
            color: 'var(--pv-muted)',
            fontSize: 12,
            mt: 0.3,
          }}
        >
          {text}
        </Typography>
      </Box>
    </Paper>
  );
}

/* ================================================= */
/* EMPTY STATE */
/* ================================================= */

function EmptyState({ resetFilters }) {
  return (
    <Box
      sx={{
        minHeight: 420,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        px: 2,
      }}
    >
      <Box>
        <Box
          sx={{
            width: 85,
            height: 85,
            mx: 'auto',
            mb: 3,
            borderRadius: '50%',
            bgcolor: '#f3f3f3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 35,
          }}
        >
          ✨
        </Box>

        <Typography
          sx={{
            fontSize: 26,
            fontWeight: 950,
            color: 'var(--pv-ink)',
            letterSpacing: '-.03em',
          }}
        >
          Aucun produit trouvé
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: 'var(--pv-muted)',
            maxWidth: 420,
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          Nous n'avons trouvé aucun produit
          correspondant à vos filtres.
        </Typography>

        <Button
          onClick={resetFilters}
          sx={{
            mt: 3,
            px: 3,
            height: 46,
            borderRadius: 999,
            bgcolor: 'var(--pv-band)',
            color: '#fff',
            fontWeight: 800,
            textTransform: 'none',
            '&:hover': {
              bgcolor: 'var(--pv-band)',
            },
          }}
        >
          Voir toute la collection
        </Button>
      </Box>
    </Box>
  );
}

export default Shop;