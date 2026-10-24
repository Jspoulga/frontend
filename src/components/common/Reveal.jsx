import React from 'react';

import { Box } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';

/*
 * ------------------------------------------------------------------
 * Révélation au défilement
 * ------------------------------------------------------------------
 *
 * Le bloc monte en fondu quand il entre dans l'écran, une seule fois.
 * `index` décale les blocs voisins pour obtenir une cascade plutôt
 * qu'une apparition simultanée.
 *
 * Les personnes qui ont réduit les animations reçoivent le contenu
 * déjà en place, sans mouvement ni attente.
 */
export default function Reveal({
  children,
  index = 0,
  offset = 18,
  duration = 0.55,
  sx,
  ...rest
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <Box sx={sx} {...rest}>
        {children}
      </Box>
    );
  }

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      sx={sx}
      {...rest}
    >
      {children}
    </Box>
  );
}
