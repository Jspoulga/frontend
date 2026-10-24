import api from './api';

/*
 * Catalogue de démonstration utilisé tant que l'API n'est pas joignable.
 *
 * Les visuels sont servis par le CDN Unsplash ; chaque URL a été vérifiée
 * (chargement effectif dans le navigateur) avant d'être ajoutée ici.
 */
const photo = id =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=900&q=80`;

const IMG = {
  tshirt: photo('1521572163474-6864f9cf17ab'),
  dressElegant: photo('1539008835657-9e8e9680c956'),
  sneakersRed: photo('1542291026-7eec264c27ff'),
  handbagLux: photo('1584917865442-de89df76afd3'),
  jacketMen: photo('1551028719-00167b16eac5'),
  outfitWomen: photo('1483985988355-763728e1935b'),

  jeanJacket: photo('1611312449408-fcece27cdbb7'),
  bomberKhaki: photo('1548883354-94bcfe321cbb'),
  leatherJacket: photo('1675877879221-871aa9f7c314'),

  dressLeopard: photo('1616313253719-c46514cddee1'),
  dressSummer: photo('1515372039744-b8f02a3ae446'),
  suitWomen: photo('1614786269829-d24616faf56d'),
  dressMidi: photo('1599662875272-64de8289f6d8'),
  dressCocktail: photo('1495385794356-15371f348c31'),

  sneakersWhite: photo('1600269452121-4f2416e55c28'),
  sneakersChunky: photo('1608667508764-33cf0726b13a'),
  runnersNeon: photo('1606107557195-0e29a4b5b4aa'),

  bagTote: photo('1598532163257-ae3c6b2524b6'),
  bagCross: photo('1600857062241-98e5dba7f214'),
  watchSteel: photo('1604242692760-2f7b0c26856d'),

  kidsSet: photo('1596870230751-ebdfce98ec42'),
  kidsBoy: photo('1519238263530-99bdd11df2ea'),
  kidsGirlDress: photo('1578897367107-2828e351c8a8'),
};
const products = [
  {
    id: 1,
    name: 'T-shirt oversized premium',
    category: 'Hommes',
    price: 25000,
    oldPrice: 35000,
    rating: 4.8,
    reviews: 124,
    image: IMG.tshirt,
    images: [IMG.jeanJacket, IMG.jacketMen],
    description:
      'T-shirt oversized en coton peigné, doux et respirant. Une coupe ample qui tombe bien, à porter au quotidien.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Noir', 'Blanc', 'Gris'],
  },

  {
    id: 2,
    name: 'Robe élégante soirée',
    category: 'Femmes',
    price: 55000,
    oldPrice: 70000,
    rating: 4.9,
    reviews: 86,
    image: IMG.dressElegant,
    images: [IMG.dressLeopard, IMG.suitWomen],
    description:
      'Robe élégante à la coupe fluide, parfaite pour les occasions spéciales et les soirées.',
    sizes: ['S', 'M', 'L'],
    colors: ['Noir', 'Rouge'],
  },

  {
    id: 3,
    name: 'Sneakers classiques',
    category: 'Chaussures',
    price: 75000,
    oldPrice: 95000,
    rating: 4.7,
    reviews: 213,
    image: IMG.sneakersRed,
    images: [IMG.sneakersWhite, IMG.sneakersChunky],
    description:
      'Sneakers modernes et confortables, semelle amortissante pour toute la journée.',
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: ['Rouge', 'Noir', 'Blanc'],
  },

  {
    id: 4,
    name: 'Sac à main luxe',
    category: 'Accessoires',
    price: 85000,
    oldPrice: 110000,
    rating: 4.6,
    reviews: 74,
    image: IMG.handbagLux,
    images: [IMG.bagTote, IMG.bagCross],
    description:
      'Sac élégant à finition premium, doublure intérieure et compartiment zippé.',
    sizes: [],
    colors: ['Noir', 'Marron'],
  },

  {
    id: 5,
    name: 'Veste premium homme',
    category: 'Hommes',
    price: 120000,
    oldPrice: 150000,
    rating: 4.8,
    reviews: 65,
    image: IMG.jacketMen,
    images: [IMG.bomberKhaki, IMG.leatherJacket],
    description:
      'Veste premium à la coupe moderne, tissu déperlant et finitions soignées.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Noir', 'Beige'],
  },

  {
    id: 6,
    name: 'Ensemble casual femme',
    category: 'Femmes',
    price: 65000,
    oldPrice: 85000,
    rating: 4.5,
    reviews: 51,
    image: IMG.outfitWomen,
    images: [IMG.dressSummer, IMG.dressCocktail],
    description:
      'Ensemble casual moderne et confortable, idéal pour la ville comme pour le week-end.',
    sizes: ['S', 'M', 'L'],
    colors: ['Beige', 'Noir'],
  },

  {
    id: 7,
    name: 'Veste en jean délavée',
    category: 'Hommes',
    price: 78000,
    oldPrice: 98000,
    rating: 4.7,
    reviews: 38,
    isNew: true,
    image: IMG.jeanJacket,
    images: [IMG.bomberKhaki, IMG.leatherJacket],
    description:
      'Veste en jean délavée à coupe droite, boutons métal et poches poitrine. Elle se patine avec le temps.',
    sizes: ['M', 'L', 'XL'],
    colors: ['Bleu', 'Noir'],
  },

  {
    id: 8,
    name: 'Bomber kaki',
    category: 'Hommes',
    price: 95000,
    oldPrice: 125000,
    rating: 4.6,
    reviews: 22,
    isNew: true,
    image: IMG.bomberKhaki,
    images: [IMG.jeanJacket, IMG.leatherJacket],
    description:
      'Bomber léger à col côtelé, doublure satinée et poches zippées.',
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Kaki', 'Noir'],
  },

  {
    id: 9,
    name: 'Perfecto cuir noir',
    category: 'Hommes',
    price: 165000,
    oldPrice: 205000,
    rating: 4.9,
    reviews: 44,
    image: IMG.leatherJacket,
    images: [IMG.bomberKhaki, IMG.jacketMen],
    description:
      'Perfecto en cuir pleine fleur, zips asymétriques et doublure intérieure.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Noir'],
  },

  {
    id: 10,
    name: 'Robe longue imprimée',
    category: 'Femmes',
    price: 68000,
    oldPrice: 85000,
    rating: 4.8,
    reviews: 57,
    isNew: true,
    image: IMG.dressLeopard,
    images: [IMG.dressMidi, IMG.dressElegant],
    description:
      'Robe longue au tombé fluide, imprimé exclusif et manches longues.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Imprimé', 'Noir'],
  },

  {
    id: 11,
    name: "Robe d'été épaules dénudées",
    category: 'Femmes',
    price: 52000,
    oldPrice: 65000,
    rating: 4.6,
    reviews: 63,
    image: IMG.dressSummer,
    images: [IMG.dressLeopard, IMG.outfitWomen],
    description:
      "Robe d'été légère à volants et épaules dénudées, coton mélangé.",
    sizes: ['S', 'M', 'L'],
    colors: ['Blanc', 'Beige'],
  },

  {
    id: 12,
    name: 'Ensemble tailleur femme',
    category: 'Femmes',
    price: 98000,
    oldPrice: 120000,
    rating: 4.9,
    reviews: 29,
    image: IMG.suitWomen,
    images: [IMG.dressMidi, IMG.outfitWomen],
    description:
      'Tailleur deux pièces, veste ajustée et pantalon à pinces. Du bureau au dîner.',
    sizes: ['S', 'M', 'L'],
    colors: ['Noir', 'Ivoire'],
  },

  {
    id: 13,
    name: 'Robe midi bleu nuit',
    category: 'Femmes',
    price: 74000,
    oldPrice: 92000,
    rating: 4.7,
    reviews: 41,
    image: IMG.dressMidi,
    images: [IMG.dressCocktail, IMG.dressLeopard],
    description:
      'Robe midi en maille fine, taille élastiquée et jupe évasée.',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Bleu nuit', 'Noir'],
  },

  {
    id: 14,
    name: 'Robe cocktail cintrée',
    category: 'Femmes',
    price: 88000,
    oldPrice: 110000,
    rating: 4.8,
    reviews: 26,
    isNew: true,
    image: IMG.dressCocktail,
    images: [IMG.dressElegant, IMG.dressMidi],
    description:
      'Robe cintrée au décolleté croisé, tissu satiné qui capte la lumière.',
    sizes: ['S', 'M', 'L'],
    colors: ['Turquoise', 'Noir'],
  },

  {
    id: 15,
    name: 'Sneakers cuir blanches',
    category: 'Chaussures',
    price: 82000,
    oldPrice: 99000,
    rating: 4.8,
    reviews: 146,
    isNew: true,
    image: IMG.sneakersWhite,
    images: [IMG.sneakersChunky, IMG.runnersNeon],
    description:
      'Sneakers en cuir lisse, silhouette épurée qui se porte avec tout.',
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: ['Blanc'],
  },

  {
    id: 16,
    name: 'Sneakers chunky rosé',
    category: 'Chaussures',
    price: 78000,
    oldPrice: 95000,
    rating: 4.5,
    reviews: 91,
    image: IMG.sneakersChunky,
    images: [IMG.sneakersWhite, IMG.sneakersRed],
    description:
      'Sneakers à semelle épaisse et empiècements matelassés, maintien confortable.',
    sizes: ['36', '37', '38', '39', '40', '41'],
    colors: ['Rosé', 'Blanc'],
  },

  {
    id: 17,
    name: 'Runners néon',
    category: 'Chaussures',
    price: 72000,
    oldPrice: 88000,
    rating: 4.6,
    reviews: 118,
    image: IMG.runnersNeon,
    images: [IMG.sneakersChunky, IMG.sneakersWhite],
    description:
      'Chaussures de running respirantes, mousse réactive et maintien du talon renforcé.',
    sizes: ['40', '41', '42', '43', '44', '45'],
    colors: ['Néon', 'Noir'],
  },

  {
    id: 18,
    name: 'Cabas cuir tressé',
    category: 'Accessoires',
    price: 92000,
    oldPrice: 115000,
    rating: 4.7,
    reviews: 34,
    isNew: true,
    image: IMG.bagTote,
    images: [IMG.bagCross, IMG.handbagLux],
    description:
      'Grand cabas en cuir tressé, anses souples et chaîne amovible.',
    sizes: [],
    colors: ['Camel', 'Noir'],
  },

  {
    id: 19,
    name: 'Sac bandoulière compact',
    category: 'Accessoires',
    price: 64000,
    oldPrice: 79000,
    rating: 4.4,
    reviews: 48,
    image: IMG.bagCross,
    images: [IMG.bagTote, IMG.handbagLux],
    description:
      "Petit sac bandoulière du quotidien : l\u2019essentiel, rien de plus.",
    sizes: [],
    colors: ['Camel', 'Noir'],
  },

  {
    id: 20,
    name: 'Montre acier classique',
    category: 'Accessoires',
    price: 145000,
    oldPrice: 180000,
    rating: 4.9,
    reviews: 61,
    image: IMG.watchSteel,
    images: [IMG.bagTote, IMG.handbagLux],
    description:
      'Montre à bracelet acier, cadran sobre et verre minéral anti-rayures.',
    sizes: [],
    colors: ['Argent', 'Doré'],
  },

  {
    id: 21,
    name: 'Ensemble enfant coton',
    category: 'Enfants',
    price: 38000,
    oldPrice: 48000,
    rating: 4.6,
    reviews: 27,
    isNew: true,
    image: IMG.kidsSet,
    images: [IMG.kidsBoy, IMG.kidsGirlDress],
    description:
      'Ensemble deux pièces en coton doux, taille élastiquée pour bouger librement.',
    sizes: ['2 ans', '4 ans', '6 ans', '8 ans'],
    colors: ['Beige', 'Bleu'],
  },

  {
    id: 22,
    name: 'Tenue garçon gilet et short',
    category: 'Enfants',
    price: 42000,
    oldPrice: 52000,
    rating: 4.5,
    reviews: 19,
    image: IMG.kidsBoy,
    images: [IMG.kidsSet, IMG.kidsGirlDress],
    description:
      "Gilet fin et short assorti, une tenue habillée que l\u2019enfant garde toute la journée.",
    sizes: ['4 ans', '6 ans', '8 ans', '10 ans'],
    colors: ['Bleu', 'Gris'],
  },

  {
    id: 23,
    name: 'Robe enfant à volants',
    category: 'Enfants',
    price: 35000,
    oldPrice: 45000,
    rating: 4.7,
    reviews: 33,
    isNew: true,
    image: IMG.kidsGirlDress,
    images: [IMG.kidsSet, IMG.kidsBoy],
    description:
      'Robe à volants en coton léger, manches longues et ceinture nouée.',
    sizes: ['4 ans', '6 ans', '8 ans', '10 ans'],
    colors: ['Rouge', 'Rose'],
  },
];

const productService = {
  async getProducts() {
    try {
      const response = await api.get('/products');

      return response.data;
    } catch (error) {
      return products;
    }
  },

  async getProduct(id) {
    try {
      const response = await api.get(`/products/${id}`);

      return response.data;
    } catch (error) {
      return products.find(
        product => product.id === Number(id)
      );
    }
  },

  async createProduct(data) {
    try {
      const response = await api.post('/products', data);

      return response.data;
    } catch (error) {
      return {
        ...data,
        id: Date.now(),
      };
    }
  },
};

export default productService;
