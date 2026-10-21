// Catering packages, prices, delivery area, and FAQ. The /catering/ page
// renders its tables, FAQ, and JSON-LD from this one object so the visible
// prices and the structured data can never drift apart. Every price here
// comes directly from the client (Oct 2026); do not add items or prices
// without her confirmation.
import type { ImageMetadata } from 'astro';
import { business, addressLines, restaurantId } from './business';
import quesoDipImg from '../assets/images/catering/queso-dip-skillet-chips.jpg';
import beefTacoImg from '../assets/images/catering/beef-taco-rice-beans.jpg';

export const cateringFacts = {
  minimumGuests: 15,
  noticeHours: 24,
  deliveryRadiusMiles: 15,
  deliveryFee: 25,
};

// Formspree form for catering quote requests. Submissions go to
// scscmo@gmail.com; the recipient is set in the Formspree dashboard.
export const quoteFormEndpoint = 'https://formspree.io/f/mbgdvozg';

export type CateringItem = {
  name: string;
  price: number;
  perPerson?: boolean;
  serves?: string;
};

export type CateringMenu = {
  id: string;
  title: string;
  itemHeading: string;
  showServes: boolean;
  items: CateringItem[];
};

export const tacoBar: CateringMenu = {
  id: 'taco-bar',
  title: 'Taco Bar',
  itemHeading: 'Package',
  showServes: false,
  items: [
    { name: 'Taco bar, 1 taco per person', price: 8.59, perPerson: true },
    { name: 'Taco bar, 2 tacos per person', price: 12.59, perPerson: true },
  ],
};

export const enchiladaMeals: CateringMenu = {
  id: 'enchilada-meals',
  title: 'Enchilada Meals',
  itemHeading: 'Meal',
  showServes: false,
  items: [
    { name: '1 cheese enchilada meal', price: 7.59, perPerson: true },
    { name: '2 cheese enchilada meal', price: 11.59, perPerson: true },
    { name: '1 meat enchilada meal', price: 9.29, perPerson: true },
    { name: '2 meat enchilada meal', price: 13.79, perPerson: true },
  ],
};

export const traysAndSides: CateringMenu = {
  id: 'trays-and-sides',
  title: 'Take-and-Bake Trays & Sides',
  itemHeading: 'Item',
  showServes: true,
  items: [
    { name: 'Half tray cheese enchiladas', serves: '7 enchiladas', price: 20 },
    { name: 'Half tray meat enchiladas', serves: '7 enchiladas', price: 32 },
    { name: 'Full tray cheese enchiladas', serves: '15 enchiladas', price: 40 },
    { name: 'Full tray meat enchiladas', serves: '15 enchiladas', price: 65 },
    { name: 'Half tray refried or black beans', serves: 'About 15 people', price: 20 },
    { name: 'Half tray rice', serves: 'About 15 people', price: 20 },
    { name: 'Bag of chips + pint of salsa', price: 10.29 },
    { name: 'Pint of salsa', price: 3.59 },
  ],
};

export const cateringMenus = [tacoBar, enchiladaMeals, traysAndSides];

// Whole dollars display without cents, matching the client's price list.
export function formatPrice(price: number) {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}

// Real cities inside roughly 15 miles of 6878 S State Street.
export const deliveryAreas = [
  'Midvale',
  'Sandy',
  'Murray',
  'West Jordan',
  'Cottonwood Heights',
  'Taylorsville',
  'Draper',
  'Holladay',
  'Salt Lake City',
  'South Jordan',
  'West Valley City',
  'Riverton',
  'Herriman',
];

export const quotePackages = ['Taco bar', 'Enchilada meals', 'Trays & sides', 'Not sure yet'];

const { minimumGuests, noticeHours, deliveryRadiusMiles, deliveryFee } = cateringFacts;

export const cateringFaqs = [
  {
    question: "What's the minimum order, and how much notice do you need?",
    answer: `Catering orders start at ${minimumGuests} people. Please place your order at least ${noticeHours} hours ahead.`,
  },
  {
    question: 'Do you deliver, and is there a delivery fee?',
    answer: `Yes. Delivery is ${formatPrice(deliveryFee)} within ${deliveryRadiusMiles} miles of our Midvale restaurant.`,
  },
  {
    question: 'Do you have vegetarian options?',
    answer: 'Yes. Cheese enchiladas and bean tacos are both good vegetarian choices.',
  },
  {
    question: 'Do you provide servers at the event?',
    answer: "No, we don't provide on-site serving staff. Your food arrives in trays, ready to set out.",
  },
  {
    question: 'Can you keep the food hot?',
    answer: 'Yes. Sterno heating setups are available on request.',
  },
  {
    question: 'Can I get hard taco shells?',
    answer: 'Yes. Taco bars come with soft tortillas, and hard shells are available on request.',
  },
  {
    question: 'How do I pay for catering?',
    answer: 'We accept all credit cards.',
  },
  {
    question: 'Can you cater a larger event?',
    answer: `Yes. Email us at ${business.email} with your date and headcount, and we'll put together a quote.`,
  },
];

// Photos shown on the page. The first is the banner.
// TODO: add 2-3 more photos from Denice (ideally a real taco bar setup and
// enchilada trays), then add them here with descriptive alt text.
export const cateringPhotos: { src: ImageMetadata; alt: string }[] = [
  {
    src: quesoDipImg,
    alt: 'Queso dip with diced tomatoes and roasted corn in a cast-iron skillet, served with tortilla chips at Su Casa in Midvale',
  },
  {
    src: beefTacoImg,
    alt: 'Crispy beef taco with lettuce, tomato, and cheese next to Mexican rice and refried beans, the same sides that come with a Su Casa taco bar',
  },
];

const pageUrl = `${business.url}/catering/`;

function offerFor(item: CateringItem) {
  const price = item.price.toFixed(2);
  return {
    '@type': 'Offer',
    name: item.name,
    price,
    priceCurrency: 'USD',
    ...(item.serves ? { description: `Serves: ${item.serves}` } : {}),
    ...(item.perPerson
      ? { priceSpecification: { '@type': 'UnitPriceSpecification', price, priceCurrency: 'USD', unitText: 'per person' } }
      : {}),
  };
}

export const cateringServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${pageUrl}#service`,
  name: 'Su Casa Mexican Catering',
  serviceType: 'Mexican catering',
  description: `Taco bars, enchilada meals, and take-and-bake enchilada trays for groups of ${minimumGuests} or more. Pickup at ${addressLines.join(', ')}, or delivery within ${deliveryRadiusMiles} miles of Midvale with ${noticeHours} hours' notice.`,
  url: pageUrl,
  provider: { '@id': restaurantId },
  areaServed: deliveryAreas.map((city) => ({ '@type': 'City', name: `${city}, ${business.addressRegion}` })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Catering menu',
    itemListElement: cateringMenus.map((menu) => ({
      '@type': 'OfferCatalog',
      name: menu.title,
      itemListElement: menu.items.map(offerFor),
    })),
  },
};

export const cateringFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': `${pageUrl}#faq`,
  mainEntity: cateringFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};
