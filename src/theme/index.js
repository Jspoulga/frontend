import { createTheme } from '@mui/material/styles';

import { buildPalette } from './palette';
import typography from './typography';
import buildComponents from './components';
import shadows from './shadows';

/*
 * Le thème dépend du mode : on le reconstruit quand le visiteur bascule
 * entre clair et sombre. `index.js` mémorise le résultat pour ne pas le
 * recalculer à chaque rendu.
 */
export function createAppTheme(mode = 'light') {
  const palette = buildPalette(mode);

  return createTheme({
    palette,
    typography,
    components: buildComponents(palette),
    shadows,
    shape: { borderRadius: 12 },
  });
}

/* Thème clair par défaut, pour les rares imports directs. */
const theme = createAppTheme('light');

export default theme;
