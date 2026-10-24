import React, { useId } from 'react';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

/*
 * ------------------------------------------------------------------
 * Le monogramme Pivot
 * ------------------------------------------------------------------
 *
 * L'idée tient dans le nom : un pivot, c'est un point fixe autour
 * duquel tout tourne. La boucle du « P » est donc la pièce mobile —
 * elle porte le dégradé de la marque — et elle tourne autour d'un
 * point fixe matérialisé en son centre.
 *
 * L'orbite n'apparaît que pendant l'animation de lancement : en
 * permanence elle traverserait la hampe et brouillerait la lecture,
 * surtout en petite taille.
 *
 * Toute la géométrie est décrite une seule fois ci-dessous et sert
 * aussi bien à l'en-tête (statique) qu'à l'animation de lancement.
 */

/* Boucle du P : centre et rayon. La pastille se pose exactement au centre. */
const BOWL = { cx: 31, cy: 24, r: 14 };

/* L'orbite passe au large de la boucle. */
const ORBIT_R = 20.5;

/* Segment visible de l'orbite : un tiers du cercle environ. */
const ORBIT_LENGTH = 2 * Math.PI * ORBIT_R;
const ORBIT_DASH = `${ORBIT_LENGTH / 3.4} ${ORBIT_LENGTH}`;

const STROKE = 7;

export const PIVOT_GRADIENT = ['#EC4899', '#A855F7'];

/*
 * Le tracé du P, en deux traits : la hampe verticale et la boucle.
 * Les deux partent du même point (16, 10) — les extrémités arrondies
 * referment la jonction proprement.
 */
const STEM_PATH = 'M16 10 V54';
const BOWL_PATH = `M16 10 H${BOWL.cx} A${BOWL.r} ${BOWL.r} 0 0 1 ${BOWL.cx} ${BOWL.cy + BOWL.r} H16`;

/*
 * Chorégraphie du tracé. Les retards sont exprimés en secondes et
 * repris tels quels par l'animation de lancement, pour que le logo
 * se dessine toujours dans le même ordre : orbite, hampe, boucle,
 * puis le point de pivot qui claque à la fin.
 */
export const LOGO_BEATS = {
  orbit: 0,
  stem: 0.18,
  bowl: 0.42,
  pivot: 0.95,
  done: 1.35,
};

export function PivotMark({ size = 40, tone, animated = false, delay = 0 }) {
  const gradientId = useId();
  const theme = useTheme();

  /*
   * Sans consigne, la hampe prend la couleur du texte courant : le logo
   * reste lisible en mode clair comme en mode sombre. `tone="light"`
   * force le blanc — c'est ce dont a besoin l'écran de lancement, qui
   * se joue toujours sur fond noir quel que soit le mode.
   */
  const inkColor =
    tone === 'light'
      ? '#FFFFFF'
      : tone === 'ink'
        ? '#111827'
        : theme.palette.text.primary;

  /* Sans animation, on rend un SVG statique : aucun coût au montage. */
  const Path = animated ? motion.path : 'path';
  const Circle = animated ? motion.circle : 'circle';

  const draw = (from, duration) =>
    animated
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: {
            pathLength: { duration, delay: delay + from, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 0.2, delay: delay + from },
          },
        }
      : {};

  return (
    <Box
      component="svg"
      viewBox="0 0 64 64"
      role="img"
      aria-label="Pivot"
      sx={{
        width: size,
        height: size,
        display: 'block',
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={PIVOT_GRADIENT[0]} />
          <stop offset="100%" stopColor={PIVOT_GRADIENT[1]} />
        </linearGradient>
      </defs>

      {/* L'orbite : un seul passage pendant le lancement, puis elle s'efface. */}
      {animated ? (
        <Circle
          cx={BOWL.cx}
          cy={BOWL.cy}
          r={ORBIT_R}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={ORBIT_DASH}
          style={{ transformOrigin: `${BOWL.cx}px ${BOWL.cy}px` }}
          initial={{ rotate: -150, opacity: 0 }}
          animate={{ rotate: 230, opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2,
            delay: delay + LOGO_BEATS.orbit,
            ease: [0.22, 1, 0.36, 1],
            opacity: { times: [0, 0.18, 0.62, 1], duration: 2 },
          }}
        />
      ) : null}

      {/* La hampe du P. */}
      <Path
        d={STEM_PATH}
        fill="none"
        stroke={inkColor}
        strokeWidth={STROKE}
        strokeLinecap="round"
        {...draw(LOGO_BEATS.stem, 0.5)}
      />

      {/* La boucle du P : la pièce mobile, en dégradé de marque. */}
      <Path
        d={BOWL_PATH}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(LOGO_BEATS.bowl, 0.6)}
      />

      {/* Le point fixe, au centre exact de la boucle. */}
      <Circle
        cx={BOWL.cx}
        cy={BOWL.cy}
        r={4.2}
        fill={inkColor}
        style={{ transformOrigin: `${BOWL.cx}px ${BOWL.cy}px` }}
        {...(animated
          ? {
              initial: { scale: 0 },
              animate: { scale: 1 },
              transition: {
                duration: 0.55,
                delay: delay + LOGO_BEATS.pivot,
                ease: [0.34, 1.56, 0.64, 1],
              },
            }
          : {})}
      />
    </Box>
  );
}

/*
 * Le verrou complet : monogramme + nom. C'est ce que porte l'en-tête.
 * « Pivot » en encre, « Store » en accent — la même respiration que le
 * logo précédent, pour ne pas dérouter les habitués de la boutique.
 */
export default function PivotLogo({
  size = 34,
  tone,
  animated = false,
  fontSize = { xs: 22, md: 26 },
  gap = 1.1,
}) {
  const theme = useTheme();

  const inkColor =
    tone === 'light'
      ? '#FFFFFF'
      : tone === 'ink'
        ? '#111827'
        : theme.palette.text.primary;

  /* Le rose profond s'éclaircit sur fond sombre pour rester lisible. */
  const accentColor =
    tone === 'light'
      ? '#F9A8D4'
      : theme.palette.mode === 'dark'
        ? '#F472B6'
        : '#BE185D';

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap }}>
      <PivotMark size={size} tone={tone} animated={animated} />

      <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
        <Typography
          component="span"
          sx={{
            fontSize,
            fontWeight: 800,
            letterSpacing: '-0.045em',
            color: inkColor,
            lineHeight: 1,
          }}
        >
          Pivot
        </Typography>

        <Typography
          component="span"
          sx={{
            fontSize,
            fontWeight: 800,
            letterSpacing: '-0.045em',
            color: accentColor,
            lineHeight: 1,
            ml: 0.4,
          }}
        >
          Store
        </Typography>
      </Box>
    </Box>
  );
}
