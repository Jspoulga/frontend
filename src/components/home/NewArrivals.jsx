import React, { useMemo } from 'react';

import { Box, Container, Stack, Typography } from '@mui/material';
import { ArrowForwardRounded, AutoAwesomeRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import formatCurrency from '../../utils/formatCurrency';

/*
 * ------------------------------------------------------------------
 * Nouveautés
 * ------------------------------------------------------------------
 *
 * Un rail éditorial, plus aéré que la grille : grandes images, peu de
 * texte. Il sert à donner envie, pas à comparer — la comparaison, c'est
 * le rôle de la boutique.
 *
 * Les articles marqués « nouveau » d'abord ; à défaut, les derniers
 * entrés au catalogue, pour que la section ne soit jamais vide.
 */
export default function NewArrivals({ products = [] }) {
  const items = useMemo(() => {
    const flagged = products.filter(product => product.isNew);

    return (flagged.length >= 4 ? flagged : products).slice(0, 8);
  }, [products]);

  if (items.length === 0) {
    return null;
  }

  return (
    <Box component="section" sx={{ py: { xs: 5, md: 8 }, bgcolor: 'var(--pv-surface)' }}>
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ alignItems: { sm: 'flex-end' }, justifyContent: 'space-between', mb: { xs: 3, md: 4 } }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
              <AutoAwesomeRounded sx={{ fontSize: 18, color: 'var(--pv-accent)' }} />

              <Typography
                sx={{
                  fontSize: 11.5,
                  fontWeight: 800,
                  letterSpacing: '.18em',
                  color: 'var(--pv-accent-deep)',
                }}
              >
                NOUVEAUTÉS
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: { xs: 26, md: 36 },
                fontWeight: 900,
                letterSpacing: '-.03em',
                color: 'var(--pv-ink)',
                lineHeight: 1.1,
              }}
            >
              Arrivés cette semaine
            </Typography>
          </Box>

          <Box
            component={Link}
            to="/shop"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.7,
              textDecoration: 'none',
              color: 'var(--pv-body)',
              fontWeight: 700,
              fontSize: 14,
              '&:hover': { color: 'var(--pv-ink)' },
            }}
          >
            Toute la collection
            <ArrowForwardRounded sx={{ fontSize: 18 }} />
          </Box>
        </Stack>

        {/* Rail horizontal : on fait défiler, comme sur un téléphone. */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            overflowX: 'auto',
            pb: 2,
            scrollSnapType: 'x mandatory',
            '& > *': { scrollSnapAlign: 'start' },
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: 3,
              background: 'var(--pv-line)',
            },
          }}
        >
          {items.map((product, index) => (
            <Box
              key={product.id}
              component={motion.div}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              sx={{ flex: '0 0 auto', width: { xs: 220, md: 268 } }}
            >
              <Box
                component={Link}
                to={`/product/${product.id}`}
                sx={{ textDecoration: 'none', display: 'block' }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    aspectRatio: '0.78',
                    borderRadius: 3,
                    overflow: 'hidden',
                    bgcolor: 'var(--pv-surface-alt)',
                    '&:hover img': { transform: 'scale(1.07)' },
                  }}
                >
                  <Box
                    component="img"
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform .7s cubic-bezier(.22,1,.36,1)',
                    }}
                  />

                  {product.isNew ? (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        px: 1.2,
                        py: 0.4,
                        borderRadius: 1.5,
                        bgcolor: 'rgba(13,11,18,.78)',
                        backdropFilter: 'blur(6px)',
                      }}
                    >
                      <Typography sx={{ fontSize: 11, fontWeight: 800, color: '#fff' }}>
                        NOUVEAU
                      </Typography>
                    </Box>
                  ) : null}
                </Box>

                <Typography
                  sx={{
                    mt: 1.4,
                    fontSize: 10.5,
                    fontWeight: 800,
                    letterSpacing: '.14em',
                    color: 'var(--pv-muted)',
                  }}
                >
                  {String(product.category || '').toUpperCase()}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.4,
                    fontSize: 15,
                    fontWeight: 700,
                    color: 'var(--pv-ink)',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    minHeight: 40,
                  }}
                >
                  {product.name}
                </Typography>

                <Typography sx={{ mt: 0.6, fontSize: 16, fontWeight: 800, color: 'var(--pv-ink)' }}>
                  {formatCurrency(product.price)}
                </Typography>
              </Box>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
