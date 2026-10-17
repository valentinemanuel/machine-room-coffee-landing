"use client";

import { useEffect, useMemo, useRef } from "react";
import { Reveal } from "@/components/reveal";
import { TAGLINE } from "@/lib/data";

/**
 * The mandatory tagline reveal section separated from the hero.
 * Words start muted and activate one at a time, in reading order,
 * as each of them crosses a trigger line while the page scrolls.
 * A single IntersectionObserver drives every word. No scroll listeners.
 */
export function TaglineReveal() {
  const wordRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const words = useMemo(
    () => TAGLINE.lines.flatMap((line) => line.split(" ")),
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("word-active");
            observer.unobserve(entry.target);
          }
        }
      },
      // The trigger line sits a third of the way into the viewport.
      { rootMargin: "-30% 0px -30% 0px", threshold: 0.8 },
    );

    for (const span of wordRefs.current) {
      if (span) observer.observe(span);
    }

    return () => observer.disconnect();
  }, [words]);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <p className="mb-10 text-sm font-medium text-muted">
            The house rule, posted by the door
            <span aria-hidden className="ml-4 inline-block h-px w-10 align-middle bg-ember" />
          </p>
        </Reveal>

        <p className="max-w-[680px] text-5xl leading-[1.12] font-semibold tracking-tight md:text-6xl">
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              ref={(element) => {
                wordRefs.current[index] = element;
              }}
              aria-hidden={false}
              className="tagline-word"
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
