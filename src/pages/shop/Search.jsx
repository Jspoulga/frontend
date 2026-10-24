import React from 'react';

import {
  Box,
  Container,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Paper,
  Stack,
  Chip,
} from '@mui/material';

import {
  Search as SearchIcon,
  Close,
  ArrowBack,
  ArrowForward,
  ShoppingBagOutlined,
} from '@mui/icons-material';

import {
  useSearchParams,
  Link,
} from 'react-router-dom';

import useProducts from '../../hooks/useProducts';
import ProductGrid from '../../components/product/ProductGrid';


function Search() {
  const [params, setParams] =
    useSearchParams();

  const query = params.get('q') || '';

  const {
    products,
  } = useProducts();


  // ==========================================================
  // SEARCH RESULTS
  // ==========================================================

  const normalizedQuery =
    query.trim().toLowerCase();

  const results = products.filter(product => {
    const name =
      product.name?.toLowerCase() || '';

    const category =
      product.category?.toLowerCase() || '';

    const description =
      product.description?.toLowerCase() || '';

    return (
      name.includes(normalizedQuery) ||
      category.includes(normalizedQuery) ||
      description.includes(normalizedQuery)
    );
  });


  // ==========================================================
  // HANDLE SEARCH
  // ==========================================================

  const handleSearch = value => {
    setParams({
      q: value,
    });
  };


  // ==========================================================
  // CLEAR SEARCH
  // ==========================================================

  const clearSearch = () => {
    setParams({});
  };


  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--pv-canvas)',
        pb: 12,
        overflow: 'hidden',
      }}
    >

      {/* =====================================================
          HERO SEARCH
      ===================================================== */}

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, #111111 0%, #24111C 50%, #581C3D 100%)',
          color: '#fff',
          py: {
            xs: 7,
            md: 10,
          },

          '&::before': {
            content: '""',
            position: 'absolute',
            width: 500,
            height: 500,
            borderRadius: '50%',
            top: -300,
            right: -100,
            background:
              'rgba(236,72,153,0.22)',
            filter: 'blur(40px)',
          },

          '&::after': {
            content: '""',
            position: 'absolute',
            width: 350,
            height: 350,
            borderRadius: '50%',
            bottom: -250,
            left: -100,
            background:
              'rgba(168,85,247,0.18)',
            filter: 'blur(40px)',
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

          {/* SMALL LABEL */}

          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 1.8,
              py: 0.8,
              borderRadius: 10,
              mb: 2,
              border:
                '1px solid rgba(255,255,255,0.15)',
              background:
                'rgba(255,255,255,0.07)',
              backdropFilter: 'blur(10px)',
            }}
          >

            <SearchIcon
              sx={{
                fontSize: 16,
                color: '#F472B6',
              }}
            />

            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: 1.5,
              }}
            >
              RECHERCHE PIVOT STORE
            </Typography>

          </Box>


          {/* TITLE */}

          <Typography
            sx={{
              fontSize: {
                xs: 42,
                md: 64,
              },
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: '-3px',
              maxWidth: 800,
            }}
          >
            Trouvez votre
            <br />

            <Box
              component="span"
              sx={{
                background:
                  'linear-gradient(90deg,#F472B6,#C084FC)',
                WebkitBackgroundClip:
                  'text',
                WebkitTextFillColor:
                  'transparent',
              }}
            >
              prochaine pièce.
            </Box>
          </Typography>


          <Typography
            sx={{
              mt: 2,
              maxWidth: 600,
              color: 'var(--pv-line)',
              fontSize: {
                xs: 15,
                md: 17,
              },
              lineHeight: 1.7,
            }}
          >
            Recherchez parmi nos vêtements,
            chaussures et accessoires pour
            trouver exactement ce qu'il vous faut.
          </Typography>


          {/* =================================================
              SEARCH INPUT
          ================================================= */}

          <Paper
            elevation={0}
            sx={{
              mt: 4,
              maxWidth: 760,
              borderRadius: 4,
              background: 'var(--pv-surface)',
              overflow: 'hidden',
              boxShadow:
                '0 25px 70px rgba(0,0,0,0.3)',
              transition: '0.3s',

              '&:focus-within': {
                transform:
                  'translateY(-2px)',
                boxShadow:
                  '0 30px 80px rgba(0,0,0,0.4)',
              },
            }}
          >

            <TextField
              fullWidth
              variant="standard"
              value={query}
              onChange={e =>
                handleSearch(
                  e.target.value
                )
              }
              placeholder="Que recherchez-vous ?"
             
              sx={{
                '& .MuiInputBase-root': {
                  minHeight: 68,
                  fontSize: {
                    xs: 15,
                    md: 17,
                  },
                },

                '& input': {
                  py: 1,
                },

                '& input::placeholder': {
                  color: 'var(--pv-muted)',
                  opacity: 1,
                },
              }}
          slotProps={{
            input: {
                disableUnderline: true,

                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{
                        ml: 2,
                        color: 'var(--pv-muted)',
                      }}
                    />
                  </InputAdornment>
                ),

                endAdornment: query && (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={clearSearch}
                      sx={{
                        mr: 1,
                        color: 'var(--pv-muted)',
                      }}
                    >
                      <Close />
                    </IconButton>
                  </InputAdornment>
                ),
              },
          }}
        />

          </Paper>


          {/* QUICK SEARCH */}

          <Stack
            direction="row"
            spacing={1}
           
            useFlexGap
            sx={{ flexWrap: 'wrap', 
              mt: 2,
            }}
          >

            <Typography
              sx={{
                fontSize: 12,
                color: 'var(--pv-muted)',
                alignSelf: 'center',
                mr: 0.5,
              }}
            >
              Suggestions :
            </Typography>

            {[
              'T-shirt',
              'Chaussures',
              'Robe',
              'Veste',
            ].map(item => (

              <Chip
                key={item}
                label={item}
                onClick={() =>
                  handleSearch(item)
                }
                sx={{
                  color: '#fff',
                  border:
                    '1px solid rgba(255,255,255,0.15)',
                  background:
                    'rgba(255,255,255,0.06)',
                  fontSize: 12,

                  '&:hover': {
                    background:
                      'rgba(255,255,255,0.12)',
                  },
                }}
              />

            ))}

          </Stack>

        </Container>
      </Box>


      {/* =====================================================
          RESULTS
      ===================================================== */}

      <Container
        maxWidth="xl"
        sx={{
          pt: {
            xs: 6,
            md: 9,
          },
        }}
      >

        {/* RESULT HEADER */}

        <Box
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
            gap: 3,
            mb: 5,
          }}
        >

          <Box>

            {query ? (
              <>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    color: '#C2185B',
                    mb: 1,
                  }}
                >
                  RÉSULTATS DE RECHERCHE
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 30,
                      md: 42,
                    },
                    fontWeight: 900,
                    letterSpacing: '-1.5px',
                  }}
                >
                  « {query} »
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    fontSize: 14,
                  }}
                >
                  {results.length}{' '}
                  {results.length > 1
                    ? 'produits trouvés'
                    : 'produit trouvé'}
                </Typography>
              </>
            ) : (
              <>
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 800,
                    letterSpacing: 1.5,
                    color: '#C2185B',
                    mb: 1,
                  }}
                >
                  EXPLOREZ NOTRE COLLECTION
                </Typography>

                <Typography
                  sx={{
                    fontSize: {
                      xs: 30,
                      md: 42,
                    },
                    fontWeight: 900,
                    letterSpacing: '-1.5px',
                  }}
                >
                  Tous nos produits
                </Typography>

                <Typography
                  color="text.secondary"
                  sx={{
                    mt: 1,
                    fontSize: 14,
                  }}
                >
                  Découvrez notre sélection
                  complète.
                </Typography>
              </>
            )}

          </Box>


          {/* BACK TO SHOP */}

          <Button
            component={Link}
            to="/shop"
            startIcon={<ArrowBack />}
            sx={{
              color: 'var(--pv-ink)',
              fontWeight: 700,
              textTransform: 'none',
              borderRadius: 2,

              '&:hover': {
                background: '#F0F0F0',
              },
            }}
          >
            Retour à la boutique
          </Button>

        </Box>


        {/* =================================================
            RESULT SUMMARY CARD
        ================================================= */}

        {query && results.length > 0 && (
          <Box
            sx={{
              mb: 4,
              p: 2,
              px: 2.5,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              borderRadius: 3,
              background: 'var(--pv-surface)',
              border:
                '1px solid var(--pv-line)',
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
                background:
                  'rgba(194,24,91,0.08)',
                color: '#C2185B',
              }}
            >
              <ShoppingBagOutlined
                sx={{ fontSize: 20 }}
              />
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography
                sx={{
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                Nous avons trouvé
                exactement ce que vous cherchez.
              </Typography>

              <Typography
                sx={{
                  fontSize: 12,
                  color: 'var(--pv-muted)',
                  mt: 0.2,
                }}
              >
                Explorez les produits
                correspondant à votre recherche.
              </Typography>
            </Box>

          </Box>
        )}


        {/* =================================================
            PRODUCTS
        ================================================= */}

        {results.length > 0 ? (

          <Box
            sx={{
              animation:
                'fadeIn 0.5s ease',

              '@keyframes fadeIn': {
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
            <ProductGrid
              products={results}
            />
          </Box>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

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

            <Box
              sx={{
                maxWidth: 500,
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
                  background:
                    'rgba(194,24,91,0.08)',
                  color: '#C2185B',
                }}
              >
                <SearchIcon
                  sx={{ fontSize: 42 }}
                />
              </Box>


              <Typography
                sx={{
                  fontSize: 28,
                  fontWeight: 900,
                  mb: 1,
                }}
              >
                Aucun résultat
              </Typography>


              <Typography
                color="text.secondary"
                sx={{
                  lineHeight: 1.7,
                  mb: 3,
                }}
              >
                Nous n'avons trouvé aucun
                produit correspondant à
                « {query} ».
                <br />
                Essayez avec un autre terme.
              </Typography>


              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                spacing={1.5} sx={{ justifyContent: 'center' }}>

                <Button
                  variant="contained"
                  onClick={clearSearch}
                  endIcon={<ArrowForward />}
                  sx={{
                    px: 3,
                    py: 1.4,
                    borderRadius: 3,
                    background: 'var(--pv-band)',
                    color: '#fff',
                    fontWeight: 800,
                    textTransform: 'none',

                    '&:hover': {
                      background: '#C2185B',
                    },
                  }}
                >
                  Voir tous les produits
                </Button>

                <Button
                  component={Link}
                  to="/shop"
                  variant="outlined"
                  sx={{
                    px: 3,
                    py: 1.4,
                    borderRadius: 3,
                    color: 'var(--pv-ink)',
                    borderColor: 'var(--pv-line)',
                    fontWeight: 700,
                    textTransform: 'none',
                  }}
                >
                  Boutique
                </Button>

              </Stack>

            </Box>

          </Box>

        )}

      </Container>

    </Box>
  );
}

export default Search;