import React from 'react';

import {
  Box,
  Chip,
  Typography,
} from '@mui/material';

import Inventory2Outlined from '@mui/icons-material/Inventory2Outlined';
import ProductCard from './ProductCard';

function ProductGrid({ products = [] }) {
  /*
   * Aucun produit
   */
  if (!products.length) {
    return (
      <Box
        sx={{
          width: '100%',
          py: {
            xs: 8,
            sm: 10,
            md: 13,
          },
          px: {
            xs: 2,
            sm: 4,
          },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          borderRadius: {
            xs: '22px',
            md: '28px',
          },
          background:
            'linear-gradient(145deg, #ffffff 0%, var(--pv-canvas) 100%)',
          border: '1px solid var(--pv-line)',
          boxShadow:
            '0 12px 40px rgba(0,0,0,0.035)',
          position: 'relative',
          overflow: 'hidden',

          '&::before': {
            content: '""',
            position: 'absolute',
            width: 220,
            height: 220,
            borderRadius: '50%',
            top: -130,
            right: -80,
            background:
              'radial-gradient(circle, rgba(236,72,153,.10), transparent 70%)',
            pointerEvents: 'none',
          },

          '&::after': {
            content: '""',
            position: 'absolute',
            width: 180,
            height: 180,
            borderRadius: '50%',
            bottom: -120,
            left: -70,
            background:
              'radial-gradient(circle, rgba(168,85,247,.07), transparent 70%)',
            pointerEvents: 'none',
          },

          animation: 'productGridEmpty .45s ease both',
        }}
      >
        <Box
          sx={{
            width: {
              xs: 62,
              md: 72,
            },
            height: {
              xs: 62,
              md: 72,
            },
            borderRadius: '22px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'var(--pv-surface-alt)',
            border: '1px solid var(--pv-line)',
            mb: 2.5,
            position: 'relative',
            zIndex: 1,
            boxShadow:
              '0 10px 30px rgba(0,0,0,0.05)',
          }}
        >
          <Inventory2Outlined
            sx={{
              fontSize: {
                xs: 28,
                md: 32,
              },
              color: '#ec4899',
            }}
          />
        </Box>

        <Typography
          sx={{
            position: 'relative',
            zIndex: 1,
            fontSize: {
              xs: '1.05rem',
              md: '1.2rem',
            },
            fontWeight: 800,
            color: 'var(--pv-ink)',
            letterSpacing: '-0.02em',
            mb: 0.7,
          }}
        >
          Aucun produit trouvé
        </Typography>

        <Typography
          sx={{
            position: 'relative',
            zIndex: 1,
            maxWidth: 420,
            fontSize: {
              xs: '0.82rem',
              md: '0.9rem',
            },
            lineHeight: 1.7,
            color: 'var(--pv-muted)',
          }}
        >
          Essayez de modifier vos filtres ou explorez
          notre collection complète.
        </Typography>

        <style>
          {`
            @keyframes productGridEmpty {
              from {
                opacity: 0;
                transform: translateY(10px);
              }

              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
          `}
        </style>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      {/* Header de la grille */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          mb: {
            xs: 2,
            sm: 2.5,
            md: 3,
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: {
              xs: 1,
              md: 1.3,
            },
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: '0.78rem',
                sm: '0.82rem',
                md: '0.88rem',
              },
              fontWeight: 800,
              color: 'var(--pv-ink)',
              letterSpacing: '0.01em',
            }}
          >
            Notre sélection
          </Typography>

          <Chip
            label={products.length}
            size="small"
            sx={{
              height: {
                xs: 23,
                md: 25,
              },
              minWidth: 25,
              borderRadius: '999px',
              bgcolor: 'var(--pv-accent-soft)',
              color: '#db2777',
              fontSize: '0.68rem',
              fontWeight: 800,
              '& .MuiChip-label': {
                px: 0.8,
              },
            }}
          />
        </Box>

        <Typography
          sx={{
            fontSize: {
              xs: '0.68rem',
              sm: '0.74rem',
              md: '0.78rem',
            },
            fontWeight: 600,
            color: 'var(--pv-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {products.length === 1
            ? '1 produit'
            : `${products.length} produits`}
        </Typography>
      </Box>

      {/* Grille produits */}
      <Box
        sx={{
          display: 'grid',

          gridTemplateColumns: {
            xs: 'repeat(2, minmax(0, 1fr))',
            sm: 'repeat(2, minmax(0, 1fr))',
            md: 'repeat(3, minmax(0, 1fr))',
            lg: 'repeat(4, minmax(0, 1fr))',
            xl: 'repeat(5, minmax(0, 1fr))',
          },

          columnGap: {
            xs: 1.2,
            sm: 1.8,
            md: 2.4,
            lg: 2.8,
            xl: 3,
          },

          rowGap: {
            xs: 2.2,
            sm: 2.8,
            md: 3.5,
            lg: 4,
            xl: 4.2,
          },

          alignItems: 'stretch',

          /*
           * Important pour éviter que les cartes
           * débordent de la grille.
           */
          '& > *': {
            minWidth: 0,
          },
        }}
      >
        {products.map((product, index) => (
          <Box
            key={product.id}
            sx={{
              minWidth: 0,
              width: '100%',

              /*
               * Animation progressive.
               * Pas besoin de Framer Motion.
               */
              opacity: 0,
              animation: 'productCardEnter .5s ease forwards',
              animationDelay: `${Math.min(index * 55, 500)}ms`,

              /*
               * Permet à ProductCard de gérer
               * son propre hover.
               */
              '& .product-card': {
                width: '100%',
                height: '100%',
              },
            }}
          >
            <ProductCard product={product} />
          </Box>
        ))}
      </Box>

      <style>
        {`
          @keyframes productCardEnter {
            from {
              opacity: 0;
              transform: translateY(12px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}
      </style>
    </Box>
  );
}

export default ProductGrid;