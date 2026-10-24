import React from 'react';

import {
  Box,
  Rating,
  Stack,
  Typography,
} from '@mui/material';

import StarRounded from '@mui/icons-material/StarRounded';
import StarBorderRounded from '@mui/icons-material/StarBorderRounded';

function ProductRating({
  rating = 0,
  reviews = 0,
}) {
  const parsedRating = Number(rating);
  const parsedReviews = Number(reviews);

  const hasRating =
    Number.isFinite(parsedRating) &&
    parsedRating > 0;

  const safeRating = hasRating
    ? Math.min(5, Math.max(0, parsedRating))
    : 0;

  const safeReviews =
    Number.isFinite(parsedReviews) && parsedReviews > 0
      ? Math.floor(parsedReviews)
      : 0;

  const formattedRating = hasRating
    ? safeRating.toFixed(1)
    : '—';

  return (
    <Stack
      direction="row"
     
      spacing={{
        xs: 0.65,
        sm: 0.8,
      }}
      sx={{ alignItems: 'center', 
        minHeight: 24,
        width: 'fit-content',
      }}
    >
      {/* Note */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.35,
          flexShrink: 0,
        }}
      >
        <StarRounded
          sx={{
            fontSize: {
              xs: 14,
              sm: 15,
            },
            color: hasRating
              ? '#ec4899'
              : '#cfcfcf',
          }}
        />

        <Typography
          component="span"
          sx={{
            fontSize: {
              xs: '0.72rem',
              sm: '0.78rem',
            },
            fontWeight: 850,
            color: hasRating
              ? 'var(--pv-ink)'
              : 'var(--pv-muted)',
            lineHeight: 1,
            letterSpacing: '-0.01em',
          }}
        >
          {formattedRating}
        </Typography>
      </Box>

      {/* Étoiles */}
      <Rating
        value={safeRating}
        precision={0.1}
        size="small"
        readOnly
        icon={
          <StarRounded
            fontSize="inherit"
          />
        }
        emptyIcon={
          <StarBorderRounded
            fontSize="inherit"
          />
        }
        aria-label={
          hasRating
            ? `Note de ${safeRating.toFixed(1)} sur 5`
            : 'Aucune note'
        }
        sx={{
          fontSize: {
            xs: '0.92rem',
            sm: '1rem',
          },

          lineHeight: 1,

          '& .MuiRating-icon': {
            transition:
              'transform .2s ease, color .2s ease',
          },

          '& .MuiRating-iconFilled': {
            color: '#ec4899',
          },

          '& .MuiRating-iconEmpty': {
            color: '#dedede',
          },
        }}
      />

      {/* Avis */}
      {safeReviews > 0 ? (
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: {
              xs: 21,
              sm: 23,
            },
            px: {
              xs: 0.65,
              sm: 0.75,
            },
            borderRadius: '999px',
            bgcolor: 'var(--pv-surface-alt)',
            border:
              '1px solid var(--pv-line)',
          }}
        >
          <Typography
            component="span"
            sx={{
              fontSize: {
                xs: '0.61rem',
                sm: '0.66rem',
              },
              fontWeight: 650,
              color: 'var(--pv-muted)',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            {safeReviews.toLocaleString('fr-FR')}{' '}
            {safeReviews === 1
              ? 'avis'
              : 'avis'}
          </Typography>
        </Box>
      ) : (
        <Typography
          component="span"
          sx={{
            fontSize: {
              xs: '0.65rem',
              sm: '0.7rem',
            },
            fontWeight: 550,
            color: 'var(--pv-muted)',
            lineHeight: 1,
            whiteSpace: 'nowrap',
          }}
        >
          Aucun avis
        </Typography>
      )}
    </Stack>
  );
}

export default ProductRating;