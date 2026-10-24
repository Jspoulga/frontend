import React, { useEffect, useMemo, useState } from 'react';

import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { useSelector } from 'react-redux';

import { createAppTheme } from './index';

/*
 * ------------------------------------------------------------------
 * Le pont entre la préférence du visiteur et MUI
 * ------------------------------------------------------------------
 *
 * Trois réglages possibles : « clair », « sombre », ou « système » —
 * ce dernier suit le système d'exploitation et réagit si le visiteur
 * bascule son Mac ou son téléphone en cours de navigation.
 */

/* Lit le réglage du système, avec repli si le navigateur ne le connaît pas. */
function readSystemMode() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  } catch (error) {
    return 'light';
  }
}

export default function ThemeBridge({ children }) {
  const preference = useSelector(state => state.settings.themeMode);

  const [systemMode, setSystemMode] = useState(readSystemMode);

  /* On ne suit le système que lorsque la préférence le demande. */
  useEffect(() => {
    if (preference !== 'system') {
      return undefined;
    }

    let query;

    try {
      query = window.matchMedia('(prefers-color-scheme: dark)');
    } catch (error) {
      return undefined;
    }

    const onChange = event => setSystemMode(event.matches ? 'dark' : 'light');

    query.addEventListener('change', onChange);

    /* Le réglage a pu changer pendant que la préférence était figée. */
    setSystemMode(query.matches ? 'dark' : 'light');

    return () => query.removeEventListener('change', onChange);
  }, [preference]);

  const mode = preference === 'system' ? systemMode : preference;

  const theme = useMemo(() => createAppTheme(mode), [mode]);

  /*
   * La barre d'adresse des navigateurs mobiles se teinte avec
   * theme-color : on la tient d'accord avec le mode affiché.
   */
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]');

    if (meta) {
      meta.setAttribute('content', mode === 'dark' ? '#0B0A0F' : '#FFFFFF');
    }

    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/*
        Le basculement se fait en fondu plutôt que d'un coup sec — mais
        jamais pour les personnes qui ont réduit les animations, et
        jamais sur les transformations, sinon toutes les animations de
        la boutique seraient ralenties.
      */}
      {/*
        Jetons exposés en variables CSS. C'est ce qui permet au mode
        sombre de traverser des feuilles de style qui écrivent des
        couleurs en dur : une variable s'utilise partout où une couleur
        est attendue, y compris dans une bordure composée ou un dégradé,
        là où un jeton MUI (« text.primary ») ne serait pas résolu.
      */}
      <GlobalStyles
        styles={{
          ':root': {
            '--pv-canvas': theme.palette.background.default,
            '--pv-surface': theme.palette.background.paper,
            '--pv-surface-alt': theme.palette.surfaceAlt,
            '--pv-ink': theme.palette.text.primary,
            '--pv-body': theme.palette.text.secondary,
            '--pv-muted': theme.palette.text.disabled,
            '--pv-line': theme.palette.divider,
            /* Barre de navigation translucide : le flou a besoin d'une
               couleur semi-opaque, pas d'un jeton opaque. */
            '--pv-surface-blur':
              mode === 'dark'
                ? 'rgba(21, 19, 28, 0.82)'
                : 'rgba(255, 255, 255, 0.86)',
            /* Bandeau de contraste (annonces) : sombre sur fond clair,
               légèrement surélevé sur fond sombre — sinon il devient
               clair sur clair et son texte disparaît. */
            '--pv-band': mode === 'dark' ? '#1E1B28' : theme.palette.text.primary,
            '--pv-band-ink':
              mode === 'dark'
                ? theme.palette.text.secondary
                : 'rgba(255, 255, 255, 0.92)',
            '--pv-accent': theme.palette.brand.accent,
            /* Le rose foncé devient illisible sur fond sombre : on
               l'éclaircit au lieu de l'assombrir. */
            '--pv-accent-deep':
              mode === 'dark' ? '#F472B6' : theme.palette.brand.accentDeep,
            '--pv-violet': theme.palette.brand.violet,
            /*
              Fonds d'état : en clair ce sont des teintes pastel, en
              sombre des voiles translucides de la même couleur. Une
              pastille verte pâle sur fond noir serait un aplat lumineux
              en plein milieu de la page.
            */
            '--pv-success': theme.palette.success.main,
            '--pv-success-soft':
              mode === 'dark' ? 'rgba(74, 222, 128, 0.14)' : '#F0FDF4',
            '--pv-error': theme.palette.error.main,
            '--pv-error-soft':
              mode === 'dark' ? 'rgba(248, 113, 113, 0.14)' : '#FEF2F2',
            '--pv-warning': theme.palette.warning.main,
            '--pv-warning-soft':
              mode === 'dark' ? 'rgba(251, 191, 36, 0.14)' : '#FFFBEB',
            '--pv-accent-soft':
              mode === 'dark' ? 'rgba(236, 72, 153, 0.16)' : '#FDF2F8',
            /* Ombre portée : invisible sur fond sombre, on la renforce. */
            '--pv-shadow':
              mode === 'dark'
                ? 'rgba(0, 0, 0, 0.5)'
                : 'rgba(15, 23, 42, 0.08)',
          },
          /*
           * L'animation ne touche qu'à la position, jamais à
           * l'opacité.
           *
           * Une animation qui part d'`opacity: 0` laisse le contenu
           * invisible tant qu'elle n'a pas tourné — or un onglet en
           * arrière-plan voit ses animations suspendues par le
           * navigateur. Le glissement seul suffit à donner vie à
           * l'arrivée, et aucune carte ne peut disparaître.
           */
          '@keyframes pivotCardIn': {
            from: { transform: 'translateY(14px)' },
            to: { transform: 'none' },
          },

          '@media (prefers-reduced-motion: no-preference)': {
            /*
              Les cartes du contenu se posent en cascade à l'arrivée sur
              la page. Sont écartés les conteneurs flottants — dialogues,
              menus, tiroirs, alertes — dont l'apparition est déjà gérée
              par MUI et qui paraîtraient en retard.
            */
            'main .MuiPaper-root:not(.MuiDialog-paper):not(.MuiMenu-paper):not(.MuiPopover-paper):not(.MuiDrawer-paper):not(.MuiAlert-root):not(.MuiAccordion-root)':
              {
                animation: 'pivotCardIn .5s cubic-bezier(.22,1,.36,1) backwards',
              },

            'main .MuiPaper-root:nth-child(2)': { animationDelay: '60ms' },
            'main .MuiPaper-root:nth-child(3)': { animationDelay: '120ms' },
            'main .MuiPaper-root:nth-child(4)': { animationDelay: '180ms' },
            'main .MuiPaper-root:nth-child(5)': { animationDelay: '240ms' },
            'main .MuiPaper-root:nth-child(n+6)': { animationDelay: '300ms' },

            /* Relief au survol sur tout ce qui est cliquable. */
            'main a .MuiPaper-root, main .MuiPaper-root[role="button"], main .MuiButtonBase-root.MuiPaper-root':
              {
                transition:
                  'transform .28s cubic-bezier(.22,1,.36,1), box-shadow .28s ease',
              },

            'main a:hover .MuiPaper-root, main .MuiPaper-root[role="button"]:hover':
              {
                transform: 'translateY(-3px)',
              },

            'body, body *': {
              transition:
                'background-color .34s ease, border-color .34s ease, color .22s ease',
            },
          },
        }}
      />

      {children}
    </ThemeProvider>
  );
}
