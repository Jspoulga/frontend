import React, { useEffect, useState } from 'react';

import {
  Container,
  Box,
  Typography,
  Button,
  Stack,
  Chip,
  Rating,
  Divider,
  IconButton,
  Paper,
  Breadcrumbs,
  Link as MuiLink,
} from '@mui/material';

import {
  ShoppingBagOutlined,
  Favorite,
  FavoriteBorder,
  LocalShippingOutlined,
  VerifiedOutlined,
  ReplayOutlined,
  Add,
  Remove,
  ArrowBackIosNew,
  ArrowForwardIos,
  Check,
} from '@mui/icons-material';

import {
  useParams,
  useNavigate,
  Link,
} from 'react-router-dom';

import { useDispatch } from 'react-redux';

import productService from '../../services/productService';

import {
  addToCart,
} from '../../store/slices/cartSlice';

import {
  toggleWishlist,
} from '../../store/slices/wishlistSlice';

import ProductPrice from '../../components/product/ProductPrice';
import LoadingScreen from '../../components/common/LoadingScreen';
import ProductReviews from '../../components/product/ProductReviews';


function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const [activeImage, setActiveImage] = useState(0);

  const [wishlist, setWishlist] = useState(false);


  // ==========================================================
  // LOAD PRODUCT
  // ==========================================================

  useEffect(() => {
    const load = async () => {
      try {
        const data =
          await productService.getProduct(id);

        setProduct(data);
      } catch (error) {
        console.error(
          'Erreur chargement produit:',
          error
        );
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return <LoadingScreen />;
  }


  // ==========================================================
  // PRODUCT NOT FOUND
  // ==========================================================

  if (!product) {
    return (
      <Container
        maxWidth="xl"
        sx={{
          py: 15,
          textAlign: 'center',
        }}
      >
        <Typography
          sx={{
            fontSize: 32,
            fontWeight: 800,
            mb: 2,
          }}
        >
          Produit introuvable
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Ce produit n'existe plus ou
          n'est plus disponible.
        </Typography>

        <Button
          variant="contained"
          component={Link}
          to="/shop"
          sx={{
            borderRadius: 3,
            px: 4,
            py: 1.5,
            textTransform: 'none',
            fontWeight: 700,
          }}
        >
          Retour à la boutique
        </Button>
      </Container>
    );
  }


  // ==========================================================
  // IMAGES
  // ==========================================================

  const images = [
    product.image,
    ...(product.images || []),
  ].filter(Boolean);

  const currentImage =
    images[activeImage] || product.image;


  // ==========================================================
  // QUANTITY
  // ==========================================================

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity(prev =>
      prev > 1 ? prev - 1 : 1
    );
  };


  // ==========================================================
  // IMAGE NAVIGATION
  // ==========================================================

  const previousImage = () => {
    setActiveImage(prev =>
      prev === 0
        ? images.length - 1
        : prev - 1
    );
  };

  const nextImage = () => {
    setActiveImage(prev =>
      prev === images.length - 1
        ? 0
        : prev + 1
    );
  };


  // ==========================================================
  // ADD CART
  // ==========================================================

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        ...product,
        quantity,
        selectedSize: size,
      })
    );

    navigate('/cart');
  };


  // ==========================================================
  // WISHLIST
  // ==========================================================

  const handleWishlist = () => {
    dispatch(toggleWishlist(product));
    setWishlist(prev => !prev);
  };


  return (
    <Box
      sx={{
        background: 'var(--pv-canvas)',
        minHeight: '100vh',
        pb: 12,
      }}
    >

      {/* =====================================================
          BREADCRUMBS
      ===================================================== */}

      <Container
        maxWidth="xl"
        sx={{ pt: 3 }}
      >
        <Breadcrumbs
          sx={{
            fontSize: 13,
            color: 'var(--pv-muted)',
          }}
        >
          <MuiLink
            component={Link}
            to="/"
            underline="hover"
            color="inherit"
          >
            Accueil
          </MuiLink>

          <MuiLink
            component={Link}
            to="/shop"
            underline="hover"
            color="inherit"
          >
            Boutique
          </MuiLink>

          <Typography
            sx={{
              fontSize: 13,
              color: 'var(--pv-ink)',
              fontWeight: 600,
            }}
          >
            {product.name}
          </Typography>
        </Breadcrumbs>
      </Container>


      {/* =====================================================
          PRODUCT
      ===================================================== */}

      <Container
        maxWidth="xl"
        sx={{ mt: 4 }}
      >

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              md: '1.1fr 0.9fr',
            },
            gap: {
              xs: 4,
              md: 8,
            },
            alignItems: 'start',
          }}
        >


          {/* =================================================
              LEFT — GALLERY
          ================================================= */}

          <Box>

            {/* MAIN IMAGE */}

            <Paper
              elevation={0}
              sx={{
                position: 'relative',
                overflow: 'hidden',
                borderRadius: {
                  xs: 4,
                  md: 6,
                },
                background: '#F2F2F2',
                border:
                  '1px solid var(--pv-line)',
                aspectRatio: '1 / 1',
              }}
            >

              <Box
                component="img"
                src={currentImage}
                alt={product.name}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition:
                    'transform 0.6s cubic-bezier(.2,.8,.2,1)',

                  '&:hover': {
                    transform: 'scale(1.04)',
                  },
                }}
              />


              {/* SALE BADGE */}

              {product.oldPrice && (
                <Chip
                  label="PROMOTION"
                  sx={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    background: 'var(--pv-band)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 11,
                    letterSpacing: 1,
                    borderRadius: 2,
                  }}
                />
              )}


              {/* WISHLIST */}

              <IconButton
                onClick={handleWishlist}
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  width: 48,
                  height: 48,
                  background:
                    'rgba(255,255,255,0.92)',
                  backdropFilter:
                    'blur(10px)',
                  boxShadow:
                    '0 8px 25px rgba(0,0,0,0.12)',

                  '&:hover': {
                    background: 'var(--pv-surface)',
                    transform: 'scale(1.08)',
                  },

                  transition: '0.25s',
                }}
              >
                {wishlist ? (
                  <Favorite
                    sx={{
                      color: '#C2185B',
                    }}
                  />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>


              {/* IMAGE ARROWS */}

              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={previousImage}
                    sx={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform:
                        'translateY(-50%)',
                      width: 42,
                      height: 42,
                      background:
                        'rgba(255,255,255,0.9)',

                      '&:hover': {
                        background: 'var(--pv-surface)',
                      },
                    }}
                  >
                    <ArrowBackIosNew
                      sx={{ fontSize: 16 }}
                    />
                  </IconButton>

                  <IconButton
                    onClick={nextImage}
                    sx={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform:
                        'translateY(-50%)',
                      width: 42,
                      height: 42,
                      background:
                        'rgba(255,255,255,0.9)',

                      '&:hover': {
                        background: 'var(--pv-surface)',
                      },
                    }}
                  >
                    <ArrowForwardIos
                      sx={{ fontSize: 16 }}
                    />
                  </IconButton>
                </>
              )}

            </Paper>


            {/* =================================================
                THUMBNAILS
            ================================================= */}

            {images.length > 1 && (
              <Stack
                direction="row"
                spacing={1.5}
                sx={{
                  mt: 2,
                  overflowX: 'auto',
                  pb: 1,

                  '&::-webkit-scrollbar': {
                    display: 'none',
                  },
                }}
              >

                {images.map(
                  (image, index) => (
                    <Box
                      key={index}
                      onClick={() =>
                        setActiveImage(index)
                      }
                      sx={{
                        flex: '0 0 auto',
                        width: {
                          xs: 72,
                          md: 86,
                        },
                        height: {
                          xs: 72,
                          md: 86,
                        },
                        borderRadius: 2.5,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border:
                          activeImage === index
                            ? '2px solid var(--pv-ink)'
                            : '2px solid transparent',
                        opacity:
                          activeImage === index
                            ? 1
                            : 0.65,
                        transition: '0.25s',

                        '&:hover': {
                          opacity: 1,
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={image}
                        alt=""
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </Box>
                  )
                )}

              </Stack>
            )}

          </Box>


          {/* =================================================
              RIGHT — PRODUCT INFORMATION
          ================================================= */}

          <Box
            sx={{
              position: {
                md: 'sticky',
              },
              top: {
                md: 110,
              },
            }}
          >

            {/* CATEGORY */}

            <Typography
              sx={{
                color: '#C2185B',
                fontSize: 12,
                fontWeight: 900,
                letterSpacing: 2,
                textTransform: 'uppercase',
                mb: 1.5,
              }}
            >
              {product.category}
            </Typography>


            {/* TITLE */}

            <Typography
              sx={{
                fontSize: {
                  xs: 32,
                  md: 44,
                },
                lineHeight: 1.05,
                fontWeight: 900,
                letterSpacing: '-1.5px',
                color: 'var(--pv-ink)',
              }}
            >
              {product.name}
            </Typography>


            {/* RATING */}

            <Stack
              direction="row"
              spacing={1.5}
             
              sx={{ alignItems: 'center',  mt: 2 }}
            >

              <Rating
                value={product.rating || 0}
                precision={0.1}
                readOnly
                size="small"
              />

              <Typography
                sx={{
                  fontSize: 13,
                  color: 'var(--pv-body)',
                }}
              >
                {product.rating || 0}
              </Typography>

              <Typography
                sx={{
                  fontSize: 13,
                  color: 'var(--pv-muted)',
                }}
              >
                ({product.reviews || 0} avis)
              </Typography>

            </Stack>


            {/* PRICE */}

            <Box
              sx={{
                mt: 3,
                mb: 3,
              }}
            >
              <ProductPrice
                price={product.price}
                oldPrice={product.oldPrice}
              />
            </Box>


            {/* DESCRIPTION */}

            <Typography
              sx={{
                color: 'var(--pv-body)',
                fontSize: 15,
                lineHeight: 1.8,
                maxWidth: 600,
              }}
            >
              {product.description}
            </Typography>


            <Divider sx={{ my: 4 }} />


            {/* =================================================
                SIZE
            ================================================= */}

            {product.sizes?.length > 0 && (
              <Box sx={{ mb: 4 }}>

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent:
                      'space-between',
                    alignItems: 'center',
                    mb: 1.5,
                  }}
                >

                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 800,
                    }}
                  >
                    Choisir une taille
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'var(--pv-muted)',
                    }}
                  >
                    Guide des tailles
                  </Typography>

                </Box>


                <Stack
                  direction="row"
                  spacing={1}
                 
                  useFlexGap sx={{ flexWrap: 'wrap' }}>

                  {product.sizes.map(
                    currentSize => {
                      const selected =
                        size === currentSize;

                      return (
                        <Button
                          key={currentSize}
                          onClick={() =>
                            setSize(currentSize)
                          }
                          sx={{
                            minWidth: 58,
                            height: 48,
                            borderRadius: 2,
                            border: selected
                              ? '2px solid var(--pv-ink)'
                              : '1px solid var(--pv-line)',
                            color: 'var(--pv-ink)',
                            background:
                              selected
                                ? 'var(--pv-band)'
                                : 'var(--pv-surface)',
                            fontWeight: 700,
                            fontSize: 13,

                            '&:hover': {
                              background:
                                selected
                                  ? 'var(--pv-band)'
                                  : 'var(--pv-surface-alt)',
                            },
                          }}
                        >
                          {currentSize}
                        </Button>
                      );
                    }
                  )}

                </Stack>

              </Box>
            )}


            {/* =================================================
                QUANTITY
            ================================================= */}

            <Box sx={{ mb: 4 }}>

              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 800,
                  mb: 1.5,
                }}
              >
                Quantité
              </Typography>

              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border:
                    '1px solid var(--pv-line)',
                  borderRadius: 2.5,
                  background: 'var(--pv-surface)',
                  overflow: 'hidden',
                }}
              >

                <IconButton
                  onClick={decreaseQuantity}
                  size="small"
                  sx={{
                    width: 42,
                    height: 46,
                    borderRadius: 0,
                  }}
                >
                  <Remove
                    sx={{ fontSize: 18 }}
                  />
                </IconButton>

                <Typography
                  sx={{
                    minWidth: 40,
                    textAlign: 'center',
                    fontWeight: 800,
                    fontSize: 14,
                  }}
                >
                  {quantity}
                </Typography>

                <IconButton
                  onClick={increaseQuantity}
                  size="small"
                  sx={{
                    width: 42,
                    height: 46,
                    borderRadius: 0,
                  }}
                >
                  <Add
                    sx={{ fontSize: 18 }}
                  />
                </IconButton>

              </Box>

            </Box>


            {/* =================================================
                ACTIONS
            ================================================= */}

            <Stack
              direction={{
                xs: 'column',
                sm: 'row',
              }}
              spacing={1.5}
            >

              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={
                  <ShoppingBagOutlined />
                }
                onClick={handleAddToCart}
                sx={{
                  height: 58,
                  borderRadius: 3,
                  background: 'var(--pv-band)',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: 14,
                  textTransform: 'none',

                  '&:hover': {
                    background: '#C2185B',
                    transform:
                      'translateY(-2px)',
                  },

                  transition: '0.25s',
                }}
              >
                Ajouter au panier
              </Button>

              <IconButton
                onClick={handleWishlist}
                sx={{
                  width: 58,
                  height: 58,
                  border:
                    '1px solid var(--pv-line)',
                  borderRadius: 3,
                  background: 'var(--pv-surface)',

                  '&:hover': {
                    background: 'var(--pv-surface-alt)',
                  },
                }}
              >
                {wishlist ? (
                  <Favorite
                    sx={{
                      color: '#C2185B',
                    }}
                  />
                ) : (
                  <FavoriteBorder />
                )}
              </IconButton>

            </Stack>


            {/* =================================================
                DELIVERY INFO
            ================================================= */}

            <Box
              sx={{
                mt: 4,
                border:
                  '1px solid var(--pv-line)',
                borderRadius: 4,
                background: 'var(--pv-surface)',
                overflow: 'hidden',
              }}
            >

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  p: 2.5,
                  alignItems: 'center',
                }}
              >

                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background:
                      'rgba(194,24,91,0.08)',
                    color: '#C2185B',
                    flexShrink: 0,
                  }}
                >
                  <LocalShippingOutlined />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    Livraison rapide
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'var(--pv-muted)',
                      mt: 0.3,
                    }}
                  >
                    Livraison disponible
                    partout en RDC.
                  </Typography>
                </Box>

              </Box>


              <Divider />


              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  p: 2.5,
                  alignItems: 'center',
                }}
              >

                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background:
                      'rgba(34,197,94,0.08)',
                    color: 'var(--pv-success)',
                    flexShrink: 0,
                  }}
                >
                  <VerifiedOutlined />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    Qualité garantie
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'var(--pv-muted)',
                      mt: 0.3,
                    }}
                  >
                    Produits sélectionnés
                    avec soin.
                  </Typography>
                </Box>

              </Box>


              <Divider />


              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  p: 2.5,
                  alignItems: 'center',
                }}
              >

                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background:
                      'rgba(59,130,246,0.08)',
                    color: '#2563EB',
                    flexShrink: 0,
                  }}
                >
                  <ReplayOutlined />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    Achat en toute confiance
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 12,
                      color: 'var(--pv-muted)',
                      mt: 0.3,
                    }}
                  >
                    Assistance disponible
                    pour votre commande.
                  </Typography>
                </Box>

              </Box>

            </Box>


            {/* =================================================
                STOCK
            ================================================= */}

            <Box
              sx={{
                mt: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >

              <Check
                sx={{
                  fontSize: 17,
                  color: 'var(--pv-success)',
                }}
              />

              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--pv-success)',
                }}
              >
                Disponible en stock
              </Typography>

            </Box>

          </Box>

        </Box>

        {/* Avis : lecture publique, dépôt réservé aux comptes. */}
        <ProductReviews productId={product.id} />

      </Container>

    </Box>
  );
}

export default ProductDetails;