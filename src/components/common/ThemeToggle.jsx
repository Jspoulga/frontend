import React from 'react';

import { Box, IconButton, Tooltip } from '@mui/material';
import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';

import { setThemeMode } from '../../store/slices/settingsSlice';

/*
 * Bascule clair / sombre de la barre de navigation.
 *
 * Un clic fixe explicitement le mode opposé à celui affiché : si la
 * préférence suivait le système, elle cesse de le suivre — c'est ce
 * qu'attend quelqu'un qui appuie sur un interrupteur. Le réglage
 * « suivre le système » reste disponible dans les paramètres du compte.
 */
export default function ThemeToggle({ size = 'medium', color }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const preference = useSelector(state => state.settings.themeMode);

  const isDark = theme.palette.mode === 'dark';

  const label = isDark ? 'Passer en mode clair' : 'Passer en mode sombre';

  return (
    <Tooltip title={label}>
      <IconButton
        onClick={() => dispatch(setThemeMode(isDark ? 'light' : 'dark'))}
        aria-label={label}
        size={size}
        sx={{ color: color || 'text.primary', position: 'relative' }}
      >
        {/* Les deux icônes se croisent en tournant : le geste se voit. */}
        <Box
          sx={{
            width: 24,
            height: 24,
            display: 'grid',
            placeItems: 'center',
            position: 'relative',
          }}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.span
              key={isDark ? 'dark' : 'light'}
              initial={{ opacity: 0, rotate: -80, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 80, scale: 0.6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'grid', placeItems: 'center' }}
            >
              {isDark ? (
                <LightModeRounded sx={{ fontSize: 22 }} />
              ) : (
                <DarkModeRounded sx={{ fontSize: 21 }} />
              )}
            </motion.span>
          </AnimatePresence>
        </Box>

        {/* Pastille discrète tant que la préférence suit le système. */}
        {preference === 'system' ? (
          <Box
            sx={{
              position: 'absolute',
              right: 6,
              bottom: 6,
              width: 5,
              height: 5,
              borderRadius: '50%',
              bgcolor: 'brand.accent',
            }}
          />
        ) : null}
      </IconButton>
    </Tooltip>
  );
}
