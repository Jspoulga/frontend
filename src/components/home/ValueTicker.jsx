import React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import {
  LocalShippingOutlined,
  PhoneIphoneOutlined,
  VerifiedOutlined,
  AutorenewOutlined,
  SupportAgentOutlined,
} from '@mui/icons-material';
import { motion, useReducedMotion } from 'framer-motion';

/*
 * ------------------------------------------------------------------
 * Bandeau défilant
 * ------------------------------------------------------------------
 *
 * Une frise qui glisse en continu entre deux sections : elle occupe
 * l'œil pendant le défilement et rappelle les engagements de la
 * boutique sans prendre la place d'une section entière.
 *
 * La liste est dupliquée une fois : quand la première copie a fini de
 * passer, la seconde est exactement à sa place, et la boucle ne saute
 * pas. Pour les personnes qui réduisent les animations, la frise reste
 * immobile.
 */

const PROMISES = [
  { icon: LocalShippingOutlined, label: 'Livraison à Kinshasa en 48 h' },
  { icon: PhoneIphoneOutlined, label: 'Paiement Mobile Money' },
  { icon: VerifiedOutlined, label: 'Articles authentiques garantis' },
  { icon: AutorenewOutlined, label: 'Retours sous 7 jours' },
  { icon: SupportAgentOutlined, label: 'Conseil personnalisé' },
];

function Row() {
  return (
    <Stack direction="row" spacing={5} sx={{ alignItems: 'center', pr: 5 }}>
      {PROMISES.map(promise => {
        const Icon = promise.icon;

        return (
          <Stack
            key={promise.label}
            direction="row"
            spacing={1.1}
            sx={{ alignItems: 'center', flexShrink: 0 }}
          >
            <Icon sx={{ fontSize: 19, color: '#EC4899' }} />

            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.78)',
                whiteSpace: 'nowrap',
              }}
            >
              {promise.label}
            </Typography>
          </Stack>
        );
      })}
    </Stack>
  );
}

export default function ValueTicker() {
  const reduced = useReducedMotion();

  return (
    <Box
      component="section"
      sx={{
        py: 1.8,
        bgcolor: '#111016',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <Box
        component={motion.div}
        animate={reduced ? undefined : { x: ['0%', '-50%'] }}
        transition={
          reduced
            ? undefined
            : { duration: 26, repeat: Infinity, ease: 'linear' }
        }
        sx={{ display: 'flex', width: 'max-content' }}
      >
        <Row />
        <Row />
      </Box>
    </Box>
  );
}
