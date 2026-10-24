import React, { useEffect, useMemo, useState } from 'react';

import { Box, Container, Stack, Typography } from '@mui/material';
import { BoltRounded, ArrowForwardRounded, StarRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import formatCurrency from '../../utils/formatCurrency';

/*
 * ------------------------------------------------------------------
 * Ventes flash
 * ------------------------------------------------------------------
 *
 * La séquence d'ouverture des grands marchés en ligne : un compte à
 * rebours, puis un rail d'articles les plus remisés qu'on fait défiler
 * à l'horizontale.
 *
 * Le compte à rebours vise minuit par défaut. Il doit être branché sur
 * la vraie date de fin de campagne (prop `endsAt`) le jour où la
 * boutique en programme une : un décompte qui tourne en boucle sans
 * que les prix changent est une promesse vide.
 */

function nextMidnight() {
  const end = new Date();

  end.setHours(24, 0, 0, 0);

  return end;
}

function useCountdown(endsAt) {
  const target = useMemo(() => endsAt || nextMidnight(), [endsAt]);

  const [remaining, setRemaining] = useState(() => target - new Date());

  useEffect(() => {
    const tick = setInterval(() => {
      setRemaining(target - new Date());
    }, 1000);

    return () => clearInterval(tick);
  }, [target]);

  const safe = Math.max(0, remaining);

  return {
    hours: String(Math.floor(safe / 3600000)).padStart(2, '0'),
    minutes: String(Math.floor((safe % 3600000) / 60000)).padStart(2, '0'),
    seconds: String(Math.floor((safe % 60000) / 1000)).padStart(2, '0'),
  };
}

/* Une case du décompte — le chiffre se retourne à chaque changement. */
function TimeBox({ value, label }) {
  return (
    <Stack spacing={0.6} sx={{ alignItems: 'center' }}>
      <Box
        sx={{
          position: 'relative',
          minWidth: 46,
          px: 1.2,
          py: 0.9,
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.14)',
          border: '1px solid rgba(255,255,255,0.18)',
          overflow: 'hidden',
        }}
      >
        <Typography
          key={value}
          component={motion.div}
          initial={{ y: -22, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          sx={{
            fontSize: 21,
            fontWeight: 800,
            color: '#fff',
            textAlign: 'center',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1.15,
          }}
        >
          {value}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontSize: 9.5,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.55)',
        }}
      >
        {label}
      </Typography>
    </Stack>
  );
}

function DealCard({ product, index }) {
  const discount =
    product.oldPrice > product.price
      ? Math.round(100 - (product.price / product.oldPrice) * 100)
      : 0;

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      sx={{
        flex: '0 0 auto',
        width: { xs: 158, sm: 182 },
        textDecoration: 'none',
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: '#fff',
        /* Le rayon est toujours sombre : filet fixe, pas de jeton. */
        border: '1px solid rgba(17,24,39,0.07)',
        boxShadow: '0 10px 30px rgba(17,24,39,0.06)',
      }}
    >
      <Box
        component={Link}
        to={`/product/${product.id}`}
        sx={{ display: 'block', textDecoration: 'none' }}
      >
        <Box sx={{ position: 'relative', aspectRatio: '0.82', overflow: 'hidden' }}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            loading="lazy"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform .6s cubic-bezier(.22,1,.36,1)',
              '.MuiBox-root:hover > &': { transform: 'scale(1.07)' },
            }}
          />

          {discount > 0 ? (
            <Box
              sx={{
                position: 'absolute',
                left: 8,
                bottom: 8,
                px: 1,
                py: 0.35,
                borderRadius: 1.5,
                background: 'linear-gradient(135deg, #EC4899, #A855F7)',
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 800, color: '#fff' }}>
                -{discount}%
              </Typography>
            </Box>
          ) : null}
        </Box>

        <Box sx={{ p: 1.3 }}>
          <Stack direction="row" spacing={0.7} sx={{ alignItems: 'baseline' }}>
            <Typography
              sx={{ fontSize: 16.5, fontWeight: 800, color: '#BE185D', letterSpacing: '-0.02em' }}
            >
              {formatCurrency(product.price)}
            </Typography>

            {discount > 0 ? (
              <Typography
                sx={{
                  fontSize: 11.5,
                  /* Sur carte blanche, un gris plus soutenu reste lisible. */
                  color: '#64748B',
                  textDecoration: 'line-through',
                }}
              >
                {formatCurrency(product.oldPrice)}
              </Typography>
            ) : null}
          </Stack>

          <Typography
            sx={{
              mt: 0.4,
              fontSize: 12.5,
              color: '#475569',
              lineHeight: 1.35,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              minHeight: 34,
            }}
          >
            {product.name}
          </Typography>

          {product.rating ? (
            <Stack direction="row" spacing={0.3} sx={{ alignItems: 'center', mt: 0.6 }}>
              <StarRounded sx={{ fontSize: 14, color: '#F59E0B' }} />

              <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: '#111827' }}>
                {product.rating}
              </Typography>

              {product.reviews ? (
                <Typography sx={{ fontSize: 11, color: '#64748B' }}>
                  · {product.reviews} avis
                </Typography>
              ) : null}
            </Stack>
          ) : null}
        </Box>
      </Box>
    </Box>
  );
}

export default function FlashSale({ products = [], endsAt }) {
  const { hours, minutes, seconds } = useCountdown(endsAt);

  /* Les articles les plus remisés d'abord : c'est la promesse du rayon. */
  const deals = useMemo(
    () =>
      products
        .filter(product => product.oldPrice > product.price)
        .sort(
          (a, b) =>
            b.oldPrice / b.price - a.oldPrice / a.price,
        )
        .slice(0, 10),
    [products],
  );

  if (deals.length === 0) {
    return null;
  }

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, md: 6 },
        background:
          'linear-gradient(135deg, #0D0B12 0%, #1B141C 48%, #2A1526 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2, sm: 3 }}
          sx={{ alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3 }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}
          >
            <Box
              component={motion.div}
              animate={{ scale: [1, 1.14, 1] }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut' }}
              sx={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                display: 'grid',
                placeItems: 'center',
                background: 'linear-gradient(135deg, #EC4899, #A855F7)',
              }}
            >
              <BoltRounded sx={{ fontSize: 21, color: '#fff' }} />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: { xs: 22, md: 26 },
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                }}
              >
                Ventes flash
              </Typography>

              <Typography sx={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)' }}>
                Les meilleures remises du moment
              </Typography>
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: { xs: 'none', sm: 'block' } }} />

          {/*
            En colonne étroite, décompte et lien partagent la même ligne :
            sinon « Tout voir » se retrouve seul avec un grand vide au-dessus.
          */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 2.5,
              width: { xs: '100%', sm: 'auto' },
            }}
          >
            <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center' }}>
              <TimeBox value={hours} label="h" />
              <TimeBox value={minutes} label="min" />
              <TimeBox value={seconds} label="sec" />
            </Stack>

            <Box
              component={Link}
              to="/shop"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.6,
                textDecoration: 'none',
                color: 'rgba(255,255,255,0.75)',
                transition: 'color .2s ease',
                '&:hover': { color: '#fff' },
              }}
            >
              <Typography sx={{ fontSize: 13.5, fontWeight: 700 }}>
                Tout voir
              </Typography>
              <ArrowForwardRounded sx={{ fontSize: 17 }} />
            </Box>
          </Box>
        </Stack>

        {/* Le rail : on fait défiler à l'horizontale, comme sur mobile. */}
        <Stack
          direction="row"
          spacing={1.6}
          sx={{
            overflowX: 'auto',
            pb: 1.5,
            scrollSnapType: 'x mandatory',
            '& > *': { scrollSnapAlign: 'start' },
            '&::-webkit-scrollbar': { height: 6 },
            '&::-webkit-scrollbar-thumb': {
              borderRadius: 3,
              background: 'rgba(255,255,255,0.16)',
            },
          }}
        >
          {deals.map((product, index) => (
            <DealCard key={product.id} product={product} index={index} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
