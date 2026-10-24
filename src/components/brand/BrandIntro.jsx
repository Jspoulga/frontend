import React, { useCallback, useEffect, useState } from 'react';

import { Box, Typography } from '@mui/material';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { PivotMark, LOGO_BEATS } from './PivotLogo';

/*
 * ------------------------------------------------------------------
 * Le lever de rideau
 * ------------------------------------------------------------------
 *
 * Le logo se dessine sur fond sombre, le nom se pose lettre par
 * lettre, puis le rideau se lève sur la boutique.
 *
 * Trois règles pour que ce soit élégant et non pénible :
 *   — une seule fois par session, pas à chaque navigation ;
 *   — la boutique est déjà montée derrière : quand le rideau se lève,
 *     tout est prêt, rien ne clignote ;
 *   — un clic, une touche ou une molette passe l'animation, et les
 *     personnes qui réduisent les animations ne la voient jamais.
 */

const SESSION_KEY = 'pivot_intro_seen';

const WORD = 'PIVOT';

/* Le rideau se lève une fois le point de pivot posé. */
const HOLD = LOGO_BEATS.done + 1.15;

export default function BrandIntro() {
  const reduced = useReducedMotion();

  const [visible, setVisible] = useState(() => {
    /* Rendu serveur ou navigateur sans sessionStorage : on ne bloque rien. */
    try {
      return !window.sessionStorage.getItem(SESSION_KEY);
    } catch (error) {
      return false;
    }
  });

  const dismiss = useCallback(() => {
    setVisible(false);

    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch (error) {
      /* Navigation privée : l'animation se rejouera, sans conséquence. */
    }
  }, []);

  useEffect(() => {
    if (!visible) {
      return undefined;
    }

    /* Les préférences système priment : pas d'animation, pas d'attente. */
    if (reduced) {
      dismiss();

      return undefined;
    }

    const timer = setTimeout(dismiss, HOLD * 1000);

    window.addEventListener('pointerdown', dismiss);
    window.addEventListener('keydown', dismiss);
    window.addEventListener('wheel', dismiss, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('pointerdown', dismiss);
      window.removeEventListener('keydown', dismiss);
      window.removeEventListener('wheel', dismiss);
    };
  }, [dismiss, reduced, visible]);

  return (
    <AnimatePresence>
      {visible ? (
        <Box
          component={motion.div}
          key="intro"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] },
          }}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 2000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#0D0B12',
            cursor: 'pointer',
          }}
        >
          {/* Halos colorés : la scène respire au lieu d'être un aplat noir. */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.2, ease: 'easeOut' }}
            sx={{
              position: 'absolute',
              width: 620,
              height: 620,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(236,72,153,.20), transparent 62%)',
              filter: 'blur(14px)',
              pointerEvents: 'none',
            }}
          />

          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 120, y: 90 }}
            animate={{ opacity: 1, x: 150, y: 110 }}
            transition={{ duration: 2.4, ease: 'easeOut' }}
            sx={{
              position: 'absolute',
              width: 420,
              height: 420,
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(168,85,247,.18), transparent 64%)',
              filter: 'blur(16px)',
              pointerEvents: 'none',
            }}
          />

          {/* Le monogramme se dessine. */}
          <Box
            component={motion.div}
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            sx={{ position: 'relative' }}
          >
            <PivotMark size={132} tone="light" animated />
          </Box>

          {/* PIVOT — lettre par lettre. */}
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              mt: 4.5,
            }}
          >
            {WORD.split('').map((letter, index) => (
              <Typography
                component={motion.span}
                key={`${letter}-${index}`}
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: LOGO_BEATS.pivot + 0.12 + index * 0.075,
                  ease: [0.22, 1, 0.36, 1],
                }}
                sx={{
                  fontSize: { xs: 36, md: 46 },
                  fontWeight: 800,
                  color: '#fff',
                  letterSpacing: '0.16em',
                  lineHeight: 1,
                }}
              >
                {letter}
              </Typography>
            ))}
          </Box>

          {/* STORE — l'interlettrage s'ouvre en se posant. */}
          <Typography
            component={motion.div}
            initial={{ opacity: 0, letterSpacing: '0.05em' }}
            animate={{ opacity: 1, letterSpacing: '0.62em' }}
            transition={{
              duration: 1,
              delay: LOGO_BEATS.pivot + 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            sx={{
              position: 'relative',
              mt: 1.6,
              ml: '0.62em',
              fontSize: { xs: 11, md: 12.5 },
              fontWeight: 700,
              color: 'rgba(255,255,255,0.52)',
              textTransform: 'uppercase',
            }}
          >
            Store
          </Typography>

          {/* Le trait de progression : il boucle la parenthèse. */}
          <Box
            sx={{
              position: 'relative',
              mt: 5,
              width: 148,
              height: 2,
              borderRadius: 1,
              overflow: 'hidden',
              bgcolor: 'rgba(255,255,255,0.09)',
            }}
          >
            <Box
              component={motion.div}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: HOLD - 0.35, ease: [0.4, 0, 0.2, 1] }}
              sx={{
                height: '100%',
                transformOrigin: 'left',
                background: 'linear-gradient(90deg, #EC4899, #A855F7)',
              }}
            />
          </Box>
        </Box>
      ) : null}
    </AnimatePresence>
  );
}
