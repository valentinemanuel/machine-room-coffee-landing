"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/reveal";
import { HERO_STATS } from "@/lib/data";

const FLUID: [number, number, number, number] = [0.32, 0.72, 0, 1];

function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: reduced ? 0 : 1.8,
      ease: FLUID,
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return <span ref={ref}>{display}</span>;
}

export function StatsBand() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-12 flex items-center gap-3 text-sm font-medium text-muted">
            <span aria-hidden className="h-px w-10 bg-ember" />
            The shop in numbers
          </p>
        </Reveal>

        <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <Reveal key={stat.label}>
              <div className="border-t border-line pt-6">
                <dd className="font-mono text-5xl font-semibold tracking-tight text-cream">
                  <Counter value={stat.value} />
                </dd>
                <dt className="mt-3 text-sm text-muted">{stat.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
