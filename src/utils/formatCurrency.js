/*
 * Tous les prix sont stockés en francs congolais (CDF) — côté CSV, API et
 * panier. L'affichage les convertit dans la devise choisie par le visiteur.
 *
 * La devise courante est tenue dans ce module plutôt que passée en paramètre :
 * `formatCurrency(price)` est appelé dans une vingtaine de composants, et un
 * changement de devise doit tous les mettre à jour sans les modifier.
 * Le composant SettingsBootstrap appelle setDisplayCurrency à chaque
 * changement.
 */

const DEFAULT_RATES = {
  CDF: { code: 'CDF', symbol: 'FC', perUnit: 1 },
  USD: { code: 'USD', symbol: '$', perUnit: 2800 },
  EUR: { code: 'EUR', symbol: '€', perUnit: 3050 },
};

/*
 * La préférence est lue dès le chargement du module, avant le premier rendu :
 * sinon la première page s'affiche en francs puis change de devise une fois
 * l'effet de démarrage exécuté.
 */
function initialPreferences() {
  try {
    const raw = localStorage.getItem('fashion_preferences');
    const parsed = raw ? JSON.parse(raw) : {};

    return {
      currency: DEFAULT_RATES[parsed.currency] || DEFAULT_RATES.CDF,
      locale: parsed.language === 'en' ? 'en-US' : 'fr-CD',
    };
  } catch (error) {
    return { currency: DEFAULT_RATES.CDF, locale: 'fr-CD' };
  }
}

const initial = initialPreferences();

let display = initial.currency;

let locale = initial.locale;

export function setDisplayCurrency(currency, language) {
  if (currency && Number(currency.perUnit) > 0) {
    display = {
      code: currency.code,
      symbol: currency.symbol || currency.code,
      perUnit: Number(currency.perUnit),
    };
  }

  if (language) {
    locale = language === 'en' ? 'en-US' : 'fr-CD';
  }
}

export function getDisplayCurrency() {
  return display;
}

export function convertFromCdf(amountInCdf) {
  return Number(amountInCdf || 0) / display.perUnit;
}

const formatCurrency = value => {
  const amount = convertFromCdf(value);

  /* Le franc congolais ne s'affiche pas avec des centimes ; le dollar et
     l'euro si, dès que le montant n'est pas rond. */
  const decimals = display.code === 'CDF' ? 0 : 2;

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: display.code,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount);
  } catch (error) {
    /* Devise personnalisée inconnue d'Intl : rendu manuel. */
    return `${amount.toLocaleString(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })} ${display.symbol}`;
  }
};

export default formatCurrency;
