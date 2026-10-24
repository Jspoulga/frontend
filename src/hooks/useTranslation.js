import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import translations from '../i18n/translations';

/*
 * Traduction minimaliste, sans dépendance.
 *
 *   const { t } = useTranslation();
 *   t('cart.title')                       -> « Mon panier »
 *   t('cart.itemsCount', { count: 3 })    -> les {count} sont remplacés
 *
 * Une clé absente de la langue courante retombe sur le français, puis sur la
 * clé elle-même : l'interface n'affiche jamais de case vide.
 */
function useTranslation() {
  const language = useSelector(state => state.settings.language);

  const t = useCallback(
    (key, values) => {
      const dictionary = translations[language] || translations.fr;
      const text = dictionary[key] || translations.fr[key] || key;

      if (!values) {
        return text;
      }

      return Object.keys(values).reduce(
        (result, name) => result.split(`{${name}}`).join(values[name]),
        text,
      );
    },
    [language],
  );

  return { t, language };
}

export default useTranslation;
