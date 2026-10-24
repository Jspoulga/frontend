import React, { useState } from 'react';

import {
  Box,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import {
  AddRounded,
  RemoveRounded,
  DeleteOutlineRounded,
  ShoppingBagOutlined,
} from '@mui/icons-material';

import { useDispatch } from 'react-redux';

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../../store/slices/cartSlice';

import formatCurrency from '../../utils/formatCurrency';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const [imageError, setImageError] = useState(false);

  const quantity = Number(item?.quantity || 0);
  const price = Number(item?.price || 0);

  const total = price * quantity;

  const imageSrc =
    item?.image ||
    item?.images?.[0] ||
    '';

  const hasImage =
    Boolean(imageSrc) && !imageError;

  const handleDecrease = () => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(item.id));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const handleIncrease = () => {
    dispatch(increaseQuantity(item.id));
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <Box
      className="cart-item"
      sx={{
        width: '100%',
        display: 'flex',
        gap: {
          xs: 1.4,
          sm: 1.8,
        },

        py: {
          xs: 1.2,
          sm: 1.4,
        },

        position: 'relative',

        animation:
          'cartItemAppear .4s ease both',

        '&:hover .cart-item-image': {
          transform: 'scale(1.045)',
        },

        '&:hover .cart-item-delete': {
          opacity: 1,
        },
      }}
    >
      {/* =========================
          IMAGE
      ========================== */}

      <Box
        sx={{
          position: 'relative',

          width: {
            xs: 76,
            sm: 86,
          },

          height: {
            xs: 92,
            sm: 104,
          },

          flexShrink: 0,

          borderRadius: {
            xs: '13px',
            sm: '15px',
          },

          overflow: 'hidden',

          bgcolor: 'var(--pv-surface-alt)',

          border:
            '1px solid var(--pv-line)',

          boxShadow:
            '0 6px 18px rgba(0,0,0,0.045)',
        }}
      >
        {hasImage ? (
          <Box
            component="img"
            className="cart-item-image"
            src={imageSrc}
            alt={item?.name || 'Produit'}
            loading="lazy"
            onError={() => setImageError(true)}
            sx={{
              width: '100%',
              height: '100%',

              display: 'block',

              objectFit: 'cover',

              transition:
                'transform .5s cubic-bezier(.2,.8,.2,1)',
            }}
          />
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '100%',

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',

              bgcolor: 'var(--pv-surface-alt)',
            }}
          >
            <ShoppingBagOutlined
              sx={{
                fontSize: {
                  xs: 24,
                  sm: 28,
                },

                color: '#c3c3c3',
              }}
            />
          </Box>
        )}

        {/* Image overlay */}
        {hasImage && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,

              pointerEvents: 'none',

              background:
                'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,.07) 100%)',
            }}
          />
        )}
      </Box>

      {/* =========================
          PRODUCT INFO
      ========================== */}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,

          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Category */}
        {item?.category && (
          <Typography
            sx={{
              fontSize: {
                xs: '0.55rem',
                sm: '0.58rem',
              },

              fontWeight: 850,

              textTransform: 'uppercase',

              letterSpacing: '0.09em',

              color: '#ec4899',

              mb: 0.35,

              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {item.category}
          </Typography>
        )}

        {/* Product name */}
        <Typography
          component="h3"
          sx={{
            fontSize: {
              xs: '0.78rem',
              sm: '0.84rem',
            },

            fontWeight: 800,

            color: 'var(--pv-ink)',

            lineHeight: 1.3,

            letterSpacing: '-0.015em',

            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',

            pr: 3,
          }}
        >
          {item?.name || 'Produit'}
        </Typography>

        {/* Price */}
        <Typography
          sx={{
            mt: 0.7,

            fontSize: {
              xs: '0.75rem',
              sm: '0.8rem',
            },

            fontWeight: 800,

            color: 'var(--pv-body)',
          }}
        >
          {formatCurrency(price)}
        </Typography>

        {/* Bottom row */}
        <Box
          sx={{
            mt: 'auto',
            pt: 1.1,

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',

            gap: 1,
          }}
        >
          {/* Quantity selector */}
          <Stack
            direction="row"
           
            sx={{ alignItems: 'center', 
              height: {
                xs: 32,
                sm: 34,
              },

              borderRadius: '10px',

              bgcolor: 'var(--pv-surface-alt)',

              border:
                '1px solid var(--pv-line)',

              overflow: 'hidden',
            }}
          >
            <IconButton
              size="small"
              aria-label={
                quantity > 1
                  ? 'Diminuer la quantité'
                  : 'Supprimer le produit'
              }
              onClick={handleDecrease}
              sx={{
                width: {
                  xs: 30,
                  sm: 32,
                },

                height: '100%',

                borderRadius: 0,

                color:
                  quantity > 1
                    ? 'var(--pv-body)'
                    : '#ef4444',

                transition:
                  'background .18s ease, color .18s ease',

                '&:hover': {
                  bgcolor:
                    quantity > 1
                      ? '#ececee'
                      : '#fff1f2',
                },
              }}
            >
              <RemoveRounded
                sx={{
                  fontSize: 15,
                }}
              />
            </IconButton>

            <Typography
              sx={{
                minWidth: {
                  xs: 26,
                  sm: 28,
                },

                textAlign: 'center',

                fontSize: {
                  xs: '0.68rem',
                  sm: '0.7rem',
                },

                fontWeight: 850,

                color: 'var(--pv-ink)',
              }}
            >
              {quantity}
            </Typography>

            <IconButton
              size="small"
              aria-label="Augmenter la quantité"
              onClick={handleIncrease}
              sx={{
                width: {
                  xs: 30,
                  sm: 32,
                },

                height: '100%',

                borderRadius: 0,

                color: 'var(--pv-body)',

                transition:
                  'background .18s ease, color .18s ease',

                '&:hover': {
                  bgcolor: '#ececee',
                  color: '#ec4899',
                },
              }}
            >
              <AddRounded
                sx={{
                  fontSize: 15,
                }}
              />
            </IconButton>
          </Stack>

          {/* Line total */}
          <Typography
            sx={{
              fontSize: {
                xs: '0.76rem',
                sm: '0.82rem',
              },

              fontWeight: 900,

              color: 'var(--pv-ink)',

              letterSpacing: '-0.015em',

              whiteSpace: 'nowrap',
            }}
          >
            {formatCurrency(total)}
          </Typography>
        </Box>
      </Box>

      {/* =========================
          DELETE BUTTON
      ========================== */}

      <IconButton
        className="cart-item-delete"
        aria-label="Supprimer du panier"
        onClick={handleRemove}
        sx={{
          position: 'absolute',

          top: {
            xs: 6,
            sm: 8,
          },

          right: {
            xs: -4,
            sm: -5,
          },

          width: {
            xs: 28,
            sm: 30,
          },

          height: {
            xs: 28,
            sm: 30,
          },

          borderRadius: '9px',

          bgcolor: 'var(--pv-surface)',

          color: 'var(--pv-muted)',

          border:
            '1px solid var(--pv-line)',

          boxShadow:
            '0 4px 12px rgba(0,0,0,0.05)',

          opacity: {
            xs: 1,
            sm: 0,
          },

          transition:
            'opacity .2s ease, background .2s ease, color .2s ease, transform .2s ease',

          '&:hover': {
            bgcolor: '#fff1f2',
            color: '#ef4444',
            transform: 'scale(1.04)',
          },
        }}
      >
        <DeleteOutlineRounded
          sx={{
            fontSize: {
              xs: 16,
              sm: 17,
            },
          }}
        />
      </IconButton>

      <style>
        {`
          @keyframes cartItemAppear {
            from {
              opacity: 0;
              transform: translateY(6px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .cart-item {
              animation: none !important;
            }
          }
        `}
      </style>
    </Box>
  );
}

export default CartItem;