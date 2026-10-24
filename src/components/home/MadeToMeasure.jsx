import React from 'react';

import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowForwardRounded,
  ContentCutRounded,
  PublicRounded,
  StraightenRounded,
} from '@mui/icons-material';

/*
 * ------------------------------------------------------------------
 * Le sur-mesure
 * ------------------------------------------------------------------
 *
 * La section qui dit ce que la boutique fait et que les géants ne
 * peuvent pas faire : rien n'est fabriqué avant d'être vendu, tout est
 * coupé aux mesures du client, et cousu près de chez lui.
 *
 * Elle est placée haut dans la page, avant les grilles de produits :
 * c'est la promesse, pas un rayon parmi d'autres.
 */

const STEPS = [
  {
    Icon: StraightenRounded,
    title: 'Vos mesures, une fois',
    text: 'Onze mesures enregistrées dans votre passeport. Chaque pièce s’y réfère ensuite.',
  },
  {
    Icon: ContentCutRounded,
    title: 'Coupé après commande',
    text: 'Rien n’attend en stock. Votre pièce n’existe qu’à partir du moment où vous la commandez.',
  },
  {
    Icon: PublicRounded,
    title: 'Cousu près de chez vous',
    text: 'Un atelier proche reçoit le patron. Le colis fait cent kilomètres, pas dix mille.',
  },
];

export default function MadeToMeasure() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 9 },
        position: 'relative',
        overflow: 'hidden',
        background:
          'linear-gradient(135deg, #0D0B12 0%, #1B141C 45%, #2A1526 100%)',
      }}
    >
      {/* Halo discret : la section respire au lieu d'être un aplat. */}
      <Box
        component={motion.div}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: 'easeOut' }}
        sx={{
          position: 'absolute',
          width: 520,
          height: 520,
          borderRadius: '50%',
          right: -160,
          top: -180,
          background: 'radial-gradient(circle, rgba(236,72,153,.22), transparent 66%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          sx={{ maxWidth: 680 }}
        >
          <Typography
            sx={{
              fontSize: 11.5,
              fontWeight: 800,
              letterSpacing: '.2em',
              color: '#F472B6',
              mb: 1.5,
            }}
          >
            SUR MESURE
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 30, md: 44 },
              fontWeight: 900,
              letterSpacing: '-.03em',
              color: '#fff',
              lineHeight: 1.08,
            }}
          >
            Votre taille n’existe pas.
            <Box component="span" sx={{ color: '#F472B6' }}> Vos mesures, oui.</Box>
          </Typography>

          <Typography
            sx={{
              mt: 2,
              fontSize: { xs: 15, md: 17.5 },
              color: 'rgba(255,255,255,.72)',
              lineHeight: 1.65,
            }}
          >
            Le prêt-à-porter vous demande d’entrer dans une taille standard.
            Nous faisons l’inverse : la pièce est coupée à vos dimensions,
            après votre commande, par un atelier proche de chez vous.
          </Typography>
        </Box>

        <Box
          sx={{
            mt: { xs: 4, md: 6 },
            display: 'grid',
            gap: { xs: 2.5, md: 3 },
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          }}
        >
          {STEPS.map((step, index) => {
            const Icon = step.Icon;

            return (
              <Box
                key={step.title}
                component={motion.div}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                sx={{
                  p: { xs: 2.5, md: 3 },
                  borderRadius: 3,
                  bgcolor: 'rgba(255,255,255,.05)',
                  border: '1px solid rgba(255,255,255,.09)',
                }}
              >
                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    display: 'grid',
                    placeItems: 'center',
                    background: 'linear-gradient(135deg, #EC4899, #A855F7)',
                    mb: 2,
                  }}
                >
                  <Icon sx={{ fontSize: 22, color: '#fff' }} />
                </Box>

                <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#fff' }}>
                  {step.title}
                </Typography>

                <Typography
                  sx={{ mt: 0.8, fontSize: 14, color: 'rgba(255,255,255,.62)', lineHeight: 1.6 }}
                >
                  {step.text}
                </Typography>
              </Box>
            );
          })}
        </Box>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mt: { xs: 4, md: 5 }, alignItems: { xs: 'stretch', sm: 'center' } }}
        >
          <Button
            component={Link}
            to="/account/measurements"
            variant="contained"
            size="large"
            endIcon={<ArrowForwardRounded />}
            sx={{
              bgcolor: '#fff',
              color: '#111827',
              fontWeight: 800,
              px: 3.5,
              '&:hover': { bgcolor: '#F3F4F6' },
            }}
          >
            Créer mon passeport de mesures
          </Button>

          <Typography sx={{ fontSize: 13.5, color: 'rgba(255,255,255,.5)' }}>
            Onze mesures, cinq minutes. Valable pour toutes vos commandes.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
