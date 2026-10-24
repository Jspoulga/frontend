/*
 * ------------------------------------------------------------------
 * Pays, villes et communes de livraison
 * ------------------------------------------------------------------
 *
 * Deux pays desservis : la République démocratique du Congo et la
 * Biélorussie.
 *
 * Les villes sont listées plutôt que saisies librement, pour une
 * raison concrète : un livreur ne retrouve pas « Kin », « kinshasa »
 * et « KINSHSA » comme une seule destination. Une liste fermée rend
 * les commandes groupables par zone.
 *
 * Kinshasa a ses communes, parce que c'est ainsi qu'on y donne une
 * adresse : la commune compte autant que l'avenue. Les villes sans
 * subdivision listée acceptent un quartier libre.
 */

export const COUNTRIES = [
  { code: 'CD', name: 'République démocratique du Congo', dialCode: '+243', flag: '🇨🇩' },
  { code: 'BY', name: 'Biélorussie', dialCode: '+375', flag: '🇧🇾' },
];

/* RDC — chefs-lieux de province et principales agglomérations. */
const CD_CITIES = [
  { name: 'Kinshasa', province: 'Kinshasa' },
  { name: 'Lubumbashi', province: 'Haut-Katanga' },
  { name: 'Mbuji-Mayi', province: 'Kasaï-Oriental' },
  { name: 'Kananga', province: 'Kasaï-Central' },
  { name: 'Kisangani', province: 'Tshopo' },
  { name: 'Bukavu', province: 'Sud-Kivu' },
  { name: 'Goma', province: 'Nord-Kivu' },
  { name: 'Tshikapa', province: 'Kasaï' },
  { name: 'Kolwezi', province: 'Lualaba' },
  { name: 'Likasi', province: 'Haut-Katanga' },
  { name: 'Matadi', province: 'Kongo-Central' },
  { name: 'Boma', province: 'Kongo-Central' },
  { name: 'Uvira', province: 'Sud-Kivu' },
  { name: 'Butembo', province: 'Nord-Kivu' },
  { name: 'Beni', province: 'Nord-Kivu' },
  { name: 'Bunia', province: 'Ituri' },
  { name: 'Isiro', province: 'Haut-Uélé' },
  { name: 'Kindu', province: 'Maniema' },
  { name: 'Mbandaka', province: 'Équateur' },
  { name: 'Kikwit', province: 'Kwilu' },
  { name: 'Bandundu', province: 'Kwilu' },
  { name: 'Kamina', province: 'Haut-Lomami' },
  { name: 'Kalemie', province: 'Tanganyika' },
  { name: 'Gemena', province: 'Sud-Ubangi' },
  { name: 'Gbadolite', province: 'Nord-Ubangi' },
  { name: 'Mwene-Ditu', province: 'Lomami' },
  { name: 'Kabinda', province: 'Lomami' },
  { name: 'Lisala', province: 'Mongala' },
  { name: 'Buta', province: 'Bas-Uélé' },
  { name: 'Inongo', province: 'Mai-Ndombe' },
  { name: 'Kenge', province: 'Kwango' },
  { name: 'Baraka', province: 'Sud-Kivu' },
  { name: 'Moba', province: 'Tanganyika' },
  { name: 'Kasumbalesa', province: 'Haut-Katanga' },
  { name: 'Kipushi', province: 'Haut-Katanga' },
  { name: 'Boende', province: 'Tshuapa' },
  { name: 'Lusambo', province: 'Sankuru' },
  { name: 'Kabalo', province: 'Tanganyika' },
];

/* Les 24 communes de Kinshasa. */
const KINSHASA_COMMUNES = [
  'Bandalungwa', 'Barumbu', 'Bumbu', 'Gombe', 'Kalamu', 'Kasa-Vubu',
  'Kimbanseke', 'Kinshasa', 'Kintambo', 'Kisenso', 'Lemba', 'Limete',
  'Lingwala', 'Makala', 'Maluku', 'Masina', 'Matete', 'Mont-Ngafula',
  'Ndjili', 'Ngaba', 'Ngaliema', 'Ngiri-Ngiri', 'Nsele', 'Selembao',
];

/* Communes de Lubumbashi, deuxième ville du pays. */
const LUBUMBASHI_COMMUNES = [
  'Lubumbashi', 'Kampemba', 'Katuba', 'Kenya', 'Rwashi', 'Annexe', 'Kamalondo',
];

/* Biélorussie — villes principales par région. */
const BY_CITIES = [
  { name: 'Minsk', province: 'Minsk' },
  { name: 'Gomel', province: 'Gomel' },
  { name: 'Moguilev', province: 'Moguilev' },
  { name: 'Vitebsk', province: 'Vitebsk' },
  { name: 'Grodno', province: 'Grodno' },
  { name: 'Brest', province: 'Brest' },
  { name: 'Babrouïsk', province: 'Moguilev' },
  { name: 'Baranavitchi', province: 'Brest' },
  { name: 'Barysaw', province: 'Minsk' },
  { name: 'Pinsk', province: 'Brest' },
  { name: 'Orcha', province: 'Vitebsk' },
  { name: 'Mazyr', province: 'Gomel' },
  { name: 'Salihorsk', province: 'Minsk' },
  { name: 'Navapolatsk', province: 'Vitebsk' },
  { name: 'Lida', province: 'Grodno' },
  { name: 'Maladzetchna', province: 'Minsk' },
  { name: 'Polatsk', province: 'Vitebsk' },
  { name: 'Jlobine', province: 'Gomel' },
  { name: 'Svetlahorsk', province: 'Gomel' },
  { name: 'Retchytsa', province: 'Gomel' },
  { name: 'Sloutsk', province: 'Minsk' },
  { name: 'Jodzina', province: 'Minsk' },
  { name: 'Slonim', province: 'Grodno' },
  { name: 'Kobryn', province: 'Brest' },
  { name: 'Vawkavysk', province: 'Grodno' },
  { name: 'Kalinkavitchy', province: 'Gomel' },
  { name: 'Smarhon', province: 'Grodno' },
  { name: 'Rahatchow', province: 'Gomel' },
  { name: 'Asipovitchy', province: 'Moguilev' },
  { name: 'Horki', province: 'Moguilev' },
  { name: 'Navahroudak', province: 'Grodno' },
  { name: 'Dziarjynsk', province: 'Minsk' },
  { name: 'Luninets', province: 'Brest' },
  { name: 'Marina Horka', province: 'Minsk' },
  { name: 'Biaroza', province: 'Brest' },
  { name: 'Ivatsevitchy', province: 'Brest' },
  { name: 'Stowbtsy', province: 'Minsk' },
  { name: 'Chtchoutchyn', province: 'Grodno' },
];

const CITIES = { CD: CD_CITIES, BY: BY_CITIES };

const DISTRICTS = {
  'CD:Kinshasa': KINSHASA_COMMUNES,
  'CD:Lubumbashi': LUBUMBASHI_COMMUNES,
};

export function citiesOf(countryCode) {
  return CITIES[countryCode] || [];
}

export function cityNames(countryCode) {
  return citiesOf(countryCode).map(city => city.name);
}

/*
 * Communes d'une ville. Vide pour la plupart : on laisse alors saisir
 * un quartier librement plutôt que d'inventer un découpage.
 */
export function districtsOf(countryCode, cityName) {
  return DISTRICTS[`${countryCode}:${cityName}`] || [];
}

export function provinceOf(countryCode, cityName) {
  return citiesOf(countryCode).find(city => city.name === cityName)?.province || '';
}

export function countryOf(code) {
  return COUNTRIES.find(country => country.code === code) || COUNTRIES[0];
}

/* Le libellé qu'on imprime sur un bon de livraison. */
export function formatLocation({ country, city, district }) {
  const parts = [district, city, countryOf(country)?.name].filter(Boolean);

  return parts.join(', ');
}

const locations = {
  COUNTRIES,
  cityNames,
  citiesOf,
  countryOf,
  districtsOf,
  formatLocation,
  provinceOf,
};

export default locations;
