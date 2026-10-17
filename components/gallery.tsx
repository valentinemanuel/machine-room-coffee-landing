"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { GALLERY_COLUMNS } from "@/lib/data";

/**
 * Three photo columns drifting at different speeds while the section
 * passes the viewport: a gentle parallax with no scroll listeners.
 */
export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const speeds = [
    useTransform(scrollYProgress, [0, 1], [-70, 70]),
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    useTransform(scrollYProgress, [0, 1], [-40, 40]),
  ];

  return (
    <section ref={sectionRef} id="gallery" className="overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="mb-3 flex items-center gap-3 text-sm font-medium text-muted">
          <span aria-hidden className="h-px w-10 bg-ember" />
          Views from the room
        </p>
        <h2 className="mb-14 max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Nine hundred square feet, shot over one rainy February
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {GALLERY_COLUMNS.map((column, index) => (
            <motion.div
              key={index}
              style={{ y: speeds[index] }}
              className={`flex flex-col gap-4 md:gap-6 ${index === 2 ? "hidden md:flex" : ""}`}
            >
              {column.map((photo) => (
                <div
                  key={photo.src}
                  className="group relative aspect-[4/5] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-fluid group-hover:scale-[1.06]"
                  />
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
