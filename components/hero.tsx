"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";
import { HERO, HERO_STATS } from "@/lib/data";

function SteamWisp({ delay }: { delay: number }) {
  return (
    <svg width="14" height="26" viewBox="0 0 10 26" className="steam-wisp" aria-hidden>
      <path
        d="M 5 24 C -1 18, 11 12, 5 4"
        stroke="#f5f1e8"
        strokeWidth={2.5}
        strokeLinecap="round"
        fill="none"
        style={{ animationDelay: `${delay}s` }}
      />
    </svg>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);

  return (
    <section ref={sectionRef} id="top" className="relative overflow-hidden pt-36 pb-20 md:pt-44">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <p className="mb-6 flex items-center gap-3 text-sm font-medium text-muted">
                <span aria-hidden className="h-px w-10 bg-ember" />
                Roastery and espresso bar, since {HERO_STATS.at(0)!.value}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="bg-gradient-to-r from-white to-[#9b9b9b] bg-clip-text text-5xl leading-[1.05] font-semibold tracking-tight text-transparent md:text-7xl">
                {HERO.headline[0]}
                <br />
                {HERO.headline[1]}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[680px] text-lg leading-7 text-muted md:text-xl leading-7.5">
                {HERO.subheadline}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href={HERO.ctaHref}
                  className="rounded-full bg-ember py-2 pr-3 pl-3 text-base font-semibold text-[#131209] transition-all duration-700 ease-fluid hover:bg-ember-strong hover:scale-[1.03] active:scale-[0.98]"
                >
                  {HERO.cta}
                </a>
                <a
                  href={HERO.secondaryHref}
                  className="rounded-full border border-line py-2 pr-3 pl-3 text-base font-semibold text-cream transition-colors duration-700 ease-fluid hover:bg-white/10 active:scale-[0.98]"
                >
                  {HERO.secondaryCta}
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <p className="mt-12 flex items-start gap-4 text-sm text-muted">
                <ArrowDown size={18} className="mt-0.5 shrink-0 text-ember" aria-hidden />
                {HERO.proof}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} className="relative">
            <div className="relative">
              <div className="absolute -top-7 left-10 z-10 flex gap-1" aria-hidden>
                <SteamWisp delay={0} />
                <SteamWisp delay={0.7} />
                <SteamWisp delay={1.4} />
              </div>

              <motion.div
                style={
                  reduced ? undefined : { y: imageY, scale: imageScale }
                }
                className="relative aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <Image
                  src={HERO.image.src}
                  alt={HERO.image.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                  preload
                />
                <div aria-hidden className="absolute inset-0 bg-[#131209]/10" />
              </motion.div>

              <dl className="mt-6 grid grid-cols-4 gap-3 rounded-2xl border border-line bg-surface p-4">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="text-xl font-semibold tracking-tight text-cream">
                      {stat.value}
                      {stat.suffix}
                    </dd>
                    <dd className="mt-1 hidden text-xs text-muted sm:block">{stat.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
