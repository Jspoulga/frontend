/*
 * ------------------------------------------------------------------
 * Palettes claire et sombre
 * ------------------------------------------------------------------
 *
 * Les deux modes partagent les couleurs de marque (le rose et le
 * violet du logo) et ne diffèrent que par les neutres : fonds, textes
 * et filets.
 *
 * Les composants ne doivent plus écrire de teinte neutre en dur. Ils
 * passent par les jetons sémantiques — `background.paper`,
 * `text.secondary`, `divider`, `surfaceAlt` — que MUI résout selon le
 * mode actif. C'est ce qui permet au mode sombre de traverser toute la
 * boutique sans repeindre chaque page.
 */

/* Couleurs de marque : identiques dans les deux modes. */
export const BRAND = {
  accent: '#EC4899',
  accentDeep: '#BE185D',
  violet: '#A855F7',
  gradient: 'linear-gradient(135deg, #EC4899, #A855F7)',
  /* Le noir de la scène de lancement et des bandeaux vitrine. */
  night: '#0D0B12',
};

const light = {
  mode: 'light',

  primary: { main: '#111827', contrastText: '#ffffff' },
  secondary: { main: '#7C3AED', contrastText: '#ffffff' },

  background: { default: '#F8FAFC', paper: '#FFFFFF' },

  /* Fond secondaire : champs de recherche, pastilles, zones creuses. */
  surfaceAlt: '#F1F3F7',

  /*
   * `disabled` sert de teinte « discrète » à quantité de libellés
   * secondaires. Le gris ardoise 400 d'origine (#94A3B8) tombait à
   * 2,5:1 sur fond blanc — sous le seuil lisible pour du petit texte.
   * Le gris 500 remonte à 4,6:1 sans perdre la discrétion voulue.
   */
  text: { primary: '#111827', secondary: '#64748B', disabled: '#6B7280' },

  divider: '#E5E7EB',

  success: { main: '#16A34A' },
  error: { main: '#DC2626' },
  warning: { main: '#F59E0B' },

  brand: BRAND,
};

const dark = {
  mode: 'dark',

  /*
   * Le blanc pur fatigue sur fond sombre : le texte principal tire
   * légèrement vers le lavande pour rester dans l'univers du logo.
   */
  primary: { main: '#F2F1F6', contrastText: '#12101A' },
  secondary: { main: '#A855F7', contrastText: '#ffffff' },

  background: { default: '#0B0A0F', paper: '#15131C' },

  surfaceAlt: '#1E1B28',

  /* Même raisonnement en sombre : la teinte discrète s'éclaircit. */
  text: { primary: '#F2F1F6', secondary: '#A19CB0', disabled: '#8E88A0' },

  divider: 'rgba(255, 255, 255, 0.10)',

  /* Teintes d'état éclaircies : les versions claires deviennent
     illisibles sur un fond sombre. */
  success: { main: '#4ADE80' },
  error: { main: '#F87171' },
  warning: { main: '#FBBF24' },

  brand: BRAND,
};

export function buildPalette(mode) {
  return mode === 'dark' ? dark : light;
}

export default light;
