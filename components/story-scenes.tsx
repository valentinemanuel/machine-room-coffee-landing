"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { SCENES } from "@/lib/data";

/**
 * The simulated fly through: a sticky stage where each scene dives from
 * the outside into its interior, then hands over to the next one with
 * no cuts. Vertical scroll drives the whole film.
 */
export function StoryScenes() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={sectionRef} id="story" className="relative h-[520vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.06], [0, 1]) }}
          className="pointer-events-none absolute top-0 z-10 pt-28 text-center"
        >
          <p className="text-sm font-medium text-muted">
            <span aria-hidden className="mr-3 inline-block h-px w-10 align-middle bg-ember" />
            Scroll and walk in
          </p>
        </motion.div>

        {SCENES.map((scene, index) => (
          <Scene
            key={scene.id}
            scene={scene}
            index={index}
            total={SCENES.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}

type SceneProps = {
  scene: (typeof SCENES)[number];
  index: number;
  total: number;
  progress: MotionValue<number>;
};

function Scene({ scene, index, total, progress }: SceneProps) {
  const reduced = useReducedMotion();

  const start = index / total;
  const end = (index + 1) / total;
  const fade = 0.10;

  // Keyframe inputs must stay inside [0, 1]. Motion generates
  // times: [0, ...inputRange, 1], so a value outside that range
  // makes its offsets non-monotonic and crashes WAAPI animation.
  const fadeInStart = Math.max(0, start - fade / 2);
  const fadeOutEnd = Math.min(1, end + fade / 2);

  const opacity = useTransform(
    progress,
    [fadeInStart, start + fade / 2, end - fade / 2, fadeOutEnd],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const scale = useTransform(progress, [start, end], [1.22, 1.0], { clamp: true });
  const imageScale = useTransform(progress, [start, end], [1.12, 1.0], { clamp: true });
  const captionY = useTransform(progress, [start, start + fade], [48, 0], { clamp: true });
  const numberY = useTransform(progress, [start, end], [30, -30], { clamp: true });

  if (reduced) {
    return <SceneStatic scene={scene} />;
  }

  return (
    <motion.figure
      style={{ opacity }}
      className="absolute inset-0 flex items-center justify-center px-6"
    >
      <div className="relative w-full max-w-5xl">
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 right-6 z-0 hidden font-mono text-[10rem] leading-none text-cream/5 md:block"
        >
          <motion.span style={{ y: numberY }} className="block">
            {scene.index}
          </motion.span>
        </span>

        <motion.div
          style={{ scale }}
          className="relative aspect-[16/10] overflow-hidden rounded-3xl border border-line md:aspect-[16/8]"
        >
          <motion.div style={{ scale: imageScale }} className="absolute inset-0">
            <Image
              src={scene.image.src}
              alt={scene.image.alt}
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
            />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-[#131209]/25" />

          <motion.div
            style={{ y: captionY }}
            className="absolute right-0 bottom-0 left-0 p-6 md:p-10"
          >
            <p className="mb-2 font-mono text-xs tracking-widest text-ember uppercase">
              {scene.index} · {scene.kicker}
            </p>
            <h3 className="max-w-lg text-2xl font-semibold tracking-tight text-cream md:text-3xl">
              {scene.title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-[rgba(245,241,232,0.75)] md:text-base">
              {scene.body}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.figure>
  );
}

/** Static fallback for reduced motion visitors. */
function SceneStatic({ scene }: { scene: (typeof SCENES)[number] }) {
  return (
    <figure className="relative px-6 py-12">
      <div className="relative mx-auto aspect-[16/10] max-w-5xl overflow-hidden rounded-3xl border border-line">
        <Image
          src={scene.image.src}
          alt={scene.image.alt}
          fill
          sizes="(min-width: 1024px) 1024px, 100vw"
          className="object-cover"
        />
      </div>
      <figcaption className="mx-auto mt-6 max-w-5xl">
        <p className="font-mono text-xs tracking-widest text-ember uppercase">
          {scene.index} · {scene.kicker}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight">{scene.title}</h3>
        <p className="mt-2 max-w-md text-sm leading-6 text-muted">{scene.body}</p>
      </figcaption>
    </figure>
  );
}
