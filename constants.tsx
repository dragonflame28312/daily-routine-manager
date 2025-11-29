import { RoutineItem, OverviewData } from './types';

// Background Images Configuration
export const BACKGROUND_IMAGES = {
  morning: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?q=80&w=2070&auto=format&fit=crop', // Sunrise
  midday: 'https://images.unsplash.com/photo-1595131838595-3154b9f4450b?q=80&w=2070&auto=format&fit=crop',   // Blue Sky/Clouds
  evening: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop',  // Night Sky
  allDay: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2070&auto=format&fit=crop',   // Nature/Forest (Neutral)
};

export const OVERVIEW_DATA: OverviewData = {
  schedule: [
    { time: 'Morning', item: 'Citicoline Blend', dose: '1 capsule', notes: 'Part of 2-capsule daily serving' },
    { time: 'Morning', item: 'Lion’s Mane', dose: '1 capsule', notes: 'Part of 2-capsule daily serving' },
    { time: 'Morning', item: 'B-Complex', dose: '1 tablet', notes: 'Standard daily serving' },
    { time: 'Morning', item: 'Biotin', dose: '1 tablet', notes: 'Half of recommended serving' },
    { time: 'Morning', item: 'Pygeum Africanum', dose: '1 capsule', notes: 'Standard daily serving' },
    { time: 'Morning', item: 'Cod Liver Oil', dose: '1 capsule', notes: 'Standard daily serving' },
    { time: 'Afternoon', item: 'Citicoline Blend', dose: '1 capsule', notes: 'Completes daily serving' },
    { time: 'Afternoon', item: 'Lion’s Mane', dose: '1 capsule', notes: 'Completes daily serving' },
    { time: 'Afternoon', item: 'Calc/Mag/Zinc', dose: '1 tablet', notes: 'Standard daily serving' },
    { time: 'Afternoon', item: 'Pumpkin Seed Oil', dose: '1 capsule', notes: '3000 mg capsule' },
    { time: 'Evening', item: 'Biotin', dose: '1 tablet', notes: 'Second daily tablet' },
  ],
  totals: [
    { item: 'Citicoline Blend', total: '2 capsules' },
    { item: 'Lion’s Mane', total: '2 capsules' },
    { item: 'Tyrosine (included)', total: '~50 mg' },
    { item: 'B-Complex', total: '1 tablet' },
    { item: 'Biotin', total: '2 tablets' },
    { item: 'Pygeum Africanum', total: '1 capsule' },
    { item: 'Cod Liver Oil', total: '1 capsule' },
    { item: 'Calc/Mag/Zinc', total: '1 tablet' },
    { item: 'Pumpkin Seed Oil', total: '1 capsule' },
  ],
  topicals: [
    { item: 'ACV (in water)', amount: '1 teaspoon', frequency: '3x Daily (Before meals)' },
    { item: 'Cleanser', amount: 'N/A', frequency: 'AM & PM' },
    { item: 'Hyaluronic Acid', amount: '3–4 drops', frequency: 'AM & PM' },
    { item: 'Niacinamide', amount: '2-3 drops', frequency: 'AM' },
    { item: 'Moisturiser', amount: 'Pea-sized amount', frequency: 'AM & PM' },
    { item: 'Retinol', amount: 'Thin layer', frequency: '2x Week (PM)' },
    { item: 'Vaseline', amount: 'Very thin layer', frequency: 'PM (Under eyes)' },
    { item: 'Aveeno Hand Cream', amount: 'Pea-sized amount', frequency: 'As needed' },
    { item: 'Coconut Oil', amount: 'Light/Thin layer', frequency: 'Daily (Hair)' },
    { item: 'Moringa Oil', amount: 'Massage into scalp', frequency: 'Every other day (PM)' },
    { item: 'Rosemary Oil', amount: 'Apply to scalp', frequency: 'Every other day (PM)' },
    { item: 'Castor Oil', amount: 'Hairline/Scalp', frequency: 'Every other day (PM)' },
  ]
};

export const ROUTINE_ITEMS: RoutineItem[] = [
  {
    id: '2',
    name: 'Apple Cider Vinegar',
    tagline: 'Before each main meal',
    times: ['morning', 'midday', 'evening'],
    categories: ['supplements'],
    mainTime: 'morning',
    order: 2,
    badges: [
      { label: 'Before Meals', type: 'time' },
      { label: 'ACV', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=apple+cider+vinegar+with+mother',
      label: 'Link',
    },
    details: [
      'Add ~1 teaspoon ACV to a glass of water.',
      'Drink slowly before each meal.',
      'Morning: after brushing teeth and making breakfast, before eating.',
    ],
  },
  {
    id: '3',
    name: 'Citicoline',
    tagline: 'Focus / brain support',
    times: ['morning', 'midday'],
    categories: ['supplements'],
    mainTime: 'morning',
    order: 3,
    badges: [
      { label: 'Breakfast & Lunch', type: 'time' },
      { label: 'Supplement', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Citicoline',
      label: 'Link',
    },
    details: [
      'Morning: 1 capsule with breakfast after a few bites.',
      'Lunch: 1 capsule with lunch.',
      'Take with water and clean hands.',
    ],
  },
  {
    id: '4',
    name: 'Lion’s Mane',
    tagline: 'Cognition / mood',
    times: ['morning', 'midday'],
    categories: ['supplements'],
    mainTime: 'morning',
    order: 4,
    badges: [
      { label: 'Breakfast & Lunch', type: 'time' },
      { label: 'Supplement', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Lions+Mane+Supplement',
      label: 'Link',
    },
    details: [
      'Morning: 1 capsule with breakfast.',
      'Lunch: 1 capsule with lunch.',
      'Take at same time as citicoline for simplicity.',
    ],
  },
  {
    id: '5',
    name: 'Biotin',
    tagline: 'Hair / skin / nails',
    times: ['morning', 'evening'],
    categories: ['supplements'],
    mainTime: 'evening',
    order: 5,
    badges: [
      { label: 'Breakfast & Dinner', type: 'time' },
      { label: 'Supplement', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Biotin',
      label: 'Link',
    },
    details: ['Morning: 1 tablet with breakfast.', 'Evening: 1 tablet with dinner.'],
  },
  {
    id: '6',
    name: 'Pygeum Africanum',
    tagline: 'Herbal supplement',
    times: ['morning'],
    categories: ['supplements'],
    mainTime: 'morning',
    order: 6,
    badges: [
      { label: 'Breakfast', type: 'time' },
      { label: 'Supplement', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Pygeum+Africanum',
      label: 'Link',
    },
    details: ['Take 1 capsule with breakfast together with the other morning supplements.'],
  },
  {
    id: '7',
    name: 'Vitamin B-Complex',
    tagline: 'Energy / nerves',
    times: ['morning'],
    categories: ['supplements'],
    mainTime: 'morning',
    order: 7,
    badges: [
      { label: 'Breakfast', type: 'time' },
      { label: 'Supplement', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Vitamin+B+Complex',
      label: 'Link',
    },
    details: [
      'Take 1 tablet once per day with breakfast.',
      'Best after ACV and a few bites of food.',
    ],
  },
  {
    id: '8',
    name: 'Cod Liver Oil',
    tagline: 'Omega-3 & vitamins',
    times: ['morning'],
    categories: ['supplements'],
    mainTime: 'morning',
    order: 8,
    badges: [
      { label: 'Breakfast', type: 'time' },
      { label: 'Supplement', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Cod+Liver+Oil',
      label: 'Link',
    },
    details: ['Take 1 capsule with breakfast with the rest of the morning stack.'],
  },
  {
    id: '9',
    name: 'Calcium / Magnesium / Zinc',
    tagline: 'Mineral support',
    times: ['midday'],
    categories: ['supplements'],
    mainTime: 'midday',
    order: 9,
    badges: [
      { label: 'Lunch', type: 'time' },
      { label: 'Supplement', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Calcium+Magnesium+Zinc',
      label: 'Link',
    },
    details: ['Take 1 tablet with lunch after your ACV water.'],
  },
  {
    id: '22',
    name: 'Pumpkin Seed Oil',
    tagline: 'Prostate & hair support',
    times: ['midday'],
    categories: ['supplements'],
    mainTime: 'midday',
    order: 9.5,
    badges: [
      { label: 'Lunch', type: 'time' },
      { label: 'Supplement', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Pumpkin+Seed+Oil+capsules',
      label: 'Link',
    },
    details: [
      'Take 1 capsule with lunch after your other midday supplements.',
      'Drink a glass of water to help swallow the capsule.',
    ],
  },
  {
    id: '10',
    name: 'Cetaphil Gentle Cleanser',
    tagline: 'Start of face routine',
    times: ['morning', 'evening'],
    categories: ['face'],
    mainTime: 'morning',
    order: 10,
    badges: [
      { label: 'AM & PM', type: 'time' },
      { label: 'Cleanser', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.co.uk/Version-Cetaphil-Gentle-Cleanser-473ml/dp/B09ZF9X3R1',
      label: 'Link',
    },
    details: [
      'Use after supplements and washing your hands.',
      'Massage onto damp face ~30 seconds, rinse with lukewarm water, pat dry gently.',
    ],
  },
  {
    id: '11',
    name: 'Hyaluronic Acid Serum',
    tagline: 'Hydration layer',
    times: ['morning', 'evening'],
    categories: ['face'],
    mainTime: 'morning',
    order: 11,
    badges: [
      { label: 'After Cleanser', type: 'time' },
      { label: 'Serum', type: 'cat' },
      { label: 'AM & PM', type: 'special' },
    ],
    link: {
      url: 'https://www.amazon.co.uk/Ordinary-Hyaluronic-Acid-2-30ml/dp/B01MYEZPC8',
      label: 'Link',
    },
    details: [
      'Apply 3–4 drops to slightly damp face after cleansing.',
      'Tap in gently; follow with niacinamide in the morning or Vitamin C / retinol at night.',
    ],
  },
  {
    id: '12',
    name: 'Niacinamide Serum',
    tagline: 'Tone / texture',
    times: ['morning'],
    categories: ['face'],
    mainTime: 'morning',
    order: 12,
    badges: [
      { label: 'Morning', type: 'time' },
      { label: 'Serum', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.co.uk/Minimalist-Niacinamide-Blemishes-Clarifying-Transparent/dp/B08F9MF314',
      label: 'Link',
    },
    details: [
      'Use after HA has absorbed.',
      'Start every other morning; if skin is fine after a couple of weeks, you can go daily.',
    ],
  },
  {
    id: '14',
    name: 'Retinol Nights',
    tagline: 'Anti-aging / firming',
    times: ['evening'],
    categories: ['face'],
    mainTime: 'evening',
    order: 13,
    badges: [
      { label: '2x per week', type: 'time' },
      { label: 'Active', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.co.uk/Ordinary-Retinol-Squalane-Anti-Aging-Smoothing/dp/B0F9Y2G6ZY',
      label: 'Link',
    },
    details: [
      'Example nights: Monday & Friday.',
      'Order: Cleanser → Hyaluronic Acid → (optional thin layer of moisturizer for sensitive skin) → thin layer of retinol → CeraVe → Vaseline under eyes.',
      'Retinol is normally applied after serums and before moisturizer; for very dry or sensitive skin, you can apply a light layer of CeraVe before and after retinol (the “sandwich” method).',
      'Skip vitamin C on retinol nights and reserve vitamin C for the morning or non‑retinol nights.',
    ],
  },
  {
    id: '13',
    name: 'CeraVe Moisturising Cream',
    tagline: 'Seal everything in',
    times: ['morning', 'evening'],
    categories: ['face'],
    mainTime: 'evening',
    order: 14,
    badges: [
      { label: 'AM & PM', type: 'time' },
      { label: 'Moisturiser', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.co.uk/CeraVe-Moisturising-Cream-Moisturiser-Lotion/dp/B096VBN68T',
      label: 'Link',
    },
    details: [
      'Use a pea-sized amount for face and neck after serums.',
      'Tap a little under the eyes before Vaseline at night.',
    ],
  },
  {
    id: '15',
    name: 'Vitamin C Nights',
    tagline: 'Brightening / dark circles',
    times: ['evening'],
    categories: ['face'],
    mainTime: 'evening',
    order: 15,
    badges: [
      { label: 'Non-retinol nights', type: 'time' },
      { label: 'Serum', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.co.uk/dp/B076611KCY',
      label: 'Link',
    },
    details: [
      'Use on nights when you are not using retinol.',
      'Order: Cleanser → HA → Vitamin C serum → CeraVe → Vaseline under eyes.',
      'Focus on laugh lines and under-eye area (not into the eye).',
    ],
  },
  {
    id: '16',
    name: 'Vaseline Under Eyes',
    tagline: 'Lock in moisture',
    times: ['evening'],
    categories: ['face', 'hands'],
    mainTime: 'evening',
    order: 16,
    badges: [
      { label: 'Last step PM', type: 'time' },
      { label: 'Under-eyes', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.co.uk/Vaseline-Original-Petroleum-Jelly-250/dp/B0042280CM',
      label: 'Link',
    },
    details: [
      'After CeraVe, tap a very thin layer under each eye with ring finger.',
      'Can also use on lips if dry.',
    ],
  },
  {
    id: '17',
    name: 'Aveeno Hand Cream',
    tagline: 'Dry hands',
    times: ['allDay'],
    categories: ['hands'],
    mainTime: 'allDay',
    order: 17,
    badges: [
      { label: 'As needed', type: 'time' },
      { label: 'Hands', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Aveeno+Hand+Cream',
      label: 'Link',
    },
    details: [
      'Use after washing hands, after handling supplements, and after face routine.',
      'Apply a pea-sized amount, focusing on backs of hands and knuckles.',
    ],
  },
  {
    id: '18',
    name: 'Daily Coconut Oil',
    tagline: 'Every day',
    times: ['allDay'],
    categories: ['hair'],
    mainTime: 'allDay',
    order: 18,
    badges: [
      { label: 'Daily', type: 'time' },
      { label: 'Scalp', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Coconut+Oil',
      label: 'Link',
    },
    details: [
      'Use a light amount on scalp and hair every day.',
      'Good time: after morning face routine or later in the day while you work.',
      'Aim for a thin layer rather than fully soaked hair.',
    ],
  },
  {
    id: '19',
    name: 'Moringa Oil',
    tagline: 'Nourishment',
    times: ['allDay'],
    categories: ['hair'],
    mainTime: 'allDay',
    order: 19,
    badges: [
      { label: 'Every other day', type: 'time' },
      { label: 'Hair', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Moringa+Oil+Hair',
      label: 'Link',
    },
    details: [
        'Apply every other day (e.g., Mon, Wed, Fri, Sun).',
        'Part of your evening oil mix routine.',
        'Massage gently into the scalp.'
    ],
  },
  {
    id: '20',
    name: 'Rosemary Oil',
    tagline: 'Scalp health',
    times: ['allDay'],
    categories: ['hair'],
    mainTime: 'allDay',
    order: 20,
    badges: [
      { label: 'Every other day', type: 'time' },
      { label: 'Hair', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Rosemary+Oil+Hair',
      label: 'Link',
    },
    details: [
        'Apply every other day (e.g., Mon, Wed, Fri, Sun).',
        'Use on areas that need extra attention.',
        'Apply in the evening.'
    ],
  },
  {
    id: '21',
    name: 'Castor Oil',
    tagline: 'Thickness',
    times: ['allDay'],
    categories: ['hair'],
    mainTime: 'allDay',
    order: 21,
    badges: [
      { label: 'Every other day', type: 'time' },
      { label: 'Hair', type: 'cat' },
    ],
    link: {
      url: 'https://www.amazon.com/s?k=Castor+Oil+Hair',
      label: 'Link',
    },
    details: [
        'Apply every other day (e.g., Mon, Wed, Fri, Sun).',
        'Focus on the hairline or scalp.',
        'Thicker oil, so use sparingly.',
        'Leave in overnight and wash out the next morning.'
    ],
  },
];