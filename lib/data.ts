export const CAFETERIA = {
  name: "Machine Room",
  tagline: "A specialty roastery and espresso bar on Foundry Row",
  address: "214 Foundry Row, Portland, OR",
  phone: "+1 (503) 763-2148",
  email: "hello@machineroom.coffee",
  since: 2014,
} as const;

export const NAV_LINKS = [
  { label: "The world", href: "#story" },
  { label: "Menu", href: "#menu" },
  { label: "Roastery", href: "#roastery" },
  { label: "Views", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
] as const;

export const HERO = {
  headline: ["Coffee tuned like", "a living machine"],
  subheadline:
    "Machine Room roasts in weekly batches on a restored 1974 lever machine, tucked behind the former pattern shop on Foundry Row. Reservations for tables indoors and on the heated patio.",
  cta: "Reserve a table",
  ctaHref: "#reserve",
  secondaryCta: "See the menu",
  secondaryHref: "#menu",
  proof: "Voted best espresso on Foundry Row three years running, by the block association",
  image: { src: "/images/hero.jpg", alt: "The Machine Room cafe counter with warm evening light" },
} as const;

export const TAGLINE = {
  lines: [
    "Every shot is dialed in twice",
    "before the cup ever leaves the bar",
  ],
};

export const HERO_STATS = [
  { value: 12, suffix: "", label: "years on Foundry Row" },
  { value: 3, suffix: "", label: "origins each month" },
  { value: 18, suffix: "", label: "kilos roasted weekly" },
  { value: 1974, suffix: "", label: "year of the lever machine", literal: true },
] as const;

export const SCENES = [
  {
    id: "facade",
    index: "01",
    kicker: "Find us",
    title: "The facade",
    body: "Look for the amber sign above the old pattern shop door. On rainy evenings the glass glows before the bell even rings.",
    image: {
      src: "/images/neon.jpg",
      alt: "The amber neon window sign of the cafe, reflected on a rain soaked street",
    },
  },
  {
    id: "hall",
    index: "02",
    kicker: "The main room",
    title: "Where the light pools",
    body: "Sixty seats under a barrel ceiling, most of them lit by a single run of south facing windows that keeps the tables warm all afternoon.",
    image: {
      src: "/images/interior.jpg",
      alt: "The main room of Machine Room with wooden tables refilled by window light",
    },
  },
  {
    id: "bar",
    index: "03",
    kicker: "The espresso bar",
    title: "Nineteen seconds of pressure",
    body: "The 1974 lever pulls a nine bar shot by hand. We redial it twice before the first cup of the morning goes out.",
    image: {
      src: "/images/machine.jpg",
      alt: "Close view of the restored lever espresso machine working at the bar",
    },
  },
  {
    id: "roastery",
    index: "04",
    kicker: "The roastery behind the glass",
    title: "Roast day is Friday",
    body: "Eighteen kilos a week, roasted Thursday night and rested until Friday. The shelf changes as soon as a lot runs out.",
    image: {
      src: "/images/roasting.jpg",
      alt: "Coffee beans tumbling inside the roaster drum during a Thursday batch",
    },
  },
] as const;

export const MENU = [
  {
    name: "Full Steam",
    kind: "Espresso",
    price: 3.6,
    body: "A double shot pulled by hand on the 1974 lever. Nineteen seconds under pressure.",
    image: { src: "/images/espresso.jpg", alt: "Espresso extracting on a small scale at the bar" },
  },
  {
    name: "Quiet Loop",
    kind: "Flat white",
    price: 4.8,
    body: "Silky microfoam folded over a ristretto base. Served warm, never piping hot.",
    image: { src: "/images/latte.jpg", alt: "A flat white on the counter with textured microfoam" },
  },
  {
    name: "Single Thread",
    kind: "Pour over",
    price: 5.2,
    body: "One origin, brewed by hand. Buys itself four minutes from kettle to cup.",
    image: { src: "/images/barista.jpg", alt: "A barista pouring water in slow circles for a pour over" },
  },
  {
    name: "Night Shift",
    kind: "Cold brew",
    price: 4.4,
    body: "Steeped for eighteen hours in two gallon batches, poured over a single big cube.",
    image: { src: "/images/cup-dark.jpg", alt: "Cold brew in a glass over a single large ice cube" },
  },
  {
    name: "House Roast",
    kind: "Whole beans, 500 g",
    price: 18.5,
    body: "Pressed on Friday. This month: Huehuetenango, Guatemala, roasted for filter.",
    image: { src: "/images/beans.jpg", alt: "A bag of house roasted beans next to raw coffee beans" },
  },
] as const;

export const GALLERY_COLUMNS = [
  [
    { src: "/images/moody.jpg", alt: "Evening guests talking softly under low warm lamps" },
    { src: "/images/latte.jpg", alt: "A flat white resting on the wide oak bar top" },
    { src: "/images/pastry.jpg", alt: "Morning croissants cooling in the pastry case" },
  ],
  [
    { src: "/images/dark-cup.jpg", alt: "A dark roast cup photographed against slate" },
    { src: "/images/interior.jpg", alt: "Afternoon light raking across the communal table" },
    { src: "/images/barista.jpg", alt: "Scales and a slow poured brew ready at the bar" },
  ],
  [
    { src: "/images/neon.jpg", alt: "The window glow spilling onto the wet sidewalk" },
    { src: "/images/espresso.jpg", alt: "A fresh double shot beside a digital scale" },
    { src: "/images/roasting.jpg", alt: "Beans dropping from the roaster into the cooling tray" },
  ],
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "I write my thesis four mornings a week at the communal table. Nobody has ever rushed me, and the pour over at table three arrives before my notebook is even open.",
    name: "Mariana Duarte",
    detail: "Regular since 2019",
    initials: "MD",
  },
  {
    quote:
      "We moved our Friday standups to their patio. The reservations form takes two minutes, the team knows our order by week three, and the flat white has never once been lukewarm.",
    name: "Tomasz Biedron",
    detail: "Runs a studio four doors down",
    initials: "TB",
  },
  {
    quote:
      "I came for the roastery tours with my head office and stayed for the lever espresso. You can literally watch Friday's batch cooling while you drink it.",
    name: "Priya Ramachandran",
    detail: "Visited for a wholesale tour",
    initials: "PR",
  },
  {
    quote:
      "As a barista myself I notice the double dialing in of the machine. Nineteen second shots, weighted, every single time. It is the most honest espresso on this coast.",
    name: "Ilse van der Berg",
    detail: "Barista at a satellite roastery",
    initials: "IB",
  },
] as const;

export const FAQS = [
  {
    question: "Do I need a reservation?",
    answer:
      "Walk ins are welcome whenever there is open seating, and most weekday mornings that is plenty. For the patio and the communal table on weekends we recommend the reservation form below. It takes about two minutes and you will usually hear back the same day.",
  },
  {
    question: "Can I work from the cafe?",
    answer:
      "Yes. The communal table keeps laptop friendly power strips, wifi averages 340 Mbps, and we only ask that you order more than water if you stay past ninety minutes. Mornings stay talkative, afternoons stay quiet.",
  },
  {
    question: "What milks and sweeteners do you carry?",
    answer:
      "Whole milk, oat from a local mill, and almond as a backup. Sugar is a raw demerara, honey from the Willamette valley, and a cardamom syrup we make on Thursdays. There is no extra charge for any of them.",
  },
  {
    question: "Can I buy your beans?",
    answer:
      "House Roast 500 g bags are pressed every Friday and are usually gone by Sunday, 18.50 each. We also do wholesale for three kitchens on the row at 11.80 per kilo with a weekly training session at your place or ours.",
  },
  {
    question: "Do you host the roastery tours?",
    answer:
      "Saturdays at 10:00 for up to eight people, 15 per person, and you leave with a 250 g bag of whatever we roasted on Thursday. Reserve through the same form below, marking the tour box.",
  },
  {
    question: "Is the patio open in winter?",
    answer:
      "Yes, it is heated from October through March with four overhead infrared panels, and about eleven of the sixteen seats stay covered when it rains.",
  },
  {
    question: "Where do I park?",
    answer:
      "There are two hour meters on Foundry Row, a paid garage two blocks north at Fourth, and secure bike racks directly under the big windows. Three bus lines stop at the corner.",
  },
] as const;
