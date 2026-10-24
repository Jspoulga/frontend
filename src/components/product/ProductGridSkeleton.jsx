import React from 'react';

import { Box, Skeleton } from '@mui/material';

/*
 * Aperçu de la grille pendant le chargement : la page garde sa forme, au lieu
 * de sauter quand les produits arrivent.
 */
function ProductGridSkeleton({ count = 8 }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gap: { xs: 1.5, sm: 2, md: 3 },
        gridTemplateColumns: {
          xs: 'repeat(2, minmax(0, 1fr))',
          md: 'repeat(3, minmax(0, 1fr))',
          lg: 'repeat(4, minmax(0, 1fr))',
        },
      }}
    >
      {Array.from({ length: count }).map((unused, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: '18px',
            overflow: 'hidden',
            bgcolor: 'var(--pv-surface)',
            border: '1px solid var(--pv-line)',
          }}
        >
          <Skeleton
            variant="rectangular"
            sx={{ width: '100%', pt: '118%', bgcolor: 'rgba(17,16,22,0.06)' }}
          />

          <Box sx={{ p: 1.5 }}>
            <Skeleton width="40%" height={12} />
            <Skeleton width="85%" height={18} sx={{ mt: 0.5 }} />
            <Skeleton width="55%" height={16} sx={{ mt: 1 }} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export default ProductGridSkeleton;
