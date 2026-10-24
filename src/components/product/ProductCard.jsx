import React from 'react';

import {
  Card,
  CardActionArea,
  CardContent,
  IconButton,
  Box,
  Typography,
  Button,
  Chip,
} from '@mui/material';

import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';

import { Link } from 'react-router-dom';

import ProductImage from './ProductImage';
import ProductRating from './ProductRating';
import ProductPrice from './ProductPrice';

import { useDispatch, useSelector } from 'react-redux';

import {
  addToCart,
} from '../../store/slices/cartSlice';

import {
  toggleWishlist,
} from '../../store/slices/wishlistSlice';

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const wishlist = useSelector(
    state => state.wishlist.items
  );

  const isFavorite = wishlist.some(
    item => item.id === product.id
  );

  const discount = product.oldPrice
    ? Math.round(
        ((product.oldPrice - product.price) /
          product.oldPrice) *
          100
      )
    : 0;

  const handleAddToCart = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(addToCart(product));
  };

  const handleWishlist = e => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(toggleWishlist(product));
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',

        borderRadius: '18px',

        background: 'var(--pv-surface)',

        border: '1px solid var(--pv-line)',

        overflow: 'hidden',

        position: 'relative',

        boxShadow:
          '0 3px 14px rgba(0,0,0,0.04)',

        transition:
          'transform 0.3s ease, box-shadow 0.3s ease',

        '&:hover': {
          transform: 'translateY(-6px)',

          boxShadow:
            '0 18px 40px rgba(0,0,0,0.10)',
        },
      }}
    >
      {/* IMAGE */}
      <Box
        sx={{
          position: 'relative',

          overflow: 'hidden',

          background: 'var(--pv-surface-alt)',

          '& .product-image': {
            transition:
              'transform 0.5s ease',
          },

          '&:hover .product-image': {
            transform: 'scale(1.045)',
          },
        }}
      >
        <CardActionArea
          component={Link}
          to={`/product/${product.id}`}
          sx={{
            display: 'block',
          }}
        >
          <Box
            className="product-image"
            sx={{
              width: '100%',

              aspectRatio: '0.82',

              overflow: 'hidden',

              '& img': {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              },
            }}
          >
            <ProductImage
              src={product.image}
              alt={product.name}
            />
          </Box>
        </CardActionArea>

        {/* DISCOUNT */}
        {discount > 0 && (
          <Chip
            label={`-${discount}%`}
            size="small"
            sx={{
              position: 'absolute',

              top: 12,
              left: 12,

              height: 27,

              borderRadius: '8px',

              background: '#C2185B',

              color: '#fff',

              fontSize: 11,

              fontWeight: 800,

              '& .MuiChip-label': {
                px: 1.2,
              },
            }}
          />
        )}

        {/* NEW */}
        {!discount && product.isNew && (
          <Chip
            label="NOUVEAU"
            size="small"
            sx={{
              position: 'absolute',

              top: 12,
              left: 12,

              height: 27,

              borderRadius: '8px',

              background: 'var(--pv-band)',

              color: '#fff',

              fontSize: 10,

              fontWeight: 800,

              '& .MuiChip-label': {
                px: 1.2,
              },
            }}
          />
        )}

        {/* FAVORITE */}
        <IconButton
          onClick={handleWishlist}
          aria-label="Ajouter aux favoris"
          sx={{
            position: 'absolute',

            top: 10,
            right: 10,

            width: 38,
            height: 38,

            background:
              'rgba(255,255,255,0.94)',

            backdropFilter: 'blur(8px)',

            border:
              '1px solid var(--pv-line)',

            boxShadow:
              '0 4px 12px rgba(0,0,0,0.08)',

            transition: '0.2s',

            '&:hover': {
              background: 'var(--pv-surface)',

              transform: 'scale(1.08)',
            },
          }}
        >
          {isFavorite ? (
            <Favorite
              sx={{
                fontSize: 20,
                color: '#C2185B',
              }}
            />
          ) : (
            <FavoriteBorder
              sx={{
                fontSize: 20,
                color: 'var(--pv-ink)',
              }}
            />
          )}
        </IconButton>

        {/* QUICK ADD */}
        <Box
          sx={{
            position: 'absolute',

            bottom: 12,
            left: 12,
            right: 12,

            opacity: {
              xs: 1,
              md: 0,
            },

            transform: {
              xs: 'translateY(0)',
              md: 'translateY(8px)',
            },

            transition: '0.3s',

            '.MuiCard-root:hover &': {
              opacity: 1,
              transform: 'translateY(0)',
            },
          }}
        >
          <Button
            fullWidth
            onClick={handleAddToCart}
            startIcon={
              <ShoppingBagOutlined
                sx={{ fontSize: 18 }}
              />
            }
            sx={{
              height: 43,

              borderRadius: '12px',

              background:
                'rgba(255,255,255,0.95)',

              backdropFilter: 'blur(10px)',

              color: 'var(--pv-ink)',

              fontSize: 12,

              fontWeight: 700,

              textTransform: 'none',

              boxShadow:
                '0 6px 20px rgba(0,0,0,0.12)',

              '&:hover': {
                background: '#C2185B',
                color: '#fff',
              },
            }}
          >
            Ajouter au panier
          </Button>
        </Box>
      </Box>

      {/* CONTENT */}
      <CardContent
        sx={{
          p: {
            xs: 1.5,
            sm: 2,
          },

          '&:last-child': {
            pb: {
              xs: 1.5,
              sm: 2,
            },
          },
        }}
      >
        {/* CATEGORY */}
        <Typography
          sx={{
            color: 'var(--pv-muted)',

            fontSize: 10.5,

            fontWeight: 700,

            textTransform: 'uppercase',

            letterSpacing: '0.8px',

            mb: 0.7,
          }}
        >
          {product.category}
        </Typography>

        {/* NAME */}
        <Typography
          component={Link}
          to={`/product/${product.id}`}
          sx={{
            color: 'var(--pv-ink)',

            textDecoration: 'none',

            fontSize: {
              xs: 13,
              sm: 14,
            },

            fontWeight: 700,

            lineHeight: 1.35,

            minHeight: 38,

            overflow: 'hidden',

            display: '-webkit-box',

            WebkitLineClamp: 2,

            WebkitBoxOrient: 'vertical',

            transition: '0.2s',

            '&:hover': {
              color: '#C2185B',
            },
          }}
        >
          {product.name}
        </Typography>

        {/* RATING */}
        <Box
          sx={{
            mt: 1,
          }}
        >
          <ProductRating
            rating={product.rating}
            reviews={product.reviews}
          />
        </Box>

        {/* PRICE */}
        <Box
          sx={{
            mt: 1.2,
          }}
        >
          <ProductPrice
            price={product.price}
            oldPrice={product.oldPrice}
          />
        </Box>

        {/* MOBILE ADD BUTTON */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleAddToCart}
          startIcon={
            <ShoppingBagOutlined
              sx={{ fontSize: 18 }}
            />
          }
          sx={{
            display: {
              xs: 'flex',
              md: 'none',
            },

            mt: 1.5,

            height: 40,

            borderRadius: '10px',

            background: 'var(--pv-band)',

            color: '#fff',

            fontSize: 12,

            fontWeight: 700,

            textTransform: 'none',

            boxShadow: 'none',

            '&:hover': {
              background: '#C2185B',

              boxShadow: 'none',
            },
          }}
        >
          Ajouter
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProductCard;