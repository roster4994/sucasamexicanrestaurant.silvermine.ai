// Single source of truth for Su Casa's name, address, phone, email, hours,
// and profile links. The address format must match the Google Business
// Profile exactly: "6878 S State Street, Midvale, UT 84047".

export const business = {
  name: 'Su Casa Mexican Restaurant',
  url: 'https://sucasamexicanrestaurant.com',
  streetAddress: '6878 S State Street',
  addressLocality: 'Midvale',
  addressRegion: 'UT',
  postalCode: '84047',
  addressCountry: 'US',
  telephone: '+1-801-255-1042',
  telephoneDisplay: '(801) 255-1042',
  telephoneHref: 'tel:+18012551042',
  email: 'scscmo@gmail.com',
  emailHref: 'mailto:scscmo@gmail.com',
  geo: { latitude: 40.6264145, longitude: -111.8904448 },
  foundingDate: '1978',
  priceRange: '$',
  servesCuisine: 'Mexican',
  description: 'Family-owned since 1978, Su Casa serves authentic Mexican food in Midvale, Utah. Dine in, order online, or cater your next event.',
};

// Display address, always on two lines.
export const addressLines = [
  business.streetAddress,
  `${business.addressLocality}, ${business.addressRegion} ${business.postalCode}`,
];

export const addressOneLine = addressLines.join(', ');

type HoursEntry = {
  label: string;
  short: string;
  days: string[];
  opens?: string;
  closes?: string;
};

export const hours: HoursEntry[] = [
  { label: 'Monday - Thursday', short: 'Mon-Thu', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '11:00', closes: '20:00' },
  { label: 'Friday - Saturday', short: 'Fri-Sat', days: ['Friday', 'Saturday'], opens: '11:00', closes: '21:00' },
  { label: 'Sunday', short: 'Sun', days: ['Sunday'] },
];

// '20:00' -> '8:00 PM' (long), '8pm' (short), or '8' (compact).
export function formatTime(time: string, style: 'long' | 'short' | 'compact' = 'long') {
  const [h, m] = time.split(':').map(Number);
  const hour = h % 12 || 12;
  const period = h < 12 ? 'AM' : 'PM';
  if (style === 'compact') return m ? `${hour}:${String(m).padStart(2, '0')}` : `${hour}`;
  if (style === 'short') return `${hour}${m ? `:${String(m).padStart(2, '0')}` : ''}${period.toLowerCase()}`;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

export function hoursRange(entry: HoursEntry, style: 'long' | 'short' = 'long') {
  if (!entry.opens || !entry.closes) return 'Closed';
  return `${formatTime(entry.opens, style)} - ${formatTime(entry.closes, style)}`;
}

// One row per day, for the contact page.
export const hoursByDay = hours.flatMap((entry) =>
  entry.days.map((day) => ({ day, time: hoursRange(entry) }))
);

// "Mon-Thu 11-8, Fri-Sat 11-9" for meta descriptions.
export const hoursCompact = hours
  .filter((entry) => entry.opens && entry.closes)
  .map((entry) => `${entry.short} ${formatTime(entry.opens!, 'compact')}-${formatTime(entry.closes!, 'compact')}`)
  .join(', ');

// Plain-language sentence for FAQ answers.
export const hoursSentence = (() => {
  const open = hours.filter((entry) => entry.opens && entry.closes);
  const closed = hours.filter((entry) => !entry.opens);
  const spoken = (t: string) => formatTime(t).replace(':00', '');
  const ranges = open.map((entry) =>
    `${entry.days[0]} through ${entry.days[entry.days.length - 1]} from ${spoken(entry.opens!)} to ${spoken(entry.closes!)}`
  );
  const closedText = closed.length ? ` We're closed on ${closed.flatMap((entry) => entry.days).map((day) => `${day}s`).join(' and ')}.` : '';
  return `We're open ${ranges.join(', and ')}.${closedText}`;
})();

export const social = {
  facebook: 'https://facebook.com/sucasamexicanrestaurant',
  instagram: 'https://www.instagram.com/sucasamidvale/',
  yelp: 'https://www.yelp.com/biz/su-casa-mexican-restaurant-midvale',
  googleMaps: 'https://google.com/maps/place/Su+Casa+Mexican+Restaurant',
};

export const ordering = {
  spotOn: 'https://order.spoton.com/so-su-casa-mexican-restaurant-midvale-3200/midvale-ut/600f52b924b4c47e9cc94655',
  doorDash: 'https://www.doordash.com/store/su-casa-mexican-restaurant-midvale-922561/',
  grubhub: 'https://www.grubhub.com/restaurant/su-casa-mexican-restaurant-6878-state-st-midvale/1472764',
  uberEats: 'https://www.ubereats.com/store/su-casa-mexican-restaurant/x48U_gbMSeislBSIokiUXQ',
};

export const maps = {
  directions: 'https://www.google.com/maps/place/Su+Casa+Mexican+Restaurant/@40.6264145,-111.8904448,17z/data=!3m1!4b1!4m6!3m5!1s0x875289b066322b6f:0x1b428f9fb0f21030!8m2!3d40.6264145!4d-111.8904448!16s%2Fg%2F1tffvdvd',
  embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.5!2d-111.8926335!3d40.6264145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x875289b066322b6f%3A0x1b428f9fb0f21030!2sSu%20Casa%20Mexican%20Restaurant!5e0!3m2!1sen!2sus!4v1706489600000!5m2!1sen!2sus',
};

export const sameAs = [...Object.values(social), ...Object.values(ordering)];

export const restaurantId = `${business.url}/#restaurant`;

// The one Restaurant node for the whole site, emitted by Layout.astro.
// Page-level schema references it by restaurantId.
export function restaurantSchema(images: string[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': restaurantId,
    name: business.name,
    description: business.description,
    image: images,
    logo: images[0],
    url: business.url,
    telephone: business.telephone,
    email: business.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.streetAddress,
      addressLocality: business.addressLocality,
      addressRegion: business.addressRegion,
      postalCode: business.postalCode,
      addressCountry: business.addressCountry,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification: hours
      .filter((entry) => entry.opens && entry.closes)
      .map((entry) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: entry.days,
        opens: entry.opens,
        closes: entry.closes,
      })),
    servesCuisine: business.servesCuisine,
    priceRange: business.priceRange,
    foundingDate: business.foundingDate,
    sameAs,
    hasMenu: `${business.url}/menu/`,
    acceptsReservations: false,
    potentialAction: {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: ordering.spotOn,
      },
      deliveryMethod: ['http://purl.org/goodrelations/v1#DeliveryModePickUp'],
    },
  };
}
