export const brand = {
  name: "Greenbush Twins",
  legalName: "Greenbush Twins & Company",
  tagline: "A community for mindful, eco-friendly living",
  description:
    "Greenbush Twins & Company is a mindful-living community and maker network founded by Sidney Greenbush – curating small-batch goods from independent makers, publishing her children's book series Seven Sisters, and sharing real stories that connect people.",
  liveSite: "https://greenbushtwins.com",
  contactPage: "https://greenbushtwins.com/contact-us/",
};

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Our Story", href: "/our-story" },
  { label: "Community", href: "/community" },
  { label: "Artists & Creators", href: "/artists" },
  { label: "Stories & Events", href: "/stories" },
  { label: "Contact", href: "/contact" },
];

export interface Artisan {
  slug: string;
  name: string;
  role: string;
  excerpt: string;
  body: string[];
  image: string;
  productSlugs: string[];
  sourceUrl: string;
}

/**
 * Artisans listed under "Artisans" on greenbushtwins.com. Full biographies were
 * not captured while building this prototype, so each profile shows the
 * verified name, verified product links, and a note to migrate the original
 * profile text rather than invented biography copy.
 */
export const artisans: Artisan[] = [
  {
    slug: "orlando-de-la-paz",
    name: "Orlando de la Paz",
    role: "Artist · Pioneer Polly",
    excerpt: "Creator of the nostalgic Pioneer Polly artwork featured on ornaments and the “Tea Is Life's Delight” mugs.",
    body: [
      "Orlando de la Paz is the artist behind Pioneer Polly, whose nostalgic artwork appears on Greenbush Twins & Company's holiday ornaments and the “Tea Is Life's Delight” mug collection.",
    ],
    image: "/images/products/mug-ornament.jpg",
    productSlugs: ["pioneer-polly-ornament", "tea-is-lifes-delight-mug"],
    sourceUrl: "https://greenbushtwins.com/orlando-de-la-paz/",
  },
  {
    slug: "deserae-catherin",
    name: "Deserae Catherin",
    role: "Artist · Affirmation Series",
    excerpt: "An affirmation art series including “Be the Change”, “I Am Strong”, “Never Stop Growing”, and “Shine When It's Your Time”.",
    body: [
      "Deserae Catherin's affirmation series offered through Greenbush Twins includes A Thousand Pages Yet to Read, Be the Change, Be the Moon, Be Who You Are, Grow in All Places, I Am Strong, I Am Worth It All, Never Stop Growing, Shine When It's Your Time, and Who You Are Meant to Be.",
    ],
    image: "/images/prairie.jpg",
    productSlugs: ["be-the-change-affirmation-art"],
    sourceUrl: "https://greenbushtwins.com/deserae-catherin/",
  },
  {
    slug: "laura-ingalls-gunn",
    name: "Laura Ingalls Gunn",
    role: "Artisan · Handmade Textiles",
    excerpt: "Maker of the handmade, one-of-a-kind Vintage Sewing Travel Pack.",
    body: ["Laura Ingalls Gunn creates handmade, one-of-a-kind pieces including the Vintage Sewing Travel Pack."],
    image: "/images/products/soap-bar.jpg",
    productSlugs: ["vintage-sewing-travel-pack"],
    sourceUrl: "https://greenbushtwins.com/laura-ingalls-gunn/",
  },
  {
    slug: "alicia-hogan-murphy",
    name: "Alicia Hogan Murphy",
    role: "Artisan",
    excerpt: "A featured artisan in the Greenbush Twins creative community.",
    body: [],
    image: "/images/hero.jpg",
    productSlugs: [],
    sourceUrl: "https://greenbushtwins.com/alicia-hogan-murphy/",
  },
  {
    slug: "ashley-borund",
    name: "Ashley Borund",
    role: "Artisan",
    excerpt: "A featured artisan in the Greenbush Twins creative community.",
    body: [],
    image: "/images/products/bath-bomb.jpg",
    productSlugs: [],
    sourceUrl: "https://greenbushtwins.com/ashley-borund/",
  },
  {
    slug: "velvet-marshall",
    name: "Velvet Marshall",
    role: "Artisan",
    excerpt: "A featured artisan in the Greenbush Twins creative community.",
    body: [],
    image: "/images/products/half-moon-candle.jpg",
    productSlugs: [],
    sourceUrl: "https://greenbushtwins.com/velvet-marshall/",
  },
  {
    slug: "stacie-highland",
    name: "Stacie Highland",
    role: "Artisan",
    excerpt: "A featured artisan in the Greenbush Twins creative community.",
    body: [],
    image: "/images/products/bubble-bath.jpg",
    productSlugs: [],
    sourceUrl: "https://greenbushtwins.com/stacie/",
  },
  {
    slug: "donnajoy-holistic-prairie-mama",
    name: "DonnaJoy, “Holistic Prairie Mama”",
    role: "Community Creator",
    excerpt: "A featured creator in the Greenbush Twins community.",
    body: [],
    image: "/images/prairie.jpg",
    productSlugs: [],
    sourceUrl: "https://greenbushtwins.com/donnajoy-aka-holistic-prairie-mama/",
  },
];

export type StoryKind = "Story" | "Press" | "Community" | "Event";

export interface Story {
  slug: string;
  kind: StoryKind;
  title: string;
  excerpt: string;
  date?: string; // ISO
  status?: "past" | "upcoming";
  image: string;
  body: string[];
  externalUrl?: string;
  featured?: boolean;
}

export const stories: Story[] = [
  {
    slug: "share-your-story",
    kind: "Community",
    title: "Your Story Has the Power to Inspire Someone Else",
    excerpt:
      "Every journey is different, and every experience has something valuable to share. We'd love to hear from you.",
    image: "/images/hero.jpg",
    featured: true,
    body: [
      "Every journey is different, and every experience has something valuable to share. Whether you've faced challenges, discovered new opportunities, learned an important lesson, or simply have a story that deserves to be heard, we'd love to hear from you.",
      "At Greenbush Twins, we believe that real stories connect people. Your voice could encourage, inspire, educate, or give someone else the confidence to take their next step.",
      "Share your story with the world and let your experience make a difference.",
    ],
  },
  {
    slug: "fox-news-life-after-hollywood",
    kind: "Press",
    title: "Sidney Greenbush Reflects on Life After Hollywood",
    excerpt:
      "Fox News Digital spoke with Sidney about her memories from Little House on the Prairie, why she stepped away from acting, and her new children's book.",
    date: "2026-06-26",
    status: "past",
    image: "/images/prairie.jpg",
    externalUrl:
      "https://www.foxnews.com/entertainment/little-house-prairie-star-says-child-actors-get-dropped-hollywood-fame-fades",
    body: [
      "In June 2026, Fox News Digital featured Sidney Greenbush – who shared the role of Carrie Ingalls with her twin sister Lindsay – reflecting on life after Hollywood.",
      "The piece covers her new children's book, Seven Sisters: The Lantern of Humanity, and her eco-conscious online community, Greenbush Twins & Company. Sidney credits the morals and life lessons at the heart of Little House on the Prairie as inspiration for writing her own children's book while building the community.",
    ],
  },
  {
    slug: "seven-sisters-release",
    kind: "Story",
    title: "Seven Sisters: The Lantern of Humanity Is Here",
    excerpt:
      "The first book in an enchanting new series by Sidney Greenbush – available now as a limited-edition autographed hardcover.",
    image: "/images/products/seven-sisters-book.jpg",
    body: [
      "Seven Sisters: The Lantern of Humanity is the first book in an enchanting new series by Sidney Greenbush. In a luminous world guided by hope and harmony, seven sisters are chosen as guardians of the Lantern of Humanity, each embodying one of the seven angelic virtues.",
      "The lyrical tale promotes empathy, kindness, unity, and charity, teaching children that their own inner light can illuminate even the darkest moments. Order now to receive an autographed copy hand-signed by Sidney.",
    ],
  },
];

export const communityPages = [
  {
    slug: "join-our-community",
    title: "Join Our Community",
    excerpt: "Connect with fellow creators, share your work with a conscious audience, and be part of a collective that celebrates authenticity, craftsmanship, and purpose.",
    image: "/images/hero.jpg",
    body: [
      "We're more than curators – we're collaborators in creativity. At Greenbush Twins & Co., we welcome artists, makers, and dreamers who believe in mindful creation and meaningful connection. Whether your art tells stories through texture, color, or form, this is your space to shine.",
      "By choosing to join, you'll connect with fellow creators, share your work with a conscious audience, and be part of a collective that celebrates authenticity, craftsmanship, and purpose. Together, we're redefining what it means to create – slowly, thoughtfully, and beautifully.",
    ],
    sourceUrl: "https://greenbushtwins.com/join-our-community/",
  },
  {
    slug: "mental-health",
    title: "Mental Health",
    excerpt: "A space within the Greenbush Twins community dedicated to mental health and wellbeing.",
    image: "/images/prairie.jpg",
    body: [
      "Mental health is one of the pillars of the Greenbush Twins community. This page will carry over the owner's existing Mental Health content from the live site during the WordPress implementation.",
    ],
    sourceUrl: "https://greenbushtwins.com/mental-health/",
  },
  {
    slug: "the-dinner-party",
    title: "The Dinner Party",
    excerpt: "A Greenbush Twins & Company gathering concept within the Mental Health section of the community.",
    image: "/images/hero.jpg",
    body: [
      "The Dinner Party sits within the Mental Health section of the live site. Its existing copy will be migrated here during implementation.",
    ],
    sourceUrl: "https://greenbushtwins.com/the-dinner-party-greenbush-twins-company/",
  },
  {
    slug: "community-gallery",
    title: "Community Gallery",
    excerpt: "Work and moments shared by members of the Greenbush Twins community.",
    image: "/images/products/mug-ornament.jpg",
    body: [
      "The Community Gallery showcases work shared by community members. Gallery images will be pulled from the existing WordPress media library during implementation.",
    ],
    sourceUrl: "https://greenbushtwins.com/community-gallery/",
  },
];

export const policies: Record<string, { title: string; intro: string; sections: { heading: string; body: string }[] }> = {
  shipping: {
    title: "Shipping Policy",
    intro:
      "This page outlines how shipping is presented in the redesigned storefront. Final rates, carriers, and delivery windows are set by the shop owner in WooCommerce shipping zones and have not been confirmed for this prototype.",
    sections: [
      { heading: "Estimates in the cart", body: "The shipping estimator in the cart uses clearly labeled sample rules so the experience can be reviewed. In production it will call the configured WooCommerce shipping methods or carrier integration." },
      { heading: "Destinations", body: "The prototype demonstrates United States and Canada destinations. Supported destinations will mirror the store's actual shipping zones." },
      { heading: "Processing", body: "Processing and delivery timeframes will be published once confirmed by the owner." },
    ],
  },
  returns: {
    title: "Returns & Refunds",
    intro:
      "A returns and refunds policy has not been captured from the live site for this prototype. The owner's existing WooCommerce policy text will be placed here during implementation.",
    sections: [
      { heading: "Questions about an order?", body: "Please use the contact form and include your order number; we'll respond as quickly as we can." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro:
      "The live site's privacy policy will be migrated here. In this prototype, newsletter and contact submissions are stored in a private demo database and are never shared or used for email sends.",
    sections: [
      { heading: "What the prototype stores", body: "Newsletter signups (email, optional first name) and contact messages (name, email, subject, message)." },
      { heading: "Cart data", body: "Your demo cart is saved only in your own browser's local storage." },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro:
      "The owner's terms and conditions will be migrated here from the live WordPress site. This prototype does not process payments or create real orders.",
    sections: [],
  },
};
