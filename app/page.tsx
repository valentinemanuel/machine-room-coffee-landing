import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { TaglineReveal } from "@/components/tagline-reveal";
import { StoryScenes } from "@/components/story-scenes";
import { StatsBand } from "@/components/stats-band";
import { MenuSection } from "@/components/menu-section";
import { RoasterySection } from "@/components/roastery-section";
import { Gallery } from "@/components/gallery";
import { Testimonials } from "@/components/testimonials";
import { FaqSection } from "@/components/faq-section";
import { ReservationSection } from "@/components/reservation-section";
import { SiteFooter } from "@/components/site-footer";
import { FAQS, CAFETERIA } from "@/lib/data";

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

const CAFE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: `${CAFETERIA.name} Coffee`,
  description: `${CAFETERIA.tagline}. Roasting in house every Thursday, espresso pulled by hand on a restored 1974 lever machine.`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "214 Foundry Row",
    addressLocality: "Portland",
    addressRegion: "OR",
    addressCountry: "US",
  },
  telephone: "+15037632148",
  email: CAFETERIA.email,
  servesCuisine: "Coffee",
  image: "/images/hero.jpg",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_SCHEMA) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(CAFE_SCHEMA) }}
      />

      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />

      <main id="main">
        <Hero />
        <TaglineReveal />
        <StoryScenes />
        <div id="roastery-stats">
          <StatsBand />
        </div>
        <MenuSection />
        <RoasterySection />
        <Gallery />
        <Testimonials />
        <FaqSection />
        <ReservationSection />
      </main>

      <SiteFooter />
    </>
  );
}
