"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MENU } from "@/lib/data";

export function MenuSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      const smallest = Math.min(0, viewport.clientWidth - track.scrollWidth - 48);
      setScrollDistance(smallest);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0.1, 0.9], [0, scrollDistance]);
  const progressScale = useTransform(scrollYProgress, [0.1, 0.9], [0, 1]);

  if (reduced) {
    return <MenuStatic />;
  }

  return (
    <section ref={sectionRef} id="menu" className="relative h-[340vh]">
      <div
        ref={viewportRef}
        className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 flex items-center gap-3 text-sm font-medium text-muted">
                <span aria-hidden className="h-px w-10 bg-ember" />
                The board
              </p>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Five things, done properly
              </h2>
            </div>
            <p className="hidden shrink-0 text-sm text-muted md:block">
              Keep scrolling, the board does the moving
            </p>
          </div>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-6 pr-12 pl-6 will-change-transform"
        >
          {MENU.map((item) => (
            <article
              key={item.name}
              className="w-[80vw] max-w-[24rem] shrink-0 overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-700 ease-fluid hover:bg-surface-2 sm:w-[26rem]"
            >
              <div className="group relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image.src}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 640px) 80vw, 416px"
                  className="object-cover transition-transform duration-700 ease-fluid group-hover:scale-[1.05]"
                />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-xl font-semibold tracking-tight">{item.name}</h3>
                  <span className="font-mono text-sm text-muted">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">{item.kind}</p>
                <p className="mt-4 text-sm leading-6 text-muted">{item.body}</p>
              </div>
            </article>
          ))}
        </motion.div>

        <div className="mx-auto mt-10 w-full max-w-6xl px-6">
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-line" aria-hidden>
            <motion.div
              style={{ scaleX: progressScale }}
              className="h-full origin-left bg-ember"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Honest fallback when the visitor prefers reduced motion: a plain snap row. */
function MenuStatic() {
  return (
    <section id="menu" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-10 text-4xl font-semibold tracking-tight">Five things, done properly</h2>
        <div className="flex snap-x gap-6 overflow-x-auto pb-4">
          {MENU.map((item) => (
            <article
              key={item.name}
              className="w-72 shrink-0 snap-start rounded-2xl border border-line bg-surface p-5"
            >
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="mt-1 text-sm text-muted">{item.kind}</p>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
              <p className="mt-3 font-mono text-sm">${item.price.toFixed(2)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
