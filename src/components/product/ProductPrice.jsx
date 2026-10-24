import React from 'react';

import {
  Box,
  Stack,
  Typography,
} from '@mui/material';

import LocalOfferOutlined from '@mui/icons-material/LocalOfferOutlined';

import formatCurrency from '../../utils/formatCurrency';

function ProductPrice({
  price,
  oldPrice,
}) {
  const currentPrice = Number(price);
  const previousPrice = Number(oldPrice);

  const hasValidPrice =
    Number.isFinite(currentPrice) &&
    currentPrice >= 0;

  const hasDiscount =
    Number.isFinite(previousPrice) &&
    previousPrice > currentPrice &&
    currentPrice >= 0;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((previousPrice - currentPrice) /
          previousPrice) *
          100
      )
    : 0;

  /*
   * Sécurité supplémentaire :
   * évite d'afficher un pourcentage incohérent
   * si les données backend sont incorrectes.
   */
  const safeDiscountPercentage = Math.min(
    Math.max(discountPercentage, 0),
    99
  );

  if (!hasValidPrice) {
    return (
      <Typography
        component="span"
        sx={{
          fontSize: {
            xs: '0.85rem',
            sm: '0.9rem',
          },
          fontWeight: 700,
          color: 'var(--pv-muted)',
        }}
      >
        Prix indisponible
      </Typography>
    );
  }

  return (
    <Stack
      direction="row"
     
     
      spacing={{
        xs: 0.8,
        sm: 1,
      }}
      sx={{ alignItems: 'center', flexWrap: 'wrap', 
        rowGap: 0.7,
      }}
    >
      {/* Prix actuel */}
      <Typography
        component="span"
        sx={{
          fontSize: {
            xs: '1rem',
            sm: '1.08rem',
            md: '1.12rem',
          },
          fontWeight: 900,
          color: 'var(--pv-ink)',
          letterSpacing: '-0.035em',
          lineHeight: 1.1,
          whiteSpace: 'nowrap',
        }}
      >
        {formatCurrency(currentPrice)}
      </Typography>

      {/* Ancien prix */}
      {hasDiscount && (
        <Typography
          component="span"
          sx={{
            fontSize: {
              xs: '0.7rem',
              sm: '0.76rem',
            },
            fontWeight: 550,
            color: 'var(--pv-muted)',
            textDecoration: 'line-through',
            textDecorationThickness: '1px',
            textDecorationColor: 'var(--pv-muted)',
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
          }}
        >
          {formatCurrency(previousPrice)}
        </Typography>
      )}

      {/* Badge réduction */}
      {hasDiscount && safeDiscountPercentage > 0 && (
        <Box
          component="span"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.35,

            px: {
              xs: 0.75,
              sm: 0.9,
            },

            height: {
              xs: 22,
              sm: 24,
            },

            borderRadius: '7px',

            background:
              'linear-gradient(135deg, var(--pv-accent-soft) 0%, var(--pv-accent-soft) 100%)',

            border:
              '1px solid rgba(236,72,153,0.10)',

            color: '#db2777',

            fontSize: {
              xs: '0.6rem',
              sm: '0.66rem',
            },

            fontWeight: 850,
            lineHeight: 1,
            letterSpacing: '0.01em',

            whiteSpace: 'nowrap',

            transition:
              'transform .2s ease, box-shadow .2s ease',

            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow:
                '0 5px 14px rgba(236,72,153,.14)',
            },
          }}
        >
          <LocalOfferOutlined
            sx={{
              fontSize: {
                xs: 11,
                sm: 12,
              },
            }}
          />

          -{safeDiscountPercentage}%
        </Box>
      )}
    </Stack>
  );
}

export default ProductPrice;