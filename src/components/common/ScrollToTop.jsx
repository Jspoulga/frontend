import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/*
 * React Router conserve la position de défilement d'une page à l'autre :
 * on arrivait en bas d'une fiche produit après avoir cliqué depuis le bas
 * d'une liste. On remonte à chaque navigation, sauf retour arrière du
 * navigateur où la position d'origine est plus utile.
 */
function ScrollToTop() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    if (window.history.scrollRestoration) {
      window.history.scrollRestoration = 'manual';
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' in document.documentElement.style ? 'instant' : 'auto' });
  }, [pathname, search]);

  return null;
}

export default ScrollToTop;
