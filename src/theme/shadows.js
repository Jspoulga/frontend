/*
 * MUI attend exactement 25 niveaux d'ombre (0 à 24).
 *
 * Avec une liste plus courte, tout composant utilisant une élévation élevée
 * (Drawer = 16, Menu = 8, Dialog = 24, Tooltip, Popover) déclenche une erreur
 * console et se retrouve sans ombre. On garde les niveaux dessinés à la main
 * et on prolonge la courbe jusqu'à 24.
 */

const authored = [
  'none',
  '0 1px 2px rgba(15, 23, 42, 0.04)',
  '0 4px 12px rgba(15, 23, 42, 0.06)',
  '0 8px 24px rgba(15, 23, 42, 0.08)',
  '0 12px 32px rgba(15, 23, 42, 0.10)',
  '0 20px 40px rgba(15, 23, 42, 0.12)',
];

const TOTAL_LEVELS = 25;

const extended = Array.from(
  { length: TOTAL_LEVELS - authored.length },
  (unused, index) => {
    const level = authored.length + index;

    const offsetY = Math.round(level * 1.6);
    const blur = Math.round(level * 3.2);
    const opacity = (0.12 + level * 0.005).toFixed(3);

    return `0 ${offsetY}px ${blur}px rgba(15, 23, 42, ${opacity})`;
  },
);

const shadows = [...authored, ...extended];

export default shadows;
