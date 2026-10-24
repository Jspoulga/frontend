import React, { useMemo } from 'react';

import { Box, Container, Stack, Typography } from '@mui/material';
import { FormatQuoteRounded, StarRounded, VerifiedRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';

/*
 * ------------------------------------------------------------------
 * Paroles de clients
 * ------------------------------------------------------------------
 *
 * Les avis affichés sont ceux réellement déposés sur les articles :
 * on prend les mieux notés et on cite le commentaire tel quel.
 *
 * Choix assumé : si personne n'a encore laissé d'avis, la section ne
 * s'affiche pas. Mieux vaut une page plus courte que des témoignages
 * inventés — un faux avis se repère, et il coûte la confiance qu'il
 * prétend construire.
 */

function initialsOf(value) {
  return String(value || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

export default function Testimonials({ reviews = [] }) {
  const selected = useMemo(
    () =>
      reviews
        .filter(review => review.rating >= 4 && String(review.comment || '').trim().length > 20)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3),
    [reviews],
  );

  if (selected.length === 0) {
    return null;
  }

  return (
    <Box component="section" sx={{ py: { xs: 5, md: 8 }, bgcolor: 'var(--pv-canvas)' }}>
      <Container maxWidth="xl">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          sx={{ mb: { xs: 3, md: 4 } }}
        >
          <Typography
            sx={{
              fontSize: 11.5,
              fontWeight: 800,
              letterSpacing: '.18em',
              color: 'var(--pv-accent-deep)',
              mb: 1,
            }}
          >
            ILS ONT COMMANDÉ
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 26, md: 36 },
              fontWeight: 900,
              letterSpacing: '-.03em',
              color: 'var(--pv-ink)',
              lineHeight: 1.1,
            }}
          >
            Ce qu’en disent nos clients
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, md: 3 },
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          }}
        >
          {selected.map((review, index) => (
            <Box
              key={review.id || index}
              component={motion.div}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: 3,
                bgcolor: 'var(--pv-surface)',
                border: '1px solid var(--pv-line)',
              }}
            >
              <FormatQuoteRounded sx={{ fontSize: 30, color: 'var(--pv-accent)', opacity: 0.5 }} />

              <Typography
                sx={{ mt: 0.5, fontSize: 15, color: 'var(--pv-body)', lineHeight: 1.65 }}
              >
                {review.comment}
              </Typography>

              <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center', mt: 2.5 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    background: 'linear-gradient(135deg, #EC4899, #A855F7)',
                    color: '#fff',
                    fontWeight: 800,
                    fontSize: 13.5,
                  }}
                >
                  {initialsOf(review.authorName)}
                </Box>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: 'var(--pv-ink)' }}>
                      {review.authorName || 'Client'}
                    </Typography>

                    {/* Achat vérifié : la distinction qui donne du poids à l'avis. */}
                    {review.verified ? (
                      <VerifiedRounded sx={{ fontSize: 15, color: 'var(--pv-success)' }} />
                    ) : null}
                  </Stack>

                  <Stack direction="row" sx={{ mt: 0.2 }}>
                    {Array.from({ length: review.rating }, (_unused, star) => (
                      <StarRounded key={star} sx={{ fontSize: 15, color: '#F59E0B' }} />
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
