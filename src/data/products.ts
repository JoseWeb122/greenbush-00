/**
 * Single source of truth for demo product data.
 *
 * Fields intentionally mirror WooCommerce product fields (name, slug, regular
 * price, categories, attributes/variations, short description, description)
 * so this catalog can be swapped for the live WooCommerce REST/Store API.
 *
 * `priceVerified: false` marks products that exist on greenbushtwins.com but
 * whose price could not be confirmed while building this prototype. Those
 * items are shown with a clear "price to be confirmed" label and cannot be
 * added to the demo cart, so no pricing is ever invented.
 */

export type CategorySlug =
  | "sidneys-creations"
  | "carries-prairie"
  | "small-batch-picks"
  | "artisan-collaborations";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
  /** Source taxonomy on the existing WordPress site */
  wooCategory: string;
}

export interface ProductVariation {
  attribute: string; // e.g. "Scent"
  options: string[];
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number; // USD regular price
  priceVerified: boolean;
  currency: "USD";
  category: CategorySlug;
  brand?: string; // maker / vendor label, e.g. "Ginger June Candle Company"
  shortDescription: string;
  description: string[];
  details: { label: string; value: string }[];
  variations?: ProductVariation[];
  images: string[];
  featured?: boolean;
  tags: string[];
  /** Canonical URL on the existing store, for the WooCommerce handoff */
  sourceUrl: string;
  /** Editorial note surfaced in the UI when content needs owner confirmation */
  note?: string;
}

export const categories: Category[] = [
  {
    slug: "sidneys-creations",
    name: "Sidney's Creations",
    description:
      "Books, keepsakes, and designs created by Sidney Greenbush – including Seven Sisters: The Lantern of Humanity.",
    image: "/images/products/seven-sisters-book.jpg",
    wooCategory: "Sidney's Creations",
  },
  {
    slug: "carries-prairie",
    name: "Carrie's Prairie",
    description:
      "A tribute collection honoring Carrie Ingalls Swanzey and the plains of Independence, Kansas. $2.00 from each purchase supports Ingalls and Wilder family heritage preservation.",
    image: "/images/products/prairie-candle.jpg",
    wooCategory: "Carrie's Prairie",
  },
  {
    slug: "small-batch-picks",
    name: "Sidney's Small-Batch Picks",
    description:
      "Hand-selected candles, bath, and body goods from independent makers such as Ginger June Candle Company.",
    image: "/images/products/half-moon-candle.jpg",
    wooCategory: "Sidney's small batch picks",
  },
  {
    slug: "artisan-collaborations",
    name: "Artisan Collaborations",
    description:
      "Mugs, ornaments, art, and handmade pieces from the artists and makers in the Greenbush Twins community.",
    image: "/images/products/mug-ornament.jpg",
    wooCategory: "Artisans",
  },
];

const SRC = "https://greenbushtwins.com/product/";

export const products: Product[] = [
  {
    id: 1,
    slug: "seven-sisters-the-lantern-of-humanity",
    name: "Seven Sisters: The Lantern of Humanity (Book 1)",
    price: 35.0,
    priceVerified: true,
    currency: "USD",
    category: "sidneys-creations",
    brand: "Sidney Greenbush",
    shortDescription:
      "A magical, beautifully illustrated hardcover storybook – the first book in an enchanting new series by Sidney Greenbush.",
    description: [
      "In a luminous world guided by hope and harmony, seven sisters are chosen as the sacred guardians of the Lantern of Humanity. As the first book in an enchanting new series, The Lantern of Humanity introduces young readers to a world where compassion is the greatest magic of all.",
      "Each of the seven sisters uniquely embodies one of the seven angelic virtues, bringing her own distinct strengths and personality to the group. Together, they discover that while they are individuals, it is their unity that keeps the lantern shining bright.",
      "Seven Sisters: The Lantern of Humanity was created with the belief that children learn best through stories that make them feel seen and empowered. In a world that can sometimes feel overwhelming, this book gently reminds young readers that kindness is powerful, and every child carries a light worth protecting.",
      "Limited edition: order now to receive an autographed copy, hand-signed by author Sidney Greenbush.",
    ],
    details: [
      { label: "Author", value: "Sidney Greenbush" },
      { label: "Format", value: "Hardcover" },
      { label: "Recommended for", value: "Children ages 2–9" },
      { label: "Edition", value: "Limited edition, autographed" },
      { label: "Perfect for", value: "Meaningful gifting, bedtime reading, and classroom storytelling" },
    ],
    images: ["/images/products/seven-sisters-book.jpg"],
    featured: true,
    tags: ["book", "children", "story", "kindness", "hardcover", "autographed", "gift"],
    sourceUrl: SRC + "seven-sisters-the-lantern-of-humanity/",
    note:
      "The live site lists the age range as 2–9 on the product page and 4–9 on the homepage. The product page value (2–9) is used here; please confirm the correct range.",
  },
  {
    id: 2,
    slug: "carries-prairie-soap-bar",
    name: "Carrie's Prairie Soap Bar",
    price: 10.99,
    priceVerified: true,
    currency: "USD",
    category: "carries-prairie",
    brand: "Carrie's Prairie",
    shortDescription:
      "An artisan bar inspired by the birthplace of Carrie Ingalls in rural Independence, Kansas.",
    description: [
      "Step onto the open plains of Independence, Kansas with Carrie's Prairie Soap Bar, an artisan bar inspired by the birthplace of Carrie Ingalls. Handcrafted to capture the wild spirit of the wide-open prairie, this bar delivers a crisp, refreshing lather that honors pioneer heritage and timeless simplicity.",
      "Each Carrie's Prairie product is created to honor Carrie Ingalls Swanzey – her independent pioneering spirit, strong sense of community, dedicated care of her family, and her work as a pioneer newspaper manager. $2.00 from each purchase is donated to the preservation and restoration of the history and legacy of the Ingalls and Wilder families.",
    ],
    details: [
      { label: "Collection", value: "Carrie's Prairie" },
      { label: "Gives back", value: "$2.00 per purchase to Ingalls & Wilder heritage preservation" },
    ],
    images: ["/images/products/soap-bar.jpg"],
    tags: ["soap", "bar", "prairie", "handcrafted", "gift"],
    sourceUrl: SRC + "carries-prairie-soap-bar/",
  },
  {
    id: 3,
    slug: "carries-prairie-hand-poured-soy-candle",
    name: "Carrie's Prairie Hand-Poured Soy Candle",
    price: 29.99,
    priceVerified: true,
    currency: "USD",
    category: "carries-prairie",
    brand: "Carrie's Prairie",
    shortDescription:
      "A hand-poured soy candle from the Carrie's Prairie tribute collection.",
    description: [
      "Part of the Carrie's Prairie collection honoring Carrie Ingalls Swanzey and the plains of Independence, Kansas. $2.00 from each purchase is donated to the preservation and restoration of the history and legacy of the Ingalls and Wilder families.",
    ],
    details: [
      { label: "Collection", value: "Carrie's Prairie" },
      { label: "Wax", value: "Soy, hand-poured" },
      { label: "Gives back", value: "$2.00 per purchase to Ingalls & Wilder heritage preservation" },
    ],
    images: ["/images/products/prairie-candle.jpg"],
    featured: true,
    tags: ["candle", "soy", "prairie", "home"],
    sourceUrl: SRC + "carries-prairie-hand-poured-soy-candle/",
    note: "Scent notes and burn time to be confirmed from the live listing.",
  },
  {
    id: 4,
    slug: "room-and-linen-spray",
    name: "Carrie's Prairie Room & Linen Spray",
    price: 21.99,
    priceVerified: true,
    currency: "USD",
    category: "carries-prairie",
    brand: "Carrie's Prairie",
    shortDescription: "A refreshing room and linen spray from the Carrie's Prairie collection.",
    description: [
      "Freshen linens and living spaces with a mist inspired by the wide-open prairie. Part of the Carrie's Prairie collection; $2.00 from each purchase supports Ingalls and Wilder heritage preservation.",
    ],
    details: [
      { label: "Collection", value: "Carrie's Prairie" },
      { label: "Gives back", value: "$2.00 per purchase to Ingalls & Wilder heritage preservation" },
    ],
    images: ["/images/products/prairie-candle.jpg"],
    tags: ["spray", "linen", "room", "home", "prairie"],
    sourceUrl: SRC + "room-and-linen-spray/",
  },
  {
    id: 5,
    slug: "car-diffuser",
    name: "Carrie's Prairie Car Diffuser",
    price: 13.99,
    priceVerified: true,
    currency: "USD",
    category: "carries-prairie",
    brand: "Carrie's Prairie",
    shortDescription: "Bring the prairie along for the ride with this compact car diffuser.",
    description: [
      "A compact diffuser for your car from the Carrie's Prairie collection. $2.00 from each purchase supports Ingalls and Wilder heritage preservation.",
    ],
    details: [{ label: "Collection", value: "Carrie's Prairie" }],
    images: ["/images/products/roll-on-perfume.jpg"],
    tags: ["diffuser", "car", "prairie"],
    sourceUrl: SRC + "car-diffuser/",
  },
  {
    id: 6,
    slug: "half-moon-candle",
    name: "Half Moon Candle – 11 oz, 100% Essential Oil",
    price: 15.0,
    priceVerified: true,
    currency: "USD",
    category: "small-batch-picks",
    brand: "Ginger June Candle Company",
    shortDescription:
      "A hand-poured 11 oz soy candle in a handmade ceramic container with up to 65 hours of clean burn. Five essential-oil scents.",
    description: [
      "A premium 11 oz hand-poured soy candle in a beautifully crafted ceramic container, offering up to 65 hours of clean, even burn. Made with 100% essential-oil blends, each scent – from calming lavender and cedarwood to fresh citrus notes – creates a soothing, uplifting atmosphere.",
      "Ginger June container candles are made using only vegan, cruelty-free, sustainable ingredients: smooth, clean-burning wax from American-grown soybeans; non-toxic, paraben- and phthalate-free 100% essential-oil blends; hand-poured in small batches; tested on friends and family, never animals.",
    ],
    details: [
      { label: "Size", value: "11 oz handmade ceramic container" },
      { label: "Burn time", value: "Approximately 65 hours" },
      { label: "Ochre – Daydream", value: "Palo santo, cedarwood, lavender, bergamot, white sage, palmarosa, orange, frankincense, fir, vetiver" },
      { label: "Light Yellow – Joyful", value: "Tangerine, neroli, lavender, bergamot, orange, nerolina, geranium, palmarosa, lemon, cedarwood" },
      { label: "Pink – Pillow Talk", value: "Lavender, cedarwood, ylang-ylang, rose geranium, bergamot, orange, rose otto, elemi, vanilla, jasmine, sandalwood, pink peppercorn, fossilized amber" },
      { label: "White – Unwind", value: "Lavender, eucalyptus, frankincense, bergamot mint, spearmint, ho wood, cedarwood" },
      { label: "Green – Zest", value: "Lime, bergamot, pomelo, violet leaf, geranium" },
    ],
    variations: [
      {
        attribute: "Scent",
        options: ["Ochre – Daydream", "Light Yellow – Joyful", "Pink – Pillow Talk", "White – Unwind", "Green – Zest"],
      },
    ],
    images: ["/images/products/half-moon-candle.jpg"],
    featured: true,
    tags: ["candle", "soy", "essential oil", "ceramic", "vegan", "lavender", "home"],
    sourceUrl: SRC + "half-moon-candle-11-oz-100-essential-oil-5-scent-options-to-choose-from/",
  },
  {
    id: 7,
    slug: "pillow-talk-natural-bubble-bath",
    name: "Pillow Talk Natural Bubble Bath – 12 oz",
    price: 25.0,
    priceVerified: true,
    currency: "USD",
    category: "small-batch-picks",
    brand: "Ginger June Candle Company",
    shortDescription:
      "A gentle 12 oz bubble bath with a lavender, cedarwood, ylang-ylang, and rose geranium essential-oil blend.",
    description: [
      "12 oz bubble bath with an essential-oil blend of lavender, cedarwood, ylang-ylang, rose geranium, bergamot, orange, rose otto, elemi, vanilla, jasmine, and sandalwood. A mild soap base that is gentle on your skin. Aloe juice is formulated in for its skin-soothing benefits, along with several other additives that leave skin feeling silky during and after your bath.",
    ],
    details: [
      { label: "Size", value: "12 oz" },
      {
        label: "Ingredients",
        value:
          "Aloe barbadensis leaf juice*, decyl glucoside, lauryl glucoside, glycerin*, sodium cocoyl hydrolyzed silk amino acids, honey extract, oat protein, panthenol DL, sodium alginate, lactic acid, vitamin C, vitamin E, vitamin B3, vitamin B5, vitamin B6, propanediol, ethylhexylglycerin, potassium sorbate, essential oils. *Organic ingredient.",
      },
    ],
    images: ["/images/products/bubble-bath.jpg"],
    tags: ["bath", "bubble bath", "lavender", "essential oil", "relax"],
    sourceUrl: SRC + "pillow-talk-natural-bubble-bath/",
  },
  {
    id: 8,
    slug: "pillow-talk-botanical-bath-bomb",
    name: "Pillow Talk 100% Botanical Bath Bomb",
    price: 10.0,
    priceVerified: true,
    currency: "USD",
    category: "small-batch-picks",
    brand: "Ginger June Candle Company",
    shortDescription: "A 100% botanical bath bomb in the calming Pillow Talk essential-oil blend.",
    description: [
      "A 100% botanical bath bomb scented with the Pillow Talk blend – lavender, cedarwood, ylang-ylang, rose geranium, bergamot, orange, rose otto, elemi, vanilla, jasmine, and sandalwood.",
    ],
    details: [{ label: "Scent", value: "Pillow Talk (100% essential oil)" }],
    images: ["/images/products/bath-bomb.jpg"],
    tags: ["bath", "bath bomb", "botanical", "lavender"],
    sourceUrl: SRC + "pillow-talk-100-botanical-bath-bomb/",
  },
  {
    id: 9,
    slug: "tansy-botanical-bath-bomb",
    name: "Tansy 100% Botanical Bath Bomb",
    price: 10.0,
    priceVerified: true,
    currency: "USD",
    category: "small-batch-picks",
    brand: "Ginger June Candle Company",
    shortDescription: "A 100% botanical bath bomb in the Tansy essential-oil blend.",
    description: ["A 100% botanical bath bomb scented with Ginger June's Tansy essential-oil blend."],
    details: [{ label: "Scent", value: "Tansy (100% essential oil)" }],
    images: ["/images/products/bath-bomb.jpg"],
    tags: ["bath", "bath bomb", "botanical"],
    sourceUrl: SRC + "tansy-100-botanical-bath-bomb/",
    note: "Scent notes for the Tansy blend to be confirmed from the live listing.",
  },
  {
    id: 10,
    slug: "unwind-roll-on-perfume",
    name: "Unwind Roll-On Perfume",
    price: 25.0,
    priceVerified: true,
    currency: "USD",
    category: "small-batch-picks",
    brand: "Ginger June Candle Company",
    shortDescription:
      "A roll-on perfume in the Unwind blend – lavender, eucalyptus, frankincense, bergamot mint, spearmint, ho wood, and cedarwood.",
    description: [
      "Carry calm with you. The Unwind blend combines lavender, eucalyptus, frankincense, bergamot mint, spearmint, ho wood, and cedarwood in a convenient roll-on.",
    ],
    details: [{ label: "Scent", value: "Unwind (100% essential oil)" }],
    images: ["/images/products/roll-on-perfume.jpg"],
    tags: ["perfume", "roll-on", "essential oil", "lavender", "eucalyptus"],
    sourceUrl: SRC + "unwind-roll-on-perfume/",
  },
  {
    id: 11,
    slug: "daydream-diffuser-oil-blend",
    name: "Daydream Diffuser Oil Blend",
    price: 15.0,
    priceVerified: true,
    currency: "USD",
    category: "small-batch-picks",
    brand: "Ginger June Candle Company",
    shortDescription:
      "A 100% essential-oil diffuser blend with palo santo, cedarwood, lavender, bergamot, and white sage.",
    description: [
      "The Daydream blend brings together palo santo, cedarwood, lavender, bergamot, white sage, palmarosa, orange, frankincense, fir, and vetiver for a grounding, dreamy atmosphere.",
    ],
    details: [{ label: "Scent", value: "Daydream (100% essential oil)" }],
    images: ["/images/products/roll-on-perfume.jpg"],
    tags: ["diffuser", "oil", "essential oil", "home", "lavender"],
    sourceUrl: SRC + "daydream-diffuser-oil-blend-9-oz-candle/",
    note: "The live listing title reads “Daydream Diffuser Oil Blend 9 oz candle”; the product name has been simplified pending confirmation of the format.",
  },
  // ---- Products listed on the live site whose price could not be verified ----
  {
    id: 12,
    slug: "lavender-mint-botanical-bath-bomb",
    name: "Lavender Mint 100% Botanical Bath Bomb",
    price: 0,
    priceVerified: false,
    currency: "USD",
    category: "small-batch-picks",
    brand: "Ginger June Candle Company",
    shortDescription: "A 100% botanical bath bomb in a lavender and mint essential-oil blend.",
    description: ["A 100% botanical bath bomb in Ginger June's lavender mint blend."],
    details: [{ label: "Scent", value: "Lavender Mint (100% essential oil)" }],
    images: ["/images/products/bath-bomb.jpg"],
    tags: ["bath", "bath bomb", "lavender", "mint"],
    sourceUrl: SRC + "lavender-mint-100-botanical-bath-bomb/",
    note: "Spelling corrected from “Lavendar” on the live menu.",
  },
  {
    id: 13,
    slug: "pioneer-polly-ornament",
    name: "Pioneer Polly Christmas Ornament",
    price: 0,
    priceVerified: false,
    currency: "USD",
    category: "artisan-collaborations",
    brand: "Orlando de la Paz",
    shortDescription:
      "Celebrate the season with nostalgic artwork of Pioneer Polly enjoying classic holiday moments.",
    description: [
      "Pioneer Polly Christmas ornaments feature nostalgic artwork of Polly enjoying classic holiday moments, created by Greenbush Twins & Company with artist Orlando de la Paz.",
    ],
    details: [{ label: "Artist", value: "Orlando de la Paz" }],
    images: ["/images/products/mug-ornament.jpg"],
    tags: ["ornament", "holiday", "christmas", "pioneer polly", "art"],
    sourceUrl: SRC + "pioneer-polly/",
  },
  {
    id: 14,
    slug: "tea-is-lifes-delight-mug",
    name: "“Tea Is Life's Delight” Mug featuring Pioneer Polly",
    price: 0,
    priceVerified: false,
    currency: "USD",
    category: "artisan-collaborations",
    brand: "Orlando de la Paz",
    shortDescription: "A Pioneer Polly mug available in red, pink, black, and white.",
    description: [
      "The “Tea Is Life's Delight” mug features Pioneer Polly artwork by Orlando de la Paz and is offered in four colorways.",
    ],
    details: [{ label: "Artist", value: "Orlando de la Paz" }],
    variations: [{ attribute: "Color", options: ["Red", "Pink", "Black", "White"] }],
    images: ["/images/products/mug-ornament.jpg"],
    tags: ["mug", "tea", "pioneer polly", "kitchen", "gift"],
    sourceUrl: SRC + "tea-is-lifes-delight-mug-featuring-pioneer-polly/",
  },
  {
    id: 15,
    slug: "holiday-photo-ornament-2025",
    name: "Holiday Photo Ornament – Autographed 2025 Edition",
    price: 0,
    priceVerified: false,
    currency: "USD",
    category: "sidneys-creations",
    brand: "Sidney Greenbush",
    shortDescription: "An autographed 2025-edition holiday photo ornament from Sidney Greenbush.",
    description: ["A keepsake holiday photo ornament, autographed by Sidney Greenbush. 2025 edition."],
    details: [{ label: "Edition", value: "2025, autographed" }],
    images: ["/images/products/mug-ornament.jpg"],
    tags: ["ornament", "holiday", "autographed", "keepsake"],
    sourceUrl: SRC + "holiday-photo-ornament-autographed-2025-edition/",
  },
  {
    id: 16,
    slug: "giving-plate-with-journey-journal",
    name: "The Giving Plate with Journey Journal",
    price: 0,
    priceVerified: false,
    currency: "USD",
    category: "sidneys-creations",
    brand: "Sidney Greenbush",
    shortDescription: "A giving plate paired with a Journey Journal, from Sidney's Creations.",
    description: ["The Giving Plate with Journey Journal is part of the Sidney's Creations collection."],
    details: [],
    images: ["/images/products/mug-ornament.jpg"],
    tags: ["journal", "plate", "gift", "keepsake"],
    sourceUrl: SRC + "the-giving-plate-with-journey-journal/",
  },
  {
    id: 17,
    slug: "vintage-sewing-travel-pack",
    name: "Vintage Sewing Travel Pack – Handmade, One of a Kind",
    price: 0,
    priceVerified: false,
    currency: "USD",
    category: "artisan-collaborations",
    brand: "Laura Ingalls Gunn",
    shortDescription: "A handmade, one-of-a-kind vintage sewing travel pack by Laura Ingalls Gunn.",
    description: ["A handmade, one-of-a-kind vintage sewing travel pack created by artisan Laura Ingalls Gunn."],
    details: [{ label: "Artisan", value: "Laura Ingalls Gunn" }],
    images: ["/images/products/soap-bar.jpg"],
    tags: ["sewing", "handmade", "vintage", "travel"],
    sourceUrl: SRC + "vintage-sewing-travel-pack-handmade-one-of-a-kind/",
  },
  {
    id: 18,
    slug: "be-the-change-affirmation-art",
    name: "“Be the Change” Affirmation Art",
    price: 0,
    priceVerified: false,
    currency: "USD",
    category: "artisan-collaborations",
    brand: "Deserae Catherin",
    shortDescription:
      "One of Deserae Catherin's affirmation pieces, alongside “I Am Strong”, “Never Stop Growing”, and more.",
    description: [
      "Deserae Catherin's affirmation series includes A Thousand Pages Yet to Read, Be the Change, Be the Moon, Be Who You Are, Grow in All Places, I Am Strong, I Am Worth It All, Never Stop Growing, Shine When It's Your Time, and Who You Are Meant to Be.",
    ],
    details: [{ label: "Artist", value: "Deserae Catherin" }],
    images: ["/images/prairie.jpg"],
    tags: ["art", "affirmation", "print", "wall"],
    sourceUrl: SRC + "be-the-change-2/",
  },
];

export const purchasableProducts = products.filter((p) => p.priceVerified);

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function relatedProducts(product: Product, limit = 4) {
  const same = products.filter((p) => p.category === product.category && p.id !== product.id);
  const others = products.filter((p) => p.category !== product.category && p.id !== product.id);
  return [...same, ...others].slice(0, limit);
}

export function searchProducts(query: string, list: Product[] = products) {
  const q = query.trim().toLowerCase();
  if (!q) return list;
  const terms = q.split(/\s+/);
  return list.filter((p) => {
    const hay = [
      p.name,
      p.shortDescription,
      p.brand ?? "",
      getCategory(p.category)?.name ?? "",
      ...p.tags,
      ...p.description,
    ]
      .join(" ")
      .toLowerCase();
    return terms.every((t) => hay.includes(t));
  });
}

export type SortKey = "featured" | "price-asc" | "price-desc" | "alpha";

export const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "alpha", label: "Alphabetical (A–Z)" },
];

export function sortProducts(list: Product[], sort: SortKey) {
  const copy = [...list];
  switch (sort) {
    case "price-asc":
      return copy.sort((a, b) => priceForSort(a) - priceForSort(b));
    case "price-desc":
      return copy.sort((a, b) => priceForSort(b) - priceForSort(a));
    case "alpha":
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return copy.sort((a, b) => Number(!!b.featured) - Number(!!a.featured) || a.id - b.id);
  }
}

// Unverified prices sort to the end regardless of direction.
function priceForSort(p: Product) {
  return p.priceVerified ? p.price : Number.MAX_SAFE_INTEGER;
}

export const priceRanges = [
  { id: "under-15", label: "Under $15", min: 0, max: 14.99 },
  { id: "15-25", label: "$15 – $25", min: 15, max: 25 },
  { id: "over-25", label: "Over $25", min: 25.01, max: Infinity },
] as const;

export type PriceRangeId = (typeof priceRanges)[number]["id"];
