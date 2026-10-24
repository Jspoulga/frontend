import React, { useEffect, useState } from 'react';

import { Box, CircularProgress } from '@mui/material';

import ImageNotSupportedOutlined from '@mui/icons-material/ImageNotSupportedOutlined';

function ProductImage({
  src,
  alt = 'Produit',
  height,
  aspectRatio = '0.82',
  objectPosition = 'center',
  borderRadius = 0,
  showLoader = true,
}) {
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(Boolean(src));

  /*
   * Si l'URL de l'image change,
   * on réinitialise l'état du composant.
   */
  useEffect(() => {
    setImageError(false);
    setLoading(Boolean(src));
  }, [src]);

  const handleLoad = () => {
    setLoading(false);
    setImageError(false);
  };

  const handleError = () => {
    setLoading(false);
    setImageError(true);
  };

  const hasImage = Boolean(src) && !imageError;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: height || 'auto',
        aspectRatio: height ? 'auto' : aspectRatio,
        overflow: 'hidden',
        bgcolor: 'var(--pv-surface-alt)',
        borderRadius,
        isolation: 'isolate',
      }}
    >
      {/* Loading state */}
      {loading && showLoader && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'var(--pv-surface-alt)',
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'var(--pv-surface)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.06)',
            }}
          >
            <CircularProgress
              size={20}
              thickness={4}
              sx={{
                color: '#ec4899',
              }}
            />
          </Box>
        </Box>
      )}

      {/* Image */}
      {hasImage ? (
        <Box
          component="img"
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',

            objectFit: 'cover',
            objectPosition,

            transform: 'scale(1)',
            opacity: loading ? 0 : 1,

            transition:
              'transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.35s ease',

            /*
             * Fonctionne avec :
             * <Box className="product-card">
             */
            '.product-card:hover &': {
              transform: 'scale(1.055)',
            },

            /*
             * Permet aussi de l'utiliser indépendamment
             * avec le hover sur le container parent.
             */
            '.product-image-container:hover &': {
              transform: 'scale(1.055)',
            },
          }}
        />
      ) : (
        /* Fallback */
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 1.25,
            bgcolor: 'var(--pv-surface-alt)',
            color: 'var(--pv-muted)',
          }}
        >
          <Box
            sx={{
              width: 58,
              height: 58,
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'var(--pv-surface)',
              border: '1px solid var(--pv-line)',
              boxShadow: '0 8px 25px rgba(0,0,0,0.04)',
            }}
          >
            <ImageNotSupportedOutlined
              sx={{
                fontSize: 27,
                color: '#b8b8b8',
              }}
            />
          </Box>

          <Box
            component="span"
            sx={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              color: 'var(--pv-muted)',
            }}
          >
            Image indisponible
          </Box>
        </Box>
      )}

      {/* Premium image overlay */}
      {hasImage && (
        <>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              pointerEvents: 'none',
              background:
                'linear-gradient(180deg, rgba(0,0,0,0.015) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.055) 100%)',
            }}
          />

          {/* Soft light */}
          <Box
            sx={{
              position: 'absolute',
              top: '-25%',
              left: '-20%',
              width: '65%',
              height: '65%',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%)',
              pointerEvents: 'none',
              zIndex: 2,
              opacity: 0.65,
            }}
          />
        </>
      )}

      {/* Tiny loading progress line */}
      {loading && showLoader && (
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 2,
            overflow: 'hidden',
            bgcolor: 'rgba(0,0,0,0.04)',
            zIndex: 5,

            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-40%',
              width: '40%',
              height: '100%',
              bgcolor: '#ec4899',
              animation: 'imageLoading 1.1s ease-in-out infinite',
            },
          }}
        />
      )}

      <style>
        {`
          @keyframes imageLoading {
            0% {
              left: -40%;
            }

            50% {
              left: 55%;
            }

            100% {
              left: 110%;
            }
          }
        `}
      </style>
    </Box>
  );
}

export default ProductImage;