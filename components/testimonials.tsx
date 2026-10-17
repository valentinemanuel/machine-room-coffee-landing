"use client";

import { Reveal } from "@/components/reveal";
import { TESTIMONIALS } from "@/lib/data";

/**
 * Testimonials stack like a deck of cards while the page scrolls.
 */
export function Testimonials() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-3 flex items-center gap-3 text-sm font-medium text-muted">
            <span aria-hidden className="h-px w-10 bg-ember" />
            Word around the block
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mb-16 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
            What the regulars say, in their words
          </h2>
        </Reveal>

        <div className="md:px-16">
          {TESTIMONIALS.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="sticky"
              style={{ top: `${9 + index * 2.25}rem` }}
            >
              <figure className="mb-8 rounded-2xl border border-line bg-surface p-8 shadow-[0_-8px_30px_rgba(0,0,0,0.35)] md:p-10">
                <div aria-hidden className="mb-5 flex gap-1 text-ember">
                  {"★★★★★".split("").map((star, starIndex) => (
                    <span key={starIndex}>{star}</span>
                  ))}
                </div>
                <blockquote className="text-lg leading-7 text-cream md:text-xl">
                  “{testimonial.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4">
                  <span
                    aria-hidden
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-3 font-mono text-xs font-semibold text-cream"
                  >
                    {testimonial.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-cream">
                      {testimonial.name}
                    </span>
                    <span className="block text-sm text-muted">{testimonial.detail}</span>
                  </span>
                </figcaption>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
