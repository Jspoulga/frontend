import React, { useMemo } from 'react';

import { Box, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

/*
 * ------------------------------------------------------------------
 * Rayons
 * ------------------------------------------------------------------
 *
 * La bande de catégories des grands marchés : une vignette par rayon,
 * illustrée par un article réel du catalogue. Au survol, l'image
 * avance et le cadre se soulève.
 */
export default function CategoryRail({ products = [] }) {
  /* Une vignette par catégorie, illustrée par son premier article. */
  const categories = useMemo(() => {
    const seen = new Map();

    products.forEach(product => {
      if (product.category && !seen.has(product.category)) {
        seen.set(product.category, product);
      }
    });

    return Array.from(seen.entries()).map(([name, product]) => ({
      name,
      image: product.image,
      count: products.filter(item => item.category === name).length,
    }));
  }, [products]);

  if (categories.length === 0) {
    return null;
  }

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 }, bgcolor: '#FAFAFA' }}>
      <Container maxWidth="xl">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mb: 2.5 }}
        >
          <Typography
            sx={{
              fontSize: { xs: 22, md: 27 },
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#111827',
            }}
          >
            Nos rayons
          </Typography>

          <Typography sx={{ fontSize: 13, color: 'var(--pv-muted)' }}>
            {categories.length} univers à explorer
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 1.4, md: 2 },
            gridTemplateColumns: {
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: `repeat(${Math.min(categories.length, 5)}, 1fr)`,
            },
          }}
        >
          {categories.map((category, index) => (
            <Box
              key={category.name}
              component={motion.div}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.55,
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -7 }}
            >
              <Box
                component={Link}
                to={`/category/${encodeURIComponent(category.name)}`}
                sx={{
                  display: 'block',
                  position: 'relative',
                  borderRadius: 3,
                  overflow: 'hidden',
                  textDecoration: 'none',
                  aspectRatio: '0.88',
                  boxShadow: '0 12px 30px rgba(17,24,39,0.08)',
                  '&:hover img': { transform: 'scale(1.09)' },
                }}
              >
                <Box
                  component="img"
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform .75s cubic-bezier(.22,1,.36,1)',
                  }}
                />

                {/* Voile sombre : le texte reste lisible sur toutes les photos. */}
                <Box
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(13,11,18,0.82) 4%, rgba(13,11,18,0.12) 52%, transparent 78%)',
                  }}
                />

                <Box sx={{ position: 'absolute', left: 13, right: 13, bottom: 12 }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 15, md: 16.5 },
                      fontWeight: 800,
                      color: '#fff',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.2,
                    }}
                  >
                    {category.name}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 11.5,
                      color: 'rgba(255,255,255,0.68)',
                      mt: 0.2,
                    }}
                  >
                    {category.count} article{category.count > 1 ? 's' : ''}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
