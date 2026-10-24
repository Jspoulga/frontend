import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import authService from '../../services/authService';
import settingsService from '../../services/settingsService';

import { logout, sessionRestored } from '../../store/slices/authSlice';
import {
  setOffline,
  setRemoteSettings,
  selectCurrency,
} from '../../store/slices/settingsSlice';

import { setDisplayCurrency } from '../../utils/formatCurrency';
import api from '../../services/api';
import { hydrateWishlist } from '../../store/slices/wishlistSlice';

/*
 * Démarrage de l'application :
 *   - récupère les paramètres boutique (taux de change, seuil de livraison) ;
 *   - rétablit la session à partir du jeton, ou la nettoie s'il est périmé ;
 *   - tient la devise d'affichage synchronisée avec les préférences.
 *
 * Ne rend rien : c'est uniquement de la mise en route.
 */
function AppBootstrap() {
  const dispatch = useDispatch();

  const language = useSelector(state => state.settings.language);
  const currency = useSelector(selectCurrency);
  const token = useSelector(state => state.auth.token);

  useEffect(() => {
    let cancelled = false;

    settingsService
      .get()
      .then(settings => {
        if (!cancelled) {
          dispatch(setRemoteSettings(settings));
        }
      })
      .catch(() => {
        if (!cancelled) {
          dispatch(setOffline(true));
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    if (!token) {
      return undefined;
    }

    let cancelled = false;

    authService
      .me()
      .then(user => {
        if (!cancelled && user) {
          dispatch(sessionRestored(user));
        }
      })
      .catch(error => {
        /* Jeton refusé : on ferme la session. Une API injoignable, elle, ne
           doit pas déconnecter le client. */
        if (!cancelled && error?.response?.status === 401) {
          dispatch(logout());
        }
      });

    return () => {
      cancelled = true;
    };
  }, [dispatch, token]);

  /*
   * Synchronisation des favoris à l'ouverture d'une session.
   *
   * On fusionne plutôt qu'on écrase : un client qui met des articles de
   * côté avant de se connecter ne doit rien perdre. Le serveur reçoit
   * l'union des deux listes, puis fait foi.
   *
   * Un échec ne casse rien — les favoris locaux restent utilisables.
   */
  useEffect(() => {
    if (!token) {
      return undefined;
    }

    let cancelled = false;

    (async () => {
      try {
        const { data } = await api.get('/users/me/wishlist');

        const remote = Array.isArray(data) ? data : [];
        const local = JSON.parse(localStorage.getItem('fashion_wishlist') || '[]');

        const merged = new Map();

        for (const item of [...remote, ...local]) {
          if (item && item.id !== undefined) {
            merged.set(String(item.id), item);
          }
        }

        const list = Array.from(merged.values());

        if (cancelled) {
          return;
        }

        dispatch(hydrateWishlist(list));

        /* On ne réécrit le serveur que si la fusion l'enrichit. */
        if (list.length !== remote.length) {
          await api.put('/users/me/wishlist', {
            productIds: list.map(item => item.id),
          });
        }
      } catch (error) {
        /* Hors ligne ou API muette : la liste locale suffit. */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [dispatch, token]);

  useEffect(() => {
    setDisplayCurrency(currency, language);
    document.documentElement.lang = language;
  }, [currency, language]);

  return null;
}

export default AppBootstrap;
