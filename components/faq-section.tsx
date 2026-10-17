"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";
import { Reveal } from "@/components/reveal";
import { FAQS } from "@/lib/data";

const FLUID: [number, number, number, number] = [0.32, 0.72, 0, 1];

function FaqItem({
  faq,
  index,
  open,
  onToggle,
}: {
  faq: (typeof FAQS)[number];
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const reduced = useReducedMotion();
  const buttonId = `faq-button-${index}`;
  const panelId = `faq-panel-${index}`;

  return (
    <div className="border-b border-line">
      <h3>
        <button
          id={buttonId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg font-semibold tracking-tight text-cream transition-colors duration-300 ease-fluid hover:text-ember-strong md:text-xl"
        >
          {faq.question}
          <CaretDown
            size={20}
            aria-hidden
            className={`shrink-0 text-muted transition-transform duration-500 ease-fluid ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.55, ease: FLUID }}
            className="overflow-hidden"
          >
            <p className="max-w-3xl pb-7 text-base leading-7 text-muted">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <p className="mb-3 flex items-center gap-3 text-sm font-medium text-muted">
                <span aria-hidden className="h-px w-10 bg-ember" />
                Before you ask
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
                The questions we get at the bar
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-sm text-base leading-7 text-muted">
                Anything else? Write to hello@machineroom.coffee or ask the person wedging the
                lever. They will happily talk about grind sizes longer than you planned.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <div className="border-t border-line">
              {FAQS.map((faq, index) => (
                <FaqItem
                  key={faq.question}
                  faq={faq}
                  index={index}
                  open={openIndex === index}
                  onToggle={() => setOpenIndex(openIndex === index ? -1 : index)}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
