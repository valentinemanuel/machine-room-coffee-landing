"use client";

import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { CAFETERIA } from "@/lib/data";

const FLUID = "ease-fluid";

export function RoasterySection() {
  return (
    <section id="roastery" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/roasting.jpg"
                alt="Beans tumbling in the drum while a batch roasts on Thursday night"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="mb-3 flex items-center gap-3 text-sm font-medium text-muted">
                <span aria-hidden className="h-px w-10 bg-ember" />
                Behind the glass
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Roasting in the open, since {CAFETERIA.since}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-8 max-w-[680px] space-y-5 text-lg leading-7 text-muted">
                <p>
                  The roaster sits behind a glass wall on the far side of the main room. On Thursday
                  nights the drum runs until twenty two and a half, and the smell of first crack
                  reaches the patio.
                </p>
                <p>
                  We buy three origins at a time through direct relationships, from Huehuetenango
                  Guatemala to the south shields studio of a ceramicist who turns our chaff into
                  glaze.
                </p>
                <p>
                  Kitchens on the row buy our coffee wholesale at 11.80 per kilo, with a weekly
                  training session at their place or ours.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href="#reserve"
                  className={`rounded-full bg-ember py-2 pr-3 pl-3 text-base font-semibold text-[#131209] transition-all duration-700 ${FLUID} hover:bg-ember-strong hover:scale-[1.03] active:scale-[0.98]`}
                >
                  Book the Saturday tour
                </a>
                <a
                  href="#faq"
                  className={`rounded-full border border-line py-2 pr-3 pl-3 text-base font-semibold text-cream transition-colors duration-700 ${FLUID} hover:bg-white/10 active:scale-[0.98]`}
                >
                  Ask about wholesale
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
